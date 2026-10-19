import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Enterprise Structured Server Logger
 * Equipped with automatic sensitive field redaction and level filtering
 */
export const logger = pino({
	level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
	redact: {
		paths: [
			"password",
			"*.password",
			"token",
			"*.token",
			"passkey",
			"secret",
			"authorization",
			"cookie",
			"apiKey",
		],
		censor: "[REDACTED]",
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});
