/**
 * Report server-side fetching errors to PostHog.
 * Ensure your environment has PUBLIC_POSTHOG_KEY and PUBLIC_POSTHOG_HOST set.
 */
export async function reportFetchError(source: string, error: unknown) {
  const apiKey = import.meta.env.PUBLIC_POSTHOG_KEY;
  const apiHost =
    import.meta.env.PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) {
    console.warn(
      `[Telemetry] Missing PostHog API key, cannot report error for ${source}`,
      error,
    );
    return;
  }

  try {
    await fetch(`${apiHost}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        event: "build_fetch_error",
        properties: {
          distinct_id: "server-build", // standard for build-time errors
          source,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      }),
    });
  } catch (telemetryError) {
    console.error(
      "[Telemetry] Failed to report error to PostHog",
      telemetryError,
    );
  }
}
