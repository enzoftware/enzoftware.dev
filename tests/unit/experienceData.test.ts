import { describe, expect, it } from "bun:test";
import experience from "../../src/content/experience/clipp.json";
import project from "../../src/content/projects/clipp-order-management.json";

// Regression guard: Clipp's real business (per getclipp.com) is an
// AI-powered order management platform for restaurant buyers & food
// suppliers — not the "urban mobility" ride-hailing platform this content
// originally (incorrectly) described.
describe("Clipp experience & project data", () => {
  it("points to the real getclipp.com company site", () => {
    expect(experience.links.web).toBe("https://www.getclipp.com/");
  });

  it("includes verified App Store and Google Play links", () => {
    expect(experience.links.appStore).toContain("apps.apple.com");
    expect(experience.links.playStore).toContain("play.google.com");
  });

  it("does not describe the old (incorrect) urban-mobility business", () => {
    const text = JSON.stringify(experience).toLowerCase();
    expect(text).not.toContain("vehicle telemetry");
    expect(text).not.toContain("urban mobility");
    expect(text).not.toContain("urban commuter");
    expect(text).not.toContain("mapbox");
  });

  it("project entry matches the corrected restaurant order-management business", () => {
    expect(project.title.toLowerCase()).not.toContain("mobility");
    expect(project.tagline.toLowerCase()).toContain("restaurant");
    expect(project.links.web).toBe("https://www.getclipp.com/");
    expect(project.links.appStore).toContain("apps.apple.com");
    expect(project.links.playStore).toContain("play.google.com");
  });
});
