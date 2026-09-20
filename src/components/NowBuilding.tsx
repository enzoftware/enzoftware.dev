import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Translations } from "../i18n/translations";

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
}

interface NowBuildingProps {
  t: Translations["now_building"];
  experiences: ExperienceEntry[];
}

export function NowBuilding({ t, experiences }: NowBuildingProps) {
  const [open, setOpen] = useState(false);
  const current = experiences.find((exp) => exp.current) ?? experiences[0];
  const past = current ? experiences.filter((exp) => exp !== current) : [];

  if (!current) return null;

  return (
    <motion.section
      className="section-rhythm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-5">
        {t.label}
      </span>

      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal" />
          </span>
          {current.company}
          <span className="text-ink-faint font-normal text-lg sm:text-xl lg:text-2xl">
            — {current.role}
          </span>
        </p>
        <p className="font-mono text-xs sm:text-sm text-ink-muted whitespace-nowrap">
          {current.period} · {current.location}
        </p>
      </div>

      {past.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline underline-offset-4"
          >
            {open ? t.hide_full : `${t.view_full} (${experiences.length})`}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              ⌄
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="history"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col pt-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.company}
                      className="flex items-baseline justify-between gap-4 flex-wrap py-3.5 border-t border-border"
                    >
                      <span>
                        <span className="font-medium">{exp.role}</span>
                        <span className="text-ink-muted"> — {exp.company}</span>
                      </span>
                      <span className="font-mono text-xs text-ink-faint whitespace-nowrap">
                        {exp.period} · {exp.location}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.section>
  );
}
