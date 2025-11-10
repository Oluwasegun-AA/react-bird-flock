"use client"

import type React from "react"
import { type ReactElement, useEffect, useState } from "react"
import type { BirdState } from "./types"
import { Bird } from "./components/Bird"
import { useMouseTracking } from "./hooks/useMouseTracking"
import { useBirdFlock } from "./hooks/useBirdFlock"
import { initializeBirds } from "./utils/initializeBirds"

/**
 * Props for the BirdFlock component.
 * @interface BirdFlockProps
 * @property {number} [count=10] - Number of birds in the flock
 * @property {number} [size=60] - Size of each bird in pixels
 * @property {number} [zIndex=0] - CSS z-index for the flock container
 * @property {number} [topSpeed=4] - Maximum speed birds can travel
 * @property {number} [perchDelaySeconds=2] - Delay before birds perch on mouse cursor
 * @property {number} [clusterRadius=85] - Radius of perching cluster around cursor
 * @property {number} [clusterJitter=22] - Randomness in perching positions
 */
interface BirdFlockProps {
  count?: number
  size?: number
  zIndex?: number
  topSpeed?: number
  perchDelaySeconds?: number
  clusterRadius?: number
  clusterJitter?: number
}

/**
 * Main BirdFlock component. Renders an animated flock of birds that follow the mouse cursor.
 * Birds fly freely until the mouse is idle, then they perch around the cursor in waves.
 * Supports three bird variants (classic, simple, detailed) distributed randomly.
 *
 * @component
 * @param {BirdFlockProps} props - Configuration options for the flock
 * @param {number} [props.count=10] - Total birds to display
 * @param {number} [props.size=60] - Bird size in pixels
 * @param {number} [props.zIndex=0] - Stacking order
 * @param {number} [props.topSpeed=4] - Maximum bird speed
 * @param {number} [props.perchDelaySeconds=2] - Wait time before perching
 * @param {number} [props.clusterRadius=85] - Perch cluster size
 * @param {number} [props.clusterJitter=22] - Position randomness
 * @returns {ReactElement} Fixed position SVG container with animated birds
 *
 * @example
 * <BirdFlock count={15} size={60} topSpeed={4} perchDelaySeconds={2} />
 */
export const BirdFlock: React.FC<BirdFlockProps> = ({
  count = 10,
  size = 60,
  topSpeed = 4,
  zIndex = 0,
  perchDelaySeconds = 2,
  clusterRadius = 85,
  clusterJitter = 22,
}): ReactElement => {
  const { mousePosition, isMouseMoving, hasActualMouse } = useMouseTracking()
  const [initialBirds, setInitialBirds] = useState<BirdState[]>([])

  useEffect(() => {
    const birds: BirdState[] = initializeBirds({ count, size, zIndex })
    setInitialBirds(birds)
  }, [count, size, zIndex])

  const birds: BirdState[] = useBirdFlock({
    initialBirds,
    mousePosition,
    isMouseMoving,
    hasActualMouse,
    topSpeed,
    perchDelaySeconds,
    clusterRadius,
    clusterJitter,
  })

  if (initialBirds.length === 0) {
    return (
      <div
        aria-hidden
        style={{
          inset: 0,
          position: "fixed",
          zIndex,
          pointerEvents: "none",
        }}
      />
    )
  }

  return (
    <div
      aria-hidden
      style={{
        inset: 0,
        position: "fixed",
        zIndex,
        pointerEvents: "none",
      }}
    >
      {birds.map((bird: BirdState, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <Bird key={i} bird={bird} />
      ))}
    </div>
  )
}

export default BirdFlock
