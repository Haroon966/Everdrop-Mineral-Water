import { HomeCtaBand } from "@/components/home/home-cta-band";
import { HomeFeatureBar } from "@/components/home/home-feature-bar";
import { HomeHero } from "@/components/home/home-hero";
import { HomeLocation } from "@/components/home/home-location";
import { HomeProductRange } from "@/components/home/home-product-range";
import { HomeHowToOrder } from "@/components/home/home-how-to-order";
import { HomeServices } from "@/components/home/home-services";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { HomeTestimonials } from "@/components/home/home-testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageKeywords, getProducts, getSiteConfig, getTestimonials } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { localBusinessSchema, organizationSchema, itemListSchema, websiteSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Premium Mineral Water Delivery",
  description:
    "Everdrop Pure Mineral Water — fast doorstep delivery of 19L mineral water bottles in Islamabad & Rawalpindi. Order on WhatsApp: 0300-6096599.",
  path: "/",
  keywords: getPageKeywords("/"),
});

export default function HomePage() {
  const site = getSiteConfig();
  const products = getProducts();
  const testimonials = getTestimonials();

  return (
    <>
      <JsonLd
        data={[localBusinessSchema(), organizationSchema(), websiteSchema(), itemListSchema()]}
      />

      <HomeHero />

      <HomeFeatureBar />

      <HomeProductRange products={products} className="!pt-20 md:!pt-24 lg:!pt-28" />

      <HomeServices site={site} />

      <HomeHowToOrder />

      <HomeWhyChoose site={site} />

      <HomeTestimonials testimonials={testimonials} />

      <HomeCtaBand />

      <HomeLocation site={site} />
    </>
  );
}
