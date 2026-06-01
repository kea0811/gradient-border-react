import { describe, it, expect, beforeEach } from 'vitest';
import { buildStyles, injectKeyframes, DEFAULTS } from './styles';

const STYLE_ID = 'gradient-border-react-keyframes';

describe('injectKeyframes', () => {
  beforeEach(() => {
    document.getElementById(STYLE_ID)?.remove();
  });

  it('appends a single <style> carrying the @property + keyframes', () => {
    injectKeyframes(document);
    const el = document.getElementById(STYLE_ID);
    expect(el).not.toBeNull();
    expect(el?.tagName).toBe('STYLE');
    expect(el?.textContent).toContain('@property --gb-angle');
    expect(el?.textContent).toContain('gb-spin');
    expect(el?.textContent).toContain('gb-spin-reverse');
  });

  it('is idempotent — a second call adds nothing', () => {
    injectKeyframes(document);
    injectKeyframes(document);
    expect(document.querySelectorAll(`#${STYLE_ID}`).length).toBe(1);
  });
});

describe('buildStyles', () => {
  it('uses defaults when called with no arguments', () => {
    const s = buildStyles();
    expect(s.ring.padding).toBe(DEFAULTS.borderWidth);
    expect(s.ring.borderRadius).toBe(DEFAULTS.radius);
    expect(s.ring.animation).toBe('gb-spin 4s linear infinite');
    expect(s.glow.animation).toBe('gb-spin 4s linear infinite');
    expect(String(s.ring.background)).toContain('conic-gradient');
    expect(s.content.background).toBe('transparent');
    expect(s.outer.position).toBe('relative');
  });

  it('honors every provided option', () => {
    const s = buildStyles(
      {
        colors: ['#ffffff'],
        borderWidth: 6,
        radius: 24,
        duration: 2,
        direction: 'ccw',
        paused: false,
        background: '#101014',
        glow: true,
      },
      false,
    );
    expect(s.ring.padding).toBe(6);
    expect(s.ring.borderRadius).toBe(24);
    expect(s.content.borderRadius).toBe(18); // radius - borderWidth
    expect(s.ring.animation).toBe('gb-spin-reverse 2s linear infinite');
    expect(s.content.background).toBe('#101014');
    expect(String(s.glow.filter)).toContain('blur');
  });

  it('duplicates a single color into a valid two-stop gradient', () => {
    const s = buildStyles({ colors: ['#abcdef'] });
    expect(String(s.ring.background)).toContain('#abcdef, #abcdef');
  });

  it('falls back to a default color when the list is empty', () => {
    const s = buildStyles({ colors: [] });
    expect(String(s.ring.background)).toContain(DEFAULTS.colors[0]);
  });

  it('disables animation when prefers-reduced-motion is set', () => {
    const s = buildStyles({}, true);
    expect(s.ring.animation).toBeUndefined();
    expect(s.glow.animation).toBeUndefined();
  });

  it('disables animation when paused', () => {
    const s = buildStyles({ paused: true });
    expect(s.ring.animation).toBeUndefined();
  });

  it('disables animation when duration is zero', () => {
    const s = buildStyles({ duration: 0 });
    expect(s.ring.animation).toBeUndefined();
  });

  it('clamps negative numeric options to zero', () => {
    const s = buildStyles({ borderWidth: -10, radius: -4, duration: -1 });
    expect(s.ring.padding).toBe(0);
    expect(s.ring.borderRadius).toBe(0);
    expect(s.content.borderRadius).toBe(0);
    expect(s.ring.animation).toBeUndefined();
  });
});
