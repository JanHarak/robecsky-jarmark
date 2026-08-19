/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Content models (news posts, static content pages) and admin profile. */

export type PublishStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  cover_image: string | null;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  cover_image: string | null;
  status: PublishStatus;
  published_at: string | null;
}

export interface Setting {
  key: string;
  value: unknown;
  is_public: boolean;
}

export type UserRole = 'admin' | 'user';

export interface Profile {
  id: string;
  display_name: string | null;
  role: UserRole;
}

export interface InventoryRow {
  product_id: string;
  quantity_on_hand: number;
  quantity_reserved: number;
  updated_at: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    unit: string;
  } | null;
}
