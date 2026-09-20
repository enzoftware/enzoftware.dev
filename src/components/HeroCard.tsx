import { motion, type Variants } from "framer-motion";
import type { Translations } from "../i18n/translations";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface HeroCardProps {
  t: Translations["hero"];
  avatarUrl: string;
}

export function HeroCard({ t, avatarUrl }: HeroCardProps) {
  return (
    <motion.div
      className="card-base relative flex flex-col justify-between p-6 lg:p-8 overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent/6 blur-2xl pointer-events-none" />

      <motion.div
        className="relative z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={item} className="mb-5">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-subtle border border-accent/20 text-accent text-xs font-medium font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t.status}
          </span>
        </motion.div>

        {/* Avatar + Name row */}
        <motion.div variants={item} className="flex items-center gap-4 mb-4">
          {/* Circular avatar */}
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-lg scale-110 pointer-events-none" />
            <img
              src={avatarUrl}
              alt="Enzo Lizama Paredes"
              width={96}
              height={96}
              className="relative w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full object-cover border-2 border-white shadow-xl"
            />
            <motion.div
              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Name */}
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl text-ink leading-none tracking-tight">
            Enzo Lizama
            <br />
            <span className="text-accent">Paredes</span>
          </h1>
        </motion.div>

        {/* Title line */}
        <motion.p
          variants={item}
          className="text-ink-muted text-sm lg:text-base font-mono font-medium mb-4"
        >
          {t.subtitle}
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={item}
          className="text-ink/70 text-sm lg:text-base leading-relaxed max-w-lg mb-5"
        >
          {t.bio}
        </motion.p>

        {/* Key highlights */}
        <motion.div variants={item} className="flex flex-col gap-2">
          {[
            {
              icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
              text: t.highlight_arch,
            },
            {
              icon: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
              text: t.highlight_releases,
            },
            {
              icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
              text: t.highlight_teams,
            },
          ].map((h) => (
            <div key={h.text} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2B5C8A"
                  strokeWidth="2"
                >
                  <path d={h.icon} />
                </svg>
              </div>
              <span className="text-xs lg:text-sm text-ink/65">{h.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom area: badges + CTAs */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-50 border border-green-100 text-green-700 text-xs font-medium">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            {t.badge_kodeco}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {t.badge_flutter}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-elevated border border-border text-ink-muted text-xs font-medium">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {t.badge_location}
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.a
            href="mailto:lizama.enzo@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white text-sm font-semibold rounded-xl shadow-sm shadow-accent/20"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 6px 20px rgba(43,92,138,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            data-mixpanel="contact_email_click"
          >
            {t.cta_contact}
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/enzolizama"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-border text-ink text-sm font-medium rounded-xl"
            whileHover={{ scale: 1.03, borderColor: "rgba(43,92,138,0.4)" }}
            whileTap={{ scale: 0.97 }}
            data-mixpanel="linkedin_hero_click"
          >
            {t.cta_linkedin}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
