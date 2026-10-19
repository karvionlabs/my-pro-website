import { QueryClient } from "@tanstack/react-query";

/**
 * Enterprise QueryClient factory with sensible defaults for server & client caching
 */
export function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Cache stale time: 1 minute default for enterprise metrics
				staleTime: 60 * 1000,
				// GC time: 5 minutes in background
				gcTime: 5 * 60 * 1000,
				// Retry policy: retry once on network error, avoid spamming on 4xx
				retry: (failureCount, error) => {
					if (failureCount >= 2) return false;
					if (error instanceof Error && error.message.includes("404"))
						return false;
					return true;
				},
				refetchOnWindowFocus: false,
			},
			mutations: {
				retry: 0,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
	if (typeof window === "undefined") {
		// Server: always create a new query client per request to avoid data leaking between sessions
		return createQueryClient();
	}
	// Browser: reuse the same query client instance
	if (!browserQueryClient) {
		browserQueryClient = createQueryClient();
	}
	return browserQueryClient;
}
