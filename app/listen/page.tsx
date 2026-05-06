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
    <main>
      <Section title="Listen">
        <div className="space-y-8">
          {releases.map((release) => (
            <article key={release._id} className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <SimpleImage image={release.coverImage} alt={`${release.title} cover`} />
              <div>
                <h2 className="mt-0 text-xl font-normal">{release.title}</h2>
                <p className="text-sm text-faded">{formatDate(release.releaseDate)}</p>
                {release.description ? <p>{release.description}</p> : null}
                <PlatformLinks links={release.platformLinks} />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
