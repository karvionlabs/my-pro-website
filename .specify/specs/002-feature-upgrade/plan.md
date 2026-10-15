# Technical Plan: Elite Bento Grid & Silicon Valley UI/UX Architecture

**Plan ID:** `002-feature-upgrade-plan`  
**Spec Reference:** `.specify/specs/002-feature-upgrade/spec.md`  
**Architecture Lead:** Principal Staff Engineer  

---

## 1. Technical Architecture Overview
This plan establishes the technical blueprints for upgrading the **Karvion Labs** web platform into a cohesive Silicon Valley Bento Grid aesthetic with full bilingual support, seamless keyboard navigation, and robust API lead capture.

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js 16 (App Router)                │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ ThemeProvider (next-themes: dark / light / system)   │   │
│   │   ┌─────────────────────────────────────────────┐   │   │
│   │   │ LanguageProvider (EN | বাংলা Dictionary)    │   │   │
│   │   │   ┌─────────────────────────────────────┐   │   │   │
│   │   │   │ Lenis Smooth Scroll Runtime         │   │   │   │
│   │   │   │ CommandMenu (cmdk, Ctrl+K modal)     │   │   │   │
│   │   │   │                                     │   │   │   │
│   │   │   │ Header (Nav + Search + EN/BN Toggle)│   │   │   │
│   │   │   │                                     │   │   │   │
│   │   │   │ Page Sections:                      │   │   │   │
│   │   │   │  ├─ HeroSection (Framer Motion)     │   │   │   │
│   │   │   │  ├─ ServicesBentoGrid (Asymmetrical)│   │   │   │
│   │   │   │  ├─ ProjectsSection (Tabs + Dialog) │   │   │   │
│   │   │   │  ├─ TechStackSection (Tech Matrix)  │   │   │   │
│   │   │   │  ├─ TestimonialsSection (Reviews)   │   │   │   │
│   │   │   │  └─ ContactSection (Zod + WhatsApp) │   │   │   │
│   │   │   │                                     │   │   │   │
│   │   │   │ Footer (Bilingual + Socials)        │   │   │   │
│   │   │   │ Sonner Toaster (Toast Notifications)│   │   │   │
│   │   │   └─────────────────────────────────────┘   │   │   │
│   │   └─────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Routes & APIs:                                            │
│   ├─ / (Static Prerender with JSON-LD Schema)               │
│   ├─ /robots.txt (Static SEO Crawler Rules)                 │
│   ├─ /sitemap.xml (Static XML Sitemap)                      │
│   └─ /api/contact (POST: Zod Lead Capture Route)            │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Component Boundaries & File Manifest

| File Path | Role | Boundary | Dependencies |
| :--- | :--- | :--- | :--- |
| `src/app/globals.css` | Styling & Tokens | Server / CSS | Tailwind CSS v4, Lenis CSS, Grid Utilities |
| `src/app/layout.tsx` | Root Shell & SEO | Server Component | Google Fonts, ThemeProvider, LanguageProvider, SmoothScroll |
| `src/app/sitemap.ts` | Search Index | Server Route | Next.js MetadataRoute |
| `src/app/robots.ts` | Crawler Directives | Server Route | Next.js MetadataRoute |
| `src/app/api/contact/route.ts` | Lead Ingestion | Dynamic API Route | `zod`, `next/server` |
| `src/context/language-context.tsx` | State & Dict | Client Component | `react`, `localStorage` |
| `src/components/layout/theme-provider.tsx` | Theme Context | Client Component | `next-themes` |
| `src/components/layout/smooth-scroll.tsx` | Inertia Scroll | Client Component | `lenis` |
| `src/components/layout/command-menu.tsx` | Palette Modal | Client Component | `cmdk`, `lucide-react`, Shadcn Dialog |
| `src/components/layout/header.tsx` | Navigation Bar | Client Component | `lucide-react`, `useLanguage`, Command trigger |
| `src/components/sections/services.tsx` | Bento Grid | Client Component | Framer Motion, Shadcn Card & Badge |
| `src/components/sections/contact.tsx` | Lead Capture UI | Client Component | `canvas-confetti`, `sonner`, `lucide-react` |

---

## 3. Bento Grid Design Architecture for Services
Rather than uniform, identical cards, the upgraded **Services Bento Grid** implements an asymmetric 3-column / 12-column responsive layout:
1. **Card 1 (AI Autonomous Agents & LLM Pipelines — Span 7 on Desktop):**
   - High-impact banner with animated pulse status.
   - Live visual mini-terminal showcasing agent prompt-chaining and tool calls (`OpenClaw`, `Gemini 3 Flash`).
   - Feature bullet points with glowing cyan accents.
2. **Card 2 (Next.js 16 Full-Stack Architecture — Span 5 on Desktop):**
   - Speed metric showcase: `100/100 Core Web Vitals`, `<85KB Bundle`, `Turbopack`.
   - Responsive UI preview card.
3. **Card 3 (End-to-End Test Automation / SQA — Span 5 on Desktop):**
   - Quality shield with Playwright & Selenium badges.
   - Zero Regression guarantee callout and parallel test runner diagram.
4. **Card 4 (AI Growth & Digital Marketing Engines — Span 7 on Desktop):**
   - Visual conversion metric graph indicator.
   - Anomaly detection pipeline and Meta campaign automation.

---

## 4. Verification & Testing Strategy
1. **Lint & Code Integrity:** Run `npx @biomejs/biome check --write .` ensuring zero errors and zero warnings.
2. **Compilation & Type Safety:** Run `npm run build` validating clean Turbopack prerender and TypeScript compilation.
3. **Live Endpoint Inspection:** Test `http://localhost:3000`, `http://localhost:3000/api/contact`, `http://localhost:3000/robots.txt`, and `http://localhost:3000/sitemap.xml`.
