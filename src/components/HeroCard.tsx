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
      className="card-base relative flex flex-col justify-center p-8 lg:p-14 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div variants={item} className="flex items-center gap-3 mb-6">
          <img
            src={avatarUrl}
            alt={`${t.name_line1} ${t.name_line2}`}
            width={40}
            height={40}
            className="w-9 h-9 rounded-full object-cover border border-border"
          />
          <span className="text-xs text-ink-muted font-mono">
            {t.badge_location}
          </span>
        </motion.div>

        <motion.h1 variants={item} className="font-display text-hero text-ink">
          {t.name_line1}
          <br />
          {t.name_line2}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-ink-muted text-base lg:text-lg font-mono mt-6"
        >
          {t.subtitle}
        </motion.p>

        <motion.p
          variants={item}
          className="text-ink/70 text-sm lg:text-base leading-relaxed max-w-lg mt-3"
        >
          {t.bio}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-2 mt-6">
          <span className="text-xs text-ink-muted border border-border rounded-full px-3 py-1">
            {t.badge_kodeco}
          </span>
          <span className="text-xs text-ink-muted border border-border rounded-full px-3 py-1">
            {t.badge_flutter}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
