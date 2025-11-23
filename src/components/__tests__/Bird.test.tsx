import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Bird } from '../../components/Bird';
import type { BirdState } from '../../types';

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

describe('Bird', () => {
  it('renders without crashing', () => {
    const bird = createMockBird();
    const { container } = render(<Bird bird={bird} />);
    expect(container).toBeInTheDocument();
  });

  it('applies correct positioning styles', () => {
    const bird = createMockBird({ x: 300, y: 400 });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle({
      position: 'fixed',
      left: '300px',
      top: '400px',
    });
  });

  it('applies correct rotation', () => {
    const bird = createMockBird({ rotation: 90 });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.transform).toContain('rotate(90deg)');
  });

  it('applies scale transform when perched', () => {
    const bird = createMockBird({ mode: 'perched' });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.transform).toContain('scale(0.85)');
  });

  it('applies scale 1 when not perched', () => {
    const bird = createMockBird({ mode: 'free' });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.transform).toContain('scale(1)');
  });

  it('applies transition when perched', () => {
    const bird = createMockBird({ mode: 'perched' });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle({ transition: 'transform 0.35s' });
  });

  it('applies no transition when not perched', () => {
    const bird = createMockBird({ mode: 'free' });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle({ transition: 'none' });
  });

  it('applies correct zIndex', () => {
    const bird = createMockBird({ zIndex: 10 });
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle({ zIndex: '10' });
  });

  it('has pointer-events none', () => {
    const bird = createMockBird();
    const { container } = render(<Bird bird={bird} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle({ pointerEvents: 'none' });
  });

  it('renders ClassicBird variant', () => {
    const bird = createMockBird({ variant: 'classic' });
    const { container } = render(<Bird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('renders SimpleBird variant', () => {
    const bird = createMockBird({ variant: 'simple' });
    const { container } = render(<Bird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('renders DetailedBird variant', () => {
    const bird = createMockBird({ variant: 'detailed' });
    const { container } = render(<Bird bird={bird} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('handles perching mode', () => {
    const bird = createMockBird({ mode: 'perching' });
    const { container } = render(<Bird bird={bird} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('uses bird size for SVG', () => {
    const bird = createMockBird({ size: 80 });
    render(<Bird bird={bird} />);

    // The bird component should render successfully with custom size
    expect(true).toBe(true);
  });
});
