import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface PublicationEntry {
  title: string;
  publisher: string;
  type: "tutorial" | "article" | "book" | "guide";
  url: string;
  publishedAt?: string | undefined;
  description: string;
  tags: string[];
  order: number;
}

interface PublicationsModalProps {
  t: Translations["publications_modal"];
  publications: PublicationEntry[];
  open: boolean;
  onClose: () => void;
}

export function PublicationsModal({
  t,
  publications,
  open,
  onClose,
}: PublicationsModalProps) {
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
                    className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0"
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

            <div className="flex flex-col gap-5">
              {publications.map((pub) => (
                <article
                  key={`${pub.publisher}-${pub.title}`}
                  className="p-5 rounded-2xl border border-border bg-glass backdrop-blur-md flex flex-col gap-2.5 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent-light border border-accent/30">
                      {pub.publisher}
                    </span>
                    {pub.publishedAt && (
                      <span className="font-mono text-xs text-ink-faint">
                        {pub.publishedAt}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-ink leading-snug">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors flex items-center justify-between gap-2"
                      data-track="publication_title_click"
                      data-pub={pub.title}
                    >
                      <span>{pub.title}</span>
                      <span
                        className="text-ink-faint text-xs font-mono"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </h3>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Tags */}
                  {pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface border border-border text-ink-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action */}
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent hover:text-accent-light transition-colors"
                      data-track="publication_read_click"
                      data-pub={pub.title}
                    >
                      {t.read} ({pub.publisher})
                      <span aria-hidden="true">↗</span>
                    </a>
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
