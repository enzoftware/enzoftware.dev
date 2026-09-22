# Analytics Documentation (PostHog)

This document provides a comprehensive guide to the analytics architecture, event tracking patterns, and the catalog of tracked conversion events in **enzoftware.dev**.

---

## 1. Architecture & Overview

The site uses [PostHog](https://posthog.com) via `posthog-js` for user analytics, traffic attribution, and conversion funnel tracking.

### 1.1 Initialization

PostHog is initialized inside `src/components/Analytics.tsx` with:

- **`person_profiles: "always"`**: Ensures anonymous visitors have full person profiles with GeoIP and source attribution in PostHog Persons and Trends.
- **`defaults: "2025-05-24"`**: Configures standard modern PostHog autocapture and tracking defaults.
- **Traffic Source Attribution**: `posthog.register({ source: classifySource(...) })` uses `src/lib/analyticsSource.ts` to inspect `document.referrer` and UTM parameters, assigning friendly source labels (e.g., LinkedIn, X, GitHub, Google, Direct).

### 1.2 Declarative Event Delegation

Rather than scattering explicit `posthog.capture()` calls across components, click tracking for key conversion events is handled declaratively via a single document-level click listener in `src/components/Analytics.tsx`:

```typescript
const handleClick = (e: MouseEvent) => {
  const target = (e.target as HTMLElement).closest("[data-track]");
  if (!target) return;

  const eventName = target.getAttribute("data-track");
  if (!eventName) return;

  const attrs: Record<string, string> = {};
  for (const attr of Array.from(target.attributes)) {
    if (attr.name.startsWith("data-") && attr.name !== "data-track") {
      attrs[attr.name.replace("data-", "")] = attr.value;
    }
  }

  posthog.capture(eventName, attrs);
};
```

Any interactive element with `data-track="<event_name>"` will automatically capture the event along with any other `data-*` attributes formatted as properties.

---

## 2. Event Catalog

The table below catalogs all named conversion events currently tracked in the application:

| Event Name                  | Trigger                                                                       | Properties Captured                                                                    | Component Location                   |
| :-------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :----------------------------------- |
| `social_click`              | Visitor clicks a social media icon in the hero                                | `platform`: Social network name (e.g. `GitHub`, `LinkedIn`, `X`, `Substack`, `Medium`) | `src/components/SocialsRow.tsx`      |
| `contact_email_click`       | Visitor clicks the main `hi@enzoftware.dev` email link                        | None                                                                                   | `src/components/ContactCTA.tsx`      |
| `recent_activity_click`     | Visitor clicks on a recent GitHub repository in the activity stack            | `repo`: Repository name (e.g. `enzoftware.dev`)                                        | `src/components/ActivityStack.tsx`   |
| `latest_post_click`         | Visitor clicks on the latest blog article link in the activity stack          | `source`: Publication source (e.g. `Substack`, `Medium`)                               | `src/components/ActivityStack.tsx`   |
| `linkedin_experience_click` | Visitor clicks the external LinkedIn link inside the experience details modal | None                                                                                   | `src/components/ExperienceModal.tsx` |
| `article_click`             | Visitor clicks an article in the latest articles modal                        | `source`: Publication source, `title`: Article title                                   | `src/components/ArticlesModal.tsx`   |

---

## 3. How to Add a New Event

Follow these steps or use the `.agents/skills/add-analytic-event` skill:

### 3.1 Declarative Click Event

1. Choose a snake_case event name: `<feature>_<action>` (e.g. `theme_toggle_click`).
2. Add `data-track="<event_name>"` to the button, link, or clickable element.
3. Attach contextual metadata using `data-<property_name>="<value>"`.

Example:

```tsx
<button
  type="button"
  data-track="theme_toggle_click"
  data-target-theme={theme === "dark" ? "light" : "dark"}
  onClick={handleToggleTheme}
>
  Toggle Theme
</button>
```

### 3.2 Programmatic Event

For non-click interactions (e.g. modal open, scroll threshold, form submission):

```tsx
import posthog from "posthog-js";

posthog.capture("experience_modal_open", {
  role: "Senior Software Engineer",
  company: "Somnio Software",
});
```

### 3.3 Update Documentation

Always update the **Event Catalog** table in this file when creating or updating events.

---

## 4. Local Testing & Verification

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your test PostHog credentials:

   ```env
   PUBLIC_POSTHOG_KEY=phc_test_1234567890
   PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

   > [!NOTE]
   > `src/components/Analytics.tsx` guards against unconfigured environments with `apiKey.startsWith("phc_your_")`. Ensure your test key does not begin with `phc_your_` so that `posthog.init` executes.

3. Start the dev server with `bun dev` and inspect browser network traffic:
   - Filter for `posthog` or `batch` requests.
   - Click tracked elements and verify the payload contains the expected event name and data attributes.

4. Run project validation checks:

   ```bash
   bun run check && bun run lint && bun run format:check && bun run build
   ```
