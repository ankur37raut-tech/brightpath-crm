import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables bundled by Vite
const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const supabaseUrl = rawUrl?.trim() ?? '';
const supabaseAnonKey = rawAnonKey?.trim() ?? '';

/**
 * Validates that the Supabase credentials are present, validly formatted,
 * and not unedited placeholder tokens.
 */
export function validateSupabaseConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!supabaseUrl) {
    errors.push('VITE_SUPABASE_URL is missing.');
  } else if (!supabaseUrl.startsWith('https://')) {
    errors.push('VITE_SUPABASE_URL must begin with "https://".');
  } else if (supabaseUrl.includes('your-project-ref') || supabaseUrl.includes('your-project-id')) {
    errors.push('VITE_SUPABASE_URL is currently using an unedited placeholder.');
  }

  if (!supabaseAnonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY is missing.');
  } else if (supabaseAnonKey.includes('your-anon-token') || supabaseAnonKey.length < 20) {
    errors.push('VITE_SUPABASE_ANON_KEY is missing or an invalid placeholder token.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export const isConfigured = validateSupabaseConfig().isValid;

/**
 * Helper to check whether Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return validateSupabaseConfig().isValid;
}

/**
 * Returns configuration validation errors
 */
export function getSupabaseConfigErrors(): string[] {
  return validateSupabaseConfig().errors;
}

// Fallback dummy URL & key to avoid crash on createClient if unconfigured
const clientUrl = isConfigured ? supabaseUrl : 'https://unconfigured.supabase.co';
const clientKey = isConfigured ? supabaseAnonKey : 'unconfigured-anon-key-placeholder';

/**
 * Global singleton Supabase Client instance
 */
export const supabase: SupabaseClient = createClient(clientUrl, clientKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * Live connection health ping
 */
export async function checkSupabaseHealth(): Promise<{ ok: boolean; message: string; latencyMs?: number }> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: 'Supabase credentials are not configured in environment variables.'
    };
  }

  const startTime = performance.now();
  try {
    // Lightweight read ping against public profiles (or health endpoint)
    const { error } = await supabase.from('profiles').select('id').limit(1);
    const latencyMs = Math.round(performance.now() - startTime);

    if (error && error.code !== 'PGRST116') {
      // If error is permission or network error
      return {
        ok: false,
        message: error.message || 'Database connection error.',
        latencyMs
      };
    }

    return {
      ok: true,
      message: `Database online and responsive (${latencyMs}ms).`,
      latencyMs
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network request failed.';
    return {
      ok: false,
      message: errorMsg
    };
  }
}
