"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { classifySource } from "../lib/analyticsSource";
import {
  COOKIE_CONSENT_EVENT,
  hasConsented,
  type CookieConsentEventDetail,
} from "../lib/cookieConsent";

interface AnalyticsProps {
  apiKey: string;
  apiHost: string;
}

export function Analytics({ apiKey, apiHost }: AnalyticsProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!apiKey || apiKey.startsWith("phc_your_")) return;

    let cleanupClickListener: (() => void) | null = null;

    const setupPosthog = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

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
      cleanupClickListener = () =>
        document.removeEventListener("click", handleClick);
    };

    if (hasConsented()) {
      setupPosthog();
    }

    const handleConsentChange = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsentEventDetail>).detail;
      if (detail?.consent === "accepted") {
        setupPosthog();
      } else if (detail?.consent === "declined") {
        if (initializedRef.current) {
          try {
            posthog.opt_out_capturing();
          } catch (_e) {
            // Ignore opt out error
          }
        }
        if (cleanupClickListener) {
          cleanupClickListener();
          cleanupClickListener = null;
        }
      }
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
      if (cleanupClickListener) {
        cleanupClickListener();
      }
    };
  }, [apiKey, apiHost]);

  return null;
}
