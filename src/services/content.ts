/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../lib/supabase';
import type { Page, Post, Setting } from '../types/database';

/** Published news posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data as Post;
}

/** A published static content page (e.g. 'o-hospodarstvi', 'nase-slepice'). */
export async function getPageBySlug(slug: string): Promise<Page> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data as Page;
}

/** Public settings flattened into a key/value map. */
export async function getPublicSettings(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase
    .from('settings')
    .select('key,value')
    .eq('is_public', true);

  if (error) throw error;
  return Object.fromEntries(
    ((data ?? []) as Pick<Setting, 'key' | 'value'>[]).map((item) => [
      item.key,
      item.value,
    ]),
  );
}
