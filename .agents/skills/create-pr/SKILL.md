---
name: create-pr
description: Use when creating a pull request for changes in this repository.
---

# Create Pull Request

## Overview

This skill guides agents and developers in creating high-quality, standardized Pull Requests in `enzoftware.dev`. It enforces pre-flight verification, branch and commit conventions, and adherence to the project's PR template (`.github/pull_request_template.md`) to maintain clear and traceable project history.

---

## Pre-Flight Checklist

Before preparing a PR, ensure all verification steps pass with zero errors:

```bash
# 1. Type check
bun run check

# 2. Lint check
bun run lint

# 3. Formatting check (run `bun run format` if needed)
bun run format:check

# 4. Production build check
bun run build

# 5. Accessibility tests (required if any UI/components were modified)
bun run test:a11y
```

---

## Step-by-Step Procedure

### Step 1: Review Working Tree & Stage Changes

1. Run `git status` and `git diff` to verify only the desired changes are present.
2. Ensure no scratch files, debug logs, or unwanted `.env` files are tracked.
3. Stage relevant changes:
   ```bash
   git add <files...>
   ```

### Step 2: Create a Semantic Commit

Write commit messages following the Conventional Commits format:

```text
<type>(<scope>): <concise description>
```

- **Types**:
  - `feat`: New user-facing feature or enhancement.
  - `fix`: Bug fix.
  - `docs`: Documentation updates.
  - `chore`: Dependency updates, tooling, or agent configurations.
  - `refactor`: Internal structure change with no behavioral difference.
  - `test`: Adding or modifying tests.

### Step 3: Push Branch to Remote

Push the current branch to GitHub:

```bash
git push -u origin <branch_name>
```

### Step 4: Create the Pull Request Using the Template

Fill out all sections from [`.github/pull_request_template.md`](../../../.github/pull_request_template.md):

1. **Summary**: Concise bullet points explaining what was added or modified and why.
2. **Type of Change**: Mark the appropriate checkbox (`feat`, `fix`, `docs`, `chore`, `refactor`).
3. **Architectural Invariants Check**:
   - Confirm single-screen desktop layout (`100dvh` on `lg:`, no vertical scroll) is preserved.
   - Confirm all visible text is translated in `src/i18n/translations.ts`.
   - Confirm themed colors use CSS variables/Tailwind utility classes.
4. **Verification Checklist**: Mark checked commands that were verified locally.

#### Command Example via GitHub CLI:

```bash
gh pr create \
  --title "chore: setup AI agent guidelines, rules, and skills" \
  --body-file .github/pull_request_template.md
```

_(Or specify `--body "..."` populated with the completed template text)._

### Step 5: Post-Creation Verification

1. Confirm the pull request URL is returned.
2. Check that GitHub Actions CI (`Checks` workflow) starts and monitor for completion if needed.

---

## Common Mistakes to Avoid

- ❌ **Skipping pre-flight verification**: Never open a PR without running `bun run check`, `bun run lint`, and `bun run build`.
- ❌ **Empty or generic PR description**: Always complete the PR template sections so reviewers and future agents understand the context.
- ❌ **Unchecked invariants**: If UI was modified, always verify the desktop no-scroll behavior and i18n keys before opening the PR.
