/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import type { Product } from '../types/product';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

/** Load all active products once on mount. */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((err: Error) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
