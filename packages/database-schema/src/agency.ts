import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { route } from './routes';
import { stop } from './stops';

export const agency = pgTable('agency', {
  agency_id: varchar('agency_id').primaryKey().notNull(), // Use as PK if present, else fallback to generated PK
  agency_name: varchar('agency_name').notNull(),
  agency_url: varchar('agency_url').notNull(),
  agency_timezone: varchar('agency_timezone').notNull(),
  agency_lang: varchar('agency_lang'),
  agency_phone: varchar('agency_phone'),
  agency_fare_url: varchar('agency_fare_url'),
  agency_email: varchar('agency_email'),
});

export type Agency = typeof agency.$inferSelect;
export type NewAgency = typeof agency.$inferInsert;

export const agencyRelations = relations(agency, ({ many }) => ({
  // Define relations here if needed, e.g. routes, stops, etc.
  routes: many(route),
  stops: many(stop),
}));
