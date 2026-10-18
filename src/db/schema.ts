import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Enterprise Leads & Contact Inquiries Schema
 */
export const leads = sqliteTable("leads", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").notNull(),
	service: text("service").notNull(),
	budget: text("budget").notNull(),
	message: text("message").notNull(),
	status: text("status", { enum: ["new", "contacted", "closed"] })
		.notNull()
		.default("new"),
	createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

/**
 * System Events & Metric Interactions Schema
 */
export const systemEvents = sqliteTable("system_events", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	eventName: text("event_name").notNull(),
	metadata: text("metadata"),
	timestamp: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type SystemEvent = typeof systemEvents.$inferSelect;
export type NewSystemEvent = typeof systemEvents.$inferInsert;
