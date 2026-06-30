import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { AnimateOnScroll } from "@/components/animations";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/map-embed";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { getPageKeywords, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { getTelHref } from "@/lib/contact-urls";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "Contact & Order",
  description:
    "Contact Everdrop Pure Mineral Water — F11/1 Islamabad. Call 0300-6096599, email everdrop599@gmail.com, or order on WhatsApp.",
  path: "/contact/",
  keywords: getPageKeywords("/contact/"),
});

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Contact", url: absoluteUrl("/contact/") },
          ]),
        ]}
      />

      <section className="water-gradient py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="Contact"
              title="Call Now or Get in Touch"
              description="Reach us on WhatsApp, phone, or email anytime — we're open 24/7."
            />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimateOnScroll>
              <div className="flex flex-col gap-4">
                {(
                  [
                    {
                      whatsapp: true as const,
                      label: "WhatsApp",
                      value: site.contact.phone,
                      href: site.social.whatsapp.url,
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: site.contact.phone,
                      href: getTelHref(),
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: site.contact.email,
                      href: `mailto:${site.contact.email}`,
                    },
                    {
                      icon: MapPin,
                      label: "Address",
                      value: site.contact.address.full,
                      href: undefined,
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: site.contact.hours,
                      href: undefined,
                    },
                  ] as const
                ).map((item) => (
                  <div key={item.label} className="glass-card flex items-start gap-4 rounded-2xl p-6">
                    {"whatsapp" in item ? (
                      <span className="whatsapp-icon-badge size-10">
                        <WhatsAppIcon className="size-6" />
                      </span>
                    ) : (
                      <item.icon className="size-6 shrink-0 text-primary" aria-hidden />
                    )}
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-lg font-medium transition-colors duration-200 hover:text-primary cursor-pointer"
                          {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <ButtonLink href={site.social.whatsapp.url} target="_blank" rel="noopener noreferrer" size="lg" className="whatsapp-btn mt-2 cursor-pointer">
                  <WhatsAppIcon data-icon="inline-start" />
                  Order on WhatsApp
                </ButtonLink>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="font-heading text-2xl font-semibold">Send a Message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form and we&apos;ll open WhatsApp with your message ready to send.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="mt-16">
            <AnimateOnScroll>
              <SectionHeading title="Our Location" />
              <div className="mt-8">
                <MapEmbed />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
