import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, CalendarClock, CheckCircle, ArrowRight, TrendingUp, Database, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { NewLeadModal } from '../components/leads/NewLeadModal';

export const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Admissions & Pipeline Dashboard</h1>
          <p className="page-subtitle">
            Real-time tracking of coaching enquiries, counselor follow-ups, and conversion velocity.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <UserPlus size={16} />
            <span>New Lead</span>
          </button>
          <Link to="/followups" className="btn btn-secondary">
            <CalendarClock size={16} />
            <span>Follow-ups</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-kpi">
        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Total Leads</span>
            <Users size={20} color="#2563EB" />
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-subtext">Active student enquiries</div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">New Enquiries</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-subtext">Awaiting counselor contact</div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Admissions Converted</span>
            <CheckCircle size={20} color="#10B981" />
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-subtext">Successful admissions</div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Overdue Follow-ups</span>
            <CalendarClock size={20} color="#EF4444" />
          </div>
          <div className="kpi-value" style={{ color: '#EF4444' }}>0</div>
          <div className="kpi-subtext">Require urgent attention</div>
        </div>
      </div>

      {/* Dashboard Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Conversion & Pipeline Overview */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Pipeline Conversion Status</h2>
            <TrendingUp size={18} color="#64748b" />
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Conversion breakdown across lead stages. Connect Supabase to populate live data.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] as const).map((st) => (
              <div key={st} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StatusBadge status={st} size="sm" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>0 leads</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action & System Status */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quick Actions</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Jump straight into managing inquiries and scheduled calls.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/leads" className="btn btn-secondary" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} /> Open Leads Directory
                </span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/followups" className="btn btn-secondary" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarClock size={16} /> Review Due Follow-ups
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '0.85rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Backend Pipeline
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: isSupabaseConfigured() ? '#059669' : '#D97706' }}>
                {isSupabaseConfigured() ? <Database size={13} /> : <AlertCircle size={13} />}
                {isSupabaseConfigured() ? 'Supabase Connected' : 'Setup Required'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.35rem', lineHeight: 1.4 }}>
              {isSupabaseConfigured()
                ? 'Live Supabase connection initialized. Ready for Phase 4 user authentication.'
                : 'Click "Connect Database" in the top navbar to view the setup guide and add your credentials.'}
            </p>
          </div>
        </div>
      </div>

      <NewLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
