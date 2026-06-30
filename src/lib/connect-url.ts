import { absoluteUrl } from "./site-url";

/** QR-only landing page — not linked in site navigation or sitemap. */
export const CONNECT_PAGE_PATH = "/connect/";

export function getConnectPageUrl(): string {
  return absoluteUrl(CONNECT_PAGE_PATH);
}
