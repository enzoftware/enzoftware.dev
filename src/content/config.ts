import { defineCollection, z } from "astro:content";

const experience = defineCollection({
  type: "data",
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
  type: "data",
  schema: z.object({
    label: z.string(),
    url: z.string().url(),
    order: z.number(),
  }),
});

export const collections = { experience, socials };
