# Proposal: Comprehensive Improvements to sandheep.xyz

## Summary
This PR proposes a set of focused, high‑impact improvements across SEO, content, performance, accessibility, authoring workflow, and UX. The goal is to preserve the existing minimalist aesthetic while materially improving discoverability, shareability, and maintainability.

## Why
- Current SEO/sharing metadata is only defined in `index.html`. Article pages and other routes render without route‑specific meta, reducing search visibility and poor social previews.
- Articles metadata is duplicated across `src/data/articles.ts` and the Markdown content, which is error‑prone and blocks automation (sitemap/RSS).
- Accessibility and UX have a few easy wins (active nav states, skip links, dark‑mode toggle, reduced‑motion support for animations).
- Performance can be improved with route‑level code splitting and font preconnects.

## What’s included

### 1) SEO, Sharing, and Discoverability
- Add per‑route meta handling (title, description, OG/Twitter cards) via `react-helmet-async` as an interim step before moving to a static site generation solution.
- Add JSON‑LD Article schema for posts.
- Expand `public/sitemap.xml` to include all article routes with `lastmod`.
- Add `public/feed.xml` (RSS/Atom) for subscribers/readers.
- Add canonical URLs across pages.

### 2) Content and Authoring
- Promote About page from placeholder to a concise bio with links to key posts and a clear contact CTA.
- Show reading time and word count in `ArticleDetail` under the title.
- Add previous/next article links and “related posts.”
- Introduce a Table of Contents for long posts (auto‑generated from headings).
- Plan follow‑up: move post metadata (title, date, slug) into Markdown frontmatter and parse at build time to eliminate duplication in `src/data/articles.ts`.

### 3) Markdown Quality
- Enhance `ReactMarkdown` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings` and code highlighting (`rehype-highlight` or Shiki later). This enables tables, footnotes, heading anchors, and readable code blocks.

### 4) Design and UX
- Add a dark‑mode toggle that persists user preference. Tailwind config is already set up for class‑based dark mode.
- Add active states (aria‑current) in the nav and a “Skip to content” link for keyboard users.
- Optionally add search/filter for posts and tags if desired (deferred).

### 5) Performance
- Lazy‑load routes with `React.lazy` + `Suspense` in `src/App.tsx`.
- Add `<link rel="preconnect">`/`preload` for Google Fonts and `display=swap`, consider self‑hosting later.
- Audit and remove unused dependencies (e.g., `next-themes` appears unused).

### 6) Accessibility
- Ensure focus‑visible styles, adequate color contrast, and aria labels.
- Validate heading hierarchy and landmarks.

### 7) PWA and Social Previews (Optional Next)
- Add `manifest.webmanifest`, icons, `theme-color`, and service worker via `vite-plugin-pwa`.
- Generate per‑article OG images (Vercel OG Image or Satori) to replace the single static `og-image.png`.

## Implementation details
- Introduce `react-helmet-async` and wrap the app with `HelmetProvider`. For each route, set page‑specific title, description, open graph, canonical, and JSON‑LD where applicable.
- Extend `ArticleDetail` to compute reading time and word count; append prev/next navigation.
- Add remark/rehype plugins to the Markdown pipeline.
- Create a small build script to programmatically generate `public/sitemap.xml` and `public/feed.xml` from article content/metadata.
- Implement a small dark‑mode toggle in `Header` that toggles a `dark` class on `<html>` and persists to `localStorage`.
- Host the film‑grain texture locally (currently references an external HTTP image) and gate the animation behind `prefers-reduced-motion`.
- Apply route‑level code splitting for `Blog`, `ArticleDetail`, `Commonplace`, `About`.

## Testing
- Manual testing: verify per‑route meta tags with devtools Elements, Lighthouse, and Twitter Card Validator.
- Validate sitemap at `public/sitemap.xml` and RSS at `public/feed.xml` load correctly.
- Check reading progress bar and header layout still behave correctly with lazy routes.
- Check dark‑mode toggle persistence, focus outlines, and reduced‑motion.

## Rollout plan
- Merge and deploy to Vercel preview; run Lighthouse, test social cards and bots.
- If all green, promote to production. Follow‑up PRs can add SSG and per‑article OG image generation.

## Future follow‑ups
- Migrate to SSG (Astro or Vite SSG) to deliver fully pre‑rendered HTML per route.
- Move article metadata to frontmatter and generate typesafe data at build time.
- Add per‑article OG image generation and self‑host fonts.

## Notes
- Current repo already uses `@vercel/analytics` and a clean Tailwind theme. The changes are additive and respect the aesthetic.