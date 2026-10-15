import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters"),
	email: z.string().trim().email("Invalid email address"),
	service: z.string().trim().min(1, "Please select a service"),
	message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const result = contactSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					success: false,
					errors: result.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { name, email, service, message } = result.data;

		// Lead capture telemetry
		console.log(
			`[LEAD_CAPTURE] New inquiry from ${name} (${email}) for service "${service}": "${message.slice(0, 50)}..."`,
		);

		return NextResponse.json({
			success: true,
			message:
				"Inquiry received successfully. Abdullah Karif Shahjada will respond within 24 hours.",
			data: {
				name,
				email,
				service,
				receivedAt: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error("[LEAD_CAPTURE_ERROR]", error);
		return NextResponse.json(
			{
				success: false,
				message: "Internal server error processing contact inquiry.",
			},
			{ status: 500 },
		);
	}
}
