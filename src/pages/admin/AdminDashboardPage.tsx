/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../services/orders';
import type { Order } from '../../types/order';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    getOrders()
      .then((data) => active && setOrders(data))
      .catch((err: Error) => active && setError(err));
    return () => {
      active = false;
    };
  }, []);

  const pending = orders.filter((o) => o.status === 'pending').length;
  const confirmed = orders.filter((o) => o.status === 'confirmed').length;
  const ready = orders.filter((o) => o.status === 'ready').length;

  const tiles = [
    { label: 'Nové rezervace', value: pending, to: '/admin/rezervace' },
    { label: 'Potvrzené', value: confirmed, to: '/admin/rezervace' },
    { label: 'Připravené k odběru', value: ready, to: '/admin/rezervace' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl font-bold text-natural-deep">Přehled</h1>

      {error && (
        <p className="text-rose-600">Data se nepodařilo načíst: {error.message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            to={t.to}
            className="bg-white border border-natural-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-natural-text-muted">{t.label}</p>
            <p className="font-serif text-3xl font-bold text-natural-deep mt-1">
              {t.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/admin/sklad"
          className="bg-natural-sage hover:bg-natural-sage-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl"
        >
          Doplnit sklad
        </Link>
        <Link
          to="/admin/produkty"
          className="bg-white border border-natural-border text-natural-dark text-sm font-bold px-5 py-2.5 rounded-xl hover:shadow-sm"
        >
          Spravovat produkty
        </Link>
      </div>
    </div>
  );
}
