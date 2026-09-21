import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface InteractiveBubbleProps {
  label: string;
  count?: number;
  icon?: ReactNode;
  hint?: string;
  colorVariant?: "accent" | "signal" | "flair";
  onClick: () => void;
  dataTrack?: string;
}

const COLOR_MAP = {
  accent: {
    borderHover: "hover:border-accent/60",
    dot: "bg-accent",
    glow: "hover:shadow-[0_0_16px_rgba(86,156,214,0.22)]",
    text: "group-hover:text-accent",
  },
  signal: {
    borderHover: "hover:border-signal/60",
    dot: "bg-signal",
    glow: "hover:shadow-[0_0_16px_rgba(78,201,176,0.22)]",
    text: "group-hover:text-signal",
  },
  flair: {
    borderHover: "hover:border-flair/60",
    dot: "bg-flair",
    glow: "hover:shadow-[0_0_16px_rgba(197,134,192,0.22)]",
    text: "group-hover:text-flair",
  },
};

export function InteractiveBubble({
  label,
  count,
  icon,
  hint,
  colorVariant = "accent",
  onClick,
  dataTrack,
}: InteractiveBubbleProps) {
  const styles = COLOR_MAP[colorVariant];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={hint}
      aria-haspopup="dialog"
      data-track={dataTrack}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-glass backdrop-blur-md text-xs font-mono text-ink cursor-pointer select-none transition-all duration-200 ${styles.borderHover} ${styles.glow} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
    >
      {/* Indicator dot or custom icon */}
      <span className="flex items-center justify-center flex-shrink-0">
        {icon ? (
          icon
        ) : (
          <span
            className={`w-2 h-2 rounded-full ${styles.dot} group-hover:scale-110 transition-transform duration-200`}
            aria-hidden="true"
          />
        )}
      </span>

      {/* Label */}
      <span className={`font-medium transition-colors ${styles.text}`}>
        {label}
      </span>

      {/* Count pill if present */}
      {count !== undefined && count > 0 && (
        <span
          className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full bg-border/80 text-ink-faint group-hover:text-ink transition-colors"
          aria-hidden="true"
        >
          {count}
        </span>
      )}

      {/* Action cue icon */}
      <span
        className="text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-[11px]"
        aria-hidden="true"
      >
        ↗
      </span>
    </motion.button>
  );
}
