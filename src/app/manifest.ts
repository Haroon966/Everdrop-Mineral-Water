import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/base-path";
import { getSiteConfig } from "@/lib/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const site = getSiteConfig();

  return {
    name: site.brand.name,
    short_name: site.brand.shortName,
    description: site.brand.description,
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#EFF6FF",
    theme_color: "#2563EB",
    icons: [
      {
        src: withBasePath("/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: withBasePath("/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
