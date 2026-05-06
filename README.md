# Whalefall Website

A small, plainspoken band website for Whalefall. It is built with Next.js, Tailwind CSS, Sanity CMS, and is ready to deploy on Vercel.

The goal is to feel like a personal DIY artist site: simple title, small navigation, stacked sections, music links, shows, photos, notes, and a footer. No startup polish, no copied assets, no copied code from the reference site.

## What The Band Can Edit

Everything important is editable in Sanity Studio at `/studio` after the site is connected to a Sanity project.

- Site Settings: band name, contact email, guestbook link, and social links.
- Releases: title, release date, description, cover image, and platform links.
- Shows: show title, date, location, set time, description, and photo gallery link.
- Blog Posts: title, date, short excerpt, body text, and images.
- Videos: title, embed link, and description.
- Gallery Images: image, caption, and category.
- Sketches / Lyrics: title, date, text, and optional image.
- Homepage Featured Content: choose the release, shows, media carousel images, blog posts, and sketches/lyrics shown on the homepage.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Sanity project:

```bash
npx sanity init
```

Use the same project folder when asked, choose the `production` dataset, and keep the schema files already in this repo.

3. Copy the example environment file:

```bash
cp .env.example .env.local
```

4. Fill in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-real-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-05-01"
```

5. Start the site:

```bash
npm run dev
```

Open `http://localhost:3000` for the website and `http://localhost:3000/studio` for the CMS dashboard.

## How Band Members Update The Site

Go to `/studio` and sign in with the Sanity account that has access to the project.

### Update Social Links, Contact, Or Guestbook

1. Open `Site Settings`.
2. Change `Band Name`, `Contact Email`, `Guestbook Link`, or `Social Links`.
3. Click `Publish`.

These changes affect the header/footer across the whole site.

### Add Or Edit A Release

1. Open `Releases`.
2. Click create, then add the title, date, description, cover image, and music links.
3. Add platform links for Bandcamp, Spotify, Apple Music, SoundCloud, YouTube, or another service.
4. Click `Publish`.
5. Open `Homepage Featured Content` and choose this release as `New Release Announcement` if it should appear at the top of the homepage.

### Add Or Edit A Show

1. Open `Shows`.
2. Add the show title, date, location, set time, and description.
3. Paste a gallery link into `Photo Gallery Link` when photos exist.
4. Click `Publish`.
5. Open `Homepage Featured Content` to choose which shows appear on the homepage.

### Add Or Edit Blog Posts

1. Open `Blog Posts`.
2. Add a title.
3. Click `Generate` next to the slug field.
4. Add a date, excerpt, body text, and optional images.
5. Click `Publish`.
6. Feature it on the homepage from `Homepage Featured Content` if needed.

### Add Videos

1. Open `Videos`.
2. Add a title.
3. Paste an embed URL into `Embed Link`.
   - YouTube example: `https://www.youtube.com/embed/VIDEO_ID`
4. Add a description.
5. Click `Publish`.

### Add Gallery Images

1. Open `Gallery Images`.
2. Upload an image.
3. Add a caption and category.
4. Use `studio` or `media` categories for images that should be eligible for the homepage carousel.
5. Click `Publish`.

### Add Sketches Or Lyrics

1. Open `Sketches / Lyrics`.
2. Add a title, date, lyric/sketch text, and optional image.
3. Click `Publish`.
4. Feature it on the homepage from `Homepage Featured Content` if needed.

## Homepage Controls

Open `Homepage Featured Content` in Studio.

This document controls what appears on the homepage. If a field is empty, the site falls back to the newest relevant content, and if the CMS is not connected yet it shows friendly placeholder content.

Recommended homepage setup:

- Pick one featured release.
- Pick one to four recent shows.
- Pick several `studio` or `media` gallery images for the carousel.
- Pick two or three recent blog posts.
- Pick one to three sketches or lyrics.

## Deploy On Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Add these Environment Variables in Vercel:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

4. Deploy.
5. In Sanity, add the production Vercel domain to the project CORS origins:
   - Go to Sanity Manage.
   - Open the Whalefall project.
   - Go to API settings.
   - Add the Vercel URL as an allowed CORS origin.

After deployment, the public site will be at the Vercel URL and the CMS will be at `/studio`.

## Project Structure

- `app/`: Next.js pages and layout.
- `components/`: small reusable page pieces.
- `lib/`: Sanity client, queries, types, and formatting helpers.
- `sanity/schemas/`: CMS document and object schemas.
- `sanity.config.ts`: Sanity Studio configuration.
- `tailwind.config.ts`: simple DIY visual styling.

## Notes

The site renders placeholder content when Sanity is not connected yet. That lets the band preview the layout immediately, then replace every placeholder from the CMS later.
