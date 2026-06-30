"use client";

import dynamic from "next/dynamic";

export const HeroAnimation = dynamic(
  () => import("./hero-animation").then((m) => m.HeroAnimation),
  { ssr: false }
);

export const HeroBottle = dynamic(
  () => import("./hero-bottle").then((m) => m.HeroBottle),
  { ssr: false }
);

export const ParallaxOverlay = dynamic(
  () => import("./parallax-overlay").then((m) => m.ParallaxOverlay),
  { ssr: false }
);

export const AnimateOnScroll = dynamic(
  () => import("./animate-on-scroll").then((m) => m.AnimateOnScroll),
  { ssr: false }
);

export const BatchReveal = dynamic(
  () => import("./batch-reveal").then((m) => m.BatchReveal),
  { ssr: false }
);
