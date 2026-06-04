# gradient-border-react

![tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
![npm version](https://img.shields.io/npm/v/gradient-border-react.svg)
![npm downloads](https://img.shields.io/npm/dm/gradient-border-react.svg)
![bundle size](https://img.shields.io/bundlephobia/minzip/gradient-border-react?label=gzip)

**🌐 [Live demo →](https://gradient-border-react.vercel.app)**

> An animated gradient border that flows around any element. Tiny, dependency-free, and it respects `prefers-reduced-motion` out of the box. Works with React 18 and React 19.

```tsx
<GradientBorder colors={['#7C3AED', '#06B6D4', '#10B981']} radius={16} glow>
  <div style={{ padding: 24 }}>Wrap me ✨</div>
</GradientBorder>
```

No CSS file to import, no canvas, no `requestAnimationFrame` — just a masked, rotating
`conic-gradient` driven by a registered `@property`. One `<style>` of keyframes is injected once,
and that's the whole runtime.

## Install

**From GitHub** (always works):

```bash
pnpm add github:kea0811/gradient-border-react
```

**From npm** _(when published to npm)_:

```bash
pnpm add gradient-border-react
```

> Prefer npm or yarn? `npm install gradient-border-react` / `yarn add gradient-border-react` work too.

`react` and `react-dom` are peer dependencies (`^18 || ^19`).

## Quick start

```tsx
import { GradientBorder, presets } from 'gradient-border-react';

export function ProfileCard() {
  return (
    <GradientBorder colors={presets.aurora} radius={16} borderWidth={2} background="#0d0d16">
      <div style={{ padding: 24 }}>
        <h3>Ada Lovelace</h3>
        <p>The first programmer.</p>
      </div>
    </GradientBorder>
  );
}
```

That's it — the border animates immediately. Wrap a card, a button, an avatar, an input;
the gradient keeps flowing around whatever's inside.

## Features

- 🎈 **Tiny & dependency-free** — a couple of inline styles and one injected keyframe block.
- 🌈 **Eight presets** plus any custom color array you like.
- ♿️ **Reduced-motion aware** — the ring freezes to a static gradient when the user asks for less motion, and the decorative layers are hidden from assistive tech.
- 🧩 **Composable** — use the `<GradientBorder>` component, or the `useGradientBorder()` hook to paint the look onto your own markup.
- ⚛️ **React 18 & 19** — StrictMode-safe; all lifecycle lives in a single effect.
- 🧪 **100% test coverage**, TypeScript strict mode, ESM + CJS + types.

## API

### `<GradientBorder>`

A `<div>` wrapper around your content. Accepts every standard `div` prop
(`className`, `style`, `onClick`, `aria-*`, a forwarded `ref`, …) plus:

| Prop          | Type                 | Default        | Description                                                              |
| ------------- | -------------------- | -------------- | ------------------------------------------------------------------------ |
| `colors`      | `string[]`           | `presets.aurora` | Colors the gradient cycles through. Treated as a loop; a single color is allowed. |
| `borderWidth` | `number`             | `2`            | Border thickness, in pixels.                                             |
| `radius`      | `number`             | `12`           | Corner radius, in pixels.                                                |
| `duration`    | `number`             | `4`            | Seconds for one full rotation. Lower is faster.                          |
| `direction`   | `'cw' \| 'ccw'`      | `'cw'`         | Spin direction.                                                          |
| `paused`      | `boolean`            | `false`        | Freeze the animation on its current frame.                              |
| `background`  | `string`             | `'transparent'`| Fill painted inside the border (turn the frame into a card).            |
| `glow`        | `boolean`            | `false`        | Add a soft, blurred glow of the same gradient behind the box.            |

### `useGradientBorder(options?)`

The component is a thin wrapper around this hook. It returns the inline styles for each layer, so
you can compose the border onto any element you control:

```tsx
import { useGradientBorder, presets } from 'gradient-border-react';

function FancyButton() {
  const { ring, content } = useGradientBorder({ colors: presets.candy, radius: 999 });
  return (
    <div style={ring}>
      <button style={content}>Click me</button>
    </div>
  );
}
```

It returns `{ outer, glow, ring, content }` — all `React.CSSProperties`. `options` takes the same
fields as the component props above.

### `presets` / `presetNames`

```tsx
import { presets, presetNames } from 'gradient-border-react';

presets.sunset; // ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6']
presetNames;    // ['aurora', 'sunset', 'ocean', 'candy', 'ember', 'mint', 'mono', 'rainbow']
```

### `usePrefersReducedMotion()`

The same accessibility hook the border uses internally, exported for convenience. Returns a
boolean that updates live when the user's setting changes.

## Accessibility

`GradientBorder` reads `prefers-reduced-motion` and renders a **static** gradient when reduced
motion is requested — no flag needed. The glow and ring layers are purely decorative and marked
`aria-hidden`, so screen readers only ever see your content.

## Browser support

The effect relies on CSS [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)
to smoothly interpolate the gradient angle (Chrome/Edge 85+, Safari 16.4+, Firefox 128+). In older
engines the gradient still renders — it just won't rotate, which is a perfectly fine fallback.

## Live demo

See every prop in action: **[gradient-border-react.vercel.app](https://gradient-border-react.vercel.app)**

To run it locally:

```bash
pnpm install
pnpm build        # build the library once
pnpm demo:dev     # start the demo at http://localhost:5173
```

## Contributing

Issues and PRs are welcome. To hack on it:

```bash
pnpm install
pnpm test          # run the suite
pnpm test:coverage # 100% across the board
pnpm build         # ESM + CJS + .d.ts
```

## License

[MIT](./LICENSE) © kea0811
