import { AnimateOnScroll } from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";
import type { SiteConfig } from "@/lib/types";

interface ProductsFaqProps {
  site: SiteConfig;
}

export function ProductsFaq({ site }: ProductsFaqProps) {
  return (
    <section className="section-pad water-gradient">
      <div className="section-shell">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="FAQ"
            title="Ordering & Delivery Questions"
            description="Everything you need to know before placing your order."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {site.deliveryFaq.map((item) => (
              <div key={item.question} className="glass-card rounded-2xl p-6">
                <h2 className="font-heading text-lg font-semibold text-[#03045e] dark:text-white">
                  {item.question}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#035a8a]/80 dark:text-[#90e0ef]/85">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
