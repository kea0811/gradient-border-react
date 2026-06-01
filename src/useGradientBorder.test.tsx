import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useGradientBorder } from './useGradientBorder';

function ProbeNoArgs() {
  const styles = useGradientBorder();
  return <div data-testid="noargs" data-anim={String(styles.ring.animation)} />;
}

function ProbeWithArgs() {
  const styles = useGradientBorder({ colors: ['#fff', '#000'], duration: 3 });
  return <div data-testid="withargs" data-anim={String(styles.ring.animation)} />;
}

describe('useGradientBorder', () => {
  it('returns animated styles with default options', () => {
    render(<ProbeNoArgs />);
    expect(screen.getByTestId('noargs').getAttribute('data-anim')).toContain('gb-spin');
  });

  it('accepts caller-supplied options', () => {
    render(<ProbeWithArgs />);
    expect(screen.getByTestId('withargs').getAttribute('data-anim')).toContain('3s');
  });

  it('registers the keyframes on mount', () => {
    render(<ProbeNoArgs />);
    expect(document.getElementById('gradient-border-react-keyframes')).not.toBeNull();
  });
});
