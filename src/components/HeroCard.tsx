import { motion, type Variants } from "framer-motion";
import type { Translations } from "../i18n/translations";
import { SocialsRow, type SocialEntry } from "./SocialsRow";

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
  socialT: Translations["social"];
  socials: SocialEntry[];
  onOpenArticles: () => void;
}

export function HeroCard({
  t,
  socialT,
  socials,
  onOpenArticles,
}: HeroCardProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center lg:h-full"
    >
      <motion.h1 variants={item} className="font-display text-hero text-ink">
        {t.name_line1}
        <br />
        {t.name_line2}
      </motion.h1>

      <motion.p
        variants={item}
        className="text-ink text-base lg:text-lg font-medium mt-5"
      >
        {t.subtitle}
      </motion.p>

      <motion.p
        variants={item}
        className="text-ink-muted text-base lg:text-lg leading-relaxed measure mt-2"
      >
        {t.bio}
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-2 mt-5">
        <button
          type="button"
          onClick={onOpenArticles}
          className="text-xs font-mono text-ink-muted border border-border hover:border-ink-muted hover:text-ink transition-colors rounded-full px-3 py-1.5 cursor-pointer"
        >
          {t.badge_article_author}
        </button>
        <span className="text-xs font-mono text-ink-muted border border-border rounded-full px-3 py-1.5">
          {t.badge_flutter}
        </span>
      </motion.div>

      <motion.div variants={item} className="mt-6">
        <SocialsRow t={socialT} socials={socials} />
      </motion.div>
    </motion.div>
  );
}
