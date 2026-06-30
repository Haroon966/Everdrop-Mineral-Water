"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link?.href) return;

      if (link.href.includes("wa.me") || link.href.includes("whatsapp")) {
        trackWhatsAppClick(link.getAttribute("aria-label") ?? link.textContent?.trim() ?? "link");
      } else if (link.href.startsWith("tel:")) {
        trackPhoneClick(link.getAttribute("aria-label") ?? link.textContent?.trim() ?? "link");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
