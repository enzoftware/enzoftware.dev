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

The table below catalogs all named conversion events currently tracked in the application, grouped by the section of the page they live in.

### Hero

| Event Name     | Trigger                                        | Properties Captured                                                                    | Component Location              |
| :------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------- | :------------------------------ |
| `social_click` | Visitor clicks a social media icon in the hero | `platform`: Social network name (e.g. `GitHub`, `LinkedIn`, `X`, `Substack`, `Medium`) | `src/components/SocialsRow.tsx` |

### Activity stack — "Currently at"

| Event Name                     | Trigger                                                                                                   | Properties Captured | Component Location                 |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------ | :--------------------------------- |
| `current_role_link_web`        | Company name click, when the current role has no App/Play Store links (falls back to the company website) | None                | `src/components/ActivityStack.tsx` |
| `current_role_link_app_store`  | App Store chip click for the current role                                                                 | None                | `src/components/ActivityStack.tsx` |
| `current_role_link_play_store` | Google Play chip click for the current role                                                               | None                | `src/components/ActivityStack.tsx` |
| `current_role_cta`             | "View full experience (N) →" click — opens the Full Experience modal                                      | None                | `src/components/ActivityStack.tsx` |

### Activity stack — "Article author"

| Event Name             | Trigger                                                        | Properties Captured                                  | Component Location                 |
| :--------------------- | :------------------------------------------------------------- | :--------------------------------------------------- | :--------------------------------- |
| `latest_article_click` | Click on the most recent article across Medium/Substack/Kodeco | `source`: Publication source (e.g. `Medium`)         | `src/components/ActivityStack.tsx` |
| `author_row_cta`       | "See all articles →" click — opens the Articles modal          | None                                                 | `src/components/ActivityStack.tsx` |
| `article_click`        | Click on an article inside the Articles modal                  | `source`: Publication source, `title`: Article title | `src/components/ArticlesModal.tsx` |

### Activity stack — "Speaker"

| Event Name              | Trigger                                                        | Properties Captured | Component Location                 |
| :---------------------- | :------------------------------------------------------------- | :------------------ | :--------------------------------- |
| `speaking_row_cta`      | "See all talks →" click — opens the Speaking modal             | None                | `src/components/ActivityStack.tsx` |
| `speaking_watch_click`  | Click on a talk's "Watch Recording" link in the Speaking modal | `talk`: Talk title  | `src/components/SpeakingModal.tsx` |
| `speaking_slides_click` | Click on a talk's "View Slides" link in the Speaking modal     | `talk`: Talk title  | `src/components/SpeakingModal.tsx` |

### Activity stack — "Featured project"

| Event Name                        | Trigger                                               | Properties Captured      | Component Location                 |
| :-------------------------------- | :---------------------------------------------------- | :----------------------- | :--------------------------------- |
| `featured_project_link_web`       | "Visit Website" chip click                            | `project`: Project title | `src/components/ActivityStack.tsx` |
| `featured_project_link_appStore`  | "App Store" chip click                                | `project`: Project title | `src/components/ActivityStack.tsx` |
| `featured_project_link_playStore` | "Google Play" chip click                              | `project`: Project title | `src/components/ActivityStack.tsx` |
| `featured_project_link_github`    | "View GitHub" chip click                              | `project`: Project title | `src/components/ActivityStack.tsx` |
| `projects_row_cta`                | "See all projects →" click — opens the Projects modal | None                     | `src/components/ActivityStack.tsx` |
| `project_link_web`                | "Visit Website" click inside the Projects modal       | `project`: Project title | `src/components/ProjectsModal.tsx` |
| `project_link_app_store`          | "App Store" click inside the Projects modal           | `project`: Project title | `src/components/ProjectsModal.tsx` |
| `project_link_play_store`         | "Google Play" click inside the Projects modal         | `project`: Project title | `src/components/ProjectsModal.tsx` |
| `project_link_github`             | "View GitHub" click inside the Projects modal         | `project`: Project title | `src/components/ProjectsModal.tsx` |

### Activity stack — "Open source contributor"

| Event Name                       | Trigger                                      | Properties Captured     | Component Location                 |
| :------------------------------- | :------------------------------------------- | :---------------------- | :--------------------------------- |
| `opensource_top_repo_click`      | Click on a repo in the "Most starred" list   | `repo`: Repository name | `src/components/ActivityStack.tsx` |
| `opensource_latest_commit_click` | Click on a repo in the "Latest commits" list | `repo`: Repository name | `src/components/ActivityStack.tsx` |

### Full Experience modal

| Event Name                   | Trigger                                                                       | Properties Captured     | Component Location                   |
| :--------------------------- | :---------------------------------------------------------------------------- | :---------------------- | :----------------------------------- |
| `experience_link_web`        | Company name click for a past role, when it has no App/Play Store links       | None                    | `src/components/ExperienceModal.tsx` |
| `experience_link_app_store`  | App Store chip click for a past role                                          | `company`: Company name | `src/components/ExperienceModal.tsx` |
| `experience_link_play_store` | Google Play chip click for a past role                                        | `company`: Company name | `src/components/ExperienceModal.tsx` |
| `linkedin_experience_click`  | Visitor clicks the external LinkedIn link inside the experience details modal | None                    | `src/components/ExperienceModal.tsx` |

### Publications modal

| Event Name                | Trigger                                      | Properties Captured      | Component Location                     |
| :------------------------ | :------------------------------------------- | :----------------------- | :------------------------------------- |
| `publication_title_click` | Click on a publication's title               | `pub`: Publication title | `src/components/PublicationsModal.tsx` |
| `publication_read_click`  | Click on a publication's "Read Article" link | `pub`: Publication title | `src/components/PublicationsModal.tsx` |

### Footer / contact

| Event Name                 | Trigger                                                | Properties Captured | Component Location              |
| :------------------------- | :----------------------------------------------------- | :------------------ | :------------------------------ |
| `contact_email_click`      | Visitor clicks the main `hi@enzoftware.dev` email link | None                | `src/components/ContactCTA.tsx` |
| `contact_copy_email_click` | Visitor clicks the "copy email" button                 | None                | `src/components/ContactCTA.tsx` |

> [!NOTE]
> The "Currently at" row's link events (`current_role_link_web`, `current_role_link_app_store`, `current_role_link_play_store`) don't carry a `company` property, since there's only ever one current role — unambiguous without it. If a future change makes that row show more than one entry, add a `data-company` attribute there too for consistency with `experience_link_*`.

### Renamed or removed events

If you're reconciling historical PostHog data against this catalog, note these renames from the activity-stack redesign:

| Old event name          | Replaced by                                                    | Reason                                                                                  |
| :---------------------- | :------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `latest_post_click`     | `latest_article_click`                                         | The row now surfaces the latest article across all sources, not just Substack.          |
| `recent_activity_click` | `opensource_top_repo_click` / `opensource_latest_commit_click` | The single "recent commits" list split into two: most-starred repos and latest commits. |

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
