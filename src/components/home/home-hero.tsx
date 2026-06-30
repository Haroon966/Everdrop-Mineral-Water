import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  Leaf,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { HeroAnimation, HeroBottle } from "@/components/animations";
import { getTelHref } from "@/lib/contact-urls";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const trustItems = [
  {
    icon: Droplets,
    title: "100% Pure",
    desc: "Naturally balanced minerals",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Healthy",
    desc: "Strict quality standards",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    desc: "Eco-conscious packaging",
  },
] as const;

function HeroCopy() {
  return (
    <>
      <h1 className="hero-title font-heading text-4xl font-bold leading-[1.08] tracking-tight text-balance text-[#03045e] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl dark:text-white">
        Pure Water.{" "}
        <span className="relative inline-block text-[#00b4d8]">
          Pure Trust!
          <Droplets
            className="absolute -right-2 -top-3 size-6 text-[#00b4d8] max-lg:static max-lg:ml-1 max-lg:inline md:size-7 lg:absolute lg:-right-2 lg:-top-3 lg:size-8"
            aria-hidden
          />
        </span>
      </h1>
      <p className="hero-subtitle mt-5 max-w-2xl text-sm leading-relaxed text-[#035a8a]/70 md:text-base dark:text-[#90e0ef]/75">
        Premium mineral water delivered to your doorstep across Islamabad
        and Rawalpindi. Stay hydrated, stay healthy.
      </p>

      <div className="hero-cta mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link href={getTelHref()} className="hero-btn hero-btn-primary">
          <Phone data-icon="inline-start" className="size-5" aria-hidden />
          Call Now
        </Link>
        <Link
          href="https://wa.me/923006096599"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn hero-btn-whatsapp"
        >
          <WhatsAppIcon data-icon="inline-start" />
          Order on WhatsApp
        </Link>
      </div>
    </>
  );
}

function StaticHeroBottle() {
  return (
    <div className="flex translate-x-2 items-end justify-center sm:translate-x-6">
      <Image
        src="/everdrop-water-bottle.png"
        alt="Everdrop 19L mineral water bottle"
        width={1086}
        height={1448}
        priority
        className="pointer-events-none h-auto w-full max-w-[min(60vw,220px)] object-contain drop-shadow-[0_24px_48px_rgba(3,4,94,0.35)] sm:max-w-[340px]"
      />
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative -mt-24 max-lg:min-h-[100dvh] max-lg:overflow-visible lg:h-lvh lg:overflow-hidden">
      <div className="hero-split-bg" aria-hidden>
        <div className="hero-split-left" />
        <div className="hero-split-right flex-1" />
      </div>

      {/* Mobile: static bottle — no GSAP */}
      <div className="pointer-events-none absolute inset-0 z-[5] flex items-end justify-center pb-4 sm:pb-8 lg:hidden">
        <StaticHeroBottle />
      </div>

      {/* Desktop: animated bottle */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center lg:flex">
        <HeroBottle />
      </div>

      <div className="section-shell-wide relative z-10 grid h-full max-lg:h-auto max-lg:items-start max-lg:gap-8 max-lg:pb-40 max-lg:pt-28 items-center gap-6 pb-36 pt-20 sm:pb-32 lg:grid-cols-2 lg:gap-8 lg:pb-24 lg:pt-28">
        {/* Mobile: static copy — no GSAP */}
        <div className="relative z-10 flex flex-col items-start pl-4 text-left sm:pl-6 lg:hidden">
          <HeroCopy />
        </div>

        {/* Desktop: animated copy */}
        <HeroAnimation className="relative z-10 hidden flex-col items-start pl-4 text-left sm:pl-6 lg:flex lg:pl-10 xl:pl-16">
          <HeroCopy />
        </HeroAnimation>

        <ul className="hero-benefits relative z-10 hidden flex-col gap-6 pr-4 sm:pr-6 lg:flex lg:justify-self-end lg:pl-4 lg:pr-10 xl:pr-16">
          {trustItems.map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0077b6]/10 text-[#0077b6] lg:size-14 lg:bg-white/15 lg:text-[#caf0f8] dark:bg-[#00b4d8]/15 dark:text-[#00b4d8]">
                <item.icon className="size-6 lg:size-7" aria-hidden />
              </span>
              <span>
                <span className="block text-base font-semibold text-[#03045e] lg:text-lg lg:text-white dark:text-white">
                  {item.title}
                </span>
                <span className="block text-sm text-[#035a8a] lg:text-base lg:text-[#90e0ef] dark:text-[#90e0ef]">
                  {item.desc}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 leading-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-12 w-full md:h-16"
          aria-hidden
        >
          <path
            d="M0,48 C240,80 480,16 720,48 C960,80 1200,24 1440,56 L1440,80 L0,80 Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
