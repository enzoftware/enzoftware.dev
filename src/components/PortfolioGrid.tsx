import { useState } from "react";
import { TopBar } from "./TopBar";
import { HeroCard } from "./HeroCard";
import { NowBuilding, type ExperienceEntry } from "./NowBuilding";
import { RecentActivity, type RecentRepo } from "./RecentActivity";
import { LatestPostChip, type LatestPost } from "./LatestPostChip";
import { ContactCTA } from "./ContactCTA";
import { SocialsRow, type SocialEntry } from "./SocialsRow";
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
        locale={locale}
        langToggleLabel={t.lang_toggle}
        onToggleLocale={toggleLocale}
      />

      <main className="section-gutter">
        <div className="pt-10 sm:pt-14 lg:pt-20 pb-4">
          <HeroCard t={t.hero} avatarUrl={avatarUrl} />
        </div>

        <hr className="border-border" />

        <NowBuilding t={t.now_building} experiences={experiences} />

        <hr className="border-border" />

        <RecentActivity t={t.recent_activity} repos={recentRepos} />
      </main>

      <LatestPostChip t={t.latest_post} post={latestPost} />

      <ContactCTA
        t={t.contact}
        signatureT={t.signature}
        name={fullName}
        experiences={experiences}
      />

      <SocialsRow t={t.social} name={fullName} socials={socials} />

      <footer className="section-gutter py-6 font-mono text-xs text-ink-faint">
        © {new Date().getFullYear()} {fullName}
      </footer>
    </div>
  );
}
