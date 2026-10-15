# Specification: Elite Bento Grid & Silicon Valley UI/UX Architecture

**Spec ID:** `002-feature-upgrade`  
**Status:** Approved  
**Author:** Principal Architect (GitHub Spec-Kit)  
**Target:** Karvion Labs (`my-pro-website`)

---

## 1. Executive Summary & Vision
Elevate **Karvion Labs** (Founder: Abdullah Karif Shahjada) into a Tier-1 Silicon Valley agency & platform aesthetic (comparable to Linear, Vercel, and Raycast). The core upgrade replaces flat service cards with an interactive **Bento Grid Architecture**, integrates fluid typography using modern geometric Sans-Serif fonts with native Bengali support, provides an instant `EN | বাংলা` bilingual toggle, a global Command+K navigation palette, and an automated lead capture API.

---

## 2. Core User Stories

1. **Enterprise Prospect / Founder:**
   - *As a client evaluating Karvion Labs*, I want to explore services in an engaging **Bento Grid** that visually demonstrates AI agent workflows, Next.js architecture, and Playwright SQA suites with interactive badges and live micro-metrics.
2. **Global & Local Client Experience:**
   - *As a visitor from Bangladesh or international markets*, I want to toggle between English and Bengali instantly (`EN | বাংলা`) without reloading the page, with complete typographic harmony.
3. **Power User Navigation:**
   - *As a developer or power user*, I want to press `Ctrl+K` (or `Cmd+K`) from any page to open a command palette, search services/projects, switch themes, or launch a direct WhatsApp discussion.
4. **Seamless Conversion & Lead Capture:**
   - *As an interested founder*, I want to submit a project inquiry with instant client feedback (confetti + toast notification) or immediately message the founder via verified WhatsApp.

---

## 3. UI/UX & Layout Architecture

### 3.1 Typography Matrix
- **Latin / Global Script:** `Plus Jakarta Sans` via `next/font/google` (Variable font, weights 400-800, zero serif fallback).
- **Bengali Script:** `Hind Siliguri` via `next/font/google` (weights 400, 500, 600, 700) automatically applied when `html[lang="bn"]`.
- **Monospace Code/Tags:** `Geist Mono` / System monospace for tags, metrics, and shortcuts.

### 3.2 Visual Aesthetics & Bento Grid Layout
- **Background Layer:** Deep dark OKLCH slate (`oklch(0.12 0.02 250)`) with subtle architectural `.bg-grid-pattern` (40px linear grid with radial vignette mask).
- **Services Bento Grid (2x2 / 3-Column Asymmetrical Matrix):**
  - **Card 1 (Hero Bento - AI Autonomous Agents, Span 2):** Highlights multi-agent workflows, OpenClaw execution, live status indicator, and prompt orchestration badge.
  - **Card 2 (Performance Bento - Next.js 16 Web Engineering, Span 1):** Sub-second FCP metric pill, Turbopack badge, and Server Component benefits.
  - **Card 3 (Enterprise Bento - Playwright SQA Automation, Span 1):** Multi-browser regression badge, 250+ test journeys, and zero regression seal.
  - **Card 4 (Growth Bento - AI Marketing & Pipeline Scaling, Span 2):** Campaign automation, analytics anomaly alerts, and conversion metrics.
- **Card Interactive Features:**
  - Dynamic radial spotlight border on mouse hover (`hover:border-cyan-500/40`).
  - Micro-elevations via Framer Motion (`whileHover={{ y: -4 }}`).
  - Accessible Lucide icons in glowing gradient containers (`cyan-500/20` to `violet-500/20`).

---

## 4. Functional Specifications

### 4.1 Bilingual Engine (`src/context/language-context.tsx`)
- Context provider storing language state (`en` | `bn`), initialized from `localStorage("karvion_lang")`.
- Dynamic translation lookup helper `t(key)` providing 100% complete localized copy for Navigation, Hero, Bento Services, Projects, Tech Matrix, Testimonials, and Contact form.
- Smooth HTML `lang` attribute synchronization.

### 4.2 Command+K Palette (`src/components/layout/command-menu.tsx`)
- Global listener for `(metaKey || ctrlKey) && key === 'k'`.
- Header search button and mobile icon trigger.
- Instant keyboard navigation to `#services`, `#projects`, `#tech-stack`, `#testimonials`, `#contact`.
- Quick action toggles: Language (`EN <-> বাংলা`), Theme (`Dark / Light / System`), Direct WhatsApp, and GitHub repo.

### 4.3 Lead Capture API (`src/app/api/contact/route.ts`)
- Server-side runtime POST handler with strict Zod validation schema.
- Validation bounds:
  - `name`: min 2 characters, trimmed.
  - `email`: valid RFC 5322 email string.
  - `service`: required selection string.
  - `message`: min 10 characters, trimmed.
- Audit telemetry logged to server console.
- Response contract: JSON payload `{ success: boolean, message: string, data?: object, errors?: object }`.

### 4.4 Client-Side Feedback & Micro-Interactions
- `canvas-confetti` celebration burst on successful contact transmission.
- `sonner` rich colored toast notifications with action status.
- Direct WhatsApp link pre-filled with inquiry greeting to founder's direct channel.

---

## 5. Non-Functional & Quality Constraints
- **Zero Hydration Mismatch:** Client-only states like theme and language must suppress hydration warnings or mount cleanly via `useEffect`.
- **Pre-Commit Code Quality:** Format all code with Biome (`npx @biomejs/biome check --write .`) prior to commit.
- **Turbopack Build Integrity:** Strict adherence to zero-error build gates (`npm run build`).
