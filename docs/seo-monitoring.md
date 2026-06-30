# Everdrop SEO Monitoring Checklist

## GA4 Custom Events (automatic when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set)

| Event | Trigger |
|-------|---------|
| `whatsapp_click` | Any WhatsApp link click |
| `phone_click` | Any `tel:` link click |
| `area_page_view` | Area landing page load |

View these in GA4 → Reports → Engagement → Events.

## Weekly Review (15 minutes)

1. **Google Search Console**
   - Performance → check impressions, clicks, average position
   - Note new queries ranking on page 2–3 (add as FAQs or area copy)
   - Coverage → confirm no new indexing errors

2. **Google Business Profile**
   - Check discovery searches, calls, direction requests
   - Respond to new reviews within 48 hours
   - Post one update (offer, new area, seasonal message)

3. **GA4**
   - Top landing pages by sessions
   - `whatsapp_click` and `phone_click` conversion trends
   - Bounce rate on area pages — improve copy if > 70%

## Quarterly Content Refresh

- [ ] Update FAQ answers in [`data/site.json`](../data/site.json) if pricing or policies change
- [ ] Add new testimonials to [`data/testimonials.json`](../data/testimonials.json)
- [ ] Refresh area page intros for top 10 areas by GSC impressions
- [ ] Run PageSpeed Insights on home, delivery, and top product pages
- [ ] Review [`docs/seo-keywords.md`](./seo-keywords.md) against GSC query data

## Competitor Benchmark (monthly)

Search and compare top 3 results for:

- `19L water delivery Islamabad`
- `mineral water delivery F11`
- `water delivery Bahria Town Rawalpindi`

Track: FAQ count, area pages, review count, page speed, content depth.
