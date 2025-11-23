import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePerchingLogic } from '../usePerchingLogic';
import type { BirdState } from '../../types';

const createMockBird = (id: number): BirdState => ({
  x: 100 + id * 10,
  y: 200 + id * 10,
  targetX: 150,
  targetY: 250,
  velocityX: 0,
  velocityY: 0,
  isPerched: false,
  rotation: 0,
  zIndex: id,
  size: 60,
  mode: 'free',
  wingPhase: 50,
  palette: {
    dark: '#1F2937',
    mid: '#374151',
    light: '#9CA3AF',
    accent: '#F6AD55',
  },
  variant: 'classic',
});

describe('usePerchingLogic', () => {
  it('returns birds array', () => {
    const birds = [createMockBird(0), createMockBird(1)];
    const { result, unmount } = renderHook(() =>
      usePerchingLogic({
        birds,
        hasActualMouse: false,
        isMouseMoving: false,
        perchDelaySeconds: 2,
      }),
    );

    expect(result.current.birds).toHaveLength(2);
    unmount();
  });

  it('keeps birds in free mode when mouse is moving', () => {
    const birds = [createMockBird(0)];
    const { result, unmount } = renderHook(() =>
      usePerchingLogic({
        birds,
        hasActualMouse: true,
        isMouseMoving: true,
        perchDelaySeconds: 2,
      }),
    );

    expect(result.current.birds[0].mode).toBe('free');
    unmount();
  });

  it('keeps birds in free mode when no actual mouse', () => {
    const birds = [createMockBird(0)];
    const { result, unmount } = renderHook(() =>
      usePerchingLogic({
        birds,
        hasActualMouse: false,
        isMouseMoving: false,
        perchDelaySeconds: 2,
      }),
    );

    expect(result.current.birds[0].mode).toBe('free');
    unmount();
  });

  it('handles empty bird array', () => {
    const { result, unmount } = renderHook(() =>
      usePerchingLogic({
        birds: [],
        hasActualMouse: false,
        isMouseMoving: false,
        perchDelaySeconds: 2,
      }),
    );

    expect(result.current.birds).toHaveLength(0);
    unmount();
  });
});
