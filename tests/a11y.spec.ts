import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function runAxe(page: Page) {
  return new AxeBuilder({ page })
    .exclude("#posthog-container") // third-party analytics widget, not our markup
    .analyze();
}

test.describe("accessibility", () => {
  test.beforeEach(async ({ page }) => {
    // The site respects `prefers-reduced-motion` (via framer-motion's
    // MotionConfig), so scanning with it set to "reduce" makes framer-motion
    // animations resolve instantly — avoiding false-positive contrast
    // failures from axe sampling a mid-fade/mid-transition frame, and
    // doubling as a check that the reduced-motion opt-out itself works.
    // Pin the OS color-scheme preference so the site's inline theme-detector
    // script deterministically boots into dark mode (its default) instead of
    // following the test runner's own system preference.
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  });

  test("homepage has zero automated a11y violations (dark theme)", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const results = await runAxe(page);
    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });

  test("theme toggle switches themes and both pass the scan", async ({
    page,
  }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");

    let darkResults = await runAxe(page);
    expect(darkResults.violations).toEqual([]);

    const themeToggle = page.getByRole("button", {
      name: /switch to light theme/i,
    });
    await themeToggle.click();
    await expect(html).toHaveAttribute("data-theme", "light");

    const lightResults = await runAxe(page);
    expect(lightResults.violations).toEqual([]);

    // Toggle back to dark and confirm it still passes.
    await page.getByRole("button", { name: /switch to dark theme/i }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");

    darkResults = await runAxe(page);
    expect(darkResults.violations).toEqual([]);
  });

  test("experience modal opens, traps focus, and passes the scan", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: /view full experience/i,
    });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /full experience/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = page.getByRole("button", { name: /^close$/i });
    await expect(closeButton).toBeFocused();

    const results = await runAxe(page);
    expect(results.violations).toEqual([]);

    // Shift+Tab from the first focusable element should wrap to the last
    // focusable element inside the dialog, proving the focus trap works.
    await page.keyboard.press("Shift+Tab");
    const activeIsInsideDialog = await page.evaluate(() => {
      const dialogEl = document.querySelector('[role="dialog"]');
      return dialogEl?.contains(document.activeElement) ?? false;
    });
    expect(activeIsInsideDialog).toBe(true);

    // Escape closes the dialog and returns focus to the trigger.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("experience modal gives every entry but the last generous bottom spacing", async ({
    page,
  }) => {
    // Regression test: `last:pb-0` was matching Tailwind's `:last-child`
    // selector relative to each entry's own two-child <li> (rail + content),
    // not "the last entry in the list" — so it silently zeroed the bottom
    // padding on every entry, not just the final one.
    await page.goto("/");
    await page.getByRole("button", { name: /view full experience/i }).click();

    const dialog = page.getByRole("dialog", { name: /full experience/i });
    await expect(dialog).toBeVisible();

    // Each <li> is a flex row of [avatar rail, content] — the breathing
    // room between entries lives in the content div's own padding-bottom,
    // not in any margin between <li> elements.
    const paddings = await dialog
      .locator("ol > li > div:nth-child(2)")
      .evaluateAll((divs) =>
        divs.map((div) => parseFloat(getComputedStyle(div).paddingBottom)),
      );

    expect(paddings.length).toBeGreaterThan(1);
    // Every entry except the last should have generous bottom spacing.
    for (const padding of paddings.slice(0, -1)) {
      expect(padding).toBeGreaterThanOrEqual(32);
    }
    // The last entry needs none — it already sits at the bottom of the list.
    expect(paddings[paddings.length - 1]).toBe(0);
  });

  test("speaking modal opens, traps focus, and passes the scan", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: /see all talks/i,
    });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /speaking & talks/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = dialog.getByRole("button", { name: /^close$/i });
    await expect(closeButton).toBeFocused();

    const results = await runAxe(page);
    expect(results.violations).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("projects modal opens, traps focus, and passes the scan", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: /see all projects/i,
    });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /featured projects/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = dialog.getByRole("button", { name: /^close$/i });
    await expect(closeButton).toBeFocused();

    const results = await runAxe(page);
    expect(results.violations).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("keyboard navigation (Tab) reaches all interactive elements including activity stack CTAs", async ({
    page,
  }) => {
    await page.goto("/");

    // The activity stack's rows briefly render a loading shimmer (no
    // focusable content) before swapping in real data — wait for that swap
    // so the Tab loop below doesn't race it.
    await page.getByRole("button", { name: /see all articles/i }).waitFor();

    const seen: string[] = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const label = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return null;
        return (
          el.getAttribute("aria-label") || el.textContent?.trim() || el.tagName
        );
      });
      if (label) seen.push(label);
    }

    // Key interactive controls should all be keyboard-reachable via Tab,
    // in document order: avatar/back-to-top link, theme toggle, language
    // toggle, social links, and the activity stack's row CTAs.
    expect(seen).toEqual(
      expect.arrayContaining([
        "Back to top",
        expect.stringMatching(/switch to (light|dark) theme/i),
        expect.stringMatching(/en|es/i),
        expect.stringMatching(/see all articles/i),
        expect.stringMatching(/see all talks/i),
        expect.stringMatching(/see all projects/i),
        "LinkedIn",
        "GitHub",
      ]),
    );
  });
});
