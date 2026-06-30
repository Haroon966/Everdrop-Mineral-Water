import { AnimateOnScroll } from "@/components/animations";
import { HomeCtaBand } from "@/components/home/home-cta-band";
import { ServicesGrid } from "@/components/services/services-grid";
import { WhyChooseList } from "@/components/services/why-choose-list";
import { JsonLd } from "@/components/seo/json-ld";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { getPageKeywords, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Home water delivery, office supply, bulk orders, bottle exchange, and quality-assured mineral water across Islamabad and Rawalpindi. Everdrop — order on WhatsApp.",
  path: "/services/",
  keywords: getPageKeywords("/services/"),
});

export default function ServicesPage() {
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Services", url: absoluteUrl("/services/") },
          ]),
        ]}
      />

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <PageBreadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Services" },
              ]}
            />
            <SectionHeading
              eyebrow="Our Services"
              title="Water Delivery for Every Need"
              description="From homes and offices to restaurants and events — Everdrop delivers pure mineral water with flexible plans and reliable service."
            />
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Based in F11/1 Islamabad, we serve homes and businesses across Islamabad and
              Rawalpindi with 19L dispenser bottles, accessories, and dedicated customer
              support. Choose a plan that fits your schedule and we handle the rest.
            </p>
            <div className="mt-8">
              <ButtonLink
                href={site.social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="whatsapp-btn cursor-pointer"
              >
                <WhatsAppIcon data-icon="inline-start" />
                Order on WhatsApp
              </ButtonLink>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="section-shell-wide">
          <AnimateOnScroll>
            <SectionHeading
              title="What We Offer"
              description="Six core services designed for homes, offices, and commercial customers."
            />
          </AnimateOnScroll>
          <ServicesGrid services={site.services} variant="full" />
        </div>
      </section>

      <section className="section-pad water-gradient">
        <div className="section-shell-wide">
          <AnimateOnScroll>
            <SectionHeading title="Why Choose Everdrop?" />
          </AnimateOnScroll>
          <WhyChooseList items={site.whyChoose} />
        </div>
      </section>

      <HomeCtaBand />
    </>
  );
}
