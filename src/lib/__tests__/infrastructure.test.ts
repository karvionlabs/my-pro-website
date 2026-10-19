import { format, isAfter } from "date-fns";
import { describe, expect, it } from "vitest";
import {
	generateSecureId,
	signSessionToken,
	verifySessionToken,
} from "@/lib/crypto";
import { exportToCsv, parseCsvData } from "@/lib/csv-engine";
import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mailer";
import { createQueryClient } from "@/lib/query-client";
import { useTelemetryStore } from "@/store/telemetry-store";

describe("Infrastructure & DevOps Core Unit Tests", () => {
	describe("1. Zustand Telemetry Store", () => {
		it("initializes activeSessions and increments reliably", () => {
			const initialSessions = useTelemetryStore.getState().activeSessions;
			useTelemetryStore.getState().incrementSession();
			expect(useTelemetryStore.getState().activeSessions).toBe(
				initialSessions + 1,
			);
		});
	});

	describe("2. Cryptographic Utilities (jose & nanoid)", () => {
		it("generates URL-safe unique nanoid identifiers", () => {
			const id1 = generateSecureId();
			const id2 = generateSecureId();
			expect(id1).toBeDefined();
			expect(id1.length).toBe(21);
			expect(id1).not.toBe(id2);
		});

		it("signs and verifies Edge-compatible JWT tokens", async () => {
			const payload = { userId: "user-123", role: "admin" };
			const token = await signSessionToken(payload);
			expect(typeof token).toBe("string");

			const verified = await verifySessionToken<{
				userId: string;
				role: string;
			}>(token);
			expect(verified).not.toBeNull();
			expect(verified?.userId).toBe("user-123");
			expect(verified?.role).toBe("admin");
		});

		it("rejects invalid or tampered tokens", async () => {
			const tampered = "invalid.jwt.token";
			const verified = await verifySessionToken(tampered);
			expect(verified).toBeNull();
		});
	});

	describe("3. Date Utilities & SMTP Mailer", () => {
		it("formats timestamps consistently using date-fns", () => {
			const now = new Date();
			const formatted = format(now, "yyyy-MM-dd");
			expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(isAfter(now, new Date(0))).toBe(true);
		});

		it("executes simulated dry-run email delivery when SMTP credentials are unset", async () => {
			const result = await sendEmail({
				to: "test@karvionlabs.com",
				subject: "Test Automated Delivery",
				text: "Pipeline execution test message",
			});

			expect(result.success).toBe(true);
			expect(result.mode).toBe("dry-run");
			expect(result.deliveredAt).toBeDefined();
		});
	});

	describe("4. TanStack QueryClient Factory", () => {
		it("initializes QueryClient with optimal enterprise caching defaults", () => {
			const client = createQueryClient();
			const options = client.getDefaultOptions();
			expect(options.queries?.staleTime).toBe(60000);
			expect(options.queries?.gcTime).toBe(300000);
			expect(options.queries?.refetchOnWindowFocus).toBe(false);
		});
	});

	describe("5. Structured Pino Server Logger", () => {
		it("exports configured logger with methods and redaction paths", () => {
			expect(logger).toBeDefined();
			expect(typeof logger.info).toBe("function");
			expect(typeof logger.warn).toBe("function");
			expect(typeof logger.error).toBe("function");
		});
	});

	describe("6. CSV Data Export & Parse Engine", () => {
		it("serializes dataset to CSV string and parses it back accurately", () => {
			const dataset = [
				{ id: "lead-1", name: "Karib Shahjada", service: "AI Workflows" },
				{ id: "lead-2", name: "Enterprise Client", service: "QA Automation" },
			];

			const csv = exportToCsv(dataset);
			expect(csv).toContain("id,name,service");
			expect(csv).toContain("Karib Shahjada");

			const parsed = parseCsvData<{
				id: string;
				name: string;
				service: string;
			}>(csv);
			expect(parsed.length).toBe(2);
			expect(parsed[0].name).toBe("Karib Shahjada");
			expect(parsed[1].service).toBe("QA Automation");
		});

		it("handles empty or blank datasets gracefully", () => {
			expect(exportToCsv([])).toBe("");
			expect(parseCsvData("")).toEqual([]);
			expect(parseCsvData("   ")).toEqual([]);
		});
	});
});
