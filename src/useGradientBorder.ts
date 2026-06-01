import { useEffect } from 'react';
import type { GradientBorderOptions } from './types';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { buildStyles, injectKeyframes, type ResolvedStyles } from './styles';

/**
 * Computes the inline styles for an animated gradient border.
 *
 * `<GradientBorder>` is a thin wrapper around this hook — reach for the hook
 * directly when you'd rather compose the look onto your own element tree. It
 * registers the required keyframes on mount and automatically falls back to a
 * static ring when the user prefers reduced motion.
 *
 * ```tsx
 * const { ring, content } = useGradientBorder({ colors: presets.sunset });
 * return (
 *   <div style={ring}>
 *     <div style={content}>Bring your own markup</div>
 *   </div>
 * );
 * ```
 */
export function useGradientBorder(options: GradientBorderOptions = {}): ResolvedStyles {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    injectKeyframes(document);
  }, []);

  return buildStyles(options, reducedMotion);
}
