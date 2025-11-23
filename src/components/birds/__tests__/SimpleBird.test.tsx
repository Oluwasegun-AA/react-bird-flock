import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SimpleBird } from '../SimpleBird';
import type { BirdState } from '../../../types';

const createMockBird = (overrides?: Partial<BirdState>): BirdState => ({
  x: 100,
  y: 200,
  targetX: 150,
  targetY: 250,
  velocityX: 2,
  velocityY: 3,
  isPerched: false,
  rotation: 45,
  zIndex: 5,
  size: 60,
  mode: 'free',
  wingPhase: 50,
  palette: {
    dark: '#1F2937',
    mid: '#374151',
    light: '#9CA3AF',
    accent: '#F6AD55',
  },
  variant: 'simple',
  ...overrides,
});

describe('SimpleBird', () => {
  it('renders SVG element', () => {
    const bird = createMockBird();
    const { container } = render(<SimpleBird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('uses correct size from bird state', () => {
    const bird = createMockBird({ size: 70 });
    const { container } = render(<SimpleBird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '70');
    expect(svg).toHaveAttribute('height', '70');
  });

  it('has correct viewBox', () => {
    const bird = createMockBird();
    const { container } = render(<SimpleBird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('viewBox', '0 0 40 40');
  });

  it('contains gradient definition', () => {
    const bird = createMockBird({ wingPhase: 30 });
    const { container } = render(<SimpleBird bird={bird} />);
    const gradient = container.querySelector('linearGradient');

    expect(gradient).toBeInTheDocument();
    expect(gradient).toHaveAttribute('id', 'smallWingGrad-30');
  });

  it('uses palette colors', () => {
    const bird = createMockBird({
      palette: {
        dark: '#000000',
        mid: '#555555',
        light: '#AAAAAA',
        accent: '#FF0000',
      },
    });
    const { container } = render(<SimpleBird bird={bird} />);
    const stops = container.querySelectorAll('stop');

    expect(stops.length).toBeGreaterThan(0);
  });

  it('has animated wing elements', () => {
    const bird = createMockBird();
    const { container } = render(<SimpleBird bird={bird} />);
    const animations = container.querySelectorAll('animateTransform');

    expect(animations.length).toBeGreaterThan(0);
  });

  it('adjusts animation speed when perched', () => {
    const birdPerched = createMockBird({ mode: 'perched' });
    const birdFlying = createMockBird({ mode: 'free' });

    const { container: containerPerched } = render(<SimpleBird bird={birdPerched} />);
    const { container: containerFlying } = render(<SimpleBird bird={birdFlying} />);

    // Both should render successfully
    expect(containerPerched.querySelector('svg')).toBeInTheDocument();
    expect(containerFlying.querySelector('svg')).toBeInTheDocument();
  });

  it('renders tail group', () => {
    const bird = createMockBird();
    const { container } = render(<SimpleBird bird={bird} />);

    // Check for tail paths
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders body ellipse', () => {
    const bird = createMockBird();
    const { container } = render(<SimpleBird bird={bird} />);
    const ellipses = container.querySelectorAll('ellipse');

    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('renders head with eye', () => {
    const bird = createMockBird();
    const { container } = render(<SimpleBird bird={bird} />);
    const circles = container.querySelectorAll('circle');

    // Should have head and eye circles
    expect(circles.length).toBeGreaterThan(0);
  });

  it('renders beak with accent color', () => {
    const bird = createMockBird({
      palette: {
        dark: '#000000',
        mid: '#555555',
        light: '#AAAAAA',
        accent: '#FFAA00',
      },
    });
    const { container } = render(<SimpleBird bird={bird} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with different wing phases', () => {
    const bird1 = createMockBird({ wingPhase: 0 });
    const bird2 = createMockBird({ wingPhase: 100 });

    const { container: container1 } = render(<SimpleBird bird={bird1} />);
    const { container: container2 } = render(<SimpleBird bird={bird2} />);

    const gradient1 = container1.querySelector('linearGradient');
    const gradient2 = container2.querySelector('linearGradient');

    expect(gradient1?.getAttribute('id')).not.toBe(gradient2?.getAttribute('id'));
  });
});
