/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAF9F6",
        "surface-elevated": "#F1EFE9",
        ink: "#171717",
        "ink-muted": "#6B6B6B",
        accent: "#2B5C8A",
        "accent-light": "#3A7AB8",
        "accent-subtle": "#EBF2FA",
        card: "#FFFFFF",
        border: "#E5E1D8",
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(3rem, 9vw, 7.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
