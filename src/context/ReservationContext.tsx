/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CreateOrderItem } from '../types/order';

/**
 * Local reservation "cart". Prices/names are kept only for display; when the
 * order is submitted we send just product_id + quantity to create_order and let
 * the backend resolve the authoritative price.
 */
export interface ReservationItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  /** Optional cover image URL, kept only for display in the cart. */
  image?: string | null;
}

interface ReservationContextValue {
  items: ReservationItem[];
  count: number;
  estimatedTotal: number;
  add: (item: Omit<ReservationItem, 'quantity'>, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  /** Payload for the create_order RPC (no client-side prices). */
  toOrderItems: () => CreateOrderItem[];
}

const STORAGE_KEY = 'robec_reservation';

const ReservationContext = createContext<ReservationContextValue | undefined>(
  undefined,
);

function loadInitial(): ReservationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReservationItem[]) : [];
  } catch {
    return [];
  }
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ReservationItem[]>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Nepodařilo se uložit rezervaci do localStorage', err);
    }
  }, [items]);

  const value = useMemo<ReservationContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const estimatedTotal = items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0,
    );

    return {
      items,
      count,
      estimatedTotal,
      add: (item, quantity = 1) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === item.productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            );
          }
          return [...prev, { ...item, quantity }];
        }),
      setQuantity: (productId, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.productId !== productId)
            : prev.map((i) =>
                i.productId === productId ? { ...i, quantity } : i,
              ),
        ),
      remove: (productId) =>
        setItems((prev) => prev.filter((i) => i.productId !== productId)),
      clear: () => setItems([]),
      toOrderItems: () =>
        items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
    };
  }, [items]);

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation(): ReservationContextValue {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error('useReservation musí být použit uvnitř <ReservationProvider>');
  }
  return ctx;
}
