import { Award, Droplets, Sparkles, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimateOnScroll, BatchReveal } from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";
import type { SiteConfig } from "@/lib/types";

const valueIcons: Record<string, LucideIcon> = {
  "Naturally Balanced": Droplets,
  "Trusted Quality": Award,
  "Fast Delivery": Truck,
  "Premium Service": Sparkles,
};

interface AboutValuesProps {
  site: SiteConfig;
}

export function AboutValues({ site }: AboutValuesProps) {
  return (
    <section className="section-pad water-gradient">
      <div className="section-shell-wide">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Our Values"
            title="What Drives Everything We Do"
            description="Four principles that guide every bottle we deliver."
          />
        </AnimateOnScroll>

        <BatchReveal className="mt-10 grid gap-6 sm:grid-cols-2">
          {site.values.map((value) => {
            const Icon = valueIcons[value.title] ?? Droplets;
            return (
              <article
                key={value.title}
                className="batch-item glass-card group rounded-3xl p-8 transition-[border-color,box-shadow] duration-200 hover:border-[#0077b6]/40 hover:shadow-md dark:hover:border-[#00b4d8]/30"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl border border-[#00b4d8]/30 bg-[#0077b6]/10 text-[#0077b6] transition-colors duration-200 group-hover:bg-[#0077b6]/15 dark:border-[#00b4d8]/25 dark:bg-[#00b4d8]/10 dark:text-[#00b4d8]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-[#03045e] dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#035a8a]/85 dark:text-[#90e0ef]/85">
                  {value.description}
                </p>
              </article>
            );
          })}
        </BatchReveal>
      </div>
    </section>
  );
}
