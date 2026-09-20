import { motion } from "framer-motion";

const articles = [
  {
    title: "Ktor and GraphQL: Getting Started",
    url: "https://www.kodeco.com/18858740-ktor-and-graphql-getting-started",
  },
  {
    title: "Lazy Layouts in Jetpack Compose",
    url: "https://www.kodeco.com/34398400-lazy-layouts-in-jetpack-compose",
  },
  {
    title: "Testing Android Architecture Components",
    url: "https://www.kodeco.com/12678525-testing-android-architecture-components",
  },
];

export function KodecoCard() {
  return (
    <motion.div
      className="card-base card-hover p-5 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
          >
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-ink">Technical Author</h2>
        <span className="ml-auto text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
          Kodeco
        </span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {articles.map((article, i) => (
          <motion.a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 p-2 rounded-xl hover:bg-surface-elevated transition-colors group"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
            whileHover={{ x: 3 }}
            data-mixpanel="article_click"
            data-article={article.title}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2B5C8A"
              strokeWidth="2"
              className="flex-shrink-0 mt-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="text-xs text-ink leading-snug group-hover:text-accent transition-colors">
              {article.title}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
