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
 * @property {Palette | Palette[]} [palettes] - Custom color palette(s) for birds. If array provided, palettes are randomly assigned
 */
export interface BirdFlockProps {
  count?: number
  size?: number
  zIndex?: number
  topSpeed?: number
  perchDelaySeconds?: number
  clusterRadius?: number
  clusterJitter?: number
  palettes?: Palette | Palette[]
}
