import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string(),
	}),
});

const work = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		client: z.string().optional(),
		description: z.string(),
		draft: z.boolean().optional(),
		heroImage: z.string(),
		logo: z.string().optional(),
		tags: z.string().optional(),
	}),
});

const service = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		heroImage: z.string(),
		cta: z.string().optional(),
	}),
});

export const collections = {
  'blog': blog,
  'cases': work,
  'services': service
};