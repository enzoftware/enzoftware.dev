import { test, expect } from "@playwright/test";

test.describe("activity stack", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // The rows briefly render a loading shimmer before swapping in real
    // content — wait for that swap before asserting on it.
    await page.getByRole("button", { name: /see all articles/i }).waitFor();
  });

  test("article author row shows the most recent article instead of an empty state", async ({
    page,
  }) => {
    // Regression test: this row used to only ever look at the Substack
    // feed (which has no real posts), so it silently showed nothing in
    // production. It should now surface the latest article across every
    // source (Medium, Substack, Kodeco).
    const link = page.locator('a[data-track="latest_article_click"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", /^https:\/\//);
  });

  test("currently-at shows verified App Store / Google Play links for a mobile-app role", async ({
    page,
  }) => {
    const appStoreLink = page.locator(
      'a[data-track="current_role_link_app_store"]',
    );
    const playStoreLink = page.locator(
      'a[data-track="current_role_link_play_store"]',
    );
    await expect(appStoreLink).toHaveAttribute("href", /apps\.apple\.com/);
    await expect(playStoreLink).toHaveAttribute("href", /play\.google\.com/);

    // When store links are present, the company name itself must not also
    // be a link (it isn't the right target — the store chips are).
    await expect(
      page.locator('a[data-track="current_role_link_web"]'),
    ).toHaveCount(0);
  });

  test("featured project shows store chips when the project has them", async ({
    page,
  }) => {
    const appStoreLink = page.locator(
      'a[data-track="featured_project_link_appStore"]',
    );
    const playStoreLink = page.locator(
      'a[data-track="featured_project_link_playStore"]',
    );
    await expect(appStoreLink).toHaveAttribute("href", /apps\.apple\.com/);
    await expect(playStoreLink).toHaveAttribute("href", /play\.google\.com/);
  });

  test("open-source star icons align in a fixed column regardless of digit count", async ({
    page,
  }) => {
    const stars = page.getByTestId("repo-star-icon");
    const count = await stars.count();
    expect(count).toBeGreaterThan(0);

    const lefts = await stars.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().left)),
    );
    // Every star must sit at the same x position, no matter how many
    // digits its star count has (e.g. "9" vs "190").
    expect(new Set(lefts).size).toBe(1);
  });
});
