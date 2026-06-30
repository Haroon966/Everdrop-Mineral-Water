declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackWhatsAppClick(source: string): void {
  trackEvent("whatsapp_click", { source });
}

export function trackPhoneClick(source: string): void {
  trackEvent("phone_click", { source });
}

export function trackAreaPageView(areaSlug: string, areaName: string): void {
  trackEvent("area_page_view", { area_slug: areaSlug, area_name: areaName });
}
