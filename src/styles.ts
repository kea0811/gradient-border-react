import type { CSSProperties } from 'react';
import type { Direction, GradientBorderOptions } from './types';
import { presets } from './presets';

/** The inline styles for each layer the border renders. */
export interface ResolvedStyles {
  /** Relative positioning context that holds the ring (and optional glow). */
  outer: CSSProperties;
  /** The soft, blurred halo behind the box (only used when `glow` is on). */
  glow: CSSProperties;
  /** The gradient ring itself — a masked, rotating conic-gradient. */
  ring: CSSProperties;
  /** The inner area your children render into. */
  content: CSSProperties;
}

const STYLE_ID = 'gradient-border-react-keyframes';

const KEYFRAMES =
  '@property --gb-angle{syntax:"<angle>";initial-value:0deg;inherits:false}' +
  '@keyframes gb-spin{to{--gb-angle:360deg}}' +
  '@keyframes gb-spin-reverse{to{--gb-angle:-360deg}}';

/**
 * Registers the `@property` + `@keyframes` the animated border relies on.
 *
 * Idempotent and dependency-free: it bails early if the `<style>` is already
 * present, so it's safe to call on every mount and under React StrictMode's
 * dev-only double-invoke.
 */
export function injectKeyframes(doc: Document): void {
  if (doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement('style');
  style.id = STYLE_ID;
  style.textContent = KEYFRAMES;
  doc.head.appendChild(style);
}

/** Default option values. Exposed so tests and docs stay in sync with them. */
export const DEFAULTS = {
  colors: presets.aurora,
  borderWidth: 2,
  radius: 12,
  duration: 4,
  direction: 'cw' as Direction,
  paused: false,
  background: 'transparent',
  glow: false,
};

// Two stacked fills + `mask-composite: exclude` punch the center out of the
// gradient, leaving only the `padding`-width ring visible.
const MASK = 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)';

/**
 * Pure function that turns a set of options into the four inline-style objects
 * the component spreads onto its layers. No DOM access, so it's trivially
 * unit-testable and SSR-safe.
 */
export function buildStyles(
  options: GradientBorderOptions = {},
  reducedMotion = false,
): ResolvedStyles {
  const colors = options.colors ?? DEFAULTS.colors;
  const borderWidth = Math.max(0, options.borderWidth ?? DEFAULTS.borderWidth);
  const radius = Math.max(0, options.radius ?? DEFAULTS.radius);
  const duration = Math.max(0, options.duration ?? DEFAULTS.duration);
  const direction = options.direction ?? DEFAULTS.direction;
  const paused = options.paused ?? DEFAULTS.paused;
  const background = options.background ?? DEFAULTS.background;

  // A conic gradient needs at least two stops; duplicate a lone color so a
  // single-color (or empty) list still produces a valid, seamless ring.
  const base = colors.length < 2 ? [colors[0] ?? DEFAULTS.colors[0]] : colors;
  const stops = [...base, base[0]].join(', ');
  const gradient = `conic-gradient(from var(--gb-angle, 0deg), ${stops})`;

  const animate = !reducedMotion && !paused && duration > 0;
  const name = direction === 'ccw' ? 'gb-spin-reverse' : 'gb-spin';
  const animation = animate ? `${name} ${duration}s linear infinite` : undefined;

  const outer: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    borderRadius: radius,
  };

  const glowStyle: CSSProperties = {
    position: 'absolute',
    inset: -borderWidth,
    zIndex: -1,
    borderRadius: radius + borderWidth,
    background: gradient,
    filter: 'blur(14px)',
    opacity: 0.7,
    animation,
    pointerEvents: 'none',
  };

  const ring: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    boxSizing: 'border-box',
    padding: borderWidth,
    borderRadius: radius,
    background: gradient,
    WebkitMask: MASK,
    WebkitMaskComposite: 'xor',
    mask: MASK,
    maskComposite: 'exclude',
    animation,
  };

  const content: CSSProperties = {
    position: 'relative',
    display: 'flex',
    width: '100%',
    borderRadius: Math.max(0, radius - borderWidth),
    background,
  };

  return { outer, glow: glowStyle, ring, content };
}
