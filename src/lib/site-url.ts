export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdropmineralwater.com";
}

/** True when building for GitHub Pages project site (subpath deployment). */
export function isGithubPagesBuild(): boolean {
  return process.env.GITHUB_PAGES === "true";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
