import { isValidHttpsUrl } from "./validation";
import { reportFetchError } from "./telemetry";

export interface GithubRepo {
  name: string;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
}

const TIMEOUT_MS = 10000;

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchGithubProfileAvatar(
  username: string,
): Promise<string | null> {
  try {
    const profileRes = await fetchWithTimeout(
      `https://api.github.com/users/${username}`,
      TIMEOUT_MS,
    );
    if (!profileRes.ok)
      throw new Error(`GitHub profile returned ${profileRes.status}`);

    const profile = await profileRes.json();
    if (isValidHttpsUrl(profile.avatar_url)) {
      return profile.avatar_url;
    }
  } catch (error) {
    await reportFetchError("GitHub_Profile", error);
  }
  return null;
}

export async function fetchGithubRepos(
  username: string,
  excludedRepos: string[],
): Promise<GithubRepo[]> {
  try {
    const reposRes = await fetchWithTimeout(
      `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`,
      TIMEOUT_MS,
    );
    if (!reposRes.ok)
      throw new Error(`GitHub repos returned ${reposRes.status}`);

    const repos = await reposRes.json();
    return repos
      .filter(
        (r: Record<string, unknown>) =>
          !r.fork &&
          !excludedRepos.includes(r.name as string) &&
          isValidHttpsUrl(r.html_url as string),
      )
      .map((r: Record<string, unknown>) => ({
        name: r.name as string,
        html_url: r.html_url as string,
        pushed_at: r.pushed_at as string,
        stargazers_count: (r.stargazers_count as number) ?? 0,
      }));
  } catch (error) {
    await reportFetchError("GitHub_Repos", error);
  }
  return [];
}
