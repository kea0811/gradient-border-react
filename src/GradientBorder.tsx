import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { GradientBorderOptions } from './types';
import { useGradientBorder } from './useGradientBorder';

/**
 * Props for {@link GradientBorder}. Combines the gradient options with the
 * standard attributes of the `<div>` wrapper (`className`, `style`, `onClick`,
 * `aria-*`, …), so it drops into existing markup without ceremony.
 */
export interface GradientBorderProps
  extends GradientBorderOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof GradientBorderOptions> {
  children?: ReactNode;
}

/**
 * Wraps its children in an animated gradient border that flows around the box.
 *
 * Tiny, dependency-free, and accessible: it respects `prefers-reduced-motion`
 * (the ring stays put instead of spinning) and the decorative layers are hidden
 * from assistive tech. Works with React 18 and 19.
 *
 * ```tsx
 * <GradientBorder colors={presets.sunset} radius={16} background="#0b0b12">
 *   <div style={{ padding: 24 }}>Anything you like</div>
 * </GradientBorder>
 * ```
 */
export const GradientBorder = forwardRef<HTMLDivElement, GradientBorderProps>(
  function GradientBorder(
    {
      colors,
      borderWidth,
      radius,
      duration,
      direction,
      paused,
      background,
      glow,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const styles = useGradientBorder({
      colors,
      borderWidth,
      radius,
      duration,
      direction,
      paused,
      background,
      glow,
    });

    return (
      <div
        ref={ref}
        data-gradient-border=""
        className={className}
        style={{ ...styles.outer, ...style }}
        {...rest}
      >
        {glow ? (
          <span data-gradient-border-glow="" aria-hidden="true" style={styles.glow} />
        ) : null}
        <div data-gradient-border-ring="" style={styles.ring}>
          <div data-gradient-border-content="" style={styles.content}>
            {children}
          </div>
        </div>
      </div>
    );
  },
);

GradientBorder.displayName = 'GradientBorder';
