<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Directives & Guardrails

## 1. Specification & Constitution Alignment
- Strict adherence to `.specify/memory/constitution.md` is mandatory for all operations.
- All code modifications must follow the defined Next.js App Router + Tailwind CSS + Shadcn UI stack.
- Never write ad-hoc code without checking specs in `.specify/specs/`.

## 2. Task Routing & Agent Roles (OpenClaw / Antigravity)
- **Heavy Architecture & Planning Phase:** Route structural system design, large refactors, and schema planning to deep reasoning/planning mode before modifying files.
- **Coding & Implementation Phase:** Route focused implementation and code-generation tasks to `gemini-3-flash` via OpenClaw / Antigravity for high-throughput, low-latency execution.
- **Surgical Edits Only:** Prioritize minimal diffs and targeted block edits over full file replacements to avoid token waste and prevent regression.

## 3. Documentation & Context7 MCP Integration
- Use the **Context7 MCP** server to retrieve up-to-date documentation, API signatures, and version changes before writing unfamiliar library code or integrating new dependencies.
- Never guess or hallucinate API parameters or breaking changes in rapidly evolving libraries (such as Next.js, Tailwind v4, or Shadcn UI).

## 4. Code Quality & Pre-Commit Rules
- Format all code with Biome (`npx @biomejs/biome check --write <files>`) prior to saving or committing.
- Respect Husky pre-commit hooks: ensure zero lint errors and proper formatting at all times.
