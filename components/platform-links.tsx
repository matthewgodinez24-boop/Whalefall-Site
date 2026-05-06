import type { PlatformLink } from "@/lib/types";

const fallbackPlatforms: PlatformLink[] = [
  { platform: "Bandcamp", url: "https://bandcamp.com/" },
  { platform: "Spotify", url: "https://spotify.com/" },
  { platform: "Apple Music", url: "https://music.apple.com/" },
  { platform: "SoundCloud", url: "https://soundcloud.com/" },
  { platform: "YouTube", url: "https://youtube.com/" }
];

export function PlatformLinks({ links }: { links?: PlatformLink[] }) {
  const safeLinks = links?.length ? links : fallbackPlatforms;

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 p-0 text-sm">
      {safeLinks.map((link) => (
        <li className="list-none" key={`${link.platform}-${link.url}`}>
          <a href={link.url}>{link.platform}</a>
        </li>
      ))}
    </ul>
  );
}
