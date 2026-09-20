import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

interface Repo {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

interface StarredReposCardProps {
  repos: Repo[];
  t: Translations["starred"];
}

export function StarredReposCard({ repos, t }: StarredReposCardProps) {
  const displayRepos = repos.slice(0, 4);

  return (
    <motion.div
      className="card-base card-hover p-5 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2B5C8A"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-ink">{t.title}</h2>
        <motion.a
          href="https://github.com/enzoftware?tab=stars"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-accent hover:underline font-medium"
          whileHover={{ x: 2 }}
        >
          {t.view_all}
        </motion.a>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 justify-between">
        {displayRepos.map((repo, i) => (
          <motion.a
            key={repo.full_name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-elevated transition-colors"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.07, duration: 0.4 }}
            whileHover={{ x: 3 }}
            data-mixpanel="starred_repo_click"
            data-repo={repo.full_name}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#999"
              className="flex-shrink-0"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-ink truncate font-mono">
                {repo.full_name}
              </p>
              {repo.description && (
                <p className="text-xs text-ink-muted truncate mt-0.5 leading-tight">
                  {repo.description}
                </p>
              )}
            </div>
            <div className="text-ink-muted text-xs flex-shrink-0 font-mono">
              {repo.stargazers_count >= 1000
                ? `${(repo.stargazers_count / 1000).toFixed(1)}k`
                : repo.stargazers_count}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
