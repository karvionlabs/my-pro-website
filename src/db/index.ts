import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.DATABASE_URL || "file:sqlite.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

export const client = createClient({
	url,
	authToken,
});

export const db = drizzle(client, { schema });

let initialized = false;
export async function ensureDbTables() {
	if (initialized) return;
	try {
		await client.execute(`
			CREATE TABLE IF NOT EXISTS leads (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				email TEXT NOT NULL,
				service TEXT NOT NULL,
				budget TEXT NOT NULL DEFAULT 'Flexible / TBD',
				message TEXT NOT NULL,
				status TEXT NOT NULL DEFAULT 'new',
				created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
			);
		`);
		await client.execute(`
			CREATE TABLE IF NOT EXISTS workflow_blueprints (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				preset TEXT NOT NULL,
				steps TEXT NOT NULL,
				automation_rate INTEGER NOT NULL DEFAULT 98,
				estimated_savings TEXT NOT NULL DEFAULT '$1,200/mo',
				saved_by TEXT NOT NULL DEFAULT 'Demo Client',
				email TEXT,
				created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
			);
		`);
		await client.execute(`
			CREATE TABLE IF NOT EXISTS system_events (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				event_name TEXT NOT NULL,
				metadata TEXT,
				timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
			);
		`);
		initialized = true;
	} catch (e) {
		console.error("[DB_INIT_ERROR]", e);
	}
}

export * from "./schema";
