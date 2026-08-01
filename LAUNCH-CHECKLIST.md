# Launch checklist

The site is deliberately hidden until the Dotzie mobile app ships. Everything
below is a pre-launch measure that must be reversed on launch day.

## Why it's hidden

The real protection is **Vercel Authentication** (Vercel dashboard → project →
Settings → Deployment Protection), set to **All Deployments**. Only that stops a
determined crawler — everything in this repo is advisory and honour-system. It's
worth having both: one crawl is permanent, and the dashboard toggle can be
switched off by accident.

## Currently in place

| Thing | Where | Effect |
| --- | --- | --- |
| Vercel Authentication → All Deployments | Vercel dashboard (not in repo) | Login wall for anyone without access, custom domain included |
| `PUBLIC_SITE_LIVE` unset | Vercel env vars | Drives the two items below; anything other than `"true"` means hidden |
| `<meta name="robots" content="noindex, nofollow">` | `src/layouts/Base.astro:53` | Keeps pages out of search results |
| `Disallow: /` for `*` + ~18 named AI crawlers | `src/pages/robots.txt.ts` | Asks crawlers not to fetch |
| `X-Robots-Tag: noindex, nofollow, noarchive, ...` | `vercel.json` | Same as the meta tag but covers non-HTML assets too, and applies even if a page is reached without the layout |
| `llms.txt` moved out of `public/` | `prelaunch/llms.txt` | That file exists to advertise the site to AI crawlers; not served while hidden |
| Real domain not attached | Vercel dashboard | Nothing to find; the `.vercel.app` URL stays behind auth |
| Not registered in Google Search Console | — | No sitemap submitted, no indexing requested |

Note the sitemap is still generated at build time. Harmless while the site is
behind auth and nothing links to it — it just isn't submitted anywhere.

## On launch day

1. **Set `PUBLIC_SITE_LIVE=true`** in Vercel env vars. This flips both the
   `robots` meta tag and `robots.txt` to their public versions in one move, and
   makes `robots.txt` advertise the sitemap.
2. **Set `PUBLIC_SITE_URL=https://dotzie.app`** so canonical URLs and the
   sitemap stop pointing at the deployment URL (see `SITE` in
   `astro.config.mjs`).
3. **Delete `vercel.json`**, or remove just the `X-Robots-Tag` header block.
   This one is *not* covered by `PUBLIC_SITE_LIVE` — a static header file can't
   read env vars. Miss it and the site stays invisible in Google no matter what
   else you do.
4. **Move `prelaunch/llms.txt` back to `public/llms.txt`** and check its URLs
   against the live domain.
5. Decide whether to keep blocking AI training crawlers. Right now the "live"
   branch of `src/pages/robots.txt.ts` allows everyone; the `AI_CRAWLERS` list
   is applied only while hidden. Blocking them permanently does not affect
   Google Search ranking — it's a product call.
6. **Attach `dotzie.app`** to the project in Vercel.
7. **Turn Vercel Authentication off** — or better, set it to *Only Preview
   Deployments*, which keeps previews private while production goes public.
8. **Revoke** any access granted to individual reviewers and any shareable
   links, in Deployment Protection → Access.
9. **Verify the domain in Google Search Console** and submit
   `https://dotzie.app/sitemap-index.xml`.
10. Confirm: `curl -sI https://dotzie.app | grep -i x-robots-tag` returns
    nothing, `https://dotzie.app/robots.txt` shows `Allow: /`, and the page
    source has no `noindex` meta tag.

## Granting access to a reviewer while hidden

- **Someone with a Google account:** they sign in to Vercel with it (a free
  Hobby account is fine), open the deployment URL, hit the login wall, click
  *Request access*. You approve in Deployment Protection → Requests.
  Hobby plan allows **one external user per account**; more requires Pro.
- **Someone who shouldn't need an account:** Deployments → select the
  deployment → *Share* → "Anyone with the link". Revocable at any time.
  Hobby plan allows **one shareable link total per account**.
