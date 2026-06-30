import { HomeCtaBand } from "@/components/home/home-cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { TestimonialsPageContent } from "@/components/testimonials/testimonials-page-content";
import { getPageKeywords, getTestimonials } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: "Customer Reviews & Testimonials",
  description:
    "Read verified Everdrop customer reviews from Islamabad and Rawalpindi — 47+ geo-tagged testimonials for homes, offices, and clinics.",
  path: "/testimonials/",
  keywords: getPageKeywords("/testimonials/"),
});

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Testimonials", url: absoluteUrl("/testimonials/") },
        ])}
      />
      <TestimonialsPageContent testimonials={testimonials} />
      <HomeCtaBand />
    </>
  );
}
