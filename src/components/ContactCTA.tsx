import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

interface ContactCTAProps {
  t: Translations["contact"];
  name: string;
}

export function ContactCTA({ t, name }: ContactCTAProps) {
  return (
    <motion.section
      className="relative bg-surface-elevated border-t border-border overflow-hidden lg:flex-shrink-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-1/2 -right-1/4 w-[50%] h-[200%] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
      />

      <div className="relative section-gutter py-8 lg:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <motion.p
            className="font-mono text-xs text-ink-muted"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            {t.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display font-semibold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight tracking-tight mt-2 text-ink"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            {t.headline_1}{" "}
            <em className="not-italic text-flair">{t.headline_2}</em>
          </motion.h2>

          <motion.p
            className="mt-2 text-sm text-ink-faint"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {t.note}
          </motion.p>
        </div>

        <motion.a
          href="mailto:hi@enzoftware.dev?subject=Let%27s%20build%20something"
          className="group flex-shrink-0 self-start sm:self-auto inline-flex items-center gap-4 bg-accent hover:bg-accent-light text-white font-mono text-base rounded-full pl-6 pr-2.5 py-2.5 sm:py-3 transition-colors"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-track="contact_email_click"
        >
          hi@enzoftware.dev
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:rotate-45 transition-transform duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 19 19 5M19 5H8M19 5v11"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.a>
      </div>

      <div className="relative section-gutter py-4 border-t border-border/60 font-mono text-xs text-ink-faint">
        © {new Date().getFullYear()} {name}
      </div>
    </motion.section>
  );
}
