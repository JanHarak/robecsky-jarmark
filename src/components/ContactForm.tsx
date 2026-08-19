/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { CONTACT_DATA } from '../data';
import { useReservation } from '../context/ReservationContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  ShoppingBasket,
  ArrowRight,
} from 'lucide-react';

/**
 * Homepage "Kontakt" section: contact details + a summary of the current
 * reservation. Completing the reservation (name/e-mail/etc.) happens on the
 * dedicated /rezervace page, so this section only summarises and links there.
 */
export default function ContactForm() {
  const { items, estimatedTotal, count } = useReservation();

  return (
    <section className="py-16 sm:py-24 bg-natural-cream border-t border-natural-border/50" id="kontakt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Kontakt & odběr
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
            Kde nás najdete
          </h2>
          <div className="w-16 h-1 bg-natural-sage mx-auto rounded-full mt-2" />
          <p className="text-natural-text-muted text-sm sm:text-base">
            Vyzvednutí probíhá osobně na rodinném dvoře v Robči. Máte-li vybráno, dokončete nezávaznou rezervaci a my vám potvrdíme dostupnost ze snášky a domluvíme předání.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN: CONTACT DETAILS & DIRECTIONS */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-natural-border space-y-6 shadow-2xs">
              <h3 className="font-serif text-xl font-bold text-natural-deep border-b border-natural-border-light pb-4">
                Kontaktní údaje
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-natural-sage/10 border border-natural-sage/20 flex items-center justify-center shrink-0 text-natural-sage">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-natural-text-muted">Telefon</h5>
                    <a href={`tel:${CONTACT_DATA.phone.replace(/\s/g, '')}`} className="text-natural-dark hover:text-natural-sage font-mono font-bold text-sm sm:text-base transition-colors">
                      {CONTACT_DATA.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-natural-sage/15 border border-natural-sage/25 flex items-center justify-center shrink-0 text-natural-sage-dark">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-natural-text-muted">E-mail</h5>
                    <a href={`mailto:${CONTACT_DATA.email}`} className="text-natural-dark hover:text-natural-sage font-bold text-sm sm:text-base transition-colors break-all">
                      {CONTACT_DATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#B45309]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-natural-text-muted">Místo odběru</h5>
                    <p className="text-natural-dark text-sm font-bold">
                      {CONTACT_DATA.address}
                    </p>
                    <span className="text-xs text-natural-text-muted block mt-1">Vyzvednutí probíhá přímo na rodinném dvoře v Robči.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-natural-bg-light border border-natural-border flex items-center justify-center shrink-0 text-natural-dark">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-natural-text-muted">Výdejní doba</h5>
                    <p className="text-natural-dark text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {CONTACT_DATA.pickupHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 border-t border-natural-border-light flex items-center gap-4">
                <span className="text-xs font-bold text-natural-text-muted uppercase tracking-wider">Sledujte nás:</span>
                <div className="flex gap-2">
                  <a href={CONTACT_DATA.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-natural-bg-light hover:bg-natural-sage hover:text-white text-natural-dark border border-natural-border-light transition-colors cursor-pointer" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href={CONTACT_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-natural-bg-light hover:bg-natural-sage hover:text-white text-natural-dark border border-natural-border-light transition-colors cursor-pointer" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Directions placeholder */}
            <div className="bg-white p-6 rounded-[32px] border border-natural-border overflow-hidden text-center space-y-4 shadow-2xs">
              <span className="text-3xl block">🗺️</span>
              <h4 className="font-serif font-bold text-natural-deep text-base">Jak se k nám dostanete?</h4>
              <p className="text-natural-text-muted text-xs leading-relaxed">
                Robeč je klidná vesnice nedaleko Úštěku. Náš dům s chovem slepic a sadem najdete snadno – nachází se kousek od hlavní silnice protínající obec, označen dřevěnou cedulí <strong>Honzíkova vejce</strong>. Přesnou trasu vám rádi zašleme do SMS po potvrzení.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: RESERVATION SUMMARY → separate page */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-natural-border shadow-2xs space-y-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="w-5 h-5 text-natural-sage" />
                <h3 className="font-serif text-xl font-bold text-natural-deep">Vaše rezervace</h3>
              </div>

              {count > 0 ? (
                <>
                  <div className="bg-natural-bg-light border border-natural-border-light p-4 rounded-2xl space-y-1.5 text-sm">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center text-natural-dark">
                        <span className="font-bold truncate mr-2">{item.name}</span>
                        <span className="font-mono text-natural-text-muted shrink-0">
                          {item.quantity}× {item.price} Kč
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-natural-border-light pt-2 mt-2 flex justify-between items-center font-bold text-natural-deep">
                      <span>Předběžná cena:</span>
                      <span className="font-serif text-lg">{estimatedTotal} Kč</span>
                    </div>
                  </div>

                  <Link
                    to="/rezervace"
                    className="w-full bg-natural-sage hover:bg-natural-sage-dark text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Dokončit rezervaci
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-natural-text-muted text-center">
                    Na další stránce vyplníte kontaktní údaje. Odesláním nevzniká platební povinnost.
                  </p>
                </>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <span className="text-4xl block select-none">🧺</span>
                  <p className="text-natural-text-muted text-sm">
                    Zatím nemáte vybrané žádné položky. Vyberte si z naší nabídky a přidejte je do rezervace.
                  </p>
                  <a
                    href="#honzikova-vejce"
                    className="inline-flex items-center justify-center gap-2 bg-natural-sage hover:bg-natural-sage-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Prohlédnout nabídku
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
