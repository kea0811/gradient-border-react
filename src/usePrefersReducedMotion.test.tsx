import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

function Probe() {
  const reduced = usePrefersReducedMotion();
  return <span data-testid="rm">{reduced ? 'yes' : 'no'}</span>;
}

interface MockMql {
  matches: boolean;
  addEventListener?: (type: string, cb: (e: MediaQueryListEvent) => void) => void;
  removeEventListener?: (type: string, cb: (e: MediaQueryListEvent) => void) => void;
  addListener?: (cb: (e: MediaQueryListEvent) => void) => void;
  removeListener?: (cb: (e: MediaQueryListEvent) => void) => void;
}

// jsdom doesn't implement matchMedia, so assign it directly rather than spying.
const realMatchMedia = window.matchMedia;

function setMatchMedia(mql: MockMql | undefined): void {
  if (mql === undefined) {
    // @ts-expect-error force the no-matchMedia (SSR-like) path
    delete window.matchMedia;
    return;
  }
  window.matchMedia = (() => mql) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  if (realMatchMedia) {
    window.matchMedia = realMatchMedia;
  } else {
    // @ts-expect-error restore the absent default
    delete window.matchMedia;
  }
  vi.restoreAllMocks();
});

describe('usePrefersReducedMotion', () => {
  it('returns false when matchMedia reports no preference', () => {
    setMatchMedia({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
    render(<Probe />);
    expect(screen.getByTestId('rm')).toHaveTextContent('no');
  });

  it('returns true when matchMedia reports a reduced-motion preference', () => {
    setMatchMedia({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() });
    render(<Probe />);
    expect(screen.getByTestId('rm')).toHaveTextContent('yes');
  });

  it('updates live when the media query changes (addEventListener)', () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined;
    setMatchMedia({
      matches: false,
      addEventListener: (_type, cb) => {
        listener = cb;
      },
      removeEventListener: vi.fn(),
    });

    render(<Probe />);
    expect(screen.getByTestId('rm')).toHaveTextContent('no');

    act(() => listener?.({ matches: true } as MediaQueryListEvent));
    expect(screen.getByTestId('rm')).toHaveTextContent('yes');
  });

  it('falls back to addListener/removeListener on legacy browsers', () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined;
    const addListener = vi.fn((cb: (e: MediaQueryListEvent) => void) => {
      listener = cb;
    });
    const removeListener = vi.fn();
    setMatchMedia({ matches: false, addListener, removeListener });

    const { unmount } = render(<Probe />);
    expect(addListener).toHaveBeenCalledTimes(1);

    act(() => listener?.({ matches: true } as MediaQueryListEvent));
    expect(screen.getByTestId('rm')).toHaveTextContent('yes');

    unmount();
    expect(removeListener).toHaveBeenCalledTimes(1);
  });

  it('cleans up the modern listener on unmount', () => {
    const removeEventListener = vi.fn();
    setMatchMedia({ matches: false, addEventListener: vi.fn(), removeEventListener });
    const { unmount } = render(<Probe />);
    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('returns false when matchMedia is unavailable (SSR-like)', () => {
    setMatchMedia(undefined);
    render(<Probe />);
    expect(screen.getByTestId('rm')).toHaveTextContent('no');
  });
});
