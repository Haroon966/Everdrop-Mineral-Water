import { AnimateOnScroll } from "@/components/animations";
import { MapEmbed } from "@/components/map-embed";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import type { SiteConfig } from "@/lib/types";

interface HomeLocationProps {
  site: SiteConfig;
}

export function HomeLocation({ site }: HomeLocationProps) {
  return (
    <section className="section-pad bg-background">
      <div className="section-shell-wide">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Find Us"
            title="Based in F11/1, Islamabad"
            description={`Everdrop delivers across Islamabad and Rawalpindi from ${site.contact.address.full}.`}
          />
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-10">
          <MapEmbed className="shadow-md" />
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/delivery/" variant="outline" className="cursor-pointer">
            View Delivery Areas
          </ButtonLink>
          <ButtonLink href="/contact/" variant="outline" className="cursor-pointer">
            Contact Us
          </ButtonLink>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
