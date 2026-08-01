# Launch checklist

The site is deliberately hidden until the Dotzie mobile app ships. Everything
below is a pre-launch measure that must be reversed on launch day.

Vercel project: **dotzie** (Hobby plan).

## Why it's hidden

Two independent layers, because they solve two different problems:

- **Nobody can reach it** — the project has *no production deployment*. Preview
  deployments are protected by Vercel Authentication, so the site is only
  reachable by someone signed in to Vercel with access granted.
- **Nobody can index or scrape it** — `noindex` headers and a blanket
  `robots.txt` deny, shipped from this repo. Advisory and honour-system, but it
  means an accidental exposure doesn't immediately become a permanent search
  result. One crawl cannot be undone.

### ⚠️ The Hobby-plan constraint that drives all of this

On the Hobby plan, Vercel Authentication only offers **Standard Protection**,
which protects preview deployments and generated deployment URLs but leaves the
**production domain publicly accessible**. That includes the auto-assigned
`dotzie.vercel.app`, not just custom domains like `dotzie.app`. Protecting a
production domain requires **All Deployments**, which is Pro/Enterprise only.

Verified the hard way: with Standard Protection enabled and saved,
`https://dotzie.vercel.app/` returned `200` to an anonymous request.

So the free workaround is to **have no production deployment at all**:

| Setting | Value | Why |
| --- | --- | --- |
| Production Branch | `launch` (a branch that does not exist) | No production deployment is ever created, so the production domain 404s |
| Working branch | `dev` | Pushes build as *preview* deployments, which Standard Protection does cover |
| Vercel Authentication | On, Standard Protection | Puts the login wall on those previews |

Do **not** attach `dotzie.app` before launch — under Standard Protection it
would be served publicly the moment it resolves, with no free toggle to stop it.

## Currently in place

| Thing | Where | Effect |
| --- | --- | --- |
| Production Branch set to nonexistent `launch` | Vercel → Settings → Git | No production deployment exists; `dotzie.vercel.app` returns 404 |
| Vercel Authentication → Standard Protection | Vercel → Settings → Deployment Protection | Login wall on all preview deployments |
| `PUBLIC_SITE_LIVE` unset | Vercel env vars | Drives the two items below; anything other than `"true"` means hidden |
| `<meta name="robots" content="noindex, nofollow">` | `src/layouts/Base.astro:53` | Keeps pages out of search results |
| `Disallow: /` for `*` + ~18 named AI crawlers | `src/pages/robots.txt.ts` | Asks crawlers not to fetch |
| `X-Robots-Tag: noindex, nofollow, noarchive, ...` | `vercel.json` | Same as the meta tag but covers non-HTML assets too, and applies even if a page is reached without the layout |
| `llms.txt` moved out of `public/` | `prelaunch/llms.txt` | That file exists to advertise the site to AI crawlers; not served while hidden |
| `dotzie.app` not attached | Vercel → Settings → Domains | See the constraint above |
| Not registered in Google Search Console | — | No sitemap submitted, no indexing requested |

The sitemap is still generated at build time. Harmless while nothing links to it
and it isn't submitted anywhere.

## Sharing it with a reviewer

The stable preview URL is the branch URL — it does **not** change between pushes:

```
https://dotzie-git-dev-<your-scope>.vercel.app
```

(Find the exact value on the `dev` deployment's page in the Deployments tab.
Per-deployment URLs containing a hash *do* change on every push — don't share
those.)

- **Someone with a Google account:** they sign in to Vercel with it (a free
  Hobby account is fine), open the branch URL, hit the login wall, and click
  *Request access*. You approve in Deployment Protection → Requests.
  Hobby allows **one external user per account**; more requires Pro.
- **Someone who shouldn't need an account:** Deployments → select the deployment
  → *Share* → "Anyone with the link". Revocable at any time. Hobby allows
  **one shareable link total per account**.

## On launch day

1. **Set Production Branch back to `dev`** in Vercel → Settings → Git, then
   redeploy. This is what creates a production deployment for the first time.
2. **Set `PUBLIC_SITE_LIVE=true`** in Vercel env vars. Flips both the `robots`
   meta tag and `robots.txt` to their public versions, and makes `robots.txt`
   advertise the sitemap.
3. **Set `PUBLIC_SITE_URL=https://dotzie.app`** so canonical URLs and the
   sitemap stop pointing at the deployment URL (see `SITE` in
   `astro.config.mjs`).
4. **Delete `vercel.json`**, or remove just the `X-Robots-Tag` header block.
   This one is *not* covered by `PUBLIC_SITE_LIVE` — a static header file can't
   read env vars. Miss it and the site stays invisible in Google no matter what
   else you do.
5. **Move `prelaunch/llms.txt` back to `public/llms.txt`** and check its URLs
   against the live domain.
6. Decide whether to keep blocking AI training crawlers. The "live" branch of
   `src/pages/robots.txt.ts` currently allows everyone; the `AI_CRAWLERS` list
   applies only while hidden. Blocking them permanently does not affect Google
   Search ranking — it's a product call.
7. **Attach `dotzie.app`** in Vercel → Settings → Domains.
8. **Set Vercel Authentication to *Only Preview Deployments*** — keeps work in
   progress private while production goes public. (Turning it off entirely also
   works but leaves previews open.)
9. **Revoke** access granted to individual reviewers and any shareable links, in
   Deployment Protection → Access.
10. **Verify the domain in Google Search Console** and submit
    `https://dotzie.app/sitemap-index.xml`.
11. Confirm all of it:
    ```sh
    curl -sI https://dotzie.app | grep -i x-robots-tag   # expect: no output
    curl -s  https://dotzie.app/robots.txt               # expect: Allow: /
    curl -s  https://dotzie.app | grep -i 'name="robots"' # expect: no output
    ```

## If something looks exposed

1. Check Production Branch is still a nonexistent branch — a stray production
   deployment is the most likely cause.
2. Check no domain has been attached in Settings → Domains.
3. Verify from outside your own browser, which carries a Vercel session and will
   let you through regardless:
   ```sh
   curl -s -o /dev/null -w "%{http_code}\n" https://dotzie.vercel.app/
   ```
   Expect `404`. A `200` means a production deployment exists — delete it in the
   Deployments tab.
4. Last resort: delete the project (Settings → General → bottom of page). The
   Git repo is unaffected and re-importing takes about a minute.
