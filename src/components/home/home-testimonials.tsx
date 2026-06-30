"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors = [
  "from-[#0077b6] to-[#00b4d8]",
  "from-[#03045e] to-[#0077b6]",
  "from-[#00b4d8] to-[#90e0ef]",
  "from-[#023e8a] to-[#0077b6]",
];

const SIDE_VISIBLE = 3;

function getSideIndices(active: number, total: number, visible = SIDE_VISIBLE) {
  const indices: number[] = [];
  let i = (active + 1) % total;

  while (indices.length < Math.min(visible, total - 1)) {
    indices.push(i);
    i = (i + 1) % total;
  }

  return indices;
}

interface HomeTestimonialsProps {
  testimonials: Testimonial[];
}

export function HomeTestimonials({ testimonials }: HomeTestimonialsProps) {
  const [active, setActive] = useState(0);
  const count = testimonials.length;
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setActive((index + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(next, 8000);
    return () => window.clearInterval(timer);
  }, [next, prefersReducedMotion]);

  const featured = testimonials[active];
  const sideIndices = getSideIndices(active, count);

  return (
    <section
      className="testimonials-mosaic relative h-auto overflow-hidden py-16 max-lg:min-h-0 lg:h-[85vh] lg:py-0"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="testimonials-mosaic__bg absolute inset-0" aria-hidden />
      <div className="testimonials-mosaic__wave absolute inset-x-0 bottom-0 h-32" aria-hidden />

      <div className="relative z-10 flex h-full flex-col px-4 pb-5 pt-20 sm:px-6 lg:px-8 lg:pb-8 lg:pt-24">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col xl:max-w-[1400px]">
          {/* Header strip */}
          <header className="flex flex-col gap-6 border-b border-[#90e0ef]/50 pb-6 dark:border-[#00b4d8]/15 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0077b6] dark:text-[#00b4d8]">
                Testimonials
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-[#03045e] md:text-4xl dark:text-white">
                Trusted by Families & Offices
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 rounded-2xl border border-[#90e0ef]/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-[#00b4d8]/20 dark:bg-[#03045e]/70">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#00b4d8] text-[#00b4d8]" />
                  ))}
                </div>
                <span className="font-heading text-2xl font-bold text-[#03045e] dark:text-white">5.0</span>
              </div>
              <div className="rounded-2xl border border-[#90e0ef]/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-[#00b4d8]/20 dark:bg-[#03045e]/70">
                <p className="font-heading text-2xl font-bold text-[#0077b6] dark:text-[#00b4d8]">{count}+</p>
                <p className="text-xs font-medium text-[#035a8a]/75 dark:text-[#90e0ef]/75">Verified Reviews</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/testimonials/"
                className="text-sm font-semibold text-[#0077b6] transition-colors duration-200 hover:underline dark:text-[#00b4d8] cursor-pointer"
              >
                Read all {count}+ verified reviews →
              </Link>
            </div>
          </header>

          {/* Main mosaic */}
          <div className="mt-6 grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
            {/* Featured quote */}
            <article
              key={featured.name}
              className="testimonials-mosaic__featured relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] border border-[#90e0ef]/50 bg-white/90 p-6 shadow-lg shadow-[#0077b6]/8 backdrop-blur-md md:p-8 lg:min-h-0 dark:border-[#00b4d8]/20 dark:bg-[#03045e]/85"
            >
              <span
                className="pointer-events-none absolute -right-2 -top-4 font-heading text-[5rem] leading-none text-[#00b4d8]/10 md:text-[10rem] lg:text-[8rem]"
                aria-hidden
              >
                &ldquo;
              </span>

              <div className="relative flex items-start gap-4">
                <span
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white shadow-md",
                    avatarColors[active % avatarColors.length]
                  )}
                  aria-hidden
                >
                  {initials(featured.name)}
                </span>
                <div>
                  <div className="flex gap-1" aria-label={`${featured.rating} out of 5 stars`}>
                    {Array.from({ length: featured.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-[#00b4d8] text-[#00b4d8]" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-2 font-semibold text-[#03045e] dark:text-white">{featured.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-[#035a8a]/75 dark:text-[#90e0ef]/80">
                    <MapPin className="size-3.5 shrink-0 text-[#00b4d8]" aria-hidden />
                    {featured.area}
                  </p>
                </div>
              </div>

              <blockquote className="relative mt-6 font-heading text-xl font-medium italic leading-relaxed text-[#03045e]/90 md:text-2xl lg:text-[1.65rem] dark:text-white/95">
                {featured.quote}
              </blockquote>

              <div className="relative mt-6 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f7ee] px-3 py-1 text-xs font-semibold text-[#128c7e] dark:bg-[#25d366]/15 dark:text-[#dcf8c6]">
                  <BadgeCheck className="size-3.5 shrink-0" aria-hidden />
                  Verified Customer
                </span>
                <div className="hidden gap-2 lg:flex">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="testimonials-mosaic__nav-btn"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="testimonials-mosaic__nav-btn"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </article>

            {/* Side stack — 3 cards + count (desktop) */}
            <div className="relative hidden min-h-0 flex-col lg:flex">
              <div className="grid min-h-0 flex-1 grid-rows-3 gap-2.5 lg:gap-3">
                {sideIndices.map((index) => {
                  const item = testimonials[index];
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => goTo(index)}
                      className="testimonials-mosaic__side-card group flex cursor-pointer flex-col justify-center rounded-2xl border border-[#90e0ef]/50 bg-white/75 p-4 text-left shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color,transform] duration-200 hover:border-[#0077b6]/45 hover:bg-white hover:shadow-md active:scale-[0.99] dark:border-[#00b4d8]/15 dark:bg-[#03045e]/60 dark:hover:border-[#00b4d8]/35 dark:hover:bg-[#03045e]/80"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white",
                            avatarColors[index % avatarColors.length]
                          )}
                          aria-hidden
                        >
                          {initials(item.name)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-1.5 font-semibold text-[#03045e] dark:text-white">
                            {item.name}
                            <BadgeCheck
                              className="size-3.5 shrink-0 text-[#128c7e] dark:text-[#25d366]"
                              aria-label="Verified customer"
                            />
                          </p>
                          <p className="mt-0.5 text-xs text-[#035a8a]/70 dark:text-[#90e0ef]/75">{item.area}</p>
                          <p className="mt-2 line-clamp-2 text-sm italic leading-snug text-[#035a8a]/85 dark:text-[#90e0ef]/85">
                            &ldquo;{item.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p
                className="mt-3 text-right font-heading text-sm font-semibold tabular-nums text-[#035a8a]/70 dark:text-[#90e0ef]/75"
                aria-live="polite"
              >
                <span className="text-lg font-bold text-[#0077b6] dark:text-[#00b4d8]">{active + 1}</span>
                <span className="mx-1">/</span>
                <span>{count}</span>
              </p>
            </div>
          </div>

          {/* Mobile nav + count */}
          <div className="mt-3 flex items-center justify-between gap-4 lg:hidden">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="testimonials-mosaic__nav-btn"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="testimonials-mosaic__nav-btn"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <p
              className="shrink-0 font-heading text-sm font-semibold tabular-nums text-[#035a8a]/70 dark:text-[#90e0ef]/75"
              aria-live="polite"
            >
              <span className="text-lg font-bold text-[#0077b6] dark:text-[#00b4d8]">{active + 1}</span>
              <span className="mx-1">/</span>
              <span>{count}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
