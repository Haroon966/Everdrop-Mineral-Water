import { AnimateOnScroll } from "@/components/animations";
import { WhyChooseList } from "@/components/services/why-choose-list";
import { SectionHeading } from "@/components/section-heading";
import type { SiteConfig } from "@/lib/types";

interface HomeWhyChooseProps {
  site: SiteConfig;
}

export function HomeWhyChoose({ site }: HomeWhyChooseProps) {
  return (
    <section className="section-pad water-gradient">
      <div className="section-shell-wide">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Why Everdrop"
            title="Why Choose Everdrop?"
            description="Trusted by homes and businesses across Islamabad for pure, safe drinking water."
          />
        </AnimateOnScroll>

        <WhyChooseList items={site.whyChoose} />
      </div>
    </section>
  );
}
