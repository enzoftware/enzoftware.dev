---
name: add-analytic-event
description: Use when adding, updating, or testing custom analytics events, click tracking attributes, or PostHog capture points in the portfolio.
---

# Add Analytic Event

## Overview

Analytics in this repository is powered by [PostHog](https://posthog.com). The application uses a declarative DOM event delegation architecture in `src/components/Analytics.tsx`, allowing interactive elements to track conversion events by simply declaring `data-track` and `data-*` attributes.

---

## Tracking Patterns

### 1. Declarative Click Tracking (Preferred)

Used for user clicks on buttons, links, or cards. A single document-level click listener in `src/components/Analytics.tsx` intercepts clicks on any element matching `[data-track]` (or child elements thereof via `.closest('[data-track]')`), extracts all accompanying `data-*` attributes, and dispatches them to PostHog:

```tsx
<a href={social.url} data-track="social_click" data-platform={social.label}>
  ...
</a>
```

When clicked, this sends:

- **Event Name**: `"social_click"`
- **Payload**: `{ platform: "GitHub" }` (the `data-` prefix is automatically stripped)

### 2. Programmatic Event Tracking

Used for non-click interactions (e.g., modal opens, timer triggers, form submissions, state transitions) where an element click does not directly trigger the event:

```tsx
import posthog from "posthog-js";

posthog.capture("experience_modal_opened", {
  role: item.role,
  company: item.company,
});
```

---

## Step-by-Step Procedure to Add a New Event

### Step 1: Choose the Event Name & Properties

1. Follow the `snake_case` naming convention: `<subject>_<action>` (e.g., `theme_toggle_click`, `language_toggle_click`, `experience_modal_open`).
2. Identify contextual properties that provide actionable funnel insight (e.g., `theme`, `lang`, `source`, `repo`, `platform`).
3. Keep attribute names lowercase or kebab-case because HTML attributes are case-insensitive.

### Step 2: Implement the Tracking Attributes

Add `data-track` and any payload attributes to the interactive JSX or Astro element:

```tsx
// Example: Tracking language toggle
<button
  type="button"
  onClick={toggleLang}
  data-track="language_toggle_click"
  data-from-lang={currentLang}
  data-to-lang={nextLang}
  aria-label="Toggle language"
>
  {nextLang.toUpperCase()}
</button>
```

> [!IMPORTANT]
>
> - Ensure interactive elements remain accessible: include `aria-label`, correct button/link semantics, and keyboard focus styling.
> - Attribute values must be strings. If passing boolean or numerical values, convert them to strings (e.g., `String(item.order)`).

### Step 3: Document the Event in `docs/analytics.md`

Every event must be recorded in [`docs/analytics.md`](../../../docs/analytics.md). Add a row to the Events Catalog table:

| Event Name              | Trigger                    | Properties             | Example Location            |
| :---------------------- | :------------------------- | :--------------------- | :-------------------------- |
| `language_toggle_click` | Clicking language switcher | `from-lang`, `to-lang` | `src/components/TopBar.tsx` |

### Step 4: Verify and Validate

Run the validation suite to ensure no TypeScript or linting regressions:

```bash
# 1. Typecheck
bun run check

# 2. Lint check
bun run lint

# 3. Format
bun run format:check
```

---

## Existing Events Quick Reference

| Event Name                  | Trigger Location                     | Custom Properties | Purpose                                           |
| :-------------------------- | :----------------------------------- | :---------------- | :------------------------------------------------ |
| `social_click`              | `src/components/SocialsRow.tsx`      | `platform`        | Tracks which social profiles visitors navigate to |
| `contact_email_click`       | `src/components/ContactCTA.tsx`      | none              | Tracks email link clicks (key conversion goal)    |
| `recent_activity_click`     | `src/components/ActivityStack.tsx`   | `repo`            | Tracks clicks on recent GitHub repositories       |
| `latest_post_click`         | `src/components/ActivityStack.tsx`   | `source`          | Tracks clicks on blog posts (Substack, Medium)    |
| `linkedin_experience_click` | `src/components/ExperienceModal.tsx` | none              | Tracks outbound LinkedIn link from the modal      |

---

## Common Mistakes & Anti-Patterns

- ❌ **Using camelCase for data attributes in JSX**: `data-targetTheme="light"` becomes `data-targettheme` in the DOM. Use kebab-case: `data-target-theme="light"`.
- ❌ **Wrapping child elements without delegation in mind**: The event listener uses `target.closest("[data-track]")`. If `data-track` is placed on a parent container, clicks on any inner SVGs, spans, or icons will resolve to the parent container correctly. Avoid placing conflicting `data-track` attributes on nested parent and child elements.
- ❌ **Forgetting to document the event**: Undocumented events create blind spots in team analytics. Always update `docs/analytics.md`.
- ❌ **Hardcoding strings in visible UI copy**: Remember that visible labels must use `src/i18n/translations.ts`, while `data-track` attribute values are internal telemetry strings and should remain in English snake_case.
