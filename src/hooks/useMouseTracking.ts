"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Return type for useMouseTracking hook.
 * @interface UseMouseTrackingReturn
 * @property {object} mousePosition - Current mouse position on screen
 * @property {number} mousePosition.x - Current X coordinate
 * @property {number} mousePosition.y - Current Y coordinate
 * @property {boolean} isMouseMoving - Whether mouse is actively moving
 * @property {boolean} hasActualMouse - Whether a physical mouse is detected (vs touch)
 */
interface UseMouseTrackingReturn {
  mousePosition: { x: number; y: number }
  isMouseMoving: boolean
  hasActualMouse: boolean
}

/**
 * Custom hook to track mouse position and movement state.
 * Detects whether device has a physical mouse vs touch input.
 * Includes dead zone (2px) to prevent jitter from triggering movement state.
 *
 * @function useMouseTracking
 * @returns {UseMouseTrackingReturn} Object containing mouse position and movement states
 *
 * @example
 * const { mousePosition, isMouseMoving, hasActualMouse } = useMouseTracking()
 * // mousePosition: { x: 500, y: 300 }
 * // isMouseMoving: true
 * // hasActualMouse: true
 */
export const useMouseTracking = (): UseMouseTrackingReturn => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  })
  const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false)
  const [hasActualMouse, setHasActualMouse] = useState<boolean>(false)

  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const touchDetectedRef = useRef<boolean>(false)

  useEffect(() => {
    /**
     * Handler for mouse movement events.
     * Updates position and sets isMouseMoving timeout if movement exceeds dead zone.
     * @param {MouseEvent} e - Mouse event object
     */
    const handleMouseMove = (e: MouseEvent): void => {
      if (!touchDetectedRef.current) setHasActualMouse(true)
      const newPos: { x: number; y: number } = { x: e.clientX, y: e.clientY }

      // Only count as moving if position changed more than 2px (dead zone for jitter)
      const hasMoved: boolean =
        Math.abs(newPos.x - lastMousePosRef.current.x) > 2 || Math.abs(newPos.y - lastMousePosRef.current.y) > 2

      if (hasMoved) {
        lastMousePosRef.current = newPos
        setMousePosition(newPos)
        setIsMouseMoving(true)

        if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current)
        mouseTimeoutRef.current = setTimeout(() => setIsMouseMoving(false), 1500)
      }
    }

    /**
     * Handler for touch start events.
     * Marks that touch input was detected and disables mouse tracking.
     */
    const handleTouchStart = (): void => {
      touchDetectedRef.current = true
      setHasActualMouse(false)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, {
      once: true,
      passive: true,
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchstart", handleTouchStart)
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current)
    }
  }, [])

  return { mousePosition, isMouseMoving, hasActualMouse }
}
