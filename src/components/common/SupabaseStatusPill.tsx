import React, { useState, useEffect } from 'react';
import { Database, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, checkSupabaseHealth } from '../../lib/supabaseClient';
import { SetupGuideModal } from './SetupGuideModal';

export const SupabaseStatusPill: React.FC = () => {
  const configured = isSupabaseConfigured();
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [latency, setLatency] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (configured) {
      checkSupabaseHealth().then((res) => {
        setIsHealthy(res.ok);
        setLatency(res.latencyMs);
      });
    }
  }, [configured]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`status-pill-btn ${configured ? 'configured' : 'unconfigured'}`}
        title={
          configured
            ? `Supabase is connected${latency ? ` (${latency}ms)` : ''}. Click for setup details.`
            : 'Supabase credentials missing. Click to open setup guide.'
        }
        aria-label="Database connection status"
      >
        <span
          className={`status-dot ${configured ? 'active' : 'pending'}`}
          aria-hidden="true"
        />
        <Database size={14} className="status-icon" />
        <span className="status-text">
          {configured
            ? isHealthy === false
              ? 'Database Offline'
              : 'Supabase Live'
            : 'Connect Database'}
        </span>
        {!configured && <AlertCircle size={13} className="alert-badge-icon" />}
      </button>

      <SetupGuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
