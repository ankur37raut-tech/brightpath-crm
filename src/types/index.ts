export type UserRole = 'admin' | 'manager' | 'counsellor';

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';

export type LeadSource =
  | 'Website'
  | 'Phone'
  | 'Walk-in'
  | 'Referral'
  | 'Social Media'
  | 'Other';

export interface Lead {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  course_interest: string;
  source: LeadSource;
  status: LeadStatus;
  lost_reason?: string | null;
  assigned_to: string | null;
  created_by: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  assignee?: UserProfile | null;
  creator?: UserProfile | null;
}

export type FollowUpStatus = 'pending' | 'completed' | 'cancelled';

export interface FollowUp {
  id: string;
  lead_id: string;
  assigned_to: string;
  due_at: string;
  note: string;
  status: FollowUpStatus;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  // Joined fields
  lead?: {
    id: string;
    full_name: string;
    course_interest: string;
    phone: string;
  };
  assignee?: UserProfile | null;
}

export type ActivityType =
  | 'lead_created'
  | 'status_changed'
  | 'note_added'
  | 'follow_up_created'
  | 'follow_up_completed'
  | 'assigned';

export interface Activity {
  id: string;
  lead_id: string;
  actor_id: string;
  activity_type: ActivityType;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  actor?: UserProfile | null;
}
