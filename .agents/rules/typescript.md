# TypeScript Implementation & Validation Rules

This rule defines the strict TypeScript coding standards, type-safety requirements, and validation procedures for all `.ts`, `.tsx`, and `.astro` files in the repository.

---

## 1. Type Strictness & Safety

### 1.1 Prohibition of `any`

- **Never use `any`** or type assertion casts like `as any`.
- If a value has an uncertain type, use `unknown` and perform type narrowing via:
  - `typeof` or `instanceof` checks.
  - User-defined type guards (`function isTarget(x: unknown): x is Target`).
  - Schema parsing (e.g., Zod or explicit validation functions).
- Do not use `@ts-ignore` or `@ts-expect-error` to bypass type checks unless addressing an upstream library bug that is clearly documented in an accompanying code comment.

### 1.2 Type-Only Imports

- Always use **type-only imports** for symbols only used as types or interfaces:
  ```typescript
  // ✅ GOOD
  import type { MouseEvent, ReactNode } from "react";
  import type { CollectionEntry } from "astro:content";

  // ❌ BAD
  import { MouseEvent, ReactNode } from "react";
  ```
- This guarantees that bundlers (Vite/Rollup) eliminate type imports completely from production bundles.

### 1.3 Null & Undefined Handling

- The project extends `astro/tsconfigs/strictest`, enforcing strict null checks.
- Avoid non-null assertions (`!`) such as `element!.focus()`.
- Use optional chaining (`?.`), nullish coalescing (`??`), or defensive guards:
  ```typescript
  // ✅ GOOD
  const target = (e.target as HTMLElement | null)?.closest("[data-track]");
  if (!target) return;

  // ❌ BAD
  const target = (e.target as HTMLElement).closest("[data-track]")!;
  ```

---

## 2. React 19 & Astro Component Typing

### 2.1 Component Signatures

- Define an explicit interface for component props named `<ComponentName>Props`:
  ```typescript
  // ✅ GOOD
  interface HeroCardProps {
    name: string;
    role: string;
    bio: string;
  }

  export function HeroCard({ name, role, bio }: HeroCardProps) {
    return <div>...</div>;
  }

  // ❌ BAD: React.FC is deprecated/discouraged
  export const HeroCard: React.FC<HeroCardProps> = ({ name, role, bio }) => { ... };
  ```

### 2.2 Event Handler Typing

- Use specific React synthetic event types or standard DOM event types depending on context:
  - React handlers: `React.MouseEvent<HTMLButtonElement>`, `React.KeyboardEvent<HTMLInputElement>`, etc.
  - Native DOM listeners attached via `addEventListener`: `MouseEvent`, `KeyboardEvent`.
- Always narrow target types when reading attributes:
  ```typescript
  const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
    "[data-track]",
  );
  ```

### 2.3 Hooks & Dependency Completeness

- `useEffect`, `useCallback`, and `useMemo` must include all referenced variables in their dependency arrays.
- Always provide cleanup functions in `useEffect` for listeners, timers, or subscriptions.
- If subscribing to external stores (like theme state), use `useSyncExternalStore` (see `src/lib/theme.ts`).

---

## 3. Data & Schema Validation

### 3.1 Content Collections

- Access Astro content collections using the generated collection types:
  ```typescript
  import type { CollectionEntry } from "astro:content";

  type Experience = CollectionEntry<"experience">;
  type Social = CollectionEntry<"socials">;
  ```
- When adding new content fields, update the schema in `src/content.config.ts` first.

### 3.2 Data Attributes for Analytics

- When setting `data-*` attributes for analytics in JSX, ensure values are primitive strings or serialized strings:
  ```tsx
  <button
    data-track="theme_toggle"
    data-target-theme={theme === "dark" ? "light" : "dark"}
  >
    Toggle Theme
  </button>
  ```

---

## 4. Implementation Validation Pipeline

Every code modification touching `.ts`, `.tsx`, or `.astro` files must be verified with the following steps:

1. **Astro Content & Typecheck**:

   ```bash
   bun run check
   ```

   Ensures `astro sync` generates up-to-date content collection types and `astro-check` reports 0 errors.

2. **ESLint Static Analysis**:

   ```bash
   bun run lint
   ```

   Ensures no unused variables, proper hook usage, and ESLint rule compliance.

3. **Prettier Formatting**:

   ```bash
   bun run format:check
   ```

   Format with `bun run format` if any discrepancies exist.

4. **Production Build**:

   ```bash
   bun run build
   ```

   Ensures `astro build` static asset generation and Vite bundling finish cleanly with zero build errors.
