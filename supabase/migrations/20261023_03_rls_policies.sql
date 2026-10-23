-- ==============================================================================
-- BrightPath CRM — Migration 03: Row Level Security (RLS) Policies
-- ==============================================================================

-- 1. SECURITY DEFINER HELPER FUNCTION
-- Retrieves calling user's role cleanly without recursive RLS loop
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- 2. ENABLE ROW LEVEL SECURITY ON ALL EXPOSED TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- POLICIES: PROFILES TABLE
-- ==============================================================================
DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
CREATE POLICY "profiles_select_authenticated" ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "profiles_update_self_or_admin" ON public.profiles;
CREATE POLICY "profiles_update_self_or_admin" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.get_user_role() = 'admin')
  WITH CHECK (auth.uid() = id OR public.get_user_role() = 'admin');

-- ==============================================================================
-- POLICIES: LEADS TABLE
-- ==============================================================================
-- Counsellors see only assigned/created leads; Managers & Admins see all
DROP POLICY IF EXISTS "leads_select_policy" ON public.leads;
CREATE POLICY "leads_select_policy" ON public.leads
  FOR SELECT
  TO authenticated
  USING (
    public.get_user_role() IN ('admin', 'manager')
    OR (created_by = auth.uid() OR assigned_to = auth.uid())
  );

-- Users can insert leads where they are recorded as created_by
DROP POLICY IF EXISTS "leads_insert_policy" ON public.leads;
CREATE POLICY "leads_insert_policy" ON public.leads
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- Users can update leads they created or are assigned to; Managers/Admins can update any
DROP POLICY IF EXISTS "leads_update_policy" ON public.leads;
CREATE POLICY "leads_update_policy" ON public.leads
  FOR UPDATE
  TO authenticated
  USING (
    public.get_user_role() IN ('admin', 'manager')
    OR (created_by = auth.uid() OR assigned_to = auth.uid())
  )
  WITH CHECK (
    public.get_user_role() IN ('admin', 'manager')
    OR (created_by = auth.uid() OR assigned_to = auth.uid())
  );

-- Only administrators can hard-delete leads
DROP POLICY IF EXISTS "leads_delete_policy" ON public.leads;
CREATE POLICY "leads_delete_policy" ON public.leads
  FOR DELETE
  TO authenticated
  USING (public.get_user_role() = 'admin');

-- ==============================================================================
-- POLICIES: FOLLOW_UPS TABLE
-- ==============================================================================
DROP POLICY IF EXISTS "follow_ups_select_policy" ON public.follow_ups;
CREATE POLICY "follow_ups_select_policy" ON public.follow_ups
  FOR SELECT
  TO authenticated
  USING (
    public.get_user_role() IN ('admin', 'manager')
    OR assigned_to = auth.uid()
    OR created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.leads l
      WHERE l.id = follow_ups.lead_id
      AND (l.created_by = auth.uid() OR l.assigned_to = auth.uid())
    )
  );

DROP POLICY IF EXISTS "follow_ups_insert_policy" ON public.follow_ups;
CREATE POLICY "follow_ups_insert_policy" ON public.follow_ups
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

DROP POLICY IF EXISTS "follow_ups_update_policy" ON public.follow_ups;
CREATE POLICY "follow_ups_update_policy" ON public.follow_ups
  FOR UPDATE
  TO authenticated
  USING (
    public.get_user_role() IN ('admin', 'manager')
    OR assigned_to = auth.uid()
    OR created_by = auth.uid()
  )
  WITH CHECK (
    public.get_user_role() IN ('admin', 'manager')
    OR assigned_to = auth.uid()
    OR created_by = auth.uid()
  );

DROP POLICY IF EXISTS "follow_ups_delete_policy" ON public.follow_ups;
CREATE POLICY "follow_ups_delete_policy" ON public.follow_ups
  FOR DELETE
  TO authenticated
  USING (
    public.get_user_role() IN ('admin', 'manager')
    OR created_by = auth.uid()
  );

-- ==============================================================================
-- POLICIES: ACTIVITIES TABLE (Audit Trail)
-- ==============================================================================
DROP POLICY IF EXISTS "activities_select_policy" ON public.activities;
CREATE POLICY "activities_select_policy" ON public.activities
  FOR SELECT
  TO authenticated
  USING (
    public.get_user_role() IN ('admin', 'manager')
    OR EXISTS (
      SELECT 1 FROM public.leads l
      WHERE l.id = activities.lead_id
      AND (l.created_by = auth.uid() OR l.assigned_to = auth.uid())
    )
  );

DROP POLICY IF EXISTS "activities_insert_policy" ON public.activities;
CREATE POLICY "activities_insert_policy" ON public.activities
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND actor_id = auth.uid()
  );
