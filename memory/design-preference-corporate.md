---
name: design-preference-corporate
description: User prefers clean professional corporate design, not flashy/premium looks
metadata:
  type: feedback
---

For the GIF Studio (video-to-gif) site, the user wants a **clean, professional, corporate** design — explicitly NOT flashy/"premium"/grand.

**Why:** The original design was neon-cyan glassmorphism with gradient text, glowing shadows, floating/marquee animations, magnetic buttons. The user found it too "premium" and wanted a simple, professional B2B look instead.

**How to apply:** Chosen system (2026-07-09) = **monochrome black/white, fully static**:
- Accent = **pure black** in light mode, **pure white** in dark mode (user rejected indigo/blue — "set as pure black not blue"). Text near-black `#0a0a0a`, borders `#e4e4e4`, bg white; dark mode bg `#0a0a0a`.
- `--accent` is stored as **RGB channels** (`0 0 0` / `255 255 255`) so Tailwind `accent` = `rgb(var(--accent) / <alpha-value>)` stays theme-aware AND supports opacity utilities (`bg-accent/10`). `--accent-fg` stays a hex color (used via `text-[color:var(--accent-fg)]`).
- Flat solid surfaces (no backdrop blur), thin borders, subtle neutral shadows only.
- No gradients, no glow, no count-up, no floats/marquee, no cursor-follow. `Reveal`/`Magnetic` are static passthroughs; `framer-motion` no longer imported.
- Design tokens live in [app/globals.css](../app/globals.css) + [tailwind.config.ts](../tailwind.config.ts); `.glass`/`.heading-gradient` class names were kept but redefined as flat/solid to avoid touching every consumer.
- Uniform indigo icon tiles (`.icon-tile`) replaced per-tool rainbow `tool.gradient` values (field still exists in data, just unused in UI).
