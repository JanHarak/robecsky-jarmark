/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Egg, ArrowUp, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { CONTACT_DATA } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-natural-bg-footer text-natural-text-muted py-12 sm:py-16 border-t border-natural-border" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Upper Footer section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-natural-border pb-12">

          {/* Brand block */}
          <div className="space-y-4">
            <Link to="/" onClick={handleScrollToTop} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-natural-border shadow-2xs">
                <Egg className="w-5 h-5 text-natural-sage transform rotate-12" />
              </div>
              <span className="font-serif text-xl font-bold text-natural-deep tracking-tight">
                Robečský jarmark
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-natural-text-muted leading-relaxed">
              Malé rodinné hospodářství a tržiště. Poctivá vajíčka od slepic z volného výběhu, sezónní ovoce, včelí med a čerstvé domácí pečení.
            </p>
          </div>

          {/* Pickup / yard */}
          <div className="space-y-4">
            <h4 className="text-natural-deep font-serif font-bold text-sm uppercase tracking-wider">
              Odběr ze dvora
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-natural-text-muted leading-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-natural-sage shrink-0 mt-0.5" />
                <span>
                  <strong className="text-natural-dark">Adresa:</strong><br />
                  {CONTACT_DATA.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-natural-sage shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{CONTACT_DATA.pickupHours}</span>
              </li>
            </ul>
          </div>

          {/* Direct contact */}
          <div className="space-y-4">
            <h4 className="text-natural-deep font-serif font-bold text-sm uppercase tracking-wider">
              Přímý kontakt
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-natural-text-muted leading-normal">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-natural-sage shrink-0 mt-0.5" />
                <span>
                  <strong className="text-natural-dark">Telefon:</strong><br />
                  <a href={`tel:${CONTACT_DATA.phone.replace(/\s/g, '')}`} className="hover:text-natural-sage transition-colors font-mono font-bold">
                    {CONTACT_DATA.phone}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-natural-sage shrink-0 mt-0.5" />
                <span>
                  <strong className="text-natural-dark">E-mail:</strong><br />
                  <a href={`mailto:${CONTACT_DATA.email}`} className="hover:text-natural-sage transition-colors font-bold break-all">
                    {CONTACT_DATA.email}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-natural-deep font-serif font-bold text-sm uppercase tracking-wider">
              Rychlé odkazy
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-natural-text-muted">
              <li>
                <Link to="/nabidka" className="hover:text-natural-sage transition-colors font-semibold">Nabídka &amp; dostupnost</Link>
              </li>
              <li>
                <Link to="/o-hospodarstvi" className="hover:text-natural-sage transition-colors font-semibold">O hospodářství</Link>
              </li>
              <li>
                <Link to="/nase-slepice" className="hover:text-natural-sage transition-colors font-semibold">Naše slepice</Link>
              </li>
            </ul>
            <div className="pt-3 border-t border-natural-border/60">
              <Link to="/admin/login" className="text-xs text-natural-text-muted/80 hover:text-natural-sage transition-colors font-medium">
                Administrace
              </Link>
            </div>
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

        </div>

      </div>
    </footer>
  );
}
