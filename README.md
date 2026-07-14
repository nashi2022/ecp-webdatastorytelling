# One Choice at a Time — ECP Impact Story

An interactive, bilingual (EN/ES) **scrollytelling data story** about the impact of the
[Educated Choices Program](https://www.ecprogram.org/) (ECP), a 501(c)(3) nonprofit that
provides free, science-based food education worldwide.

Inspired by the [World Bank Atlas of Global Development](https://data360.worldbank.org/en/atlas/),
this site walks funders through nine scroll-driven chapters — from one classroom in Atlanta in 2015
to 3.79 million learners in 77 countries — combining narrative, animated data visualizations, and
real photos from ECP's reports.

## Chapters

1. **Hero** — a particle field that assembles into ECP's seal, with a live learner counter
2. **The Gap** — thousands of food decisions, zero lessons
3. **The Spark** — the 2015→2026 growth curve with milestone scrollytelling
4. **A World of Classrooms** — an interactive world map lighting up 77 countries by region
5. **But Does It Work?** — the University of Edinburgh real-food-choice experiment, told step by step
6. **The Ripple** — CO₂ prevented every year, with tangible equivalents
7. **Voices** — verbatim learner and educator quotes from follow-up surveys
8. **Radical Stewardship** — where a donated dollar goes (animated donut, trust badges)
9. **Your Chapter** — donation tiers and calls to action

## Tech stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) with ECP brand tokens (navy `#081F52`, gold `#F5A200`, Aileron typeface)
- [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) for smooth scroll and animation
- [D3](https://d3js.org/) (geo/shape/scale) + [world-atlas](https://github.com/topojson/world-atlas) for charts and the map
- [react-i18next](https://react.i18next.com/) for the EN/ES toggle (persisted in `localStorage`)

Accessibility: a "reduce motion" toggle in the footer (also honors `prefers-reduced-motion`)
renders all charts and content statically.

## Data sources

Every number displayed is defined in [`src/data/impact.ts`](src/data/impact.ts) with a
comment citing its source:

- ECP **2024 Annual Report**
- ECP **2025 Impact Report**
- ECP **Q1 2026 Report**
- [ecprogram.org](https://www.ecprogram.org/) (live counters, country list, CO₂ estimate)

The 2015–2023 points of the growth curve are a visual reconstruction anchored to reported
figures (2024: 3,544,690 · 2026: 3,795,144); reconstructed points are flagged `approx: true`
and drawn differently in the chart. Donation tier equivalences are estimates derived from
Q1 2026 expenses divided by reported learners (~$8.78/learner).

Photos are extracted from ECP's public reports. This is an independent data-storytelling
experience built with publicly available ECP impact data.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build
```

## Deployment

The repo includes a `netlify.toml`; connecting the GitHub repository to
[Netlify](https://www.netlify.com/) will build with `npm run build` and publish `dist/`
automatically. No environment variables required.

## Languages

English is the default; the toggle in the top-right switches to Spanish instantly.
All copy lives in [`src/i18n/en.json`](src/i18n/en.json) and [`src/i18n/es.json`](src/i18n/es.json).
