# Technical Architecture Plan: Core Agency & Portfolio Website

## 1. Directory Structure Plan

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Tailwind CSS v4 variables & glassmorphism utilities
│   ├── layout.tsx          # Root layout with SEO metadata & semantic HTML
│   └── page.tsx            # Main landing page assembling modular sections
├── components/
│   ├── layout/
│   │   ├── header.tsx      # Sticky navbar with desktop nav & mobile Sheet
│   │   ├── footer.tsx      # Footer with brand links & social icons
│   │   └── mobile-nav.tsx  # Mobile navigation drawer powered by Shadcn Sheet
│   ├── sections/
│   │   ├── hero.tsx        # High-impact hero with live metrics counters
│   │   ├── services.tsx    # Services showcase grid with hover effects
│   │   ├── projects.tsx    # Interactive filtered project gallery
│   │   ├── project-dialog.tsx # Detailed project modal using Shadcn Dialog
│   │   ├── tech-stack.tsx  # Technology matrix grid
│   │   ├── testimonials.tsx # Testimonials card grid
│   │   └── contact.tsx     # Validated contact form with interactive states
│   └── ui/                 # Shadcn UI primitives
│       ├── button.tsx      # Installed
│       ├── card.tsx        # To install
│       ├── badge.tsx       # To install
│       ├── sheet.tsx       # To install
│       ├── dialog.tsx      # To install
│       ├── input.tsx       # To install
│       ├── textarea.tsx    # To install
│       └── tabs.tsx        # To install
├── data/
│   └── portfolio-data.ts   # Strongly typed mock data for services, projects, testimonials
└── lib/
    └── utils.ts            # Class merging utility (cn)
```

---

## 2. Shadcn UI Component Installation Plan

The following official Shadcn UI primitives will be added via non-interactive CLI:
```bash
npx shadcn@latest add card badge sheet dialog input textarea tabs --yes
```

---

## 3. Data Schema & Model Specifications

All content will be strictly typed in `src/data/portfolio-data.ts`:
- `ServiceItem`: `id`, `title`, `description`, `iconName`, `tags`, `deliverables`.
- `ProjectItem`: `id`, `title`, `category`, `description`, `fullDetails`, `impactMetrics`, `techStack`, `liveUrl`, `githubUrl`.
- `TestimonialItem`: `id`, `clientName`, `role`, `company`, `content`, `rating`, `avatarUrl`.
- `TechStackItem`: `name`, `category`, `level`, `icon`.

---

## 4. Performance, SEO & Quality Standards

1. **Next.js 16 App Router & Turbopack:**
   - Server Components by default for high performance and low client JS payload.
   - Client Components marked strictly with `'use client'` where interactive state is required (e.g. mobile drawer, project filter tabs, contact form).
2. **Metadata & OpenGraph:**
   - Title: `Karvion Labs | AI Automation & High-Performance Software Development`
   - Comprehensive metadata description, keywords, OpenGraph card, and favicon configuration.
3. **Biome Formatting:**
   - Zero linter warnings (`npx @biomejs/biome check --write .`).
   - Tailwind v4 parser directives maintained in `biome.json`.
4. **Git Pre-Commit Hook:**
   - Husky + lint-staged verification before each commit.
