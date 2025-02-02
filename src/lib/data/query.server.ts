import { contents } from '$lib/common/markdown';
import { degreesSchema, interestsSchema, jobsSchema, toolsSchema } from './schema.server';

export const tools = toolsSchema.parse(
  contents(
    import.meta.glob('/src/routes/*/tools/*/*.md', {
      eager: true,
      query: '?raw',
    }),
    '/src/routes/(site)/tools',
  ),
);

export const degrees = degreesSchema.parse(
  contents(
    import.meta.glob('/content/resume/degrees/*/*.md', { eager: true, query: '?raw' }),
    '/content/resume/degrees',
  ),
);

export const jobs = jobsSchema.parse(
  contents(
    import.meta.glob('/content/resume/experiences/*/*.md', { eager: true, query: '?raw' }),
    '/content/resume/experiences',
  ),
);

export const interests = interestsSchema.parse(
  contents(
    import.meta.glob('/contents/resume/interests/*/.md', { eager: true, query: '?raw' }),
    '/content/resume/interests',
  ),
);

// export const resume = ;
