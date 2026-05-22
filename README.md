# WBDS Astro Template

A custom website template built by [Whitney Bateson Digital Strategy](https://whitneybateson.com) for wellness and nutrition practice websites.

Built with [Astro 6](https://astro.build/) + [Tailwind CSS v4](https://tailwindcss.com/).

---

## What's included

- Custom section components for all standard pages (Home, About, Services, Contact, Booking, Legal)
- Accessible, WCAG AA–compliant design system
- Mobile-responsive layouts
- Netlify Forms integration (lead magnet + contact)
- Blog system (ready for future development)
- SEO meta, Open Graph, sitemap, robots.txt
- Google Analytics integration (configure per client)

## Getting started (local dev)

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Per-client setup checklist

Before launching for a new client, replace the following:

- [ ] `public/favicon.png` — client's square PNG favicon
- [ ] `public/Nutrition Consulting Sample Logo.png` — client logo (update the path in `Logo.astro`)
- [ ] `src/config.yaml` — site URL, business name, GA4 ID, social links, nav, footer copy
- [ ] `src/assets/images/` — client photos (optimize to ≤200KB, JPEG for photos)
- [ ] OG image — create a 1200×630px image with client name, tagline, logo; save to `public/`
- [ ] All page copy — replace demo content with client content
- [ ] Unsplash placeholder images — replace with client's real photos
- [ ] Netlify Forms — test submissions after deployment

## Project structure

```
src/
  assets/images/      — client photos
  components/
    blog/             — blog primitives (for future use)
    common/           — Header, Footer, Analytics, Meta
    sections/         — all custom page sections
    ui/               — UI primitives (Button)
  content/blog/       — blog posts (.md files)
  layouts/            — Layout, PageLayout, MarkdownLayout
  pages/              — all site routes
  styles/global.css   — Tailwind theme + global styles
  config.yaml         — site-wide configuration
public/
  favicon.png         — replace per client
  robots.txt
```

## Deploying to Netlify

1. Push this repo to GitHub
2. In Netlify: **Add new site → Import an existing project → GitHub**
3. Select this repo — build settings are pre-configured in `netlify.toml`
4. Click **Deploy site**

Netlify will build and deploy automatically on every push to `main`.

---

*Built on top of [AstroWind](https://github.com/arthelokyo/astrowind) (MIT License). See `LICENSE.md` for details.*
