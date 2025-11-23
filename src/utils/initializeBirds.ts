import type { BirdState } from "../types"
import { PALETTES } from "../constants/palettes"
import type { Palette } from "../types"

/**
 * Parameters for initializing the bird flock.
 * @interface InitializeBirdsParams
 * @property {number} count - Total number of birds to create
 * @property {number} size - Size of each bird in pixels
 * @property {number} zIndex - Base z-index for stacking order
 * @property {Palette | Palette[]} [palettes] - Custom palette(s) to use. Defaults to PALETTES constant
 */
interface InitializeBirdsParams {
  count: number
  size: number
  zIndex: number
  palettes?: Palette | Palette[]
}

/**
 * Creates a base bird state object with default values and random positioning.
 * Used as a factory to reduce repetition across different bird variant creation.
 *
 * @function createBaseBirdState
 * @param {Object} overrides - Properties to override the defaults
 * @param {number} overrides.zIndex - Z-index for stacking
 * @param {number} overrides.size - Bird size in pixels
 * @param {Palette} overrides.palette - Color palette for the bird
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
 * Birds are randomly assigned palettes from the provided or default palette set.
 *
 * @function initializeBirds
 * @param {InitializeBirdsParams} params - Configuration parameters
 * @param {number} params.count - Total number of birds to initialize
 * @param {number} params.size - Size in pixels for all birds
 * @param {number} params.zIndex - Starting z-index value
 * @param {Palette | Palette[]} [params.palettes] - Custom palette(s) to use. Defaults to PALETTES constant
 * @returns {BirdState[]} Array of initialized bird states with random positions and colors
 */
export const initializeBirds = ({ count, size, zIndex, palettes }: InitializeBirdsParams): BirdState[] => {
  const paletteArray: Palette[] = !palettes
    ? (PALETTES as unknown as Palette[])
    : Array.isArray(palettes)
      ? palettes
      : [palettes]

  return Array.from({ length: count }, (_, i): BirdState => {
    const selectedPalette: Palette = paletteArray[Math.floor(Math.random() * paletteArray.length)]
    const variant: BirdState["variant"] = (["classic", "simple", "detailed"] as const)[Math.floor(Math.random() * 3)]

    return createBaseBirdState({
      zIndex: zIndex + i,
      size,
      palette: selectedPalette,
      variant,
    })
  })
}
