import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

interface VoipPayload {
	event: "CALL_START" | "IVR_SELECTION" | "CALL_END";
	callId: string;
	caller?: string;
	direction?: string;
	selection?: string;
	service?: string;
	duration?: number;
	disposition?: string;
}

export async function POST(request: Request) {
	try {
		// 1. Verify webhook signature for security
		const signature = request.headers.get("x-voip-signature");
		const expectedSecret =
			process.env.VOIP_WEBHOOK_SECRET || "karvion_voip_secret_2026";

		if (!signature || signature !== expectedSecret) {
			logger.warn(
				{ providedSignature: signature ? "[REDACTED]" : null },
				"Unauthorized VoIP webhook event rejected",
			);
			return NextResponse.json(
				{ error: "Unauthorized webhook payload" },
				{ status: 401 },
			);
		}

		// 2. Parse event payload
		const body = (await request.json()) as VoipPayload;

		if (!body.callId || !body.event) {
			return NextResponse.json(
				{ error: "Missing required callId or event parameter" },
				{ status: 400 },
			);
		}

		logger.info(
			{
				callId: body.callId,
				event: body.event,
				caller: body.caller || "unknown",
				selection: body.selection,
				service: body.service,
				duration: body.duration,
			},
			"Received Asterisk VoIP event",
		);

		// 3. Process event actions
		switch (body.event) {
			case "CALL_START":
				// Handle new call connection
				return NextResponse.json({
					status: "success",
					message: "Call acknowledged",
					action: "PLAY_GREETING",
				});

			case "IVR_SELECTION":
				// Handle user keypress / menu selection
				return NextResponse.json({
					status: "success",
					message: `Option ${body.selection} routed to ${body.service}`,
					action: "ROUTE_SERVICE",
				});

			case "CALL_END":
				// Handle call completion & logging
				return NextResponse.json({
					status: "success",
					message: "Call logged successfully",
					callId: body.callId,
					durationSeconds: body.duration ?? 0,
				});

			default:
				return NextResponse.json(
					{ error: "Unsupported VoIP event" },
					{ status: 400 },
				);
		}
	} catch (error) {
		logger.error({ err: error }, "Failed to process Asterisk VoIP webhook");
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function GET() {
	return NextResponse.json({
		status: "operational",
		service: "Karvion Asterisk VoIP Telephony Webhook Receiver",
		protocol: "SIP / Webhook v1",
	});
}
