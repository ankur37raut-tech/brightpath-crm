import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="empty-state" style={{ minHeight: '60vh' }}>
      <AlertTriangle className="empty-state-icon" color="#EF4444" size={56} />
      <h1 className="empty-state-title" style={{ fontSize: '1.5rem' }}>Page Not Found (404)</h1>
      <p className="empty-state-desc">
        The admissions page or lead record you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '0.75rem' }}>
        <Home size={16} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
