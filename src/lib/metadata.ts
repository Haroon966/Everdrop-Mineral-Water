import type { Metadata } from "next";
import { getSiteConfig } from "./content";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
} from "./og-image";
import { absoluteUrl, getSiteUrl } from "./site-url";

export function createMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
  imageAlt,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
}): Metadata {
  const site = getSiteConfig();
  const pageTitle = title
    ? `${title} | ${site.brand.shortName}`
    : site.seo.defaultTitle;
  const pageDescription = description ?? site.seo.defaultDescription;
  const url = absoluteUrl(path);
  const ogImagePath = image ?? DEFAULT_OG_IMAGE;
  const ogImage = absoluteUrl(ogImagePath);
  const ogAlt = imageAlt ?? (image ? pageTitle : DEFAULT_OG_IMAGE_ALT);

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
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: ogAlt,
          type: ogImagePath.endsWith(".png") ? "image/png" : "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: ogAlt,
        },
      ],
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
