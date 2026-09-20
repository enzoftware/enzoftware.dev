import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { experiences } from "../data/experience";

interface ExperienceCardProps {
  t: Translations["experience"];
}

export function ExperienceCard({ t }: ExperienceCardProps) {
  return (
    <motion.div
      className="card-base card-hover p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-sm font-semibold text-ink">{t.title}</h2>
        <span className="ml-auto text-xs text-ink-muted font-mono">
          {t.years}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="flex gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
              <div
                className={
                  exp.current
                    ? "w-2.5 h-2.5 rounded-full bg-accent"
                    : "w-2.5 h-2.5 rounded-full border-2 border-accent/40"
                }
              />
              {i < experiences.length - 1 && (
                <div className="w-px flex-1 bg-border min-h-[16px]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <span className="text-sm font-semibold text-ink leading-tight">
                  {exp.company}
                </span>
                {exp.current && (
                  <span className="text-xs text-accent font-mono">
                    {t.current}
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-muted mt-0.5">{exp.role}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs text-ink-muted font-mono">
                  {exp.period}
                </span>
                <span className="text-ink-muted/40 text-xs">·</span>
                <span className="text-xs text-ink-muted">{exp.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
