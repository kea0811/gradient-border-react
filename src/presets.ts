/**
 * A handful of ready-made color palettes. Pass one straight to the `colors`
 * prop: `<GradientBorder colors={presets.sunset} />`.
 *
 * Each palette is a plain `string[]` of CSS colors; the border treats the list
 * as a loop, so you don't need to repeat the first color at the end.
 */
export const presets = {
  aurora: ['#7C3AED', '#2563EB', '#06B6D4', '#10B981'],
  sunset: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'],
  ocean: ['#0EA5E9', '#2563EB', '#4F46E5', '#06B6D4'],
  candy: ['#F472B6', '#C084FC', '#60A5FA', '#34D399'],
  ember: ['#FACC15', '#F97316', '#EF4444', '#DC2626'],
  mint: ['#34D399', '#10B981', '#06B6D4', '#22D3EE'],
  mono: ['#FAFAFA', '#A1A1AA', '#3F3F46', '#A1A1AA'],
  rainbow: ['#FF0080', '#FF8C00', '#FFE600', '#00E676', '#00B0FF', '#7C4DFF'],
};

/** Name of a built-in preset. */
export type PresetName = keyof typeof presets;

/** The preset names, handy for rendering pickers or galleries. */
export const presetNames = Object.keys(presets) as PresetName[];
