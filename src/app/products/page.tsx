import { AnimateOnScroll, BatchReveal } from "@/components/animations";
import { HomeCtaBand } from "@/components/home/home-cta-band";
import { ProductCard } from "@/components/products/product-card";
import { ProductsComparison } from "@/components/products/products-comparison";
import { ProductsFaq } from "@/components/products/products-faq";
import { ProductsHero } from "@/components/products/products-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { getPageKeywords, getProducts, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema, itemListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "Products & Pricing",
  description:
    "Order Everdrop 19L mineral water and dispenser accessories with pricing. Fast delivery in Islamabad & Rawalpindi. Order on WhatsApp.",
  path: "/products/",
  keywords: getPageKeywords("/products/"),
});

export default function ProductsPage() {
  const site = getSiteConfig();
  const products = getProducts();
  const featured = products.find((p) => p.popular);
  const rest = products.filter((p) => !p.popular);

  return (
    <>
      <JsonLd
        data={[
          itemListSchema(),
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Products", url: absoluteUrl("/products/") },
          ]),
          faqPageSchema(site.deliveryFaq),
        ]}
      />

      <ProductsHero site={site} />

      <section className="section-pad bg-background">
        <div className="section-shell-wide">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="Our Range"
              title="19L Water & Accessories"
              description="Transparent PKR pricing on 19L bottles and dispenser accessories. Order on WhatsApp for fast doorstep delivery in Islamabad and Rawalpindi."
            />
          </AnimateOnScroll>

          <BatchReveal className="mt-10 flex flex-col gap-6">
            {featured && (
              <ProductCard product={featured} featured />
            )}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {rest.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </BatchReveal>
        </div>
      </section>

      <ProductsComparison products={products} />

      <ProductsFaq site={site} />

      <HomeCtaBand />
    </>
  );
}
