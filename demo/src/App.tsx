import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  GradientBorder,
  useGradientBorder,
  presets,
  presetNames,
  type GradientBorderProps,
} from 'gradient-border-react';

const REPO = 'https://github.com/kea0811/gradient-border-react';

function Section({
  id,
  eyebrow,
  title,
  children,
  lead,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section">
      <header className="section-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </header>
      {children}
    </section>
  );
}

/** A labelled card whose border is a <GradientBorder>. */
function Tile({
  label,
  sub,
  ...props
}: { label: string; sub?: string } & GradientBorderProps) {
  return (
    <GradientBorder
      background="#101018"
      {...props}
      className="tile"
      style={{ display: 'flex', width: '100%', ...props.style }}
    >
      <div className="tile-inner">
        <span className="tile-label">{label}</span>
        {sub ? <span className="tile-sub">{sub}</span> : null}
      </div>
    </GradientBorder>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="code">
      <code>{children}</code>
    </pre>
  );
}

/** Demonstrates composing the look onto your own element with the hook. */
function HookPill() {
  const { ring, content } = useGradientBorder({
    colors: presets.candy,
    radius: 999,
    borderWidth: 2,
    duration: 6,
  });
  return (
    <div style={ring}>
      <button type="button" className="hook-pill" style={content}>
        useGradientBorder()
      </button>
    </div>
  );
}

export function App() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">gradient-border-react</p>
        <h1>
          An animated gradient border that
          <br />
          <span className="grad-text">flows around any element.</span>
        </h1>
        <p className="hero-lead">
          Tiny, dependency-free, and accessible. One component, one hook — drop it around
          anything. It respects <code>prefers-reduced-motion</code> and works with React 18 and 19.
        </p>

        <div className="hero-actions">
          <code className="install">pnpm add gradient-border-react</code>
          <a className="btn" href={REPO} target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </div>

        <div className="hero-showcase">
          <GradientBorder
            colors={presets.aurora}
            borderWidth={2}
            radius={20}
            duration={5}
            glow
            background="#0d0d16"
            paused={paused}
            className="hero-card"
            style={{ display: 'flex', width: 'min(460px, 100%)' }}
          >
            <div className="hero-card-inner">
              <span className="hero-card-title">Ship a little delight</span>
              <span className="hero-card-sub">
                Wrap a card, a button, an avatar — the gradient keeps flowing.
              </span>
            </div>
          </GradientBorder>
        </div>

        <button
          type="button"
          className="pause-toggle"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused ? '▶ Resume the animations' : '❚❚ Pause the animations'}
        </button>
      </header>

      <main>
        <Section
          id="presets"
          eyebrow="colors"
          title="Eight presets, ready to go"
          lead={
            <>
              Pass any array of CSS colors, or grab a built-in palette from <code>presets</code>.
              The list loops, so you never repeat the first color.
            </>
          }
        >
          <div className="grid grid-4">
            {presetNames.map((name) => (
              <Tile
                key={name}
                label={name}
                sub={`presets.${name}`}
                colors={presets[name]}
                radius={16}
                paused={paused}
              />
            ))}
          </div>
        </Section>

        <Section
          id="width"
          eyebrow="borderWidth"
          title="Any thickness"
          lead="From a hairline accent to a chunky frame — it's one number."
        >
          <div className="grid grid-4">
            {[1, 2, 4, 8].map((w) => (
              <Tile
                key={w}
                label={`${w}px`}
                sub={`borderWidth={${w}}`}
                borderWidth={w}
                colors={presets.ocean}
                radius={16}
                paused={paused}
              />
            ))}
          </div>
        </Section>

        <Section
          id="radius"
          eyebrow="radius"
          title="Match your corners"
          lead="Sharp, soft, or full pill — the ring follows the radius you set."
        >
          <div className="grid grid-4">
            {[0, 12, 24, 999].map((r) => (
              <Tile
                key={r}
                label={r === 999 ? 'pill' : `${r}px`}
                sub={`radius={${r}}`}
                radius={r}
                colors={presets.candy}
                paused={paused}
              />
            ))}
          </div>
        </Section>

        <Section
          id="speed"
          eyebrow="duration"
          title="Dial the speed"
          lead="Seconds per full rotation. Lower is faster, higher is calmer."
        >
          <div className="grid grid-4">
            {[2, 4, 8, 16].map((d) => (
              <Tile
                key={d}
                label={`${d}s`}
                sub={`duration={${d}}`}
                duration={d}
                colors={presets.ember}
                radius={16}
                paused={paused}
              />
            ))}
          </div>
        </Section>

        <Section
          id="direction"
          eyebrow="direction"
          title="Spin either way"
          lead={
            <>
              <code>cw</code> by default, <code>ccw</code> when you want the flow reversed.
            </>
          }
        >
          <div className="grid grid-2">
            <Tile
              label="clockwise"
              sub="direction='cw'"
              direction="cw"
              colors={presets.mint}
              radius={16}
              borderWidth={3}
              paused={paused}
            />
            <Tile
              label="counter-clockwise"
              sub="direction='ccw'"
              direction="ccw"
              colors={presets.mint}
              radius={16}
              borderWidth={3}
              paused={paused}
            />
          </div>
        </Section>

        <Section
          id="glow"
          eyebrow="glow"
          title="Add a halo"
          lead={
            <>
              Set <code>glow</code> to echo the gradient as a soft, blurred glow behind the box.
            </>
          }
        >
          <div className="grid grid-2">
            <Tile
              label="no glow"
              sub="glow={false}"
              colors={presets.rainbow}
              radius={16}
              borderWidth={2}
              paused={paused}
            />
            <Tile
              label="with glow"
              sub="glow"
              glow
              colors={presets.rainbow}
              radius={16}
              borderWidth={2}
              paused={paused}
            />
          </div>
        </Section>

        <Section
          id="background"
          eyebrow="background"
          title="Make it a card"
          lead={
            <>
              Leave it <code>transparent</code> to frame what's behind, or set a{' '}
              <code>background</code> to fill a card.
            </>
          }
        >
          <div className="grid grid-2">
            <Tile
              label="transparent"
              sub="background='transparent'"
              background="transparent"
              colors={presets.sunset}
              radius={16}
              borderWidth={2}
              paused={paused}
            />
            <Tile
              label="filled"
              sub="background='#1b1430'"
              background="#1b1430"
              colors={presets.sunset}
              radius={16}
              borderWidth={2}
              paused={paused}
            />
          </div>
        </Section>

        <Section
          id="a11y"
          eyebrow="accessibility"
          title="Reduced motion, handled"
          lead={
            <>
              When a visitor has <code>prefers-reduced-motion: reduce</code> set, the ring stops
              spinning and renders as a static gradient — no config needed. The glow and ring are
              hidden from assistive tech, too.
            </>
          }
        >
          <div className="note">
            <p>
              Flip on “Reduce motion” in your OS accessibility settings and reload — every border
              on this page becomes a calm, static gradient automatically.
            </p>
          </div>
        </Section>

        <Section
          id="hook"
          eyebrow="useGradientBorder()"
          title="Bring your own markup"
          lead={
            <>
              The component is a thin wrapper around <code>useGradientBorder()</code>. Use the hook
              directly to paint the border onto any element you control — here, a real{' '}
              <code>&lt;button&gt;</code>.
            </>
          }
        >
          <div className="hook-row">
            <HookPill />
          </div>
          <Code>{`const { ring, content } = useGradientBorder({
  colors: presets.candy,
  radius: 999,
});

return (
  <div style={ring}>
    <button style={content}>Click me</button>
  </div>
);`}</Code>
        </Section>

        <Section
          id="install"
          eyebrow="get started"
          title="Five-second integration"
          lead="Install, import, wrap. That's the whole API surface."
        >
          <Code>{`pnpm add gradient-border-react
# or: npm install gradient-border-react`}</Code>
          <Code>{`import { GradientBorder, presets } from 'gradient-border-react';

export function Avatar() {
  return (
    <GradientBorder colors={presets.aurora} radius={999} borderWidth={3} glow>
      <img src="/me.jpg" alt="" width={72} height={72} style={{ borderRadius: 999 }} />
    </GradientBorder>
  );
}`}</Code>
        </Section>
      </main>

      <footer className="footer">
        <p>
          MIT licensed · built by{' '}
          <a href="https://github.com/kea0811" target="_blank" rel="noreferrer">
            kea0811
          </a>
        </p>
        <p className="footer-sub">
          <a href={REPO} target="_blank" rel="noreferrer">
            Source &amp; docs on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
