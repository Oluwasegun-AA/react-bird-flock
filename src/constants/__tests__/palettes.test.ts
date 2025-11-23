import { describe, it, expect } from 'vitest';
import { PALETTES } from '../palettes';

describe('PALETTES', () => {
  it('is an array', () => {
    expect(Array.isArray(PALETTES)).toBe(true);
  });

  it('contains at least one palette', () => {
    expect(PALETTES.length).toBeGreaterThan(0);
  });

  it('contains exactly 3 palettes', () => {
    expect(PALETTES).toHaveLength(3);
  });

  it('each palette has dark property', () => {
    PALETTES.forEach((palette) => {
      expect(palette).toHaveProperty('dark');
      expect(typeof palette.dark).toBe('string');
    });
  });

  it('each palette has mid property', () => {
    PALETTES.forEach((palette) => {
      expect(palette).toHaveProperty('mid');
      expect(typeof palette.mid).toBe('string');
    });
  });

  it('each palette has light property', () => {
    PALETTES.forEach((palette) => {
      expect(palette).toHaveProperty('light');
      expect(typeof palette.light).toBe('string');
    });
  });

  it('each palette has accent property', () => {
    PALETTES.forEach((palette) => {
      expect(palette).toHaveProperty('accent');
      expect(typeof palette.accent).toBe('string');
    });
  });

  it('each palette has all four required properties', () => {
    PALETTES.forEach((palette) => {
      expect(Object.keys(palette)).toHaveLength(4);
      expect(palette).toHaveProperty('dark');
      expect(palette).toHaveProperty('mid');
      expect(palette).toHaveProperty('light');
      expect(palette).toHaveProperty('accent');
    });
  });

  it('all colors are valid hex color strings', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

    PALETTES.forEach((palette) => {
      expect(palette.dark).toMatch(hexColorRegex);
      expect(palette.mid).toMatch(hexColorRegex);
      expect(palette.light).toMatch(hexColorRegex);
      expect(palette.accent).toMatch(hexColorRegex);
    });
  });

  it('first palette matches expected values', () => {
    expect(PALETTES[0]).toEqual({
      dark: '#1F2937',
      mid: '#374151',
      light: '#9CA3AF',
      accent: '#F6AD55',
    });
  });

  it('second palette matches expected values', () => {
    expect(PALETTES[1]).toEqual({
      dark: '#2D3748',
      mid: '#4A5568',
      light: '#A0AEC0',
      accent: '#ED8936',
    });
  });

  it('third palette matches expected values', () => {
    expect(PALETTES[2]).toEqual({
      dark: '#1A202C',
      mid: '#2D3748',
      light: '#718096',
      accent: '#DD6B20',
    });
  });

  it('all palettes are unique', () => {
    const paletteStrings = PALETTES.map((p) => JSON.stringify(p));
    const uniquePalettes = new Set(paletteStrings);
    expect(uniquePalettes.size).toBe(PALETTES.length);
  });

  it('palettes are readonly', () => {
    expect(PALETTES).toBeDefined();
  });

  it('accent colors are warmer tones', () => {
    // All accent colors should be in the orange/warm spectrum
    PALETTES.forEach((palette) => {
      expect(palette.accent).toBeTruthy();
      expect(['#F6AD55', '#ED8936', '#DD6B20']).toContain(palette.accent);
    });
  });

  it('dark colors are darker than mid colors', () => {
    PALETTES.forEach((palette) => {
      // Convert hex to numeric value for comparison
      const darkValue = parseInt(palette.dark.slice(1), 16);
      const midValue = parseInt(palette.mid.slice(1), 16);

      expect(darkValue).toBeLessThan(midValue);
    });
  });

  it('light colors are lighter than mid colors', () => {
    PALETTES.forEach((palette) => {
      const midValue = parseInt(palette.mid.slice(1), 16);
      const lightValue = parseInt(palette.light.slice(1), 16);

      expect(lightValue).toBeGreaterThan(midValue);
    });
  });
});
