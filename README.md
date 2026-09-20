# enzoftware.github.io

Personal portfolio of **Enzo Lizama Paredes** — Senior Mobile Engineer (Flutter & Android).

## Stack

- [Astro 7](https://astro.build) — static site generator
- [Bun](https://bun.sh) — runtime & package manager
- [React 19](https://react.dev) — interactive components
- [TypeScript ~6.0](https://www.typescriptlang.org) — strict mode (pinned below 7 for now, an `astro-check` compatibility issue)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Mixpanel](https://mixpanel.com) — analytics (optional)
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

## Analytics (Mixpanel)

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Fill in your Mixpanel project token:

   ```
   PUBLIC_MIXPANEL_TOKEN=YOUR_MIXPANEL_TOKEN
   ```

   If the token is missing or set to the placeholder value, analytics are silently skipped.

## GitHub API

Profile avatar and recently-pushed repositories (for the "working on" chip) are
fetched from the GitHub API at **build time** — no client-side requests. Forks
and repos listed in `src/data/excluded-repos.json` are filtered out, and the
result is capped to the 3 most recently pushed repos. If the API is
unreachable during build, sensible defaults are used automatically.

## Project structure

The site is a minimal, name-led layout: a hero with the name/bio, an experience
timeline, and a few floating chips (current job, socials, working-on, contact).
Experience entries and social links live as Astro content collections instead
of being hardcoded.

```
src/
├── components/
│   ├── PortfolioGrid.tsx      # Top-level layout orchestrator
│   ├── HeroCard.tsx           # Name, bio, intro copy
│   ├── ExperienceCard.tsx     # Work history timeline
│   ├── CurrentJobChip.tsx     # Floating "currently at" chip
│   ├── WorkingOnCard.tsx      # Floating chip of recent GitHub activity
│   ├── SocialsCarousel.tsx    # GitHub, LinkedIn, X, Medium, Substack
│   ├── ContactChip.tsx        # Floating email CTA
│   └── Analytics.tsx          # Mixpanel integration
├── content/
│   ├── experience/            # One JSON file per job (company, role, period, ...)
│   └── socials/                # One JSON file per social link
├── content.config.ts          # Astro content collection schemas
├── data/
│   └── excluded-repos.json    # Repo names hidden from "working on"
├── i18n/
│   └── translations.ts        # UI copy strings
├── lib/
│   └── relativeTime.ts        # "2 days ago"-style formatting helper
├── layouts/
│   └── Layout.astro           # Base HTML, fonts, OG tags
├── pages/
│   └── index.astro            # Entry point, loads content collections + GitHub API fetch
└── styles/
    └── global.css             # Tailwind styles
public/
└── favicon.svg                # Custom SVG favicon
```

## Deployment

The site outputs static files to `dist/` and can be deployed to any static host. `.github/workflows/deploy.yml` already builds and deploys to GitHub Pages automatically on every push to `master`.
