# enzoftware.github.io

Personal portfolio of **Enzo Lizama Paredes** — Senior Mobile Engineer (Flutter & Android).

A full-bleed, single-screen (on desktop) layout: no boxed cards, a big
`hi@enzoftware.dev` contact CTA, and a glass activity panel (GitHub activity,
current role, latest Substack post) sitting next to the name.

## Stack

- [Astro 7](https://astro.build) — static site generator
- [Bun](https://bun.sh) — runtime & package manager
- [React 19](https://react.dev) — interactive components
- [TypeScript ~6.0](https://www.typescriptlang.org) — strict mode (pinned below 7 for now, an `astro-check` compatibility issue)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` — styling
- [Framer Motion](https://www.framer.com/motion/) — animations (entrance staggers, scroll reveals, the experience modal)
- [PostHog](https://posthog.com) — analytics (optional)
- [ESLint ~9](https://eslint.org) / [Prettier](https://prettier.io) — linting & formatting (ESLint pinned below 10, `eslint-plugin-react` doesn't support it yet)

## Getting started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type-check (astro sync + astro-check)
bun run check

# Lint
bun run lint

# Format
bun run format

# Check formatting without writing
bun run format:check
```

CI (`.github/workflows/ci.yml`) runs `format:check`, `lint`, `check`, and `build` on every push and pull request.

## Layout

Desktop (`lg:` and up) is a single viewport with no vertical scroll — `html`/`body`
are pinned to `100dvh` and the page shell is a flex column so the top bar, hero,
and contact bar all fit on screen at once. Mobile scrolls normally, in this order:
hero → activity panel → contact (always last).

The hero and the activity panel share a two-column grid weighted toward the name
(`grid-cols-[1fr_320px]`) so the name dominates. The activity panel is glass-styled
and holds three rows: recent GitHub activity, the current role (click to open the
full experience history as a modal), and the latest Substack post (with a brief
shimmer-skeleton reveal). The contact section is a flat, compact bar — headline on
the left, the email button on the right — with the footer folded into the same
background so there's no color seam at the bottom of the page.

## Analytics (PostHog)

1. Create a free project at [posthog.com](https://posthog.com) (US or EU
   cloud) and copy its API key.

2. Copy the example env file and fill it in:

   ```bash
   cp .env.example .env
   ```

   ```
   PUBLIC_POSTHOG_KEY=phc_your_project_api_key
   PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

   If the key is missing or left as the placeholder, analytics are silently
   skipped. To go live in production, add `PUBLIC_POSTHOG_KEY` as a GitHub
   Actions **repository secret** and `PUBLIC_POSTHOG_HOST` as a repository
   **variable** (Settings → Secrets and variables → Actions) — the deploy
   workflow (`.github/workflows/deploy.yml`) reads both into the build.

3. What gets tracked, all on PostHog's free tier:
   - **Country** — GeoIP-derived from the visitor's IP, automatic.
   - **Source** — `document.referrer` and `utm_source` are classified into a
     friendly label (LinkedIn, X, Medium, Substack, GitHub, Search, Direct,
     Other) by `src/lib/analyticsSource.ts` and attached to every event.
   - **Every click** — PostHog's autocapture tracks all clicks automatically
     (feeds the **Heatmaps** tab with no setup); a handful of meaningful
     actions are also sent as named events via a `data-track="..."`
     attribute (e.g. `contact_email_click`, `social_click`) so they're easy
     to build funnels/insights on.

4. To see who reached out via email, and where they came from: in PostHog,
   open **Persons** and filter "performed event `contact_email_click`" to
   see each visitor's country and source, or build a **Trends** insight on
   that event broken down by `source` (or `$geoip_country_name`). Use
   **Session Replay** to watch what a visitor did before converting (enable
   it under Project Settings → Session replay if it isn't already on).

## GitHub API & Substack feed

Profile avatar and recently-pushed repositories (for the activity panel) are
fetched from the GitHub API at **build time** — no client-side requests. Forks
and repos listed in `src/data/excluded-repos.json` are filtered out, and the
result is capped to the 3 most recently pushed repos. The latest Substack post
is fetched the same way, from the account's RSS feed. If either fetch fails or
is unreachable during build, sensible defaults (or an empty state) are used
automatically.

## Project structure

```
src/
├── components/
│   ├── TopBar.tsx              # Sticky glass bar: avatar mark + language toggle
│   ├── HeroCard.tsx            # Name, bio, badges, socials
│   ├── SocialsRow.tsx          # Icon-only social links
│   ├── ActivityStack.tsx       # Glass panel: GitHub activity, current role, latest post
│   ├── ExperienceModal.tsx     # Full experience history, opened from ActivityStack
│   ├── ContactCTA.tsx          # Flat contact bar + email CTA + footer
│   └── Analytics.tsx           # Mixpanel integration
├── content/
│   ├── experience/             # One JSON file per job (company, role, period, ...)
│   └── socials/                # One JSON file per social link
├── content.config.ts           # Astro content collection schemas
├── data/
│   └── excluded-repos.json     # Repo names hidden from the activity panel
├── i18n/
│   └── translations.ts         # UI copy strings (en/es)
├── lib/
│   └── relativeTime.ts         # "2 days ago"-style formatting helper
├── layouts/
│   └── Layout.astro            # Base HTML, fonts, OG tags, no-scroll shell
├── pages/
│   └── index.astro             # Entry point, loads content collections + GitHub/Substack fetch
└── styles/
    └── global.css              # Tailwind + base theme tokens
public/
└── favicon.svg                 # Custom SVG favicon
```

## Deployment

The site outputs static files to `dist/` and can be deployed to any static host. `.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically on every push to `master`.
