export default function parseNumFromString(str?: string): number | null {
  if (!str) {
    return null;
  }

  const parsed = Number(str);

  return Number.isNaN(parsed) ? null : parsed;
}
