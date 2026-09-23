## Summary

<!-- Briefly explain what changes were made and why. -->

## Type of Change

- [ ] `feat`: New feature or functionality
- [ ] `fix`: Bug fix
- [ ] `docs`: Documentation updates or additions
- [ ] `chore`: Tooling, dependencies, or maintenance
- [ ] `refactor`: Code refactoring without behavior change
- [ ] `test`: Adding or modifying tests

## Architectural Invariants Check

- [ ] **Single-Screen Desktop Layout**: Still fits within `100dvh` on `lg:`+ without vertical scroll (or N/A).
- [ ] **Strict i18n**: All visible UI copy is defined in `src/i18n/translations.ts` in both `en` and `es` (or N/A).
- [ ] **Theme System**: Uses CSS variables / Tailwind tokens; no hardcoded colors (or N/A).
- [ ] **Analytics**: Every new clickable/interactive element has a `data-track` event, and `docs/analytics.md` is updated to match (or N/A). See the `add-analytic-event` skill.

## Verification Checklist

- [ ] `bun run check` (Astro sync & typecheck)
- [ ] `bun run lint` (ESLint)
- [ ] `bun run format:check` (Prettier)
- [ ] `bun run build` (Production build)
- [ ] `bun run test:a11y` (Playwright accessibility tests, if UI touched)

## Screenshots / Demos

<!-- If UI changes were made, attach screenshots or short recordings here. Otherwise remove this section. -->
