---
name: gradient-border-react
description: Use when the user wants an animated gradient border around a React element (card, button, avatar). Provides a `<GradientBorder>` component and a `useGradientBorder` hook. Eight presets, configurable border width / radius / speed / direction / glow. Respects prefers-reduced-motion. React 18 + 19.
---

# gradient-border-react

Wraps any element in an animated conic-gradient border that flows around its edge.

## When to reach for this

User says:
- "animated gradient border on this card"
- "rainbow border that rotates"
- "glow effect around a button"
- "AI-card outline" (the very common "animated outline around an AI thing" pattern)

User doesn't want this for:
- ❌ Static gradient borders (just use CSS `border-image`).
- ❌ Animations that aren't a rotating border (use framer-motion instead).

## Install

```bash
pnpm add gradient-border-react
```

Peer deps: `react@^18 || ^19`. Zero runtime deps.

## Most common pattern

```tsx
import { GradientBorder, presets } from 'gradient-border-react';

<GradientBorder colors={presets.aurora} radius={16} background="#0d0d16">
  <div style={{ padding: 24 }}>Anything you want inside.</div>
</GradientBorder>
```

That's the whole API for most uses.

## Presets

`aurora`, `sunset`, `ocean`, `candy`, `lime`, `cyber`, `rainbow`, `mono` — 8 in `presets` (also exported as `presetNames`).

## Tweaks

```tsx
<GradientBorder
  colors={['#a855f7', '#22d3ee', '#34d399']}   // any CSS color array
  borderWidth={3}                              // px (default 2)
  radius={24}                                  // px or 999 for pills
  duration={6}                                 // seconds (full rotation)
  direction="ccw"                              // 'cw' (default) or 'ccw'
  paused={false}                               // freeze the ring
  glow                                         // adds a soft outer glow
  background="#0d0d16"                         // inner solid fill
>
  ...
</GradientBorder>
```

## Hook form (for custom markup)

The hook returns three style objects you compose yourself. **Render `ring` and `content` as SIBLINGS inside `outer`** — never wrap content with `ring`, or its CSS mask will clip your text.

```tsx
import { useGradientBorder, presets } from 'gradient-border-react';

function FancyButton() {
  const { outer, ring, content } = useGradientBorder({ colors: presets.candy, radius: 999 });
  return (
    <div style={outer}>
      <div aria-hidden style={ring} />
      <button style={content}>Click me</button>
    </div>
  );
}
```

## Gotchas

1. **Hook structure matters.** Ring must be a SIBLING of content (both inside `outer`). Wrapping with `ring` propagates its `mask` to descendants and clips your text. This was a bug in 0.1.x; the v0.2.0+ hook documents the correct shape.
2. **Inner background must be opaque.** The `background` prop fills the area inside the ring. If you set a transparent background, you'll see through to the page bg and the gradient ring will look "hollow."
3. **`prefers-reduced-motion` is respected** — the ring freezes to a static gradient instead of rotating. Don't override unless explicitly requested.
4. **Decorative layers are `aria-hidden`** — screen readers see only the children.

## API

| Export | What |
|---|---|
| `<GradientBorder colors borderWidth? radius? duration? direction? paused? glow? background?>` | main component |
| `useGradientBorder(opts)` | returns `{ outer, ring, content, glow }` style objects |
| `presets` | `{ aurora, sunset, ocean, candy, lime, cyber, rainbow, mono }` |
| `presetNames` | array of preset string names |

## Links

- npm: https://www.npmjs.com/package/gradient-border-react
- demo: https://gradient-border-react.vercel.app
- repo: https://github.com/kea0811/gradient-border-react
