import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";
import { AdminLoginGate } from "@/components/admin/admin-login-gate";
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

// Force dynamic execution on every request for real-time SQLite data
export const dynamic = "force-dynamic";

export default async function AdminPage() {
	const cookieStore = await cookies();
	const session = cookieStore.get("karvion_admin_session");

	// Authentication Gate Check
	if (session?.value !== "authenticated") {
		return <AdminLoginGate />;
	}

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
