# Everdrop SEO External Setup Guide

Complete these steps after deploying the site to production.

## Google Search Console (GSC)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://everdropmineralwater.com`
3. Verify ownership using one of:
   - **HTML meta tag**: Copy the verification code into `.env.local`:
     ```
     NEXT_PUBLIC_GSC_VERIFICATION=your-verification-code
     ```
     Rebuild and redeploy the site.
   - **DNS TXT record**: Add the TXT record at your domain registrar (no code change needed).
4. Submit sitemap: `https://everdropmineralwater.com/sitemap.xml`
5. Request indexing for key pages: `/`, `/delivery/`, `/products/19l/`, `/testimonials/`

## Google Analytics 4 (GA4)

1. Create a GA4 property at [Google Analytics](https://analytics.google.com)
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Rebuild and redeploy. Custom events tracked automatically:
   - `whatsapp_click`
   - `phone_click`
   - `area_page_view`

## Google Business Profile (GBP)

1. Go to [Google Business Profile](https://business.google.com)
2. Claim or create listing with **exact NAP** matching the site:
   - **Name**: Everdrop Pure Mineral Water
   - **Address**: F11/1, Islamabad, Pakistan
   - **Phone**: 0300-6096599
   - **Website**: https://everdropmineralwater.com
3. **Categories**: Water Delivery Service, Bottled Water Supplier
4. **Service areas**: Add all Islamabad sectors and Rawalpindi areas (see `/delivery/areas/`)
5. **Photos**: Upload bottle photos, delivery setup, office dispensers
6. **Posts**: Weekly offers and delivery updates
7. **Q&A**: Seed with FAQs from `/delivery/#faq`
8. **Reviews**: Request Google reviews after each delivery via WhatsApp follow-up

## Core Web Vitals Audit

Run [PageSpeed Insights](https://pagespeed.web.dev/) on:

- `https://everdropmineralwater.com/`
- `https://everdropmineralwater.com/delivery/`
- `https://everdropmineralwater.com/products/19l/`

Target scores: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## Monitoring Rhythm

| Frequency | Action |
|-----------|--------|
| Weekly | Check GSC impressions, clicks, top queries; review GBP insights |
| Monthly | Run Lighthouse audit; compare competitor rankings |
| Quarterly | Refresh FAQ answers, add new testimonials, update area page copy |

See [off-page-seo.md](./off-page-seo.md) for directory listings and link building.
