/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { addStock, getInventory } from '../../services/admin';
import { getProducts } from '../../services/products';
import type { InventoryRow } from '../../types/database';
import type { Product } from '../../types/product';

const QUICK_ADD = [6, 10, 30];

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [invByProduct, setInvByProduct] = useState<Record<string, InventoryRow>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [custom, setCustom] = useState<Record<string, string>>({});

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([getProducts(), getInventory()])
      .then(([prods, inv]) => {
        setProducts(prods);
        const map: Record<string, InventoryRow> = {};
        for (const row of inv) map[row.product_id] = row;
        setInvByProduct(map);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const doAdd = async (productId: string, quantity: number) => {
    if (!quantity || quantity <= 0) return;
    setBusyId(productId);
    setError(null);
    try {
      await addStock(productId, quantity);
      setCustom((prev) => ({ ...prev, [productId]: '' }));
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-natural-deep">Sklad</h1>

      {error && <p className="text-rose-600">Chyba: {error}</p>}
      {loading && <p className="text-natural-text-muted">Načítám…</p>}

      <div className="space-y-3">
        {products.map((product) => {
          const inv = invByProduct[product.id];
          const busy = busyId === product.id;
          const unit = product.unit ?? 'ks';
          const onHand = inv?.quantity_on_hand ?? 0;
          const reserved = inv?.quantity_reserved ?? 0;
          return (
            <div
              key={product.id}
              className="bg-white border border-natural-border rounded-2xl p-5 flex flex-wrap items-center gap-4"
            >
              <div className="flex-grow min-w-[200px]">
                <p className="font-bold text-natural-deep">{product.name}</p>
                <p className="text-sm text-natural-text-muted">
                  Na skladě: <strong>{onHand}</strong> {unit}
                  {reserved > 0 && <> · rezervováno {reserved} {unit}</>}
                  {!inv && <span className="text-amber-700"> · zatím bez skladové karty</span>}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {QUICK_ADD.map((q) => (
                  <button
                    key={q}
                    disabled={busy}
                    onClick={() => doAdd(product.id, q)}
                    className="text-sm font-bold px-3 py-2 rounded-lg bg-natural-sage/15 text-natural-sage-dark hover:bg-natural-sage/25 disabled:opacity-50"
                  >
                    +{q}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  placeholder="jiné"
                  value={custom[product.id] ?? ''}
                  onChange={(e) =>
                    setCustom((prev) => ({ ...prev, [product.id]: e.target.value }))
                  }
                  className="w-20 bg-natural-bg-light border border-natural-border-light rounded-lg px-2 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage"
                />
                <button
                  disabled={busy}
                  onClick={() => doAdd(product.id, Number(custom[product.id]))}
                  className="text-sm font-bold px-3 py-2 rounded-lg bg-natural-sage text-white disabled:opacity-50"
                >
                  Přidat
                </button>
              </div>
            </div>
          );
        })}
        {!loading && products.length === 0 && (
          <p className="text-natural-text-muted">Žádné produkty k zobrazení.</p>
        )}
      </div>
    </div>
  );
}
