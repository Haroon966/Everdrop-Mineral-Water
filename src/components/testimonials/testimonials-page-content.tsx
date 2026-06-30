"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { AnimateOnScroll } from "@/components/animations";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import type { Testimonial } from "@/lib/types";

interface TestimonialsPageContentProps {
  testimonials: Testimonial[];
}

export function TestimonialsPageContent({ testimonials }: TestimonialsPageContentProps) {
  const areas = useMemo(
    () => ["All", ...new Set(testimonials.map((item) => item.area))].sort(),
    [testimonials]
  );
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? testimonials
      : testimonials.filter((item) => item.area === filter);

  return (
    <>
      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <PageBreadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Testimonials" },
              ]}
            />
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by Families & Offices"
              description="47+ verified customer reviews from across Islamabad and Rawalpindi."
            />
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-[#00b4d8] text-[#00b4d8]" />
                ))}
              </div>
              <p className="font-heading text-2xl font-bold">5.0 average rating</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter reviews by area">
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                role="tab"
                aria-selected={filter === area}
                onClick={() => setFilter(area)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  filter === area
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={`${item.name}-${item.area}`} className="glass-card rounded-2xl p-6">
                <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#00b4d8] text-[#00b4d8]" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="mt-4 flex items-center gap-1.5 font-semibold">
                  {item.name}
                  <BadgeCheck className="size-4 text-[#128c7e]" aria-label="Verified customer" />
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden />
                  {item.area}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
