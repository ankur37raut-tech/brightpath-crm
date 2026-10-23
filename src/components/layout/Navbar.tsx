import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          className="mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            BrightPath Institute Portal
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Admissions & Student Pipeline
          </span>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="btn btn-secondary"
          style={{ padding: '0.45rem', borderRadius: '50%' }}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <Link to="/settings" style={{ textDecoration: 'none' }}>
          <div className="user-profile-badge">
            <div className="user-avatar">
              <User size={16} />
            </div>
            <div className="user-meta">
              <span className="user-name">Demo Counsellor</span>
              <span className="user-role-tag">Counsellor</span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
