import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { generateObject, generateText, streamText } from "ai";

/**
 * Karvion AI Automation & Engineering Multi-Model Architecture
 */
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
export const DEFAULT_CLAUDE_MODEL = "claude-3-7-sonnet-20250219";
export const FAST_CLAUDE_MODEL = "claude-3-5-haiku-latest";

export type AiProvider = "anthropic" | "google";

/**
 * Get Anthropic Claude model instance
 */
export function getAnthropicModel(modelName = DEFAULT_CLAUDE_MODEL) {
	return anthropic(modelName);
}

/**
 * Get Google Gemini model instance
 */
export function getGeminiModel(modelName = DEFAULT_GEMINI_MODEL) {
	return google(modelName);
}

/**
 * Universal model resolver
 */
export function getAiModel(
	provider: AiProvider = "anthropic",
	modelName?: string,
) {
	if (provider === "anthropic") {
		return getAnthropicModel(modelName);
	}
	return getGeminiModel(modelName);
}

export interface PromptExecutionOptions {
	provider?: AiProvider;
	modelName?: string;
	systemPrompt?: string;
	temperature?: number;
	maxTokens?: number;
}

/**
 * Universal wrapper around AI SDK generateText for workflow executions
 */
export async function executeAiCompletion(
	prompt: string,
	options: PromptExecutionOptions = {},
) {
	const provider = options.provider || "anthropic";
	const model = getAiModel(provider, options.modelName);

	// Cast to any to avoid minor @ai-sdk/provider nominal version mismatch across sub-dependencies
	return generateText({
		// biome-ignore lint/suspicious/noExplicitAny: Provider nominal version mismatch workaround
		model: model as any,
		prompt,
		system:
			options.systemPrompt ||
			"You are an enterprise AI automation & UI/UX systems architect at Karvion Labs.",
		temperature: options.temperature ?? 0.2,
		maxOutputTokens: options.maxTokens ?? 2000,
	});
}

/**
 * Universal stream text helper for real-time streaming interfaces
 */
export function streamAiCompletion(
	prompt: string,
	options: PromptExecutionOptions = {},
) {
	const provider = options.provider || "anthropic";
	const model = getAiModel(provider, options.modelName);

	// Cast to any to avoid minor @ai-sdk/provider nominal version mismatch across sub-dependencies
	return streamText({
		// biome-ignore lint/suspicious/noExplicitAny: Provider nominal version mismatch workaround
		model: model as any,
		prompt,
		system:
			options.systemPrompt ||
			"You are an enterprise AI automation & UI/UX systems architect at Karvion Labs.",
		temperature: options.temperature ?? 0.2,
	});
}

export { generateObject, generateText, streamText };
