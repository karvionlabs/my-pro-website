# Karvion Labs: Platform Architecture & Engineering Roadmap

## 1. Executive Summary & Architecture Overview
Karvion Labs is an enterprise-grade AI automation, educational technology, and workflow acceleration platform. The system is architected for strict modularity, high performance, and zero-compromise security following the OWASP Top 10 guidelines and the Master Integration Rulebook.

---

## 2. Master Lifecycle Roadmap

```
Phase 1: Foundation & Authentication Layer
├── Secure Single Sign-On (SSO) & OAuth 2.0 Integration
├── Unified Profile Engine & RBAC Authorization
├── PostgreSQL / Supabase & Prisma ORM Core Schema
└── Edge-Compatible JWT Verification (jose)

Phase 2: Core Module & Workflow Integration
├── Modular Domain: Education Subsystem (src/modules/education/)
├── Modular Domain: Tutoring Engine (src/modules/tutoring/)
├── Modular Domain: Job Portal Engine (src/modules/jobs/)
└── Type-Safe Server Actions & Event-Driven Workflows (Inngest)

Phase 3: Media & Content Processing (Linux Native)
├── Open-Source Transcoding Pipeline (FFmpeg 8.x / Ubuntu CLI)
├── Local Desktop Workflows (LosslessCut & Kdenlive)
└── Zero Reliance on Proprietary SaaS Media Processing

Phase 4: AI Automation & Agentic Workflows
├── Google Antigravity Agentic CLI & Sub-Agent Routers
├── Structured JSON Schemas & Validation Contracts (Zod)
└── Automated DevSecOps, Playwright E2E, and Vitest Verification
```

---

## 3. Directory & Folder Structure

```
.
├── .github/
│   ├── dependabot.yml              # Weekly automated dependency vulnerability checks
│   └── workflows/
│       ├── ci.yml                  # Biome linting, TypeScript compiler, Turbopack build
│       └── security-audit.yml      # Automated npm audit, Dependency Review, CodeQL scanning
├── .specify/
│   ├── memory/constitution.md     # Governance constitution & Master Integration Rulebook
│   └── specs/                     # Specification and feature requirement documents
├── asterisk/                       # Open-Source VoIP / Asterisk PBX configs
│   ├── extensions.conf            # Dialplan, IVR logic, and webhook dispatch
│   └── sip.conf                   # SIP user profiles & trunking configuration
├── design/                         # Architecture diagrams & UI component specs
│   ├── architecture.drawio        # Full-stack system topology & data flow
│   └── wireframe-spec.json        # Component wireframe layout specifications
├── docker-compose.yml              # Local open-source PostgreSQL & Supabase environment
├── docker-compose.asterisk.yml     # Local Asterisk VoIP container stack
├── prisma/
│   └── schema.prisma              # Unified PostgreSQL / Supabase relational schema
├── public/
│   ├── firebase-messaging-sw.js   # Service worker for background push notifications
│   └── ...                        # Static media and icons
├── src/
│   ├── app/                       # Next.js 16 App Router pages and API routes
│   │   ├── api/
│   │   │   ├── contact/           # Contact and lead ingestion endpoint
│   │   │   ├── health/            # Production health check & telemetry probe
│   │   │   ├── voip/              # Asterisk IVR / telephony webhook receiver
│   │   │   └── workflow/          # Automation workflow execution endpoint
│   │   ├── layout.tsx             # Root layout with theme and font providers
│   │   └── page.tsx               # Main public portal
│   ├── components/                # Reusable UI primitives (Bento grids, navigation)
│   ├── db/                        # Drizzle SQLite local schema & client
│   ├── lib/                       # Pure backend utilities & service integrations
│   │   ├── crypto.ts              # Edge-compatible JOSE JWT & nanoid utils
│   │   ├── csv-engine.ts          # PapaParse CSV export and parsing engine
│   │   ├── firebase/              # FCM Client & Admin push notification services
│   │   ├── inngest/               # Background workflow execution client
│   │   ├── logger.ts              # Pino high-performance structured logging
│   │   ├── safe-action.ts         # Type-safe server actions wrapper
│   │   └── supabase/              # Supabase browser & server clients (@supabase/ssr)
│   └── modules/                   # Domain modules (Education, Tutoring, Jobs)
└── vitest.config.mts              # Automated unit and integration test configuration
```

---

## 4. Relational Database Schema Design (Prisma & Drizzle)

### Core Relational Models (PostgreSQL / Supabase):
1. **User (Unified Profile & Auth)**
   - `id`: UUID (Primary Key)
   - `email`: String (Unique)
   - `fullName`: String
   - `role`: Enum (`ADMIN`, `INSTRUCTOR`, `STUDENT`, `RECRUITER`)
   - `avatarUrl`: String (Optional)
   - `createdAt`: DateTime
   - `updatedAt`: DateTime

2. **Lead & Inquiry (`leads`)**
   - `id`: Int / UUID (Primary Key)
   - `name`: String
   - `email`: String
   - `service`: String
   - `budget`: String
   - `message`: Text
   - `status`: Enum (`NEW`, `CONTACTED`, `QUALIFIED`, `CLOSED`)
   - `createdAt`: DateTime

3. **Course & Educational Module (`courses`, `lessons`)**
   - `id`: UUID (Primary Key)
   - `title`: String
   - `slug`: String (Unique)
   - `description`: Text
   - `instructorId`: UUID (Foreign Key -> User.id)
   - `status`: Enum (`DRAFT`, `PUBLISHED`, `ARCHIVED`)
   - `durationMinutes`: Int

4. **Tutoring Session (`tutoring_sessions`)**
   - `id`: UUID (Primary Key)
   - `tutorId`: UUID (Foreign Key -> User.id)
   - `studentId`: UUID (Foreign Key -> User.id)
   - `scheduledAt`: DateTime
   - `meetingUrl`: String
   - `status`: Enum (`SCHEDULED`, `COMPLETED`, `CANCELLED`)

5. **VoIP Telephony Log (`call_logs`)**
   - `id`: UUID (Primary Key)
   - `callId`: String (Indexed)
   - `callerNumber`: String
   - `recipientNumber`: String
   - `direction`: Enum (`INBOUND`, `OUTBOUND`)
   - `status`: Enum (`RINGING`, `ANSWERED`, `BUSY`, `FAILED`)
   - `durationSeconds`: Int
   - `ivrSelection`: String

---

## 5. API Routes Specification

| Route | Method | Purpose | Protection |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health check, telemetry probe, and system status | Public |
| `/api/contact` | `POST` | Ingest prospective client leads and trigger alerts | Rate-limited / Public |
| `/api/workflow` | `POST` | Execute Inngest background automations and routines | JWT / Inngest Signature |
| `/api/voip` | `POST` | Receive incoming Asterisk call events and dispatch IVR | Shared Webhook Secret |
| `/api/auth/callback`| `GET` | Handle Supabase OAuth 2.0 exchange and session cookies| OAuth Provider |

---

## 6. DevSecOps & Security Hardening
- **Strict Headers:** `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Pre-Commit Enforcement:** Biome linter, Husky pre-commit hooks, sensitive credential pattern scanner.
- **Continuous Integration:** Automated GitHub Actions running `npm audit`, Dependency Review, and CodeQL.
