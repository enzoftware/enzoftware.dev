# enzoftware.dev

[![Checks](https://github.com/enzoftware/enzoftware.dev/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/enzoftware/enzoftware.dev/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/enzoftware/enzoftware.dev/actions/workflows/deploy.yml/badge.svg)](https://github.com/enzoftware/enzoftware.dev/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-enzoftware.dev-569cd6)](https://enzoftware.dev)

Personal portfolio of **Enzo Lizama Paredes** — Senior Software Engineer.
Live at [enzoftware.dev](https://enzoftware.dev).

A full-bleed, single-screen (on desktop) layout: no boxed cards, a big
`hi@enzoftware.dev` contact CTA, and a glass activity panel (GitHub activity,
current role, latest Substack post) sitting next to the name. Dark/light
theme toggle in the VS Code "Modern" palettes.

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Updating content](#updating-content)
- [Analytics (PostHog)](#analytics-posthog)
- [AI Agent Guidelines](#ai-agent-guidelines)
- [Deployment](#deployment)

## Stack

- [Astro 7](https://astro.build) — static site generator
- [Bun](https://bun.sh) — runtime & package manager
- [React 19](https://react.dev) — interactive components
- [TypeScript ~6.0](https://www.typescriptlang.org) — strict mode (pinned below 7: `astro-check` doesn't support TS 7's native compiler yet)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` — styling, theme tokens as CSS custom properties in `src/styles/global.css`
- [Framer Motion](https://www.framer.com/motion/) — animations
- [PostHog](https://posthog.com) — analytics (optional, see below)
- [Playwright](https://playwright.dev) + [axe-core](https://github.com/dequelabs/axe-core) — accessibility tests
- [ESLint ~9](https://eslint.org) / [Prettier](https://prettier.io) — linting & formatting (ESLint pinned below 10: `eslint-plugin-react` doesn't support it yet)

## Getting started

```bash
bun install
bun dev              # dev server
bun run build        # production build
bun run preview      # preview the production build
bun run check        # astro sync + astro-check (type check)
bun run lint         # eslint
bun run format       # prettier --write
bun run format:check # prettier --check
bun run test:a11y    # playwright + axe-core accessibility scan
```

The **Checks** workflow (`.github/workflows/ci.yml`) runs all of the above
(except `dev`/`preview`) on every push and pull request.

## Project structure

```
src/
├── components/
│   ├── PortfolioGrid.tsx       # Top-level layout: TopBar + HeroCard + ActivityStack + ContactCTA
│   ├── TopBar.tsx              # Sticky glass bar: avatar mark, theme toggle, language toggle
│   ├── HeroCard.tsx            # Name, bio, badges, socials
│   ├── SocialsRow.tsx          # Icon-only social links
│   ├── ActivityStack.tsx       # Glass panel: current role, GitHub activity, latest post
│   ├── ExperienceModal.tsx     # Full experience history, opened from ActivityStack
│   ├── ContactCTA.tsx          # Flat contact bar + email CTA + footer
│   └── Analytics.tsx           # PostHog integration
├── content/
│   ├── experience/             # One JSON file per job — see "Updating content" below
│   └── socials/                # One JSON file per social link
├── content.config.ts           # Astro content collection schemas (source of truth for the JSON shape)
├── data/excluded-repos.json    # Repo names hidden from the activity panel
├── i18n/translations.ts        # UI copy strings (en/es) — every visible string lives here
├── lib/
│   ├── theme.ts                 # Dark/light theme store (useSyncExternalStore, see below)
│   ├── analyticsSource.ts       # referrer/UTM → friendly source label (LinkedIn, X, etc.)
│   └── relativeTime.ts          # "2 days ago"-style formatting
├── layouts/Layout.astro        # Base HTML, fonts, OG tags, no-scroll shell
├── pages/index.astro           # Entry point: loads content collections + GitHub/Substack fetch
└── styles/global.css           # Tailwind import + theme CSS custom properties
public/
├── CNAME                       # Custom domain for GitHub Pages
├── favicon.svg
└── og-image.png                # Social preview image
tests/
└── a11y.spec.ts                # Playwright + axe-core accessibility scan
```

## Architecture notes

- **No-scroll desktop layout**: at `lg:` and up, `html`/`body` are pinned to
  `100dvh` with `overflow-y: hidden` — the whole page (top bar, hero, contact
  bar) fits on one screen, no scrollbar. This is intentional; if you add
  content, re-check it still fits at common viewport heights. Mobile scrolls
  normally, in DOM order: hero → activity panel → contact (always last).
- **Theming**: colors are CSS custom properties (`--color-*` in
  `src/styles/global.css`), not hardcoded Tailwind values, so the dark/light
  toggle (`src/lib/theme.ts`, read via `useSyncExternalStore`) can flip them
  at runtime. A blocking inline script in `Layout.astro`'s `<head>` applies
  the saved/OS-preferred theme before first paint to avoid a flash.
- **i18n**: every UI string goes through `src/i18n/translations.ts` (en/es) —
  never hardcode text in a component.

## Updating content

- **Add/edit a job**: drop or edit a JSON file in `src/content/experience/`
  matching the shape in `content.config.ts` (`company`, `role`, `period`,
  `location`, `current`, `order`, `color`). Only one entry should have
  `current: true`. `color` is one of `dot-1`..`dot-5` (defined in
  `src/styles/global.css` / `tailwind.config.mjs`) — it colors both the
  entry's monogram avatar in the full-experience timeline and, for the three
  fixed dots in `ActivityStack`, the section indicator.
- **Add/edit a social link**: same idea in `src/content/socials/` (`label`,
  `url`, `order`). The label must match a key in the icon map in
  `SocialsRow.tsx` or it won't render an icon.
- **Hide a repo from the activity panel**: add its name to
  `src/data/excluded-repos.json`.

## Analytics (PostHog)

Optional. Create a free project at [posthog.com](https://posthog.com), copy
its API key, then `cp .env.example .env` and fill in `PUBLIC_POSTHOG_KEY` /
`PUBLIC_POSTHOG_HOST`. Missing or placeholder key → analytics are silently
skipped. For production, set both as a GitHub Actions repo **secret**
(`PUBLIC_POSTHOG_KEY`) and **variable** (`PUBLIC_POSTHOG_HOST`).

Country (GeoIP) and every click (autocapture) are tracked automatically;
`src/lib/analyticsSource.ts` classifies referrer/UTM into a friendly `source`
property; a few named events (`contact_email_click`, `social_click`, ...) via
`data-track="..."` attributes make funnels easy to build. To see who reached
out and where from: PostHog → **Persons**, filter "performed event
`contact_email_click`".

For full details on the event delegation model, the catalog of tracked events,
and how to create new events, see [`docs/analytics.md`](./docs/analytics.md).

## AI Agent Guidelines

This repository includes configuration, rules, and skills for autonomous AI
assistants:

- [`AGENTS.md`](./AGENTS.md) — Main instructions, architectural invariants (no-scroll desktop layout, i18n copy isolation, theme system), and verification workflows.
- [`.agents/rules/typescript.md`](./.agents/rules/typescript.md) — TypeScript implementation and type-safety rules.
- [`.agents/skills/add-analytic-event/SKILL.md`](./.agents/skills/add-analytic-event/SKILL.md) — Agent skill for creating, testing, and documenting PostHog analytic events.
- [`.agents/skills/create-pr/SKILL.md`](./.agents/skills/create-pr/SKILL.md) — Agent skill for creating standardized PRs following the PR template.
- [`.github/pull_request_template.md`](./.github/pull_request_template.md) — Pull request template with invariant and verification checklists.

## Deployment

Deployed to **GitHub Pages** at the custom domain `enzoftware.dev`
(`public/CNAME` + the domain configured in repo Settings → Pages), via two
workflows:

- `.github/workflows/ci.yml` ("**Checks**") — lint, format, type-check, build,
  a11y tests. Runs on every push/PR to `main`.
- `.github/workflows/deploy.yml` ("**Deploy to GitHub Pages**") — builds and
  deploys, but **only after Checks passes on `main`** (triggers on that
  workflow's completion, not on push directly — keep both files' branch
  filters in sync if the default branch ever changes). Can also be run
  manually from the Actions tab.

**Required repo configuration** (Settings → Secrets and variables → Actions):

| Name                  | Kind     | Used for                         |
| --------------------- | -------- | -------------------------------- |
| `PUBLIC_POSTHOG_KEY`  | Secret   | PostHog analytics (optional)     |
| `PUBLIC_POSTHOG_HOST` | Variable | PostHog ingestion region (US/EU) |

**⚠️ Not yet enforced — last call before this bites us**: `main` currently
has no branch protection, so a push straight to `main` skips Checks entirely
and can still trigger a deploy. Turn it on in Settings → Branches → Add
branch protection rule for `main`:

- Require status checks to pass before merging → select
  "Lint, typecheck, build & a11y" (from `ci.yml`).
- Require a pull request before merging (optional, but recommended solo-repo
  hygiene: catches force-pushes and lets Checks actually gate the merge).

This is a manual GitHub UI setting — no workflow file can turn it on.
