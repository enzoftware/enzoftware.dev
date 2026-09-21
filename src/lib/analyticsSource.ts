const DOMAIN_LABELS: [pattern: RegExp, label: string][] = [
  [/(^|\.)linkedin\.com$/, "LinkedIn"],
  [/(^|\.)(x|twitter)\.com$/, "X"],
  [/(^|\.)medium\.com$/, "Medium"],
  [/(^|\.)substack\.com$/, "Substack"],
  [/(^|\.)github\.com$/, "GitHub"],
  [/(^|\.)(google|bing|duckduckgo)\./, "Search"],
];

export function classifySource(referrer: string, search: string): string {
  const utmSource = new URLSearchParams(search).get("utm_source");
  if (utmSource) {
    const matched = DOMAIN_LABELS.find(([pattern]) =>
      pattern.test(utmSource.toLowerCase()),
    );
    return matched ? matched[1] : utmSource;
  }

  if (!referrer) return "Direct";

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();
    const matched = DOMAIN_LABELS.find(([pattern]) => pattern.test(hostname));
    return matched ? matched[1] : "Other";
  } catch (_e) {
    return "Other";
  }
}
