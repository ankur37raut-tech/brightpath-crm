import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Terminal, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseConfigErrors } from '../../lib/supabaseClient';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'env' | 'vercel'>('quickstart');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const envTemplate = `# BrightPath CRM — Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const handleCopy = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const configured = isSupabaseConfigured();
  const errors = getSupabaseConfigErrors();

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: configured ? '#ECFDF5' : '#FEF3C7',
                color: configured ? '#059669' : '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {configured ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {configured ? 'Database Connected' : 'Connect Your Supabase Project'}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {configured
                  ? 'Your public Supabase API client is active and verified.'
                  : 'Follow the 3-step guide below to link your database.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close setup modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Connection Status Alert */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          {configured ? (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div className="status-dot-active" />
              <span style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600 }}>
                Status: Connected to Supabase backend.
              </span>
            </div>
          ) : (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} color="#B45309" />
                <span style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: 600 }}>
                  Environment Variables Pending
                </span>
              </div>
              <ul style={{ margin: '4px 0 0 1.5rem', fontSize: '0.8rem', color: '#92400E' }}>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            padding: '0 1.5rem',
            background: '#F8FAFC'
          }}
        >
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`tab-btn ${activeTab === 'quickstart' ? 'active' : ''}`}
          >
            1. Supabase Setup
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`tab-btn ${activeTab === 'env' ? 'active' : ''}`}
          >
            2. Local .env Setup
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`tab-btn ${activeTab === 'vercel' ? 'active' : ''}`}
          >
            3. Vercel Deployment
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '1.5rem', maxHeight: '55vh', overflowY: 'auto' }}>
          {activeTab === 'quickstart' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Create a free Supabase project to power BrightPath CRM's real-time PostgreSQL database and authentication.
              </p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  Go to{' '}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    supabase.com/dashboard <ExternalLink size={12} style={{ display: 'inline' }} />
                  </a>{' '}
                  and click <strong>New Project</strong>.
                </li>
                <li>
                  Name your project <code>brightpath-crm</code> and pick your nearest region.
                </li>
                <li>
                  Navigate to <strong>Project Settings</strong> (gear icon) ➔ <strong>API</strong>.
                </li>
                <li>
                  Copy your <strong>Project URL</strong> and <strong>Project API Key (anon / public)</strong>.
                </li>
                <li>
                  In Supabase left sidebar, open <strong>SQL Editor</strong> and run <code>supabase/complete_setup.sql</code> (from Phase 3) to build all tables!
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'env' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Create a file named <code>.env</code> in your project root and add your two public client variables:
              </p>

              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Terminal size={14} /> .env
                  </span>
                  <button onClick={handleCopy} className="btn-copy">
                    {copied ? (
                      <>
                        <Check size={14} color="#10B981" />
                        <span style={{ color: '#10B981' }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Template</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="code-block">{envTemplate}</pre>
              </div>

              <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ℹ After saving <code>.env</code>, restart your Vite development server (<code>npm run dev</code>) to load the new environment variables.
              </div>
            </div>
          )}

          {activeTab === 'vercel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                To connect your live production website on Vercel:
              </p>

              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  Go to your <strong>Vercel Dashboard</strong> ➔ Select <code>brightpath-crm</code>.
                </li>
                <li>
                  Click <strong>Settings</strong> ➔ <strong>Environment Variables</strong>.
                </li>
                <li>
                  Add both variables:
                  <ul style={{ marginTop: '0.35rem', listStyleType: 'disc', paddingLeft: '1.25rem' }}>
                    <li><code>VITE_SUPABASE_URL</code></li>
                    <li><code>VITE_SUPABASE_ANON_KEY</code></li>
                  </ul>
                </li>
                <li>
                  Apply them to <strong>Production</strong>, <strong>Preview</strong>, and <strong>Development</strong>.
                </li>
                <li>
                  Redeploy the latest commit or push a new commit to trigger a live build.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Phase 2: Client singleton & environment validation
          </span>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.45rem 1rem' }}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
