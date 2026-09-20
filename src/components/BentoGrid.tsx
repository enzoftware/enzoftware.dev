import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroCard } from "./HeroCard";
import { SkillsCard } from "./SkillsCard";
import { ExperienceCard } from "./ExperienceCard";
import { FeaturedProjectsCard } from "./FeaturedProjectsCard";
import { StarredReposCard } from "./StarredReposCard";
import { SocialCard } from "./SocialCard";
import { ContactCard } from "./ContactCard";
import { translations, type Locale } from "../i18n/translations";

interface Repo {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

interface BentoGridProps {
  avatarUrl: string;
  starredRepos: Repo[];
}

export function BentoGrid({ avatarUrl, starredRepos }: BentoGridProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  const toggleLocale = () => setLocale((l) => (l === "en" ? "es" : "en"));

  return (
    <div className="relative w-full lg:h-dvh overflow-x-hidden">
      {/* Language toggle — card-styled, fixed overlay */}
      <motion.button
        onClick={toggleLocale}
        className="fixed top-3 right-3 z-50 flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-xl shadow-md text-xs font-semibold text-ink hover:border-accent/40 hover:shadow-lg transition-all select-none"
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle language"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2B5C8A"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
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

      <div className="bento-container">
        <div className="bento-hero h-full">
          <HeroCard t={t.hero} avatarUrl={avatarUrl} />
        </div>
        <div className="bento-skills h-full">
          <SkillsCard t={t.skills} />
        </div>
        <div className="bento-exp h-full">
          <ExperienceCard t={t.experience} />
        </div>
        <div className="bento-social h-full">
          <SocialCard t={t.social} />
        </div>
        <div className="bento-contact h-full">
          <ContactCard t={t.contact} />
        </div>
        <div className="bento-projects h-full">
          <FeaturedProjectsCard t={t.projects} />
        </div>
        <div className="bento-starred h-full">
          <StarredReposCard repos={starredRepos} t={t.starred} />
        </div>
      </div>
    </div>
  );
}
