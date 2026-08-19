/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AvailabilityBadge, { isReservable } from '../components/AvailabilityBadge';
import { useReservation } from '../context/ReservationContext';
import { useProduct } from '../hooks/useProduct';
import { getPublicImageUrl } from '../services/storage';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { product, availability, loading, error } = useProduct(slug);
  const { add } = useReservation();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-natural-text-muted">
        Načítám produkt…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-4">
        <p className="text-rose-600 bg-rose-50 border border-rose-200 rounded-2xl p-4">
          Produkt se nepodařilo načíst nebo neexistuje.
        </p>
        <Link to="/nabidka" className="text-natural-sage font-semibold">
          ← Zpět na nabídku
        </Link>
      </div>
    );
  }

  const images = product.product_images ?? [];
  const cover = images.find((i) => i.is_cover) ?? images[0];
  const canReserve = availability ? isReservable(availability.status) : false;
  const maxQty =
    availability && availability.status === 'available'
      ? Math.max(1, availability.available_quantity)
      : undefined;

  const handleAdd = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: cover ? getPublicImageUrl(cover.storage_path) : null,
      },
      quantity,
    );
    setAdded(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Link to="/nabidka" className="text-sm text-natural-sage font-semibold">
        ← Zpět na nabídku
      </Link>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-square rounded-3xl overflow-hidden bg-natural-bg-light border border-natural-border">
            {cover ? (
              <img
                src={getPublicImageUrl(cover.storage_path)}
                alt={cover.alt_text ?? product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🥚</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((img) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-xl overflow-hidden bg-natural-bg-light border border-natural-border"
                >
                  <img
                    src={getPublicImageUrl(img.storage_path)}
                    alt={img.alt_text ?? product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          {product.category?.name && (
            <span className="text-xs uppercase tracking-wider font-mono text-natural-sage font-bold">
              {product.category.name}
            </span>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            {availability && <AvailabilityBadge status={availability.status} />}
            {availability?.status === 'available' && (
              <span className="text-sm text-natural-text-muted">
                {availability.available_quantity} {availability.unit} k dispozici
              </span>
            )}
          </div>

          <p className="font-serif text-2xl font-bold text-natural-deep">
            {product.price} Kč{' '}
            <span className="text-sm font-normal text-natural-text-muted">
              / {product.unit}
            </span>
          </p>

          {product.description && (
            <p className="text-natural-dark leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}

          {/* Reservation controls */}
          <div className="pt-4 border-t border-natural-border-light space-y-4">
            {canReserve ? (
              <>
                <div className="flex items-center gap-3">
                  <label htmlFor="qty" className="text-sm font-bold text-natural-deep">
                    Množství
                  </label>
                  <input
                    id="qty"
                    type="number"
                    min={1}
                    max={maxQty}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Math.max(1, Number(e.target.value) || 1));
                      setAdded(false);
                    }}
                    className="w-24 bg-natural-bg-light border border-natural-border-light rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage"
                  />
                  <span className="text-sm text-natural-text-muted">{product.unit}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className="bg-natural-sage hover:bg-natural-sage-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Přidat do rezervace
                  </button>
                  {added && (
                    <button
                      onClick={() => navigate('/rezervace')}
                      className="text-natural-sage font-semibold"
                    >
                      Přejít k rezervaci →
                    </button>
                  )}
                </div>
                {availability?.status === 'preorder' && (
                  <p className="text-xs text-amber-700">
                    Tento produkt je na předobjednávku. Dostupnost potvrdíme po odeslání.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-natural-text-muted">
                Tento produkt teď nelze rezervovat. Zkuste to prosím později nebo
                nás kontaktujte.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
