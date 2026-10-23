import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, BookOpen, Calendar, Clock, History, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const LeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          to="/leads"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Leads Pipeline</span>
        </Link>
      </div>

      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="page-title">Priya Sharma</h1>
            <StatusBadge status="New" />
          </div>
          <p className="page-subtitle">Lead ID: {id || 'demo-lead-1'} • Created via Website form</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary">Schedule Follow-up</button>
          <button className="btn btn-primary">Update Status</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Student Details Card */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            Student Information
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BookOpen size={18} color="#64748B" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Course</div>
                <div style={{ fontWeight: 600 }}>Full Stack Web Development</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={18} color="#64748B" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contact Number</div>
                <div style={{ fontWeight: 600 }}>+91 98765 43210</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={18} color="#64748B" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</div>
                <div style={{ fontWeight: 600 }}>priya.s@example.com</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} color="#64748B" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned Counsellor</div>
                <div style={{ fontWeight: 600 }}>Amit Verma (Counsellor)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-up & Activity Section Shell */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Clock size={18} color="#2563EB" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Next Scheduled Follow-up</h2>
          </div>

          <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Demo Session Call</span>
              <StatusBadge status="Pending" size="sm" />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Due: Tomorrow at 11:00 AM • "Discuss syllabus & batch timings"
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <button className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span>Mark Completed</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <History size={18} color="#64748B" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Recent Activity</h3>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', borderLeft: '2px solid #E2E8F0', paddingLeft: '1rem', margin: '0.5rem 0 0 0.5rem' }}>
              <div>Lead registered into system</div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Today at 10:30 AM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
