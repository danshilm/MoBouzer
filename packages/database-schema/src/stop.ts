import type { LocationType, WheelchairBoarding } from '@mobouzer/shared';
import { relations } from 'drizzle-orm';
import { doublePrecision, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const stop = pgTable('stop', {
  stop_id: varchar('stop_id').primaryKey(),
  stop_code: varchar('stop_code'),
  stop_name: text('stop_name').notNull(),
  stop_desc: text('stop_desc'),
  stop_lat: doublePrecision('stop_lat').notNull(),
  stop_long: doublePrecision('stop_long').notNull(),
  zone_id: varchar('zone_id'),
  stop_url: text('stop_url'),
  location_type: integer('location_type').$type<LocationType>(),
  parent_station: varchar('parent_station'),
  stop_timezone: varchar('stop_timezone'),
  wheelchair_boarding: integer('wheelchair_boarding').$type<WheelchairBoarding>(),
  level_id: varchar('level_id'),
  platform_code: varchar('platform_code'),
});

export type Stop = typeof stop.$inferSelect;
export type NewStop = typeof stop.$inferInsert;

export const stopsRelations = relations(stop, ({ one, many }) => ({
  // routes: many(route),
}));
