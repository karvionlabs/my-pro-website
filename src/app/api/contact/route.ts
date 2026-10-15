import { NextResponse } from "next/server";
import { z } from "zod";

// Strict schema validation with length boundaries to prevent DoS & buffer exploitation (OWASP A05 & A06)
const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name cannot exceed 100 characters"),
	email: z
		.string()
		.trim()
		.email("Invalid email address format")
		.max(255, "Email address cannot exceed 255 characters"),
	service: z
		.string()
		.trim()
		.min(1, "Please select a service category")
		.max(100, "Service name cannot exceed 100 characters"),
	message: z
		.string()
		.trim()
		.min(10, "Message must be at least 10 characters")
		.max(5000, "Message cannot exceed 5000 characters"),
});

export async function POST(req: Request) {
	try {
		// Content-Type validation to prevent content sniffing & unauthorized media types (OWASP A02)
		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("application/json")) {
			return NextResponse.json(
				{
					success: false,
					message: "Unsupported Media Type: Request must be application/json.",
				},
				{
					status: 415,
					headers: { "X-Content-Type-Options": "nosniff" },
				},
			);
		}

		// Parse body with safe fallback for malformed JSON (OWASP A10)
		let body: unknown;
		try {
			body = await req.json();
		} catch {
			return NextResponse.json(
				{
					success: false,
					message: "Malformed JSON payload received.",
				},
				{
					status: 400,
					headers: { "X-Content-Type-Options": "nosniff" },
				},
			);
		}

		// Safe parsing against Zod schema
		const result = contactSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					success: false,
					errors: result.error.flatten().fieldErrors,
				},
				{
					status: 400,
					headers: { "X-Content-Type-Options": "nosniff" },
				},
			);
		}

		const { name, email, service, message } = result.data;

		// Audit logging with masked identifier to prevent sensitive data leak in production logs (OWASP A09)
		const sanitizedEmail = email.replace(/(?<=.{2}).(?=[^@]*?@)/g, "*");
		console.log(
			`[AUDIT_LEAD_INGEST] Inbound lead verified for ${name} (${sanitizedEmail}) -> Service: "${service}" (Length: ${message.length} chars)`,
		);

		return NextResponse.json(
			{
				success: true,
				message:
					"Inquiry received successfully. Abdullah Karif Shahjada will respond within 24 hours.",
				data: {
					name,
					email,
					service,
					receivedAt: new Date().toISOString(),
				},
			},
			{
				status: 200,
				headers: {
					"X-Content-Type-Options": "nosniff",
					"Cache-Control": "no-store, max-age=0",
				},
			},
		);
	} catch (error) {
		// Shield internal runtime stack traces from escaping to the client (OWASP A02 & A10)
		console.error("[CRITICAL_LEAD_ERROR]", error);
		return NextResponse.json(
			{
				success: false,
				message: "Internal server error occurred processing request.",
			},
			{
				status: 500,
				headers: { "X-Content-Type-Options": "nosniff" },
			},
		);
	}
}

// Reject unallowed HTTP methods with standard 405 Method Not Allowed (OWASP A01 & A02)
export async function GET() {
	return NextResponse.json(
		{ success: false, message: "Method Not Allowed. Use POST." },
		{
			status: 405,
			headers: { Allow: "POST", "X-Content-Type-Options": "nosniff" },
		},
	);
}
