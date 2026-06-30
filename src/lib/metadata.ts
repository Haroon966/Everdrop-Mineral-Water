import type { Metadata } from "next";
import { getSiteConfig } from "./content";
import { absoluteUrl, getSiteUrl } from "./site-url";

export function createMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const site = getSiteConfig();
  const pageTitle = title
    ? `${title} | ${site.brand.shortName}`
    : site.seo.defaultTitle;
  const pageDescription = description ?? site.seo.defaultDescription;
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/og/default.jpg");

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords ?? site.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: site.brand.name,
      locale: "en_PK",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

export function getRootMetadata(): Metadata {
  const base = createMetadata({});

  return {
    metadataBase: new URL(getSiteUrl()),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    ...base,
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
      : {}),
  };
}
