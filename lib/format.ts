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

export function shortText(text?: string, max = 150) {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}
