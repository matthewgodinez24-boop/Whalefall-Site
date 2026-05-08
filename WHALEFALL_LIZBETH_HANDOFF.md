# Whalefall Website Handoff For Lizbeth

This handoff was prepared by Codex at Matthew's request.

## Main Links

Public website:
https://whalefall-site.vercel.app

CMS / editing dashboard:
https://whalefall-site.vercel.app/studio

GitHub code repository:
https://github.com/matthewgodinez24-boop/Whalefall-Site

Sanity project dashboard:
https://www.sanity.io/manage/project/odswazx4

## What This Project Is

This is a simple DIY band website for Whalefall, built with:

- Next.js
- Tailwind CSS
- Sanity CMS
- GitHub
- Vercel

The band should be able to update normal content from Sanity without touching code.

## How To Edit Website Content

1. Go to https://whalefall-site.vercel.app/studio
2. Log in with the Sanity account that has been invited to the project.
3. Use the left-side Studio sections to edit content.
4. Click Publish after making changes.

Content that can be edited in Sanity:

- Site Settings: band name, contact email, guestbook link, social links
- Homepage Featured Content: featured release, shows, media carousel, blog posts, lyrics/sketches
- Releases: title, date, description, cover image, platform links
- Shows: title, date, location, set time, description, photo gallery link
- Blog Posts: title, date, excerpt, body, images
- Videos: title, embed link, description
- Gallery Images: image, caption, category
- Sketches / Lyrics: title, date, text, optional image

## Access Notes

The band does not need Matthew's Vercel login or password to update normal website content.

Use this mental model:

- Sanity = where the band edits text/images/shows/releases
- GitHub = where developers edit website code
- Vercel = where the website is hosted online

If you need Sanity access, Matthew or the Sanity project admin should invite your email from:

https://www.sanity.io/manage/project/odswazx4

Recommended role:

- Editor for content editing
- Administrator only if you need to manage members/settings

## How To Edit The Code

The code lives here:

https://github.com/matthewgodinez24-boop/Whalefall-Site

To make code changes, you need GitHub access to that repo. Matthew should add you as a collaborator in GitHub.

Beginner-friendly code workflow:

1. Get added as a GitHub collaborator.
2. Clone the repo locally or open it in a GitHub/Codespaces-style editor.
3. Install dependencies with `npm install`.
4. Run the local site with `npm run dev`.
5. Open `http://localhost:3000`.
6. Make changes.
7. Commit and push changes to GitHub.
8. Deploy through Vercel or have Matthew/Codex handle deployment.

Common local commands:

```bash
cd Whalefall-Site
npm install
npm run dev
npm run build
```

Environment variables needed for local development:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=odswazx4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
```

These are already configured in Vercel for the live site.

## Deployment

The site is currently deployed on Vercel at:

https://whalefall-site.vercel.app

Vercel hosts the public website. Sanity stores the editable content. GitHub stores the code.

If you only need to update content, start here:

https://whalefall-site.vercel.app/studio

If you need to update code, start here:

https://github.com/matthewgodinez24-boop/Whalefall-Site
