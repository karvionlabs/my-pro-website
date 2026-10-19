import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates an instance of the Supabase client for Server Components,
 * Server Actions, and Route Handlers with secure cookie management.
 */
export async function createServerSupabaseClient() {
	const cookieStore = await cookies();

	const supabaseUrl =
		process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
	const supabaseAnonKey =
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key";

	return createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options);
					}
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing user sessions.
				}
			},
		},
	});
}

/**
 * Helper to fetch the currently authenticated user on the server.
 */
export async function getCurrentUser() {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return null;
	}

	return user;
}
