import type { SocialLink } from "@/lib/types";

const fallbackLinks: SocialLink[] = [
  { platform: "Instagram", url: "https://instagram.com/" },
  { platform: "YouTube", url: "https://youtube.com/" },
  { platform: "Bandcamp", url: "https://bandcamp.com/" }
];

export function SocialLinks({ links }: { links?: SocialLink[] }) {
  const safeLinks = links?.length ? links : fallbackLinks;

  return (
    <ul className="social-links" aria-label="Social links">
      {safeLinks.map((link) => (
        <li key={`${link.platform}-${link.url}`}>
          <a href={link.url}>{link.platform}</a>
        </li>
      ))}
    </ul>
  );
}
