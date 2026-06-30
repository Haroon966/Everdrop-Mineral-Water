import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ButtonLink } from "@/components/ui/button-link";
import { getSiteConfig } from "@/lib/content";
import { getTelHref } from "@/lib/contact-urls";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found. Browse Everdrop products, delivery areas, or contact us.",
  path: "/404/",
});

export default function NotFound() {
  const site = getSiteConfig();

  return (
    <section className="section-pad water-gradient">
      <div className="section-shell mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">404</p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-[#03045e] dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          We couldn&apos;t find that page. Try one of these links or order mineral water delivery
          in Islamabad and Rawalpindi.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.social.whatsapp.url} target="_blank" rel="noopener noreferrer" className="whatsapp-btn cursor-pointer">
            <WhatsAppIcon data-icon="inline-start" />
            Order on WhatsApp
          </ButtonLink>
          <ButtonLink href="/products/" variant="outline" className="cursor-pointer">
            View Products
          </ButtonLink>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm" aria-label="Helpful links">
          <Link href="/" className="text-primary hover:underline cursor-pointer">Home</Link>
          <Link href="/delivery/" className="text-primary hover:underline cursor-pointer">Delivery Areas</Link>
          <Link href="/delivery/areas/" className="text-primary hover:underline cursor-pointer">All Areas</Link>
          <Link href="/contact/" className="text-primary hover:underline cursor-pointer">Contact</Link>
        </nav>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <a href={getTelHref()} className="inline-flex items-center gap-1.5 hover:text-primary cursor-pointer">
            <Phone className="size-4" aria-hidden />
            {site.contact.phone}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {site.contact.address.full}
          </span>
        </div>
      </div>
    </section>
  );
}
