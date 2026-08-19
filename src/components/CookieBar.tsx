/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export default function CookieBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('robec_cookie_accepted');
    if (!isAccepted) {
      // Show notice after 1.5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('robec_cookie_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white/95 text-natural-dark p-4 rounded-2xl border border-natural-border shadow-xl z-50 animate-slideIn backdrop-blur-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-natural-sage/10 text-natural-sage border border-natural-sage/20 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="space-y-3 flex-1 min-w-0">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-natural-deep">Sousedské soukromí</h4>
            <p className="text-natural-text-muted text-xs leading-relaxed">
              Tento web nepoužívá žádné sledovací ani marketingové cookies. Používáme pouze lokální úložiště prohlížeče (<code>localStorage</code>) pro uchování položek ve vašem poptávkovém košíku.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAccept}
              className="bg-natural-sage hover:bg-natural-sage-dark text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors duration-150 shadow-2xs"
            >
              Rozumím a souhlasím
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-natural-text-muted hover:text-natural-dark text-xs font-bold px-2 py-2 transition-colors cursor-pointer"
            >
              Zavřít
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
