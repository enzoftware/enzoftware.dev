import { useEffect, useState, type ComponentType } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { relativeTime } from "../lib/relativeTime";
import { ExperienceModal, type ExperienceEntry } from "./ExperienceModal";
import type { SocialEntry } from "./SocialsRow";
import type { Article } from "./ArticlesModal";
import type { SpeakingEntry } from "./SpeakingModal";
import type { ProjectEntry } from "./ProjectsModal";
import type { GithubRepo } from "../lib/fetchGithub";
import { AppStoreIcon, PlayStoreIcon, STORE_CHIP_CLASS } from "./StoreIcons";

export type RecentRepo = GithubRepo;

interface ActivityStackProps {
  t: Pick<
    Translations,
    | "current"
    | "modal"
    | "signature"
    | "author_row"
    | "speaking_row"
    | "projects_row"
    | "opensource_row"
    | "projects_modal"
  >;
  experiences: ExperienceEntry[];
  repos: RecentRepo[];
  topRepos: RecentRepo[];
  articles: Article[];
  talks: SpeakingEntry[];
  projects: ProjectEntry[];
  socials: SocialEntry[];
  onOpenArticles: () => void;
  onOpenSpeaking: () => void;
  onOpenProjects: () => void;
}

// Written out as full class names (rather than built with template
// interpolation) so Tailwind's content scanner can see and generate them.
const DOT_COLOR_CLASSES = {
  "dot-1": "bg-dot-1",
  "dot-2": "bg-dot-2",
  "dot-3": "bg-dot-3",
  "dot-4": "bg-dot-4",
  "dot-5": "bg-dot-5",
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

function RowCta({
  label,
  onClick,
  dataTrack,
}: {
  label: string;
  onClick: () => void;
  dataTrack?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-track={dataTrack}
      className="inline-flex items-center gap-1 mt-2 font-mono text-xs lg:text-sm text-accent hover:text-accent-light transition-colors"
    >
      {label}
      <span aria-hidden="true">→</span>
    </button>
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

function FadeIn({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  // MotionConfig(reducedMotion="user") only suppresses transform/layout
  // animations, not opacity — without this, the fade from shimmer to real
  // content still runs its full duration for reduced-motion users, which
  // can race an a11y scan mid-transition and report a false-positive
  // contrast violation on partially-transparent text.
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loading ? "skeleton" : "content"}
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
      >
        {loading ? <ShimmerLines /> : children}
      </motion.div>
    </AnimatePresence>
  );
}

function projectLinkChips(
  project: ProjectEntry,
  t: Translations["projects_modal"],
) {
  const chips: {
    key: string;
    label: string;
    url: string;
    icon?: ComponentType;
  }[] = [];
  if (project.links.web)
    chips.push({ key: "web", label: t.view_web, url: project.links.web });
  if (project.links.appStore)
    chips.push({
      key: "appStore",
      label: t.view_app_store,
      url: project.links.appStore,
      icon: AppStoreIcon,
    });
  if (project.links.playStore)
    chips.push({
      key: "playStore",
      label: t.view_play_store,
      url: project.links.playStore,
      icon: PlayStoreIcon,
    });
  if (project.links.github)
    chips.push({
      key: "github",
      label: t.view_github,
      url: project.links.github,
    });
  return chips;
}

export function ActivityStack({
  t,
  experiences,
  repos,
  topRepos,
  articles,
  talks,
  projects,
  socials,
  onOpenArticles,
  onOpenSpeaking,
  onOpenProjects,
}: ActivityStackProps) {
  const [loading, setLoading] = useState(true);
  // See the comment on FadeIn's own useReducedMotion() call below — the
  // MotionConfig(reducedMotion="user") set higher up only suppresses
  // transform/layout animations, not opacity, so this card's own fade-in
  // needs the same explicit guard.
  const shouldReduceMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const current = experiences.find((exp) => exp.current);
  const linkedinUrl = socials.find((s) => s.label === "LinkedIn")?.url;

  const latestArticle = articles[0] ?? null;
  const latestTalk = talks[0] ?? null;
  const featuredProject =
    projects.find((p) => p.featured) ?? projects[0] ?? null;

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <motion.div
        className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-glass backdrop-blur-xl overflow-x-hidden overflow-y-auto lg:max-h-[75dvh]"
        initial={{
          opacity: shouldReduceMotion ? 1 : 0,
          y: shouldReduceMotion ? 0 : 16,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {current &&
          (() => {
            const hasStoreLinks = Boolean(
              current.links?.appStore || current.links?.playStore,
            );
            const canLinkWeb = !hasStoreLinks && current.links?.web;

            return (
              <div className="p-4">
                <RowHeader label={t.current.label} dotColor="dot-1" />
                {canLinkWeb ? (
                  <a
                    href={current.links?.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                    data-track="current_role_link_web"
                  >
                    <span className="font-display text-xl lg:text-3xl text-ink leading-snug group-hover:text-accent transition-colors">
                      {current.company}
                      <span
                        className="ml-1.5 text-sm text-ink-faint group-hover:text-accent transition-colors align-middle"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                ) : (
                  <p className="font-display text-xl lg:text-3xl text-ink leading-snug">
                    {current.company}
                  </p>
                )}
                <p className="font-mono text-sm lg:text-base text-ink-muted mt-1">
                  {current.role}
                </p>
                {hasStoreLinks && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {current.links?.appStore && (
                      <a
                        href={current.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={STORE_CHIP_CLASS}
                        data-track="current_role_link_app_store"
                      >
                        <AppStoreIcon />
                        {t.projects_modal.view_app_store}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {current.links?.playStore && (
                      <a
                        href={current.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={STORE_CHIP_CLASS}
                        data-track="current_role_link_play_store"
                      >
                        <PlayStoreIcon />
                        {t.projects_modal.view_play_store}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
                <RowCta
                  label={`${t.current.cta} (${experiences.length})`}
                  onClick={() => setModalOpen(true)}
                  dataTrack="current_role_cta"
                />
              </div>
            );
          })()}

        {/* Article author — latest article across Medium, Substack & Kodeco */}
        <div className="p-4">
          <RowHeader label={t.author_row.label} dotColor="dot-2" />
          <FadeIn loading={loading}>
            {latestArticle ? (
              <div className="flex flex-col gap-1">
                <a
                  href={latestArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1"
                  data-track="latest_article_click"
                  data-source={latestArticle.source}
                >
                  <span className="text-base lg:text-lg font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
                    {latestArticle.title}
                  </span>
                  <span className="font-mono text-xs lg:text-sm text-ink-faint">
                    {latestArticle.source} ·{" "}
                    {relativeTime(latestArticle.publishedAt)}
                  </span>
                </a>
                <RowCta
                  label={t.author_row.cta}
                  onClick={onOpenArticles}
                  dataTrack="author_row_cta"
                />
              </div>
            ) : (
              <p className="text-sm text-ink-muted">{t.author_row.empty}</p>
            )}
          </FadeIn>
        </div>

        {/* Speaker — latest conference talk */}
        <div className="p-4">
          <RowHeader label={t.speaking_row.label} dotColor="dot-3" />
          <FadeIn loading={loading}>
            {latestTalk ? (
              <div className="flex flex-col gap-1">
                <span className="text-base lg:text-lg font-semibold text-ink leading-snug">
                  {latestTalk.title}
                </span>
                <span className="font-mono text-xs lg:text-sm text-ink-faint">
                  {latestTalk.event} · {latestTalk.year}
                </span>
                <RowCta
                  label={t.speaking_row.cta}
                  onClick={onOpenSpeaking}
                  dataTrack="speaking_row_cta"
                />
              </div>
            ) : (
              <p className="text-sm text-ink-muted">{t.speaking_row.empty}</p>
            )}
          </FadeIn>
        </div>

        {/* Featured project — pulled from experience, linking out to live apps/sites */}
        <div className="p-4">
          <RowHeader label={t.projects_row.label} dotColor="dot-4" />
          <FadeIn loading={loading}>
            {featuredProject ? (
              <div className="flex flex-col gap-1.5">
                <span className="text-base lg:text-lg font-semibold text-ink leading-snug">
                  {featuredProject.title}
                </span>
                <span className="text-sm text-ink-muted leading-snug">
                  {featuredProject.tagline}
                </span>
                {projectLinkChips(featuredProject, t.projects_modal).length >
                  0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectLinkChips(featuredProject, t.projects_modal).map(
                      (chip) => (
                        <a
                          key={chip.key}
                          href={chip.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={STORE_CHIP_CLASS}
                          data-track={`featured_project_link_${chip.key}`}
                          data-project={featuredProject.title}
                        >
                          {chip.icon ? <chip.icon /> : null}
                          {chip.label}
                          <span aria-hidden="true">↗</span>
                        </a>
                      ),
                    )}
                  </div>
                )}
                <RowCta
                  label={t.projects_row.cta}
                  onClick={onOpenProjects}
                  dataTrack="projects_row_cta"
                />
              </div>
            ) : (
              <p className="text-sm text-ink-muted">{t.projects_row.empty}</p>
            )}
          </FadeIn>
        </div>

        {/* Open source contributor — top starred repos & latest commits, side by side */}
        <div className="p-4">
          <RowHeader label={t.opensource_row.label} dotColor="dot-5" />
          {repos.length === 0 && topRepos.length === 0 ? (
            <p className="text-sm text-ink-muted">{t.opensource_row.empty}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mb-1.5">
                  {t.opensource_row.top_repos_label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {topRepos.slice(0, 3).map((repo) => (
                    <li key={`star-${repo.name}`} className="min-w-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-baseline gap-2 text-sm text-ink hover:text-accent transition-colors"
                        data-track="opensource_top_repo_click"
                        data-repo={repo.name}
                      >
                        <span className="font-medium truncate min-w-0 flex-1">
                          {repo.name}
                        </span>
                        <span className="font-mono text-xs text-ink-faint flex-shrink-0 flex items-center gap-1 w-12">
                          <span
                            className="text-sm leading-none text-dot-5"
                            aria-hidden="true"
                            data-testid="repo-star-icon"
                          >
                            ★
                          </span>
                          <span className="flex-1 text-right tabular-nums">
                            {repo.stargazers_count}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mb-1.5">
                  {t.opensource_row.latest_commits_label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {repos.slice(0, 3).map((repo) => (
                    <li key={`commit-${repo.name}`} className="min-w-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-baseline gap-2 text-sm text-ink hover:text-accent transition-colors"
                        data-track="opensource_latest_commit_click"
                        data-repo={repo.name}
                      >
                        <span className="font-medium truncate min-w-0 flex-1">
                          {repo.name}
                        </span>
                        <span className="font-mono text-xs text-ink-faint flex-shrink-0">
                          {relativeTime(repo.pushed_at)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
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
