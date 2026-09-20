import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

interface ContactCardProps {
  t: Translations["contact"];
}

export function ContactCard({ t }: ContactCardProps) {
  return (
    <motion.div
      className="card-base relative overflow-hidden flex flex-col justify-between p-5 h-full"
      style={{ backgroundColor: "#2B5C8A" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background decoration */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10 blur-lg" />

      <div className="relative z-10">
        <motion.div
          className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-3"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </motion.div>

        <h2 className="font-display text-2xl lg:text-3xl text-white leading-tight mb-2">
          {t.title_line1}
          <br />
          {t.title_line2}
        </h2>
        <p className="text-white/70 text-xs leading-relaxed">{t.subtitle}</p>
      </div>

      <motion.a
        href="mailto:lizama.enzo@gmail.com"
        className="relative z-10 mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-accent text-sm font-semibold rounded-xl transition-colors hover:bg-white/90"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-mixpanel="contact_cta_click"
      >
        lizama.enzo@gmail.com
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
