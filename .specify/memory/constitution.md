# Project Constitution & Spec-Driven Development Rules

## 1. Core Architecture & Technology Stack
- **Framework:** Next.js 16 (App Router with Turbopack only). Legacy Pages Router is strictly prohibited.
- **Styling & Design System:** Tailwind CSS v4 with OKLCH dynamic color scales and official Shadcn UI component primitives (`@base-ui` / Radix).
- **Typography Standards:** Modern Geometric Sans-Serif only (`Plus Jakarta Sans` / `Geist` for Latin, `Hind Siliguri` for Bengali). Serif fallback is strictly prohibited.
- **Bento Grid Layout Architecture:** High-converting sections must leverage asymmetrical, modular Bento Grid cards (`col-span-1 md:col-span-2`, live mini-widgets, interactive spotlight borders).
- **Language & Runtime:** TypeScript with strict type checking. `any` types and untested type casts are prohibited.
- **Zero-Mess Directory Structure:** All application code must reside cleanly under `src/app`, `src/components`, `src/context`, and `src/data`.

## 2. Motion, Interactivity & User Experience
- **Micro-Interactions:** Use Framer Motion (`motion/react`) for staggered entrances, interactive hover elevations, and responsive feedback.
- **Smooth Inertia Scrolling:** Lenis Smooth Scroll runtime must power buttery-smooth scrolling without breaking anchor jumps.
- **Command Palette:** Quick-action Command Menu (`Ctrl+K` / `⌘K`) powered by `cmdk` must provide instant search across sections, actions, and theme/language toggles.
- **Bilingual First:** Universal `useLanguage()` engine supporting instant, zero-reload `EN | বাংলা` toggling across all user-facing components.

## 3. Code Quality & Pre-Commit Rules
- **Linter & Formatter:** Biome (`@biomejs/biome`) is the sole source of truth for code styling, import sorting, and linting.
- **Pre-Commit Enforcement:** Husky and lint-staged automatically run `biome check --write` on all staged files prior to commit. Broken, unformatted, or failing code must never enter the repository.
- **Format Prior to Saving:** All generated or edited files must conform to Biome formatting rules.
- **No Unsafe React Patterns:** Avoid `dangerouslySetInnerHTML` whenever native React elements suffice. Always provide accessible labels and keyboard events.

## 4. Surgical Editing & Token Optimization
- **Surgical Edits Only:** Never rewrite entire files when targeted block replacements or diffs suffice. Preserve line budgets and minimize unnecessary context churn.
- **Preserve Unrelated Code & Comments:** Never delete existing comments, documentation, or configuration unless explicitly tasked.

## 5. Model Context Protocol (MCP) Guardrails
- **Rule 1 (Context7 First):** Before writing or modifying code involving Next.js App Router, Shadcn UI, Tailwind CSS, or external libraries, query the `context7` MCP server to ensure up-to-date syntax.
- **Rule 2 (GitHub MCP & CLI):** Use `gh` CLI or GitHub MCP to manage feature branches, create atomic pull requests, and merge with clean squash commits.
- **Rule 3 (Playwright MCP):** Use Playwright MCP (`@playwright/mcp`) for automated end-to-end browser verification and visual regression testing.
