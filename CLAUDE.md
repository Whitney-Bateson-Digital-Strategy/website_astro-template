# CLAUDE.md — Wellness Website Template

> This file is read automatically by Claude Code at the start of every session.
> It provides the project context needed to make accurate edits without guessing.
> Update it whenever a new decision is made or a pattern is established.

---

## Project Overview

**What this is:** A done-for-you website template for wellness business clients
(nutritionists, coaches, dietitians, practitioners). Built to be reliably
customizable by Claude Code per client.

**Business model:** Each client gets a copy of this template. Claude Code
customizes branding, copy, pages, and components. Deployed to Netlify.

**Base:** Built on AstroWind (stripped down) — dark mode removed, unused
widgets removed, Tailwind upgraded to v4, `accessible-astro-components` and
`astro-seo` added. The infrastructure is AstroWind's; the section components
are built fresh to this spec.

**Design constraint:** Template 1 uses a strict content grid. Everything lives
inside the max-width container. No overlapping elements, no bleeds. This is
intentional — it makes Claude Code edits predictable and consistent.

---

## Stack

| Tool | Version | Notes |
|------|---------|-------|
| Astro | 6.x (pin exact) | Static-first, SSR not enabled |
| Tailwind CSS | v4.x | Config lives in CSS, not a .mjs file |
| TypeScript | Relaxed mode | Error catching without strictness |
| Preact | 10.x | Lightweight islands (FAQ accordions, etc.) |
| astro-seo | latest (pin exact) | SEO meta tags, OG, Twitter cards — configured in Layout.astro |
| accessible-astro-components | latest (pin exact) | Skip links, keyboard nav, ARIA patterns (WCAG 2.2 AA) |
| Netlify | — | Hosting, forms, serverless functions, deploy previews |

**No CMS.** As of July 2026 the template ships with **no CMS of any kind** —
it is a plain static Astro site. Blog posts are authored as Markdown/MDX files
committed directly to the GitHub repo. Keystatic was trialled and removed (see
"CMS Model" below). Do not reintroduce a CMS without an explicit decision.

**Never use `^` in package.json versions.** Always pin exact versions.
Wrong: `"astro": "^6.0.0"` → Right: `"astro": "6.1.2"`

---

## Astro API Notes (v5+ Changes)

Older tutorials and AI training data often use the old API. Use these:

| Old (v4) | New (v5+) |
|----------|-----------|
| `src/content/config.ts` | `src/content.config.ts` (root of src/) |
| `type: "content"` in collection | `loader: glob(...)` from `astro/loaders` |
| `post.slug` | `post.id` |
| `post.render()` | `render(post)` imported from `astro:content` |
| `import { ViewTransitions }` | `import { ClientRouter }` from `astro:transitions` |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` Vite plugin |

---

## Tailwind v4: How Configuration Works

There is **no `tailwind.config.mjs` file**. Configuration lives in `global.css`.

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Colors — core palette */
  --color-primary: #3d7a6f;       /* teal — eyebrows, icons, active links, one big CTA section */
  --color-primary-dark: #2f5f56;
  --color-secondary: #E7F5F6;     /* light teal — card backgrounds (Services, Blog) */
  --color-accent: #c17c6b;        /* coral — CTA buttons, "learn more" links, one Lead Magnet section */
  --color-accent-light: #f5ede0;  /* soft peach — Transformation section background */
  --color-accent2: #F1CE56;       /* yellow — accent2 panels (About) */
  --color-accent2-light: #F8F3E0; /* light yellow — About panel background */

  /* Surfaces */
  --color-bg-base: #fafaf8;       /* near-white cream — default section background */
  --color-bg-subtle: #f3f0eb;
  --color-bg-card: #ffffff;

  /* Text */
  --color-text-base: #2c2c2c;
  --color-text-heading: #1a1a1a;
  --color-text-muted: #6b6b6b;

  /* Borders */
  --color-border: #e0e0d8;
  --color-border-strong: #c8c8be;

  /* Typography */
  --font-heading: 'Cormorant Variable', Georgia, serif;
  --font-body: 'Outfit Variable', ui-sans-serif, sans-serif;

  /* Radius */
  --radius-button: 0.375rem;
  --radius-card: 0.75rem;
  --radius-input: 0.375rem;
}
```

Tailwind auto-generates utility classes from every `--color-*` and `--font-*`
token. **To rebrand a client site: change the values in `@theme {}`.** Every
component using those utility classes updates automatically.

**Design token principle — pattern first, then formalize.** Don't define tokens
for things that haven't been built yet. As components are built, recurring visual
patterns (e.g. all cards get the same shadow, all hero images get the same
rounding) get pulled up into a shared token or utility class. Image styling
variants follow the same approach — define named variants once a pattern is
clear across multiple components, not upfront.

**astro.config.mjs setup:**
```js
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});
```

---

## File Structure

```
src/
  layouts/
    Layout.astro          ← HTML shell: <head>, astro-seo, JSON-LD schema
    PageLayout.astro      ← Adds header + footer. Used by all standard pages.
    LandingLayout.astro   ← No nav/footer. Used for sales/opt-in pages.
    BlogLayout.astro      ← Blog post wrapper.
    PodcastLayout.astro   ← Podcast episode wrapper (add when first needed).
    [add more as needed]  ← New layout variants added as real use cases emerge.
  pages/
    index.astro           ← Home page (orchestrator — imports sections, passes props)
    about.astro
    services/
      index.astro
      [service].astro     ← Individual service pages
    blog/
      index.astro         ← Blog listing with category/tag filters
      [slug].astro        ← Individual blog post
      category/
        [category].astro
      tag/
        [tag].astro
    podcast/              ← Add when client has a podcast
      index.astro
      [slug].astro
      category/
        [category].astro
      tag/
        [tag].astro
    og/
      [slug].png.ts       ← OG image generation (Satori)
    contact.astro
    booking.astro
    resources.astro
    privacy-policy.astro
    terms.astro
    disclaimer.astro
    404.astro
  components/
    ui/
      WidgetWrapper.astro ← Controls max-width, gutters, section padding for ALL sections
      Button.astro        ← Variant-based button (primary / secondary / link)
      Breadcrumbs.astro   ← Manual breadcrumb component (no dependency)
    sections/             ← Section-level components (built fresh to this spec)
      Hero.astro
      About.astro
      Services.astro
      Testimonials.astro
      FAQ.astro           ← Uses Preact island (FAQAccordion.jsx)
      CallToAction.astro
      Contact.astro       ← Form fields passed as data array
      Newsletter.astro
      LogoBar.astro       ← "As Seen In", certifications, partner logos
      SocialProof.astro   ← Stats/numbers: clients served, years in practice, etc.
    blog/
      Pagination.astro
      PostCard.astro
    podcast/
      PodcastCard.astro   ← Add when first podcast client onboards
    common/
      Header.astro        ← Never edit nav links here. Edit navigation.ts instead.
      Footer.astro        ← Never edit footer links here. Edit navigation.ts instead.
  content/
    blog/
      2026/               ← Posts organized by year (year stripped from URL)
      2027/
    podcast/              ← Episodes — add collection when first needed
      2026/               ← Episodes organized by year (year stripped from URL)
      2027/
  content.config.ts       ← Content collection schemas (Zod validation)
  navigation.ts           ← ALL nav and footer links live here
  styles/
    global.css            ← Brand tokens (@theme {}), base styles, component utilities
public/
  og-default.png          ← Fallback OG image for non-blog pages (1200x630px)
  favicon.svg
astro.config.mjs
package.json              ← All versions pinned (no ^)
CLAUDE.md                 ← This file
```

---

## Critical Patterns

### Pages Are Orchestrators
Page files import sections and pass content as props. They contain almost no
layout code. Content changes → edit the page file. Structure changes → edit
the component.

```astro
---
// index.astro — correct pattern
import PageLayout from '~/layouts/PageLayout.astro';
import Hero from '~/components/sections/Hero.astro';
import Services from '~/components/sections/Services.astro';
---
<PageLayout>
  <Hero
    title="Your Health Journey Starts Here"
    subtitle="Personalized nutrition coaching..."
    actions={[{ text: 'Book a Call', href: '/booking', variant: 'primary' }]}
  />
  <Services items={[...]} />
</PageLayout>
```

### Navigation Lives in One File
All nav and footer links live in `src/navigation.ts`. The Header and Footer
components read from this file. **Never hardcode links in Header.astro or
Footer.astro.**

```ts
// src/navigation.ts
export const headerData = {
  links: [
    { text: 'About', href: '/about' },
    { text: 'Services', links: [...] },  // dropdown
  ],
  actions: [{ text: 'Book a Call', href: '/booking' }],
};
```

### SectionWrapper Controls All Section Spacing
Every section component wraps its content in `<SectionWrapper>` (`src/components/common/SectionWrapper.astro`). This controls `max-width`, horizontal gutters, and vertical padding for all sections.

### Section Spacing System

**Auto-collapse (CSS):** Every section emits `data-section-bg={background}` on its outermost element. CSS adjacent-sibling rules in `global.css` automatically zero out `padding-top` when two neighboring sections share the same background value — no manual adjustment needed when reordering sections.

**Manual override:** `SectionWrapper` accepts `spacing?: 'default' | 'tight' | 'loose'`. Sections that need to expose this to pages (e.g. `BlogPreview`, `Process`) declare their own `spacing` prop and pass it through.

Padding values (mobile / desktop):
- `tight`: 2rem / 2.5rem
- `default`: 4rem / 5rem
- `loose`: 6rem / 7rem

**Rule:** Add `spacing="loose"` to sections that border a strongly contrasting background change (e.g. the white Process section before the coral LeadMagnet, and the white BlogPreview after it).

Sections using their own `<section>` tag instead of SectionWrapper (Hero, LeadMagnet, TestimonialsSimple/Stacked) must manually include `data-section-bg={background}` on their `<section>` element.

### Color Philosophy

**One coral section, one teal section — everything else white.** This is a deliberate design constraint. Do not add new full-color section backgrounds without discussing.

- **Teal (`primary`):** Eyebrows, active nav links, icon labels, bullet dots on light sections, one reserved CTA section (CtaFinal)
- **Coral (`accent`):** CTA buttons, "learn more" links, "see more" links, heading accent words, one reserved full section (LeadMagnet)
- **White/cream (`bg-base`):** Default background for all other sections
- **Light peach (`accent-light`):** Transformation section — subtle warmth, not a full color hit
- **Light yellow (`accent2-light`):** About panel

**Button variants:**
- `primary` — teal fill, default CTA
- `outline` — white border/text, used on dark (teal/coral) section backgrounds
- `link` — coral text, secondary ghost actions

---

### Color Usage Guide

**The cardinal rule: never place two saturated brand colors directly on top of each other.**
- ❌ Coral text on teal background
- ❌ Teal text on coral background
- ❌ Coral card inside a coral section
- ✅ Coral section background → white cards → teal text inside cards
- ✅ White section → teal border accent → coral heading text inside card
- ✅ Coral section → white card front → muted coral (`accent-light`) card back

**Background → Text pairings (WCAG AA compliant):**

| Background | Token | Foreground options | Notes |
|---|---|---|---|
| White / near-white | `bg-base`, `bg-card` | `text-text-base`, `text-text-heading`, `text-primary`, `text-accent` | All pass at normal sizes |
| Light peach | `bg-accent-light` | `text-text-heading`, `text-text-base`, `text-primary` | Coral (`text-accent`) on peach fails — too low contrast. Prefer dark neutral text when background is already doing color work. |
| Light yellow | `bg-accent2-light` | `text-text-base`, `text-primary` | Avoid `text-accent` (coral on yellow is harsh) |
| Light teal | `bg-secondary` | `text-text-base`, `text-primary` | Avoid small text — light bg + teal text is borderline |
| Saturated coral | `bg-accent` | `text-white`, `text-white/90` | Dark text also works; avoid `text-primary` (teal on coral) |
| Saturated teal | `bg-primary` | `text-white`, `text-white/90` | Dark text also works; avoid `text-accent` (coral on teal) |

**Accent colors by use:**

| Color | Saturated | Muted | Use saturated for | Use muted for |
|---|---|---|---|---|
| Coral | `accent` / `text-accent` / `border-accent` | `accent-light` / `bg-accent-light` | CTA buttons, heading pops, section backgrounds (max 1), border accents, icons | Section backgrounds needing warmth without punch, flip-card backs inside a coral section |
| Teal | `primary` / `text-primary` / `border-primary` | `secondary` / `bg-secondary` | Eyebrows, icons, card borders, CTA section (max 1) | Service card backgrounds, badge backgrounds |
| Gold | `accent2` / `text-accent2` / `border-accent2` | `accent2-light` / `bg-accent2-light` | Occasional third-color accent (use sparingly) | Panel backgrounds (About) |

**Do not mix pastel backgrounds adjacent to each other.** Light peach next to light teal next to light yellow reads as muddy. If two adjacent sections both need a non-white background, one should be saturated and one should be white, or they should share the same token (which auto-collapses via the spacing system).

### Typography Rules

**Cormorant Variable** (heading font) is elegant but renders too light at small sizes — avoid using `font-heading` for body-sized text (below ~1.4rem).

**Rule:** For testimonial quotes, pull-quotes, or any italic body text, use the body font (Outfit) with `font-medium` or `font-semibold`. Do not use `font-heading` for these.

```astro
<!-- Wrong — Cormorant is illegible at this size -->
<p class="font-heading italic text-base">"{quote}"</p>

<!-- Right — Outfit at medium weight reads cleanly -->
<p class="font-medium italic">"{quote}"</p>
```

**Heading accent pattern:** All `heading` props across section components support inline HTML via Astro's `set:html` directive. Write emphasis directly in the heading string:
```astro
heading="Nutrition counseling that <em>actually</em> fits your life."
heading="I help women stop fighting food and start <span class='text-accent'>feeling free.</span>"
```
There is no `headingAccent` prop anywhere in this codebase — that pattern was removed. Do not add it back.

### Schema Markup for Testimonials

Testimonial components (TestimonialsSimple, TestimonialsSimpleStacked) include `Schema.org/Review` + `ItemList` markup. A dedicated `/testimonials` page should eventually house all reviews for AI/SEO optimization — the schema markup is already structured to support this.

### Nav Logo Scroll Behavior

The header logo is larger on page load and shrinks after 40px of scroll. Implemented via a passive scroll listener toggling Tailwind height classes (`h-14` → `h-10` on logo, `h-24` → `h-16` on the header bar) with `transition-all duration-300`.

### Form Fields as Data
The Contact component accepts form fields as a data array:
```astro
<Contact
  inputs={[
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Message', name: 'message', type: 'textarea' },
  ]}
/>
```
To add/remove fields: edit the data array in the page file, not the component.

### Client-Side Scripts: Always Use `astro:page-load`

This template uses Astro View Transitions (client-side navigation). Scripts that run at the module top level only fire on the **first** page load — they do not re-run after navigation. Any `document.querySelectorAll` or `IntersectionObserver` setup **must** be wrapped in `astro:page-load`:

```astro
<script>
  function init() {
    const observer = new IntersectionObserver(...);
    document.querySelectorAll('[data-my-el]').forEach((el) => observer.observe(el));
  }
  document.addEventListener('astro:page-load', init);
</script>
```

**Never** write bare top-level script setup:
```astro
<!-- Wrong — breaks on View Transition navigation -->
<script>
  document.querySelectorAll('[data-my-el]').forEach(...);
</script>
```

This applies to: IntersectionObserver animations, click/keyboard event listeners, any DOM query that needs to re-run after navigation.

### Interactive Islands
Use Preact (not React) for interactive components. Prefer `client:visible`
over `client:load` for components below the fold.

```astro
<FAQAccordion client:visible items={faqs} />
```

---

## SEO

SEO is handled by the `astro-seo` package, configured in `Layout.astro`.
Every page accepts these props via the layout:

```astro
<Layout
  title="Page Title"
  description="Page-specific meta description."
  image="https://yourdomain.com/og-image.jpg"
  type="article"
  noindex={false}
/>
```

**Includes automatically on every page:**
- `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter/X card tags
- JSON-LD ProfessionalService schema (update name/location/URL per client)
- noindex support

**Blog post SEO frontmatter:**
```md
---
seoTitle: "Custom Browser Tab Title | Optional"
seoDescription: "Custom meta description — up to ~155 characters."
focusKeyword: "gut health dietitian"
noindex: false
---
```

---

## Accessibility

This template targets **WCAG 2.2 AA** compliance. Accessibility is non-negotiable
and built in from the start, not retrofitted.

**What `accessible-astro-components` provides (use these, don't reinvent):**
- `SkipLink` — skip-to-main-content link (include in every layout)
- Keyboard-navigable dropdown menus
- ARIA-correct breadcrumbs, pagination, modals

**Rules that apply to every component:**
- Every image gets meaningful `alt` text, or `alt=""` for decorative images
- Never skip heading levels (h1 → h2 → h3, never h1 → h3)
- Color contrast must pass WCAG AA on all text (check with Axe DevTools)
- All interactive elements must be keyboard accessible
- Use `class="sr-only"` for screen-reader-only text
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`
- Respect `prefers-reduced-motion` — wrap animations in `motion-safe:` Tailwind variant

**Before every client handoff:** Run Axe DevTools browser extension. Zero
critical errors required.

---

## Forms

**Contact forms → Netlify Forms**
Add `data-netlify="true"` to the form element. Netlify intercepts submissions
at the CDN level — zero backend code, fully confirmed working. We fully control
the form design and styling.

```html
<form data-netlify="true" name="contact" method="POST">
  ...
</form>
```

**Newsletter/email platform signups → Netlify Function**
A small serverless function makes the API call to ConvertKit, Mailchimp, etc.
server-side. The API key lives in Netlify environment variables — never exposed
in the browser. We fully control the form design.

```
netlify/functions/subscribe.ts  ← serverless function per email platform
```

The email platform is client-dependent. Configure the endpoint per client in
Netlify's environment variables dashboard.

---

## Blog Content Collection

Schema lives in `src/content.config.ts` (Astro v5+ location):

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = { blog };
```

**Blog post URLs:** Posts at `src/content/blog/2025/my-post.md` get the URL
`/my-post` (year is stripped). Post filenames must be unique across all years.

**Podcast collection:** When a client has a podcast, add a separate `podcast`
collection to `content.config.ts` with its own schema (episode number, audio
URL, duration, guest, transcript, etc.) and its own layout and pages.

---

## OG Image Generation

Auto-generated branded social preview images for blog posts.

- Route: `src/pages/og/[slug].png.ts`
- Generated at build time using Satori (SVG) + @resvg/resvg-js (PNG)
- Preview locally at: `http://localhost:4321/og/[post-slug].png`
- Fallback image for non-blog pages: `public/og-default.png` (1200×630px)
- To update card design: edit `src/pages/og/[slug].png.ts`

---

## Navigation: CSS-Only Dropdowns

Nav dropdowns use Tailwind's `group` + `hover:` + `focus-within:` — no JS.

```html
<div class="group relative">
  <button class="group-hover:text-accent">Services ▾</button>
  <ul class="hidden group-hover:block group-focus-within:block absolute ...">
    <li><a href="/nutrition-coaching">Nutrition Coaching</a></li>
  </ul>
</div>
```

A transparent "bridge" div fills the gap between the trigger and dropdown
so the menu doesn't close as the mouse moves down to it.

---

## Deployment: Netlify

- Deploy: push to GitHub → Netlify auto-builds
- Contact forms: `data-netlify="true"` — no backend needed
- Newsletter forms: Netlify Function → email platform API (key in env vars)
- Password protection: available via Netlify dashboard — **may require a paid
  plan**. StaticCrypt is the free alternative. Don't promise this as default.
- Deploy previews: every PR gets a preview URL automatically
- Environment variables: set in Netlify dashboard, never in code
- Analytics: Google Analytics — script tag added to Layout.astro per client
- SSL: Netlify provisions free Let's Encrypt cert automatically on every site

**Before going live for each client:**
1. Copy template repo (GitHub template → new repo)
2. Update `src/styles/global.css` — change `@theme {}` tokens for client brand
3. Update `src/navigation.ts` — client's pages, services, footer links
4. Update `src/layouts/Layout.astro` — business name, JSON-LD info, astro-seo config
5. Update `astro.config.mjs` — set `site:` to client domain
6. Replace `public/og-default.png` and `public/favicon.svg`
7. Set up Netlify site, connect GitHub repo, add env vars
8. Edit page content via Claude Code (pass new props to section components)
9. Run Axe DevTools — resolve all critical accessibility errors
10. Submit sitemap to Google Search Console

---

## CMS Model

**Current decision (July 2026): no CMS.** The template is a plain static Astro
site with no admin UI and no client login. All content — page-level and blog —
is managed by the team via code + deploy.

**Page-level content (hero copy, pricing, bios, services) — managed service.**
Clients submit an edit request. Claude Code makes the edit. Deploy preview
generated. Client approves. Live within 24 hours. No CMS, no login, no risk
of clients breaking their layout.

**Blog posts — Markdown committed to GitHub.**
Posts are `.mdx` files in `src/content/blog/`, written and committed directly
to the repo (by the team, via Claude Code or an editor). They render through
`src/pages/[slug].astro`. No editing UI — adding a post = adding a file.

**Keystatic was trialled and removed (2026-07-01).** Self-serve editing via
Keystatic's GitHub storage required each client to have a GitHub account + a
manually-created GitHub App, which is poor UX for non-technical wellness
clients. **Keystatic Cloud** (email logins, no GitHub account, free up to 3
users/team) is the path to revisit *if and when* client self-service becomes a
priority — but it is deliberately not in the template today. Do not reintroduce
any CMS without an explicit decision.

---

## Footer Variants

Footer choice is tied to layout — you don't specify them separately.

| Layout | Footer included |
|--------|----------------|
| `PageLayout.astro` | `FooterFull.astro` — full nav, social links, legal |
| `LandingLayout.astro` | `FooterMinimal.astro` — logo + legal only, no distracting nav |

Add new footer variants as new layout types emerge. Never put footer-specific
logic in the page file — the layout handles it.

---

## Typography Conventions

### Where type sizes live

All heading and body sizes are defined **once** in `src/styles/global.css` and cascade automatically. Never hardcode sizes per-component unless you are deliberately overriding for a specific reason.

**Heading scale** — defined in `@theme {}` and applied via `@layer base`:
```css
@theme {
  --text-h1: 2.5rem;
  --text-h2: 1.875rem;
  --text-h3: 1.5rem;
  --text-h4: 1.25rem;
}
@layer base {
  h1 { font-size: var(--text-h1); font-family: var(--font-heading); ... }
}
```
To resize headings site-wide: change `--text-h1` etc. in `@theme {}`. Every `<h1>` on every page updates.

**Body text** — set on the `body` element in `@layer base`:
```css
@layer base {
  body {
    font-family: var(--font-body);
    font-size: 1.15rem;
    color: var(--color-text-base);
  }
}
```
To resize body text site-wide: change `font-size` here. Everything that inherits (i.e. has no explicit Tailwind text class) updates.

### The rule: inherit first, override deliberately

**Do NOT add `text-base`, `text-sm`, `text-lg` etc. to general body copy.** Explicit Tailwind text size classes hardcode the font-size on that element and break inheritance — the global body size setting stops working for that element.

```astro
<!-- Wrong: locks this to 1rem regardless of body font-size setting -->
<p class="text-base text-text-muted">...</p>

<!-- Right: inherits from body, responds to global size changes -->
<p class="text-text-muted">...</p>
```

**Do use explicit size classes** when you are making a deliberate size decision:
- Smaller than body: captions, labels, taglines, footnotes (`text-xs`, `text-sm`)
- Larger than body: display stats, pull quotes, hero subheadlines that need emphasis (`text-lg`, `text-xl`)
- Heading-level overrides inside prose or special layouts

### Container utility

All page-level containers (Header, Footer, Hero, WidgetWrapper) use `.container-page` defined in `global.css`:
```css
.container-page {
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: 1.5rem;   /* mobile gutter */
}
@media (min-width: 768px) {
  .container-page { padding-inline: 2.5rem; }  /* desktop gutter */
}
```
To adjust gutters site-wide: change the `padding-inline` values here. Do not add `px-*` classes to containers that already use `.container-page`.

---

## What NOT to Do

- **Don't edit nav/footer links in Header.astro or Footer.astro.** Edit `navigation.ts`.
- **Don't hardcode content in component files.** Pass it as props from the page.
- **Don't add npm packages without checking the spec first.** Most needs are
  already covered. Adding packages = adding maintenance burden.
- **Don't use `^` in package.json versions.** Pin exact versions always.
- **Don't add dark mode.** Wellness clients don't need it. It adds complexity.
- **Don't use inline `style` attributes on elements.** All styling via Tailwind
  classes or `global.css`. Exception: CSS custom properties passed as inline
  style for dynamic values (e.g. `style="--delay: 200ms"`).
- **Don't add `<style>` blocks for general styling.** Use Tailwind utility
  classes. Exception: `@keyframes` animations that Tailwind doesn't support
  natively — a `<style>` block in the component is acceptable for this only.
- **Don't write new section layouts outside of SectionWrapper.** All sections must use it to stay in the grid. The only exception is sections that must be truly full-bleed (e.g. the `panels` PageHero variant). If you write your own `<section>` tag for any reason, you **must** include `data-section-bg={background}` on it — without it, the auto-collapse spacing system silently breaks for adjacent same-color sections. There is no error — it just adds unwanted gap. Current components using manual `<section>` tags: `IsThisYou`, `FunFacts`, `TestimonialsSimpleStacked`, PageHero fullbleed/panels variants.
- **Don't define design tokens speculatively.** Add tokens to `@theme {}` when
  a pattern appears across multiple components — not before.

---

## Infrastructure Notes

Non-obvious facts about the build setup that a fresh session needs to know to avoid breaking things.

**Vite version override (required)**
`package.json` has `"overrides": { "vite": "7.3.2" }`. Astro 6 requires Vite 7 but npm resolves Vite 8 by default. Do not remove this override — the build will warn and may break without it.

**No CMS / no Netlify adapter — fully static**
No Keystatic, React, or Netlify adapter is installed. The site builds with
`output: 'static'` and no `adapter`, producing plain HTML that Netlify serves
directly (no SSR functions). Keystatic was trialled (it *does* work with Astro 6
via `@keystatic/astro@5.1.0+`) but removed on 2026-07-01 — do not re-add
`@keystatic/*`, `@astrojs/react`, or `@astrojs/netlify` without an explicit
decision to bring back a CMS.

**CSS entry point**
`src/styles/global.css` is the only CSS file. It uses Tailwind v4 syntax (`@import "tailwindcss"` + `@theme {}`). The old `src/assets/styles/` folder from AstroWind was deleted. Do not create new CSS files — all styling goes through Tailwind utility classes or the `@theme {}` block.

**Content config location**
The content collection config is at `src/content.config.ts` (project root of src). This is the Astro 6 location. The old `src/content/config.ts` path no longer works.

---

*Last updated: July 2026. Update this file whenever a new decision is made or pattern established.*

> **Known doc drift to reconcile (July 2026):** parts of this file above still
> describe the *intended* template, not the *current* build. Verify against the
> repo before relying on: blog uses flat `src/content/blog/*.mdx` (not year
> folders) and the schema is `title / publishDate / excerpt / tags / draft`
> (not `date / description / category`); section spacing is `SectionWrapper`
> (not `WidgetWrapper`); OG image generation, podcast collection, `LandingLayout`,
> `BlogLayout`, and category/tag pages are specced but **not yet built**.
