import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { SocialsRow, type SocialEntry } from "./SocialsRow";
import { InteractiveBubble } from "./InteractiveBubble";

const HEADLINE_ROTATION_MS = 8000;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface HeroCardProps {
  t: Translations["hero"];
  socialT: Translations["social"];
  socials: SocialEntry[];
  onOpenSpeaking: () => void;
  onOpenPublications: () => void;
  onOpenProjects: () => void;
  talksCount?: number;
  publicationsCount?: number;
  projectsCount?: number;
}

export function HeroCard({
  t,
  socialT,
  socials,
  onOpenSpeaking,
  onOpenPublications,
  onOpenProjects,
  talksCount = 1,
  publicationsCount = 4,
  projectsCount = 3,
}: HeroCardProps) {
  const headlines = t.headlines?.length ? t.headlines : [t.subtitle];
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    if (headlines.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % headlines.length);
    }, HEADLINE_ROTATION_MS);

    return () => window.clearInterval(id);
  }, [headlines.length]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center lg:h-full lg:justify-start"
    >
      <motion.h1 variants={item} className="font-display text-hero text-ink">
        {t.name_line1}
        <br />
        {t.name_line2}
      </motion.h1>

      <motion.div
        variants={item}
        className="mt-3 h-7 lg:h-8 overflow-hidden"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={headlineIndex}
            className="text-ink text-base lg:text-lg font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {headlines[headlineIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.p
        variants={item}
        className="text-ink-muted text-base lg:text-lg leading-snug measure mt-1.5"
      >
        {t.bio}
      </motion.p>

      {/* Interactive Bubbles inviting the visitor to explore expertise */}
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-1.5 mt-2.5"
        role="group"
        aria-label="Interactive expertise topics"
      >
        <InteractiveBubble
          label={t.badge_flutter}
          count={talksCount}
          hint={t.bubble_hint}
          colorVariant="signal"
          onClick={onOpenSpeaking}
          dataTrack="hero_bubble_speaking"
        />

        <InteractiveBubble
          label={t.badge_kodeco}
          count={publicationsCount}
          hint={t.bubble_hint}
          colorVariant="accent"
          onClick={onOpenPublications}
          dataTrack="hero_bubble_publications"
        />

        <InteractiveBubble
          label={t.badge_projects}
          count={projectsCount}
          hint={t.bubble_hint}
          colorVariant="flair"
          onClick={onOpenProjects}
          dataTrack="hero_bubble_projects"
        />
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-4 mt-3"
      >
        <a
          href="mailto:hi@enzoftware.dev?subject=Let%27s%20build%20something"
          className="inline-flex items-center justify-center rounded-full bg-accent-solid hover:bg-accent-solid-hover text-on-accent font-mono text-sm font-semibold px-5 py-2.5 transition-colors"
          data-track="hero_contact_click"
        >
          {t.contact_cta}
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-muted hover:text-accent transition-colors"
          data-track="hero_resume_click"
        >
          {t.resume_cta}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 19 19 5M19 5H8M19 5v11"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <SocialsRow t={socialT} socials={socials} />
      </motion.div>
    </motion.div>
  );
}
