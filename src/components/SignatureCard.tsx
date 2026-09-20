import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";
import type { ExperienceEntry } from "./NowBuilding";

interface SignatureCardProps {
  t: Translations["signature"];
  name: string;
  experiences: ExperienceEntry[];
}

export function SignatureCard({ t, name, experiences }: SignatureCardProps) {
  const current = experiences.find((exp) => exp.current);
  if (!current) return null;

  return (
    <>
      {/* Desktop: floating glass signature, anchored to the CTA band */}
      <motion.div
        className="hidden lg:flex absolute top-10 right-10 xl:right-16 z-10 flex-col gap-1.5 px-5 py-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl max-w-[240px]"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-lg text-surface leading-tight">
          {name}
        </p>
        <p className="font-mono text-xs text-surface/60 leading-snug">
          {current.role} {t.role_at} {current.company}
        </p>
      </motion.div>

      {/* Mobile / tablet: normal in-flow section, no floating/absolute positioning */}
      <motion.div
        className="lg:hidden section-gutter py-8 flex flex-col gap-1 border-b border-white/10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-display text-lg text-surface">{name}</p>
        <p className="font-mono text-xs text-surface/60">
          {current.role} {t.role_at} {current.company}
        </p>
      </motion.div>
    </>
  );
}
