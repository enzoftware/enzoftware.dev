import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { relativeTime } from "../lib/relativeTime";
import { ExperienceModal, type ExperienceEntry } from "./ExperienceModal";

export interface RecentRepo {
  name: string;
  html_url: string;
  pushed_at: string;
}

export interface LatestPost {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
}

interface ActivityStackProps {
  t: Pick<
    Translations,
    "current" | "modal" | "signature" | "latest_post" | "recent_activity"
  >;
  experiences: ExperienceEntry[];
  repos: RecentRepo[];
  post: LatestPost | null;
}

function RowHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
      <p className="text-[11px] text-ink-faint font-mono leading-none uppercase tracking-[0.06em]">
        {label}
      </p>
    </div>
  );
}

function ShimmerLines() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <div className="h-3 w-3/4 rounded-full bg-[linear-gradient(90deg,#3C3C3C_25%,#2D2D30_37%,#3C3C3C_63%)] bg-[length:200%_100%] animate-shimmer" />
      <div className="h-3 w-1/2 rounded-full bg-[linear-gradient(90deg,#3C3C3C_25%,#2D2D30_37%,#3C3C3C_63%)] bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

export function ActivityStack({
  t,
  experiences,
  repos,
  post,
}: ActivityStackProps) {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const current = experiences.find((exp) => exp.current);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <motion.div
        className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-white/[0.03] backdrop-blur-xl overflow-x-hidden overflow-y-auto lg:max-h-[65dvh]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="p-5">
          <RowHeader label={t.recent_activity.label} />
          {repos.length === 0 ? (
            <p className="text-xs text-ink-muted">{t.recent_activity.empty}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {repos.slice(0, 3).map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-2 text-sm text-ink hover:text-accent transition-colors"
                    data-mixpanel="recent_activity_click"
                    data-repo={repo.name}
                  >
                    <span className="font-medium truncate">{repo.name}</span>
                    <span className="font-mono text-[11px] text-ink-faint flex-shrink-0">
                      {relativeTime(repo.pushed_at)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {current && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="p-5 text-left hover:bg-white/[0.03] transition-colors"
          >
            <RowHeader label={t.current.label} />
            <p className="font-display text-lg text-ink leading-snug">
              {current.company}
            </p>
            <p className="font-mono text-xs text-ink-muted mt-0.5">
              {current.role} {t.signature.role_at} {current.company}
            </p>
            <span className="inline-block mt-2 font-mono text-[11px] text-accent">
              {t.current.cta} ({experiences.length}) →
            </span>
          </button>
        )}

        <div className="p-5">
          <RowHeader label={t.latest_post.label} />
          <AnimatePresence mode="wait">
            <motion.div
              key={loading ? "skeleton" : "content"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? (
                <ShimmerLines />
              ) : post ? (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1"
                  data-mixpanel="latest_post_click"
                  data-source={post.source}
                >
                  <span className="text-sm font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">
                    {post.source} · {relativeTime(post.publishedAt)}
                  </span>
                </a>
              ) : (
                <p className="text-xs text-ink-muted">{t.latest_post.empty}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <ExperienceModal
        t={t.modal}
        experiences={experiences}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
