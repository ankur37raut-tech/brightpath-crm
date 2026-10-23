import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, Filter, ArrowUpRight } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const LeadsPage: React.FC = () => {
  // Sample demonstration leads to illustrate layout before Phase 5 real data binding
  const sampleLeads = [
    {
      id: 'demo-lead-1',
      full_name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.s@example.com',
      course_interest: 'Full Stack Web Development',
      source: 'Website',
      status: 'New',
      assigned_to_name: 'Amit Verma (Counsellor)',
      created_at: 'Today, 10:30 AM'
    },
    {
      id: 'demo-lead-2',
      full_name: 'Rohan Deshmukh',
      phone: '+91 98220 11223',
      email: 'rohan.d@example.com',
      course_interest: 'Data Science Bootcamp',
      source: 'Walk-in',
      status: 'Qualified',
      assigned_to_name: 'Amit Verma (Counsellor)',
      created_at: 'Yesterday'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Leads Directory</h1>
          <p className="page-subtitle">
            Manage incoming inquiries, assign counselors, and track lead qualification.
          </p>
        </div>
        <Link to="/leads/new" className="btn btn-primary">
          <UserPlus size={16} />
          <span>New Lead</span>
        </Link>
      </div>

      {/* Filter and Search Bar Shell */}
      <div
        className="card"
        style={{
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1', minWidth: '240px' }}>
          <Search size={18} color="#64748B" />
          <input
            type="text"
            placeholder="Search leads by name, phone, email, or course..."
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              background: 'transparent'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn btn-secondary" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}>
            <Filter size={14} />
            <span>Filter Status</span>
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}>
            <span>Source</span>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course Interest</th>
              <th>Contact Info</th>
              <th>Source</th>
              <th>Status</th>
              <th>Assigned Counsellor</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleLeads.map((lead) => (
              <tr key={lead.id}>
                <td style={{ fontWeight: 600 }}>
                  <Link
                    to={`/leads/${lead.id}`}
                    style={{ color: 'var(--primary)', textDecoration: 'none' }}
                  >
                    {lead.full_name}
                  </Link>
                </td>
                <td>{lead.course_interest}</td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{lead.phone}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                </td>
                <td>
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{lead.source}</span>
                </td>
                <td>
                  <StatusBadge status={lead.status} size="sm" />
                </td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {lead.assigned_to_name}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    to={`/leads/${lead.id}`}
                    className="btn btn-secondary"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                  >
                    <span>View</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Demo Notice */}
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748B', textAlign: 'right' }}>
        * Displaying preview records. Phase 5 will bind live Supabase queries & filters.
      </div>
    </div>
  );
};
