import { create } from "zustand";

export interface TelemetryState {
	activeSessions: number;
	incrementSession: () => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
	activeSessions: 1,
	incrementSession: () =>
		set((state) => ({ activeSessions: state.activeSessions + 1 })),
}));
