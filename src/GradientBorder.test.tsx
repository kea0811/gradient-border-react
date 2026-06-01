import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { GradientBorder } from './GradientBorder';

describe('GradientBorder', () => {
  it('renders children inside the border', () => {
    render(
      <GradientBorder>
        <button type="button">Click me</button>
      </GradientBorder>,
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('exposes the structural data attributes', () => {
    const { container } = render(<GradientBorder>hi</GradientBorder>);
    expect(container.querySelector('[data-gradient-border]')).not.toBeNull();
    expect(container.querySelector('[data-gradient-border-ring]')).not.toBeNull();
    expect(container.querySelector('[data-gradient-border-content]')).not.toBeNull();
  });

  it('omits the glow layer by default and renders it (hidden) when glow is set', () => {
    const { container, rerender } = render(<GradientBorder>hi</GradientBorder>);
    expect(container.querySelector('[data-gradient-border-glow]')).toBeNull();

    rerender(<GradientBorder glow>hi</GradientBorder>);
    const glow = container.querySelector('[data-gradient-border-glow]');
    expect(glow).not.toBeNull();
    expect(glow).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards refs and arbitrary div props', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <GradientBorder ref={ref} id="card" className="fancy" data-foo="bar" aria-label="profile">
        x
      </GradientBorder>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('id', 'card');
    expect(ref.current).toHaveClass('fancy');
    expect(ref.current).toHaveAttribute('data-foo', 'bar');
    expect(ref.current).toHaveAttribute('aria-label', 'profile');
  });

  it('merges a custom style prop onto the wrapper', () => {
    const { container } = render(<GradientBorder style={{ width: 200 }}>x</GradientBorder>);
    const el = container.querySelector('[data-gradient-border]') as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.position).toBe('relative');
  });

  it('registers the keyframes once mounted', () => {
    render(<GradientBorder>x</GradientBorder>);
    expect(document.getElementById('gradient-border-react-keyframes')).not.toBeNull();
  });
});
