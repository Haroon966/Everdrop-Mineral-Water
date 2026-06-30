"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap/register";

interface ParallaxBgProps {
  src: string;
  alt: string;
  className?: string;
}

export function ParallaxBg({ src, alt, className }: ParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(imageRef.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#03045e]/80 via-[#0077b6]/45 to-background/95" />
      <div className="water-ripple pointer-events-none absolute inset-0 opacity-30" aria-hidden />
    </div>
  );
}
