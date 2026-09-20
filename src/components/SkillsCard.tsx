import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const skills = [
  { label: "Flutter", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Dart", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { label: "Kotlin", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Android", color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Swift", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { label: "TypeScript", color: "bg-blue-50 text-blue-800 border-blue-200" },
  {
    label: "Firebase",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  { label: "GraphQL", color: "bg-pink-50 text-pink-700 border-pink-200" },
  { label: "Clean Arch", color: "bg-slate-50 text-slate-700 border-slate-200" },
  {
    label: "CI/CD",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  { label: "RevenueCat", color: "bg-red-50 text-red-700 border-red-200" },
  { label: "TDD", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
];

interface SkillsCardProps {
  t: Translations["skills"];
}

export function SkillsCard({ t }: SkillsCardProps) {
  return (
    <motion.div
      className="card-base card-hover p-5 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
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
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-ink">{t.title}</h2>
      </div>

      <div className="flex flex-wrap gap-2 flex-1 content-start">
        {skills.map((skill, i) => (
          <motion.span
            key={skill.label}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${skill.color} cursor-default select-none`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
            whileHover={{ scale: 1.08, y: -1 }}
          >
            {skill.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
