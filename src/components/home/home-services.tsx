import { AnimateOnScroll, BatchReveal } from "@/components/animations";
import { ServicesGrid } from "@/components/services/services-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Truck } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

interface HomeServicesProps {
  site: SiteConfig;
}

export function HomeServices({ site }: HomeServicesProps) {
  return (
    <section className="section-pad relative overflow-hidden water-gradient">
      <div
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[#00b4d8]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-[#0077b6]/10 blur-3xl"
        aria-hidden
      />

      <div className="section-shell-wide relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="Our Services"
              title="Water Delivery for Every Need"
              description="From homes to offices and events — reliable mineral water delivery across Islamabad and Rawalpindi."
            />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <BatchReveal className="flex flex-wrap gap-3 lg:justify-end">
              {site.trustStats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="services-stat-pill batch-item">
                  <span className="services-stat-pill__value">{stat.value}</span>
                  <span className="services-stat-pill__label">{stat.label}</span>
                </div>
              ))}
            </BatchReveal>
          </AnimateOnScroll>
        </div>

        <ServicesGrid services={site.services} variant="summary" layout="bento" />

        <AnimateOnScroll className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/services/" size="lg" className="cursor-pointer">
            View All Services
          </ButtonLink>
          <p className="inline-flex items-center gap-2 text-sm text-[#035a8a]/80 dark:text-[#90e0ef]/85">
            <Truck className="size-4 shrink-0 text-[#00b4d8]" aria-hidden />
            Doorstep delivery across Islamabad &amp; Rawalpindi
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
