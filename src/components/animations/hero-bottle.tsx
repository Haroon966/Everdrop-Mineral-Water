"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap/register";

export function HeroBottle() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const bottle = ref.current?.querySelector(".hero-bottle-img");
      if (!bottle) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(bottle, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out",
          delay: 0.15,
        });

        gsap.to(bottle, {
          y: -18,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="flex translate-x-2 items-end justify-center sm:translate-x-6 lg:translate-x-20">
      <Image
        src="/everdrop-water-bottle.png"
        alt="Everdrop 19L mineral water bottle"
        width={1086}
        height={1448}
        priority
        className="hero-bottle-img pointer-events-none h-auto w-full max-w-[min(60vw,220px)] object-contain drop-shadow-[0_24px_48px_rgba(3,4,94,0.35)] sm:max-w-[340px] lg:max-w-[440px] xl:max-w-[500px]"
      />
    </div>
  );
}
