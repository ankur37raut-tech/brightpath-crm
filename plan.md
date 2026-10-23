# BrightPath CRM — Master Project Plan & Execution Context

> **Project**: BrightPath CRM — Coaching Institute Admissions & Pipeline Management  
> **Repository**: `https://github.com/ankur37raut-tech/brightpath-crm.git`  
> **Master Reference**: `BrightPath_CRM_Full_Master_Build_Prompt.docx`  
> **Stack**: React 19 + TypeScript + Vite 8 + Supabase (PostgreSQL & Auth) + Vercel + Oxlint  
> **Supabase Project URL**: `https://vceemaihcgswpzasakid.supabase.co`  
> **Status**: Approved by User — Active Execution

---

## 1. Project Overview & Business Rules

### Purpose & Problem Statement
BrightPath Academy receives prospective student inquiries through web forms, phone calls, walk-ins, social media campaigns, and student referrals. Staff historically relied on unstructured spreadsheets and chat apps, causing missed inquiries, lack of ownership, forgotten follow-ups, and zero conversion visibility. 

BrightPath CRM provides an operational pipeline to capture leads, assign counselors, schedule and triage follow-ups, maintain an immutable activity audit trail, and track institute-level conversion metrics.

### User Roles & Permissions
1. **Administrator**: Full system visibility, manages staff accounts and permissions via controlled database procedures. Cannot be self-promoted from the client.
2. **Manager**: Reviews institute-wide pipeline, monitors overdue follow-ups across counselors, and reassigns leads between staff members.
3. **Counsellor**: Default least-privileged staff role. Manages created or assigned leads, logs call/meeting notes, updates lead statuses, and schedules/completes follow-ups.

### Security Invariants & Guardrails
- **Authoritative Boundary**: The database via PostgreSQL Row-Level Security (RLS) is the sole security boundary. Frontend UI route guards are for UX convenience only.
- **Role Escalation Protection**: User roles cannot be modified via client-side UI requests or profile edits. The PostgreSQL trigger `trg_prevent_role_escalation` strictly prevents non-admins from altering roles.
- **Secret Hygiene**: Client bundle contains only public `VITE_` variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Service-role keys and database passwords must **never** enter the codebase or `.env`.
- **Truthful Data**: Never disguise hardcoded values as live analytics. Dashboards must reflect permitted, real database records.

---

## 2. Immutable Iterative Delivery Protocol (6-Step Cycle)

Every feature phase strictly adheres to this 6-step cycle:

```
┌─────────────┐     ┌──────────────┐     ┌────────────┐     ┌────────────┐     ┌─────────────┐     ┌────────────────┐
│ 1. DEVELOP  │ ──> │ 2. LOCAL TEST│ ──> │ 3. VERIFY  │ ──> │ 4. DEPLOY  │ ──> │ 5. LIVE TEST│ ──> │ 6. USER GATE   │
└─────────────┘     └──────────────┘     └────────────┘     └────────────┘     └─────────────┘     └────────────────┘
```

1. **Develop**: Author typed interfaces, components, hooks, and decoupled service functions for that specific feature alone.
2. **Local Test**: Execute static analysis & build checks:
   - `npm run typecheck` (`tsc --noEmit`)
   - `npm run lint` (`oxlint`)
   - `npm run build` (`vite build`)
   - *Requirement: 0 errors and 0 warnings.*
3. **Verify**: Ensure the feature satisfies all defined acceptance criteria in the local environment.
4. **Deploy**: Stage files (`git add`), create a conventional commit, and push to GitHub remote `origin/main` to trigger automated Vercel CI/CD build.
5. **Live Test**: Verify build logs and test functionality on the live production Vercel URL.
6. **User Approval Gate**: Present results to the user and wait for explicit confirmation before proceeding to the next feature.

---

## 3. Relational Database Schema & Data Model

The schema is defined in `supabase/complete_setup.sql`:

### `profiles`
Extends Supabase `auth.users` with institute CRM roles.
- `id`: UUID (PK, references `auth.users(id)` ON DELETE CASCADE)
- `full_name`: TEXT NOT NULL
- `role`: TEXT NOT NULL DEFAULT `'counsellor'` CHECK (`role IN ('admin', 'manager', 'counsellor')`)
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT now()

### `leads`
Core prospective student enquiry records.
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
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT now()

### `follow_ups`
Scheduled counselor touchpoints and tasks.
- `id`: UUID (PK, DEFAULT `gen_random_uuid()`)
- `lead_id`: UUID NOT NULL (references `leads(id)` ON DELETE CASCADE)
- `assigned_to`: UUID NOT NULL (references `profiles(id)` ON DELETE CASCADE)
- `due_at`: TIMESTAMPTZ NOT NULL
- `note`: TEXT NOT NULL
- `status`: TEXT NOT NULL DEFAULT `'pending'` CHECK (`status IN ('pending', 'completed', 'cancelled')`)
- `completed_at`: TIMESTAMPTZ NULLABLE
- `created_by`: UUID NOT NULL (references `profiles(id)` ON DELETE RESTRICT)
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT now()

### `activities`
Immutable audit trail for every lead event.
- `id`: UUID (PK, DEFAULT `gen_random_uuid()`)
- `lead_id`: UUID NOT NULL (references `leads(id)` ON DELETE CASCADE)
- `actor_id`: UUID NOT NULL (references `profiles(id)` ON DELETE RESTRICT)
- `activity_type`: TEXT NOT NULL CHECK (`activity_type IN ('lead_created', 'status_changed', 'note_added', 'follow_up_created', 'follow_up_completed', 'assigned')`)
- `description`: TEXT NOT NULL
- `metadata`: JSONB NOT NULL DEFAULT `'{}'::jsonb`
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT now()

---

## 4. Phase-by-Phase Roadmap & Status Tracker

| Phase | Feature Focus | Status | Git Milestone |
| :---: | :--- | :---: | :--- |
| **Phase 1** | **Foundation & Application Shell** | ✅ **COMPLETED** | `9eed2e1` (`feat(phase-1): migrate to TypeScript, configure routing, and build responsive navigation shell`) |
| **Phase 2** | **Supabase Client & Runtime Validation** | ✅ **COMPLETED** | `4f25a1f` (`feat(phase-2): configure supabase client, environment validation, and interactive setup guide`) |
| **Phase 3** | **Database Schema, Migrations & RLS Policies** | ✅ **COMPLETED** | `3ddea0a` (`feat(phase-3): add postgresql schema migrations, triggers, and rls policies`) |
| **Polish** | **UI Transitions & Lead Modal Preview Shell** | ✅ **COMPLETED** | `781f87c` (`feat(ui): add student registration modal and enhance smooth page transitions`) |
| **Phase 4** | **Supabase Environment & Live Connection Verification** | 🟡 **IN PROGRESS** | Pending `VITE_SUPABASE_ANON_KEY` from user |
| **Phase 5** | **User Authentication & Session Persistence** | ⚪ PENDING | - |
| **Phase 6** | **User Profile & Role Lifecycle Synchronization** | ⚪ PENDING | - |
| **Phase 7** | **Lead Creation Modal & Live Persistence** | ⚪ PENDING | - |
| **Phase 8** | **Lead Pipeline Table & Live Data Fetching** | ⚪ PENDING | - |
| **Phase 9** | **Debounced Search & Multi-Criteria Filtering** | ⚪ PENDING | - |
| **Phase 10** | **Lead Detail View & Information Editing** | ⚪ PENDING | - |
| **Phase 11** | **Status Transitions & Mandatory Lost Reason Rule** | ⚪ PENDING | - |
| **Phase 12** | **Counselor Lead Assignment (Manager Action)** | ⚪ PENDING | - |
| **Phase 13** | **Follow-up Scheduling Engine** | ⚪ PENDING | - |
| **Phase 14** | **Follow-up Triage & Overdue Detection Engine** | ⚪ PENDING | - |
| **Phase 15** | **One-Click Follow-up Completion Workflow** | ⚪ PENDING | - |
| **Phase 16** | **Activity Audit Timeline on Lead Detail** | ⚪ PENDING | - |
| **Phase 17** | **Dashboard Role-Scoped KPI Analytics** | ⚪ PENDING | - |
| **Phase 18** | **Dashboard Pipeline Charts & Conversion Reports** | ⚪ PENDING | - |
| **Phase 19** | **Error Boundary, Accessibility & Mobile Polish** | ⚪ PENDING | - |
| **Phase 20** | **Production Hardening, Verification & Student Handover** | ⚪ PENDING | - |

---

## 5. Detailed Feature Specifications & Acceptance Criteria

### Phase 4: Supabase Environment & Live Connection Verification
- **Scope**: Configure `.env` with live project credentials (`VITE_SUPABASE_URL=https://vceemaihcgswpzasakid.supabase.co` and `VITE_SUPABASE_ANON_KEY`), verify SQL execution in Supabase SQL Editor, test live connection health ping.
- **Acceptance Criteria**: `checkSupabaseHealth()` succeeds; Navbar shows green "Supabase Live" status pill.

### Phase 5: User Authentication & Session Persistence
- **Scope**: Implement `authService.ts` wrapping Supabase Auth API (`signInWithPassword`, `signUp`, `signOut`, `getSession`), create React `AuthContext` and `useAuth` hook, wire `LoginPage.tsx`, implement session persistence across reloads, add Navbar logout button.
- **Acceptance Criteria**: Users can register and sign in with email/password; invalid credentials show clear alerts; session survives browser refresh; sign out redirects to `/login`.

### Phase 6: User Profile & Role Lifecycle Synchronization
- **Scope**: Fetch user's profile from `public.profiles` on login, detect active role (`counsellor`, `manager`, `admin`), render user full name and role badge in Navbar and Settings, handle missing profile edge case cleanly.
- **Acceptance Criteria**: Navbar reflects logged-in user name and role badge with distinct colors; non-admins cannot change roles.

### Phase 7: Lead Creation Modal & Live Persistence
- **Scope**: Implement `leadsService.createLead()`, wire `NewLeadModal.tsx` to insert records into `public.leads`, set `created_by = auth.uid()`, validate student name and phone, trim whitespace, automatically insert `lead_created` entry in `activities`.
- **Acceptance Criteria**: Submitting modal creates a real row in `leads` table and logs initial activity; form validation prevents duplicate/empty submissions.

### Phase 8: Lead Pipeline Table & Live Data Fetching
- **Scope**: Replace static preview records in `LeadsPage.tsx` with live query from `leadsService.getLeads()`, join counselor name from `profiles`, render table with loading skeleton and informative empty state.
- **Acceptance Criteria**: Leads page displays real database records; counselors see their permitted leads; managers see all team leads; empty state renders if no leads exist.

### Phase 9: Debounced Search & Multi-Criteria Filtering
- **Scope**: Create `useDebounce` hook, implement instant text search (matching student name, phone, email), build combined filter bar (Status, Source, Assignee) with active badges and one-click "Reset Filters".
- **Acceptance Criteria**: Debounced search responds smoothly; combining filters accurately constrains records; reset restores complete list.

### Phase 10: Lead Detail View & Information Editing
- **Scope**: Fetch lead by `:id` parameter in `LeadDetailPage.tsx`, render complete student profile card, contact info, course interest, acquisition source, initial notes, and allow editing details with validation.
- **Acceptance Criteria**: Loading `/leads/:id` retrieves real record; saving edits updates Supabase immediately; invalid lead ID displays friendly 404 card.

### Phase 11: Status Transitions & Mandatory Lost Reason Rule
- **Scope**: Add status change dropdown (`New` ➔ `Contacted` ➔ `Qualified` ➔ `Converted` ➔ `Lost`), enforce mandatory reason modal when marking `Lost`, save `status` and `lost_reason`, log `status_changed` activity.
- **Acceptance Criteria**: Status changes persist; marking `Lost` without a reason is blocked; activity log captures old and new status.

### Phase 12: Counselor Lead Assignment (Manager Action)
- **Scope**: Counselor assignment modal/dropdown on Lead Detail and Leads list, populate dropdown from `profiles`, role-gate action to Managers and Admins only, log `assigned` activity.
- **Acceptance Criteria**: Managers/Admins can reassign leads; counselors see read-only assigned staff; RLS blocks unauthorized assignment attempts.

### Phase 13: Follow-up Scheduling Engine
- **Scope**: Implement `followUpsService.createFollowUp()`, build schedule modal collecting Lead ID, Due Date/Time (`timestamptz`), Assignee, and Note, insert into `follow_ups`, log `follow_up_created` activity.
- **Acceptance Criteria**: Follow-up record created in Supabase; displays in lead's Next Follow-up card; dates formatted in user's local timezone.

### Phase 14: Follow-up Triage & Overdue Detection Engine
- **Scope**: Connect `FollowUpsPage.tsx` with live queries, implement 4 triage tabs:
  - Overdue: `status = 'pending' AND due_at < now()`
  - Today: `status = 'pending'` due today
  - Upcoming: `status = 'pending'` due in future
  - Completed: `status = 'completed'`
- **Acceptance Criteria**: Overdue items flagged with red warning badge; tab counts match real database records; student link navigates to `/leads/:id`.

### Phase 15: One-Click Follow-up Completion Workflow
- **Scope**: "Mark Completed" button on Follow-ups page and Lead Detail, update `follow_ups` with `status = 'completed'` and `completed_at = now()`, log `follow_up_completed` activity.
- **Acceptance Criteria**: Completed items immediately drop out of Overdue and Today tabs; overdue flag never appears for completed items.

### Phase 16: Activity Audit Timeline on Lead Detail
- **Scope**: Fetch `activities` where `lead_id = :id` ordered by `created_at DESC`, render interactive timeline with visual icons per activity type, add counselor note form.
- **Acceptance Criteria**: Chronological audit trail displayed; adding manual note updates timeline immediately.

### Phase 17: Dashboard Role-Scoped KPI Analytics
- **Scope**: Implement `dashboardService.ts` calculating aggregate metrics from accessible data:
  - Total Accessible Leads
  - New Enquiries (`status = 'New'`)
  - Converted Admissions (`status = 'Converted'`)
  - Overdue Follow-ups (`status = 'pending' AND due_at < now()`)
  - Conversion Rate %: `(Converted / Total) * 100` (safe from division by zero)
- **Acceptance Criteria**: Dashboard KPIs reconcile 100% with counts in Leads and Follow-ups tables; counselors see their data; managers see academy totals.

### Phase 18: Dashboard Pipeline Charts & Conversion Reports
- **Scope**: Visual pipeline breakdown by Status and acquisition breakdown by Source in `DashboardPage.tsx` and `ReportsPage.tsx`, date range filter shell, clean empty state illustrations.
- **Acceptance Criteria**: Source and status counts reconcile with database numbers; empty states handle zero-data scenarios gracefully.

### Phase 19: Error Boundary, Accessibility & Mobile Polish
- **Scope**: Implement React `ErrorBoundary`, network retry banner, keyboard navigation (Tab/Esc/Enter), WCAG compliant high-contrast badges, mobile layout verification down to 360px viewport.
- **Acceptance Criteria**: Uncaught errors caught by error boundary; modals keyboard accessible; mobile drawer navigation smooth and responsive.

### Phase 20: Production Hardening, Verification & Student Handover
- **Scope**: Run full verification suite (`typecheck`, `lint`, `build`), author comprehensive `README.md` (architecture, setup instructions, RLS rules, troubleshooting, production limitations), execute final live smoke test on Vercel.
- **Acceptance Criteria**: Zero lint or TypeScript errors; live Vercel application passes complete admission lifecycle.

---

## 6. Development & Quality Commands

```bash
# Start local development server
npm run dev

# Run TypeScript typecheck (strict no-emit)
npm run typecheck

# Run Oxlint code linter
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
