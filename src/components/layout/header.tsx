"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Menu, Moon, Phone, Sun } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { useTheme } from "@/components/theme-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getTelHref } from "@/lib/contact-urls";
import type { NavLink } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  navLinks: NavLink[];
}

export function Header({ navLinks }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const headerRef = useRef<HTMLElement>(null);

  const isActive = (href: string) => {
    const normalize = (path: string) =>
      path === "/" ? "/" : path.replace(/\/$/, "");
    const current = normalize(pathname);
    const target = normalize(href);
    if (target === "/") return current === "/";
    return current === target || current.startsWith(`${target}/`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] left-[max(0.75rem,env(safe-area-inset-left))] z-50 mx-auto max-w-6xl rounded-2xl border shadow-md backdrop-blur-md transition-colors duration-200 lg:top-4 lg:right-4 lg:left-4",
        scrolled
          ? "border-[#90e0ef]/80 bg-white/95 dark:border-[#00b4d8]/20 dark:bg-[#03045e]/95"
          : "border-[#90e0ef]/60 bg-white/85 dark:border-[#00b4d8]/15 dark:bg-[#03045e]/80"
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-90 cursor-pointer"
        >
          <SiteLogo priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            </Button>
          )}
          <ButtonLink href={getTelHref()} className="hidden cursor-pointer sm:inline-flex">
            <Phone data-icon="inline-start" />
            Call Now
          </ButtonLink>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="cursor-pointer md:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "min-h-11 rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 cursor-pointer",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <ButtonLink href="https://wa.me/923006096599" target="_blank" rel="noopener noreferrer" className="whatsapp-btn mt-4 cursor-pointer">
                  <WhatsAppIcon data-icon="inline-start" />
                  Order on WhatsApp
                </ButtonLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
