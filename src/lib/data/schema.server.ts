import { availableLanguageTags } from '$lib/i18n/generated/runtime';
import { z, ZodType } from 'zod';

function contentSchema<Metadata extends Record<string, ZodType>>(metadata: Metadata) {
	return z.object({ metadata: z.object(metadata), content: z.string().optional() });
}

const langSchema = z.enum(availableLanguageTags);

const stringDateSchema = z.coerce.string().pipe(z.coerce.date());

export const degreeSchema = contentSchema({
	diploma: z.string(),
	diploma_short: z.string().optional(),
	program: z.string(),
	option: z.string().optional(),
	school: z.string(),
	school_short: z.string().optional(),
	start: stringDateSchema,
	end: stringDateSchema.optional()
});

export const degreesSchema = z.record(z.string(), degreeSchema);

export const jobSchema = contentSchema({
	employer: z.string(),
	position: z.string(),
	start: stringDateSchema,
	end: stringDateSchema.optional()
});

export const jobsSchema = z.record(z.string(), jobSchema);

export const interestSchema = contentSchema({});

export const interestsSchema = z.record(z.string(), interestSchema);

export const toolSchema = contentSchema({
	title: z.string(),
	description: z.string(),
	updatedAt: stringDateSchema.optional()
});

export const toolsSchema = z.record(z.string(), toolSchema);
