/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Plus, Check, ArrowRight } from 'lucide-react';
import AvailabilityBadge, { isReservable } from './AvailabilityBadge';
import { useReservation } from '../context/ReservationContext';
import { getPublicImageUrl } from '../services/storage';
import type { Product, ProductAvailability } from '../types/product';

/** Best-effort emoji fallback when a product has no image, keyed off its name/category. */
export function emojiFor(product: Product): string {
  const text = `${product.category?.slug ?? ''} ${product.category?.name ?? ''} ${product.name}`.toLowerCase();
  if (/vejc|vajic|egg/.test(text)) return '🥚';
  if (/cupcake|muffin/.test(text)) return '🧁';
  if (/kolac|koláč|dezert|mouc|mouč|cake|dort|buch/.test(text)) return '🍰';
  if (/marmel|zavar|zavař|dzem|džem|jam/.test(text)) return '🍓';
  if (/mydl|mýdl|soap/.test(text)) return '🧼';
  if (/esenc|bylin|caj|čaj|herb/.test(text)) return '🌿';
  return '🧺';
}

export function coverUrl(product: Product): string | null {
  const imgs = product.product_images ?? [];
  if (imgs.length === 0) return null;
  const cover = imgs.find((i) => i.is_cover) ?? imgs[0];
  return getPublicImageUrl(cover.storage_path);
}

/**
 * Shared product card used by BOTH the home-page catalogue and the dedicated
 * /nabidka page, so the two stay visually identical. Self-contained: it reads
 * and writes the shared reservation itself.
 */
export default function ProductCard({
  product,
  availability,
}: {
  product: Product;
  availability?: ProductAvailability;
}) {
  const { items, add } = useReservation();
  const inCartCount = items.find((i) => i.productId === product.id)?.quantity ?? 0;
  const image = coverUrl(product);
  const reservable = availability ? isReservable(availability.status) : true;

  return (
    <div className="bg-white rounded-[32px] border border-natural-border shadow-2xs hover:shadow-sm transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Visual top of the card (real image or emoji) */}
      <Link
        to={`/produkt/${product.slug}`}
        className="h-44 relative flex items-center justify-center border-b border-natural-border-light overflow-hidden bg-natural-bg-light"
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
              {emojiFor(product)}
            </span>
          </>
        )}
        {product.category?.name && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-natural-sage border border-natural-sage/25 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-2xs">
            {product.category.name}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link
            to={`/produkt/${product.slug}`}
            className="block font-serif font-bold text-lg text-natural-deep group-hover:text-natural-sage transition-colors"
          >
            {product.name}
          </Link>

          {(product.short_description || product.description) && (
            <p className="text-natural-text-muted text-xs sm:text-sm leading-relaxed line-clamp-3">
              {product.short_description || product.description}
            </p>
          )}

          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-2xl font-bold text-natural-deep font-serif">
              {product.price} Kč
            </span>
            <span className="text-natural-text-muted text-xs font-medium">
              / {product.unit}
            </span>
          </div>

          <div className="pt-1">
            {availability ? (
              <AvailabilityBadge status={availability.status} />
            ) : (
              <span className="text-[11px] text-natural-text-muted">
                Zjišťuji dostupnost…
              </span>
            )}
          </div>
        </div>

        {/* Detail link + Add to reservation */}
        <div className="space-y-2 pt-1">
          <Link
            to={`/produkt/${product.slug}`}
            className="text-natural-text-muted hover:text-natural-sage text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            Zobrazit detail
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() =>
              add({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                unit: product.unit,
                image,
              })
            }
            disabled={!reservable}
            className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
              !reservable
                ? 'bg-natural-bg-light text-natural-text-muted border border-natural-border cursor-not-allowed'
                : inCartCount > 0
                ? 'bg-natural-sage text-white shadow-2xs border-2 border-natural-sage'
                : 'bg-white text-natural-sage border-2 border-natural-sage hover:bg-natural-sage hover:text-white shadow-2xs active:scale-98'
            }`}
          >
            {!reservable ? (
              <span>Momentálně nedostupné</span>
            ) : inCartCount > 0 ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>V rezervaci ({inCartCount})</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 shrink-0" />
                <span>Přidat do rezervace</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
