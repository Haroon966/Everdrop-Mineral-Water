import siteData from "../../data/site.json";
import productsData from "../../data/products.json";
import deliveryAreasData from "../../data/delivery-areas.json";
import testimonialsData from "../../data/testimonials.json";
import galleryData from "../../data/gallery.json";
import navigationData from "../../data/navigation.json";
import seoKeywordsData from "../../data/seo-keywords.json";
import type {
  DeliveryRegion,
  GalleryImage,
  Navigation,
  Product,
  SiteConfig,
  Testimonial,
} from "./types";

export { getAllDeliveryAreas, getDeliveryAreaBySlug } from "./areas";

export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getProducts(): Product[] {
  return productsData.products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getDeliveryAreas(): { regions: DeliveryRegion[] } {
  return deliveryAreasData as { regions: DeliveryRegion[] };
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.testimonials as Testimonial[];
}

export function getGalleryImages(): GalleryImage[] {
  return galleryData.images as GalleryImage[];
}

export function getNavigation(): Navigation {
  return navigationData as Navigation;
}

export function getPageKeywords(path: string): string[] | undefined {
  const pages = seoKeywordsData.pages as Record<string, { keywords: string[] }>;
  return pages[path]?.keywords;
}
