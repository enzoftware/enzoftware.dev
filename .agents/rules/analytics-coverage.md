---
description: Every meaningful user action in a React component must be tracked via PostHog (data-track or posthog.capture) — verify coverage whenever a .tsx file adds, changes, or removes an interaction handler.
globs: "src/components/**/*.tsx,src/pages/**/*.tsx,src/layouts/**/*.tsx"
alwaysApply: false
---

# Analytics Coverage for User Actions

This rule exists because it's easy to ship a working interactive element — a new button, a new link, a new modal trigger — without wiring up the tracking that makes it visible in product analytics. A feature that "works" but isn't tracked produces a permanent blind spot: nobody notices, because nothing is visibly broken.

For the underlying mechanics (event naming, `data-track` delegation, `docs/analytics.md`), see the `add-analytic-event` skill. This rule is about **when tracking is required**, not how to implement it.

---

## Trigger condition

Apply this rule whenever a diff to a `.tsx` file under `src/components/`, `src/pages/`, or `src/layouts/` adds, modifies, or removes any of:

- `onClick`, `onSubmit`, or `onChange` on an element the user directly interacts with (button, link, form control, card)
- A new `<a href="...">` with `target="_blank"` (outbound/external link)
- A new modal, drawer, or disclosure that opens in response to user input

For each one found, decide: **does this represent a user-initiated action with product significance?** If yes, it needs `data-track="<event_name>"` (or a programmatic `posthog.capture(...)` call for non-click interactions — see `add-analytic-event`). If no, it's exempt — see below.

## What counts as "product significance" (needs tracking)

- **Navigation**: opens a modal, switches to a different view/section, follows an outbound link.
- **Conversion**: contact links, email/copy actions, social links, App Store/Play Store links, resume/CV downloads.
- **Content engagement**: opens/reads an article, publication, or talk; clicks "watch recording" or "view slides".
- **Explicit, conscious choices**: accepting/declining cookie consent, switching theme, switching language — the user is making a decision the product should learn from, even though it isn't a "conversion" in the funnel sense.

## What's exempt (does not need a new event)

- **Dismiss/close actions**: modal close (X) buttons, and backdrop-click-to-dismiss overlays. Established convention in this codebase — none of the 12 `onClick={onClose}` handlers across the modal components are tracked, and that's intentional: closing a dialog isn't a signal worth a distinct event.
- **Keyboard/focus-trap plumbing**: `handleKeyDown` for Tab-wrapping or Escape-to-close inside a dialog. Not a user-facing action in itself.
- **An element inside a parent that already has `data-track`**: the delegated click listener in `src/components/Analytics.tsx` uses `.closest("[data-track]")`, so a nested icon or span inside a tracked link/button is already covered. Don't place a second `data-track` on it.
- **Ephemeral, purely presentational local state with no product-decision value**: e.g. a hover-preview toggle that has no effect once the pointer leaves. If you're unsure whether something is "purely presentational," it probably isn't — treat it as needing tracking and ask for a second opinion instead of silently skipping it.

## Known gaps at time of writing

These pre-existing interactions are **not** currently tracked, despite meeting the "product significance" bar above. Fixing them isn't the point of this rule and isn't requested on its own — but a future change that touches one of these files for another reason should close its gap rather than leave it in place:

| Interaction                                                          | Location                               |
| :------------------------------------------------------------------- | :------------------------------------- |
| Theme toggle                                                         | `src/components/TopBar.tsx`            |
| Language toggle                                                      | `src/components/TopBar.tsx`            |
| Cookie consent Accept / Decline (banner)                             | `src/components/CookieBanner.tsx`      |
| Cookie consent Accept / Decline (policy modal, change-preference)    | `src/components/CookiePolicyModal.tsx` |
| "Cookie Settings" footer link                                        | `src/components/ContactCTA.tsx`        |
| Articles modal source filter tabs (All / Medium / Substack / Kodeco) | `src/components/ArticlesModal.tsx`     |

Don't silently expand scope to fix all of these in an unrelated PR — but if you're already touching one of these files for another reason, add the missing `data-track` as part of that change rather than leaving it for later.

## Verification

After adding tracking, confirm it's wired correctly rather than assuming the JSX is enough:

1. Grep the changed file for `onClick`/`onSubmit`/`onChange` and cross-check each against `data-track` on the same element (or its ancestor, per the delegation exemption above).
2. Update `docs/analytics.md`'s Event Catalog — an event that exists in code but not in the catalog is exactly the kind of blind spot this rule exists to prevent.
3. Run `bun run test:a11y` if the interactive element is new — tracked or not, it still needs to be keyboard-reachable and properly labeled.

For the full checklist this rule is one part of (i18n, theming, a11y, tests), see the `ship-ui-feature` skill.
