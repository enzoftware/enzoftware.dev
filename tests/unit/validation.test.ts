import { describe, expect, it } from "bun:test";
import { isValidHttpsUrl } from "../../src/lib/validation";

describe("isValidHttpsUrl", () => {
  it("returns true for valid https URLs", () => {
    expect(isValidHttpsUrl("https://enzoftware.dev")).toBe(true);
    expect(isValidHttpsUrl("https://github.com/enzoftware")).toBe(true);
    expect(
      isValidHttpsUrl("https://avatars.githubusercontent.com/u/123?v=4"),
    ).toBe(true);
  });

  it("returns false for http URLs", () => {
    expect(isValidHttpsUrl("http://enzoftware.dev")).toBe(false);
  });

  it("returns false for dangerous or non-https schemes", () => {
    expect(isValidHttpsUrl("javascript:alert(1)")).toBe(false);
    expect(isValidHttpsUrl("data:text/html,<script>alert(1)</script>")).toBe(
      false,
    );
    expect(isValidHttpsUrl("file:///etc/passwd")).toBe(false);
    expect(isValidHttpsUrl("ftp://example.com/file")).toBe(false);
  });

  it("returns false for malformed or relative strings", () => {
    expect(isValidHttpsUrl("/relative/path")).toBe(false);
    expect(isValidHttpsUrl("//protocol-relative.com")).toBe(false);
    expect(isValidHttpsUrl("not a url")).toBe(false);
    expect(isValidHttpsUrl("")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isValidHttpsUrl(null)).toBe(false);
    expect(isValidHttpsUrl(undefined)).toBe(false);
    expect(isValidHttpsUrl(12345)).toBe(false);
    expect(isValidHttpsUrl({})).toBe(false);
  });
});
