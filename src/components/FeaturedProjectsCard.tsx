import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const projects = [
  {
    name: "hotelyn",
    description:
      "Flutter hotel booking UI showcase — polished, production-ready.",
    stars: 190,
    language: "Dart",
    url: "https://github.com/enzoftware/hotelyn",
    langColor: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "android_iptv",
    description: "Android IPTV player with m3u/m3u8 parsing.",
    stars: 55,
    language: "Kotlin",
    url: "https://github.com/enzoftware/android_iptv",
    langColor: "bg-purple-100 text-purple-700",
  },
  {
    name: "flutter_pokedex",
    description: "Pokédex app built in Flutter with clean architecture.",
    stars: 42,
    language: "Dart",
    url: "https://github.com/enzoftware/flutter_pokedex",
    langColor: "bg-cyan-100 text-cyan-700",
  },
];

interface FeaturedProjectsCardProps {
  t: Translations["projects"];
}

export function FeaturedProjectsCard({ t }: FeaturedProjectsCardProps) {
  return (
    <motion.div
      className="card-base card-hover p-5 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2B5C8A"
            strokeWidth="2"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-ink">{t.title}</h2>
        <motion.a
          href="https://github.com/enzoftware"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-accent font-medium hover:underline"
          whileHover={{ x: 2 }}
        >
          {t.github}
        </motion.a>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-3 flex-1">
        {projects.map((proj, i) => (
          <motion.a
            key={proj.name}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-surface-elevated transition-all group"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
            whileHover={{ y: -2 }}
            data-mixpanel="project_click"
            data-project={proj.name}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-sm font-semibold text-ink">
                {proj.name}
              </span>
              <div className="flex items-center gap-1 text-ink-muted text-xs bg-surface-elevated px-1.5 py-0.5 rounded-md border border-border">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {proj.stars}
              </div>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              {proj.description}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-medium ${proj.langColor}`}
            >
              {proj.language}
            </span>
          </motion.a>
        ))}

        {/* Talk badge */}
        <motion.div
          className="p-3 rounded-xl bg-accent-subtle border border-accent/15 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
        >
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink">
              Speaker — FlutterConf LATAM 2024
            </p>
            <p className="text-xs text-ink-muted mt-0.5">
              Accessibility in Flutter
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
