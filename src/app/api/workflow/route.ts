import { NextResponse } from "next/server";
import { z } from "zod";
import { db, ensureDbTables, systemEvents, workflowBlueprints } from "@/db";

const workflowSchema = z.object({
	action: z.enum(["simulate", "save"]),
	presetId: z.string().min(1).max(100),
	title: z.string().min(1).max(200),
	steps: z.array(z.string().min(1).max(200)).min(1).max(20),
	automationRate: z.number().int().min(50).max(100).default(98),
	estimatedSavings: z.string().min(1).max(50).default("$1,450/mo"),
	savedBy: z.string().max(100).optional(),
	email: z.string().email().max(255).optional().or(z.literal("")),
});

export async function POST(req: Request) {
	try {
		await ensureDbTables();

		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("application/json")) {
			return NextResponse.json(
				{ success: false, message: "Request must be application/json" },
				{ status: 415 },
			);
		}

		const body = await req.json();
		const result = workflowSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ success: false, errors: result.error.flatten().fieldErrors },
				{ status: 400 },
			);
		}

		const data = result.data;

		if (data.action === "simulate") {
			// Generate simulated step-by-step pipeline execution logs
			const executionTrace = data.steps.map((step, idx) => ({
				stepNumber: idx + 1,
				name: step,
				status: "COMPLETED",
				latencyMs: Math.floor(Math.random() * 120) + 40,
				timestamp: new Date(Date.now() + idx * 150).toISOString(),
			}));

			const totalLatency = executionTrace.reduce(
				(acc, curr) => acc + curr.latencyMs,
				0,
			);

			// Log execution event
			try {
				await db.insert(systemEvents).values({
					eventName: "workflow_simulation_executed",
					metadata: JSON.stringify({
						preset: data.presetId,
						totalLatency,
						stepsCount: data.steps.length,
					}),
				});
			} catch (logErr) {
				console.error("[EVENT_LOG_ERROR]", logErr);
			}

			return NextResponse.json({
				success: true,
				presetId: data.presetId,
				totalLatencyMs: totalLatency,
				executionTrace,
				metrics: {
					automationRate: data.automationRate,
					estimatedSavings: data.estimatedSavings,
					executionStatus: "ALL_SYSTEMS_OPERATIONAL",
				},
			});
		}

		// Action: "save" blueprint to Drizzle ORM
		const inserted = await db
			.insert(workflowBlueprints)
			.values({
				title: data.title,
				preset: data.presetId,
				steps: JSON.stringify(data.steps),
				automationRate: data.automationRate,
				estimatedSavings: data.estimatedSavings,
				savedBy: data.savedBy || "Demo Enterprise Client",
				email: data.email || null,
			})
			.returning();

		await db.insert(systemEvents).values({
			eventName: "workflow_blueprint_saved",
			metadata: JSON.stringify({
				preset: data.presetId,
				title: data.title,
			}),
		});

		return NextResponse.json({
			success: true,
			message: "Automation blueprint successfully saved to Drizzle SQLite DB.",
			blueprint: inserted[0] || null,
		});
	} catch (error) {
		console.error("[WORKFLOW_API_ERROR]", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error." },
			{ status: 500 },
		);
	}
}

export async function GET() {
	try {
		await ensureDbTables();
		const blueprints = await db.select().from(workflowBlueprints).limit(10);
		return NextResponse.json({ success: true, blueprints });
	} catch (error) {
		console.error("[WORKFLOW_GET_ERROR]", error);
		return NextResponse.json(
			{ success: false, message: "Failed to fetch blueprints" },
			{ status: 500 },
		);
	}
}
