cat << 'INNER_EOF' > src/pages/index.astro
---
import { getCollection } from "astro:content";
import Layout from "../layouts/Layout.astro";
import { PortfolioGrid } from "../components/PortfolioGrid";
import { Analytics } from "../components/Analytics";
import type { RecentRepo, LatestPost } from "../components/ActivityStack";
import excludedReposJson from "../data/excluded-repos.json";
import { isValidHttpsUrl } from "../lib/validation";
import "../styles/global.css";

const excludedRepos = excludedReposJson as string[];

const experiences = (await getCollection("experience"))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => entry.data);

const socials = (await getCollection("socials"))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => ({ label: entry.data.label, url: entry.data.url }));

const talks = (await getCollection("speaking"))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => entry.data);

const publications = (await getCollection("publications"))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => entry.data);

const projects = (await getCollection("projects"))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => entry.data);

// Fetch GitHub data at build time
let avatarUrl = "https://avatars.githubusercontent.com/u/22333076?v=4";
let recentRepos: RecentRepo[] = [];

try {
  const [profileRes, reposRes] = await Promise.all([
    fetch("https://api.github.com/users/enzoftware", {
      headers: { Accept: "application/vnd.github.v3+json" },
    }),
    fetch(
      "https://api.github.com/users/enzoftware/repos?sort=pushed&direction=desc&per_page=20",
      { headers: { Accept: "application/vnd.github.v3+json" } },
    ),
  ]);

  if (profileRes.ok) {
    const profile = await profileRes.json();
    if (isValidHttpsUrl(profile.avatar_url)) {
      avatarUrl = profile.avatar_url;
    }
  }

  if (reposRes.ok) {
    const repos = await reposRes.json();
    recentRepos = repos
      .filter(
        (r: Record<string, unknown>) =>
          !r.fork &&
          !excludedRepos.includes(r.name as string) &&
          isValidHttpsUrl(r.html_url),
      )
      .slice(0, 3)
      .map((r: Record<string, unknown>) => ({
        name: r.name as string,
        html_url: r.html_url as string,
        pushed_at: r.pushed_at as string,
      }));
  }
} catch (_e) {
  // Use defaults on fetch failure
}

import { fetchAllArticles } from "../lib/fetchArticles";

// Fetch the latest Substack post at build time (falls back to null on failure)
let latestPost: LatestPost | null = null;
let articles = await fetchAllArticles();

if (articles.length > 0) {
  const latestSubstack = articles.find((a) => a.source === "Substack");
  if (latestSubstack) {
    latestPost = {
      title: latestSubstack.title,
      url: latestSubstack.url,
      publishedAt: latestSubstack.publishedAt,
      source: "Substack",
    };
  }
}

const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY ?? "";
const posthogHost =
  import.meta.env.PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
---

<Layout>
  <main class="w-full min-h-dvh lg:h-dvh bg-surface">
    <PortfolioGrid
      client:load
      avatarUrl={avatarUrl}
      experiences={experiences}
      socials={socials}
      recentRepos={recentRepos}
      latestPost={latestPost}
      articles={articles}
      talks={talks}
      publications={publications}
      projects={projects}
    />
  </main>
  <Analytics client:load apiKey={posthogKey} apiHost={posthogHost} />
</Layout>
INNER_EOF
