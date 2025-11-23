"use client";

import { type ReactElement, useEffect, useState } from "react";
import type { BirdState, Palette } from "./types/index";
import { Bird } from "./components/Bird";
import { useMouseTracking } from "./hooks/useMouseTracking";
import { useBirdFlock } from "./hooks/useBirdFlock";
import { initializeBirds } from "./utils/initializeBirds";

/**
 * Props for the BirdFlock component.
 * @interface BirdFlockProps
 * @property {number} [count=10] - Number of birds in the flock
 * @property {number} [size=60] - Size of each bird in pixels
 * @property {number} [zIndex=0] - CSS z-index for the flock container
 * @property {number} [topSpeed=4] - Maximum speed birds can travel in pixels per frame
 * @property {number} [perchDelaySeconds=2] - Delay in seconds before birds start perching
 * @property {number} [clusterRadius=85] - Radius of the perching cluster around mouse
 * @property {number} [clusterJitter=22] - Amount of randomness in perching positions
 * @property {Palette | Palette[]} [palettes] - Custom color palette(s) for birds
 */
interface BirdFlockProps {
  count?: number;
  size?: number;
  zIndex?: number;
  topSpeed?: number;
  perchDelaySeconds?: number;
  clusterRadius?: number;
  clusterJitter?: number;
  palettes?: Palette | Palette[];
}

/**
 * Main BirdFlock component that renders an animated flock of birds following the mouse.
 * Birds exhibit intelligent flocking behavior with perching mechanics when mouse is idle.
 * Handles initialization, mouse tracking, and delegation to animation hooks.
 *
 * @component
 * @param {BirdFlockProps} props - Configuration options for the bird flock
 * @returns {ReactElement} Fixed-position container with animated bird elements
 *
 * @example
 * ```tsx
 * <BirdFlock count={15} size={50} topSpeed={5} />
 * ```
 */
export function BirdFlock({
  count = 10,
  size = 60,
  topSpeed = 4,
  zIndex = 0,
  perchDelaySeconds = 2,
  clusterRadius = 85,
  clusterJitter = 22,
  palettes,
}: BirdFlockProps): ReactElement {
  const { mousePosition, isMouseMoving, hasActualMouse } = useMouseTracking();
  const [initialBirds, setInitialBirds] = useState<BirdState[]>([]);

  useEffect(() => {
    const birds: BirdState[] = initializeBirds({ count, size, zIndex, palettes });
    setInitialBirds(birds);
  }, [count, size, zIndex, palettes]);

  const birds: BirdState[] = useBirdFlock({
    initialBirds,
    mousePosition,
    isMouseMoving,
    hasActualMouse,
    topSpeed,
    perchDelaySeconds,
    clusterRadius,
    clusterJitter,
  });

  if (initialBirds.length === 0) {
    return (
      <div
        aria-hidden
        style={{
          inset: "0",
          position: "fixed",
          zIndex,
          pointerEvents: "none",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      style={{
        inset: "0",
        position: "fixed",
        zIndex,
        pointerEvents: "none",
      }}
    >
      {birds.map((bird: BirdState, i: number) => (
        <Bird key={i} bird={bird} />
      ))}
    </div>
  );
}

export default BirdFlock;
