/**
 * @module react-bird-flock
 * @description Interactive bird flock animation component for React applications.
 * Features intelligent flocking behavior, perching mechanics, and customizable appearance.
 */

// Components
export { BirdFlock as default } from "./BirdFlock";
export { BirdFlock } from "./BirdFlock";
export { Bird } from "./components/Bird";

// Bird Variants
export { ClassicBird } from "./components/birds/ClassicBird";
export { SimpleBird } from "./components/birds/SimpleBird";
export { DetailedBird } from "./components/birds/DetailedBird";

// Types
export type { BirdState, Palette } from "./types";

// Hooks
export { useMouseTracking } from "./hooks/useMouseTracking";
export { useBirdFlock } from "./hooks/useBirdFlock";

// Utilities
export { initializeBirds } from "./utils/initializeBirds";
export { PALETTES } from "./constants/palettes";
