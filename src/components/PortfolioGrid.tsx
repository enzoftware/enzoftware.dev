import { useState, useSyncExternalStore } from "react";
import { MotionConfig } from "framer-motion";
import { TopBar } from "./TopBar";
import { HeroCard } from "./HeroCard";
import { ActivityStack } from "./ActivityStack";
import { ContactCTA } from "./ContactCTA";
import { SpeakingModal, type SpeakingEntry } from "./SpeakingModal";
import { PublicationsModal, type PublicationEntry } from "./PublicationsModal";
import { ProjectsModal, type ProjectEntry } from "./ProjectsModal";
import type { ExperienceEntry } from "./ExperienceModal";
import type { RecentRepo, LatestPost } from "./ActivityStack";
import type { SocialEntry } from "./SocialsRow";
import {
  applyTheme,
  getServerThemeSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "../lib/theme";
import { translations, type Locale } from "../i18n/translations";
import { CookieBanner } from "./CookieBanner";
import { CookiePolicyModal } from "./CookiePolicyModal";

interface PortfolioGridProps {
  avatarUrl: string;
  experiences: ExperienceEntry[];
  socials: SocialEntry[];
  recentRepos: RecentRepo[];
  latestPost: LatestPost | null;
  talks?: SpeakingEntry[] | undefined;
  publications?: PublicationEntry[] | undefined;
  projects?: ProjectEntry[] | undefined;
}

export function PortfolioGrid({
  avatarUrl,
  experiences,
  socials,
  recentRepos,
  latestPost,
  talks = [],
  publications = [],
  projects = [],
}: PortfolioGridProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const [cookiePolicyOpen, setCookiePolicyOpen] = useState(false);
  const [speakingOpen, setSpeakingOpen] = useState(false);
  const [publicationsOpen, setPublicationsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const t = translations[locale];
  const fullName = `${t.hero.name_line1} ${t.hero.name_line2}`;

  const toggleLocale = () => setLocale((l) => (l === "en" ? "es" : "en"));
  const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="relative w-full lg:h-dvh flex flex-col">
        <TopBar
          avatarUrl={avatarUrl}
          name={fullName}
          locale={locale}
          langToggleLabel={t.lang_toggle}
          onToggleLocale={toggleLocale}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="flex-1 min-h-0 section-gutter grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-x-16 gap-y-10 lg:items-center py-8 lg:py-0">
          <HeroCard
            t={t.hero}
            socialT={t.social}
            socials={socials}
            onOpenSpeaking={() => setSpeakingOpen(true)}
            onOpenPublications={() => setPublicationsOpen(true)}
            onOpenProjects={() => setProjectsOpen(true)}
            talksCount={talks.length}
            publicationsCount={publications.length}
            projectsCount={projects.length}
          />

          <ActivityStack
            t={t}
            experiences={experiences}
            repos={recentRepos}
            post={latestPost}
            socials={socials}
          />
        </div>

        <ContactCTA
          t={t.contact}
          cookieT={t.cookie_consent}
          name={fullName}
          onOpenCookiePolicy={() => setCookiePolicyOpen(true)}
        />

        <CookieBanner
          t={t.cookie_consent}
          onOpenPolicy={() => setCookiePolicyOpen(true)}
        />

        <CookiePolicyModal
          t={t.cookie_consent}
          open={cookiePolicyOpen}
          onClose={() => setCookiePolicyOpen(false)}
        />
      </div>

      <SpeakingModal
        t={t.speaking_modal}
        talks={talks}
        open={speakingOpen}
        onClose={() => setSpeakingOpen(false)}
      />

      <PublicationsModal
        t={t.publications_modal}
        publications={publications}
        open={publicationsOpen}
        onClose={() => setPublicationsOpen(false)}
      />

      <ProjectsModal
        t={t.projects_modal}
        projects={projects}
        open={projectsOpen}
        onClose={() => setProjectsOpen(false)}
      />
    </MotionConfig>
  );
}
