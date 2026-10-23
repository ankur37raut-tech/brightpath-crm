import React from 'react';
import { ShieldCheck, UserCheck, Building } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings & Organization</h1>
          <p className="page-subtitle">
            Manage your account preferences, review role permissions, and view coaching institute settings.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* User Account Profile */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <UserCheck size={18} color="#2563EB" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>My User Profile</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Demo Counsellor"
                readOnly
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  background: '#F8FAFC',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Active System Role
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.55rem 0.75rem', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1D4ED8' }}>Counsellor</span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>(Standard Least-Privilege Role)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access Policies Info */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <ShieldCheck size={18} color="#10B981" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Security & RLS Boundary</h2>
          </div>

          <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>
              Role Elevation Safeguard
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
              In accordance with security specifications, user roles are strictly governed by PostgreSQL Row-Level Security triggers. Roles cannot be modified via client-side UI requests.
            </p>
          </div>

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={16} color="#64748B" />
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Institute: BrightPath Academy Coaching
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
