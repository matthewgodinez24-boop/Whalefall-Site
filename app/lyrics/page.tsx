import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatDate } from "@/lib/format";
import { getSketchesLyrics } from "@/lib/sanity";
import type { SketchLyric } from "@/lib/types";

const fallback: SketchLyric[] = [
  {
    _id: "fallback-sketch",
    title: "Untitled chorus scrap",
    date: "2026-05-05",
    text: "half a line about weather / half a line about leaving it alone"
  }
];

export default async function LyricsPage() {
  const items =
    ((await getSketchesLyrics()) as SketchLyric[] | null) || fallback;

  return (
    <div className="main-layout">
      <main>
        <Section title="Sketches / Lyrics">
          <p style={{ marginBottom: 12, fontSize: 11, color: "#555" }}>
            Lyrics, half-finished verses, and small written things — newest first.
          </p>
          {items.length === 0 ? (
            <p style={{ fontSize: 11, color: "#666" }}>
              Nothing here yet. Add entries in the Studio under
              <em> Sketches / Lyrics</em>.
            </p>
          ) : (
            <div className="lyrics-list">
              {items.map((item) => (
                <article key={item._id} className="lyric-entry">
                  <header className="lyric-entry-header">
                    <h3 className="lyric-entry-title">{item.title}</h3>
                    {item.date ? (
                      <time className="lyric-entry-date">
                        {formatDate(item.date)}
                      </time>
                    ) : null}
                  </header>
                  {item.text ? (
                    <pre className="lyric-entry-text">{item.text}</pre>
                  ) : item.sourceUrl ? (
                    <p className="lyric-entry-empty">
                      Read on{" "}
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                        {item.sourceName || "source"}
                      </a>
                      .
                    </p>
                  ) : (
                    <p className="lyric-entry-empty">No text yet.</p>
                  )}
                  {item.image ? (
                    <div className="lyric-entry-image">
                      <SimpleImage image={item.image} alt={item.title} />
                    </div>
                  ) : null}
                  {item.text && (item.sourceName || item.sourceUrl) ? (
                    <p className="lyric-entry-attribution">
                      Lyrics via{" "}
                      {item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.sourceName || "source"}
                        </a>
                      ) : (
                        item.sourceName
                      )}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}
