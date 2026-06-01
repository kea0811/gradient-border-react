/**
 * Spin direction for the gradient sweep.
 * - `cw`  — clockwise (default)
 * - `ccw` — counter-clockwise
 */
export type Direction = 'cw' | 'ccw';

/**
 * Options shared by `<GradientBorder>` and the `useGradientBorder` hook. Every
 * field is optional and falls back to a sensible default.
 */
export interface GradientBorderOptions {
  /**
   * Colors the gradient cycles through, in order. The list is treated as a
   * loop, so the last color blends back into the first. A single color is
   * allowed (you get a solid, gently rotating ring). Defaults to the `aurora`
   * preset.
   */
  colors?: string[];
  /** Border thickness in pixels. Default `2`. */
  borderWidth?: number;
  /** Corner radius in pixels. Default `12`. */
  radius?: number;
  /** Seconds for one full rotation. Lower is faster. Default `4`. */
  duration?: number;
  /** Spin direction. Default `'cw'`. */
  direction?: Direction;
  /** Freeze the animation on its current frame. Default `false`. */
  paused?: boolean;
  /**
   * Background painted inside the border (your content sits on top of it). Use
   * this to make a "card". Default `'transparent'`.
   */
  background?: string;
  /** Add a soft, blurred glow of the same gradient behind the box. Default `false`. */
  glow?: boolean;
}
