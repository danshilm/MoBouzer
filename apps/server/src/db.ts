import { env } from '@/utils/env';
import * as schema from '@mobouzer/database-schema';
import type { NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';

export type DB = NodePgDatabase<typeof schema> & {
  $client: NodePgClient;
};

export const db: DB = drizzle(env.DATABASE_URL, {
  schema,
});
