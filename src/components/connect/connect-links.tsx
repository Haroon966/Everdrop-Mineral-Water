import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Droplets,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/social-icons";
import { SiteLogo } from "@/components/layout/site-logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ButtonLink } from "@/components/ui/button-link";
import { getSiteConfig } from "@/lib/content";
import { getTelHref } from "@/lib/contact-urls";
import type { SiteConfig } from "@/lib/types";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-5 items-center justify-center text-xs font-bold ${className ?? ""}`}
      aria-hidden
    >
      TT
    </span>
  );
}

interface ConnectLinkRowProps {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
  icon: React.ReactNode;
  prominent?: boolean;
}

function ConnectLinkRow({
  href,
  label,
  description,
  external,
  icon,
  prominent,
}: ConnectLinkRowProps) {
  const className = [
    "group flex min-h-[4.5rem] items-center gap-4 rounded-2xl border px-4 py-3 transition-colors duration-200 cursor-pointer",
    prominent
      ? "border-[#25d366]/40 bg-[#25d366]/10 hover:border-[#25d366] hover:bg-[#25d366]/15"
      : "border-border bg-card hover:border-primary/40 hover:bg-muted/50",
  ].join(" ");

  const content = (
    <>
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
          prominent ? "whatsapp-icon-badge border-0" : "border border-border bg-background"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block font-medium text-foreground">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-sm text-muted-foreground sm:truncate">{description}</span>
        ) : null}
      </span>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function buildConnectSections(site: SiteConfig) {
  return {
    order: [
      {
        href: site.social.whatsapp.url,
        label: "Order on WhatsApp",
        description: site.contact.phone,
        external: true,
        prominent: true,
        icon: <WhatsAppIcon className="size-6" />,
      },
    ],
    contact: [
      {
        href: getTelHref(),
        label: "Call Us",
        description: site.contact.phone,
        external: true,
        icon: <Phone className="size-5 text-primary" aria-hidden />,
      },
      {
        href: `mailto:${site.contact.email}`,
        label: "Email",
        description: site.contact.email,
        external: true,
        icon: <Mail className="size-5 text-primary" aria-hidden />,
      },
      {
        href: `https://maps.google.com/?q=${encodeURIComponent(site.contact.address.full)}`,
        label: "Visit Us",
        description: site.contact.address.full,
        external: true,
        icon: <MapPin className="size-5 text-primary" aria-hidden />,
      },
    ],
    social: [
      {
        href: site.social.instagram.url,
        label: "Instagram",
        description: site.social.instagram.handle,
        external: true,
        icon: <InstagramIcon className="size-5" />,
      },
      {
        href: site.social.facebook.url,
        label: "Facebook",
        description: site.social.facebook.handle,
        external: true,
        icon: <FacebookIcon className="size-5" />,
      },
      {
        href: site.social.tiktok.url,
        label: "TikTok",
        description: site.social.tiktok.handle,
        external: true,
        icon: <TikTokIcon />,
      },
    ],
    explore: [
      {
        href: "/products/",
        label: "View Products",
        description: "19L bottles & accessories",
        icon: <Package className="size-5 text-primary" aria-hidden />,
      },
      {
        href: "/delivery/",
        label: "Delivery Areas",
        description: "Islamabad & Rawalpindi",
        icon: <Truck className="size-5 text-primary" aria-hidden />,
      },
      {
        href: "/about/",
        label: "About Everdrop",
        description: site.brand.tagline,
        icon: <Droplets className="size-5 text-primary" aria-hidden />,
      },
      {
        href: "/contact/",
        label: "Contact & Support",
        description: "Send a message or enquiry",
        icon: <Mail className="size-5 text-primary" aria-hidden />,
      },
    ],
  };
}

export function ConnectLinks() {
  const site = getSiteConfig();
  const sections = buildConnectSections(site);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-4 md:px-6">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center">
          <SiteLogo className="h-14" />
        </div>
        <h1 className="mt-4 text-balance font-heading text-2xl font-semibold tracking-tight text-foreground">
          {site.brand.shortName}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{site.brand.tagline}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden />
          {site.contact.hours}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {sections.order.map((link) => (
          <ConnectLinkRow key={link.label} {...link} />
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Contact
        </h2>
        <div className="flex flex-col gap-3">
          {sections.contact.map((link) => (
            <ConnectLinkRow key={link.label} {...link} external />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Follow Us
        </h2>
        <div className="flex flex-col gap-3">
          {sections.social.map((link) => (
            <ConnectLinkRow key={link.label} {...link} external />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explore
        </h2>
        <div className="flex flex-col gap-3">
          {sections.explore.map((link) => (
            <ConnectLinkRow key={link.label} {...link} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/30 p-5 text-center">
        <p className="text-sm text-muted-foreground">
          Premium mineral water delivery across Islamabad &amp; Rawalpindi.
        </p>
        <ButtonLink
          href={site.social.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          className="whatsapp-btn mt-4 min-h-11 w-full cursor-pointer"
        >
          <WhatsAppIcon data-icon="inline-start" />
          Order Now
        </ButtonLink>
      </div>
    </div>
  );
}
