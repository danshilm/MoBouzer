import type { PickupDropoffType, VehicleType } from '@mobouzer/shared/src/enums/routes';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { agency } from './agency';

export const route = pgTable('route', {
  route_id: varchar('route_id').primaryKey(),
  agency_id: varchar('agency_id').references(() => agency.agency_id),
  route_short_name: varchar('route_short_name'),
  route_long_name: varchar('route_long_name'),
  route_desc: text('route_desc'),
  route_type: integer('route_type').notNull().$type<VehicleType>(),
  route_url: varchar('route_url'),
  route_color: varchar('route_color'),
  route_text_color: varchar('route_text_color'),
  route_sort_order: integer('route_sort_order'),
  continuous_pickup: integer('continuous_pickup').$type<PickupDropoffType>(),
  continuous_drop_off: integer('continuous_drop_off').$type<PickupDropoffType>(),
});

export type Route = typeof route.$inferSelect;
export type NewRoute = typeof route.$inferInsert;

export const routeRelations = relations(route, ({ one }) => ({
  agency: one(agency, {
    fields: [route.agency_id],
    references: [agency.agency_id],
  }),
}));
