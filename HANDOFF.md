# Whalefall Website — Comprehensive Handoff

Audit date: 2026-05-11 · Audit by: Claude Code (taking over from Codex on 2026-05-07; redesign + bug-fix work May 10–11)

---

## 1. Project overview

**Client:** Whalefall — a band based in Berkeley, CA. Public-facing tagline they use on Instagram: "emotional noise from berkeley, ca." Account `@whalefall.ca`, ~1,025 followers at brand-kit review time. The band has multiple members and a small but real catalog with at least three released songs ("Starboy", "The Runner", "For you, To Blame") and an upcoming West Coast tour booked for August 2026 with Sleepy Cat.

**Goal:** Build a plainspoken, DIY band website where the band members themselves can edit content via a CMS without ever touching code. Not a polished startup-style landing page — intentionally raw, blog-like, Win95/Geocities-retro after the 2026-05-10 redesign. The site is the band's official home for releases, shows, lyrics, blog, video, and gallery content.

**Live URL:** https://whalefall-site.vercel.app
**Studio (CMS):** https://whalefall-site.vercel.app/studio
**GitHub:** https://github.com/matthewgodinez24-boop/Whalefall-Site

**Kickoff:** 2026-05-05 (first commit by Codex: "Build Whalefall website")
**First production deploy:** ~2026-05-05 to Vercel
**Retro UI redesign shipped:** 2026-05-10 (matching wadehubbard.dog aesthetic)
**Currently:** active maintenance; small fixes and content additions in flight

---

## 2. Stack & architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components + ISR give fast page loads and ~60s content freshness; one deploy hosts both the public site and the embedded CMS. |
| Language | TypeScript 5 | Catches schema/data mismatches at build time — important because non-technical band members edit the data. |
| Styling | Tailwind CSS 3 + custom CSS in `app/globals.css` | Tailwind is set up but the retro redesign uses hand-written CSS variables (`--box-bg`, `--bevel-light`, etc.) for the Win95 bevel system. Tailwind classes are vestigial in most pages now. |
| CMS | Sanity v3, embedded at `/studio` | Real-time collaborative editing, hosted by Sanity (no self-hosted DB), GROQ queries are easy to read, and embedding inside the Next app means one auth flow and one deploy. |
| Image pipeline | `@sanity/image-url` + `next/image` | Sanity hosts originals; `imageUrlBuilder` requests resized variants; `next/image` adds lazy-loading. |
| Hosting | Vercel | Native Next.js support, edge CDN, ISR, free tier covers a band site. Currently deployed via `vercel --prod` CLI from local — GitHub auto-deploy not yet wired. |
| Source control | GitHub | Repo lives at `matthewgodinez24-boop/Whalefall-Site`. **Currently behind production** — see open issues. |
| Local dev quirk | Portable Node 22 at `.tools/node/` | The owner's mac has no system Node or Homebrew; a portable Node runtime is gitignored under `.tools/`. Prepend `.tools/node/bin` to PATH to use `npm`. |

### Top 10 dependencies

| Package | Purpose |
|---|---|
| `next@^15.3.2` | Framework — App Router, ISR, image optimization. |
| `react@^19.0.0` | UI library. React 19 used here for server components. |
| `sanity@^3.87.0` | The full Sanity Studio bundled at `/studio`. |
| `next-sanity@^9.12.0` | Sanity GROQ client tuned for Next.js (request caching, revalidation). |
| `@sanity/image-url@^1.1.0` | Builds CDN URLs for resized variants of Sanity-hosted images. |
| `@sanity/vision@^3.87.0` | GROQ query playground inside Studio — useful for debugging. |
| `@portabletext/react@^3.2.1` | Renders Sanity's Portable Text format (used in `blogPost.body`). |
| `tailwindcss@^3.4.17` | Utility CSS framework, partially used. |
| `@tailwindcss/typography@^0.5.16` | `.prose` styling for blog body content. |
| `typescript@^5.8.3` | Type system. |

---

## 3. File structure

```
Whalefall-Site/
├── app/                         # Next.js App Router pages
│   ├── blog/
│   │   ├── [slug]/page.tsx      # Blog post detail (dynamic, SSR)
│   │   └── page.tsx             # Blog list
│   ├── gallery/page.tsx         # Image grid
│   ├── listen/page.tsx          # Releases grid
│   ├── lyrics/page.tsx          # Sketches / lyrics index
│   ├── studio/[[...tool]]/      # Embedded Sanity Studio
│   ├── videos/page.tsx          # Embedded YouTube/Vimeo grid
│   ├── globals.css              # Full Win95 retro design system (CSS vars + classes)
│   ├── layout.tsx               # Root layout: header, nav, footer wrapping
│   └── page.tsx                 # Homepage (hero release + recent shows + carousel + posts + sidebar)
├── components/                  # Shared React components
│   ├── image-carousel.tsx       # Client-side prev/next photo carousel
│   ├── platform-links.tsx       # Streaming-platform button row (Spotify, Apple, etc.)
│   ├── section.tsx              # Beveled box wrapper with section title
│   ├── simple-image.tsx         # <Image> with Sanity URL builder + placeholder fallback
│   └── social-links.tsx         # Inline list of social URLs (footer)
├── lib/                         # Data + utility helpers
│   ├── embed.ts                 # YouTube/Vimeo URL normalizer (any URL form → /embed/)
│   ├── format.ts                # Date formatters, text truncation
│   ├── queries.ts               # All GROQ queries
│   ├── sanity.ts                # Sanity client, safeFetch wrapper, urlForImage
│   └── types.ts                 # TypeScript types mirroring Sanity schemas
├── sanity/                      # CMS schema + Studio config
│   ├── schemas/
│   │   ├── objects/             # Reusable sub-objects: platformLink, socialLink, tourDate
│   │   ├── blogPost.ts          # Title, slug, date, excerpt, images, Portable Text body
│   │   ├── galleryImage.ts      # Image, caption, category
│   │   ├── homepage.ts          # Singleton: featured release + shows + media + posts + sketches
│   │   ├── index.ts             # Exports the full schema array
│   │   ├── release.ts           # Title, date, description, cover, heroVideoEmbed, platformLinks
│   │   ├── show.ts              # Title, date, location, setTime, description, photoGalleryLink
│   │   ├── siteSettings.ts      # Singleton: band name, contact, guestbook, social links
│   │   ├── sketchLyric.ts       # Title, date, text, sourceName, sourceUrl, image
│   │   ├── tour.ts              # Tour title, withBands, poster, description, dates, isUpcoming
│   │   └── video.ts             # Title, embedLink (any YouTube/Vimeo form), description
│   └── structure.ts             # Studio sidebar structure (singletons pinned to top)
├── brand/whalefall-brand-kit.md # Visual + tone direction (handmade, nocturnal, coastal, raw)
├── BAND_HANDOFF_GUIDE.md        # Band-facing CMS instructions
├── CLAUDE.md                    # Claude Code handoff (source of truth for AI agents)
├── HANDOFF.md                   # This document
├── WHALEFALL_LIZBETH_HANDOFF.md # Lizbeth-facing project handoff
├── README.md                    # Developer setup
├── sanity.config.ts             # Sanity Studio config (project ID, dataset, structure plugin)
├── sanity.cli.ts                # Sanity CLI config
├── tailwind.config.ts           # Tailwind config (mostly stale post-redesign)
├── next.config.mjs              # Image domains: cdn.sanity.io
└── package.json                 # Scripts: dev, build, start, lint, typecheck
```

---

## 4. Component & route inventory

### Routes (8 total)

| Route | Type | What it shows |
|---|---|---|
| `/` | Static + ISR 60s | Two-column homepage. **Main:** hero release (large 720×405 cover or embedded video), recent shows list, studio media carousel, recent blog posts. **Sidebar:** sketches/lyrics preview with "View All" → /lyrics. |
| `/listen` | Static + ISR 60s | Grid of all releases (newest first), each with cover, title, date, description, platform link buttons. |
| `/lyrics` | Static + ISR 60s | Full list of all sketch/lyric entries (newest first), monospace courier body, optional source attribution. |
| `/blog` | Static + ISR 60s | Blog post list with title, date, excerpt. |
| `/blog/[slug]` | Server-rendered | Single blog post: title, date, optional images, Portable Text body. |
| `/videos` | Static + ISR 60s | Responsive grid of YouTube/Vimeo embeds, auto-normalized URLs. |
| `/gallery` | Static + ISR 60s | Grid of gallery images with caption + category. |
| `/studio/[[...tool]]` | Server-rendered | Embedded Sanity Studio — full CMS UI. ~1.45 MB chunk. |

### Components (5 total)

| Component | What it does | Reusable? |
|---|---|---|
| `Section` | Renders a `.bevel-box` div with a `.section-title` heading. Wraps most page content. | **Yes** — but the bevel styling is brand-specific. Generalize to a `Card` with a styling prop for next site. |
| `SimpleImage` | Wraps `next/image`, builds Sanity image URL via `urlForImage`, renders a `.image-placeholder` div if no image. | **Yes** — directly portable. |
| `ImageCarousel` | Client component with prev/next buttons cycling through a `GalleryImage[]`. Uses `urlForImage` directly (not `SimpleImage`) for tighter crop control. | **Yes** — but coupled to `GalleryImage` type. Genericize with a render-prop. |
| `PlatformLinks` | Renders `<ul.platform-links>` of streaming-platform buttons; returns `null` if empty. (Recent bug fix — was incorrectly showing 5 demo platforms when none were set.) | **Yes** — directly portable to any music site. |
| `SocialLinks` | Renders `<ul.social-links>` in the footer; falls back to a small placeholder list when nothing is in Sanity. | **Yes** — directly portable. |

### Flag for shared foundation library (future client sites)

If you're building site #2 (another band, another freelance client), these are the no-brainer extracts:

- **`lib/embed.ts`** — YouTube/Vimeo URL normalizer. Every band site needs this; non-technical clients paste any link form.
- **`lib/sanity.ts` → `safeFetch` wrapper** — Gracefully degrades when Sanity is unreachable, returning `null` and letting components fall back to placeholder content. Pattern is reusable verbatim.
- **`components/SimpleImage`** — `next/image` + Sanity URL builder + placeholder. Plug-and-play.
- **`components/PlatformLinks`** — works for any artist site.
- **Sanity schema set** — `siteSettings`, `release`, `blogPost`, `video`, `galleryImage`, `show`, `tour`, `sketchLyric`, plus the object types (`platformLink`, `socialLink`, `tourDate`). This is essentially a "small-artist-site starter kit." Add `_updatedAt` references and a slug field to `sketchLyric` before extracting.
- **The Win95 retro design system in `globals.css`** — extract to a theme package; one client site uses it, the next probably will not, but the *pattern* of CSS-vars-only-no-Tailwind is worth preserving.

---

## 5. Content management

**Everything important is editable in Sanity Studio at `/studio`.** The band never opens the repo.

### Editable areas (all live in Studio sidebar)

1. **Site Settings** (singleton) — band name (shown in header), contact email (footer), guestbook URL (footer), social links (footer).
2. **Homepage Featured Content** (singleton) — overrides for what shows on `/`: featured release, recent shows (max 4), studio carousel images, recent blog posts (max 5), sketches/lyrics (max 5). If empty, the homepage falls back to "latest" queries instead.
3. **Releases** — title, release date (drives ordering), description, cover image, **Hero Video Link** (optional — replaces cover with embedded player on the homepage), platform links (Spotify/Apple/Bandcamp/etc.).
4. **Tours** — tour title (e.g. "West Coast Tour 2026"), withBands, poster image, description, dates (date + city + venue), `isUpcoming` toggle.
5. **Shows** — show title, date, location, set time, description, photo gallery link.
6. **Blog Posts** — title, auto-generated slug, date, excerpt, images, Portable Text body.
7. **Videos** — title, **Video Link** (paste any YouTube/Vimeo URL — share, watch, shorts, embed — normalized on render), description.
8. **Gallery Images** — image, caption, category (shows / studio / media / flyers / behind the scenes / other).
9. **Sketches / Lyrics** — title, date, text (preserves line breaks), source name (e.g. songwriter), source URL.

### Update flow

1. Band member opens Studio, edits a document, clicks **Publish** (not just save — drafts don't appear publicly).
2. Sanity CDN serves the updated content within ~60s.
3. Next.js ISR revalidates `/route` on next request after 60s, regenerating the static HTML.
4. Vercel CDN may hold the previous HTML for another 60s on top of that.

**Worst-case freshness:** ~2 min from Publish to live HTML. **To force-bust the cache instantly:** redeploy with `npx vercel --prod` — this regenerates all static routes against current Sanity data.

### Fallback behavior

`safeFetch` returns `null` when Sanity is unreachable or `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset. Each page provides a friendly placeholder so the site never looks broken. Local dev without `.env.local` still renders cleanly with placeholder content.

---

## 6. Integrations

| Integration | Purpose | Where credentials live |
|---|---|---|
| **Sanity CMS** | Content storage + Studio UI | Project ID `odswazx4`, dataset `production`, API version `2026-05-01`. All in `.env.local` (local) and Vercel project env vars (prod). Public client-side identifiers only — no API tokens currently configured. |
| **YouTube / Vimeo (iframe embeds)** | Video playback on `/videos` and homepage hero | No credentials. URLs come from Sanity; `lib/embed.ts` normalizes them on render. |
| **Vercel** | Hosting + CDN + ISR + image optimization | Linked to `mathew-godinezs-projects/whalefall-site`. Local link in `.vercel/project.json` (gitignored). Auth via `vercel login` on the dev machine. |
| **GitHub** | Source control | Repo `matthewgodinez24-boop/Whalefall-Site`. No tokens needed for local push; GitHub→Vercel auto-deploy is **not yet connected**. |

### Not integrated (yet)

- No analytics (no GA, Plausible, Fathom)
- No forms (no Formspree, Tally, native handlers)
- No email (no Resend, Postmark, Mailgun)
- No payments
- No newsletter signup
- No comments / guestbook backend (the "Guestbook" footer link points to an external URL set in Site Settings, or `/#guestbook` placeholder)
- No auth (Studio uses Sanity's own auth — band members are invited to the Sanity project)

---

## 7. What worked well — patterns to reuse

1. **Embedded Studio at `/studio`.** One Next app, one deploy, one auth flow. The band logs into Sanity once and edits everything in-place. No separate admin site to host or update.
2. **`safeFetch` wrapper around the Sanity client.** Returns `null` on failure, `{ next: { revalidate: 60 } }` for ISR, never throws into pages. Components handle the `null` case with friendly fallback content. The site has never "broken" from a transient Sanity outage.
3. **Per-page fallback content arrays.** Every page declares a `fallbackX` array used when Sanity returns nothing for that route. New deployments and local dev without `.env.local` both render fully — useful for previews and onboarding.
4. **`lib/embed.ts` URL normalizer.** The single most valuable defensive piece of code in the repo. Non-technical users paste *any* YouTube/Vimeo URL form (share link, watch URL, shorts, embed, shortlink with tracking) and it Just Works. Replaced an entire class of "why is this iframe blank?" support tickets in advance.
5. **Win95 retro design system as plain CSS variables.** `--box-bg`, `--bevel-light`, `--bevel-dark`, `--bevel-border` etc. Easy to read, easy to tune, no Tailwind class soup. Whole design system fits in ~650 lines of CSS.
6. **Schema-first development.** Every public surface (page, sidebar widget, etc.) is backed by a typed Sanity schema. Adding `heroVideoEmbed` to releases, `sourceName`/`sourceUrl` to sketchLyric, or the entire `tour` + `tourDate` system was each a 4-file change with no breaking risk to existing data.
7. **Singletons via the structure plugin.** `siteSettings` and `homepage` live as pinned items at the top of the Studio sidebar, not as a list. Prevents the band from accidentally creating duplicates.
8. **Reference site as a true reference, not a copy.** Wade Hubbard's `wadehubbard.dog` informed sizing (hero 720×405), section layout, and color/bevel language without lifting any code or assets. Result is recognizable but not derivative.
9. **The two-column main+sidebar homepage.** Mirrors Wade's structure while giving the sketches/lyrics a permanent slot — useful for a band whose written output (lyrics, tour scraps) is half the product.

---

## 8. What I'd do differently next time

1. **Build `lib/embed.ts` from day one.** The original schema said "use the /embed/ URL form" in the field description. That instruction is wrong for 80% of users who paste a share link. The normalizer should be the default in any starter template, not a fix after the first bug report.
2. **Distinguish "site is empty" fallback from "this record has missing fields."** The `PlatformLinks` component originally rendered 5 fake platforms when a release's `platformLinks` array was empty — meant as a first-load demo, but it rendered per-record and made every link-less release look like it had every link. Lesson: fallbacks belong at the page/data layer (when the *whole collection* is empty), not the component layer.
3. **Document the Vercel CDN-vs-ISR cache story up front.** Three separate bugs in this project were actually "Sanity has the new data, ISR didn't fire yet, Vercel CDN served stale HTML." Every time the user reported "I published it, why doesn't it show?", the answer was the same. A line in the band handoff explaining `~60s ISR + ~60s CDN = ~2 min worst case, or redeploy to force-bust` would save support time.
4. **Add a slug field to `sketchLyric` from the start.** The `/lyrics` page works as a single-page list, but a `/lyrics/[slug]` detail route for individual songs is an obvious near-term ask. Adding a slug now is free; backfilling slugs after Sanity already has dozens of entries is annoying.
5. **Set up `SANITY_API_WRITE_TOKEN` early.** Without it, no automated content sync is possible (e.g., Drive folder → gallery sync was scoped but blocked). For a freelance workflow where the designer keeps updating content alongside the client, a write token is essentially required infrastructure.
6. **Connect GitHub → Vercel auto-deploy on day one.** Currently every redesign + bug fix has shipped via `vercel --prod` from local. The GitHub repo is multiple commits behind production. This creates real risk: if the local machine dies, the production state is only recoverable from Vercel build artifacts.
7. **Remove or rebuild the Tailwind config to match the actual design system.** `tailwind.config.ts` still defines `paper`/`ink`/`faded`/`line` colors that nothing references after the retro redesign. Either fully embrace Tailwind (refactor `globals.css` into utilities) or fully drop it (delete the config and tailwind deps).
8. **Add a "draft / WIP" toggle to release.** Currently every published release shows on `/listen`. A `showOnPublicPages: boolean` field would let the band stage releases without exposing them.
9. **Extract the foundation library on commit one of site #2.** Don't wait — `SimpleImage`, `safeFetch`, `normalizeEmbedUrl`, `PlatformLinks`, the Sanity schema set are the seed of a freelance-band-site starter kit. The extraction is harder the longer you wait.

---

## 9. Open issues / known shaky bits

| # | Issue | Severity | Notes |
|---|---|---|---|
| 1 | **GitHub repo is behind production.** All redesign + bug-fix work since 2026-05-10 has been deployed via `vercel --prod` from local files. The repo's `main` branch ends at commit `8cccb7c` ("Build Whalefall website"). | High | Commit and push the local working tree to recover state in version control. No conflicts expected — repo is purely behind, not diverged. |
| 2 | **Vercel ↔ GitHub auto-deploy not connected.** | High (couples to #1) | Connect in the Vercel dashboard. Once wired, push to `main` will trigger production deploys automatically. |
| 3 | **No Sanity write token configured.** | Medium | Blocks Drive→Sanity sync, any scripted content backfill, and any GitHub Action that touches content. To set up: create token in Sanity dashboard with Editor role, add to `.env.local` and to Vercel env as `SANITY_API_WRITE_TOKEN`. |
| 4 | **Tailwind config is stale.** `tailwind.config.ts` defines colors (`paper`, `ink`, `faded`, `line`) that nothing in the current design uses. | Low | Harmless, but confusing for the next developer. Either delete unused colors or commit fully to Tailwind. |
| 5 | **README is out of date** vs the current retro redesign and the `/lyrics` page. Mentions `npx sanity init` step that doesn't apply after the project is already provisioned. | Low | Update before sending to anyone new. |
| 6 | **BAND_HANDOFF_GUIDE.md** doesn't yet mention the Lyrics page, the Tour schema, the Hero Video Link field on Release, or the Source Name / Source URL fields on Sketches/Lyrics. | Low | Updates needed before sharing with band. |
| 7 | **Homepage sketches/lyrics sidebar truncates at 220 characters.** Fine for short scraps; ugly for full song lyrics. | Low | Either bump the truncation or build `/lyrics/[slug]` detail pages and keep the sidebar as preview. Already discussed with client. |
| 8 | **18 npm audit warnings** (11 moderate, 7 high) from initial `npm install`. Not investigated. | Low | Likely transitive deps under Sanity. Run `npm audit` and assess. |
| 9 | **Sanity ISR + Vercel CDN can take ~2 min to reflect content edits.** This has confused the client multiple times. | Documentation gap | Document the "wait 2 min or redeploy to force-bust" pattern in band-facing handoff. |
| 10 | **No automated content sync from Drive.** The client wants their Google Drive `Whalefall Website Media Gallery` folder to mirror to the website gallery automatically. Currently 2 photos sit in Drive un-uploaded. | Medium | Requires Sanity write token (#3). Sync script is scoped but unbuilt. |
| 11 | **The 6px outset bevel on the homepage hero cover** is visually heavy at the new 720×405 size. Looks fine but could be lighter. | Subjective | One CSS tweak. |
| 12 | **`tailwind.config.ts` and `app/globals.css` both define styles in different paradigms.** The eslint config and tsconfig are fine, but there's no design-system source of truth document. | Subjective | If a designer joins, they'll need this. |

---

## 10. Deployment

### Required environment variables (public, client-side)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=odswazx4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
```

All three are already set in Vercel production. For local dev, they live in `.env.local` (gitignored).

### Optional / future env vars

```bash
SANITY_API_WRITE_TOKEN=<editor-role token from Sanity dashboard>
# Required only for scripted content writes (Drive sync, backfills, automated migrations).
```

### Local setup (from a fresh clone)

```bash
# 1. Install deps. If this machine has no Node, see the .tools/node story in CLAUDE.md.
npm install

# 2. Copy env vars
cp .env.example .env.local

# 3. Dev server
npm run dev
# → http://localhost:3000  |  Studio at /studio

# 4. Build check before deploy
npm run build
```

### Production deploy

```bash
# From repo root, after npm run build passes:
npx vercel --prod --yes
```

The project is already linked to `mathew-godinezs-projects/whalefall-site` (state in `.vercel/project.json`, gitignored). Vercel auto-aliases the new deployment to `whalefall-site.vercel.app`.

If the link is lost (fresh clone, machine wipe):

```bash
npx vercel link --project whalefall-site --yes
```

### Reverting a bad deploy

Vercel keeps every deployment. From the Vercel dashboard → Deployments → pick a previous one → "Promote to Production." No CLI needed.

---

## 11. Multi-agent coordination (important — read before touching anything)

Matthew works with multiple AI agents on this project in parallel. To avoid dueling pushes, conflicting commits, and contradictory recommendations, ownership is split by role:

| Agent | Role | Can do | Must not do |
|---|---|---|---|
| **Claude Code (this repo, local machine)** | Code owner | Edit repo files, run `npm`/`vercel`/`sanity` CLIs, build, deploy to Vercel, commit + push to GitHub, edit Sanity schemas. | Make strategic prioritization calls without Matthew's input. |
| **PM / Strategy Claude (Cowork session)** | Strategy partner | Read this handoff doc and any Drive artifacts, propose prioritization, draft communications, summarize status, ask clarifying questions, suggest scope changes. | **Never push to GitHub. Never run `vercel --prod`. Never edit code files in this repo. Never edit Sanity schemas.** If a code or content change is needed, propose it back to Matthew, who routes it to Claude Code. |
| **Future agents** | Domain helpers (e.g. content sync, analytics setup) | Whatever Matthew explicitly scopes per task. | Same rule: only Claude Code owns the repo. |

### Why this split

- **Single writer to the repo** means no merge conflicts between parallel sessions and no "which Claude pushed what" archaeology.
- **Strategy Claude reads, code Claude writes.** Strategy Claude having an opinion on the next sprint is useful; strategy Claude pushing to `main` from a separate worktree without context on what's already in flight here is a real risk.
- **Matthew is the integrator.** If strategy proposes a change, Matthew approves and forwards to Claude Code. This keeps Matthew in the loop on every commit, which is how he wants it for client work.

### Practical rules for any agent reading this

1. **Before any git operation,** check `git status` and `git fetch origin` to see what the other side has done.
2. **If you're not Claude Code (this session),** stop before any `git`/`vercel`/`npm` command and ask Matthew to route it.
3. **HANDOFF.md is the shared source of truth.** When you change something material — schema, route, dependency, integration — update this file in the same change.
4. **The Drive copy of HANDOFF.md** at `https://drive.google.com/file/d/1Iaw9BR3TnsQ6Hm6ym2ZhKC4cwRLZbYgr/view` is the version Cowork/strategy Claude reads. When Claude Code updates this file, also refresh the Drive copy (or ask Matthew to).

---

## Day-one for the next collaborator

You're inheriting a Next.js 15 + Sanity v3 + Vercel site that is **live, working, and edited by non-technical band members through `/studio`.** The repo has roughly five components and ten schemas, all small and readable; spend an hour reading `app/page.tsx`, `lib/sanity.ts`, `lib/queries.ts`, and the files in `sanity/schemas/`. The single most important pattern to internalize is that **the band edits Sanity, not code** — never hardcode content that should be editable. The Win95 retro UI in `app/globals.css` was a deliberate match to a reference site (wadehubbard.dog); preserve the bevel language unless you're proposing a real redesign. Your most likely first task is one of: (1) committing the current local working tree to GitHub and wiring auto-deploy, (2) building the Drive→Sanity gallery sync once a write token is provisioned, (3) adding a `/lyrics/[slug]` detail route for the lyrics page, or (4) extending the band-facing handoff guide to cover the new fields shipped since 2026-05-10. When in doubt about whether something should be code or content, choose content — the band benefits every time. And when content edits look like they're not propagating to the live site, the answer is almost always "Vercel CDN cached the prerender; wait ~2 min or redeploy" — not a real bug.
