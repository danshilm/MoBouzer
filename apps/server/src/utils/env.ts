import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.number().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string().trim().min(1),
});

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
  console.error(envParseResult.error.issues);
  throw new Error('There is an error with the server environment variables');
  process.exit(1);
}

export const env = envParseResult.data;
export type Env = z.infer<typeof envSchema>;
