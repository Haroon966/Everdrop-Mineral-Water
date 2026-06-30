import Link from "next/link";
import { FacebookIcon, GitHubIcon, InstagramIcon } from "@/components/icons/social-icons";
import { SiteLogo } from "@/components/layout/site-logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Separator } from "@/components/ui/separator";
import { getTelHref } from "@/lib/contact-urls";
import type { Navigation, SiteConfig } from "@/lib/types";

interface FooterProps {
  navigation: Navigation;
  site: SiteConfig;
}

export function Footer({ navigation, site }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex cursor-pointer transition-opacity duration-200 hover:opacity-90">
              <SiteLogo className="h-10" />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {site.brand.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                className="whatsapp-icon-badge size-10 transition-colors duration-200 hover:border-[#25d366] hover:bg-[#dcf8c6] cursor-pointer dark:hover:bg-[#25d366]/25"
              >
                <WhatsAppIcon className="size-6" />
              </a>
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on Instagram ${site.social.instagram.handle}`}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={site.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={site.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on TikTok ${site.social.tiktok.handle}`}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
              >
                TT
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {navigation.footer.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {navigation.footer.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary cursor-pointer"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>
                <a href={getTelHref()} className="transition-colors duration-200 hover:text-primary cursor-pointer">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="transition-colors duration-200 hover:text-primary cursor-pointer">
                  {site.contact.email}
                </a>
              </p>
              <p className="mt-1">{site.contact.address.full}</p>
              <p className="mt-1">{site.contact.hours}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.brand.name}. All rights reserved.</p>
          <p>Pure mineral water delivery in Islamabad &amp; Rawalpindi</p>
        </div>
      </div>

      <div className="border-t border-border bg-muted/50 py-3">
        <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1.5 px-4 text-center text-xs text-muted-foreground md:px-6">
          <span>Designed &amp; developed by</span>
          <a
            href="https://github.com/Haroon966"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-200 hover:text-primary cursor-pointer"
          >
            <GitHubIcon className="size-3.5 shrink-0" />
            Haroon Ali
          </a>
        </p>
      </div>
    </footer>
  );
}
