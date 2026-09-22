# SOLID Fetching & Clean Architecture

When writing or refactoring data fetching logic (especially external APIs, RSS feeds, or database queries) in this repository, strictly adhere to the following clean code principles:

1. **Single Responsibility Principle (SRP)**:
   - Do not write "god methods" that handle fetching from multiple distinct sources.
   - Each distinct data source MUST be handled by its own isolated function (e.g., `fetchSubstack()`, `fetchMedium()`, `fetchKodeco()`).
   - A single orchestrator function (e.g., `fetchAllArticles()`) can call these individual source functions.

2. **Error Handling & Telemetry**:
   - Wrap external network requests in `try/catch` blocks.
   - Do not let a failure in one data source crash the entire page build or app.
   - You MUST report recurrent or critical fetching errors to PostHog using a server-side telemetry approach (e.g., calling PostHog's `/capture/` HTTP API directly or logging structured errors that our analytics pipeline can ingest).
   - Event name convention for these errors: `build_fetch_error` or `api_fetch_error`, including `properties: { source: string, error: string }`.

3. **Validation & Resilience**:
   - Always validate external data (dates, URLs, shapes) before returning it.
   - Use timeout mechanisms (like `AbortSignal`) to ensure external dependencies don't hang the build indefinitely.
