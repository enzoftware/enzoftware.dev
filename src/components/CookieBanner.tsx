import { useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import {
  setCookieConsent,
  subscribeCookieConsent,
  getCookieConsentSnapshot,
  getServerCookieConsentSnapshot,
} from "../lib/cookieConsent";

interface CookieBannerProps {
  t: Translations["cookie_consent"];
  onOpenPolicy: () => void;
}

export function CookieBanner({ t, onOpenPolicy }: CookieBannerProps) {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot,
  );
  const shouldReduceMotion = useReducedMotion();

  const isVisible = consent === null;

  const handleAccept = () => {
    setCookieConsent("accepted");
  };

  const handleDecline = () => {
    setCookieConsent("declined");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-surface-elevated/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-5 text-ink"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.98 }
          }
          animate={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.98 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: "easeOut" }
          }
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-1 w-2.5 h-2.5 rounded-full bg-accent-solid flex-shrink-0"
              aria-hidden="true"
            />
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {t.banner_text}{" "}
                <button
                  type="button"
                  onClick={onOpenPolicy}
                  className="underline underline-offset-2 hover:text-ink font-medium transition-colors"
                >
                  {t.learn_more}
                </button>
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="inline-flex items-center justify-center font-mono text-xs font-semibold px-4 py-2 rounded-lg bg-accent-solid text-on-accent hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t.accept}
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="inline-flex items-center justify-center font-mono text-xs px-3.5 py-2 rounded-lg border border-border text-ink hover:border-ink-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t.decline}
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
