/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, ShoppingBag, Eye, HelpCircle } from 'lucide-react';

interface HeroProps {
  onExploreScroll: () => void;
  onHowToBuyScroll: () => void;
}

export default function Hero({ onExploreScroll, onHowToBuyScroll }: HeroProps) {
  return (
    <header id="uvod" className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-natural-cream via-natural-bg-light/50 to-natural-cream/30">
      {/* Decorative rural accents/patterns in the background */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-natural-sage/10 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-natural-border/30 blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left max-w-2xl mx-auto lg:mx-0">
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-natural-bg-light border border-natural-border text-natural-sage text-xs sm:text-sm font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-natural-sage animate-pulse" />
              <span>Lokální malovýroba z Polabí & Kokořínska</span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-natural-deep tracking-tight leading-tight">
              Poctivé dobroty <br className="hidden sm:inline" />
              <span className="text-natural-sage relative inline-block">
                z našeho kraje
                <span className="absolute left-0 bottom-1 w-full h-[6px] bg-natural-border/60 -z-10 rounded-full" />
              </span>
            </h1>

            {/* Subheading Description */}
            <p className="text-natural-text-muted text-base sm:text-lg md:text-xl leading-relaxed">
              Čerstvá Honzíkova vejce, domácí sladkosti, marmelády a další poctivé výrobky připravované s největší péčí pro vaše zdraví a radost.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExploreScroll}
                className="inline-flex items-center justify-center gap-2 bg-natural-sage hover:bg-natural-sage-dark text-white font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer active:scale-95 group text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Prohlédnout nabídku</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onHowToBuyScroll}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-natural-bg-light text-natural-dark border border-natural-border hover:border-natural-border/80 font-semibold px-8 py-4 rounded-full shadow-xs hover:shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer active:scale-95 text-base"
              >
                <HelpCircle className="w-5 h-5 text-natural-text-muted" />
                <span>Jak nakoupit</span>
              </button>
            </div>

            {/* Trust factors */}
            <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-4 border-t border-natural-border max-w-lg">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-natural-deep">100%</span>
                <span className="text-xs text-natural-text-muted font-medium">Přírodní původ</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-natural-deep">Denně</span>
                <span className="text-xs text-natural-text-muted font-medium">Sběr čerstvých vajec</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-natural-deep">Poctivá</span>
                <span className="text-xs text-natural-text-muted font-medium">Ruční výroba</span>
              </div>
            </div>
          </div>

          {/* Hero visual image card with realistic country vibes */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Wooden background card with generous shadow */}
              <div className="absolute -inset-2 bg-natural-bg-light rounded-3xl transform -rotate-2 -z-10" />
              <div className="absolute -inset-2 bg-natural-border/40 rounded-3xl transform rotate-1 -z-10" />
              
              <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-natural-border overflow-hidden">
                <img
                  src="/src/assets/images/rustic_eggs_basket_1784042313358.jpg"
                  alt="Košík s čerstvými domácími vajíčky, kvítím a bylinkami na dřevěném stole"
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-inner referrer-policy-no-referrer"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual labels / Floating Badges */}
                <div className="absolute bottom-6 left-6 right-6 bg-natural-cream/95 backdrop-blur-xs p-4 rounded-2xl border border-natural-border shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-natural-sage/10 border border-natural-sage/20 flex items-center justify-center shrink-0">
                      <span className="text-xl">🥚</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-natural-deep text-sm leading-tight">Honzíkova čerstvá vejce</h4>
                      <p className="text-xs text-natural-text-muted font-medium">Ranní sběr ze dvora, volný výběh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating aesthetic badge */}
              <div className="absolute -top-4 -right-4 bg-natural-sage text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-natural-sage-dark transform rotate-6 animate-bounce">
                🍀 Sousedská kvalita
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
