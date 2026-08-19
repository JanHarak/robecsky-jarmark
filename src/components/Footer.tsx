/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent } from 'react';
import { Egg, ArrowUp } from 'lucide-react';
import { CONTACT_DATA } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-natural-bg-footer text-natural-text-muted py-12 sm:py-16 border-t border-natural-border" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-natural-border pb-12">
          
          {/* Brand block */}
          <div className="space-y-4">
            <a href="#uvod" onClick={handleScrollToTop} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-natural-border shadow-2xs">
                <Egg className="w-5 h-5 text-natural-sage transform rotate-12" />
              </div>
              <span className="font-serif text-xl font-bold text-natural-deep tracking-tight">
                Robečský jarmark
              </span>
            </a>
            <p className="text-xs sm:text-sm text-natural-text-muted leading-relaxed">
              Poctivé a čerstvé domácí produkty připravované s láskou přímo z našeho rodinného chovu a zahradního sadu v srdci Robče.
            </p>
          </div>

          {/* Nav Links block */}
          <div className="space-y-4">
            <h4 className="text-natural-deep font-serif font-bold text-sm uppercase tracking-wider">
              Užitečné odkazy
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-natural-text-muted">
              <li>
                <a href="#uvod" onClick={handleScrollToTop} className="hover:text-natural-sage transition-colors font-semibold">Úvodní stránka</a>
              </li>
              <li>
                <a href="#honzikova-vejce" onClick={(e) => handleLinkClick(e, '#honzikova-vejce')} className="hover:text-natural-sage transition-colors font-semibold">Honzíkova vejce</a>
              </li>
              <li>
                <a href="#dalsi-dobroty" onClick={(e) => handleLinkClick(e, '#dalsi-dobroty')} className="hover:text-natural-sage transition-colors font-semibold">Sezónní nabídka</a>
              </li>
              <li>
                <a href="#jak-nakoupit" onClick={(e) => handleLinkClick(e, '#jak-nakoupit')} className="hover:text-natural-sage transition-colors font-semibold">Průvodce nákupem</a>
              </li>
            </ul>
          </div>

          {/* Contact block */}
          <div className="space-y-4">
            <h4 className="text-natural-deep font-serif font-bold text-sm uppercase tracking-wider">
              Kontakt
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-natural-text-muted leading-normal">
              <li>
                <strong>Adresa:</strong> <br /> {CONTACT_DATA.address}
              </li>
              <li>
                <strong>Telefon:</strong> <br /> 
                <a href={`tel:${CONTACT_DATA.phone.replace(/\s/g, '')}`} className="hover:text-natural-sage transition-colors font-mono font-bold">
                  {CONTACT_DATA.phone}
                </a>
              </li>
              <li>
                <strong>E-mail:</strong> <br />
                <a href={`mailto:${CONTACT_DATA.email}`} className="hover:text-natural-sage transition-colors font-bold">
                  {CONTACT_DATA.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Regulatory & GDPR placeholders */}
          <div className="space-y-4">
            <h4 className="text-natural-deep font-serif font-bold text-sm uppercase tracking-wider">
              Informace pro spotřebitele
            </h4>
            <ul className="space-y-2 text-xs text-natural-text-muted/80">
              <li>
                <span className="hover:text-natural-dark transition-colors cursor-help block font-medium">
                  🛡️ Zásady ochrany osobních údajů (GDPR) [Zástupný text]
                </span>
              </li>
              <li>
                <span className="hover:text-natural-dark transition-colors cursor-help block font-medium">
                  📝 Obchodní podmínky prodeje ze dvora [Zástupný text]
                </span>
              </li>
              <li>
                <span className="hover:text-natural-dark transition-colors cursor-help block font-medium">
                  ⚖️ Hygienická pravidla prodeje domácích potravin dle vyhlášky ČR [Zástupný text]
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Footer section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-natural-text-muted text-center sm:text-left">
          <div>
            <p>© {currentYear} Robečský jarmark. Všechna práva vyhrazena.</p>
            <p className="mt-1 text-[11px] text-natural-text-muted/70">
              Tento web slouží k propagaci poctivé lokální malovýroby. Všechny ceny a dostupnost jsou orientační a podléhají následnému potvrzení.
            </p>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-natural-text-muted hover:text-natural-sage border border-natural-border hover:border-natural-sage transition-all shadow-2xs cursor-pointer text-xs font-bold"
            aria-label="Sjet nahoru"
          >
            <span>Nahoru</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
