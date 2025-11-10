import type { BirdState } from "../types"
import { PALETTES } from "../constants/palettes"

/**
 * Parameters for initializing the bird flock.
 * @interface InitializeBirdsParams
 * @property {number} count - Total number of birds to create
 * @property {number} size - Size of each bird in pixels
 * @property {number} zIndex - Base z-index for stacking order
 * @property {number} [classicRatio=0.4] - Proportion of classic bird variants (0-1)
 * @property {number} [simpleRatio=0.3] - Proportion of simple bird variants (0-1)
 */
interface InitializeBirdsParams {
  count: number
  size: number
  zIndex: number
  classicRatio?: number
  simpleRatio?: number
}

/**
 * Creates a base bird state object with default values and random positioning.
 * Used as a factory to reduce repetition across different bird variant creation.
 *
 * @function createBaseBirdState
 * @param {Object} overrides - Properties to override the defaults
 * @param {number} overrides.zIndex - Z-index for stacking
 * @param {number} overrides.size - Bird size in pixels
 * @param {string} overrides.palette - Color palette for the bird
 * @param {BirdState["variant"]} overrides.variant - Bird variant type (classic, simple, detailed)
 * @returns {BirdState} Complete bird state object with randomized position and defaults
 */
const createBaseBirdState = ({
  zIndex,
  size,
  palette,
  variant,
}: Pick<BirdState, "zIndex" | "size" | "palette" | "variant">): BirdState => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  targetX: Math.random() * window.innerWidth,
  targetY: Math.random() * window.innerHeight,
  velocityX: 0,
  velocityY: 0,
  isPerched: false,
  rotation: 0,
  zIndex,
  size,
  mode: "free",
  wingPhase: Math.random() * 100,
  palette,
  variant,
})

/**
 * Creates and initializes an array of bird objects with random positions and properties.
 * Birds are distributed among three variants (classic, simple, detailed) based on provided ratios.
 *
 * @function initializeBirds
 * @param {InitializeBirdsParams} params - Configuration parameters
 * @param {number} params.count - Total number of birds to initialize
 * @param {number} params.size - Size in pixels for all birds
 * @param {number} params.zIndex - Starting z-index value
 * @param {number} [params.classicRatio=0.4] - Ratio of classic variants
 * @param {number} [params.simpleRatio=0.3] - Ratio of simple variants
 * @returns {BirdState[]} Array of initialized bird states with random positions and colors
 */
export const initializeBirds = ({
  count,
  size,
  zIndex,
  classicRatio = 0.4,
  simpleRatio = 0.3,
}: InitializeBirdsParams): BirdState[] => {
  const classicCount: number = Math.floor(count * classicRatio)
  const simpleCount: number = Math.floor(count * simpleRatio)
  const detailedCount: number = count - classicCount - simpleCount

  const initialBirds: BirdState[] = []

  // Create classic birds with full detail rendering
  for (let i = 0; i < classicCount; i++) {
    initialBirds.push(
      createBaseBirdState({
        zIndex,
        size,
        palette: PALETTES[i % PALETTES.length],
        variant: "classic",
      }),
    )
  }

  // Create simple birds with minimal detail
  for (let i = 0; i < simpleCount; i++) {
    initialBirds.push(
      createBaseBirdState({
        zIndex,
        size,
        palette: PALETTES[(classicCount + i) % PALETTES.length],
        variant: "simple",
      }),
    )
  }

  // Create detailed birds with extra animation layers
  for (let i = 0; i < detailedCount; i++) {
    initialBirds.push(
      createBaseBirdState({
        zIndex,
        size,
        palette: PALETTES[(classicCount + simpleCount + i) % PALETTES.length],
        variant: "detailed",
      }),
    )
  }

  // Shuffle for natural distribution using Fisher-Yates algorithm
  for (let i = initialBirds.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    ;[initialBirds[i], initialBirds[j]] = [initialBirds[j], initialBirds[i]]
  }

  return initialBirds
}
