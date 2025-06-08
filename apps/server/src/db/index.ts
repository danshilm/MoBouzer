import { env } from '@/utils/env';
import { drizzle, NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type DB = NodePgDatabase<typeof schema> & {
  $client: NodePgClient;
};

export const db: DB = drizzle(env.DATABASE_URL, {
  schema,
});
