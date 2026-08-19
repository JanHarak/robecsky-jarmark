/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCatalog } from '../hooks/useCatalog';

export default function Products() {
  const { products, categories, availabilityById, loading, error } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<string>('vse');

  const tabs = [
    { id: 'vse', label: 'Všechna nabídka' },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered =
    activeCategory === 'vse'
      ? products
      : products.filter((p) => p.category_id === activeCategory);

  return (
    // id="honzikova-vejce" keeps the Hero and footer anchors landing on the catalogue.
    <section className="py-16 sm:py-24 bg-natural-cream" id="honzikova-vejce">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* === LIVE PRODUCT CATALOGUE === */}
        <div id="dalsi-dobroty" className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Kompletní jarmark
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-deep">
            Naše aktuální nabídka
          </h3>
          <p className="text-natural-text-muted text-xs sm:text-sm">
            Nabídka i dostupnost se načítají živě z našeho skladu – co vidíte, to právě máme (nebo přijímáme na objednávku).
          </p>
        </div>

        {/* Loading / error states */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-natural-text-muted py-16">
            <Loader2 className="w-5 h-5 animate-spin" />
            Načítám živou nabídku…
          </div>
        )}
        {error && (
          <p className="text-rose-600 bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
            Nabídku se teď nepodařilo načíst. Zkuste to prosím za chvíli.
          </p>
        )}

        {/* Category tabs + grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {tabs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                    activeCategory === cat.id
                      ? 'bg-natural-sage text-white shadow-sm border-natural-sage'
                      : 'bg-white text-natural-text-muted hover:text-natural-dark border-natural-border shadow-2xs'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  availability={availabilityById[product.id]}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-natural-text-muted py-8">
                V této kategorii teď nic nemáme.
              </p>
            )}
          </>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-natural-text-muted py-8">
            Momentálně nemáme žádné produkty v nabídce.
          </p>
        )}
      </div>
    </section>
  );
}
