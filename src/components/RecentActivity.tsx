import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { relativeTime } from "../lib/relativeTime";

export interface RecentRepo {
  name: string;
  html_url: string;
  pushed_at: string;
}

interface RecentActivityProps {
  t: Translations["recent_activity"];
  repos: RecentRepo[];
}

export function RecentActivity({ t, repos }: RecentActivityProps) {
  if (repos.length === 0) return null;

  return (
    <motion.section
      className="section-rhythm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-4">
        {t.label}
      </span>
      <div className="flex flex-col">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 py-2.5 font-mono text-sm border-t border-dashed border-border first:border-t-0 text-ink hover:text-accent transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            data-mixpanel="recent_activity_click"
            data-repo={repo.name}
          >
            <span>{repo.name}</span>
            <span className="text-ink-faint whitespace-nowrap">
              {relativeTime(repo.pushed_at)}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
