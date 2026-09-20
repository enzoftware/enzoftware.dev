import { motion } from "framer-motion";

export function TalkCard() {
  return (
    <motion.div
      className="card-base card-hover p-5 flex flex-col h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background decoration */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-accent/8 blur-2xl pointer-events-none" />

      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-3 flex-shrink-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dc2626"
          strokeWidth="1.8"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
            Speaker
          </span>
        </div>
        <h3 className="font-semibold text-ink text-sm mb-1.5 leading-snug">
          Accessibility in Flutter
        </h3>
        <p className="text-xs text-ink-muted leading-relaxed">
          Semantic widgets, screen readers & testing strategies.
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-accent flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold leading-none">F</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink">FlutterConf LATAM</p>
            <p className="text-xs text-ink-muted font-mono">2024</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
