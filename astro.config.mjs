import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://enzoftware.dev",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
});
