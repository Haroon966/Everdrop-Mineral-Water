"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap/register";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function AnimateOnScroll({
  children,
  className,
  stagger = 0.12,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
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
