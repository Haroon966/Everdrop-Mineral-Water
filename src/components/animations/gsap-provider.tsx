"use client";

import { useEffect } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap/register";

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    const timeout = setTimeout(refresh, 500);
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      clearTimeout(timeout);
    };
  }, []);

  return <>{children}</>;
}
