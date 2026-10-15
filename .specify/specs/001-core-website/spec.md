# Feature Specification: Core Agency & Portfolio Website (Karvion Labs)

## 1. Executive Summary & Objective
Build a world-class, responsive, high-converting AI Automation & Software Engineering agency/portfolio website for **Karvion Labs** (Founder: Abdullah Karif Shahjada). 
The website serves as the primary commercial storefront and technical showcase, positioning Karvion Labs as a premier provider of AI workflows, intelligent bots, custom full-stack web platforms, and automated software testing frameworks.

---

## 2. Target Audience & User Stories

### Target Audience:
- Founders, CTOs, and business owners looking to eliminate manual business tasks with AI automation.
- Enterprise clients seeking robust End-to-End Test Automation (SQA) and scalable web systems.
- Tech collaborators and potential enterprise clients worldwide.

### User Stories:
- **US-1 (Discovery):** As a visitor, I want to immediately understand Karvion Labs' core value proposition within 5 seconds of landing on the page.
- **US-2 (Services):** As a prospective client, I want to explore detailed service offerings (AI Automation, Full-Stack Web Development, Automated Testing) with clear deliverables.
- **US-3 (Proof):** As a decision-maker, I want to review featured projects, metrics, and client testimonials to evaluate track record and technical competency.
- **US-4 (Action):** As an interested client, I want to submit an inquiry through a responsive contact form or schedule a consultation seamlessly.
- **US-5 (Accessibility & Device Support):** As a mobile or desktop user, I want fluid navigation, fast loading times, and intuitive dark/light aesthetics.

---

## 3. Visual Layout, Design System & Branding

### Color Palette:
- **Background (Dark Mode - Primary):** Deep Obsidian (`oklch(0.12 0.02 250)`) & Dark Slate (`oklch(0.16 0.02 250)`).
- **Background (Light Mode):** Crisp Off-White (`#f8fafc`) with subtle Slate borders.
- **Brand Primary Accent:** Cyber Cyan (`#06b6d4` / `oklch(0.75 0.18 200)`).
- **Brand Secondary Accent:** Electric Violet (`#8b5cf6` / `oklch(0.65 0.22 290)`).
- **Muted & Borders:** Subtle translucent borders with glassmorphism (`border-white/10` and `backdrop-blur-md`).

### Typography:
- Font: Modern sans-serif (Inter / Geist) with high-legibility typographic scale (`text-4xl` to `text-6xl` for hero headlines, `text-base` for body).

---

## 4. Page Architecture & Section Breakdown

1. **Sticky Glassmorphism Header / Navigation Bar:**
   - Brand Logo: "Karvion Labs" with tech icon/badge.
   - Navigation links: Services, Projects, Tech Stack, Testimonials, Contact.
   - Action Button: "Book a Strategy Call" / "Get a Quote" with gradient highlight.
   - Mobile: Responsive hamburger drawer via Shadcn `Sheet`.

2. **Hero Section (Above the Fold):**
   - High-impact status pill: "⚡ Open for Q4 AI Automation Projects".
   - Headline: "Automating Complex Workflows. Building Resilient Software."
   - Subtitle: Highlighting Karvion Labs' expertise in automating repetitive business processes, end-to-end testing, and modern Next.js web applications.
   - Dual Call-to-Action: "Explore Solutions" (Primary Glow Button) and "View Live Projects" (Secondary Outline).
   - Live Performance Metrics Counter: 99.8% Accuracy, 10x Speedup, 100+ Automated Workflows, Zero-Downtime Architecture.

3. **Services Showcase:**
   - Grid of interactive service cards featuring Lucide icons, hover glow effects, and feature lists:
     - **AI Workflow & Agent Automation:** Autonomous agents, OpenClaw integration, LLM pipelines, CRM automations.
     - **Full-Stack Web Development:** Next.js App Router, Tailwind CSS, high-converting responsive interfaces.
     - **End-to-End Test Automation (SQA):** Playwright, Selenium, automated CI/CD test frameworks preventing regression.
     - **Digital Strategy & Meta Growth:** AI-augmented digital marketing, conversion rate optimization.

4. **Interactive Project Gallery / Portfolio:**
   - Filterable categories: "All", "AI Automation", "Web Applications", "Test Frameworks".
   - Project cards displaying badges, tech tags, summary description, and interactive preview modal (`Dialog`).

5. **Technology Stack & Architecture Matrix:**
   - Visual grid showcasing battle-tested open-source tech: Next.js, TypeScript, Tailwind CSS, Python, OpenClaw, Playwright, Docker, Biome, GitHub Actions.

6. **Client Testimonials & Trust Indicators:**
   - Cards highlighting client feedback, star ratings, avatar placeholders, and role/company badges.

7. **Interactive Contact & Consultation Form:**
   - Fields: Full Name, Email, Service Needed (Dropdown/Radio), Project Budget/Scope, Message.
   - Client-side validation with real-time feedback, submission success state, and direct email fallback.

8. **Footer:**
   - Brand mission statement, quick navigation links, social channel links (GitHub, LinkedIn, Facebook, YouTube), copyright statement, and status indicator.

---

## 5. Acceptance Criteria
- [ ] AC-1: Page loads with 100% responsiveness on mobile (360px+), tablet (768px+), and desktop (1024px+).
- [ ] AC-2: All interactive components (Mobile menu sheet, Project preview modal, Contact form validation) operate with zero console errors.
- [ ] AC-3: Zero layout shift (CLS < 0.1) and ultra-fast First Contentful Paint (FCP < 1.0s).
- [ ] AC-4: Fully passes `npx @biomejs/biome check` with zero linter errors or formatting warnings.
