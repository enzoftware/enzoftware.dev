import { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MediumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SubstackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

const KodecoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export interface Article {
  title: string;
  url: string;
  source: "Medium" | "Substack" | "Kodeco";
  publishedAt: string;
}

interface ArticlesModalProps {
  articles: Article[];
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ArticlesModal({ articles, open, onClose }: ArticlesModalProps) {
  const [filter, setFilter] = useState<
    "All" | "Medium" | "Substack" | "Kodeco"
  >("All");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredArticles = useMemo(() => {
    let result =
      filter === "All" ? articles : articles.filter((a) => a.source === filter);
    result = [...result].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    return result;
  }, [articles, filter]);

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
            aria-label="Latest Articles"
            className="relative w-full sm:max-w-2xl max-h-[85vh] flex flex-col bg-surface-elevated border border-border rounded-t-3xl sm:rounded-3xl p-6 sm:p-9"
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
                <h2 className="font-display text-2xl text-ink">
                  Latest Articles
                </h2>
                <div className="flex gap-2 mt-3">
                  {(["All", "Medium", "Substack", "Kodeco"] as const).map(
                    (src) => (
                      <button
                        key={src}
                        onClick={() => setFilter(src)}
                        className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${filter === src ? "bg-accent-solid text-on-accent border-accent-solid" : "bg-transparent text-ink-muted border-border hover:border-ink-muted"}`}
                      >
                        {src}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
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

            <div className="flex-1 overflow-y-auto pr-2 -mr-2">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                {filteredArticles.map((article) => (
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, y: 15, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    key={article.url}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex flex-col gap-3 p-5 rounded-2xl bg-surface border border-border overflow-hidden group hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_8px_30px_-4px_rgba(255,255,255,0.08)]"
                    data-track="article_click"
                    data-source={article.source}
                    data-title={article.title}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex justify-between items-start gap-2 relative z-10">
                      <span className="text-xs font-mono text-ink-muted bg-surface-elevated px-2 py-1 rounded-md border border-border/50 group-hover:border-accent/20 transition-colors">
                        {new Date(article.publishedAt).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </span>
                      <span className="text-xs font-mono px-2 py-1 rounded-md bg-glass border border-border text-ink flex items-center gap-1.5 shadow-sm group-hover:bg-accent group-hover:text-on-accent group-hover:border-accent transition-all duration-300">
                        {article.source === "Medium" && <MediumIcon />}
                        {article.source === "Substack" && <SubstackIcon />}
                        {article.source === "Kodeco" && <KodecoIcon />}
                        {article.source}
                      </span>
                    </div>
                    <div className="mt-2 flex-1 relative z-10 pr-6">
                      <p className="font-semibold text-ink text-base group-hover:text-accent transition-colors leading-relaxed line-clamp-3">
                        {article.title}
                      </p>
                    </div>

                    <div className="absolute bottom-5 right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </motion.a>
                ))}
                {filteredArticles.length === 0 && (
                  <p className="text-sm text-ink-muted col-span-full py-12 text-center bg-surface-elevated/50 rounded-2xl border border-dashed border-border">
                    No articles found for this source.
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
