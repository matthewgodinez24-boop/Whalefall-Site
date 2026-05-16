import Link from "next/link";
import { ImageCarousel } from "@/components/image-carousel";
import { PlatformLinks } from "@/components/platform-links";
import { SimpleImage } from "@/components/simple-image";
import { normalizeEmbedUrl } from "@/lib/embed";
import { formatDate, formatTourDate, shortText } from "@/lib/format";
import { getHomePage } from "@/lib/sanity";
import type {
  BlogPost,
  GalleryImage,
  HomePageData,
  Release,
  Show,
  SketchLyric,
  Tour
} from "@/lib/types";

const fallbackRelease: Release = {
  _id: "fallback-release",
  title: "New songs are being recorded in the room with the good lamp",
  description:
    "Whalefall is slowly gathering demos, room noise, and the first proper release."
};

const fallbackShows: Show[] = [
  {
    _id: "fallback-show-one",
    title: "Basement tide night",
    date: "2026-06-12",
    location: "Someone's living room",
    setTime: "8:30 pm",
    description:
      "A small first-wave set with old friends, borrowed amps, and a few songs still finding their names.",
    photoGalleryLink: "/gallery"
  },
  {
    _id: "fallback-show-two",
    title: "Low ceiling songs",
    date: "2026-07-03",
    location: "Community hall",
    setTime: "TBD",
    description:
      "Loose summer show. Expect new arrangements, hand-written setlists, and maybe one cover.",
    photoGalleryLink: "/gallery"
  }
];

const fallbackTour: Tour = {
  _id: "fallback-tour",
  title: "West Coast Tour 2026",
  withBands: ["Whalefall", "Sleepy Cat"],
  isUpcoming: true,
  dates: [
    { date: "2026-08-16", city: "Seattle", venue: "The Black Lodge" },
    { date: "2026-08-18", city: "Portland", venue: "TBD" },
    { date: "2026-08-20", city: "Berkeley", venue: "924 Gilman" },
    { date: "2026-08-21", city: "San Francisco", venue: "Neck of the Woods" },
    { date: "2026-08-22", city: "Santa Cruz", venue: "Subrosa" },
    { date: "2026-08-23", city: "Pomona", venue: "The Haven" },
    { date: "2026-08-25", city: "San Diego", venue: "The Beat" }
  ]
};

const fallbackPosts: BlogPost[] = [
  {
    _id: "fallback-post",
    title: "First note from Whalefall",
    date: "2026-05-05",
    excerpt:
      "We are setting up this little site so the music has somewhere quiet to live."
  }
];

const fallbackSketches: SketchLyric[] = [
  {
    _id: "fallback-sketch",
    title: "Untitled chorus scrap",
    date: "2026-05-05",
    text: "half a line about weather / half a line about leaving it alone"
  }
];

function normalizeHome(data: unknown): HomePageData {
  const raw = data as {
    homepage?: HomePageData;
    latestRelease?: Release;
    upcomingTour?: Tour;
    recentShows?: Show[];
    mediaImages?: GalleryImage[];
    recentPosts?: BlogPost[];
    sketchesLyrics?: SketchLyric[];
  } | null;

  return {
    featuredRelease:
      raw?.homepage?.featuredRelease || raw?.latestRelease || fallbackRelease,
    upcomingTour: raw?.upcomingTour || fallbackTour,
    recentShows: raw?.homepage?.recentShows?.length
      ? raw.homepage.recentShows
      : raw?.recentShows?.length
      ? raw.recentShows
      : fallbackShows,
    mediaImages: raw?.homepage?.mediaImages?.length
      ? raw.homepage.mediaImages
      : raw?.mediaImages,
    recentPosts: raw?.homepage?.recentPosts?.length
      ? raw.homepage.recentPosts
      : raw?.recentPosts?.length
      ? raw.recentPosts
      : fallbackPosts,
    sketchesLyrics: raw?.homepage?.sketchesLyrics?.length
      ? raw.homepage.sketchesLyrics
      : raw?.sketchesLyrics?.length
      ? raw.sketchesLyrics
      : fallbackSketches
  };
}

export default async function HomePage() {
  const data = normalizeHome(await getHomePage());
  const release = data.featuredRelease || fallbackRelease;
  const tour = data.upcomingTour;
  const shows = data.recentShows || fallbackShows;
  const recentPosts = data.recentPosts || fallbackPosts;
  const sketches = data.sketchesLyrics || fallbackSketches;

  return (
    <div className="main-layout">
      <main>
        {/* Hero release */}
        <section className="bevel-box home-hero">
          <h2 className="section-title">{release.title}</h2>
          <div className="release-info">
            <div
              className={`home-hero-cover${
                release.heroVideoEmbed ? " home-hero-cover--video" : ""
              }`}
            >
              {release.heroVideoEmbed ? (
                <iframe
                  src={normalizeEmbedUrl(release.heroVideoEmbed) || release.heroVideoEmbed}
                  title={`${release.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <SimpleImage
                  image={release.coverImage}
                  alt={`${release.title} cover`}
                />
              )}
            </div>
            {release.description ? (
              <p style={{ maxWidth: 540 }}>{release.description}</p>
            ) : null}
            <PlatformLinks links={release.platformLinks} />
          </div>
        </section>

        {/* Upcoming Tour */}
        {tour && tour.isUpcoming !== false ? (
          <section className="bevel-box upcoming-tour">
            <h2 className="section-title">Upcoming Shows</h2>
            <div className="tour-banner">
              {tour.withBands?.length ? (
                <div className="tour-bands">{tour.withBands.join(" · ")}</div>
              ) : null}
              <div className="tour-title">{tour.title}</div>
            </div>
            <div className="tour-body">
              {tour.posterImage ? (
                <div className="tour-poster">
                  <SimpleImage
                    image={tour.posterImage}
                    alt={`${tour.title} poster`}
                  />
                </div>
              ) : null}
              <div className="tour-details">
                {tour.description ? <p>{tour.description}</p> : null}
                <ul className="tour-dates">
                  {tour.dates?.map((d) => (
                    <li key={`${d.date}-${d.city}`} className="tour-date-row">
                      <span className="tour-date-when">
                        {formatTourDate(d.date)}
                      </span>
                      <span className="tour-date-dots" aria-hidden>
                        ........................
                      </span>
                      <span className="tour-date-where">
                        {d.city}
                        {d.venue ? ` — ${d.venue}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {/* Recent Shows */}
        <section className="bevel-box">
          <h2 className="section-title">Recent Shows</h2>
          <div className="shows-list">
            {shows.map((show) => (
              <article key={show._id} className="show-grid">
                <div className="show-details">
                  <h3 style={{ fontSize: "1em", marginBottom: 6 }}>{show.title}</h3>
                  <ul className="show-meta">
                    <li>Date: {formatDate(show.date)}</li>
                    <li>Location: {show.location || "location TBA"}</li>
                    <li>Set time: {show.setTime || "TBD"}</li>
                  </ul>
                  {show.description ? <p>{show.description}</p> : null}
                  {show.photoGalleryLink ? (
                    <a href={show.photoGalleryLink}>View photos from this show</a>
                  ) : (
                    <Link href="/gallery">View photos from this show</Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Studio / Media Progress */}
        <section className="bevel-box">
          <h2 className="section-title">Studio / Media Progress</h2>
          <p>
            Little proof-of-life photos from practices, recordings, flyers,
            half-finished ideas, and things taped to walls.
          </p>
          <ImageCarousel images={data.mediaImages} />
          <p style={{ marginTop: 10 }}>
            <Link href="/gallery">View All Studio Photos</Link>
          </p>
        </section>

        {/* Recent Blog Posts */}
        <section className="bevel-box">
          <h2 className="section-title">Recent Blog Posts</h2>
          <ul className="recent-posts-list">
            {recentPosts.map((post) => (
              <li key={post._id} className="recent-post-item">
                {post.slug ? (
                  <Link href={`/blog/${post.slug}`} className="recent-post-link">
                    {post.title}
                  </Link>
                ) : (
                  <span className="recent-post-link">{post.title}</span>
                )}
                <div className="recent-post-date">{formatDate(post.date)}</div>
                {post.excerpt ? (
                  <p className="recent-post-excerpt">{post.excerpt}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="recent-posts-more">
            <Link href="/blog">View all posts →</Link>
          </p>
        </section>
      </main>

      {/* Sidebar */}
      <aside className="bevel-box" id="sketch-sidebar">
        <h3 className="section-title">Sketches / Lyrics</h3>
        <div>
          {sketches.map((item) => (
            <article key={item._id} className="sketch-item">
              <div className="sketch-title">
                {!item.text && item.sourceUrl ? (
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </div>
              <div className="sketch-date">{formatDate(item.date)}</div>
              {item.text ? (
                <p className="sketch-text">{shortText(item.text, 220)}</p>
              ) : item.sourceUrl ? (
                <p className="sketch-text sketch-text--placeholder">
                  Read on{" "}
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                    {item.sourceName || "source"}
                  </a>
                  .
                </p>
              ) : null}
              {item.text && (item.sourceName || item.sourceUrl) ? (
                <p className="sketch-attribution">
                  Lyrics via{" "}
                  {item.sourceUrl ? (
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      {item.sourceName || "source"}
                    </a>
                  ) : (
                    item.sourceName
                  )}
                </p>
              ) : null}
              {item.image ? (
                <div className="sidebar-photo" style={{ marginTop: 8 }}>
                  <SimpleImage image={item.image} alt={item.title} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
        <div className="sidebar-actions">
          <Link href="/lyrics" className="btn">
            View All
          </Link>
        </div>
        <p
          id="guestbook"
          style={{ fontSize: 10, color: "#666", marginTop: 14, textAlign: "center" }}
        >
          Leave a note in the guestbook when it is wired up in Site Settings.
        </p>
      </aside>
    </div>
  );
}
