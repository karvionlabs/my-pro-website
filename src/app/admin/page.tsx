import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";
import {
	db,
	ensureDbTables,
	leads,
	systemEvents,
	workflowBlueprints,
} from "@/db";

export const metadata: Metadata = {
	title: "Executive Operations & Telemetry Hub | Karvion Labs",
	description:
		"Internal executive dashboard monitoring inbound client inquiries and live automation telemetry.",
	robots: {
		index: false,
		follow: false,
	},
};

export default async function AdminPage() {
	await ensureDbTables();

	const initialLeads = await db.select().from(leads).orderBy(desc(leads.id));

	const initialEvents = await db
		.select()
		.from(systemEvents)
		.orderBy(desc(systemEvents.id))
		.limit(50);

	const initialBlueprints = await db
		.select()
		.from(workflowBlueprints)
		.orderBy(desc(workflowBlueprints.id));

	return (
		<AdminDashboardView
			initialLeads={initialLeads}
			initialEvents={initialEvents}
			initialBlueprints={initialBlueprints}
		/>
	);
}
