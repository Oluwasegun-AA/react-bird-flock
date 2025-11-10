/**
 * Color palette configuration for birds.
 * @interface Palette
 * @property {string} dark - Primary dark color for bird bodies and outlines
 * @property {string} mid - Mid-tone color for wings and details
 * @property {string} light - Light color for highlights and accents
 * @property {string} accent - Bright accent color for beak and special features
 */
export interface Palette {
  dark: string
  mid: string
  light: string
  accent: string
}

/**
 * Complete state representation of a single bird in the flock.
 * @interface BirdState
 * @property {number} x - Current X coordinate on screen
 * @property {number} y - Current Y coordinate on screen
 * @property {number} targetX - Target X coordinate bird is flying towards
 * @property {number} targetY - Target Y coordinate bird is flying towards
 * @property {number} velocityX - Current horizontal velocity
 * @property {number} velocityY - Current vertical velocity
 * @property {boolean} isPerched - Whether bird is currently perched (stationary)
 * @property {number} rotation - Current rotation angle in degrees
 * @property {number} zIndex - Stacking order for rendering
 * @property {number} size - Size of bird in pixels
 * @property {"free" | "perching" | "perched"} mode - Current behavior mode
 * @property {number} wingPhase - Animation phase for wing flapping (0-100)
 * @property {Palette} palette - Color palette for this bird
 * @property {"detailed" | "simple" | "classic"} variant - SVG variant style
 */
export interface BirdState {
  x: number
  y: number
  targetX: number
  targetY: number
  velocityX: number
  velocityY: number
  isPerched: boolean
  rotation: number
  zIndex: number
  size: number
  mode: "free" | "perching" | "perched"
  wingPhase: number
  palette: Palette
  variant: "detailed" | "simple" | "classic"
}
