import { PlatformLinks } from "@/components/platform-links";
import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatDate } from "@/lib/format";
import { getReleases } from "@/lib/sanity";
import type { Release } from "@/lib/types";

const fallbackReleases: Release[] = [
  {
    _id: "fallback-listen",
    title: "First release TBA",
    description: "Add releases in Sanity and they will show up here automatically.",
    releaseDate: "2026-05-05"
  }
];

export default async function ListenPage() {
  const releases = ((await getReleases()) as Release[] | null) || fallbackReleases;

  return (
    <div className="main-layout">
      <main>
        <Section title="Listen">
          <div className="albums-grid">
            {releases.map((release) => (
              <article key={release._id} className="album-card">
                <SimpleImage
                  image={release.coverImage}
                  alt={`${release.title} cover`}
                />
                <div className="album-title">{release.title}</div>
                <div className="album-meta">{formatDate(release.releaseDate)}</div>
                {release.description ? (
                  <p style={{ fontSize: 11, marginTop: 6 }}>{release.description}</p>
                ) : null}
                <PlatformLinks links={release.platformLinks} />
              </article>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
