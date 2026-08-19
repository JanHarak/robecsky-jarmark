/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../lib/supabase';
import type { Product, ProductAvailability } from '../types/product';

const PRODUCT_SELECT = `
  *,
  category:categories (
    id,
    name,
    slug
  ),
  product_images (
    id,
    storage_path,
    alt_text,
    sort_order,
    is_cover
  )
`;

/** All active products with their category and images. */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

/** Single active product by slug. Throws if not found (PostgREST .single()). */
export async function getProductBySlug(slug: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data as unknown as Product;
}

/**
 * Availability comes from the `get_product_availability` RPC, never from a
 * direct read of the `inventory` table (which is not exposed to the public).
 */
export async function getProductAvailability(
  productId: string,
): Promise<ProductAvailability> {
  const { data, error } = await supabase.rpc('get_product_availability', {
    p_product_id: productId,
  });

  if (error) throw error;
  return data as ProductAvailability;
}
