"use client";

import Link from "next/link";
import { AreaPageTracker } from "@/components/analytics/area-page-tracker";
import { AnimateOnScroll } from "@/components/animations";
import { MapEmbed } from "@/components/map-embed";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Star, MapPin } from "lucide-react";
import { getSiteConfig } from "@/lib/content";
import {
  buildAreaIntro,
  buildAreaWhatsAppMessage,
  getAreaFaqs,
  getTestimonialsForArea,
} from "@/lib/areas";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { DeliveryAreaRecord } from "@/lib/types";

interface DeliveryAreaTemplateProps {
  area: DeliveryAreaRecord;
}

export function DeliveryAreaTemplate({ area }: DeliveryAreaTemplateProps) {
  const site = getSiteConfig();
  const faqs = getAreaFaqs(area);
  const testimonials = getTestimonialsForArea(area);
  const whatsappUrl = buildWhatsAppUrl(buildAreaWhatsAppMessage(area));

  return (
    <>
      <AreaPageTracker areaSlug={area.slug} areaName={area.name} />

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <PageBreadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Delivery", href: "/delivery/" },
                { name: area.name },
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {area.region} · {area.groupLabel}
            </p>
            <h1 className="mt-3 text-balance font-heading text-3xl font-bold text-[#03045e] md:text-4xl dark:text-white">
              19L &amp; Mineral Water Delivery in {area.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {buildAreaIntro(area)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="whatsapp-btn w-full cursor-pointer sm:w-auto"
              >
                <WhatsAppIcon data-icon="inline-start" />
                Order for {area.name}
              </ButtonLink>
              <ButtonLink href="/products/19l/" size="lg" variant="outline" className="w-full cursor-pointer sm:w-auto">
                View 19L Pricing
              </ButtonLink>
              <ButtonLink href="/delivery/" size="lg" variant="outline" className="w-full cursor-pointer sm:w-auto">
                All Delivery Areas
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Also available:{" "}
              <Link href="/products/" className="font-medium text-primary hover:underline cursor-pointer">
                dispenser accessories
              </Link>
              {" · "}
              <Link href="/office-water-delivery/" className="font-medium text-primary hover:underline cursor-pointer">
                office delivery
              </Link>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="Coverage"
              title={`Delivery in ${area.name}, ${area.region}`}
              description="Premium 19L mineral water bottles delivered to your doorstep."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                {area.name}
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-sm">
                {area.groupLabel}
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-sm">
                24hr delivery
              </Badge>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="water-gradient py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <AnimateOnScroll>
              <SectionHeading
                eyebrow="Reviews"
                title={`What ${area.region} Customers Say`}
                description={`Verified reviews from customers in and near ${area.name}.`}
              />
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {testimonials.slice(0, 4).map((item) => (
                  <article key={`${item.name}-${item.area}`} className="glass-card rounded-2xl p-6">
                    <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-[#00b4d8] text-[#00b4d8]" aria-hidden />
                      ))}
                    </div>
                    <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <p className="mt-4 font-semibold">{item.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" aria-hidden />
                      {item.area}
                    </p>
                  </article>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <section id="faq" className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading title={`${area.name} Delivery FAQ`} />
            <div className="mt-10 flex flex-col gap-6">
              {faqs.map((item) => (
                <div key={item.question} className="glass-card rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold">{item.question}</h2>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading title="Service Area Map" description={`Everdrop is based at ${site.contact.address.full}.`} />
            <div className="mt-8">
              <MapEmbed />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
