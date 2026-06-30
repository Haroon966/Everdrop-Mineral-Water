import { AboutHero } from "@/components/about/about-hero";
import { AboutLocation } from "@/components/about/about-location";
import { AboutStory } from "@/components/about/about-story";
import { AboutValues } from "@/components/about/about-values";
import { AboutQuality } from "@/components/about/about-quality";
import { HomeCtaBand } from "@/components/home/home-cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageKeywords, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Everdrop Pure Mineral Water — premium mineral water delivery from F11/1 Islamabad. Pure, trustworthy, and nature-inspired.",
  path: "/about/",
  keywords: getPageKeywords("/about/"),
});

export default function AboutPage() {
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "About", url: absoluteUrl("/about/") },
        ])}
      />

      <AboutHero site={site} />
      <AboutStory />
      <AboutQuality />
      <AboutValues site={site} />
      <AboutLocation site={site} />
      <HomeCtaBand />
    </>
  );
}
