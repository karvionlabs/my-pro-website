import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

/**
 * Server-side Firebase Admin singleton instance for dispatching FCM notifications.
 */
function getFirebaseAdminApp() {
	const currentApps = getApps();
	if (currentApps.length > 0) {
		return currentApps[0];
	}

	const projectId = process.env.FIREBASE_PROJECT_ID || "karvion-labs";
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = process.env.FIREBASE_PRIVATE_KEY
		? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
		: undefined;

	if (clientEmail && privateKey) {
		return initializeApp({
			credential: cert({
				projectId,
				clientEmail,
				privateKey,
			}),
		});
	}

	// Graceful fallback for local development or dry-run testing
	return initializeApp({
		projectId,
	});
}

export const adminApp = getFirebaseAdminApp();

/**
 * Send a push notification to a specific device registration token.
 */
export async function sendPushToDevice(params: {
	token: string;
	title: string;
	body: string;
	data?: Record<string, string>;
}) {
	if (!params.token) {
		throw new Error("Target device push token is required.");
	}

	// If running without credentials in local environment, simulate dry-run
	if (!process.env.FIREBASE_CLIENT_EMAIL) {
		console.log(
			`[FCM_DRY_RUN] Simulated Push Notification to token "${params.token.slice(0, 10)}...": "${params.title}" - "${params.body}"`,
		);
		return { messageId: `mock-fcm-${Date.now()}` };
	}

	const messaging = getMessaging(adminApp);
	const response = await messaging.send({
		token: params.token,
		notification: {
			title: params.title,
			body: params.body,
		},
		data: params.data,
	});

	return { messageId: response };
}
