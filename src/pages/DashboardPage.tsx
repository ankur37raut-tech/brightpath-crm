import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, CalendarClock, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const DashboardPage: React.FC = () => {
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
          <Link to="/leads/new" className="btn btn-primary">
            <UserPlus size={16} />
            <span>New Lead</span>
          </Link>
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

          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Platform Status
            </span>
            <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.25rem' }}>
              Phase 1 layout shell operational. Ready for Supabase connection (Phase 2 & 3).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
