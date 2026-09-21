/**
 * Validates that an unknown input is a valid string URL using the https: protocol.
 * Acts as a TypeScript type guard narrowing unknown to string.
 */
export function isValidHttpsUrl(urlStr: unknown): urlStr is string {
  if (typeof urlStr !== "string") return false;
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}
