import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ProjectEntry {
  title: string;
  tagline: string;
  role: string;
  period?: string | undefined;
  description: string;
  architecture?: string | undefined;
  highlights: string[];
  technologies: string[];
  links: {
    appStore?: string | undefined;
    playStore?: string | undefined;
    github?: string | undefined;
    web?: string | undefined;
  };
  featured: boolean;
  order: number;
  color: "dot-1" | "dot-2" | "dot-3" | "dot-4" | "dot-5";
}

interface ProjectsModalProps {
  t: Translations["projects_modal"];
  projects: ProjectEntry[];
  open: boolean;
  onClose: () => void;
}

export function ProjectsModal({
  t,
  projects,
  open,
  onClose,
}: ProjectsModalProps) {
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
            className="relative w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto bg-surface-elevated border border-border rounded-t-3xl sm:rounded-3xl p-6 sm:p-9"
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
                    className="w-2.5 h-2.5 rounded-full bg-flair flex-shrink-0"
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

            <div className="flex flex-col gap-7">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="p-6 rounded-2xl border border-border bg-glass backdrop-blur-md flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="text-lg font-semibold text-ink leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-accent mt-0.5">
                        {project.role}{" "}
                        {project.period ? `· ${project.period}` : ""}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2">
                      {project.links.web && (
                        <a
                          href={project.links.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-md border border-border hover:border-accent text-ink-muted hover:text-ink transition-colors"
                          data-track="project_link_web"
                          data-project={project.title}
                        >
                          {t.view_web}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-md border border-border hover:border-accent text-ink-muted hover:text-ink transition-colors"
                          data-track="project_link_github"
                          data-project={project.title}
                        >
                          {t.view_github}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-ink-muted leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Architecture & Decisions Box */}
                  {project.architecture && (
                    <div className="p-3.5 rounded-xl bg-surface border border-border/80 text-xs">
                      <p className="font-mono font-semibold text-ink mb-1">
                        {t.architecture_label}
                      </p>
                      <p className="text-ink-muted leading-relaxed">
                        {project.architecture}
                      </p>
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights.length > 0 && (
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-ink-faint mb-2">
                        {t.highlights_label}
                      </p>
                      <ul className="flex flex-col gap-1.5 text-xs text-ink-muted list-disc list-inside">
                        {project.highlights.map((h) => (
                          <li key={h} className="leading-relaxed">
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface border border-border text-ink-faint"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
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
