import { AnimateOnScroll, BatchReveal } from "@/components/animations";
import { AreaBadgeLink, getAreaRecord } from "@/components/delivery/area-badge-link";
import { MapEmbed } from "@/components/map-embed";
import { JsonLd } from "@/components/seo/json-ld";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { getDeliveryAreas, getPageKeywords, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "Delivery Areas",
  description:
    "19L water bottle delivery Islamabad & water delivery Rawalpindi. Everdrop delivers to F-sectors, G-sectors, Bahria Town, DHA, and more.",
  path: "/delivery/",
  keywords: getPageKeywords("/delivery/"),
});

export default function DeliveryPage() {
  const { regions } = getDeliveryAreas();
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Delivery", url: absoluteUrl("/delivery/") },
          ]),
          faqPageSchema(site.deliveryFaq),
        ]}
      />

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <PageBreadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Delivery" },
              ]}
            />
            <SectionHeading
              eyebrow="Delivery"
              title="Fast Doorstep Delivery"
              description="We deliver premium mineral water across Islamabad and Rawalpindi. Order on WhatsApp for same-day or next-day delivery."
            />
            <div className="mt-6">
              <ButtonLink href="/delivery/areas/" variant="outline" className="cursor-pointer">
                Browse all delivery areas
              </ButtonLink>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {regions.map((region) => (
            <div key={region.name} className="mb-16 last:mb-0">
              <AnimateOnScroll>
                <h2 className="font-heading text-2xl font-semibold">{region.name}</h2>
                <p className="mt-2 text-muted-foreground">{region.description}</p>
              </AnimateOnScroll>
              <BatchReveal className="mt-8 flex flex-col gap-8">
                {region.groups.map((group) => (
                  <div key={group.label} className="batch-item">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                      {group.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.areas.map((areaName) => {
                        const area = getAreaRecord(areaName, region.name);
                        return area ? (
                          <AreaBadgeLink key={area.slug} area={area} />
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </BatchReveal>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="water-gradient py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading title="Delivery FAQ" description="Common questions about ordering and delivery." />
            <div className="mt-12 flex flex-col gap-6">
              {site.deliveryFaq.map((item) => (
                <div key={item.question} className="glass-card rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold">{item.question}</h2>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading title="Find Us" description={`Everdrop is based at ${site.contact.address.full}.`} />
            <div className="mt-8">
              <MapEmbed />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
