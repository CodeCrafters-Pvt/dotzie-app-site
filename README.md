# Dotzie — App / Marketing Site

Built with [Astro](https://astro.build) + Tailwind CSS v4. Static output, so it
deploys to any host (Cloudflare Pages, Netlify, Vercel, S3, nginx…).

## Commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start the dev server at `localhost:4321`      |
| `npm run build`   | Build the production site to `dist/`          |
| `npm run preview` | Preview the built `dist/` locally             |

## Where do I edit things?

Everything lives in `src/`. Here's the map:

```
src/
├── pages/              ← EACH FILE = ONE URL. Add a page by adding a file here.
│   ├── index.astro         /            (landing page)
│   ├── guide.astro         /guide       (user guide)
│   ├── privacy.astro       /privacy
│   ├── terms.astro         /terms
│   ├── rss.xml.js          /rss.xml     (blog feed — auto-generated)
│   └── blog/
│       ├── index.astro     /blog        (post listing)
│       └── [...slug].astro /blog/<post> (renders one blog post)
│
├── content/blog/       ← BLOG POSTS. Add a .mdx file here → it appears on /blog.
│   └── introducing-dotzie.mdx
│
├── content.config.ts   ← The required fields (title, date, tags…) for a blog post.
│
├── layouts/
│   └── Base.astro      ← The <head>: SEO meta, JSON-LD, fonts, theme script.
│                          Every page wraps its content in this.
│
├── components/
│   ├── Header.astro        Site header (nav + logo)   — STATIC, no JS
│   ├── Footer.astro        Site footer                — STATIC, no JS
│   ├── Wordmark.astro      The "Dotzie." logo         — STATIC, no JS
│   └── islands/            ← INTERACTIVE React bits (the ONLY things shipping JS)
│       ├── ThemeToggle.tsx     Light/dark switch
│       ├── AccentSwitcher.tsx  Accent-colour picker
│       ├── CustomCursor.tsx    Custom mouse cursor
│       └── PhoneCarousel.tsx   The phone mockup slider on the homepage
│
├── data/
│   └── faq.ts          ← FAQ questions/answers (feeds both the page AND the SEO data).
│
├── styles.css          ← Global styles, theme colours, accent palettes, animations.
├── lib/utils.ts        ← Small helpers (e.g. `cn()` for class names).
└── assets/             ← Images imported by components.

public/                 ← Files served as-is: favicon.ico, robots.txt, llms.txt.
                          Put og.png and other static files here.
```

### The one rule for components

- **`.astro` files** = static HTML, ship **zero JavaScript**. Use these by default.
- **`islands/*.tsx` files** = React components that need interactivity (clicks,
  state). They're the only things that send JS to the browser, so keep them small
  and few.

## Common tasks

- **Write a blog post** → add `src/content/blog/my-post.mdx` (copy the frontmatter
  from an existing post).
- **Edit the FAQ** → `src/data/faq.ts`.
- **Change nav links** → `src/components/Header.astro`.
- **Change colours / fonts / animations** → `src/styles.css`.
- **Edit page copy** → the matching file in `src/pages/`.
- **Change site title / social share tags** → `src/layouts/Base.astro`.

## Before going live (TODOs)

- Set the real domain in `astro.config.mjs` (`SITE`).
- Add `public/og.png` for social-media link previews.
- Replace placeholder copy in `privacy.astro` and `terms.astro`.
- (Later) A contact/support form needs an SSR adapter — decide the host first.
