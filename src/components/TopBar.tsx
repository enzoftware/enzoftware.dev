import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "../i18n/translations";
import type { Theme } from "../lib/theme";

interface TopBarProps {
  avatarUrl: string;
  name: string;
  locale: Locale;
  langToggleLabel: string;
  onToggleLocale: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function TopBar({
  avatarUrl,
  name,
  locale,
  langToggleLabel,
  onToggleLocale,
  theme,
  onToggleTheme,
}: TopBarProps) {
  return (
    <motion.div
      className="sticky top-0 z-50 flex items-center justify-between section-gutter py-3 bg-surface/70 backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--color-glass-border)]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#top"
        aria-label="Back to top"
        className="block w-9 h-9 rounded-full overflow-hidden border border-border hover:border-accent/60 transition-colors"
      >
        <img
          src={avatarUrl}
          alt={name}
          width={36}
          height={36}
          className="w-full h-full object-cover"
        />
      </a>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          className="flex items-center justify-center w-8 h-8 rounded-full border border-border/70 bg-[var(--color-glass)] text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.svg
                key="moon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="sun"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66 4.93 19.07M19.07 4.93l-1.41 1.41" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        <button
          type="button"
          onClick={onToggleLocale}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-[var(--color-glass)] backdrop-blur-sm text-xs font-semibold text-ink hover:border-accent/40 transition-colors select-none"
          aria-label="Toggle language"
        >
          <span className="text-ink-muted font-mono">
            {locale === "en" ? "EN" : "ES"}
          </span>
          <span className="w-px h-3 bg-border" />
          <AnimatePresence mode="wait">
            <motion.span
              key={langToggleLabel}
              className="text-accent font-mono"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
            >
              {langToggleLabel}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
