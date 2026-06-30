import { notFound, redirect } from "next/navigation";
import { Check } from "lucide-react";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { AnimateOnScroll } from "@/components/animations";
import { JsonLd } from "@/components/seo/json-ld";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { getPageKeywords, getProductBySlug, getProducts, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema, productSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";
import { buildProductOrderUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const legacyProductRedirects: Record<string, string> = {
  accessories: "/products/",
};

export async function generateStaticParams() {
  return [
    ...getProducts().map((p) => ({ slug: p.slug })),
    ...Object.keys(legacyProductRedirects).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (slug in legacyProductRedirects) {
    return createMetadata({
      title: "Products & Pricing",
      description:
        "Order Everdrop 19L mineral water and dispenser accessories with pricing. Fast delivery in Islamabad & Rawalpindi. Order on WhatsApp.",
      path: "/products/",
      keywords: getPageKeywords("/products/"),
    });
  }
  const product = getProductBySlug(slug);
  if (!product) return {};

  return createMetadata({
    title: `${product.name} — Water Delivery Islamabad & Rawalpindi`,
    description: `${product.description} PKR ${product.price}. Fast doorstep delivery in Islamabad & Rawalpindi. Order on WhatsApp: 0300-6096599.`,
    path: `/products/${product.slug}/`,
    keywords: getPageKeywords(`/products/${product.slug}/`),
    image: product.image,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const legacyTarget = legacyProductRedirects[slug];
  if (legacyTarget) {
    redirect(legacyTarget);
  }

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const site = getSiteConfig();
  const whatsappUrl = buildProductOrderUrl(product);
  const productFaqs = product.faqs ?? site.deliveryFaq.slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Products", url: absoluteUrl("/products/") },
            { name: product.name, url: absoluteUrl(`/products/${product.slug}/`) },
          ]),
          faqPageSchema(productFaqs),
        ]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={product.image}
                  alt={`${product.name} — mineral water delivery Islamabad and Rawalpindi`}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority
                />
                {product.popular && (
                  <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">Most Popular</Badge>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {product.size}
                </p>
                <h1 className="mt-2 font-heading text-4xl font-bold">
                  {product.name} — Delivery in Islamabad &amp; Rawalpindi
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
                <p className="mt-6 font-heading text-4xl font-bold text-primary">
                  {product.currency} {product.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    {" "}
                    / {product.priceLabel ?? "bottle"}
                  </span>
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="size-5 text-primary" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" size="lg" className="whatsapp-btn cursor-pointer">
                    <WhatsAppIcon data-icon="inline-start" />
                    Order on WhatsApp
                  </ButtonLink>
                  <ButtonLink href="/delivery/" size="lg" variant="outline" className="cursor-pointer">
                    Delivery Areas
                  </ButtonLink>
                  <ButtonLink href="/contact/" size="lg" variant="outline" className="cursor-pointer">
                    Contact Us
                  </ButtonLink>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {product.gallery && product.gallery.length > 0 && (
        <section className="border-t border-border/60 py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <AnimateOnScroll>
              <h2 className="font-heading text-2xl font-semibold">Accessory Gallery</h2>
              <p className="mt-2 text-muted-foreground">
                Pumps, dispensers, and accessories for 19L bottles.
              </p>
              <div className="mt-8">
                <GalleryGrid images={product.gallery} />
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <h2 className="font-heading text-2xl font-semibold">Product FAQ</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {productFaqs.map((item) => (
                <div key={item.question} className="glass-card rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold">{item.question}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
