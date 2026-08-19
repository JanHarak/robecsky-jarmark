/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'ready'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  /** Authoritative unit price stored by the backend at order time. */
  unit_price: number;
  product_name?: string | null;
}

export interface Order {
  id: string;
  order_number: string | null;
  status: OrderStatus;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_note: string | null;
  admin_note: string | null;
  total_price: number | null;
  expected_ready_date: string | null;
  pickup_date: string | null;
  pickup_time_from: string | null;
  pickup_time_to: string | null;
  pickup_location: string | null;
  pickup_note: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

/** One line sent to the `create_order` RPC. Price is intentionally omitted;
 *  the backend takes the authoritative price from `products`. */
export interface CreateOrderItem {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerNote?: string;
  items: CreateOrderItem[];
}

/** Optional pickup metadata accepted by the `confirm_order` RPC. */
export interface ConfirmOrderOptions {
  expectedReadyDate?: string;
  pickupDate?: string;
  pickupTimeFrom?: string;
  pickupTimeTo?: string;
  pickupLocation?: string;
  pickupNote?: string;
}
