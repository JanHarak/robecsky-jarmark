/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../lib/supabase';

export const PUBLIC_BUCKET = 'farm-public';

/** Resolve a storage path (e.g. 'products/domaci-vejce/01.jpg') to a public URL. */
export function getPublicImageUrl(path: string): string {
  const { data } = supabase.storage.from(PUBLIC_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
