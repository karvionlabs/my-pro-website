# Project Constitution & Spec-Driven Development Rules

## 1. Core Architecture & Technology Stack
- **Framework:** Next.js (App Router only). Legacy Pages Router is strictly prohibited.
- **Styling:** Tailwind CSS with official Shadcn UI component primitives (`@base-ui` / Radix).
- **Language:** TypeScript with strict type checking. `any` types and untested type casts are prohibited.
- **Zero-Mess Directory Structure:** All application code must reside cleanly under `src/app`, `src/components`, and `src/lib`.

## 2. Code Quality & Formatting
- **Linter & Formatter:** Biome (`@biomejs/biome`) is the sole source of truth for code styling, import sorting, and linting.
- **Pre-Commit Enforcement:** Husky and lint-staged automatically run Biome checks on all staged files prior to commit. Broken, unformatted, or failing code must never enter the repository.
- **Format Prior to Saving:** All generated or edited files must conform to Biome formatting rules.

## 3. Surgical Editing & Token Optimization
- **Surgical Edits Only:** Never rewrite entire files when targeted block replacements or diffs suffice. Preserve line budgets and minimize unnecessary context churn.
- **Preserve Unrelated Code & Comments:** Never delete existing comments, documentation, or configuration unless explicitly tasked.

## 4. Spec-Driven Workflow (GitHub Spec-Kit)
- **Spec First:** Major feature development, schema migrations, or architecture additions must begin with an approved specification in `.specify/specs/`.
- **Traceability:** Implementations must directly map to criteria defined in the specification.

## 5. Model Context Protocol (MCP) Guardrails
- **Rule 1 (Context7 First):** Before writing or modifying code involving Next.js App Router, Shadcn UI, Tailwind CSS, or any external library, ALWAYS query the `context7` MCP server (`resolve-library-id` -> `get-library-docs`) to ensure 100% up-to-date syntax and zero hallucination.
- **Rule 2 (GitHub MCP):** Use the `github` MCP server or `gh` CLI to track feature branches, manage issues, and handle PRs cleanly.

