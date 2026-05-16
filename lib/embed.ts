/**
 * Normalize a user-pasted video URL into something iframe-embeddable.
 *
 * Handles common copy-paste forms for YouTube and Vimeo:
 *   - https://youtu.be/VIDEO_ID[?si=...&t=10s]
 *   - https://www.youtube.com/watch?v=VIDEO_ID[&t=10s]
 *   - https://www.youtube.com/shorts/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID    (passes through unchanged)
 *   - https://vimeo.com/VIDEO_ID
 *   - https://player.vimeo.com/video/VIDEO_ID  (passes through unchanged)
 *
 * Anything else is returned as-is so we don't break unknown providers.
 */
export function normalizeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return url;
  }

  const host = u.hostname.replace(/^www\./, "");
  const startSecs = parseStartSeconds(u.searchParams.get("t"));

  // youtu.be/VIDEO_ID
  if (host === "youtu.be") {
    const id = u.pathname.replace(/^\//, "").split("/")[0];
    if (!id) return url;
    return buildYouTubeEmbed(id, startSecs);
  }

  // youtube.com/watch?v=VIDEO_ID, /shorts/VIDEO_ID, /embed/VIDEO_ID
  if (host === "youtube.com" || host === "m.youtube.com") {
    if (u.pathname.startsWith("/embed/")) {
      return url; // already correct
    }
    if (u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/")[2];
      return id ? buildYouTubeEmbed(id, startSecs) : url;
    }
    if (u.pathname === "/watch") {
      const id = u.searchParams.get("v");
      return id ? buildYouTubeEmbed(id, startSecs) : url;
    }
  }

  // vimeo.com/VIDEO_ID
  if (host === "vimeo.com") {
    const id = u.pathname.replace(/^\//, "").split("/")[0];
    if (!id) return url;
    return `https://player.vimeo.com/video/${id}`;
  }

  // player.vimeo.com — already correct
  if (host === "player.vimeo.com") return url;

  return url;
}

function buildYouTubeEmbed(id: string, startSecs: number | null) {
  const base = `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
  return startSecs && startSecs > 0 ? `${base}?start=${startSecs}` : base;
}

function parseStartSeconds(value: string | null): number | null {
  if (!value) return null;
  // Accept "90", "1m30s", "1h2m3s"
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  const match = value.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!match) return null;
  const [, h, m, s] = match;
  const total =
    (parseInt(h || "0", 10) || 0) * 3600 +
    (parseInt(m || "0", 10) || 0) * 60 +
    (parseInt(s || "0", 10) || 0);
  return total > 0 ? total : null;
}
