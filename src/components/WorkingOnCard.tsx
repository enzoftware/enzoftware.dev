import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { relativeTime } from "../lib/relativeTime";

export interface WorkingOnRepo {
  name: string;
  html_url: string;
  pushed_at: string;
}

interface WorkingOnCardProps {
  t: Translations["working_on"];
  repos: WorkingOnRepo[];
}

export function WorkingOnCard({ t, repos }: WorkingOnCardProps) {
  return (
    <motion.div
      className="fixed bottom-20 right-3 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-6 z-40 flex flex-col gap-2.5 px-4 py-3.5 bg-white border border-border rounded-2xl shadow-sm w-[220px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
        <p className="text-[11px] text-ink-muted font-mono leading-none">
          {t.label}
        </p>
      </div>

      {repos.length === 0 ? (
        <p className="text-xs text-ink-muted">{t.empty}</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between gap-2 text-xs text-ink hover:text-accent transition-colors"
                data-mixpanel="working_on_click"
                data-repo={repo.name}
              >
                <span className="font-semibold truncate">{repo.name}</span>
                <span className="text-ink-muted font-mono text-[10px] flex-shrink-0">
                  {relativeTime(repo.pushed_at)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
