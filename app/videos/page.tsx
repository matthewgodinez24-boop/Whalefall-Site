import { Section } from "@/components/section";
import { normalizeEmbedUrl } from "@/lib/embed";
import { getVideos } from "@/lib/sanity";
import type { Video } from "@/lib/types";

const fallbackVideos: Video[] = [
  {
    _id: "fallback-video",
    title: "Practice clip TBA",
    description:
      "Paste YouTube, Vimeo, or other embeddable links into Sanity to fill this page."
  }
];

export default async function VideosPage() {
  const videos = ((await getVideos()) as Video[] | null) || fallbackVideos;

  return (
    <div className="main-layout">
      <main>
        <Section title="Videos">
          <div className="video-grid">
            {videos.map((video) => {
              const embed = normalizeEmbedUrl(video.embedLink);
              return (
              <article key={video._id}>
                <div className="video-wrapper">
                  {embed ? (
                    <iframe
                      src={embed}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : null}
                </div>
                <div className="video-info">
                  <div className="video-title">{video.title}</div>
                  {video.description ? (
                    <div className="video-date">{video.description}</div>
                  ) : null}
                </div>
              </article>
              );
            })}
          </div>
        </Section>
      </main>
    </div>
  );
}
