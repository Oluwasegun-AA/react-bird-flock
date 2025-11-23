import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /bird flock/i })).toBeInTheDocument();
  });

  it('displays instructions for mouse interaction', () => {
    render(<App />);
    expect(screen.getByText(/move your mouse around to unsettle the birds/i)).toBeInTheDocument();
  });

  it('displays perching instructions', () => {
    render(<App />);
    expect(screen.getByText(/they'll perch when you're idle/i)).toBeInTheDocument();
  });

  it('renders BirdFlock component with expected props', () => {
    const { container } = render(<App />);
    // BirdFlock creates a fixed position div
    const birdFlockContainer = container.querySelector('[aria-hidden="true"]');
    expect(birdFlockContainer).toBeInTheDocument();
    expect(birdFlockContainer).toHaveStyle({ position: 'fixed' });
  });

  it('has centered layout styling', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });
});
