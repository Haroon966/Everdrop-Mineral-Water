/** GitHub repo name — project Pages URL is username.github.io/{repo}/ */
export const GITHUB_PAGES_REPO = "Everdrop-Mineral-Water";

export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES === "true" ? `/${GITHUB_PAGES_REPO}` : "");

/** Prefix root-relative public asset paths for GitHub Pages subpath deployment. */
export function withBasePath(path: string): string {
  if (!BASE_PATH || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
