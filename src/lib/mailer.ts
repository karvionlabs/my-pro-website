import { format } from "date-fns";
import nodemailer from "nodemailer";

export interface SendMailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export interface MailDeliveryResult {
	success: boolean;
	messageId?: string;
	mode: "smtp" | "dry-run";
	deliveredAt: string;
	error?: string;
}

/**
 * Configure reusable nodemailer transport with standard SMTP credentials
 */
function createTransport() {
	const host = process.env.SMTP_HOST;
	const port = Number(process.env.SMTP_PORT) || 587;
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

	if (!host || !user || !pass) {
		return null;
	}

	return nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: {
			user,
			pass,
		},
	});
}

/**
 * Enterprise Mailer Engine: dispatches emails via SMTP or logs safe local dry-run
 */
export async function sendEmail(
	options: SendMailOptions,
): Promise<MailDeliveryResult> {
	const formattedTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss 'UTC'");
	const transport = createTransport();
	const from =
		process.env.SMTP_FROM || '"Karvion Labs" <notifications@karvionlabs.com>';

	if (!transport) {
		console.log(
			`[MAILER_DRY_RUN] ${formattedTimestamp} -> To: "${options.to}" | Subject: "${options.subject}" (SMTP env unset - simulated delivery)`,
		);
		return {
			success: true,
			mode: "dry-run",
			deliveredAt: formattedTimestamp,
		};
	}

	try {
		const info = await transport.sendMail({
			from,
			to: options.to,
			subject: options.subject,
			text: options.text,
			html: options.html,
		});

		console.log(
			`[MAILER_SUCCESS] ${formattedTimestamp} -> MessageId: ${info.messageId}`,
		);

		return {
			success: true,
			messageId: info.messageId,
			mode: "smtp",
			deliveredAt: formattedTimestamp,
		};
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown mailer error";
		console.error(`[MAILER_ERROR] ${formattedTimestamp} -> ${errorMessage}`);
		return {
			success: false,
			error: errorMessage,
			mode: "smtp",
			deliveredAt: formattedTimestamp,
		};
	}
}
