import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "../i18n/translations";

interface TopBarProps {
  locale: Locale;
  langToggleLabel: string;
  onToggleLocale: () => void;
}

export function TopBar({
  locale,
  langToggleLabel,
  onToggleLocale,
}: TopBarProps) {
  return (
    <motion.div
      className="sticky top-0 z-50 flex items-center justify-between section-gutter py-3.5 bg-surface/55 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#top"
        aria-label="Back to top"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/15 transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <rect
            width="64"
            height="64"
            rx="16"
            fill="currentColor"
            className="text-accent"
          />
          <rect
            x="20"
            y="10"
            width="24"
            height="38"
            rx="4"
            fill="white"
            opacity="0.9"
          />
          <rect
            x="28"
            y="46"
            width="8"
            height="1.5"
            rx="0.75"
            fill="currentColor"
            className="text-accent"
            opacity="0.7"
          />
          <path
            d="M29 20 L26 23 L29 26"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 20 L38 23 L35 26"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <button
        type="button"
        onClick={onToggleLocale}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-white/40 backdrop-blur-sm text-xs font-semibold text-ink hover:border-accent/40 transition-colors select-none"
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
    </motion.div>
  );
}
