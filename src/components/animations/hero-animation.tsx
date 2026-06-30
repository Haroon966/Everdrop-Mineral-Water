"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap/register";

interface HeroAnimationProps {
  children: ReactNode;
  className?: string;
}

export function HeroAnimation({ children, className }: HeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.from(".hero-title", { opacity: 0, y: 30, duration: 0.8 })
          .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
          .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.3");
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
