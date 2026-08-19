/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useReservation } from '../context/ReservationContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { items, estimatedTotal, setQuantity, remove } = useReservation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-[#3E2723]/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-natural-bg-light shadow-2xl flex flex-col h-full border-l border-natural-border">

          {/* Header */}
          <div className="px-4 sm:px-6 py-6 bg-white border-b border-natural-border-light flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-natural-sage" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-natural-deep">
                Vaše rezervace
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-natural-text-muted hover:text-natural-dark hover:bg-natural-bg-light border border-transparent hover:border-natural-border transition-all cursor-pointer"
              aria-label="Zavřít košík"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 py-4 overflow-y-auto px-4 sm:px-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <span className="text-5xl block select-none">🧺</span>
                <h4 className="font-serif font-bold text-natural-dark text-sm sm:text-base">
                  Vaše rezervace je zatím prázdná
                </h4>
                <p className="text-natural-text-muted text-xs sm:text-sm max-w-xs mx-auto">
                  Vyberte si z naší nabídky čerstvých vajec, domácích marmelád nebo poctivého pečiva výše v katalogu.
                </p>
                <Link
                  to="/nabidka"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-bold text-natural-sage hover:text-natural-sage-dark transition-colors cursor-pointer"
                >
                  Prohlédnout nabídku →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-3 rounded-xl border border-natural-border bg-white hover:border-natural-sage transition-all shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg bg-natural-bg-light border border-natural-border-light flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        '🧺'
                      )}
                    </div>

                    {/* Product Name & unit */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-natural-dark text-xs sm:text-sm truncate">
                        {item.name}
                      </h5>
                      <p className="text-natural-text-muted text-[11px] font-mono">
                        {item.price} Kč / {item.unit}
                      </p>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="flex items-center border border-natural-border rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-natural-bg-light text-natural-dark transition-colors cursor-pointer"
                          aria-label="Snížit množství"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold font-mono text-natural-deep">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-natural-bg-light text-natural-dark transition-colors cursor-pointer"
                          aria-label="Zvýšit množství"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => remove(item.productId)}
                        className="p-1.5 text-natural-text-muted hover:text-rose-600 transition-colors cursor-pointer"
                        aria-label="Odstranit z rezervace"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer block */}
          {items.length > 0 && (
            <div className="border-t border-natural-border px-4 sm:px-6 py-6 bg-white space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-natural-dark font-serif text-sm font-bold">
                  Předběžná orientační cena:
                </span>
                <span className="font-serif font-bold text-2xl text-natural-deep font-mono">
                  {estimatedTotal} Kč
                </span>
              </div>

              <div className="bg-natural-bg-light p-3.5 rounded-2xl border border-natural-border-light">
                <p className="text-[11px] text-natural-text-muted font-medium leading-relaxed">
                  <strong>Upozornění:</strong> Ceny jsou orientační. Dostupnost čerstvých vajec se odvíjí od denní snášky. Termín odběru vám potvrdíme telefonicky.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-natural-sage hover:bg-natural-sage-dark text-white font-bold py-4 px-4 rounded-xl shadow-2xs hover:shadow-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group text-sm"
              >
                <span>Dokončit rezervaci</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onClose}
                className="w-full text-natural-text-muted hover:text-natural-dark text-xs font-bold text-center py-1 transition-colors block cursor-pointer"
              >
                Pokračovat v nákupu
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
