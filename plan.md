# BrightPath CRM — Master Project Plan & Execution Context

> **Project**: BrightPath CRM — Coaching Institute Admissions & Pipeline Management  
> **Repository**: `https://github.com/ankur37raut-tech/brightpath-crm.git`  
> **Stack**: React 19 + TypeScript + Vite 8 + Supabase (PostgreSQL & Auth) + Vercel  
> **Master Reference**: `BrightPath_CRM_Full_Master_Build_Prompt.docx`

---

## 1. Project Overview & Business Rules

### Purpose
BrightPath Academy receives prospective student inquiries through web forms, phone calls, walk-ins, social media, and referrals. This CRM provides an end-to-end operational pipeline to track leads from initial enquiry to admission conversion, ensuring no student is forgotten and follow-up accountability is strictly maintained.

### Core User Roles
1. **Administrator**: Full operational oversight, manages users and roles via controlled database procedures.
2. **Manager**: Monitors full academy pipeline, tracks overdue follow-ups across counsellors, and reassigns leads.
3. **Counsellor**: Default least-privileged role. Manages created or assigned leads, logs activities, and schedules follow-up calls.

### Security Invariants
- **Database Boundary**: Client-side UI guards are for UX only. PostgreSQL Row-Level Security (RLS) is the authoritative security boundary.
- **Role Escalation Prevention**: User roles cannot be modified via client-side UI requests or profile updates. Enforced via database triggers.
- **Secret Hygiene**: Client bundle contains only public `VITE_` variables. No service-role keys or direct database passwords are ever exposed.

---

## 2. Immutable Iterative Delivery Cycle

Every feature phase strictly adheres to this 6-step lifecycle:

```
[1. Develop] ➔ [2. Local Test] ➔ [3. Verify] ➔ [4. Deploy] ➔ [5. Live Test] ➔ [6. User Approval]
```

1. **Develop**: Author typed interfaces, UI components, hooks, and services for that specific feature.
2. **Local Test**: Execute static analysis and build scripts (`npm run typecheck`, `npm run lint`, `npm run build`).
3. **Verify**: Ensure the feature meets all defined acceptance criteria from the master specification.
4. **Deploy**: Stage and commit to Git with descriptive conventional commit, then push to GitHub remote `origin/main`.
5. **Live Test**: Verify and test the newly deployed feature on the live production Vercel URL.
6. **User Approval Gate**: Present results to the user and wait for explicit approval before moving to the next phase.

---

## 3. Relational Schema & Data Model

### `profiles`
- `id`: UUID (PK, references `auth.users(id)` ON DELETE CASCADE)
- `full_name`: TEXT NOT NULL
- `role`: TEXT NOT NULL DEFAULT `'counsellor'` CHECK (`role IN ('admin', 'manager', 'counsellor')`)
- `created_at`: TIMESTAMPTZ DEFAULT now()
- `updated_at`: TIMESTAMPTZ DEFAULT now()

### `leads`
- `id`: UUID (PK, DEFAULT `gen_random_uuid()`)
- `full_name`: TEXT NOT NULL
- `email`: TEXT NULLABLE
- `phone`: TEXT NOT NULL
- `course_interest`: TEXT NOT NULL
- `source`: TEXT NOT NULL CHECK (`source IN ('Website', 'Phone', 'Walk-in', 'Referral', 'Social Media', 'Other')`)
- `status`: TEXT NOT NULL DEFAULT `'New'` CHECK (`status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Lost')`)
- `lost_reason`: TEXT NULLABLE
- `assigned_to`: UUID NULLABLE (references `profiles(id)` ON DELETE SET NULL)
- `created_by`: UUID NOT NULL (references `profiles(id)` ON DELETE RESTRICT)
- `notes`: TEXT NULLABLE
- `created_at`: TIMESTAMPTZ DEFAULT now()
- `updated_at`: TIMESTAMPTZ DEFAULT now()

### `follow_ups`
- `id`: UUID (PK, DEFAULT `gen_random_uuid()`)
- `lead_id`: UUID NOT NULL (references `leads(id)` ON DELETE CASCADE)
- `assigned_to`: UUID NOT NULL (references `profiles(id)` ON DELETE CASCADE)
- `due_at`: TIMESTAMPTZ NOT NULL
- `note`: TEXT NOT NULL
- `status`: TEXT NOT NULL DEFAULT `'pending'` CHECK (`status IN ('pending', 'completed', 'cancelled')`)
- `completed_at`: TIMESTAMPTZ NULLABLE
- `created_by`: UUID NOT NULL (references `profiles(id)` ON DELETE RESTRICT)
- `created_at`: TIMESTAMPTZ DEFAULT now()

### `activities`
- `id`: UUID (PK, DEFAULT `gen_random_uuid()`)
- `lead_id`: UUID NOT NULL (references `leads(id)` ON DELETE CASCADE)
- `actor_id`: UUID NOT NULL (references `profiles(id)` ON DELETE RESTRICT)
- `activity_type`: TEXT NOT NULL CHECK (`activity_type IN ('lead_created', 'status_changed', 'note_added', 'follow_up_created', 'follow_up_completed', 'assigned')`)
- `description`: TEXT NOT NULL
- `metadata`: JSONB DEFAULT `'{}'::jsonb`
- `created_at`: TIMESTAMPTZ DEFAULT now()

---

## 4. Phase-by-Phase Roadmap & Status Tracker

| Phase | Feature Focus | Status | Git Milestone |
| :---: | :--- | :---: | :--- |
| **Phase 1** | **Foundation & Application Shell** | ✅ **COMPLETED** | `9eed2e1` (`feat(phase-1): migrate to TypeScript, configure routing, and build responsive navigation shell`) |
| **Phase 2** | **Supabase Client & Environment Validation** | 🟡 PENDING | Ready for development |
| **Phase 3** | **Database Schema, Migrations & RLS Policies** | ✅ **AUTHORED** | Migrations generated in `supabase/` |
| **Phase 4** | **Authentication & Role-Based Profile Lifecycle** | ⚪ PENDING | - |
| **Phase 5** | **Lead Management — CRUD & Status Transitions** | ⚪ PENDING | - |
| **Phase 6** | **Lead Search, Multi-Filter & Assignment** | ⚪ PENDING | - |
| **Phase 7** | **Follow-up Engine & Overdue Tracking** | ⚪ PENDING | - |
| **Phase 8** | **Lead Activity History & Audit Timeline** | ⚪ PENDING | - |
| **Phase 9** | **Dashboard Analytics & Role-Scoped KPIs** | ⚪ PENDING | - |
| **Phase 10** | **Accessibility, Validation, Error Handling & Mobile Polish** | ⚪ PENDING | - |
| **Phase 11** | **Production Hardening, Handover & Documentation** | ⚪ PENDING | - |

---

## 5. Phase Details & Verification Criteria

### Phase 1: Foundation & Application Shell ✅ COMPLETED
- TypeScript migration with strict type-checking.
- Responsive layout with Sidebar, Navbar, and mobile drawer.
- Brand identity: BrightPath Academy palette (`#0F172A`, `#1E293B`, `#2563EB`).
- Route shells: `/`, `/leads`, `/leads/new`, `/leads/:id`, `/followups`, `/reports`, `/settings`, `/login`, `*`.
- Verification: `npm run typecheck`, `npm run lint`, and `npm run build` all pass with 0 errors.

### Phase 2: Supabase Client & Environment Validation (Next)
- Install `@supabase/supabase-js`.
- Create `.env.example` with public client placeholders (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Create `src/lib/supabaseClient.ts` with strict runtime environment validation.
- Implement user-friendly `ConfigWarningBanner` when environment keys are missing, explaining exact setup steps without application crash.
- Verification: App renders cleanly in both configured and unconfigured states.

### Phase 3: Database Schema, Relational Migrations & RLS
- Write migration SQL (`supabase/migrations/`):
  - Table definitions, UUID generators, constraints, indexes.
  - Automatic `profiles` trigger on `auth.users` registration.
  - Automatic `updated_at` triggers.
  - Granular RLS policies (least-privilege counsellor isolation, manager/admin oversight, anti-privilege escalation).
- Verification: SQL executes successfully in Supabase SQL Editor.

### Phase 4: Authentication & Role-Based Profile Lifecycle
- Auth service (`signIn`, `signUp`, `signOut`, `getProfile`).
- React Context & Hook (`AuthContext`, `useAuth`).
- Protected route gates and live role badge in top navbar.
- Verification: Test live signup, login, role indicator, and logout directly on Vercel.

### Phase 5: Lead Management — CRUD & Status Transitions
- `leadsService.ts` for database operations.
- Lead creation form with required field validation (phone, name, course interest).
- Lead detail view with status changer (mandating reason if marked `Lost`).
- Verification: Real database records created, refreshed, and updated in Supabase.

### Phase 6: Lead Search, Multi-Filter & Assignment
- Real-time debounced text search (name, phone, email).
- Filter bar: Status, Source, and Assignee filters with active badges and one-click reset.
- Lead assignment to team counsellors (Manager/Admin action).
- Verification: Combined filters accurately constrain visible leads.

### Phase 7: Follow-up Engine & Overdue Tracking
- `followUpsService.ts` for scheduling and status toggling.
- Dedicated `/followups` page with triage buckets: Overdue, Today, Upcoming, Completed.
- Overdue logic: `status = 'pending' AND due_at < now()`.
- One-click "Mark Completed" setting `completed_at` timestamp.
- Verification: Overdue warnings display accurately and resolve upon completion.

### Phase 8: Lead Activity History & Audit Timeline
- `activityService.ts` for immutable audit logging.
- Automatic event recording for lead creation, status updates, and follow-ups.
- Reverse-chronological timeline on Lead Detail page.
- Verification: Action triggers immediate activity entry in database and UI.

### Phase 9: Dashboard Analytics & Role-Scoped KPIs
- Live KPI cards calculated from real database records:
  - Total Accessible Leads
  - New Enquiries
  - Converted Admissions
  - Overdue Follow-ups
  - Conversion Rate %: `(Converted / Total) * 100` (safe from division by zero).
- Visual charts: Pipeline by Status, Enquiries by Source.
- Verification: Dashboard KPI totals reconcile exactly with lead list records.

### Phase 10: Accessibility, Validation, Error Handling & Mobile Polish
- Full keyboard navigation and visible focus rings.
- High-contrast status badges (text + semantic icons).
- React Error Boundary and network retry banner.
- Responsive mobile testing on small viewports (<640px).
- Verification: Pass WCAG accessibility and mobile responsiveness criteria.

### Phase 11: Production Hardening, Handover & Documentation
- Comprehensive `README.md` with setup, architecture, and deployment instructions.
- Full verification of `npm run lint` and `npm run build`.
- Final end-to-end smoke test on the live Vercel URL.
- Handover report detailing completed features, security posture, and limitations.

---

## 6. Development & Quality Commands

```bash
# Start local development server
npm run dev

# Run TypeScript type-checker
npm run typecheck

# Run linter
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
