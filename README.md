# Transactional Email Providers

A static website listing and comparing transactional email providers. Focus is explicitly on **transactional** emails (API/SMTP for application-triggered emails), not marketing campaigns.

**Live site:** Deployed via Cloudflare Pages  
**Data last updated:** See `src/data/providers.json` (`lastUpdated`)

## Features

- Filter by location (EU / US / UK / CA / Global)
- Filter by free plan, pay-as-you-go, marketing allowed, and verification requirements
- Search providers by name
- Sort by name, cheapest plan, or free quota
- Expandable rows with full pricing tiers and overage costs
- Dark / light mode with system preference detection
- Fully static — no server required, no tracking, no cookies

## Tech Stack

| Layer         | Technology                                       |
|---------------|--------------------------------------------------|
| Framework     | [Astro](https://astro.build) (static output)     |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com)       |
| Interactivity | [Alpine.js](https://alpinejs.dev) 3.x (CDN)      |
| Deployment    | [Cloudflare Pages](https://pages.cloudflare.com) |

## Data Sources

All provider data is **hand-curated** from publicly available pricing pages. The original research is maintained in a private Google Sheet. No live data connection is used — all data is static and committed to this repository.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to add or update providers.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is deployed automatically to Cloudflare Pages. Connect the repository in the Cloudflare Pages dashboard with these settings:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** 22.12.0+

No environment variables required.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to:
- Add a new provider
- Update pricing data
- Report inaccuracies
