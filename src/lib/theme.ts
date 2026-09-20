export type Theme = "dark" | "light";

const listeners = new Set<() => void>();

export function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// SSR/build-time render has no DOM state to read; the blocking <head> script
// applies the real theme before paint, so this default never causes a flash
// of the wrong page background — only the toggle icon may swap once on hydrate.
export function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function subscribeTheme(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (_e) {
    // ignore (private browsing / storage disabled)
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "light" ? "#ffffff" : "#1e1e1e");
  listeners.forEach((callback) => callback());
}
