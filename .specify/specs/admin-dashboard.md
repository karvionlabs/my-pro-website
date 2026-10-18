# Task Spec: Executive Telemetry & Lead Dashboard (/admin)

**Status:** IN_PROGRESS  
**Component:** `src/app/admin/page.tsx` & `src/components/layout/command-menu.tsx`

---

### 4-Step Checklist:
- [x] **Step 1: Server-Side Drizzle Query Architecture**
  Implement direct server-side data fetching from Drizzle ORM (`leads`, `system_events`, `workflow_blueprints`) ordered by most recent records.
- [x] **Step 2: Executive Telemetry UI & Bento Grid Cards**
  Build `src/app/admin/page.tsx` adhering to Anti-AI-Vibe standards (Linear/Vercel styling, monochrome surfaces, subtle 1px `border-white/10` borders, `@number-flow/react` animated KPI metrics, and responsive data tables).
- [x] **Step 3: Command Palette & Global Navigation Integration**
  Add `/admin` navigation item to `src/components/layout/command-menu.tsx` and provide seamless bi-directional navigation.
- [x] **Step 4: Quality Gate & Deployment**
  Format all code with Biome (`npx @biomejs/biome check --write .`), verify production build with Turbopack (`npm run build`), commit to feature branch, and push to GitHub.
