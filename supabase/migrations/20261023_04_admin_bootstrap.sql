-- ==============================================================================
-- BrightPath CRM — Migration 04: Administrator Bootstrap Procedure
-- ==============================================================================
--
-- INSTRUCTIONS FOR PROJECT OWNER:
-- 1. Sign up for an account via your BrightPath CRM application or the Supabase Auth dashboard.
-- 2. By default, your account will be granted the least-privileged 'counsellor' role.
-- 3. To promote your account to 'admin', replace 'YOUR_EMAIL_HERE' below with your actual email
--    and execute this query in the Supabase SQL Editor:

/*
UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL_HERE'
);
*/

-- Verification Query (Run to confirm your elevated role):
/*
SELECT u.email, p.full_name, p.role, p.created_at
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'YOUR_EMAIL_HERE';
*/
