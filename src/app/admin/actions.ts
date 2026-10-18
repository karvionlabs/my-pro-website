"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { db, ensureDbTables, leads } from "@/db";

const COOKIE_NAME = "karvion_admin_session";
const EXPECTED_PASSKEY = process.env.ADMIN_PASSKEY || "karvion-admin-2026";

export async function loginAdmin(passkey: string) {
	if (!passkey || passkey.trim() !== EXPECTED_PASSKEY.trim()) {
		return { success: false, error: "Invalid Admin Passkey" };
	}

	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, "authenticated", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});

	revalidatePath("/admin");
	return { success: true };
}

export async function logoutAdmin() {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIE_NAME);
	revalidatePath("/admin");
	return { success: true };
}

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
