import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { relativeTime } from "../lib/relativeTime";
import { ExperienceModal, type ExperienceEntry } from "./ExperienceModal";
import type { SocialEntry } from "./SocialsRow";

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
  socials: SocialEntry[];
}

// Written out as full class names (rather than built with template
// interpolation) so Tailwind's content scanner can see and generate them.
const DOT_COLOR_CLASSES = {
  "dot-1": "bg-dot-1",
  "dot-2": "bg-dot-2",
  "dot-3": "bg-dot-3",
} as const;

function RowHeader({
  label,
  dotColor,
}: {
  label: string;
  dotColor: keyof typeof DOT_COLOR_CLASSES;
}) {
  return (
    <div className="flex items-center gap-2 mb-2.5 lg:mb-3">
      <span
        className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full ${DOT_COLOR_CLASSES[dotColor]} flex-shrink-0`}
      />
      <p className="text-xs lg:text-sm text-ink-faint font-mono leading-none uppercase tracking-[0.06em]">
        {label}
      </p>
    </div>
  );
}

function ShimmerLines() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <div className="h-3 w-3/4 rounded-full bg-[linear-gradient(90deg,var(--shimmer-a)_25%,var(--shimmer-b)_37%,var(--shimmer-a)_63%)] bg-[length:200%_100%] animate-shimmer" />
      <div className="h-3 w-1/2 rounded-full bg-[linear-gradient(90deg,var(--shimmer-a)_25%,var(--shimmer-b)_37%,var(--shimmer-a)_63%)] bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

export function ActivityStack({
  t,
  experiences,
  repos,
  post,
  socials,
}: ActivityStackProps) {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const current = experiences.find((exp) => exp.current);
  const linkedinUrl = socials.find((s) => s.label === "LinkedIn")?.url;

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <motion.div
        className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-glass backdrop-blur-xl overflow-x-hidden overflow-y-auto lg:max-h-[75dvh]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {current && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="p-4 text-left hover:bg-glass transition-colors"
          >
            <RowHeader label={t.current.label} dotColor="dot-1" />
            <p className="font-display text-xl lg:text-3xl text-ink leading-snug">
              {current.company}
            </p>
            <p className="font-mono text-sm lg:text-base text-ink-muted mt-1">
              {current.role}
            </p>
            <span className="inline-block mt-2 font-mono text-xs lg:text-sm text-accent">
              {t.current.cta} ({experiences.length}) →
            </span>
          </button>
        )}

        <div className="p-4">
          <RowHeader label={t.recent_activity.label} dotColor="dot-2" />
          {repos.length === 0 ? (
            <p className="text-sm text-ink-muted">{t.recent_activity.empty}</p>
          ) : (
            <ul className="flex flex-col gap-2 lg:gap-2.5">
              {repos.slice(0, 3).map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-2 text-base lg:text-lg text-ink hover:text-accent transition-colors"
                    data-track="recent_activity_click"
                    data-repo={repo.name}
                  >
                    <span className="font-medium truncate">{repo.name}</span>
                    <span className="font-mono text-xs lg:text-sm text-ink-faint flex-shrink-0">
                      {relativeTime(repo.pushed_at)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4">
          <RowHeader label={t.latest_post.label} dotColor="dot-3" />
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
                  data-track="latest_post_click"
                  data-source={post.source}
                >
                  <span className="text-base lg:text-lg font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  <span className="font-mono text-xs lg:text-sm text-ink-faint">
                    {post.source} · {relativeTime(post.publishedAt)}
                  </span>
                </a>
              ) : (
                <p className="text-sm text-ink-muted">{t.latest_post.empty}</p>
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
        linkedinUrl={linkedinUrl}
      />
    </>
  );
}
