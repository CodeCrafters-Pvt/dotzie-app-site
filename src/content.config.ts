import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Dotzie"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/**
 * User guide. One file per feature; `order` drives the sidebar, the hub grid
 * and prev/next, so inserting a page is a matter of renumbering here.
 */
const guide = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guide" }),
  schema: z.object({
    title: z.string(),
    /** Shown in the sidebar and hub cards — keep it short. */
    navLabel: z.string().optional(),
    description: z.string(),
    section: z.enum([
      "Start here",
      "Everyday money",
      "Planning ahead",
      "Keeping track",
      "Your data & settings",
    ]),
    order: z.number(),
    /** Key into `guideIcons` in src/lib/guide.ts. */
    icon: z.string().default("BookOpen"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, guide };
