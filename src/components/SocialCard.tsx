import { motion } from "framer-motion";
import type { Translations } from "../i18n/translations";

const socials = [
  {
    label: "GitHub",
    handle: "@enzoftware",
    url: "https://github.com/enzoftware",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    color: "hover:text-gray-900 hover:bg-gray-50",
  },
  {
    label: "LinkedIn",
    handle: "enzolizama",
    url: "https://linkedin.com/in/enzolizama",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:text-blue-700 hover:bg-blue-50",
  },
  {
    label: "X / Twitter",
    handle: "@enzoftware",
    url: "https://x.com/enzoftware",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "hover:text-gray-900 hover:bg-gray-50",
  },
  {
    label: "Hashnode",
    handle: "enzoftware",
    url: "https://enzoftware.hashnode.dev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
      </svg>
    ),
    color: "hover:text-blue-600 hover:bg-blue-50",
  },
];

interface SocialCardProps {
  t: Translations["social"];
}

export function SocialCard({ t }: SocialCardProps) {
  return (
    <motion.div
      className="card-base card-hover p-5 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-ink">{t.title}</h2>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 justify-between">
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-2.5 rounded-xl transition-all text-ink-muted ${social.color}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
            whileHover={{ x: 4 }}
            data-mixpanel="social_click"
            data-platform={social.label}
          >
            {social.icon}
            <div>
              <p className="text-xs font-semibold text-ink leading-none">
                {social.label}
              </p>
              <p className="text-xs text-ink-muted mt-0.5 font-mono">
                {social.handle}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
