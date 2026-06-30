import { Droplets } from "lucide-react";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/animations";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import type { SiteConfig } from "@/lib/types";

interface AboutHeroProps {
  site: SiteConfig;
}

export function AboutHero({ site }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden water-gradient pt-28 pb-16 md:pt-32 md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgb(0 180 216 / 0.22) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgb(144 224 239 / 0.3) 0%, transparent 45%)",
        }}
      />
      <div className="section-shell-wide relative">
        <AnimateOnScroll>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0077b6] dark:text-[#00b4d8]">
              About Everdrop
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold leading-tight tracking-tight text-[#03045e] md:text-5xl lg:text-6xl dark:text-white">
              {site.brand.tagline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#035a8a]/80 md:text-lg dark:text-[#90e0ef]/85">
              {site.brand.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={site.social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn inline-flex min-h-11 items-center justify-center px-8"
              >
                <WhatsAppIcon data-icon="inline-start" />
                Get in Touch
              </Link>
              <Link
                href="/products/"
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-[#0077b6]/35 bg-white/80 px-8 text-sm font-semibold text-[#03045e] transition-colors duration-200 hover:border-[#0077b6] hover:bg-white dark:border-[#00b4d8]/40 dark:bg-[#03045e]/40 dark:text-white dark:hover:bg-[#03045e]/60"
              >
                View Products
              </Link>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {site.trustStats.map((stat) => (
              <li
                key={stat.label}
                className="glass-card rounded-2xl px-4 py-5 text-center transition-colors duration-200"
              >
                <p className="font-heading text-2xl font-bold text-[#0077b6] dark:text-[#00b4d8] md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-[#035a8a] dark:text-[#90e0ef] md:text-sm">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-center gap-2 text-sm text-[#035a8a]/75 dark:text-[#90e0ef]/80">
            <Droplets className="size-4 shrink-0 text-[#00b4d8]" aria-hidden />
            Based in {site.contact.address.full}
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
