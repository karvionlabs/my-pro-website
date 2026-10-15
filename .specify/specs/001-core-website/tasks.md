# Implementation Tasks: Core Agency & Portfolio Website (Karvion Labs)

## Phase 1: UI Primitives & Shadcn Installation
- [x] **Task 1.1:** Install required Shadcn UI components: `card`, `badge`, `sheet`, `dialog`, `input`, `textarea`, `tabs`.
- [x] **Task 1.2:** Verify all generated UI components compile cleanly with Next.js 16 and Biome.

## Phase 2: Strongly Typed Content & Data Layer
- [x] **Task 2.1:** Create `src/data/portfolio-data.ts` with TypeScript interfaces for Services, Projects, Testimonials, Tech Stack, and Metrics.
- [x] **Task 2.2:** Populate `src/data/portfolio-data.ts` with authentic content for Karvion Labs (AI Automation, End-to-End Test Automation, Next.js Apps).

## Phase 3: Layout & Navigation Components
- [x] **Task 3.1:** Create `src/components/layout/mobile-nav.tsx` implementing a slide-out mobile drawer with Shadcn `Sheet`.
- [x] **Task 3.2:** Create `src/components/layout/header.tsx` with sticky glassmorphism navbar, brand logo, navigation links, and CTA button.
- [x] **Task 3.3:** Create `src/components/layout/footer.tsx` with brand summary, quick links, social media handles, and copyright.

## Phase 4: Core Website Sections
- [ ] **Task 4.1:** Build `src/components/sections/hero.tsx` with high-converting headline, status badge, dual CTAs, and animated stat metric counters.
- [ ] **Task 4.2:** Build `src/components/sections/services.tsx` showcasing AI Automation, Web Engineering, and SQA Frameworks with Lucide icons and hover glow.
- [ ] **Task 4.3:** Build `src/components/sections/tech-stack.tsx` displaying the technology matrix (Next.js, Python, OpenClaw, Playwright, Tailwind, Docker).
- [ ] **Task 4.4:** Build `src/components/sections/project-dialog.tsx` for viewing deep technical details, architecture highlights, and impact metrics.
- [ ] **Task 4.5:** Build `src/components/sections/projects.tsx` with category filter tabs (All, AI Automation, Web Apps, Test Automation) and project cards.
- [ ] **Task 4.6:** Build `src/components/sections/testimonials.tsx` highlighting verified client reviews, star ratings, and company badges.
- [ ] **Task 4.7:** Build `src/components/sections/contact.tsx` with interactive consultation form, form validation, inquiry feedback, and direct contact details.

## Phase 5: Assembly, Page Integration & SEO
- [ ] **Task 5.1:** Update `src/app/layout.tsx` with optimized OpenGraph meta tags, SEO title, favicon, and viewport settings.
- [ ] **Task 5.2:** Update `src/app/page.tsx` integrating all modular sections into a cohesive, fluid landing page.

## Phase 6: Verification, Pre-Commit & GitHub PR
- [ ] **Task 6.1:** Run `npx @biomejs/biome check --write .` to ensure 100% compliance with zero linter errors.
- [ ] **Task 6.2:** Run `npm run build` to verify clean Turbopack production build with 0 TypeScript errors.
- [ ] **Task 6.3:** Commit the implementation tasks to `feat/001-website-spec` and push to GitHub.
