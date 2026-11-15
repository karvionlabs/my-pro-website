import { NextResponse } from "next/server";
import { z } from "zod";
import {
	auditComponentWithClaude,
	buildSuperpowerUiUxPrompt,
	generateComponentWithClaude,
	getMasterDesignSystem,
} from "@/lib/uiux-anthropic-bridge";

const requestSchema = z.object({
	action: z.enum(["generate", "audit", "tokens"]),
	prompt: z.string().optional(),
	componentCode: z.string().optional(),
	componentName: z.string().optional().default("Component"),
	pageContext: z.string().optional(),
});

export async function POST(req: Request) {
	try {
		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("application/json")) {
			return NextResponse.json(
				{ success: false, message: "Request must be application/json" },
				{ status: 415 },
			);
		}

		const body = await req.json();
		const parseResult = requestSchema.safeParse(body);

		if (!parseResult.success) {
			return NextResponse.json(
				{ success: false, errors: parseResult.error.flatten().fieldErrors },
				{ status: 400 },
			);
		}

		const data = parseResult.data;

		// 1. Direct Design Token Retrieval
		if (data.action === "tokens") {
			const tokens = getMasterDesignSystem();
			return NextResponse.json({
				success: true,
				action: "tokens",
				designSystem: tokens,
			});
		}

		// Check for Anthropic API Key
		if (
			!process.env.ANTHROPIC_API_KEY &&
			!process.env.GOOGLE_GENERATIVE_AI_API_KEY
		) {
			return NextResponse.json(
				{
					success: false,
					message:
						"ANTHROPIC_API_KEY is not set in .env.local. Please add your key to enable Claude-powered UI/UX synthesis.",
					fallbackPrompt: buildSuperpowerUiUxPrompt(data.pageContext),
				},
				{ status: 400 },
			);
		}

		// 2. Component Generation
		if (data.action === "generate") {
			if (!data.prompt) {
				return NextResponse.json(
					{ success: false, message: "Prompt is required for generation" },
					{ status: 400 },
				);
			}

			const completion = await generateComponentWithClaude({
				prompt: data.prompt,
				pageContext: data.pageContext,
			});

			return NextResponse.json({
				success: true,
				action: "generate",
				text: completion.text,
				usage: completion.usage,
			});
		}

		// 3. Component UI/UX Audit
		if (data.action === "audit") {
			if (!data.componentCode) {
				return NextResponse.json(
					{ success: false, message: "componentCode is required for audit" },
					{ status: 400 },
				);
			}

			const auditResult = await auditComponentWithClaude(
				data.componentCode,
				data.componentName,
			);

			return NextResponse.json({
				success: true,
				action: "audit",
				report: auditResult.text,
				usage: auditResult.usage,
			});
		}

		return NextResponse.json(
			{ success: false, message: "Invalid action" },
			{ status: 400 },
		);
	} catch (err: unknown) {
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		return NextResponse.json(
			{ success: false, error: errorMessage },
			{ status: 500 },
		);
	}
}

export async function GET() {
	return NextResponse.json({
		status: "ready",
		bridge: "Superpowers + UI/UX Pro Max + Anthropic Claude",
		version: "1.0.0",
		supportedActions: ["generate", "audit", "tokens"],
		masterDesignSystemLoaded: true,
	});
}
