import { isValidHttpsUrl } from "./validation";
import type { Article } from "../components/ArticlesModal";

export async function fetchAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  // 1. Fetch Substack
  try {
    const feedRes = await fetch("https://enzoftware.substack.com/feed");
    if (feedRes.ok) {
      const xml = await feedRes.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
      for (const item of items) {
        const title = item
          .match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]
          ?.trim();
        const link = item
          .match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/)?.[1]
          ?.trim();
        const pubDate = item
          .match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
          ?.trim();
        if (title && link && pubDate && isValidHttpsUrl(link)) {
          articles.push({
            title,
            url: link,
            source: "Substack",
            publishedAt: new Date(pubDate).toISOString(),
          });
        }
      }
    }
  } catch (_e) {
    // fallback
  }

  // 2. Fetch Medium
  try {
    const feedRes = await fetch("https://medium.com/feed/@enzoftware");
    if (feedRes.ok) {
      const xml = await feedRes.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
      for (const item of items) {
        const title =
          item
            .match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]
            ?.trim() || item.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
        const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
        const pubDate = item
          .match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
          ?.trim();
        if (title && link && pubDate && isValidHttpsUrl(link)) {
          articles.push({
            title,
            url: link,
            source: "Medium",
            publishedAt: new Date(pubDate).toISOString(),
          });
        }
      }
    }
  } catch (_e) {
    // fallback
  }

  // 3. Fallback: Kodeco is client-side rendered, so we use a hardcoded list of known articles.
  // In a real scenario, we might use a serverless function to fetch from Kodeco's API.
  articles.push({
    title: "Lazy Layouts in Jetpack Compose",
    url: "https://www.kodeco.com/34398400-lazy-layouts-in-jetpack-compose",
    source: "Kodeco",
    publishedAt: new Date("2022-08-08").toISOString(),
  });

  articles.push({
    title: "Ktor and GraphQL: Getting Started",
    url: "https://www.kodeco.com/18858740-ktor-and-graphql-getting-started",
    source: "Kodeco",
    publishedAt: new Date("2021-01-18").toISOString(),
  });

  articles.push({
    title: "Testing Android Architecture Components",
    url: "https://www.kodeco.com/12678525-testing-android-architecture-components",
    source: "Kodeco",
    publishedAt: new Date("2020-10-12").toISOString(),
  });

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
