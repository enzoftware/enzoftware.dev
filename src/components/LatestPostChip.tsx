import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { relativeTime } from "../lib/relativeTime";

export interface LatestPost {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
}

interface LatestPostChipProps {
  t: Translations["latest_post"];
  post: LatestPost | null;
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-2.5" aria-hidden="true">
      <div className="h-3 w-3/4 rounded-full bg-[linear-gradient(90deg,#DDD8CC_25%,#FFFFFF_37%,#DDD8CC_63%)] bg-[length:200%_100%] animate-shimmer" />
      <div className="h-3 w-1/2 rounded-full bg-[linear-gradient(90deg,#DDD8CC_25%,#FFFFFF_37%,#DDD8CC_63%)] bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

function Body({
  t,
  post,
}: {
  t: Translations["latest_post"];
  post: LatestPost | null;
}) {
  if (!post) {
    return <p className="text-xs text-ink-muted">{t.empty}</p>;
  }
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1.5"
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
  );
}

export function LatestPostChip({ t, post }: LatestPostChipProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(id);
  }, []);

  const header = (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
      <p className="text-[11px] text-ink-muted font-mono leading-none uppercase tracking-[0.06em]">
        {t.label}
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop only: fixed floating panel */}
      <motion.div
        className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 z-40 flex-col gap-3 px-4 py-4 bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm w-[230px]"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {header}
        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? "skeleton" : "content"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? <Skeleton /> : <Body t={t} post={post} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Mobile / tablet: normal in-flow section */}
      <motion.div
        className="lg:hidden section-gutter section-rhythm flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
      >
        {header}
        {loading ? <Skeleton /> : <Body t={t} post={post} />}
      </motion.div>
    </>
  );
}
