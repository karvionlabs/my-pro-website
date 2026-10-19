import { create } from "zustand";

export interface TelemetryState {
	activeConnections: number;
	lastPingLatencyMs: number;
	systemStatus: "healthy" | "degraded" | "critical";
	recordedEvents: Array<{
		id: string;
		name: string;
		timestamp: number;
	}>;
	recordEvent: (name: string) => void;
	updateLatency: (latencyMs: number) => void;
	setSystemStatus: (status: "healthy" | "degraded" | "critical") => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
	activeConnections: 1,
	lastPingLatencyMs: 24,
	systemStatus: "healthy",
	recordedEvents: [],
	recordEvent: (name: string) =>
		set((state) => ({
			recordedEvents: [
				...state.recordedEvents.slice(-49),
				{ id: crypto.randomUUID(), name, timestamp: Date.now() },
			],
		})),
	updateLatency: (latencyMs: number) => set({ lastPingLatencyMs: latencyMs }),
	setSystemStatus: (status) => set({ systemStatus: status }),
}));
