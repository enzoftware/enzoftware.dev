import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface SpeakingEntry {
  title: string;
  event: string;
  year: number;
  location?: string | undefined;
  abstract: string;
  videoUrl?: string | undefined;
  slidesUrl?: string | undefined;
  tags: string[];
  order: number;
}

interface SpeakingModalProps {
  t: Translations["speaking_modal"];
  talks: SpeakingEntry[];
  open: boolean;
  onClose: () => void;
}

export function SpeakingModal({ t, talks, open, onClose }: SpeakingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

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

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            className="relative w-full sm:max-w-xl max-h-[85vh] overflow-y-auto bg-surface-elevated border border-border rounded-t-3xl sm:rounded-3xl p-6 sm:p-9"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-signal flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-mono text-ink-faint uppercase tracking-wider">
                    {t.eyebrow}
                  </span>
                </div>
                <h2 className="font-display text-2xl text-ink">{t.title}</h2>
                <p className="text-sm text-ink-muted mt-1">{t.subtitle}</p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t.close}
                className="flex items-center justify-center w-8 h-8 rounded-full text-ink-muted hover:text-ink hover:bg-glass transition-colors flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {talks.map((talk) => (
                <article
                  key={`${talk.event}-${talk.title}`}
                  className="p-5 rounded-2xl border border-border bg-glass backdrop-blur-md flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-signal/15 text-signal border border-signal/30">
                      {talk.event} · {talk.year}
                    </span>
                    {talk.location && (
                      <span className="font-mono text-xs text-ink-faint">
                        {talk.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-ink leading-snug">
                    {talk.title}
                  </h3>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {talk.abstract}
                  </p>

                  {/* Tags */}
                  {talk.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {talk.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface border border-border text-ink-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-2 pt-3 border-t border-border/50">
                    {talk.videoUrl && (
                      <a
                        href={talk.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent hover:text-accent-light transition-colors"
                        data-track="speaking_watch_click"
                        data-talk={talk.title}
                      >
                        {t.watch}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}

                    {talk.slidesUrl && (
                      <a
                        href={talk.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-ink-muted hover:text-ink transition-colors"
                        data-track="speaking_slides_click"
                        data-talk={talk.title}
                      >
                        {t.slides}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
