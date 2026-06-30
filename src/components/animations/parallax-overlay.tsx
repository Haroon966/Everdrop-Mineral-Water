"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap/register";

interface ParallaxOverlayProps {
  className?: string;
}

/** Lightweight parallax overlay — hero image is server-rendered for LCP */
export function ParallaxOverlay({ className }: ParallaxOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      aria-hidden
    >
      <div className="water-ripple absolute inset-0 opacity-30" />
    </div>
  );
}
