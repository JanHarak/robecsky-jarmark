/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-natural-cream border-t border-natural-border/50" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Máte dotazy?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
            Často kladené otázky
          </h2>
          <div className="w-16 h-1 bg-natural-sage mx-auto rounded-full mt-2" />
          <p className="text-natural-text-muted text-sm">
            Zde najdete rychlé odpovědi na nejčastější dotazy ohledně nákupu vajec, skladování a vyzvedávání produktů.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-[32px] border border-natural-border overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-natural-deep hover:text-natural-sage transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-natural-sage shrink-0" />
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </div>
                  <div className="p-1.5 rounded-full bg-natural-bg-light text-natural-text-muted transition-colors shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated expand panel */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-natural-text-muted leading-relaxed border-t border-natural-border-light animate-fadeIn">
                    <p className="bg-natural-bg-light/80 p-3 sm:p-4 rounded-2xl border border-natural-border-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
