/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, X, Sparkles } from 'lucide-react';

export default function AvailabilityBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-natural-sage text-white px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 z-50 shadow-sm border-b border-natural-sage-dark/20">
      <Sparkles className="w-4 h-4 text-white animate-pulse shrink-0" />
      <span>
        <strong>Dnešní snáška (14. července):</strong> Čerstvá Honzíkova vejce jsou právě skladem! Sběr proběhl dnes v 6:30 ráno.
      </span>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-natural-sage-dark/30 rounded-full transition-colors duration-150 cursor-pointer"
        aria-label="Zavřít informační lištu"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
