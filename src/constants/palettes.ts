import type { Palette } from "../types"

/**
 * Predefined color palettes for birds.
 * Each palette contains complementary colors for a cohesive bird appearance.
 * Palettes are randomly assigned to birds on initialization.
 * @type {Palette[]}
 */
export const PALETTES: readonly Palette[] = [
  { dark: "#1F2937", mid: "#374151", light: "#9CA3AF", accent: "#F6AD55" },
  { dark: "#2D3748", mid: "#4A5568", light: "#A0AEC0", accent: "#ED8936" },
  { dark: "#1A202C", mid: "#2D3748", light: "#718096", accent: "#DD6B20" },
] as const
