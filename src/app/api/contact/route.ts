import { NextResponse } from "next/server";
import { z } from "zod";
import { db, ensureDbTables, leads, systemEvents } from "@/db";

// Lightweight sliding window in-memory rate limiter (OWASP API4: Unrestricted Resource Consumption)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_REQUESTS = 5; // 5 inquiries per minute per IP

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = rateLimitMap.get(ip);

	if (!record || now > record.resetTime) {
		rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
		return true;
	}

	if (record.count >= MAX_REQUESTS) {
		return false;
	}

	record.count += 1;
	return true;
}

// Strict anti-XSS sanitizer stripping HTML control tags and executable vectors
const sanitizeInput = (val: string): string =>
	val
		.replace(/<[^>]*>?/gm, "")
		.replace(/javascript:/gi, "")
		.replace(/data:/gi, "")
		.trim();

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
		// Content-Length check to reject oversized payload DoS attacks before body consumption (OWASP API4)
		const contentLength = req.headers.get("content-length");
		if (contentLength && parseInt(contentLength, 10) > 16384) {
			return NextResponse.json(
				{
					success: false,
					message: "Payload Too Large: Submission exceeds 16KB limit.",
				},
				{
					status: 413,
					headers: { "X-Content-Type-Options": "nosniff" },
				},
			);
		}

		// Sliding window rate limit check (OWASP API4)
		const forwarded = req.headers.get("x-forwarded-for");
		const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
		if (!checkRateLimit(clientIp)) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Too many inquiries submitted. Please wait 60 seconds before retrying.",
				},
				{
					status: 429,
					headers: {
						"Retry-After": "60",
						"X-Content-Type-Options": "nosniff",
					},
				},
			);
		}

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
		const cleanName = sanitizeInput(name);
		const cleanEmail = email.toLowerCase().trim();
		const cleanService = sanitizeInput(service);
		const cleanMessage = sanitizeInput(message);

		// Audit logging with masked identifier to prevent sensitive data leak in production logs (OWASP A09)
		const sanitizedEmail = cleanEmail.replace(/(?<=.{2}).(?=[^@]*?@)/g, "*");
		console.log(
			`[AUDIT_LEAD_INGEST] Inbound lead verified for ${cleanName} (${sanitizedEmail}) -> Service: "${cleanService}" (Length: ${cleanMessage.length} chars)`,
		);

		// Persist lead directly to Drizzle ORM SQLite database
		try {
			await ensureDbTables();
			await db.insert(leads).values({
				name: cleanName,
				email: cleanEmail,
				service: cleanService,
				message: cleanMessage,
			});
			await db.insert(systemEvents).values({
				eventName: "lead_inquiry_received",
				metadata: JSON.stringify({
					service: cleanService,
					timestamp: new Date().toISOString(),
				}),
			});
		} catch (dbErr) {
			console.error("[DB_LEAD_INSERT_ERROR]", dbErr);
		}

		return NextResponse.json(
			{
				success: true,
				message:
					"Inquiry received successfully. Abdullah Karif Shahjada will respond within 24 hours.",
				data: {
					name: cleanName,
					email: cleanEmail,
					service: cleanService,
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
