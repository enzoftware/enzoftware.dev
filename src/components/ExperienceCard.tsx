import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const experiences = [
  {
    company: "Clipp",
    role: "Senior Mobile Engineer",
    period: "Oct 2025 – Feb 2026",
    location: "Remote, NY",
    color: "bg-violet-500",
    borderColor: "border-violet-200",
    bgColor: "bg-violet-50",
    current: true,
  },
  {
    company: "Somnio Software",
    role: "Senior Flutter Developer",
    period: "Nov 2024 – Jun 2025",
    location: "Remote, UY",
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    current: false,
  },
  {
    company: "Very Good Ventures",
    role: "Senior Flutter Developer",
    period: "Feb – Jun 2024",
    location: "Remote, US",
    color: "bg-teal-500",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50",
    current: false,
  },
  {
    company: "Superformula",
    role: "Senior Software Engineer",
    period: "Nov 2021 – Jan 2024",
    location: "Remote, US",
    color: "bg-amber-500",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    current: false,
  },
];

interface ExperienceCardProps {
  t: Translations["experience"];
}

export function ExperienceCard({ t }: ExperienceCardProps) {
  return (
    <motion.div
      className="card-base card-hover p-5 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2B5C8A"
            strokeWidth="2"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-ink">{t.title}</h2>
        <span className="ml-auto text-xs text-ink-muted font-mono bg-surface-elevated px-2 py-0.5 rounded-md border border-border">
          {t.years}
        </span>
      </div>

      {/* Experience list */}
      <div className="flex flex-col gap-3">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className={`flex gap-3 p-3 rounded-xl border transition-colors ${exp.current ? `${exp.borderColor} ${exp.bgColor}` : "border-transparent hover:bg-surface-elevated hover:border-border"}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
              <div className={`w-2.5 h-2.5 rounded-full ${exp.color}`} />
              {i < experiences.length - 1 && (
                <div className="w-px flex-1 bg-border min-h-[12px]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="text-sm font-semibold text-ink leading-tight">
                  {exp.company}
                </span>
                {exp.current && (
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-700 font-medium flex-shrink-0">
                    current
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
