import fs from "node:fs";
import path from "node:path";
import { executeAiCompletion, streamAiCompletion } from "./ai-engine";

/**
 * Superpowers + UI/UX Pro Max + Anthropic Claude Bridge
 * Unifies Design Tokens, Superpowers Engineering Protocol, and Claude LLM Synthesis.
 */

const MASTER_DESIGN_SYSTEM_PATH = path.join(
	process.cwd(),
	"design-system",
	"karvion-labs",
	"MASTER.md",
);

/**
 * Loads the active UI/UX Pro Max Master Design System from disk
 */
export function getMasterDesignSystem(): string {
	try {
		if (fs.existsSync(MASTER_DESIGN_SYSTEM_PATH)) {
			return fs.readFileSync(MASTER_DESIGN_SYSTEM_PATH, "utf-8");
		}
	} catch (err) {
		console.warn("Could not read MASTER.md:", err);
	}

	return `
# Fallback Karvion Labs Design System
- Theme: Dark Mode (OLED) + Minimalism & Swiss Style
- Spacing: Dense (2px - 32px)
- Palette: Dark base (#0F172A), Slate borders (#475569), Emerald run accent (#22C55E)
- Fonts: JetBrains Mono (Headings/Code) + Plus Jakarta Sans / IBM Plex Sans (Body)
`;
}

/**
 * Generates the unified System Prompt combining:
 * 1. Superpowers Engineering Protocol (TDD, Spec-first, Zero Hallucination, Surgical Diffs)
 * 2. UI/UX Pro Max Design Intelligence (79 Styles, 192 Palettes, 119 UX Guidelines)
 * 3. Anthropic Claude High-Craft Reasoning
 */
export function buildSuperpowerUiUxPrompt(pageContext?: string): string {
	const masterTokens = getMasterDesignSystem();

	return `
You are the Principal UI/UX Architect & Staff Software Engineer at Karvion Labs, operating with Superpowers-grade engineering discipline and powered by Anthropic Claude.

=== SUPERPOWERS ENGINEERING CONSTITUTION ===
1. Spec-First & High Craft: Never output messy or placeholder code. Adhere to strict TypeScript, React 19, and Next.js 16 App Router standards.
2. Anti-"AI Vibe": Strictly avoid cheap rainbow neon gradients, AI mesh blobs, and pastel slop. Enforce crisp 1px borders (border-white/10), deep monochrome surfaces (#0F172A, #1B2336), and purposeful single-accent highlights (#22C55E).
3. Bento Grid Modular Layouts: Structure complex interfaces into asymmetric, information-dense Bento Grid cards with smooth hover elevations.
4. WCAG 2.2 AA Accessibility: Ensure minimum 4.5:1 text contrast ratio, explicit keyboard focus rings (focus-visible:ring-2), aria-labels, and zero layout shift (CLS).
5. No Emojis as Icons: Emojis as interface icons are strictly prohibited. Always use SVG icons (Lucide React or Phosphor Icons).
6. Micro-Interactions: Use Framer Motion (motion/react) for smooth staggered entrances (150-300ms) with prefers-reduced-motion fallbacks.

=== ACTIVE UI/UX PRO MAX DESIGN SYSTEM (${pageContext || "Global"}) ===
${masterTokens}
`.trim();
}

export interface ComponentGenerationRequest {
	prompt: string;
	pageContext?: string;
	stream?: boolean;
}

/**
 * Generate high-craft, non-AI-slop UI component code using Anthropic Claude + UI/UX Pro Max
 */
export async function generateComponentWithClaude(
	req: ComponentGenerationRequest,
) {
	const systemPrompt = buildSuperpowerUiUxPrompt(req.pageContext);

	if (req.stream) {
		return streamAiCompletion(req.prompt, {
			provider: "anthropic",
			systemPrompt,
			temperature: 0.2,
		});
	}

	return executeAiCompletion(req.prompt, {
		provider: "anthropic",
		systemPrompt,
		temperature: 0.2,
		maxTokens: 4000,
	});
}

/**
 * Audit any existing UI component for UI/UX violations, accessibility flaws, and generic AI slop
 */
export async function auditComponentWithClaude(
	componentCode: string,
	componentName = "Component",
) {
	const systemPrompt = buildSuperpowerUiUxPrompt();
	const auditPrompt = `
Perform a rigorous Superpowers & UI/UX Pro Max audit on the following React component "${componentName}":

\`\`\`tsx
${componentCode}
\`\`\`

Evaluate across 5 strict vectors:
1. Anti-AI-Slop & Craft (gradients, border hairlines, surface colors)
2. Bento Grid & Layout Hierarchy
3. WCAG 2.2 AA Contrast & Accessibility (keyboard nav, ARIA, focus rings)
4. Mobile & Desktop Responsiveness
5. Micro-interactions & Reduced-Motion Safety

Return:
- Overall Score (1-100)
- Critical Issues Found
- Surgical Code Fixes (Refactored TypeScript Component)
`.trim();

	return executeAiCompletion(auditPrompt, {
		provider: "anthropic",
		systemPrompt,
		temperature: 0.1,
		maxTokens: 4000,
	});
}
