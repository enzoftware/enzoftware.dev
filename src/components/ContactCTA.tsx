import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

interface ContactCTAProps {
  t: Translations["contact"];
  cookieT: Translations["cookie_consent"];
  name: string;
  onOpenCookiePolicy: () => void;
}

const EMAIL = "hi@enzoftware.dev";

export function ContactCTA({
  t,
  cookieT,
  name,
  onOpenCookiePolicy,
}: ContactCTAProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable — mailto link below remains the fallback.
    }
  };

  return (
    <motion.footer
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

      <div className="relative section-gutter py-6 lg:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <motion.p
            className="inline-flex items-center gap-2 font-mono text-xs text-ink rounded-full border border-border bg-surface-raised px-3 py-1.5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            {t.availability_status}
          </motion.p>

          <motion.h2
            className="font-display font-semibold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight tracking-tight mt-3 text-ink"
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

        <div className="relative flex-shrink-0 self-start sm:self-auto flex items-center gap-2">
          <motion.a
            href={`mailto:${EMAIL}?subject=Let%27s%20build%20something`}
            className="group inline-flex items-center gap-4 bg-accent-solid hover:bg-accent-solid-hover text-on-accent font-mono text-base rounded-full pl-6 pr-2.5 py-2.5 sm:py-3 transition-colors"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.45 }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-track="contact_email_click"
          >
            {EMAIL}
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

          <motion.button
            type="button"
            onClick={handleCopyEmail}
            aria-label={t.copy_email}
            title={t.copy_email}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border text-ink-muted hover:text-accent hover:border-accent/50 transition-colors"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45 }}
            whileTap={{ scale: 0.92 }}
            data-track="contact_copy_email_click"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect
                x="8"
                y="8"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </motion.button>

          <AnimatePresence>
            {copied && (
              <motion.div
                role="status"
                aria-live="polite"
                className="absolute -top-11 right-0 whitespace-nowrap rounded-full bg-ink text-surface text-xs font-mono px-3 py-1.5 shadow-lg"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t.copy_email_success}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative section-gutter py-3 border-t border-border/60 font-mono text-xs text-ink-muted flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <button
          type="button"
          onClick={onOpenCookiePolicy}
          className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors cursor-pointer text-left sm:text-right"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          </svg>
          {cookieT.manage_cookies}
        </button>
      </div>
    </motion.footer>
  );
}
