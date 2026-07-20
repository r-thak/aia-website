import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    type: z.enum(['paper', 'book', 'patent', 'software']).default('paper'),
    cover: image().optional(),
    doi: z.string().optional(),
    award: z.string().optional(),
    links: z.object({
      pdf: z.string().optional(),
      code: z.string().optional(),
      website: z.string().optional(),
      demo: z.string().optional(),
      slides: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    badges: z.array(z.object({
      text: z.string(),
      type: z.enum(['gold', 'blue', 'red', 'green', 'default']).default('default')
    })).optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/books" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    cover: image().optional(),
    doi: z.string().optional(),
    award: z.string().optional(),
    links: z.object({
      pdf: z.string().optional(),
      code: z.string().optional(),
      website: z.string().optional(),
      demo: z.string().optional(),
      slides: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
    // Removed featured as per user request
    badges: z.array(z.object({
      text: z.string(),
      type: z.enum(['gold', 'blue', 'red', 'green', 'default']).default('default')
    })).optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    avatar: z.string().optional(),
    discord: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().url().optional(),
    weight: z.number().default(100),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cover: image().optional(),
    order: z.number().default(100),
  }),
});

const patents = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/patents" }),
  schema: z.object({
    title: z.string(),
    inventors: z.array(z.string()),
    number: z.string(), // Patent Number
    date: z.date(),
    status: z.enum(['Granted', 'Pending', 'Filed']),
    link: z.string().optional(),
  }),
});

const softwares = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/softwares" }),
  schema: z.object({
    title: z.string(),
    developers: z.array(z.string()),
    number: z.string(), // Registration Number
    date: z.date(),
    description: z.string().optional(),
  }),
});

const honors = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/honors" }),
  schema: z.object({
    title: z.string(),
    award: z.string(), // e.g., "Gold Medal", "First Prize"
    date: z.date(),
    year: z.string(), // Display year on badge
    type: z.enum(['Challenge Cup', 'Internet+', 'Other']).default('Other'),
    level: z.enum(['Special', 'First', 'Second', 'Third']).default('Third'),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/activities" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    cover: image().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  publications,
  books,
  team,
  news,
  research,
  patents,
  softwares,
  honors,
  activities,
};
