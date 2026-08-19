/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id?: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_cover: boolean;
}

/** Row from `products`, optionally joined with its category and images. */
export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  unit: string;
  availability_type: string;
  is_active: boolean;
  created_at: string;
  // Joined relations (present depending on the select())
  category?: Pick<Category, 'id' | 'name' | 'slug'> | null;
  product_images?: ProductImage[];
}

export type ProductAvailabilityStatus =
  | 'available'
  | 'preorder'
  | 'made_to_order'
  | 'coming_soon'
  | 'sold_out'
  | 'out_of_season'
  | 'unavailable'
  | 'hidden';

/** Return shape of the `get_product_availability` RPC. */
export interface ProductAvailability {
  product_id: string;
  status: ProductAvailabilityStatus;
  available_quantity: number;
  unit: string;
  allow_preorder: boolean;
  preorder_remaining: number | null;
  expected_available_at: string | null;
  available_from: string | null;
  available_until: string | null;
  season_start_month: number | null;
  season_end_month: number | null;
  lead_time_days_min: number | null;
  lead_time_days_max: number | null;
}
