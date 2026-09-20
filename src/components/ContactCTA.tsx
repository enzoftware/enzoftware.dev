import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import {
  ActivityStack,
  type LatestPost,
  type RecentRepo,
} from "./ActivityStack";
import type { ExperienceEntry } from "./ExperienceModal";

interface ContactCTAProps {
  t: Translations["contact"];
  activityT: Pick<
    Translations,
    "current" | "modal" | "signature" | "latest_post" | "recent_activity"
  >;
  experiences: ExperienceEntry[];
  repos: RecentRepo[];
  post: LatestPost | null;
}

export function ContactCTA({
  t,
  activityT,
  experiences,
  repos,
  post,
}: ContactCTAProps) {
  return (
    <motion.section
      className="relative bg-surface-elevated border-t border-border overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-1/3 -left-1/4 w-[60%] h-[140%] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
      />

      <div className="relative section-gutter grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-16 gap-y-12 py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <motion.p
            className="font-mono text-sm text-ink-muted"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            {t.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display font-semibold text-[clamp(2.1rem,6vw,4.2rem)] leading-[1.02] tracking-tight mt-4 text-ink"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            {t.headline_1}{" "}
            <em className="not-italic text-flair">{t.headline_2}</em>
          </motion.h2>

          <motion.a
            href="mailto:hi@enzoftware.dev?subject=Let%27s%20build%20something"
            className="group mt-10 sm:mt-12 inline-flex items-center gap-4 bg-accent hover:bg-accent-light text-surface font-mono text-base sm:text-lg rounded-full pl-7 pr-3 py-3 sm:py-4 transition-colors"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.55 }}
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            data-mixpanel="contact_email_click"
          >
            hi@enzoftware.dev
            <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface/20 group-hover:rotate-45 transition-transform duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 19 19 5M19 5H8M19 5v11"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>

          <motion.p
            className="mt-6 text-sm text-ink-faint"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.5 }}
          >
            {t.note}
          </motion.p>
        </div>

        <ActivityStack
          t={activityT}
          experiences={experiences}
          repos={repos}
          post={post}
        />
      </div>
    </motion.section>
  );
}
