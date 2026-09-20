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

## Analytics (Mixpanel)

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Fill in your Mixpanel project token:

   ```
   PUBLIC_MIXPANEL_TOKEN=your_token_here
   ```

   If the token is missing or set to the placeholder value, analytics are silently skipped.

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
