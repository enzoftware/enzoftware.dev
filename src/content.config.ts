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
    color: z.enum(["dot-1", "dot-2", "dot-3", "dot-4", "dot-5"]),
    highlights: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
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

const speaking = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/speaking" }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    year: z.number(),
    location: z.string().optional(),
    abstract: z.string(),
    videoUrl: z.string().url().optional(),
    slidesUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    publisher: z.string(),
    type: z.enum(["tutorial", "article", "book", "guide"]).default("tutorial"),
    url: z.string().url(),
    publishedAt: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    role: z.string(),
    period: z.string().optional(),
    description: z.string(),
    architecture: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    links: z
      .object({
        appStore: z.string().url().optional(),
        playStore: z.string().url().optional(),
        github: z.string().url().optional(),
        web: z.string().url().optional(),
      })
      .default({}),
    featured: z.boolean().default(true),
    order: z.number(),
    color: z
      .enum(["dot-1", "dot-2", "dot-3", "dot-4", "dot-5"])
      .default("dot-1"),
  }),
});

export const collections = {
  experience,
  socials,
  speaking,
  publications,
  projects,
};
