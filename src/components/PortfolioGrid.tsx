import { useState } from "react";
import { TopBar } from "./TopBar";
import { HeroCard } from "./HeroCard";
import { ContactCTA } from "./ContactCTA";
import type { ExperienceEntry } from "./ExperienceModal";
import type { RecentRepo, LatestPost } from "./ActivityStack";
import type { SocialEntry } from "./SocialsRow";
import { translations, type Locale } from "../i18n/translations";

interface PortfolioGridProps {
  avatarUrl: string;
  experiences: ExperienceEntry[];
  socials: SocialEntry[];
  recentRepos: RecentRepo[];
  latestPost: LatestPost | null;
}

export function PortfolioGrid({
  avatarUrl,
  experiences,
  socials,
  recentRepos,
  latestPost,
}: PortfolioGridProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];
  const fullName = `${t.hero.name_line1} ${t.hero.name_line2}`;

  const toggleLocale = () => setLocale((l) => (l === "en" ? "es" : "en"));

  return (
    <div id="top" className="relative w-full min-h-dvh">
      <TopBar
        avatarUrl={avatarUrl}
        name={fullName}
        locale={locale}
        langToggleLabel={t.lang_toggle}
        onToggleLocale={toggleLocale}
      />

      <main className="section-gutter">
        <div className="pt-10 sm:pt-14 lg:pt-20 pb-16">
          <HeroCard t={t.hero} socialT={t.social} socials={socials} />
        </div>
      </main>

      <ContactCTA
        t={t.contact}
        activityT={t}
        experiences={experiences}
        repos={recentRepos}
        post={latestPost}
      />

      <footer className="section-gutter py-6 font-mono text-xs text-ink-faint">
        © {new Date().getFullYear()} {fullName}
      </footer>
    </div>
  );
}
