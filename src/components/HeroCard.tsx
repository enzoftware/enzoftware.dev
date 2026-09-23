import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { Translations } from "../i18n/translations";
import { SocialsRow, type SocialEntry } from "./SocialsRow";

const HEADLINE_ROTATION_MS = 8000;

interface HeroCardProps {
  t: Translations["hero"];
  socialT: Translations["social"];
  socials: SocialEntry[];
}

export function HeroCard({ t, socialT, socials }: HeroCardProps) {
  const headlines = t.headlines?.length ? t.headlines : [t.subtitle];
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  useEffect(() => {
    if (headlines.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % headlines.length);
    }, HEADLINE_ROTATION_MS);

    return () => window.clearInterval(id);
  }, [headlines.length]);

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.h1
        variants={item}
        className="font-display font-semibold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-tight -ml-1 flex flex-col gap-1 sm:gap-2 text-ink select-none"
      >
        <span className="block">{t.name_line1}</span>
        <span className="block">{t.name_line2}</span>
      </motion.h1>

      <motion.div
        variants={item}
        className="font-mono text-sm sm:text-base text-accent font-medium relative h-[1.5em] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={headlineIndex}
            className="text-ink text-base lg:text-lg font-medium"
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              y: shouldReduceMotion ? 0 : 10,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: shouldReduceMotion ? 1 : 0,
              y: shouldReduceMotion ? 0 : -10,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {headlines[headlineIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.p
        variants={item}
        className="text-ink-muted text-base lg:text-base leading-snug measure mt-1"
      >
        {t.bio}
      </motion.p>

      <motion.div
        variants={item}
        className="mt-4 sm:mt-6 border-t border-border/50 pt-4"
      >
        <SocialsRow t={socialT} socials={socials} />
      </motion.div>
    </motion.div>
  );
}
