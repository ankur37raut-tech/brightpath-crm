import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const FollowUpsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overdue' | 'today' | 'upcoming' | 'completed'>('today');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Follow-ups & Task Reminders</h1>
          <p className="page-subtitle">
            Keep track of student touchpoints, scheduled calls, and follow-up deadlines.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`btn ${activeTab === 'overdue' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}
        >
          <AlertCircle size={16} />
          <span>Overdue (0)</span>
        </button>
        <button
          onClick={() => setActiveTab('today')}
          className={`btn ${activeTab === 'today' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}
        >
          <Clock size={16} />
          <span>Due Today (1)</span>
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`btn ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}
        >
          <CalendarClock size={16} />
          <span>Upcoming (0)</span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`btn ${activeTab === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}
        >
          <CheckCircle2 size={16} />
          <span>Completed</span>
        </button>
      </div>

      {/* Content for Active Tab */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Course</th>
              <th>Due Date & Time</th>
              <th>Follow-up Note</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>
                <Link to="/leads/demo-lead-1" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                  Priya Sharma
                </Link>
              </td>
              <td>Full Stack Web Development</td>
              <td>Today, 04:00 PM</td>
              <td style={{ maxWidth: '280px', color: 'var(--text-secondary)' }}>
                Discuss syllabus, fee installments, and course start date.
              </td>
              <td>
                <StatusBadge status="Pending" size="sm" />
              </td>
              <td>Amit Verma</td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span>Mark Done</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748B', textAlign: 'right' }}>
        * Dynamic filtering and overdue date logic activates in Phase 7.
      </div>
    </div>
  );
};
