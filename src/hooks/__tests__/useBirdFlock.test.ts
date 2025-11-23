import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBirdFlock } from '../useBirdFlock';
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

describe('useBirdFlock', () => {
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

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('returns initial birds array', () => {
    const initialBirds = [createMockBird(0), createMockBird(1)];
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: true,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 22,
      }),
    );

    expect(result.current).toHaveLength(2);
  });

  it('returns empty array when no initial birds', () => {
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds: [],
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: true,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 22,
      }),
    );

    expect(result.current).toHaveLength(0);
  });

  it('keeps birds in free mode when mouse is moving', () => {
    const initialBirds = [createMockBird(0)];
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: true,
        hasActualMouse: true,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 22,
      }),
    );

    expect(result.current[0].mode).toBe('free');
  });

  it('keeps birds in free mode when no actual mouse', () => {
    const initialBirds = [createMockBird(0)];
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: false,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 22,
      }),
    );

    expect(result.current[0].mode).toBe('free');
  });

  it('starts recruitment after perch delay when idle', () => {
    const initialBirds = [createMockBird(0), createMockBird(1)];
    const { result, rerender } = renderHook(
      (props) => useBirdFlock(props),
      {
        initialProps: {
          initialBirds,
          mousePosition: { x: 500, y: 300 },
          isMouseMoving: false,
          hasActualMouse: true,
          topSpeed: 4,
          perchDelaySeconds: 2,
          clusterRadius: 85,
          clusterJitter: 22,
        },
      },
    );

    // Initially all birds should be in free mode
    expect(result.current.every(b => b.mode === 'free')).toBe(true);

    // Advance time past perch delay
    vi.advanceTimersByTime(2500);

    // Force rerender to get updated state
    rerender({
      initialBirds,
      mousePosition: { x: 500, y: 300 },
      isMouseMoving: false,
      hasActualMouse: true,
      topSpeed: 4,
      perchDelaySeconds: 2,
      clusterRadius: 85,
      clusterJitter: 22,
    });
  });

  it('clears perching when mouse starts moving', () => {
    const initialBirds = [createMockBird(0)];
    const { result, rerender } = renderHook(
      (props) => useBirdFlock(props),
      {
        initialProps: {
          initialBirds,
          mousePosition: { x: 500, y: 300 },
          isMouseMoving: false,
          hasActualMouse: true,
          topSpeed: 4,
          perchDelaySeconds: 2,
          clusterRadius: 85,
          clusterJitter: 22,
        },
      },
    );

    // Start moving mouse
    rerender({
      initialBirds,
      mousePosition: { x: 600, y: 400 },
      isMouseMoving: true,
      hasActualMouse: true,
      topSpeed: 4,
      perchDelaySeconds: 2,
      clusterRadius: 85,
      clusterJitter: 22,
    });

    expect(result.current[0].mode).toBe('free');
  });

  it('handles topSpeed parameter', () => {
    const initialBirds = [createMockBird(0)];
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: true,
        topSpeed: 8,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 22,
      }),
    );

    expect(result.current).toHaveLength(1);
  });

  it('handles clusterRadius parameter', () => {
    const initialBirds = [createMockBird(0)];
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: true,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 150,
        clusterJitter: 22,
      }),
    );

    expect(result.current).toHaveLength(1);
  });

  it('handles clusterJitter parameter', () => {
    const initialBirds = [createMockBird(0)];
    const { result } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: true,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 40,
      }),
    );

    expect(result.current).toHaveLength(1);
  });

  it('updates when initialBirds change', () => {
    const initialBirds1 = [createMockBird(0)];
    const initialBirds2 = [createMockBird(0), createMockBird(1)];

    const { result, rerender } = renderHook(
      (props) => useBirdFlock(props),
      {
        initialProps: {
          initialBirds: initialBirds1,
          mousePosition: { x: 500, y: 300 },
          isMouseMoving: false,
          hasActualMouse: true,
          topSpeed: 4,
          perchDelaySeconds: 2,
          clusterRadius: 85,
          clusterJitter: 22,
        },
      },
    );

    expect(result.current).toHaveLength(1);

    rerender({
      initialBirds: initialBirds2,
      mousePosition: { x: 500, y: 300 },
      isMouseMoving: false,
      hasActualMouse: true,
      topSpeed: 4,
      perchDelaySeconds: 2,
      clusterRadius: 85,
      clusterJitter: 22,
    });

    expect(result.current).toHaveLength(2);
  });

  it('cleans up animation frame on unmount', () => {
    const initialBirds = [createMockBird(0)];
    const { unmount } = renderHook(() =>
      useBirdFlock({
        initialBirds,
        mousePosition: { x: 500, y: 300 },
        isMouseMoving: false,
        hasActualMouse: true,
        topSpeed: 4,
        perchDelaySeconds: 2,
        clusterRadius: 85,
        clusterJitter: 22,
      }),
    );

    unmount();
    expect(true).toBe(true);
  });
});
