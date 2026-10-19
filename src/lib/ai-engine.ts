import { google } from "@ai-sdk/google";
import { generateObject, generateText, streamText } from "ai";

/**
 * Karvion AI Automation Engine Architecture Configuration
 */
export const DEFAULT_AI_MODEL = "gemini-2.5-flash";

/**
 * Get configured Google Gemini model instance
 */
export function getGeminiModel(modelName = DEFAULT_AI_MODEL) {
	return google(modelName);
}

export interface PromptExecutionOptions {
	systemPrompt?: string;
	temperature?: number;
	maxTokens?: number;
}

/**
 * Clean wrapper around AI SDK generateText for workflow executions
 */
export async function executeAiCompletion(
	prompt: string,
	options: PromptExecutionOptions = {},
) {
	const model = getGeminiModel();
	return generateText({
		model,
		prompt,
		system:
			options.systemPrompt ||
			"You are an enterprise AI automation agent at Karvion Labs.",
		temperature: options.temperature ?? 0.2,
		maxOutputTokens: options.maxTokens ?? 1000,
	});
}

/**
 * Stream text helper for real-time streaming interfaces
 */
export function streamAiCompletion(
	prompt: string,
	options: PromptExecutionOptions = {},
) {
	const model = getGeminiModel();
	return streamText({
		model,
		prompt,
		system:
			options.systemPrompt ||
			"You are an enterprise AI automation agent at Karvion Labs.",
		temperature: options.temperature ?? 0.2,
	});
}

export { generateObject, generateText, streamText };
