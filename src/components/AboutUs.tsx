/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from '../data';
import { Star, MessageSquare, Quote } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="py-16 sm:py-24 bg-natural-cream border-t border-natural-border/50" id="o-nas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Us Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Narrative Story Left */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl mx-auto lg:mx-0">
            <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
              Náš příběh
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight leading-tight">
              Z lásky k venkovu <br />
              & poctivému řemeslu
            </h2>
            <div className="w-16 h-1 bg-natural-sage rounded-full" />
            
            <p className="text-natural-text-muted text-sm sm:text-base leading-relaxed">
              Projekt <strong>Robečský jarmark</strong> vznikl původně z prosté radosti – z touhy obhospodařovat rodinný sad, vybudovat šťastný domov pro malé hejno slepic a těšit své nejbližší domácím pečením. Časem se ale radost začala přelévat přes plot naší zahrady. Sousedé z Robče a okolních chalup si oblíbili čerstvost našich vajec i nezaměnitelnou chuť babiččina švestkového koláče.
            </p>

            <p className="text-natural-text-muted text-sm sm:text-base leading-relaxed">
              Dnes náš jarmark propojuje to nejlepší z tradiční venkovské výroby s moderním a přátelským přístupem. Všechny dobroty připravujeme s láskou v malých šaržích přímo u nás doma. Nepoužíváme žádnou průmyslovou chemii, dochucovadla ani urychlovače.
            </p>

            {/* Informative placeholder callout box */}
            <div className="p-4 rounded-2xl bg-natural-bg-light border-l-4 border-natural-sage text-natural-text-muted text-xs sm:text-sm italic">
              <strong>[Poznámka pro provozovatele]:</strong> Tento příběh slouží jako autentická ukázka. Před ostrým spuštěním můžete texty upravit v souboru <code>src/components/AboutUs.tsx</code> tak, aby přesně odrážely historii a tradici vašeho rodinného jarmarku.
            </div>
          </div>

          {/* Visual card right */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[32px] border border-natural-border relative shadow-2xs">
              <div className="absolute -top-3 -left-3 text-4xl text-natural-sage font-serif">“</div>
              <div className="absolute -bottom-3 -right-3 text-4xl text-natural-sage font-serif">”</div>

              <div className="space-y-6">
                <span className="text-3xl">🏡</span>
                <h4 className="font-serif text-lg font-bold text-natural-deep">
                  Naše vize pro Robeč
                </h4>
                <p className="text-natural-text-muted text-xs sm:text-sm leading-relaxed italic">
                  „Chceme, aby Robečský jarmark nebyl jen obyčejným místem k nákupu, ale oázou, kde se lidé rádi zastaví, popovídají si a odnesou si kousek poctivého, voňavého venkova k sobě domů.“
                </p>
                <div className="pt-4 border-t border-natural-border-light">
                  <p className="text-natural-dark font-bold text-sm">Honzík & rodina</p>
                  <p className="text-natural-text-muted text-xs">Zakladatelé a chovatelé z Robče</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* === CUSTOMER TESTIMONIALS SECTION === */}
        <div className="border-t border-natural-border pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
              Zkušenosti sousedů
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-deep">
              Co o nás říkají naši zákazníci
            </h3>
            <p className="text-natural-text-muted text-xs sm:text-sm max-w-md mx-auto">
              <strong>Demonstrační obsah:</strong> Níže uvedená hodnocení slouží jako ukázky a před spuštěním webu budou nahrazena skutečnými recenzemi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 sm:p-8 rounded-[32px] border border-natural-border shadow-2xs hover:shadow-sm transition-all duration-300 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-natural-sage">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-natural-sage text-natural-sage" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-natural-sage/20 absolute top-4 right-6 shrink-0" />

                  {/* Comment text */}
                  <p className="text-natural-text-muted text-xs sm:text-sm leading-relaxed italic relative z-10">
                    „{t.text}“
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-natural-border-light mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-natural-sage/10 border border-natural-sage/20 flex items-center justify-center font-bold text-natural-sage text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-natural-deep text-sm">{t.name}</h5>
                    <p className="text-natural-text-muted text-[11px] font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
