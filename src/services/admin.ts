/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../lib/supabase';
import { PUBLIC_BUCKET } from './storage';
import type { InventoryRow } from '../types/database';
import type { Product, ProductImage } from '../types/product';

/** Full inventory with product info. RLS restricts this to admins. */
export async function getInventory(): Promise<InventoryRow[]> {
  const { data, error } = await supabase.from('inventory').select(`
      *,
      product:products (
        id,
        name,
        slug,
        unit
      )
    `);

  if (error) throw error;
  return (data ?? []) as unknown as InventoryRow[];
}

/** Add stock via the `add_stock` RPC (records a movement, admin-only). */
export async function addStock(
  productId: string,
  quantity: number,
  note?: string,
): Promise<unknown> {
  const { data, error } = await supabase.rpc('add_stock', {
    p_product_id: productId,
    p_quantity: quantity,
    p_note: note ?? null,
    p_movement_type: 'manual_adjustment',
  });

  if (error) throw error;
  return data;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  category_id: string | null;
  short_description?: string;
  description?: string;
  price: number;
  unit: string;
  availability_type: string;
}

/** Admins may INSERT products directly; RLS enforces admin-only access. */
export async function createProduct(
  product: CreateProductInput,
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

/** Update an existing product (admin-only via RLS). */
export async function updateProduct(
  id: string,
  fields: Partial<CreateProductInput>,
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(fields)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

/** Permanently delete a product (admin-only via RLS). */
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Upload a product photo to the `farm-public` storage bucket and register it in
 * `product_images`. Admin-only (enforced by storage + table RLS).
 */
export async function uploadProductImage(
  product: { id: string; slug: string; name: string },
  file: File,
  options?: { altText?: string; sortOrder?: number; isCover?: boolean },
): Promise<ProductImage> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `products/${product.slug}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(PUBLIC_BUCKET)
    .upload(storagePath, file, { cacheControl: '3600', upsert: false });
  if (uploadError) throw uploadError;

  const isCover = options?.isCover ?? true;
  const { data, error } = await supabase
    .from('product_images')
    .insert({
      product_id: product.id,
      storage_path: storagePath,
      alt_text: options?.altText ?? product.name,
      sort_order: options?.sortOrder ?? 0,
      is_cover: isCover,
    })
    .select()
    .single();
  if (error) throw error;

  // Keep a single cover per product: unset the flag on any other images.
  if (isCover) {
    const { error: coverErr } = await supabase
      .from('product_images')
      .update({ is_cover: false })
      .eq('product_id', product.id)
      .neq('id', (data as ProductImage).id);
    if (coverErr) console.warn('Nepodařilo se sjednotit cover obrázek', coverErr);
  }

  return data as ProductImage;
}
