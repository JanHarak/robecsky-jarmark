/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Sprout, Heart, Handshake } from 'lucide-react';

export default function Features() {
  const advantages = [
    {
      icon: MapPin,
      title: 'Lokální původ',
      description: 'Všechny produkty pocházejí přímo z naší zahrady, sadu a malochovu v Robči, případně od prověřených sousedních chovatelů v okolí.',
      color: 'bg-natural-sage/10 border-natural-sage/20 text-natural-sage',
    },
    {
      icon: Sprout,
      title: 'Čerstvé suroviny',
      description: 'Vajíčka sbíráme každé ráno. Ovoce do džemů a bylinky do esencí sklízíme v optimální zralosti, abychom uchovali maximum chuti a vůně.',
      color: 'bg-natural-sage/15 border-natural-sage/30 text-natural-sage-dark',
    },
    {
      icon: Heart,
      title: 'Poctivá ruční výroba',
      description: 'Nepoužíváme polotovary, chemické konzervanty ani barviva. Každý džem, mýdlo i koláč je výsledkem trpělivé ruční práce a rodinných receptů.',
      color: 'bg-[#FEF3C7] border-natural-border-light text-[#B45309]',
    },
    {
      icon: Handshake,
      title: 'Osobní přístup',
      description: 'Nákup u nás probíhá jako setkání sousedů. Rádi vám ukážeme naše slepice, popovídáme o výrobě a předáme produkty s upřímným úsměvem.',
      color: 'bg-natural-bg-light border-natural-border text-natural-dark',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-natural-cream relative border-t border-natural-border/50">
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-natural-bg-light/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Naše hodnoty
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
            Proč nakoupit právě u nás?
          </h2>
          <div className="w-16 h-1 bg-natural-sage mx-auto rounded-full mt-2" />
          <p className="text-natural-text-muted text-sm sm:text-base">
            U nás v Robči věříme, že poctivá práce, úcta k přírodě a sousedská důvěra dělají jídlo lepším a život spokojenějším.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <div
                key={index}
                className="bg-white hover:bg-natural-bg-light p-6 sm:p-8 rounded-[32px] border border-natural-border-light hover:border-natural-sage/40 transition-all duration-300 group hover:shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${adv.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-natural-deep">
                    {adv.title}
                  </h3>
                  <p className="text-natural-text-muted text-xs sm:text-sm leading-relaxed">
                    {adv.description}
                  </p>
                </div>
                {/* Visual tiny corner accent */}
                <div className="w-6 h-1 bg-natural-border rounded-full mt-6 group-hover:bg-natural-sage transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
