import type { MetadataRoute } from "next";
import { getAllDeliveryAreas } from "@/lib/areas";
import { getProducts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "about/", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "services/", priority: 0.85, changeFrequency: "weekly" as const },
    { route: "products/", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "delivery/", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "delivery/areas/", priority: 0.85, changeFrequency: "weekly" as const },
    { route: "contact/", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "testimonials/", priority: 0.75, changeFrequency: "weekly" as const },
    { route: "office-water-delivery/", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const products = getProducts();
  const areas = getAllDeliveryAreas();
  const lastModified = new Date();

  return [
    ...staticRoutes.map(({ route, priority, changeFrequency }) => ({
      url: absoluteUrl(`/${route}`),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...areas.map((area) => ({
      url: absoluteUrl(`/delivery/${area.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
