/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import { getMyProfile, signIn, signOut } from '../services/auth';
import type { Profile } from '../types/database';

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Prime state from any persisted session, then load its profile.
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (!data.session) setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Whenever the session changes, refresh the linked profile (role).
  useEffect(() => {
    let active = true;

    if (!session) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getMyProfile()
      .then((p) => {
        if (active) setProfile(p);
      })
      .catch((err) => {
        console.error('Nepodařilo se načíst profil uživatele', err);
        if (active) setProfile(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      isAdmin: profile?.role === 'admin',
      loading,
      signIn: async (email, password) => {
        await signIn(email, password);
      },
      signOut: async () => {
        await signOut();
      },
    }),
    [session, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth musí být použit uvnitř <AuthProvider>');
  }
  return ctx;
}
