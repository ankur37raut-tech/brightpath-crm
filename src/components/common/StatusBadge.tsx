import React from 'react';
import type { LeadStatus, FollowUpStatus } from '../../types';

interface StatusBadgeProps {
  status: LeadStatus | FollowUpStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = (val: string) => {
    switch (val.toLowerCase()) {
      case 'new':
        return {
          bg: '#EFF6FF',
          color: '#1D4ED8',
          border: '#BFDBFE',
          dot: '#3B82F6',
          label: 'New'
        };
      case 'contacted':
        return {
          bg: '#FFFBEB',
          color: '#B45309',
          border: '#FDE68A',
          dot: '#F59E0B',
          label: 'Contacted'
        };
      case 'qualified':
        return {
          bg: '#F5F3FF',
          color: '#6D28D9',
          border: '#DDD6FE',
          dot: '#8B5CF6',
          label: 'Qualified'
        };
      case 'converted':
        return {
          bg: '#ECFDF5',
          color: '#047857',
          border: '#A7F3D0',
          dot: '#10B981',
          label: 'Converted'
        };
      case 'lost':
        return {
          bg: '#FEF2F2',
          color: '#B91C1C',
          border: '#FECACA',
          dot: '#EF4444',
          label: 'Lost'
        };
      case 'pending':
        return {
          bg: '#FFF7ED',
          color: '#C2410C',
          border: '#FFEDD5',
          dot: '#F97316',
          label: 'Pending'
        };
      case 'completed':
        return {
          bg: '#ECFDF5',
          color: '#047857',
          border: '#A7F3D0',
          dot: '#10B981',
          label: 'Completed'
        };
      case 'cancelled':
        return {
          bg: '#F1F5F9',
          color: '#475569',
          border: '#CBD5E1',
          dot: '#94A3B8',
          label: 'Cancelled'
        };
      default:
        return {
          bg: '#F8FAFC',
          color: '#334155',
          border: '#E2E8F0',
          dot: '#94A3B8',
          label: status
        };
    }
  };

  const style = getStyles(status);
  const padding = size === 'sm' ? '2px 8px' : '4px 10px';
  const fontSize = size === 'sm' ? '0.75rem' : '0.8125rem';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding,
        fontSize,
        fontWeight: 600,
        borderRadius: '9999px',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
        lineHeight: 1.2
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: style.dot
        }}
        aria-hidden="true"
      />
      {style.label}
    </span>
  );
};
