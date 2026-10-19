// Firebase Cloud Messaging Service Worker for Karvion Labs
// Handles background push notifications when the app is inactive or closed.

importScripts(
	"https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js",
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js",
);

// Initialize Firebase inside the service worker
const firebaseConfig = {
	apiKey: "demo-firebase-api-key-placeholder",
	authDomain: "karvion-labs.firebaseapp.com",
	projectId: "karvion-labs",
	storageBucket: "karvion-labs.appspot.com",
	messagingSenderId: "1029384756",
	appId: "1:1029384756:web:karviondemoappid",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Background message received:",
		payload,
	);
	const notificationTitle = payload.notification?.title || "Karvion Labs Alert";
	const notificationOptions = {
		body: payload.notification?.body || "New system workflow notification.",
		icon: "/favicon.ico",
		badge: "/favicon.ico",
		data: payload.data || {},
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();
	const targetUrl = event.notification.data?.url || "/";

	event.waitUntil(
		clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((windowClients) => {
				for (const client of windowClients) {
					if (client.url === targetUrl && "focus" in client) {
						return client.focus();
					}
				}
				if (clients.openWindow) {
					return clients.openWindow(targetUrl);
				}
			}),
	);
});
