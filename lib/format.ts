export function formatDate(date?: string) {
  if (!date) return "date TBA";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(parsed);
}

export function formatTourDate(date?: string) {
  if (!date) return "TBD";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  const month = parsed.getUTCMonth() + 1;
  const day = parsed.getUTCDate();
  return `${month}/${day}`;
}

export function formatPrice(dollars?: number) {
  if (typeof dollars !== "number" || Number.isNaN(dollars)) return "";
  const cents = Math.round(dollars * 100);
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
}

export function shortText(text?: string, max = 150) {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}
