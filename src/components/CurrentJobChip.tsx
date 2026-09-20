import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import type { ExperienceEntry } from "./ExperienceCard";

interface CurrentJobChipProps {
  t: Translations["current_job"];
  experiences: ExperienceEntry[];
}

export function CurrentJobChip({ t, experiences }: CurrentJobChipProps) {
  const currentJob = experiences.find((exp) => exp.current);
  if (!currentJob) return null;

  return (
    <motion.div
      className="fixed top-3 left-3 lg:absolute lg:top-6 lg:right-6 lg:left-auto z-40 flex items-center gap-2.5 px-4 py-3 bg-white border border-border rounded-2xl shadow-sm max-w-[220px]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-ink-muted font-mono leading-none">
          {t.label}
        </p>
        <p className="text-xs font-semibold text-ink leading-tight mt-1 truncate">
          {currentJob.company} — {currentJob.role}
        </p>
      </div>
    </motion.div>
  );
}
