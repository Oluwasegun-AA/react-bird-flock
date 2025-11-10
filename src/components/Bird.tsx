import type React from "react"
import type { BirdState } from "../types"
import { ClassicBird } from "./birds/ClassicBird"
import { SimpleBird } from "./birds/SimpleBird"
import { DetailedBird } from "./birds/DetailedBird"
import type { JSX } from "@emotion/react" // Added import for JSX

/**
 * Props for the Bird component.
 * @interface BirdProps
 * @property {BirdState} bird - Complete state object for the bird to render
 */
interface BirdProps {
  bird: BirdState
}

/**
 * Wrapper component that renders the appropriate bird SVG variant.
 * Handles positioning, rotation, and scale animations based on bird mode.
 * Routes to ClassicBird, SimpleBird, or DetailedBird based on bird.variant.
 *
 * @component
 * @param {BirdProps} props - Props containing bird state
 * @returns {JSX.Element} Positioned and transformed bird SVG
 */
export const Bird: React.FC<BirdProps> = ({ bird }: BirdProps): JSX.Element => {
  let BirdComponent: JSX.Element

  switch (bird.variant) {
    case "simple":
      BirdComponent = <SimpleBird bird={bird} />
      break
    case "detailed":
      BirdComponent = <DetailedBird bird={bird} />
      break
    case "classic":
    default:
      BirdComponent = <ClassicBird bird={bird} />
  }

  return (
    <div
      style={{
        position: "fixed",
        left: bird.x,
        top: bird.y,
        transform: `rotate(${bird.rotation}deg) scale(${bird.mode === "perched" ? 0.85 : 1})`,
        transition: bird.mode === "perched" ? "transform 0.35s" : "none",
        pointerEvents: "none",
        zIndex: bird.zIndex,
      }}
    >
      {BirdComponent}
    </div>
  )
}
