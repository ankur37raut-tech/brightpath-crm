import React from 'react';
import { BarChart3, PieChart, TrendingUp, Filter } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Performance & Conversion Reports</h1>
          <p className="page-subtitle">
            Analyze admission conversion rates and lead acquisition channel effectiveness.
          </p>
        </div>
        <button className="btn btn-secondary">
          <Filter size={16} />
          <span>Date Range: All Time</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <PieChart size={18} color="#2563EB" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Leads by Acquisition Source</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Breakdown of student enquiries across channels.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { source: 'Website Form', count: 0, pct: '0%' },
              { source: 'Walk-in / Campus Visit', count: 0, pct: '0%' },
              { source: 'Direct Phone Call', count: 0, pct: '0%' },
              { source: 'Referral', count: 0, pct: '0%' },
              { source: 'Social Media', count: 0, pct: '0%' }
            ].map((item) => (
              <div key={item.source} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.source}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {item.count} ({item.pct})
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <TrendingUp size={18} color="#10B981" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Conversion Ratio Metrics</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Overall Institute Enquiry-to-Admission efficiency.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Institute Conversion Rate</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1E293B', marginTop: '0.25rem' }}>
                0.0%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                Calculated as (Converted Leads / Total Accessible Leads) × 100
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.85rem' }}>
              <BarChart3 size={16} />
              <span>Full automated reporting dashboard connects in Phase 9.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
