/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../lib/supabase';
import type {
  ConfirmOrderOptions,
  CreateOrderInput,
  Order,
} from '../types/order';

/**
 * Create a reservation through the `create_order` RPC. The RPC runs a single
 * transaction that locks stock and writes orders + order_items + inventory.
 * Never INSERT into these tables directly from the public frontend, and never
 * send client-side prices: the backend reads the authoritative price from
 * `products`.
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { data, error } = await supabase.rpc('create_order', {
    p_customer_name: input.customerName,
    p_customer_email: input.customerEmail,
    p_customer_phone: input.customerPhone ?? null,
    p_customer_note: input.customerNote ?? null,
    p_items: input.items,
  });

  if (error) throw error;
  return data as Order;
}

// --- Admin operations (gated by RLS to admin users) ---

/** All orders with their line items. RLS restricts this to admins. */
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items (*)`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as Order[];
}

export async function confirmOrder(
  orderId: string,
  options?: ConfirmOrderOptions,
): Promise<Order> {
  const { data, error } = await supabase.rpc('confirm_order', {
    p_order_id: orderId,
    p_expected_ready_date: options?.expectedReadyDate ?? null,
    p_pickup_date: options?.pickupDate ?? null,
    p_pickup_time_from: options?.pickupTimeFrom ?? null,
    p_pickup_time_to: options?.pickupTimeTo ?? null,
    p_pickup_location: options?.pickupLocation ?? null,
    p_pickup_note: options?.pickupNote ?? null,
  });

  if (error) throw error;
  return data as Order;
}

export async function markOrderReady(orderId: string): Promise<Order> {
  const { data, error } = await supabase.rpc('mark_order_ready', {
    p_order_id: orderId,
    p_pickup_date: null,
    p_pickup_time_from: null,
    p_pickup_time_to: null,
    p_pickup_location: null,
    p_pickup_note: null,
  });

  if (error) throw error;
  return data as Order;
}

export async function completeOrder(orderId: string): Promise<Order> {
  const { data, error } = await supabase.rpc('complete_order', {
    p_order_id: orderId,
  });

  if (error) throw error;
  return data as Order;
}

export async function rejectOrder(
  orderId: string,
  note?: string,
): Promise<Order> {
  const { data, error } = await supabase.rpc('reject_order', {
    p_order_id: orderId,
    p_admin_note: note ?? null,
  });

  if (error) throw error;
  return data as Order;
}

export async function cancelOrder(
  orderId: string,
  note?: string,
): Promise<Order> {
  const { data, error } = await supabase.rpc('cancel_order', {
    p_order_id: orderId,
    p_admin_note: note ?? null,
  });

  if (error) throw error;
  return data as Order;
}
