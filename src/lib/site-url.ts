export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdropmineralwater.com";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
