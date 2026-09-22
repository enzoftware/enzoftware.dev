# AI Agent Guidelines: enzoftware.dev

Welcome to the **enzoftware.dev** repository. This document defines the operational rules, architectural invariants, and verification standards that all AI agents must follow when working in this codebase.

---

## 1. Project & Stack Overview

`enzoftware.dev` is the personal portfolio of **Enzo Lizama Paredes** (Senior Software Engineer).

- **Runtime & Package Manager**: [Bun](https://bun.sh)
- **Static Site Generator**: [Astro 7](https://astro.build)
- **UI Framework**: [React 19](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org) (strict mode via `astro/tsconfigs/strictest`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`, CSS theme variables in `src/styles/global.css`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Analytics**: [PostHog](https://posthog.com) (via `posthog-js` with declarative DOM tracking)
- **Accessibility & Testing**: [Playwright](https://playwright.dev) + [axe-core](https://github.com/dequelabs/axe-core)
- **Code Quality**: [ESLint](https://eslint.org) + [Prettier](https://prettier.io)

---

## 2. Core Architectural Invariants

Every agent must respect the following core design invariants:

### 2.1 Single-Screen Desktop Layout (No Scroll)

- On desktop viewports (`lg:` and up), `html` and `body` are strictly constrained to `100dvh` with `overflow-y: hidden`.
- The entire page (TopBar, HeroCard, ActivityStack, and ContactCTA) **must fit completely on one screen** without vertical scrolling.
- Never add excessive padding, margin, or unconstrained element heights that force overflow or introduce a scrollbar on `lg:` viewports.
- On mobile/tablet viewports (`< lg`), the page scrolls naturally in DOM order: HeroCard → ActivityStack → ContactCTA (always last).

### 2.2 Strict Internationalization (i18n)

- **Never hardcode user-facing strings** directly inside Astro layouts, pages, or React components.
- All visible UI copy must be defined in `src/i18n/translations.ts` under both `en` (English) and `es` (Spanish) dictionaries.
- When adding new UI elements, define keys in both languages simultaneously.

### 2.3 Theme Architecture

- Theme state is managed via `useSyncExternalStore` in `src/lib/theme.ts`.
- Themes ("dark" and "light") are applied via the `data-theme` attribute on `<html>` (`:root[data-theme="light"]` in `src/styles/global.css`).
- Use CSS theme variables (`var(--color-bg)`, `var(--color-ink)`, `var(--color-accent)`, etc.) or Tailwind theme utility classes (`bg-canvas`, `text-ink`, etc.). Never use raw, hardcoded hex colors for themed elements.
- An inline blocking script in `src/layouts/Layout.astro` evaluates the theme before paint to prevent flashes of unstyled content (FOUC). Do not remove or alter this execution sequence.

### 2.4 Content Collections

- Experience items live in `src/content/experience/` as JSON files conforming to the schema in `src/content.config.ts`.
  - Exactly **one** experience item must have `"current": true`.
  - Accent colors must use one of `"dot-1"`, `"dot-2"`, `"dot-3"`, `"dot-4"`, or `"dot-5"`.
- Social links live in `src/content/socials/` as JSON files.
  - The `"label"` must match an existing key in `icons` in `src/components/SocialsRow.tsx`.
- Hidden repositories are configured in `src/data/excluded-repos.json`.

### 2.5 Analytics via PostHog

- Analytics tracking is handled via declarative DOM attributes (`data-track="..."`) managed by global event delegation in `src/components/Analytics.tsx`.
- Follow the workflow defined in the `add-analytic-event` skill and documented in `docs/analytics.md`.

---

## 3. TypeScript & Code Quality Rules

Agents must strictly comply with `.agents/rules/typescript.md`:

- **Zero `any`**: Do not use `any`. Use `unknown` with type narrowing, proper union types, or explicit interfaces.
- **Type-Only Imports**: Use `import type { ... }` when importing types, interfaces, or type signatures to keep runtime bundles clean.
- **Component Typing**: Write standard function components with typed props interfaces (`interface Props`). Avoid `React.FC`.
- **Null Safety**: Avoid non-null assertions (`!`) unless proven by preceding checks or type narrowing.

---

## 4. Verification Checklist

Before declaring any task complete, agents **must run and verify** all relevant check commands:

```bash
# 1. Type check (Astro sync + astro-check)
bun run check

# 2. Lint check
bun run lint

# 3. Formatting check
bun run format:check

# 4. Production build check
bun run build

# 5. Accessibility check (when modifying UI components)
bun run test:a11y
```

Evidence before assertions: Always run the commands, observe the output, and fix any errors or warnings before reporting success.

---

## 5. Agent Customizations Catalog

- **Rules**:
  - [`.agents/rules/typescript.md`](./.agents/rules/typescript.md) — TypeScript implementation and validation rules.
  - [`.agents/rules/solid-fetching.md`](./.agents/rules/solid-fetching.md) — Clean architecture, SRP, and error telemetry for data fetching.
- **Skills**:
  - [`.agents/skills/add-analytic-event/SKILL.md`](./.agents/skills/add-analytic-event/SKILL.md) — How to add, implement, test, and document PostHog analytic events.
  - [`.agents/skills/create-pr/SKILL.md`](./.agents/skills/create-pr/SKILL.md) — Workflow for opening pull requests following the project PR template.
- **Templates & References**:
  - [`.github/pull_request_template.md`](./.github/pull_request_template.md) — Standard PR template with invariant and verification checklists.
  - [`docs/analytics.md`](./docs/analytics.md) — Analytics events reference and tracking architecture.
