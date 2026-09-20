import { motion } from "framer-motion";

interface ProjectCardProps {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  delay?: number;
  accent?: string;
}

const languageColors: Record<string, string> = {
  Dart: "bg-cyan-100 text-cyan-700",
  Kotlin: "bg-purple-100 text-purple-700",
  Swift: "bg-orange-100 text-orange-700",
  TypeScript: "bg-blue-100 text-blue-700",
  JavaScript: "bg-yellow-100 text-yellow-700",
  Python: "bg-green-100 text-green-700",
};

export function ProjectCard({
  name,
  description,
  stars,
  language,
  url,
  delay = 0,
  accent = "#2B5C8A",
}: ProjectCardProps) {
  const langColor = languageColors[language] ?? "bg-gray-100 text-gray-700";

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-base card-hover p-5 flex flex-col h-full group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      data-mixpanel="project_click"
      data-project={name}
    >
      {/* Top bar accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-60"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center flex-shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </div>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </motion.div>
      </div>

      <h3 className="font-semibold text-ink text-sm mb-1.5 font-mono">
        {name}
      </h3>
      <p className="text-ink-muted text-xs leading-relaxed flex-1">
        {description}
      </p>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
        <span
          className={`text-xs px-2 py-0.5 rounded-md font-medium ${langColor}`}
        >
          {language}
        </span>
        <div className="flex items-center gap-1 text-ink-muted text-xs ml-auto">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {stars.toLocaleString()}
        </div>
      </div>
    </motion.a>
  );
}
