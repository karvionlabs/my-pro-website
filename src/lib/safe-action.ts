import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

/**
 * Enterprise Type-Safe Server Action Client
 * Provides centralized error handling, logging, and execution metadata
 */
export const actionClient = createSafeActionClient({
	handleServerError(error) {
		console.error("[SAFE_ACTION_SERVER_ERROR]", error.message);
		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
});
