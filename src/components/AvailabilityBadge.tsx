/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ProductAvailabilityStatus } from '../types/product';

const LABELS: Record<ProductAvailabilityStatus, string> = {
  available: 'Skladem',
  preorder: 'Na předobjednávku',
  made_to_order: 'Na objednávku',
  coming_soon: 'Již brzy',
  sold_out: 'Vyprodáno',
  out_of_season: 'Mimo sezónu',
  unavailable: 'Nedostupné',
  hidden: 'Nedostupné',
};

const STYLES: Record<ProductAvailabilityStatus, string> = {
  available: 'bg-natural-sage/15 text-natural-sage-dark border-natural-sage/30',
  preorder: 'bg-amber-100 text-amber-800 border-amber-300',
  made_to_order: 'bg-amber-100 text-amber-800 border-amber-300',
  coming_soon: 'bg-sky-100 text-sky-800 border-sky-300',
  sold_out: 'bg-rose-100 text-rose-700 border-rose-300',
  out_of_season: 'bg-stone-100 text-stone-600 border-stone-300',
  unavailable: 'bg-stone-100 text-stone-600 border-stone-300',
  hidden: 'bg-stone-100 text-stone-600 border-stone-300',
};

/** Statuses where a customer can put the product into a reservation. */
export function isReservable(status: ProductAvailabilityStatus): boolean {
  return status === 'available' || status === 'preorder' || status === 'made_to_order';
}

export function availabilityLabel(status: ProductAvailabilityStatus): string {
  return LABELS[status] ?? 'Nedostupné';
}

export default function AvailabilityBadge({
  status,
}: {
  status: ProductAvailabilityStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${STYLES[status] ?? STYLES.unavailable}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {availabilityLabel(status)}
    </span>
  );
}
