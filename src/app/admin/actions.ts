"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, ensureDbTables, leads } from "@/db";

export async function updateLeadStatus(
	id: number,
	status: "new" | "contacted" | "closed",
) {
	try {
		await ensureDbTables();
		await db.update(leads).set({ status }).where(eq(leads.id, id));
		revalidatePath("/admin");
		return { success: true };
	} catch (error) {
		console.error("[UPDATE_LEAD_STATUS_ERROR]", error);
		return { success: false, error: "Failed to update lead status" };
	}
}
