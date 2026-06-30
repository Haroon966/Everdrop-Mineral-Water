import { getSiteConfig } from "./content";

export function getTelHref(): string {
  const site = getSiteConfig();
  return `tel:+${site.contact.phoneRaw}`;
}

export function getTelHrefLocal(): string {
  const site = getSiteConfig();
  const local = site.contact.phone.replace(/\D/g, "");
  return `tel:${local}`;
}
