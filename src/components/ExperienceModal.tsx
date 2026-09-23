import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { AppStoreIcon, PlayStoreIcon } from "./StoreIcons";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const STORE_CHIP_CLASS =
  "inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-ink-faint/30 bg-surface hover:border-accent hover:bg-surface-elevated text-ink-faint hover:text-ink transition-colors";

export type ExperienceDotColor =
  "dot-1" | "dot-2" | "dot-3" | "dot-4" | "dot-5";

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  color: ExperienceDotColor;
  highlights?: string[];
  technologies?: string[];
  links?: {
    web?: string | undefined;
    appStore?: string | undefined;
    playStore?: string | undefined;
  };
}

// Written out as full class names (rather than built with template
// interpolation) so Tailwind's content scanner can see and generate them.
// dot-1 (--color-accent) uses the --color-accent-solid variant instead here
// — --color-accent + white text sits right at the 4.5:1 edge (see the
// comment on --color-accent-solid in global.css) and these avatars carry
// text, unlike the plain decorative dots in ActivityStack.
const AVATAR_BG_CLASSES: Record<ExperienceDotColor, string> = {
  "dot-1": "bg-accent-solid",
  "dot-2": "bg-dot-2",
  "dot-3": "bg-dot-3",
  "dot-4": "bg-dot-4",
  "dot-5": "bg-dot-5",
};

interface ExperienceRole {
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

interface ExperienceGroup {
  key: string;
  company: string;
  color: ExperienceDotColor;
  roles: ExperienceRole[];
  links?: ExperienceEntry["links"];
}

// Collapses consecutive entries at the same company (no other company in
// between — e.g. an internal promotion or team change) into one group, so
// the company only renders once with each role listed underneath it.
// Entries for the same company that are NOT adjacent (left, came back later)
// intentionally stay as separate groups/avatars, since that's a distinct
// stint worth calling out on its own.
function groupExperiences(experiences: ExperienceEntry[]): ExperienceGroup[] {
  const groups: ExperienceGroup[] = [];

  for (const exp of experiences) {
    const roleItem: ExperienceRole = {
      role: exp.role,
      period: exp.period,
      location: exp.location,
      highlights: exp.highlights ?? [],
      technologies: exp.technologies ?? [],
    };

    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.company === exp.company) {
      lastGroup.roles.push(roleItem);
      continue;
    }

    groups.push({
      key: `${exp.company}-${groups.length}`,
      company: exp.company,
      color: exp.color,
      roles: [roleItem],
      links: exp.links,
    });
  }

  return groups;
}

interface ExperienceModalProps {
  t: Translations["modal"];
  experiences: ExperienceEntry[];
  open: boolean;
  onClose: () => void;
  linkedinUrl?: string | undefined;
}

export function ExperienceModal({
  t,
  experiences,
  open,
  onClose,
  linkedinUrl,
}: ExperienceModalProps) {
  const groups = groupExperiences(experiences);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  // MotionConfig(reducedMotion="user") only suppresses transform/layout
  // animations, not opacity — without this, the modal's fade-in still runs
  // its full duration for reduced-motion users (and races a11y scans that
  // run right after the dialog is deemed "visible").
  const shouldReduceMotion = useReducedMotion();

  // Focus management: move focus into the dialog on open, trap Tab within
  // it, close on Escape, and restore focus to the trigger element on close.
  useEffect(() => {
    if (!open) return;

    // Hide the rest of the app from assistive tech and accessibility
    // scanners while the dialog is open — otherwise background content
    // sitting behind the semi-transparent backdrop is still in the a11y
    // tree (and can read as low-contrast through the backdrop blend).
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
                <h2 className="font-display text-2xl text-ink">{t.title}</h2>
                {linkedinUrl && (
                  <a
                    href={`${linkedinUrl.replace(/\/$/, "")}/details/experience/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 font-mono text-xs text-accent hover:text-accent-light transition-colors"
                    data-track="linkedin_experience_click"
                  >
                    {t.linkedin_cta}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
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

            <ol className="flex flex-col">
              {groups.map((group, index) => (
                <li key={group.key} className="flex gap-4">
                  {/* Timeline rail: monogram avatar + connecting line down to
                      the next company (omitted after the last one). */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span
                      aria-hidden="true"
                      className={`flex items-center justify-center w-10 h-10 rounded-xl font-display text-sm font-semibold text-on-accent ${AVATAR_BG_CLASSES[group.color]}`}
                    >
                      {group.company.charAt(0)}
                    </span>
                    {index < groups.length - 1 && (
                      <span className="w-px flex-1 min-h-[1.5rem] bg-border mt-2" />
                    )}
                  </div>

                  <div
                    className={`flex-1 ${index < groups.length - 1 ? "pb-14" : ""}`}
                  >
                    {group.links?.appStore || group.links?.playStore ? (
                      <>
                        <p className="font-semibold text-ink leading-snug">
                          {group.company}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {group.links.appStore && (
                            <a
                              href={group.links.appStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={STORE_CHIP_CLASS}
                              data-track="experience_link_app_store"
                              data-company={group.company}
                            >
                              <AppStoreIcon />
                              {t.view_app_store}
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                          {group.links.playStore && (
                            <a
                              href={group.links.playStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={STORE_CHIP_CLASS}
                              data-track="experience_link_play_store"
                              data-company={group.company}
                            >
                              <PlayStoreIcon />
                              {t.view_play_store}
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </>
                    ) : group.links?.web ? (
                      <a
                        href={group.links.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-block"
                        data-track="experience_link_web"
                        data-company={group.company}
                      >
                        <span className="font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
                          {group.company}
                          <span
                            className="ml-1 text-xs text-ink-faint group-hover:text-accent transition-colors"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </span>
                      </a>
                    ) : (
                      <p className="font-semibold text-ink leading-snug">
                        {group.company}
                      </p>
                    )}

                    {group.roles.length === 1 && group.roles[0] ? (
                      <div className="mt-2 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-ink-muted">
                            {group.roles[0].role}
                          </p>
                          <p className="font-mono text-xs text-ink-faint">
                            {group.roles[0].period} · {group.roles[0].location}
                          </p>
                        </div>

                        {group.roles[0].highlights.length > 0 && (
                          <ul className="flex flex-col gap-2 text-xs text-ink-muted list-disc list-inside">
                            {group.roles[0].highlights.map((h) => (
                              <li key={h} className="leading-relaxed">
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {group.roles[0].technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {group.roles[0].technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] font-mono px-2 py-1 rounded-md bg-surface border border-border text-ink-faint"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <ul className="flex flex-col gap-5 mt-3 border-l border-border pl-4">
                        {group.roles.map((role) => (
                          <li key={role.role} className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                              <p className="text-ink-muted font-medium">
                                {role.role}
                              </p>
                              <p className="font-mono text-xs text-ink-faint">
                                {role.period} · {role.location}
                              </p>
                            </div>

                            {role.highlights.length > 0 && (
                              <ul className="flex flex-col gap-2 text-xs text-ink-muted list-disc list-inside">
                                {role.highlights.map((h) => (
                                  <li key={h} className="leading-relaxed">
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {role.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {role.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[10px] font-mono px-2 py-1 rounded-md bg-surface border border-border text-ink-faint"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal to <body> so the dialog is a true sibling of the app root — lets
  // us `inert` the rest of the app above without inerting the dialog itself,
  // and avoids `fixed` positioning being constrained by an ancestor's
  // framer-motion transform. SSR has no `document`; the modal starts closed
  // client-side too, so rendering nothing until mount is never a visible
  // mismatch.
  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
