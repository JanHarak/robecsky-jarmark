/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import {
  cancelOrder,
  completeOrder,
  confirmOrder,
  getOrders,
  markOrderReady,
  rejectOrder,
} from '../../services/orders';
import type { Order, OrderStatus } from '../../types/order';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Nová',
  confirmed: 'Potvrzená',
  ready: 'Připravená',
  completed: 'Dokončená',
  rejected: 'Odmítnutá',
  cancelled: 'Zrušená',
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  ready: 'bg-natural-sage/20 text-natural-sage-dark',
  completed: 'bg-stone-200 text-stone-700',
  rejected: 'bg-rose-100 text-rose-700',
  cancelled: 'bg-stone-100 text-stone-500',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getOrders()
      .then(setOrders)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const run = async (id: string, action: () => Promise<unknown>) => {
    setBusyId(id);
    setError(null);
    try {
      await action();
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-natural-deep">Rezervace</h1>

      {error && <p className="text-rose-600">Chyba: {error}</p>}
      {loading && <p className="text-natural-text-muted">Načítám…</p>}

      <div className="space-y-4">
        {orders.map((order) => {
          const busy = busyId === order.id;
          return (
            <div
              key={order.id}
              className="bg-white border border-natural-border rounded-2xl p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono font-bold text-natural-deep">
                    {order.order_number ?? order.id.slice(0, 8)}
                  </span>
                  <span className="text-sm text-natural-text-muted ml-3">
                    {order.customer_name} · {order.customer_email}
                    {order.customer_phone ? ` · ${order.customer_phone}` : ''}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLE[order.status]}`}
                >
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <ul className="text-sm text-natural-dark space-y-0.5">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.product_name ?? item.product_id}</span>
                      <span className="font-mono text-natural-text-muted">
                        {item.quantity}× {item.unit_price} Kč
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {order.customer_note && (
                <p className="text-sm italic text-natural-text-muted">
                  „{order.customer_note}“
                </p>
              )}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-natural-border-light">
                {order.status === 'pending' && (
                  <>
                    <button
                      disabled={busy}
                      onClick={() => run(order.id, () => confirmOrder(order.id))}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-natural-sage text-white disabled:opacity-50"
                    >
                      Potvrdit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => run(order.id, () => rejectOrder(order.id))}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 disabled:opacity-50"
                    >
                      Odmítnout
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button
                    disabled={busy}
                    onClick={() => run(order.id, () => markOrderReady(order.id))}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-sky-600 text-white disabled:opacity-50"
                  >
                    Označit připraveno
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    disabled={busy}
                    onClick={() => run(order.id, () => completeOrder(order.id))}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-natural-sage text-white disabled:opacity-50"
                  >
                    Dokončit
                  </button>
                )}
                {(order.status === 'pending' ||
                  order.status === 'confirmed' ||
                  order.status === 'ready') && (
                  <button
                    disabled={busy}
                    onClick={() => run(order.id, () => cancelOrder(order.id))}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-stone-100 text-stone-600 disabled:opacity-50"
                  >
                    Zrušit
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {!loading && orders.length === 0 && (
          <p className="text-natural-text-muted">Žádné rezervace.</p>
        )}
      </div>
    </div>
  );
}
