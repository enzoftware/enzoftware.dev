---
name: ship-ui-feature
description: Use whenever adding a new UI feature, component, or interactive element, or refactoring existing UI, in this repository. Ensures analytics, i18n, theming, accessibility, and tests are never an afterthought.
---

# Ship a UI Feature or Refactor

## Overview

This is the "definition of done" for any change that adds, moves, or restructures UI in `enzoftware.dev` — a new section, a new modal, a new button, or a refactor of an existing component. It exists because it's easy to ship the visible feature and quietly skip the surrounding requirements (analytics, translations, tests) that don't show up in a screenshot.

Treat every item below as part of the feature, not a follow-up task. If an item doesn't apply, say so explicitly (e.g. "no new interactive elements, analytics N/A") rather than silently skipping it.

This skill orchestrates the repo's other guidelines — it doesn't replace them:

- Analytics mechanics → `add-analytic-event` skill + [`docs/analytics.md`](../../../docs/analytics.md)
- PR process → `create-pr` skill
- Architectural invariants (layout, i18n, theming) → [`AGENTS.md`](../../../AGENTS.md)

---

## Checklist

### 1. Analytics — every new interactive element gets a `data-track` event

This is the item most likely to get skipped, because the feature "works" without it.

- [ ] Every new button, link, or clickable card that represents a meaningful user action has `data-track="<event_name>"` (snake_case, `<subject>_<action>`), plus any useful `data-*` context (e.g. `data-repo`, `data-project`).
- [ ] If an existing event's meaning changed (e.g. it now fires on different data, or a row was renamed), decide whether to keep the name or rename it — don't let the name silently drift from what it tracks.
- [ ] `docs/analytics.md`'s Event Catalog is updated: new events added under the right section, renamed/removed events noted in the "Renamed or removed events" table so historical PostHog data stays interpretable.
- [ ] Non-click interactions (modal opens on mount, timers, form submits) use `posthog.capture(...)` directly — see `add-analytic-event` for the pattern.

Full mechanics, naming conventions, and common mistakes: use the `add-analytic-event` skill.

### 2. i18n — no hardcoded user-facing strings

- [ ] Every visible string is a key in `src/i18n/translations.ts`, defined in **both** `en` and `es` in the same change (never add one language and leave the other stale).
- [ ] `data-track` values and `data-*` attribute values are internal telemetry, not translations — keep those in English snake_case, not through `translations.ts`.

### 3. Theming

- [ ] Colors use CSS theme variables / Tailwind tokens (`text-ink`, `bg-surface`, `border-border`, `text-dot-*`, etc.), never hardcoded hex values, so the component works in both light and dark themes.
- [ ] If you introduce a genuinely new color, add it as a `--color-*` variable in `src/styles/global.css` (both theme blocks) and register it in `tailwind.config.mjs`, rather than reaching for an arbitrary Tailwind color.

### 4. Layout & accessibility

- [ ] Desktop (`lg:`+) layout still fits in `100dvh` with no vertical scroll, if the changed section is part of the main layout.
- [ ] Interactive elements (especially icon-only buttons or small chips) meet a ~24×24px minimum touch target (WCAG 2.5.8) — pad small chips rather than leaving them cramped.
- [ ] Focus order and keyboard reachability still make sense after the change — if you added a new interactive row, walk through it with Tab.
- [ ] Run `bun run test:a11y` if any component or template was touched; fix any new axe violations rather than excluding them.

### 5. Tests

- [ ] Add or update a test for the actual behavior that changed — not just a smoke test that the page renders. If you fixed a bug, add a regression test that would have caught it (see `tests/a11y.spec.ts`'s `last:pb-0` spacing test for an example of testing the specific mechanism that broke).
- [ ] Prefer `tests/unit/*.test.ts` (bun:test) for pure logic or content-data invariants, and Playwright specs under `tests/*.spec.ts` for anything requiring a rendered page.

### 6. Ship it

Once the above is done, follow the `create-pr` skill: run the full verification suite (`bun run check && bun run lint && bun run format:check && bun run build && bun run test:a11y`), fill out the PR template's Architectural Invariants Check (including the **Analytics** checkbox), and open the PR.

---

## Why this exists

A UI redesign can add a dozen new interactive elements in one PR. It's easy to wire up the ones you're actively testing by hand and forget the rest — a "See all X" link added late, a fallback link path, a chip that only renders for certain data. Each of those is a real conversion signal missing from analytics, or a screen reader trap, or a string that never got translated. This checklist exists so that verification, not memory, is what catches it.
