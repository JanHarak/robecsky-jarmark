/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Load the current user's profile (id, display_name, role).
 * NOTE: the returned role is for UX only. Real authorization is enforced by
 * RLS in the database, so a tampered frontend still cannot perform admin ops.
 */
export async function getMyProfile(): Promise<Profile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('id,display_name,role')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data as Profile;
}
