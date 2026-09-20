import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

interface ContactChipProps {
  t: Translations["contact"];
}

export function ContactChip({ t }: ContactChipProps) {
  return (
    <motion.a
      href="mailto:lizama.enzo@gmail.com"
      className="fixed bottom-3 right-3 z-50 flex items-center gap-2 px-5 py-3.5 bg-accent text-white text-sm font-semibold rounded-2xl shadow-lg shadow-accent/25"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      data-mixpanel="contact_email_click"
    >
      {t.label}
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
  );
}
