/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, FileText, CheckCircle, Gift } from 'lucide-react';

export default function HowToBuy() {
  const steps = [
    {
      icon: ShoppingBag,
      title: '1. Vyberte si produkty',
      description: 'Prohlédněte si naši aktuální nabídku. Kliknutím na tlačítko jednoduše přidejte vejce, koláče nebo marmelády do svého košíku.',
      color: 'bg-natural-sage/10 text-natural-sage border-natural-sage/20',
    },
    {
      icon: FileText,
      title: '2. Odešlete nezávaznou poptávku',
      description: 'Přejděte do košíku nebo k objednávkovému formuláři dole. Vyplňte své jméno, e-mail, telefon a odešlete nezávazný rezervační formulář.',
      color: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
    },
    {
      icon: CheckCircle,
      title: '3. Vyčkejte na potvrzení',
      description: 'Do několika hodin vás kontaktujeme telefonicky nebo e-mailem, abychom vám potvrdili dostupnost (dle ranní snášky) a domluvili termín.',
      color: 'bg-natural-sage/15 text-natural-sage-dark border-natural-sage-dark/20',
    },
    {
      icon: Gift,
      title: '4. Vyzvedněte si dobroty',
      description: 'Zastavte se u nás přímo v Robči pro své čerstvé balíčky, kde vám je osobně a s úsměvem předáme. Platba probíhá v hotovosti při převzetí.',
      color: 'bg-natural-bg-light text-natural-dark border-natural-border',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-natural-cream border-t border-natural-border/50" id="jak-nakoupit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Nákupní průvodce
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
            Jak u nás nakoupit?
          </h2>
          <div className="w-16 h-1 bg-natural-sage mx-auto rounded-full mt-2" />
          <p className="text-natural-text-muted text-sm sm:text-base">
            Uvědomujeme si, že domácí výroba a čerstvá vajíčka nelze prodávat jako v běžném chladném e-shopu. Chceme zachovat lidský kontakt a garanci kvality.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-natural-border/40 -translate-y-12 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-[32px] p-6 border border-natural-border-light hover:border-natural-sage/40 hover:bg-natural-bg-light transition-all duration-300 relative group text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-md transform group-hover:scale-110 transition-transform duration-200 mb-6 bg-white">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-natural-deep mb-3">
                  {step.title}
                </h3>
                
                <p className="text-natural-text-muted text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connection helper indicator */}
                {index < 3 && (
                  <span className="hidden lg:block absolute top-1/2 -right-4 -translate-y-12 text-natural-sage/60 text-xl font-bold font-mono">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Warning Callout Box */}
        <div className="mt-12 bg-natural-bg-light border border-natural-border/80 p-5 rounded-[32px] max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-2xs">
          <div className="text-3xl">🧺</div>
          <div>
            <p className="text-natural-deep text-sm sm:text-base font-bold leading-snug">
              Důležitá poznámka o dostupnosti a kapacitách
            </p>
            <p className="text-natural-text-muted text-xs sm:text-sm mt-1 leading-relaxed">
              Všechny potraviny i kosmetiku připravujeme ručně v malých šaržích. Snesená vajíčka od našich šťastných slepic jsou limitována jejich aktuální aktivitou. Odesláním poptávky si produkty nezávazně zarezervujete, my vám co nejdříve zavoláme a potvrdíme přesný čas předání.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
