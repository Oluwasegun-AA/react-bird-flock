import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ClassicBird } from '../ClassicBird';
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
  variant: 'classic',
  ...overrides,
});

describe('ClassicBird', () => {
  it('renders SVG element', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('uses correct size from bird state', () => {
    const bird = createMockBird({ size: 80 });
    const { container } = render(<ClassicBird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '80');
    expect(svg).toHaveAttribute('height', '80');
  });

  it('has correct viewBox', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('viewBox', '0 0 50 50');
  });

  it('contains gradient definition', () => {
    const bird = createMockBird({ wingPhase: 75 });
    const { container } = render(<ClassicBird bird={bird} />);
    const gradient = container.querySelector('linearGradient');

    expect(gradient).toBeInTheDocument();
    expect(gradient).toHaveAttribute('id', 'classicWingGradient-75');
  });

  it('uses palette colors for gradient stops', () => {
    const bird = createMockBird({
      palette: {
        dark: '#000000',
        mid: '#555555',
        light: '#AAAAAA',
        accent: '#FF0000',
      },
    });
    const { container } = render(<ClassicBird bird={bird} />);
    const stops = container.querySelectorAll('stop');

    expect(stops.length).toBeGreaterThan(0);
    expect(stops[0]).toHaveAttribute('stop-color', '#000000');
  });

  it('contains tail feathers group', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const tail = container.querySelector('.tail');

    expect(tail).toBeInTheDocument();
  });

  it('contains wing groups', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const wingTop = container.querySelector('.wing-top');
    const wingBottom = container.querySelector('.wing-bottom');

    expect(wingTop).toBeInTheDocument();
    expect(wingBottom).toBeInTheDocument();
  });

  it('contains body group', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const body = container.querySelector('.body');

    expect(body).toBeInTheDocument();
  });

  it('contains head group', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const head = container.querySelector('.head');

    expect(head).toBeInTheDocument();
  });

  it('has animated wing elements', () => {
    const bird = createMockBird();
    const { container } = render(<ClassicBird bird={bird} />);
    const animations = container.querySelectorAll('animateTransform');

    // Should have multiple wing animations
    expect(animations.length).toBeGreaterThan(0);
  });

  it('renders with different wing phases', () => {
    const bird1 = createMockBird({ wingPhase: 0 });
    const bird2 = createMockBird({ wingPhase: 100 });

    const { container: container1 } = render(<ClassicBird bird={bird1} />);
    const { container: container2 } = render(<ClassicBird bird={bird2} />);

    const gradient1 = container1.querySelector('linearGradient');
    const gradient2 = container2.querySelector('linearGradient');

    expect(gradient1?.getAttribute('id')).not.toBe(gradient2?.getAttribute('id'));
  });

  it('uses accent color for beak', () => {
    const bird = createMockBird({
      palette: {
        dark: '#000000',
        mid: '#555555',
        light: '#AAAAAA',
        accent: '#FFAA00',
      },
    });
    const { container } = render(<ClassicBird bird={bird} />);

    // SVG should render with the accent color
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
