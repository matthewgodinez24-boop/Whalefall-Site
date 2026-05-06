import Link from "next/link";
import { ImageCarousel } from "@/components/image-carousel";
import { PlatformLinks } from "@/components/platform-links";
import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatDate, shortText } from "@/lib/format";
import { getHomePage } from "@/lib/sanity";
import type { BlogPost, GalleryImage, HomePageData, Release, Show, SketchLyric } from "@/lib/types";

const fallbackRelease: Release = {
  _id: "fallback-release",
  title: "New songs are being recorded in the room with the good lamp",
  description: "Whalefall is slowly gathering demos, room noise, and the first proper release."
};

const fallbackShows: Show[] = [
  {
    _id: "fallback-show-one",
    title: "Basement tide night",
    date: "2026-06-12",
    location: "Someone's living room",
    setTime: "8:30 pm",
    description: "A small first-wave set with old friends, borrowed amps, and a few songs still finding their names.",
    photoGalleryLink: "/gallery"
  },
  {
    _id: "fallback-show-two",
    title: "Low ceiling songs",
    date: "2026-07-03",
    location: "Community hall",
    setTime: "TBD",
    description: "Loose summer show. Expect new arrangements, hand-written setlists, and maybe one cover.",
    photoGalleryLink: "/gallery"
  }
];

const fallbackPosts: BlogPost[] = [
  { _id: "fallback-post", title: "First note from Whalefall", date: "2026-05-05", excerpt: "We are setting up this little site so the music has somewhere quiet to live." }
];

const fallbackSketches: SketchLyric[] = [
  { _id: "fallback-sketch", title: "Untitled chorus scrap", date: "2026-05-05", text: "half a line about weather / half a line about leaving it alone" }
];

function normalizeHome(data: unknown): HomePageData {
  const raw = data as {
    homepage?: HomePageData;
    latestRelease?: Release;
    recentShows?: Show[];
    mediaImages?: GalleryImage[];
    recentPosts?: BlogPost[];
    sketchesLyrics?: SketchLyric[];
  } | null;

  return {
    featuredRelease: raw?.homepage?.featuredRelease || raw?.latestRelease || fallbackRelease,
    recentShows: raw?.homepage?.recentShows?.length ? raw.homepage.recentShows : raw?.recentShows?.length ? raw.recentShows : fallbackShows,
    mediaImages: raw?.homepage?.mediaImages?.length ? raw.homepage.mediaImages : raw?.mediaImages,
    recentPosts: raw?.homepage?.recentPosts?.length ? raw.homepage.recentPosts : raw?.recentPosts?.length ? raw.recentPosts : fallbackPosts,
    sketchesLyrics: raw?.homepage?.sketchesLyrics?.length ? raw.homepage.sketchesLyrics : raw?.sketchesLyrics?.length ? raw.sketchesLyrics : fallbackSketches
  };
}

export default async function HomePage() {
  const data = normalizeHome(await getHomePage());
  const release = data.featuredRelease || fallbackRelease;

  return (
    <main>
      <Section title={release.title}>
        <div className="grid gap-4 sm:grid-cols-[130px_1fr]">
          <SimpleImage image={release.coverImage} alt={`${release.title} cover`} className="sm:max-w-[130px]" />
          <div>
            {release.description ? <p className="mt-0">{release.description}</p> : null}
            <PlatformLinks links={release.platformLinks} />
          </div>
        </div>
      </Section>

      <Section title="Recent Shows">
        <div className="space-y-6">
          {(data.recentShows || fallbackShows).map((show) => (
            <article key={show._id}>
              <h3 className="mb-2 text-lg font-normal">{show.title}</h3>
              <ul className="mb-3 list-disc pl-6">
                <li>Date: {formatDate(show.date)}</li>
                <li>Location: {show.location || "location TBA"}</li>
                <li>Set time: {show.setTime || "TBD"}</li>
              </ul>
              {show.description ? <p>{show.description}</p> : null}
              {show.photoGalleryLink ? <a href={show.photoGalleryLink}>View photos from this show</a> : <Link href="/gallery">View photos from this show</Link>}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Studio / Media Progress">
        <p>Little proof-of-life photos from practices, recordings, flyers, half-finished ideas, and things taped to walls.</p>
        <ImageCarousel images={data.mediaImages} />
        <p className="mt-3 text-sm"><Link href="/gallery">View All Studio Photos</Link></p>
      </Section>

      <Section title="Recent Blog Posts">
        <div className="space-y-3">
          {(data.recentPosts || fallbackPosts).map((post) => (
            <article key={post._id}>
              <h3 className="m-0 text-base font-normal">
                {post.slug ? <Link href={`/blog/${post.slug}`}>{post.title}</Link> : post.title}
              </h3>
              <p className="m-0 text-sm text-faded">{formatDate(post.date)}</p>
              {post.excerpt ? <p className="mt-1">{post.excerpt}</p> : null}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Sketches / Lyrics">
        <div className="space-y-4">
          {(data.sketchesLyrics || fallbackSketches).map((item) => (
            <article key={item._id}>
              <h3 className="m-0 text-base font-normal">{item.title}</h3>
              <p className="m-0 text-sm text-faded">{formatDate(item.date)}</p>
              {item.text ? <p className="whitespace-pre-line">{shortText(item.text, 220)}</p> : null}
              {item.image ? <SimpleImage image={item.image} alt={item.title} /> : null}
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm"><Link href="/blog">View All</Link></p>
      </Section>

      <p id="guestbook" className="text-sm text-faded">Leave a note in the guestbook when it is wired up in Site Settings.</p>
    </main>
  );
}
