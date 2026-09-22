import { isValidHttpsUrl } from "./validation";
import type { Article } from "../components/ArticlesModal";
import { reportFetchError } from "./telemetry";

const TIMEOUT_MS = 10000;

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchSubstackArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  try {
    const feedRes = await fetchWithTimeout(
      "https://enzoftware.substack.com/feed",
      TIMEOUT_MS,
    );
    if (!feedRes.ok)
      throw new Error(`Substack feed returned ${feedRes.status}`);

    const xml = await feedRes.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (const item of items) {
      const title = item
        .match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]
        ?.trim();
      const link = item
        .match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/)?.[1]
        ?.trim();
      const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();

      if (title && link && pubDate && isValidHttpsUrl(link)) {
        const timestamp = new Date(pubDate).getTime();
        if (Number.isFinite(timestamp)) {
          articles.push({
            title,
            url: link,
            source: "Substack",
            publishedAt: new Date(timestamp).toISOString(),
          });
        }
      }
    }
  } catch (error) {
    await reportFetchError("Substack", error);
  }
  return articles;
}

async function fetchMediumArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  try {
    const feedRes = await fetchWithTimeout(
      "https://medium.com/feed/@enzoftware",
      TIMEOUT_MS,
    );
    if (!feedRes.ok) throw new Error(`Medium feed returned ${feedRes.status}`);

    const xml = await feedRes.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (const item of items) {
      const title =
        item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]?.trim() ||
        item.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
      const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
      const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();

      if (title && link && pubDate && isValidHttpsUrl(link)) {
        const timestamp = new Date(pubDate).getTime();
        if (Number.isFinite(timestamp)) {
          articles.push({
            title,
            url: link,
            source: "Medium",
            publishedAt: new Date(timestamp).toISOString(),
          });
        }
      }
    }
  } catch (error) {
    await reportFetchError("Medium", error);
  }
  return articles;
}

function getKodecoArticles(): Article[] {
  // Fallback: Kodeco is client-side rendered, so we use a hardcoded list of known articles.
  // In a real scenario, we might use a serverless function to fetch from Kodeco's API.
  return [
    {
      title: "Lazy Layouts in Jetpack Compose",
      url: "https://www.kodeco.com/34398400-lazy-layouts-in-jetpack-compose",
      source: "Kodeco",
      publishedAt: new Date("2022-08-08").toISOString(),
    },
    {
      title: "Ktor and GraphQL: Getting Started",
      url: "https://www.kodeco.com/18858740-ktor-and-graphql-getting-started",
      source: "Kodeco",
      publishedAt: new Date("2021-01-18").toISOString(),
    },
    {
      title: "Testing Android Architecture Components",
      url: "https://www.kodeco.com/12678525-testing-android-architecture-components",
      source: "Kodeco",
      publishedAt: new Date("2020-10-12").toISOString(),
    },
  ];
}

export async function fetchAllArticles(): Promise<Article[]> {
  const [substack, medium] = await Promise.all([
    fetchSubstackArticles(),
    fetchMediumArticles(),
  ]);
  const kodeco = getKodecoArticles();

  const allArticles = [...substack, ...medium, ...kodeco];

  return allArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
