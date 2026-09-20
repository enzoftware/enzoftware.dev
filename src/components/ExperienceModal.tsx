import { motion, AnimatePresence } from "framer-motion";
import type { Translations } from "../i18n/translations";

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
}

interface ExperienceModalProps {
  t: Translations["modal"];
  experiences: ExperienceEntry[];
  open: boolean;
  onClose: () => void;
}

export function ExperienceModal({
  t,
  experiences,
  open,
  onClose,
}: ExperienceModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            className="relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-surface-elevated border border-border rounded-t-3xl sm:rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-ink">{t.title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.close}
                className="flex items-center justify-center w-8 h-8 rounded-full text-ink-muted hover:text-ink hover:bg-white/5 transition-colors"
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

            <div className="flex flex-col">
              {experiences.map((exp) => (
                <div
                  key={exp.company}
                  className="flex items-baseline justify-between gap-4 flex-wrap py-4 border-t border-border first:border-t-0"
                >
                  <span>
                    <span className="font-medium text-ink">{exp.role}</span>
                    <span className="text-ink-muted"> — {exp.company}</span>
                  </span>
                  <span className="font-mono text-xs text-ink-faint whitespace-nowrap">
                    {exp.period} · {exp.location}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
