# Whalefall Website: Claude Code Handoff

This file exists so Claude Code can take over ownership of the Whalefall website project.

The goal: Claude should be able to edit the exact same website, understand the stack, avoid breaking production, and know how to deploy changes when asked.

## Project Links

- Live website: https://whalefall-site.vercel.app
- Live Sanity Studio: https://whalefall-site.vercel.app/studio
- GitHub repo: https://github.com/matthewgodinez24-boop/Whalefall-Site
- Sanity project dashboard: https://www.sanity.io/manage/project/odswazx4
- Vercel project: `whalefall-site` under Matthew's Vercel account

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Sanity CMS embedded at `/studio`
- Vercel hosting
- GitHub source control

## Important Project State

- The site is live and deployed to Vercel.
- The Sanity project is created and connected.
- Vercel production env vars are already set.
- Sanity project ID: `odswazx4`
- Sanity dataset: `production`
- Sanity API version: `2026-05-01`
- Sanity CORS allows the live Vercel site and local preview.
- The band should edit content in Sanity, not in code.

## Local Setup

From the repo root:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Studio locally:

```text
http://localhost:3000/studio
```

Production build check:

```bash
npm run build
```

## Environment Variables

Create `.env.local` for local development:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=odswazx4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
```

These are public client-side Sanity identifiers, not private secrets.

Do not commit `.env.local`.

## Deployment

Vercel production URL:

```text
https://whalefall-site.vercel.app
```

This project was deployed directly through the Vercel CLI. GitHub-to-Vercel automatic deploys were not fully connected at the time of setup because the Vercel account needed an additional GitHub login connection.

On this same machine, Vercel may already be authenticated and the local folder may already be linked. Check with:

```bash
npx vercel whoami
npx vercel env ls
```

Deploy production:

```bash
npx vercel --prod
```

If working from a fresh clone, link the project first:

```bash
npx vercel link --project whalefall-site
```

If Vercel asks for framework/build settings:

- Framework: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave default / blank for Next.js

## CMS / Sanity

Sanity is the source of editable band content.

Schema files:

```text
sanity/schemas/
```

Sanity config:

```text
sanity.config.ts
sanity.cli.ts
sanity/structure.ts
```

Editable CMS areas:

- Site Settings
- Homepage Featured Content
- Releases
- Shows
- Blog Posts
- Videos
- Gallery Images
- Sketches / Lyrics

If Sanity CLI work is needed:

```bash
npx sanity login
npx sanity projects list
NEXT_PUBLIC_SANITY_PROJECT_ID=odswazx4 NEXT_PUBLIC_SANITY_DATASET=production npx sanity dataset list
```

If adding new live domains or preview domains, add them to Sanity CORS.

## Repo Structure

```text
app/                         Next.js App Router pages
app/studio/[[...tool]]/      Embedded Sanity Studio route
components/                  Shared React components
lib/                         Sanity client, GROQ queries, types, formatting helpers
sanity/schemas/              CMS schema definitions
sanity/structure.ts          Sanity Studio sidebar structure
brand/whalefall-brand-kit.md Brand kit and style guide
BAND_HANDOFF_GUIDE.md        Band-facing CMS handoff
WHALEFALL_LIZBETH_HANDOFF.md Lizbeth-facing project handoff
```

## Brand Guidance

Before making visual, copy, content, or design changes for Whalefall, read:

```text
brand/whalefall-brand-kit.md
```

Core direction:

- DIY band website, not polished startup site
- Simple, raw, personal, blog-like
- Warm off-white / deep navy / weathered blue-gray palette
- Plain typography
- Content should feel easy for nontechnical band members to update
- Avoid generic modern landing-page polish

## Current Website Behavior

The site uses Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is configured.

If Sanity content is missing, pages use friendly fallback content so the site does not look broken.

Key routes:

- `/`
- `/listen`
- `/blog`
- `/blog/[slug]`
- `/videos`
- `/gallery`
- `/studio`

## Do Not Commit

Do not commit:

- `.env.local`
- `.vercel/`
- `.next/`
- `.tools/`
- `node_modules/`
- downloaded local runtimes

These are already covered by `.gitignore`.

## Known Setup History / Gotchas

- The local Codex environment originally lacked `npm`, so a local Node runtime was downloaded into `.tools/`. That is ignored and should not matter for Claude if system Node/npm are available.
- Vercel deploy works, but automatic GitHub deploys may require connecting GitHub inside the Vercel dashboard.
- Sanity browser login once showed a callback error, but the CLI login succeeded. If browser access is odd, make sure the same email/account has been invited to the Sanity project.
- Sanity project admin at setup time: `matthewgodinez24-boop` / `matthewgodinez24@gmail.com`.

## Suggested Claude Workflow

For code changes:

1. Inspect the request and current files.
2. Read `brand/whalefall-brand-kit.md` for any user-facing/design work.
3. Make focused edits.
4. Run `npm run build`.
5. Commit and push only intentional files.
6. Deploy with `npx vercel --prod` only when Matthew explicitly wants the live site updated.

For content-only requests:

1. Prefer Sanity Studio updates over code changes.
2. Do not hard-code band content that should live in Sanity.

## Ownership Note

Matthew asked for Claude Code to take ownership of this project from Codex. Treat this repository and handoff file as the source of truth for ongoing work.
