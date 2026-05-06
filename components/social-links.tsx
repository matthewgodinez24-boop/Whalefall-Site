import type { SocialLink } from "@/lib/types";

const fallbackLinks: SocialLink[] = [
  { platform: "Instagram", url: "https://instagram.com/" },
  { platform: "YouTube", url: "https://youtube.com/" },
  { platform: "Bandcamp", url: "https://bandcamp.com/" }
];

export function SocialLinks({ links }: { links?: SocialLink[] }) {
  const safeLinks = links?.length ? links : fallbackLinks;

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 p-0 text-sm" aria-label="Social links">
      {safeLinks.map((link) => (
        <li key={`${link.platform}-${link.url}`} className="list-none">
          <a href={link.url}>{link.platform}</a>
        </li>
      ))}
    </ul>
  );
}
