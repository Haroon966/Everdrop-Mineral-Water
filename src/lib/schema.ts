import { getAllDeliveryAreas } from "./areas";
import { getSiteConfig, getProducts, getTestimonials } from "./content";
import { absoluteUrl } from "./site-url";
import type { FaqItem, Product } from "./types";

const F11_GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 33.6844,
  longitude: 73.0479,
};

const MAPS_URL =
  "https://maps.google.com/?q=F11%2F1%20Islamabad%20Pakistan";

function getSameAsUrls(): string[] {
  const site = getSiteConfig();
  const candidates = [
    site.social.instagram.url,
    site.social.facebook.url,
    site.social.tiktok.url,
  ];

  return candidates.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.pathname.length > 1;
    } catch {
      return false;
    }
  });
}

export function localBusinessSchema() {
  const site = getSiteConfig();
  const testimonials = getTestimonials();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brand.name,
    description: site.brand.description,
    url: absoluteUrl("/"),
    telephone: site.contact.phone,
    email: site.contact.email,
    image: absoluteUrl("/og/default.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      addressCountry: site.contact.address.country,
    },
    geo: F11_GEO,
    hasMap: MAPS_URL,
    areaServed: ["Islamabad", "Rawalpindi"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: getSameAsUrls(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      reviewCount: String(testimonials.length),
    },
    review: testimonials.slice(0, 10).map((item) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: item.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(item.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: item.quote,
      contentLocation: {
        "@type": "Place",
        name: item.area,
      },
    })),
  };
}

export function organizationSchema() {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/everdrop-logo.png"),
    sameAs: getSameAsUrls(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
  };
}

export function websiteSchema() {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand.name,
    url: absoluteUrl("/"),
    publisher: {
      "@type": "Organization",
      name: site.brand.name,
    },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: "Everdrop",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/products/${product.slug}/`),
    },
  };
}

export function itemListSchema() {
  const products = getProducts();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${product.slug}/`),
      name: product.name,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function deliveryServiceSchema(areaName: string, region: string) {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Mineral Water Delivery in ${areaName}`,
    description: site.brand.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.brand.name,
      telephone: site.contact.phone,
    },
    areaServed: {
      "@type": "Place",
      name: `${areaName}, ${region}`,
    },
    serviceType: "Mineral Water Delivery",
  };
}

export function areaListSchema() {
  const areas = getAllDeliveryAreas();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: areas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/delivery/${area.slug}/`),
      name: `${area.name}, ${area.region}`,
    })),
  };
}
