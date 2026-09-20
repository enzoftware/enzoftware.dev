import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const experience = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    location: z.string(),
    current: z.boolean(),
    order: z.number(),
  }),
});

const socials = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/socials" }),
  schema: z.object({
    label: z.string(),
    url: z.string().url(),
    order: z.number(),
  }),
});

export const collections = { experience, socials };
