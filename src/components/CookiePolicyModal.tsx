import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import {
  setCookieConsent,
  subscribeCookieConsent,
  getCookieConsentSnapshot,
  getServerCookieConsentSnapshot,
  type CookieConsentStatus,
} from "../lib/cookieConsent";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface CookiePolicyModalProps {
  t: Translations["cookie_consent"];
  open: boolean;
  onClose: () => void;
}

export function CookiePolicyModal({
  t,
  open,
  onClose,
}: CookiePolicyModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const currentStatus = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot,
  );

  useEffect(() => {
    if (!open) return;

    const appRoot = document.getElementById("top");
    appRoot?.setAttribute("inert", "");

    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable =
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialogRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialogRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      appRoot?.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  const handleUpdateConsent = (status: CookieConsentStatus) => {
    setCookieConsent(status);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="region"
          aria-label={t.modal_title}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }
            }
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-policy-title"
            className="relative w-full max-w-xl max-h-[85vh] bg-surface-elevated border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-ink"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-accent-solid"
                  aria-hidden="true"
                />
                <h2
                  id="cookie-policy-title"
                  className="font-display font-semibold text-xl text-ink"
                >
                  {t.modal_title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t.modal_close}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-ink-muted hover:text-ink hover:border-ink-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-sm text-ink-muted leading-relaxed">
              <p>{t.modal_intro}</p>

              <section className="space-y-2">
                <h3 className="font-display font-medium text-base text-ink flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-dot-2"
                    aria-hidden="true"
                  />
                  {t.section_tracking_title}
                </h3>
                <p>{t.section_tracking_desc}</p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-medium text-base text-ink flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-dot-3"
                    aria-hidden="true"
                  />
                  {t.section_not_done_title}
                </h3>
                <p>{t.section_not_done_desc}</p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-medium text-base text-ink flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-dot-4"
                    aria-hidden="true"
                  />
                  {t.section_rights_title}
                </h3>
                <p>{t.section_rights_desc}</p>
              </section>

              {/* Preference Manager */}
              <div className="pt-4 border-t border-border/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-mono text-xs text-ink-muted">
                    {t.status_label}{" "}
                    <strong className="text-ink">
                      {currentStatus === "accepted"
                        ? t.status_accepted
                        : currentStatus === "declined"
                          ? t.status_declined
                          : t.status_not_set}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleUpdateConsent("accepted")}
                    className={`font-mono text-xs px-3.5 py-2 rounded-lg transition-colors border ${
                      currentStatus === "accepted"
                        ? "bg-accent-solid text-on-accent border-accent-solid font-semibold"
                        : "border-border text-ink hover:border-ink-muted"
                    }`}
                  >
                    {t.change_to_accept}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateConsent("declined")}
                    className={`font-mono text-xs px-3.5 py-2 rounded-lg transition-colors border ${
                      currentStatus === "declined"
                        ? "bg-dot-4 text-white border-dot-4 font-semibold"
                        : "border-border text-ink hover:border-ink-muted"
                    }`}
                  >
                    {t.change_to_decline}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
