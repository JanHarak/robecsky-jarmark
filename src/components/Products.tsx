/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data';
import { Plus, Check, Info, AlertTriangle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
  cartItems: { [id: string]: number };
}

export default function Products({ onAddToCart, cartItems }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('vse');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const categories = [
    { id: 'vse', label: 'Všechna nabídka' },
    { id: 'vejce', label: 'Honzíkova vejce' },
    { id: 'moucniky', label: 'Moučníky & Dezerty' },
    { id: 'marmelady', label: 'Marmelády' },
    { id: 'mydla', label: 'Přírodní mýdla & Esence' },
  ];

  // Helper filter
  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory === 'vse') return true;
    if (activeCategory === 'moucniky') {
      return product.category === 'moucniky' || product.category === 'dezerty';
    }
    if (activeCategory === 'mydla') {
      return product.category === 'mydla' || product.category === 'esence';
    }
    return product.category === activeCategory;
  });

  const getAvailabilityBadge = (status: Product['availability']) => {
    switch (status) {
      case 'skladem':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Skladem – ihned k odběru
          </span>
        );
      case 'omezeno':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-pulse" />
            Omezené množství
          </span>
        );
      case 'na_objednavku':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            Na objednávku (24-48h)
          </span>
        );
      case 'vyprodano':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            Dočasně vyprodáno
          </span>
        );
    }
  };

  const getProductImageEmoji = (category: string) => {
    switch (category) {
      case 'vejce':
        return '🥚';
      case 'moucniky':
        return '🍰';
      case 'dezerty':
        return '🧁';
      case 'marmelady':
        return '🍓';
      case 'mydla':
        return '🧼';
      case 'esence':
        return '🌿';
      default:
        return '🍎';
    }
  };

  const toggleDetails = (productId: string) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-natural-cream" id="produkty">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === HONZÍKOVA VEJCE JUMBOTRON SECTION === */}
        <div id="honzikova-vejce" className="bg-natural-bg-light p-6 sm:p-10 rounded-[32px] border border-natural-border mb-16 shadow-xs relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-natural-sage/10 rounded-bl-full pointer-events-none" />
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
              Naše hlavní chlouba
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep">
              Čerstvá Honzíkova vejce
            </h2>
            <p className="text-natural-dark text-sm sm:text-base leading-relaxed">
              Vejce z lokálního malochovu v Robči, pečlivě ručně sbíraná a připravená k osobnímu odběru přímo ze dvora. Naše slepice žijí spokojeným životem s celodenním přístupem k čerstvé zelené trávě, což dává žloutkům nezaměnitelnou sytou barvu a skvělou chuť.
            </p>

            {/* Informational Box required for food sales */}
            <div className="bg-white border border-natural-border-light p-4 rounded-2xl text-natural-text-muted text-xs sm:text-sm space-y-2 mt-4 shadow-2xs">
              <h4 className="font-bold text-natural-dark flex items-center gap-1.5">
                <Info className="w-4 h-4 text-natural-sage" />
                Důležité informace o prodeji vajec:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-natural-text-muted pl-1">
                <li><strong>Původ:</strong> Robečský rodinný malochov, Česká republika.</li>
                <li><strong>Způsob chovu:</strong> Volný výběh na travnatém sadu s přírodním krmením bez GMO.</li>
                <li><strong>Skladování:</strong> Skladujte v chladu od +5 °C do +12 °C, nevystavujte slunci a vlhku.</li>
                <li><strong>Datum snášky:</strong> Vždy vyznačeno na obalu při převzetí (garantujeme maximální čerstvost).</li>
                <li><strong>Úřední upozornění [Placeholder]:</strong> Registrovaný malochov pod evidenčním číslem chovu CZ-XXXXXXXX. Prodej ze dvora v souladu s platnými veterinárními předpisy ČR.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* === ALL PRODUCTS CATALOGUE === */}
        <div id="dalsi-dobroty" className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Kompletní jarmark
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-deep">
            Naše sezónní nabídka
          </h3>
          <p className="text-natural-text-muted text-xs sm:text-sm">
            Kromě vajec nabízíme i další dobroty, které sami pečeme a vyrábíme z toho nejlepšího, co nám příroda nadělí.
          </p>
        </div>

        {/* Tabs for categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const inCartCount = cartItems[product.id] || 0;
            const isExpanded = expandedProduct === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-[32px] border border-natural-border shadow-2xs hover:shadow-sm transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Visual top bar of the card */}
                <div className={`h-40 ${product.imagePlaceholderColor} relative flex items-center justify-center border-b border-natural-border-light overflow-hidden`}>
                  {/* Visual grid / linen background feel */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Huge illustrative emoji */}
                  <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
                    {getProductImageEmoji(product.category)}
                  </span>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-natural-sage border border-natural-sage/25 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-2xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Weight or volume display */}
                  {product.weightOrVolume && (
                    <span className="absolute bottom-3 right-3 bg-natural-dark/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-lg">
                      {product.weightOrVolume}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif font-bold text-lg text-natural-deep group-hover:text-natural-sage transition-colors">
                        {product.name}
                      </h4>
                    </div>

                    <p className="text-natural-text-muted text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Pricing and basic details */}
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-2xl font-bold text-natural-deep font-serif">
                        {product.price} Kč
                      </span>
                      <span className="text-natural-text-muted text-xs font-medium">
                        / {product.unit}
                      </span>
                    </div>

                    <div className="pt-1">
                      {getAvailabilityBadge(product.availability)}
                    </div>
                  </div>

                  {/* Expander block for Ingredients/Allergens */}
                  <div className="border-t border-natural-border-light pt-3">
                    <button
                      onClick={() => toggleDetails(product.id)}
                      className="text-natural-text-muted hover:text-natural-sage text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer w-full text-left"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" />
                          Skrýt složení a skladování
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" />
                          Zobrazit složení, alergeny a skladování
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-3.5 rounded-2xl bg-natural-bg-light/80 border border-natural-border-light text-xs text-natural-text-muted space-y-2 animate-fadeIn shadow-2xs">
                        {product.ingredients && product.ingredients.length > 0 && (
                          <div>
                            <strong>Složení:</strong> {product.ingredients.join(', ')}
                          </div>
                        )}
                        {product.allergens && product.allergens.length > 0 && (
                          <div className="text-natural-dark font-medium">
                            <strong>Alergeny:</strong> {product.allergens.join(', ')}
                          </div>
                        )}
                        {product.storage && (
                          <div>
                            <strong>Doporučené skladování:</strong> {product.storage}
                          </div>
                        )}
                        {product.instructions && (
                          <div className="text-[11px] text-natural-text-muted italic border-t border-natural-border-light pt-1.5 mt-1">
                            {product.instructions}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Add to Order Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={product.availability === 'vyprodano'}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                        product.availability === 'vyprodano'
                          ? 'bg-natural-bg-light text-natural-text-muted border border-natural-border cursor-not-allowed'
                          : inCartCount > 0
                          ? 'bg-natural-sage text-white shadow-2xs border-2 border-natural-sage'
                          : 'bg-white text-natural-sage border-2 border-natural-sage hover:bg-natural-sage hover:text-white shadow-2xs active:scale-98'
                      }`}
                    >
                      {inCartCount > 0 ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" />
                          <span>Přidáno v košíku ({inCartCount})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 shrink-0" />
                          <span>Přidat do objednávky</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
