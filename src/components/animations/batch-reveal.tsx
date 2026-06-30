"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, gsap, registerGsap, useGSAP } from "@/lib/gsap/register";

interface BatchRevealProps {
  children: ReactNode;
  className?: string;
  selector?: string;
}

export function BatchReveal({
  children,
  className,
  selector = ".batch-item",
}: BatchRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = ref.current?.querySelectorAll(selector);
        if (!items?.length) return;

        ScrollTrigger.batch(items, {
          onEnter: (elements: Element[]) => {
            gsap.from(elements, {
              opacity: 0,
              y: 30,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
          start: "top 90%",
          once: true,
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
