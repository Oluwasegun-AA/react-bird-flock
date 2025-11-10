"use client"

import { useEffect, useRef, useState } from "react"
import type { BirdState } from "../types"

/**
 * Parameters for the useBirdFlock hook.
 * @interface UseBirdFlockParams
 * @property {BirdState[]} initialBirds - Array of initial bird states
 * @property {object} mousePosition - Current mouse cursor position
 * @property {number} mousePosition.x - Mouse X coordinate
 * @property {number} mousePosition.y - Mouse Y coordinate
 * @property {boolean} isMouseMoving - Whether mouse is currently moving
 * @property {boolean} hasActualMouse - Whether physical mouse is connected
 * @property {number} topSpeed - Maximum speed birds can travel
 * @property {number} perchDelaySeconds - Seconds before birds start perching on mouse
 * @property {number} clusterRadius - Radius of perching cluster around mouse
 * @property {number} clusterJitter - Randomness in perching positions
 */
interface UseBirdFlockParams {
  initialBirds: BirdState[]
  mousePosition: { x: number; y: number }
  isMouseMoving: boolean
  hasActualMouse: boolean
  topSpeed: number
  perchDelaySeconds: number
  clusterRadius: number
  clusterJitter: number
}

/**
 * Custom hook managing all bird flock animation and AI logic.
 * Handles bird movement, perching behavior, recruitment waves, and physics simulation.
 * Uses requestAnimationFrame for smooth 60fps animation.
 *
 * @function useBirdFlock
 * @param {UseBirdFlockParams} params - Configuration and state for flock animation
 * @returns {BirdState[]} Current array of all bird states with updated positions and modes
 *
 * @example
 * const birds = useBirdFlock({
 *   initialBirds,
 *   mousePosition: { x: 500, y: 300 },
 *   isMouseMoving: false,
 *   hasActualMouse: true,
 *   topSpeed: 4,
 *   perchDelaySeconds: 2,
 *   clusterRadius: 85,
 *   clusterJitter: 22
 * })
 */
export const useBirdFlock = ({
  initialBirds,
  mousePosition,
  isMouseMoving,
  hasActualMouse,
  topSpeed,
  perchDelaySeconds,
  clusterRadius,
  clusterJitter,
}: UseBirdFlockParams): BirdState[] => {
  const [birds, setBirds] = useState<BirdState[]>(initialBirds)

  const animationFrameRef = useRef<number | null>(null)
  const recruitmentTimeoutsRef = useRef<number[]>([])
  const unrecruitedRef = useRef<number[]>([])
  const perchCycleActiveRef = useRef<boolean>(false)

  const mousePositionRef = useRef<{ x: number; y: number }>(mousePosition)
  const isMouseMovingRef = useRef<boolean>(isMouseMoving)
  const hasActualMouseRef = useRef<boolean>(hasActualMouse)
  const topSpeedRef = useRef<number>(topSpeed)
  const clusterRadiusRef = useRef<number>(clusterRadius)
  const clusterJitterRef = useRef<number>(clusterJitter)

  // Update refs whenever props change
  useEffect(() => {
    mousePositionRef.current = mousePosition
    isMouseMovingRef.current = isMouseMoving
    hasActualMouseRef.current = hasActualMouse
    topSpeedRef.current = topSpeed
    clusterRadiusRef.current = clusterRadius
    clusterJitterRef.current = clusterJitter
  }, [mousePosition, isMouseMoving, hasActualMouse, topSpeed, clusterRadius, clusterJitter])

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      recruitmentTimeoutsRef.current.forEach((id: number) => clearTimeout(id))
      recruitmentTimeoutsRef.current = []
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    /**
     * Clears all pending recruitment timers.
     * Called when stopping perch cycle or on cleanup.
     */
    const clearRecruitmentTimers = (): void => {
      recruitmentTimeoutsRef.current.forEach((id: number) => clearTimeout(id))
      recruitmentTimeoutsRef.current = []
    }

    /**
     * Recursively recruits birds in batches to perch.
     * Creates staggered waves of birds moving toward mouse position.
     * Each wave has randomized timing for natural behavior.
     */
    const recruitNextBatch = (): void => {
      if (!perchCycleActiveRef.current) return
      const remaining: number = unrecruitedRef.current.length
      if (!remaining) return

      const batchSize: number = remaining <= 3 ? remaining : 1 + Math.floor(Math.random() * Math.min(5, remaining - 1))

      const picked: number[] = []
      for (let i = 0; i < batchSize; i++) {
        const idx: number = Math.floor(Math.random() * unrecruitedRef.current.length)
        picked.push(unrecruitedRef.current[idx])
        unrecruitedRef.current.splice(idx, 1)
      }

      setBirds((prev: BirdState[]) =>
        prev.map((b: BirdState, i: number) => (picked.includes(i) ? { ...b, mode: "perching" as const } : b)),
      )

      if (unrecruitedRef.current.length) {
        const delayMs: number = 280 + Math.random() * 820
        const id: number = window.setTimeout(recruitNextBatch, delayMs)
        recruitmentTimeoutsRef.current.push(id)
      }
    }

    const idle: boolean = hasActualMouseRef.current && !isMouseMovingRef.current

    if (idle) {
      if (!perchCycleActiveRef.current) {
        perchCycleActiveRef.current = true
        unrecruitedRef.current = initialBirds.map((_: BirdState, i: number) => i)
        const id: number = window.setTimeout(recruitNextBatch, perchDelaySeconds * 1000)
        recruitmentTimeoutsRef.current.push(id)
      }
    } else {
      if (perchCycleActiveRef.current) {
      }
      perchCycleActiveRef.current = false
      clearRecruitmentTimers()
      unrecruitedRef.current = []
      setBirds((prev: BirdState[]) => prev.map((b: BirdState) => ({ ...b, mode: "free" as const, isPerched: false })))
    }
  }, [perchDelaySeconds, initialBirds, hasActualMouse, isMouseMoving])

  useEffect(() => {
    /**
     * Main animation frame callback.
     * Updates bird positions, velocities, and behavior modes every frame.
     * Implements flocking physics including acceleration, friction, and max speed.
     */
    const animate = (): void => {
      setBirds((prev: BirdState[]) =>
        prev.map((bird: BirdState) => {
          let { targetX, targetY, mode, isPerched } = bird

          if (mode === "free") {
            const dist: number = Math.hypot(bird.x - targetX, bird.y - targetY)
            if (dist < 60 || Math.random() < 0.02) {
              targetX = Math.random() * window.innerWidth
              targetY = Math.random() * window.innerHeight
            }
          } else {
            const desiredR: number =
              clusterRadiusRef.current +
              (mode === "perching"
                ? Math.random() * clusterJitterRef.current
                : Math.random() * clusterJitterRef.current * 0.4)
            const distFromMouse: number = Math.hypot(
              bird.x - mousePositionRef.current.x,
              bird.y - mousePositionRef.current.y,
            )
            const needNew: boolean =
              mode === "perching" ||
              distFromMouse > desiredR + 12 ||
              distFromMouse < desiredR - 12 ||
              Math.random() < 0.012

            if (needNew) {
              const a: number = Math.random() * Math.PI * 2
              targetX = mousePositionRef.current.x + Math.cos(a) * desiredR
              targetY = mousePositionRef.current.y + Math.sin(a) * desiredR
            }

            const distToTarget: number = Math.hypot(bird.x - targetX, bird.y - targetY)
            if (distToTarget < 22 && mode === "perching") {
              mode = "perched"
              isPerched = true
            }
          }

          const dx: number = targetX - bird.x
          const dy: number = targetY - bird.y
          const distance: number = Math.hypot(dx, dy)
          const accel: number = 0.34
          const friction: number = 0.94
          const maxSpeed: number = mode === "perched" ? 0.7 : topSpeedRef.current

          let vx: number = bird.velocityX
          let vy: number = bird.velocityY

          if (distance > 0) {
            vx += (dx / distance) * accel
            vy += (dy / distance) * accel
          }

          vx *= mode === "perched" ? friction * 0.9 : friction
          vy *= mode === "perched" ? friction * 0.9 : friction

          const spd: number = Math.hypot(vx, vy)
          if (spd > maxSpeed) {
            vx = (vx / spd) * maxSpeed
            vy = (vy / spd) * maxSpeed
          }

          const x: number = bird.x + vx
          const y: number = bird.y + vy
          const rotation: number = Math.atan2(vy, vx) * (180 / Math.PI)

          return {
            ...bird,
            x,
            y,
            targetX,
            targetY,
            velocityX: vx,
            velocityY: vy,
            rotation,
            mode,
            isPerched,
          }
        }),
      )
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Update birds when initial state changes
  useEffect(() => {
    if (initialBirds.length > 0) {
      setBirds(initialBirds)
    }
  }, [initialBirds])

  return birds
}
