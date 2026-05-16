import type { PlatformLink } from "@/lib/types";

export function PlatformLinks({ links }: { links?: PlatformLink[] }) {
  if (!links?.length) return null;

  return (
    <ul className="platform-links">
      {links.map((link) => (
        <li key={`${link.platform}-${link.url}`}>
          <a href={link.url} className="btn">
            {link.platform}
          </a>
        </li>
      ))}
    </ul>
  );
}
