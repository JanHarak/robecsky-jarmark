/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { getCategories } from '../services/categories';
import { getProductAvailability, getProducts } from '../services/products';
import type {
  Category,
  Product,
  ProductAvailability,
} from '../types/product';

interface UseCatalogResult {
  products: Product[];
  categories: Category[];
  /** productId → live availability (missing entries = not yet/failed to load). */
  availabilityById: Record<string, ProductAvailability>;
  loading: boolean;
  error: Error | null;
}

/**
 * Loads the full public catalogue for the unified homepage: active products,
 * their categories, and each product's live availability (one RPC per product,
 * fetched in parallel). A single product's availability failure does not fail
 * the whole catalogue.
 */
export function useCatalog(): UseCatalogResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availabilityById, setAvailabilityById] = useState<
    Record<string, ProductAvailability>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([getProducts(), getCategories()])
      .then(async ([prods, cats]) => {
        if (!active) return;
        setProducts(prods);
        setCategories(cats);

        const results = await Promise.all(
          prods.map((p) =>
            getProductAvailability(p.id)
              .then((a) => [p.id, a] as const)
              .catch(() => null),
          ),
        );
        if (!active) return;
        const map: Record<string, ProductAvailability> = {};
        for (const entry of results) {
          if (entry) map[entry[0]] = entry[1];
        }
        setAvailabilityById(map);
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

  return { products, categories, availabilityById, loading, error };
}
