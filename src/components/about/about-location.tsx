import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/animations";
import { MapEmbed } from "@/components/map-embed";
import { SectionHeading } from "@/components/section-heading";
import { getTelHref } from "@/lib/contact-urls";
import type { SiteConfig } from "@/lib/types";

interface AboutLocationProps {
  site: SiteConfig;
}

export function AboutLocation({ site }: AboutLocationProps) {
  return (
    <section className="section-pad bg-background">
      <div className="section-shell-wide">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Visit Us"
            title="Find Everdrop in F11/1"
            description="Stop by or order for fast doorstep delivery across Islamabad and Rawalpindi."
          />
        </AnimateOnScroll>

        <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <AnimateOnScroll className="lg:col-span-2">
            <div className="glass-card flex h-full flex-col gap-6 rounded-3xl p-8">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  content: site.contact.address.full,
                  href: undefined,
                },
                {
                  icon: Clock,
                  label: "Hours",
                  content: site.contact.hours,
                  href: undefined,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  content: site.contact.phone,
                  href: getTelHref(),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: site.contact.email,
                  href: `mailto:${site.contact.email}`,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#00b4d8]/30 bg-[#0077b6]/10 text-[#0077b6] dark:text-[#00b4d8]">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#0077b6] dark:text-[#00b4d8]">
                      {item.label}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-1 block cursor-pointer text-base font-medium text-[#03045e] transition-colors duration-200 hover:text-[#0077b6] dark:text-white dark:hover:text-[#00b4d8]"
                      >
                        {item.content}
                      </Link>
                    ) : (
                      <p className="mt-1 text-base font-medium text-[#03045e] dark:text-white">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="lg:col-span-3">
            <MapEmbed className="h-full shadow-md" />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
