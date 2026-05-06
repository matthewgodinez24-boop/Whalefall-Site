import { Section } from "@/components/section";
import { getVideos } from "@/lib/sanity";
import type { Video } from "@/lib/types";

const fallbackVideos: Video[] = [
  {
    _id: "fallback-video",
    title: "Practice clip TBA",
    description: "Paste YouTube, Vimeo, or other embeddable links into Sanity to fill this page."
  }
];

export default async function VideosPage() {
  const videos = ((await getVideos()) as Video[] | null) || fallbackVideos;

  return (
    <main>
      <Section title="Videos">
        <div className="space-y-8">
          {videos.map((video) => (
            <article key={video._id}>
              <h2 className="text-xl font-normal">{video.title}</h2>
              {video.embedLink ? (
                <div className="aspect-video border border-line bg-white">
                  <iframe
                    className="h-full w-full"
                    src={video.embedLink}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : null}
              {video.description ? <p>{video.description}</p> : null}
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
