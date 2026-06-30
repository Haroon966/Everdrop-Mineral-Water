export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    taglines: string[];
    description: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    address: {
      street: string;
      city: string;
      region: string;
      country: string;
      full: string;
    };
    hours: string;
  };
  social: {
    instagram: { handle: string; url: string };
    facebook: { handle: string; url: string };
    tiktok: { handle: string; url: string };
    whatsapp: { url: string };
  };
  seo: {
    keywords: string[];
    defaultTitle: string;
    defaultDescription: string;
  };
  trustStats: { value: string; label: string }[];
  values: { title: string; description: string }[];
  services: {
    id: string;
    title: string;
    summary: string;
    highlights: string[];
  }[];
  whyChoose: string[];
  deliveryFaq: { question: string; answer: string }[];
}

export interface Product {
  slug: string;
  name: string;
  size: string;
  price: number;
  currency: string;
  popular: boolean;
  description: string;
  tagline?: string;
  cardTitle?: string;
  priceLabel?: string;
  features: string[];
  image: string;
  gallery?: GalleryImage[];
  whatsappMessage: string;
  faqs?: FaqItem[];
}

export interface DeliveryRegion {
  name: string;
  description: string;
  groups: { label: string; areas: string[] }[];
}

export interface DeliveryAreaRecord {
  name: string;
  region: string;
  regionDescription: string;
  groupLabel: string;
  slug: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  area: string;
  quote: string;
  rating: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Navigation {
  header: NavLink[];
  footer: {
    company: NavLink[];
    support: NavLink[];
  };
}
