"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { classifySource } from "../lib/analyticsSource";

interface AnalyticsProps {
  apiKey: string;
  apiHost: string;
}

export function Analytics({ apiKey, apiHost }: AnalyticsProps) {
  useEffect(() => {
    if (!apiKey || apiKey.startsWith("phc_your_")) return;

    posthog.init(apiKey, {
      api_host: apiHost,
      defaults: "2025-05-24",
      // This site never calls posthog.identify() — anonymous visitors need
      // full person profiles for GeoIP/source to show up in Persons/Trends.
      person_profiles: "always",
    });

    posthog.register({
      source: classifySource(document.referrer, window.location.search),
    });

    // Delegate click tracking for named conversion events via data-track;
    // autocapture (enabled by `defaults` above) covers every other click.
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-track]");
      if (!target) return;

      const eventName = target.getAttribute("data-track");
      if (!eventName) return;

      const attrs: Record<string, string> = {};
      for (const attr of Array.from(target.attributes)) {
        if (attr.name.startsWith("data-") && attr.name !== "data-track") {
          attrs[attr.name.replace("data-", "")] = attr.value;
        }
      }

      posthog.capture(eventName, attrs);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [apiKey, apiHost]);

  return null;
}
