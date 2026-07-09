# GIF Studio

**Convert, Compress & Edit GIFs and Videos in Seconds.**
The fastest online GIF and Video toolkit — a premium, static Next.js marketing site.

Built with the [App Router](https://nextjs.org/docs/app), TypeScript, Tailwind CSS and Framer Motion. Fully static (`output: export`) and deployed to **GitHub Pages** via GitHub Actions.

> Developed with ❤️ by [CodeLove.in](https://codelove.in) · Created by **Gowtham**

---

## ✨ Features

- **8 tool pages** — Video to GIF, GIF to Video, GIF/Video Resize, GIF/Video Crop, GIF/Video Compressor
- **Premium UI** — glassmorphism, animated hero (particles, floating cards, mouse parallax), magnetic buttons, scroll reveals, animated counters
- **Dark + Light theme** (pure black / pure white) with a persisted toggle
- **SEO everywhere** — per-page titles & meta descriptions, canonical URLs, Open Graph + Twitter cards, JSON-LD (Organization, WebSite, SoftwareApplication, FAQ, Breadcrumb), `sitemap.xml`, `robots.txt`, PWA `manifest`
- **Accessible** — semantic HTML, ARIA, keyboard navigation, skip link, reduced-motion support
- **Responsive** — desktop, laptop, tablet and mobile

## 🧱 Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Theme | next-themes |
| Fonts | Inter, Plus Jakarta Sans, Space Grotesk |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Production build (static export)

```bash
npm run build    # outputs static site to ./out
```

## 📁 Structure

```
app/                 Routes (App Router)
  page.tsx           Home
  tools/             All Tools page
  [slug]/            Individual tool pages (generated from lib/tools.ts)
  contact, privacy, terms, not-found
  sitemap.ts, robots.ts, manifest.ts, icon.svg
components/          UI + section components
  home/              Home page sections
  tools/             Tools explorer + workspace
  ui/                Reveal, Magnetic primitives
lib/
  tools.ts           Single source of truth for all tool content & SEO
  content.ts         Home page content (features, testimonials, FAQ…)
  seo.ts             Metadata + JSON-LD helpers
  site.ts            Global site config
```

Adding or editing a tool is a single edit to [`lib/tools.ts`](lib/tools.ts) — the card,
route, metadata, JSON-LD and page are all generated from it.

## 🌐 Deploy to GitHub Pages

This repo ships with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push to `main`.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. The workflow builds the static site and publishes it to
   `https://gowtham-raj-dev.github.io/video-to-gif/`.

### Notes on `basePath`

Because GitHub Pages serves project sites from a sub-path, [`next.config.mjs`](next.config.mjs)
sets `basePath: "/video-to-gif"` in production only (local dev stays at `/`).
If you rename the repo or use a custom domain, update `repo` in `next.config.mjs`
and `url`/`basePath` handling in [`lib/site.ts`](lib/site.ts).

## ⚙️ Tool Processing

The tool pages ship with a complete, interactive **workspace UI** (drag & drop,
settings, download button). Actual media processing is intentionally left as a
plug-in point — wire up a client-side engine such as
[ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) in
[`components/tools/ToolWorkspace.tsx`](components/tools/ToolWorkspace.tsx) to enable
real conversions while keeping everything private and in-browser.

## 📄 License

Free to use. © 2026 GIF Studio.
