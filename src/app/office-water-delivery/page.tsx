import { Check } from "lucide-react";
import { AnimateOnScroll } from "@/components/animations";
import { HomeCtaBand } from "@/components/home/home-cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { ProductsFaq } from "@/components/products/products-faq";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { getPageKeywords, getProducts, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "Office Water Delivery",
  description:
    "Scheduled 19L water delivery for offices, clinics, and co-working spaces in Islamabad and Rawalpindi. Everdrop — reliable dispenser bottles from PKR 650.",
  path: "/office-water-delivery/",
  keywords: getPageKeywords("/office-water-delivery/"),
});

const officeFeatures = [
  "Scheduled weekly or bi-weekly 19L delivery",
  "Dispenser-compatible bottles for all standard units",
  "Priority support for clinics, gyms, and co-working spaces",
  "Empty bottle exchange on every delivery",
  "Transparent PKR pricing with no hidden fees",
  "WhatsApp ordering — confirmed within minutes",
];

export default function OfficeWaterDeliveryPage() {
  const site = getSiteConfig();
  const products = getProducts();
  const product19l = products.find((p) => p.slug === "19l");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Office Delivery", url: absoluteUrl("/office-water-delivery/") },
          ]),
          faqPageSchema(site.deliveryFaq.slice(0, 8)),
        ]}
      />

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <PageBreadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Office Delivery" },
              ]}
            />
            <SectionHeading
              eyebrow="Office & Commercial"
              title="Office Water Dispenser Delivery"
              description="Keep your team hydrated with scheduled 19L mineral water delivery across Islamabad and Rawalpindi."
            />
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Everdrop supplies offices, clinics, gyms, and co-working spaces with reliable 19L
              dispenser bottles. Based in F11/1 Islamabad, we offer priority scheduling, empty
              bottle exchange, and responsive WhatsApp support — at PKR 650 per 19L bottle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={site.social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="whatsapp-btn w-full cursor-pointer sm:w-auto"
              >
                <WhatsAppIcon data-icon="inline-start" />
                Set Up Office Delivery
              </ButtonLink>
              {product19l && (
                <ButtonLink href={`/products/${product19l.slug}/`} size="lg" variant="outline" className="w-full cursor-pointer sm:w-auto">
                  View 19L Product
                </ButtonLink>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading title="Why Offices Choose Everdrop" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {officeFeatures.map((feature) => (
                <li key={feature} className="glass-card flex items-start gap-3 rounded-2xl p-5">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </section>

      <ProductsFaq site={site} />

      <HomeCtaBand />
    </>
  );
}
