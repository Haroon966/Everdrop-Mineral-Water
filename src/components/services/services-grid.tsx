import {
  ArrowRight,
  Building2,
  Headphones,
  Home,
  Package,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { BatchReveal } from "@/components/animations";
import type { SiteConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, LucideIcon> = {
  "home-delivery": Home,
  "office-corporate": Building2,
  "bulk-supply": Package,
  "bottle-exchange": RefreshCw,
  "quality-assurance": ShieldCheck,
  "customer-support": Headphones,
};

const serviceLinks: Partial<Record<string, string>> = {
  "office-corporate": "/office-water-delivery/",
};

const bentoSpans: Record<string, string> = {
  "home-delivery": "sm:col-span-2 lg:col-span-5 lg:row-span-2",
  "office-corporate": "lg:col-span-7",
  "bulk-supply": "lg:col-span-4",
  "bottle-exchange": "lg:col-span-4",
  "quality-assurance": "lg:col-span-4",
  "customer-support": "sm:col-span-2 lg:col-span-12",
};

type Service = SiteConfig["services"][number];

interface ServicesGridProps {
  services: SiteConfig["services"];
  variant: "summary" | "full";
  layout?: "grid" | "bento";
}

function ServiceCardContent({
  service,
  variant,
  layout,
  index,
}: {
  service: Service;
  variant: "summary" | "full";
  layout: "grid" | "bento";
  index: number;
}) {
  const Icon = serviceIcons[service.id] ?? Home;
  const isBento = layout === "bento";
  const isFeatured = service.id === "home-delivery";
  const isWide = service.id === "customer-support";

  return (
    <>
      <div
        className={cn(
          "services-bento-card__glow",
          isBento && `services-bento-card__glow--${service.id}`
        )}
        aria-hidden
      />
      <div
        className={cn(
          "relative z-[1] flex h-full flex-col",
          isWide && isBento && "lg:flex-row lg:items-center lg:gap-8"
        )}
      >
        <div className={cn(isWide && isBento && "lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:gap-6")}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {isBento && (
                <span className="services-bento-card__index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span
                className={cn(
                  "services-bento-card__icon",
                  isFeatured && isBento && "services-bento-card__icon--featured"
                )}
              >
                <Icon className={cn("size-5", isFeatured && isBento && "size-6")} aria-hidden />
              </span>
            </div>
            {isBento && (
              <ArrowRight
                className="services-bento-card__arrow size-4 shrink-0 text-[#0077b6]/50 dark:text-[#00b4d8]/50"
                aria-hidden
              />
            )}
          </div>

          <div className={cn("mt-4", isWide && isBento && "mt-0 lg:mt-0")}>
            <h3
              className={cn(
                "services-bento-card__title",
                isFeatured && isBento && "services-bento-card__title--featured"
              )}
            >
              {service.title}
            </h3>
            {variant === "summary" && (
              <p className="services-bento-card__summary">{service.summary}</p>
            )}
            {variant === "full" && (
              <ul className="mt-4 space-y-2">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="services-bento-card__bullet">
                    <span className="services-bento-card__bullet-dot" aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {isFeatured && isBento && variant === "summary" && (
          <div className="services-bento-card__chips mt-auto pt-5">
            <span className="services-bento-card__chip">24hr delivery</span>
            <span className="services-bento-card__chip">Islamabad &amp; Rawalpindi</span>
          </div>
        )}
      </div>
    </>
  );
}

function ServiceCard({
  service,
  variant,
  layout,
  index,
}: {
  service: Service;
  variant: "summary" | "full";
  layout: "grid" | "bento";
  index: number;
}) {
  const href = serviceLinks[service.id];
  const isBento = layout === "bento";
  const className = cn(
    "batch-item services-bento-card group",
    isBento && bentoSpans[service.id],
    isBento && `services-bento-card--${service.id}`,
    service.id === "home-delivery" && isBento && "services-bento-card--featured"
  );

  const content = (
    <ServiceCardContent service={service} variant={variant} layout={layout} index={index} />
  );

  if (href) {
    return (
      <Link href={href} className={cn(className, "cursor-pointer")}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

export function ServicesGrid({ services, variant, layout = "grid" }: ServicesGridProps) {
  const isBento = layout === "bento";

  return (
    <BatchReveal
      className={cn(
        "mt-10",
        isBento
          ? "services-bento-grid grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-5"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          variant={variant}
          layout={layout}
          index={index}
        />
      ))}
    </BatchReveal>
  );
}
