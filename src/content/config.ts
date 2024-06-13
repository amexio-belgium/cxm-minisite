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
		socialImage: z.string().optional(),
		altTextImage: z.string().optional(),
		tags: z.string().optional(),
		author: z.string().optional(),
		authorTitle: z.string().optional(),
		authorProfileImg: z.string().optional(),
		canonicalURl: z.string().optional(),
	}),
});

const work = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		client: z.string().optional(),
		description: z.string(),
		draft: z.boolean().optional(),
		pubDate: z.coerce.date().optional(),
		heroImage: z.string(),
		altTextImage: z.string().optional(),
		logo: z.string().optional(),
		tags: z.string().optional(),
		duration: z.string().optional(),
		services: z.string().optional(),
		technologies: z.string().optional(),
		collaboration: z.string().optional(),
		canonicalURl: z.string().optional(),
	}),
});

const service = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		previewTitle: z.string().optional(),
		description: z.string(),
		draft: z.boolean().optional(),
		pubDate: z.coerce.date().optional(),
		heroImage: z.string(),
		altTextImage: z.string().optional(),
		cta: z.string().optional(),
		groupType: z.string()
	}),
});

export const collections = {
  'blog': blog,
  'cases': work,
  'services': service
};