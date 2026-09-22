import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function runAxe(page: Page) {
  return new AxeBuilder({ page }).exclude("#posthog-container").analyze();
}

test.describe("cookie consent & policy", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  });

  test("displays cookie banner when consent is not yet decided and passes a11y scan", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: /cookie consent/i });
    await expect(banner).toBeVisible();

    const acceptBtn = banner.getByRole("button", { name: /^accept$/i });
    const declineBtn = banner.getByRole("button", { name: /^decline$/i });
    const policyBtn = banner.getByRole("button", { name: /cookie policy/i });

    await expect(acceptBtn).toBeVisible();
    await expect(declineBtn).toBeVisible();
    await expect(policyBtn).toBeVisible();

    const results = await runAxe(page);
    expect(results.violations).toEqual([]);
  });

  test("accepting cookies saves preference to localStorage and hides banner", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: /cookie consent/i });
    await expect(banner).toBeVisible();

    await banner.getByRole("button", { name: /^accept$/i }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() =>
      localStorage.getItem("cookie_consent"),
    );
    expect(consent).toBe("accepted");

    // On reload, banner does not reappear
    await page.reload();
    await expect(banner).toBeHidden();
  });

  test("declining cookies saves preference to localStorage and hides banner", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: /cookie consent/i });
    await expect(banner).toBeVisible();

    await banner.getByRole("button", { name: /^decline$/i }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() =>
      localStorage.getItem("cookie_consent"),
    );
    expect(consent).toBe("declined");

    // On reload, banner does not reappear
    await page.reload();
    await expect(banner).toBeHidden();
  });

  test("opening cookie policy modal traps focus, displays details, and passes a11y scan", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: /cookie consent/i });
    await banner.getByRole("button", { name: /cookie policy/i }).click();

    const modal = page.getByRole("dialog", {
      name: /cookie & privacy policy/i,
    });
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute("aria-modal", "true");

    const closeBtn = modal.getByRole("button", { name: /^close$/i });
    await expect(closeBtn).toBeFocused();

    const results = await runAxe(page);
    expect(results.violations).toEqual([]);

    // Escape closes modal
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });

  test("footer cookie settings link remains available once consent is accepted to allow changing preferences", async ({
    page,
  }) => {
    await page.goto("/");

    const banner = page.getByRole("region", { name: /cookie consent/i });
    const settingsBtn = page.getByRole("button", { name: /cookie settings/i });

    // Not yet decided: the footer link is available as a fallback to the banner.
    await expect(settingsBtn).toBeVisible();

    await banner.getByRole("button", { name: /^accept$/i }).click();
    await expect(banner).toBeHidden();

    // Permission granted: the footer link remains available to change preference or withdraw consent.
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();

    const modal = page.getByRole("dialog", {
      name: /cookie & privacy policy/i,
    });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(/accepted/i);

    // Can withdraw consent inside modal
    await modal.getByRole("button", { name: /disable analytics/i }).click();
    await expect(modal).toContainText(/declined/i);

    const consent = await page.evaluate(() =>
      localStorage.getItem("cookie_consent"),
    );
    expect(consent).toBe("declined");

    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
    await expect(settingsBtn).toBeVisible();
  });

  test("footer cookie settings link stays available after declining, and re-opens the modal to manage preference", async ({
    page,
  }) => {
    await page.goto("/");

    const banner = page.getByRole("region", { name: /cookie consent/i });
    await banner.getByRole("button", { name: /^decline$/i }).click();
    await expect(banner).toBeHidden();

    const settingsBtn = page.getByRole("button", { name: /cookie settings/i });
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();

    const modal = page.getByRole("dialog", {
      name: /cookie & privacy policy/i,
    });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(/declined/i);

    // Switch to accept inside modal
    await modal.getByRole("button", { name: /enable analytics/i }).click();
    await expect(modal).toContainText(/accepted/i);

    const consent = await page.evaluate(() =>
      localStorage.getItem("cookie_consent"),
    );
    expect(consent).toBe("accepted");

    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();

    // Footer link remains available to manage preferences
    await expect(settingsBtn).toBeVisible();
  });

  test("translates cookie banner and modal when language is toggled to Spanish", async ({
    page,
  }) => {
    await page.goto("/");

    // Toggle language
    const langToggle = page.getByRole("button", { name: /en.*es/i });
    await langToggle.click();

    const banner = page.getByRole("region", { name: /cookie consent/i });
    await expect(
      banner.getByRole("button", { name: /^aceptar$/i }),
    ).toBeVisible();
    await expect(
      banner.getByRole("button", { name: /^rechazar$/i }),
    ).toBeVisible();

    await banner.getByRole("button", { name: /política de cookies/i }).click();

    const modal = page.getByRole("dialog", {
      name: /política de cookies y privacidad/i,
    });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(/este portafolio utiliza cookies/i);
  });
});
