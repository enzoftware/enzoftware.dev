import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "../i18n/translations";

interface TopBarProps {
  avatarUrl: string;
  name: string;
  locale: Locale;
  langToggleLabel: string;
  onToggleLocale: () => void;
}

export function TopBar({
  avatarUrl,
  name,
  locale,
  langToggleLabel,
  onToggleLocale,
}: TopBarProps) {
  return (
    <motion.div
      className="sticky top-0 z-50 flex items-center justify-between section-gutter py-3 bg-surface/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/5"
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

      <button
        type="button"
        onClick={onToggleLocale}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-white/5 backdrop-blur-sm text-xs font-semibold text-ink hover:border-accent/40 transition-colors select-none"
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
