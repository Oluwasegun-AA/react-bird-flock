import { describe, it, expect, beforeEach } from 'vitest';
import { initializeBirds } from '../initializeBirds';
import { PALETTES } from '../../constants/palettes';
import type { Palette } from '../../types';

describe('initializeBirds', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('creates correct number of birds', () => {
    const birds = initializeBirds({ count: 5, size: 60, zIndex: 0 });
    expect(birds).toHaveLength(5);
  });

  it('creates empty array when count is 0', () => {
    const birds = initializeBirds({ count: 0, size: 60, zIndex: 0 });
    expect(birds).toHaveLength(0);
  });

  it('assigns correct size to birds', () => {
    const birds = initializeBirds({ count: 3, size: 80, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.size).toBe(80);
    });
  });

  it('assigns sequential zIndex values', () => {
    const birds = initializeBirds({ count: 3, size: 60, zIndex: 10 });
    expect(birds[0].zIndex).toBe(10);
    expect(birds[1].zIndex).toBe(11);
    expect(birds[2].zIndex).toBe(12);
  });

  it('initializes birds with free mode', () => {
    const birds = initializeBirds({ count: 3, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.mode).toBe('free');
    });
  });

  it('initializes birds with isPerched false', () => {
    const birds = initializeBirds({ count: 3, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.isPerched).toBe(false);
    });
  });

  it('initializes birds with zero velocity', () => {
    const birds = initializeBirds({ count: 3, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.velocityX).toBe(0);
      expect(bird.velocityY).toBe(0);
    });
  });

  it('assigns random positions within window bounds', () => {
    const birds = initializeBirds({ count: 10, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.x).toBeGreaterThanOrEqual(0);
      expect(bird.x).toBeLessThanOrEqual(1024);
      expect(bird.y).toBeGreaterThanOrEqual(0);
      expect(bird.y).toBeLessThanOrEqual(768);
    });
  });

  it('assigns random target positions within window bounds', () => {
    const birds = initializeBirds({ count: 10, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.targetX).toBeGreaterThanOrEqual(0);
      expect(bird.targetX).toBeLessThanOrEqual(1024);
      expect(bird.targetY).toBeGreaterThanOrEqual(0);
      expect(bird.targetY).toBeLessThanOrEqual(768);
    });
  });

  it('assigns palette from default PALETTES when no custom palette provided', () => {
    const birds = initializeBirds({ count: 5, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      const isPaletteFromDefaults = PALETTES.some(
        (p) =>
          p.dark === bird.palette.dark &&
          p.mid === bird.palette.mid &&
          p.light === bird.palette.light &&
          p.accent === bird.palette.accent,
      );
      expect(isPaletteFromDefaults).toBe(true);
    });
  });

  it('uses custom single palette when provided', () => {
    const customPalette: Palette = {
      dark: '#000000',
      mid: '#555555',
      light: '#AAAAAA',
      accent: '#FF0000',
    };
    const birds = initializeBirds({
      count: 3,
      size: 60,
      zIndex: 0,
      palettes: customPalette,
    });

    birds.forEach((bird) => {
      expect(bird.palette).toEqual(customPalette);
    });
  });

  it('randomly assigns from custom palette array', () => {
    const palette1: Palette = {
      dark: '#000000',
      mid: '#111111',
      light: '#222222',
      accent: '#333333',
    };
    const palette2: Palette = {
      dark: '#444444',
      mid: '#555555',
      light: '#666666',
      accent: '#777777',
    };
    const birds = initializeBirds({
      count: 10,
      size: 60,
      zIndex: 0,
      palettes: [palette1, palette2],
    });

    birds.forEach((bird) => {
      const matchesPalette1 = JSON.stringify(bird.palette) === JSON.stringify(palette1);
      const matchesPalette2 = JSON.stringify(bird.palette) === JSON.stringify(palette2);
      expect(matchesPalette1 || matchesPalette2).toBe(true);
    });
  });

  it('assigns random bird variants', () => {
    const birds = initializeBirds({ count: 20, size: 60, zIndex: 0 });
    const variants = birds.map((b) => b.variant);

    // Should have some variety in variants
    expect(variants.some((v) => v === 'classic')).toBe(true);
    expect(variants.some((v) => v === 'simple')).toBe(true);
    expect(variants.some((v) => v === 'detailed')).toBe(true);
  });

  it('assigns random wing phases', () => {
    const birds = initializeBirds({ count: 10, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.wingPhase).toBeGreaterThanOrEqual(0);
      expect(bird.wingPhase).toBeLessThanOrEqual(100);
    });
  });

  it('initializes rotation to 0', () => {
    const birds = initializeBirds({ count: 3, size: 60, zIndex: 0 });
    birds.forEach((bird) => {
      expect(bird.rotation).toBe(0);
    });
  });

  it('creates birds with all required properties', () => {
    const birds = initializeBirds({ count: 1, size: 60, zIndex: 0 });
    const bird = birds[0];

    expect(bird).toHaveProperty('x');
    expect(bird).toHaveProperty('y');
    expect(bird).toHaveProperty('targetX');
    expect(bird).toHaveProperty('targetY');
    expect(bird).toHaveProperty('velocityX');
    expect(bird).toHaveProperty('velocityY');
    expect(bird).toHaveProperty('isPerched');
    expect(bird).toHaveProperty('rotation');
    expect(bird).toHaveProperty('zIndex');
    expect(bird).toHaveProperty('size');
    expect(bird).toHaveProperty('mode');
    expect(bird).toHaveProperty('wingPhase');
    expect(bird).toHaveProperty('palette');
    expect(bird).toHaveProperty('variant');
  });

  it('handles large bird counts', () => {
    const birds = initializeBirds({ count: 100, size: 60, zIndex: 0 });
    expect(birds).toHaveLength(100);
  });
});
