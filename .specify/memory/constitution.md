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

## 6. Anti-"AI Vibe" & High-Craft Product Design Standards
- **No Generic AI Gradients:** Never use cheap neon rainbow gradients, generic AI mesh blobs, or muddy pastel cards. Use Linear/Vercel-style subtle `1px` borders (`border-white/10`), high-contrast typography, monochrome surfaces with crisp single-color accents, and Bento Grid layouts.
- **Real Data & Micro-Interactions:** Use `@number-flow/react` for metric numbers, `zustand` for complex client states, `nuqs` for URL states, and `drizzle-orm` for real data persistence.

## 7. Master Integration Rulebook & Open-Source Protocol (System Integrity)
- **Supervisory Mandate:** Enforce strict discipline, modular precision, and zero-tolerance for rushed, half-baked implementations or unverified dependencies.
- **Phase 1 (Foundation & Authentication Layer):**
  - Allowed Tools: Node.js, Next.js / Python (Flask/FastAPI), PostgreSQL / SQLite / MongoDB, JWT (`jose`), OAuth 2.0.
  - Rule: Build a secure Single Sign-On (SSO) and Unified Profile backend before touching any frontend UI components. Zero insecure endpoints.
- **Phase 2 (Core Module & Workflow Integration):**
  - Allowed Tools: Git & GitHub, Open-source REST API frameworks, Drizzle ORM.
  - Rule: Strict modular architecture for each subsystem (Education, Tutoring system, Job portal). Monolithic or tightly coupled spaghetti code is prohibited.
- **Phase 3 (Media & Content Processing):**
  - Allowed Tools: Kdenlive, LosslessCut, FFmpeg (Linux/Ubuntu environment).
  - Rule: All course materials, video pipelines, and asset optimizations must strictly utilize open-source media utilities. Zero paid or proprietary services.
- **Phase 4 (AI Automation & Agentic Workflows):**
  - Allowed Tools: Google Antigravity CLI (`agy`), Open-source LLM integrations, structured JSON schemas.
  - Rule: All automation scripts and sub-agent routers must be cleanly documented and tested locally before deployment.
- **Anti-Chaos Directives:**
  - Zero Over-Engineering: Only introduce packages aligned with the active lifecycle phase.
  - Zero Premature Deployment: Never declare a component or service complete without verifiable modular testing and review.
  - Zero Stack Shifting: Maintain strict consistency with the defined open-source stack.
  - Zero False Completion: Never mask missing environment or CLI configurations with mock placeholders.

