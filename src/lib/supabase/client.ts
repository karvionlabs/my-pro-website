import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates an instance of the Supabase client for use in Client Components.
 * Handles automatic auth token refreshing and session persistence in browser cookies.
 */
export function createClient() {
	const supabaseUrl =
		process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
	const supabaseAnonKey =
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key";

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
