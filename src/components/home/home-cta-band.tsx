import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { AnimateOnScroll } from "@/components/animations";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { QrCodeCard } from "@/components/qr/qr-code-card";
import { getConnectPageUrl } from "@/lib/connect-url";
import { getTelHref } from "@/lib/contact-urls";
import { getSiteConfig } from "@/lib/content";

export function HomeCtaBand() {
  const site = getSiteConfig();
  const connectUrl = getConnectPageUrl();
  const phoneHref = getTelHref();

  return (
    <section
      className="home-cta-band relative overflow-hidden py-16 md:py-24"
      aria-labelledby="home-cta-heading"
    >
      <div className="home-cta-band__bg absolute inset-0" aria-hidden />
      <div className="home-cta-band__glow home-cta-band__glow--left absolute" aria-hidden />
      <div className="home-cta-band__glow home-cta-band__glow--right absolute" aria-hidden />

      <div className="section-shell-wide relative">
        <AnimateOnScroll>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#90e0ef]">
                Start Your Order
              </p>
              <h2
                id="home-cta-heading"
                className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
              >
                Ready for Pure,{" "}
                <span className="text-[#90e0ef]">Refreshing Water?</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                Order 19L mineral water bottles with fast delivery across
                Islamabad and Rawalpindi. Message us on WhatsApp — we handle
                the rest.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={site.social.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn-whatsapp min-h-12 w-full sm:w-auto"
                >
                  <WhatsAppIcon data-icon="inline-start" />
                  Order on WhatsApp
                </Link>
                <Link
                  href="/delivery/"
                  className="hero-btn min-h-12 w-full cursor-pointer border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:w-auto"
                >
                  Delivery Areas
                </Link>
                <Link
                  href="/contact/"
                  className="hero-btn min-h-12 w-full cursor-pointer border border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  Contact Us
                  <ArrowRight data-icon="inline-end" className="size-5" aria-hidden />
                </Link>
              </div>

              <div className="mt-6 flex flex-col flex-wrap items-start gap-x-5 gap-y-2 text-sm text-white/80 sm:flex-row sm:items-center">
                <Link
                  href={phoneHref}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-white transition-colors duration-200 hover:text-[#90e0ef]"
                >
                  <Phone className="size-4 shrink-0 text-[#90e0ef]" aria-hidden />
                  {site.contact.phone}
                </Link>
                <span className="hidden text-white/40 sm:inline" aria-hidden>
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 shrink-0 text-[#90e0ef]" aria-hidden />
                  {site.contact.address.full}
                </span>
              </div>
            </div>

            <aside className="flex flex-col items-center lg:items-end">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Scan on Mobile
              </p>
              <QrCodeCard
                url={connectUrl}
                label="QR code linking to Everdrop social and contact page"
                downloadFileName="everdrop-connect-qr.png"
                showDownload={false}
                size={168}
                mobileSize={140}
                className="items-center text-white"
              />
            </aside>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
