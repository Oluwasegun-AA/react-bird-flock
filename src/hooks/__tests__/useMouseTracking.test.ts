import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMouseTracking } from '../useMouseTracking';

describe('useMouseTracking', () => {
  beforeEach(() => {
    // Set up default window dimensions
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

  it('initializes with center screen position', () => {
    const { result } = renderHook(() => useMouseTracking());

    expect(result.current.mousePosition.x).toBe(512); // 1024 / 2
    expect(result.current.mousePosition.y).toBe(384); // 768 / 2
  });

  it('initializes with isMouseMoving as false', () => {
    const { result } = renderHook(() => useMouseTracking());

    expect(result.current.isMouseMoving).toBe(false);
  });

  it('initializes with hasActualMouse as false', () => {
    const { result } = renderHook(() => useMouseTracking());

    expect(result.current.hasActualMouse).toBe(false);
  });

  it('updates mouse position on mousemove', () => {
    const { result } = renderHook(() => useMouseTracking());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 300,
        clientY: 400,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.mousePosition.x).toBe(300);
    expect(result.current.mousePosition.y).toBe(400);
  });

  it('sets hasActualMouse to true on mousemove', () => {
    const { result } = renderHook(() => useMouseTracking());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.hasActualMouse).toBe(true);
  });

  it('sets isMouseMoving to true on significant movement', () => {
    const { result } = renderHook(() => useMouseTracking());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 520,
        clientY: 390,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.isMouseMoving).toBe(true);
  });

  it('ignores small movements within dead zone', () => {
    const { result } = renderHook(() => useMouseTracking());

    // First movement to establish position
    act(() => {
      const event1 = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      window.dispatchEvent(event1);
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Small movement within dead zone (< 2px)
    act(() => {
      const event2 = new MouseEvent('mousemove', {
        clientX: 101,
        clientY: 101,
      });
      window.dispatchEvent(event2);
    });

    expect(result.current.mousePosition.x).toBe(100); // Should not update
  });

  it('sets isMouseMoving to false after timeout', () => {
    const { result } = renderHook(() => useMouseTracking());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 520,
        clientY: 390,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.isMouseMoving).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.isMouseMoving).toBe(false);
  });

  it('detects touch events and disables mouse tracking', () => {
    const { result } = renderHook(() => useMouseTracking());

    act(() => {
      const touchEvent = new TouchEvent('touchstart');
      window.dispatchEvent(touchEvent);
    });

    expect(result.current.hasActualMouse).toBe(false);
  });

  it('does not set hasActualMouse after touch detected', () => {
    const { result } = renderHook(() => useMouseTracking());

    act(() => {
      const touchEvent = new TouchEvent('touchstart');
      window.dispatchEvent(touchEvent);
    });

    act(() => {
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
      });
      window.dispatchEvent(mouseEvent);
    });

    expect(result.current.hasActualMouse).toBe(false);
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useMouseTracking());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
  });
});
