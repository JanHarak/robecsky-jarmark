/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import {
  getProductAvailability,
  getProductBySlug,
} from '../services/products';
import type { Product, ProductAvailability } from '../types/product';

interface UseProductResult {
  product: Product | null;
  availability: ProductAvailability | null;
  loading: boolean;
  error: Error | null;
  /** Re-fetch availability, e.g. after a failed reservation. */
  refreshAvailability: () => Promise<void>;
}

/** Load a product by slug together with its live availability. */
export function useProduct(slug: string | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [availability, setAvailability] = useState<ProductAvailability | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshAvailability = useCallback(async () => {
    if (!product) return;
    const next = await getProductAvailability(product.id);
    setAvailability(next);
  }, [product]);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setError(null);

    getProductBySlug(slug)
      .then(async (p) => {
        if (!active) return;
        setProduct(p);
        const avail = await getProductAvailability(p.id);
        if (active) setAvailability(avail);
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
  }, [slug]);

  return { product, availability, loading, error, refreshAvailability };
}
