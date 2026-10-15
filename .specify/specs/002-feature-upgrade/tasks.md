# Tasks: Elite Bento Grid & Silicon Valley UI/UX Architecture

**Task File:** `tasks.md`  
**Spec Reference:** `.specify/specs/002-feature-upgrade/spec.md`  
**Plan Reference:** `.specify/specs/002-feature-upgrade/plan.md`  

---

### Phase 1: Core Foundation & Constitution Alignment
- [x] Task 1.1: Update `.specify/memory/constitution.md` with strict Bento Grid, Sans-Serif typography, and motion standards.
- [x] Task 1.2: Verify typography tokens and font variables (`Plus Jakarta Sans` and `Hind Siliguri`) in `src/app/globals.css`.

### Phase 2: Interactive Bento Grid Services Architecture
- [x] Task 2.1: Enhance `src/context/language-context.tsx` with additional rich Bento Grid micro-copy for both English and Bengali.
- [x] Task 2.2: Re-architect `src/components/sections/services.tsx` into a high-converting, asymmetrical Bento Grid (7-col / 5-col split on desktop) with interactive live mini-widgets, code snippets, and hover spotlight effects.

### Phase 3: Silicon Valley Interaction Suite & Command Palette
- [x] Task 3.1: Build `CommandMenu` (`src/components/layout/command-menu.tsx`) with `Ctrl+K` listener, section navigation, and theme/language actions.
- [x] Task 3.2: Integrate Search Trigger into desktop header and mobile drawer (`src/components/layout/header.tsx`).
- [x] Task 3.3: Configure Lenis Smooth Scroll runtime (`src/components/layout/smooth-scroll.tsx`).

### Phase 4: Production SEO Engine & Structured Data
- [x] Task 4.1: Create automated `src/app/sitemap.ts` with Next.js 16 Metadata API.
- [x] Task 4.2: Create automated `src/app/robots.ts` with crawler rules.
- [x] Task 4.3: Inject Google JSON-LD Organization & Founder Schema in `src/app/layout.tsx`.

### Phase 5: Lead Capture API & Quality Gate Verification
- [x] Task 5.1: Verify `src/app/api/contact/route.ts` runtime POST handler and Zod validation.
- [x] Task 5.2: Verify interactive submission with Confetti, Sonner toast, and WhatsApp button in `src/components/sections/contact.tsx`.
- [x] Task 5.3: Run `npx @biomejs/biome check --write .` ensuring zero errors and zero warnings.
- [x] Task 5.4: Run `npm run build` validating clean Next.js 16 Turbopack production build.
- [x] Task 5.5: Commit changes, push to GitHub, and verify live server at `http://localhost:3000`.
