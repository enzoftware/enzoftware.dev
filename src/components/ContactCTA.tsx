import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import type { ExperienceEntry } from "./NowBuilding";
import { SignatureCard } from "./SignatureCard";

interface ContactCTAProps {
  t: Translations["contact"];
  signatureT: Translations["signature"];
  name: string;
  experiences: ExperienceEntry[];
}

export function ContactCTA({
  t,
  signatureT,
  name,
  experiences,
}: ContactCTAProps) {
  return (
    <motion.section
      className="relative bg-ink text-surface"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
    >
      <SignatureCard t={signatureT} name={name} experiences={experiences} />

      <div className="section-gutter max-w-4xl py-16 sm:py-20 lg:py-28">
        <motion.p
          className="font-mono text-sm text-surface/60"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          {t.eyebrow}
        </motion.p>

        <motion.h2
          className="font-display font-semibold text-[clamp(2.1rem,6vw,4.2rem)] leading-[1.02] tracking-tight mt-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          {t.headline_1}{" "}
          <em className="not-italic text-accent-light">{t.headline_2}</em>
        </motion.h2>

        <motion.a
          href="mailto:hi@enzoftware.dev?subject=Let%27s%20build%20something"
          className="group mt-10 sm:mt-12 inline-flex items-center gap-4 bg-accent hover:bg-accent-light text-white font-mono text-base sm:text-lg rounded-full pl-7 pr-3 py-3 sm:py-4 transition-colors"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.55 }}
          whileHover={{ y: -3, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          data-mixpanel="contact_email_click"
        >
          hi@enzoftware.dev
          <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 group-hover:rotate-45 transition-transform duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

        <motion.p
          className="mt-6 text-sm text-surface/55"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, duration: 0.5 }}
        >
          {t.note}
        </motion.p>
      </div>
    </motion.section>
  );
}
