import { getApps, initializeApp } from "firebase/app";
import {
	getMessaging,
	getToken,
	isSupported,
	type Messaging,
	onMessage,
} from "firebase/messaging";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-firebase-api-key",
	authDomain:
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
		"karvion-labs.firebaseapp.com",
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "karvion-labs",
	storageBucket:
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
		"karvion-labs.appspot.com",
	messagingSenderId:
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1029384756",
	appId:
		process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
		"1:1029384756:web:karviondemoappid",
};

// Singleton Firebase App instance
export const app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

/**
 * Retrieve messaging instance safely on client-side
 */
export async function getClientMessaging(): Promise<Messaging | null> {
	if (typeof window === "undefined") {
		return null;
	}
	const supported = await isSupported();
	if (!supported) {
		return null;
	}
	return getMessaging(app);
}

/**
 * Request browser push notification permission and return FCM token
 */
export async function requestPushPermission(
	vapidKey?: string,
): Promise<string | null> {
	try {
		if (typeof window === "undefined" || !("Notification" in window)) {
			return null;
		}

		const permission = await Notification.requestPermission();
		if (permission !== "granted") {
			console.warn("[FCM] Push notification permission denied by user.");
			return null;
		}

		const messaging = await getClientMessaging();
		if (!messaging) {
			return null;
		}

		const token = await getToken(messaging, {
			vapidKey:
				vapidKey || process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || undefined,
		});

		return token;
	} catch (error) {
		console.error("[FCM] Error obtaining device push token:", error);
		return null;
	}
}

/**
 * Register foreground message listener
 */
export async function onForegroundMessage(
	callback: (payload: unknown) => void,
): Promise<(() => void) | null> {
	const messaging = await getClientMessaging();
	if (!messaging) return null;
	return onMessage(messaging, callback);
}
