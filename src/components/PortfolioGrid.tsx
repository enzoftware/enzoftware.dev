import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroCard } from "./HeroCard";
import { ExperienceCard } from "./ExperienceCard";
import { SocialsCarousel } from "./SocialsCarousel";
import { CurrentJobChip } from "./CurrentJobChip";
import { WorkingOnCard, type WorkingOnRepo } from "./WorkingOnCard";
import { ContactChip } from "./ContactChip";
import { translations, type Locale } from "../i18n/translations";

interface PortfolioGridProps {
  avatarUrl: string;
  workingOnRepos: WorkingOnRepo[];
}

export function PortfolioGrid({
  avatarUrl,
  workingOnRepos,
}: PortfolioGridProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  const toggleLocale = () => setLocale((l) => (l === "en" ? "es" : "en"));

  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden">
      {/* Language toggle */}
      <motion.button
        onClick={toggleLocale}
        className="fixed bottom-3 left-3 z-50 flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-xl shadow-sm text-xs font-semibold text-ink hover:border-accent/40 transition-all select-none"
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle language"
      >
        <span className="text-ink-muted font-mono">
          {locale === "en" ? "EN" : "ES"}
        </span>
        <span className="w-px h-3 bg-border" />
        <AnimatePresence mode="wait">
          <motion.span
            key={t.lang_toggle}
            className="text-accent"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            {t.lang_toggle}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <CurrentJobChip t={t.current_job} />
      <WorkingOnCard t={t.working_on} repos={workingOnRepos} />
      <ContactChip t={t.contact} />

      <div className="portfolio-container">
        <div className="portfolio-hero">
          <HeroCard t={t.hero} avatarUrl={avatarUrl} />
        </div>
        <div className="portfolio-experience">
          <ExperienceCard t={t.experience} />
        </div>
        <div className="portfolio-social">
          <SocialsCarousel t={t.social} />
        </div>
      </div>
    </div>
  );
}
