import Link from "next/link";
import { AnimateOnScroll, BatchReveal } from "@/components/animations";
import { JsonLd } from "@/components/seo/json-ld";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { getAllDeliveryAreas } from "@/lib/areas";
import { getPageKeywords } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, areaListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "All Delivery Areas",
  description:
    "Browse all Everdrop water delivery areas in Islamabad and Rawalpindi — F-sectors, G-sectors, Bahria Town, DHA, Saddar, and more.",
  path: "/delivery/areas/",
  keywords: getPageKeywords("/delivery/areas/"),
});

export default function DeliveryAreasHubPage() {
  const areas = getAllDeliveryAreas();
  const regions = [...new Set(areas.map((area) => area.region))];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Delivery", url: absoluteUrl("/delivery/") },
            { name: "All Areas", url: absoluteUrl("/delivery/areas/") },
          ]),
          areaListSchema(),
        ]}
      />

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <PageBreadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Delivery", href: "/delivery/" },
                { name: "All Areas" },
              ]}
            />
            <SectionHeading
              eyebrow="Coverage"
              title="All Delivery Areas"
              description="Everdrop delivers premium mineral water across Islamabad and Rawalpindi. Select your area for local pricing, FAQs, and reviews."
            />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {regions.map((region) => (
            <div key={region} className="mb-16 last:mb-0">
              <AnimateOnScroll>
                <h2 className="font-heading text-2xl font-semibold">{region}</h2>
              </AnimateOnScroll>
              <BatchReveal className="mt-6 flex flex-wrap gap-2">
                {areas
                  .filter((area) => area.region === region)
                  .map((area) => (
                    <Link
                      key={area.slug}
                      href={`/delivery/${area.slug}/`}
                      className="batch-item inline-flex min-h-11 items-center rounded-full border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary cursor-pointer"
                    >
                      {area.name}
                    </Link>
                  ))}
              </BatchReveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
