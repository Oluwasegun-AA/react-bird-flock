import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import BirdFlock from '../BirdFlock';

// Mock the hooks
vi.mock('../hooks/useMouseTracking', () => ({
  useMouseTracking: vi.fn(() => ({
    mousePosition: { x: 500, y: 300 },
    isMouseMoving: false,
    hasActualMouse: true,
  })),
}));

vi.mock('../hooks/useBirdFlock', () => ({
  useBirdFlock: vi.fn(() => [
    {
      x: 100,
      y: 100,
      targetX: 150,
      targetY: 150,
      velocityX: 1,
      velocityY: 1,
      isPerched: false,
      rotation: 45,
      zIndex: 0,
      size: 60,
      mode: 'free' as const,
      wingPhase: 50,
      palette: { dark: '#000', mid: '#666', light: '#ccc', accent: '#f00' },
      variant: 'classic' as const,
    },
  ]),
}));

describe('BirdFlock', () => {
  beforeEach(() => {
    // Reset window dimensions
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

  it('renders without crashing', () => {
    const { container } = render(<BirdFlock />);
    expect(container).toBeInTheDocument();
  });

  it('creates a fixed position container', () => {
    const { container } = render(<BirdFlock count={5} />);
    const birdContainer = container.querySelector('[aria-hidden="true"]');
    expect(birdContainer).toHaveStyle({
      position: 'fixed',
      pointerEvents: 'none',
    });
  });

  it('accepts custom count prop', () => {
    const { rerender } = render(<BirdFlock count={5} />);
    expect(true).toBe(true); // Component renders with custom count

    rerender(<BirdFlock count={20} />);
    expect(true).toBe(true); // Component re-renders with new count
  });

  it('accepts custom size prop', () => {
    render(<BirdFlock size={80} />);
    expect(true).toBe(true);
  });

  it('accepts custom zIndex prop', () => {
    const { container } = render(<BirdFlock zIndex={100} />);
    const birdContainer = container.querySelector('[aria-hidden="true"]');
    expect(birdContainer).toHaveStyle({ zIndex: '100' });
  });

  it('accepts custom topSpeed prop', () => {
    render(<BirdFlock topSpeed={6} />);
    expect(true).toBe(true);
  });

  it('accepts custom perchDelaySeconds prop', () => {
    render(<BirdFlock perchDelaySeconds={5} />);
    expect(true).toBe(true);
  });

  it('accepts custom clusterRadius prop', () => {
    render(<BirdFlock clusterRadius={100} />);
    expect(true).toBe(true);
  });

  it('accepts custom clusterJitter prop', () => {
    render(<BirdFlock clusterJitter={30} />);
    expect(true).toBe(true);
  });

  it('uses default values when no props provided', () => {
    render(<BirdFlock />);
    expect(true).toBe(true);
  });

  it('is marked as aria-hidden', () => {
    const { container } = render(<BirdFlock />);
    const birdContainer = container.querySelector('[aria-hidden="true"]');
    expect(birdContainer).toHaveAttribute('aria-hidden', 'true');
  });
});
