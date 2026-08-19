/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { CONTACT_DATA } from '../data';
import { CartItem } from '../types';
import { Phone, Mail, MapPin, Clock, Check, Send, AlertCircle, RefreshCw, Facebook, Instagram } from 'lucide-react';

interface ContactFormProps {
  cartItems: CartItem[];
  clearCart: () => void;
  totalEstimatedPrice: number;
}

export default function ContactForm({ cartItems, clearCart, totalEstimatedPrice }: ContactFormProps) {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [note, setNote] = useState('');

  // Status indicators
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [sentOrderDetails, setSentOrderDetails] = useState<{ id: string; price: number } | null>(null);

  // Auto-fill custom request based on active cart
  useEffect(() => {
    if (cartItems.length > 0) {
      const itemsString = cartItems
        .map((item) => `- ${item.product.name} (${item.quantity}x)`)
        .join('\n');
      setCustomRequest(itemsString);
    } else {
      setCustomRequest('');
    }
  }, [cartItems]);

  // Client-side Validation
  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!name.trim()) tempErrors.name = 'Zadejte prosím své celé jméno.';
    
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = 'Zadejte prosím e-mailovou adresu.';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Zadejte prosím platný e-mailový formát.';
    }

    // Phone validation
    const phoneClean = phone.replace(/\s/g, '');
    if (!phone.trim()) {
      tempErrors.phone = 'Zadejte prosím své telefonní číslo.';
    } else if (phoneClean.length < 9) {
      tempErrors.phone = 'Telefonní číslo musí mít alespoň 9 číslic.';
    }

    if (!gdprConsent) {
      tempErrors.gdpr = 'Pro odeslání musíte souhlasit se zpracováním osobních údajů.';
    }

    if (cartItems.length === 0 && !customRequest.trim()) {
      tempErrors.products = 'Váš košík je prázdný. Vyberte si prosím produkty výše nebo ručně vypište, co poptáváte.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prevent multiple parallel submissions
    setIsSubmitting(true);

    try {
      // BACKEND CONNECTION SPOT:
      // Zde můžete napojit svůj backend nebo formulářovou službu (např. Formspree, Formkeep, Netlify Forms atd.)
      // Příklad:
      // await fetch('/api/orders', {
      //   method: 'POST',
      //   body: JSON.stringify({ name, email, phone, pickupDate, note, cartItems, totalPrice: totalEstimatedPrice }),
      // });
      
      // Simulace odesílání dat (1.5 sekundy)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockOrderId = 'RJ-' + Math.floor(100000 + Math.random() * 900000);
      setSentOrderDetails({
        id: mockOrderId,
        price: totalEstimatedPrice,
      });

      setSubmitSuccess(true);
      // Reset input fields
      setName('');
      setEmail('');
      setPhone('');
      setPickupDate('');
      setNote('');
      setGdprConsent(false);
      clearCart();
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Došlo k chybě při odesílání formuláře. Zkuste to prosím znovu.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-natural-cream border-t border-natural-border/50" id="kontakt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Nezávazná rezervace
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
            Kontakt & Poptávka
          </h2>
          <div className="w-16 h-1 bg-natural-sage mx-auto rounded-full mt-2" />
          <p className="text-natural-text-muted text-sm sm:text-base">
            Máte vybráno? Pošlete nám nezávaznou poptávku. Ozveme se vám zpět, potvrdíme dostupnost ze snášky a domluvíme se na předání.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: CONTACT DETAILS & DIRECTIONS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-natural-border space-y-6 shadow-2xs">
              <h3 className="font-serif text-xl font-bold text-natural-deep border-b border-natural-border-light pb-4">
                Kontaktní údaje
              </h3>

              {/* Direct Info List */}
              <div className="space-y-6">
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
                    <a href={`mailto:${CONTACT_DATA.email}`} className="text-natural-dark hover:text-natural-sage font-bold text-sm sm:text-base transition-colors">
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
                    <p className="text-natural-dark text-xs sm:text-sm leading-relaxed">
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

            {/* Google Map / Directions placeholder */}
            <div className="bg-white p-6 rounded-[32px] border border-natural-border overflow-hidden text-center space-y-4 shadow-2xs">
              <span className="text-3xl block">🗺️</span>
              <h4 className="font-serif font-bold text-natural-deep text-base">Jak se k nám dostanete?</h4>
              <p className="text-natural-text-muted text-xs leading-relaxed">
                Robeč je klidná vesnice nedaleko Úštěku. Náš dům s chovem slepic a sadem najdete snadno – nachází se kousek od hlavní silnice protínající obec, označen dřevěnou cedulí <strong>Honzíkova vejce</strong>. Přesnou trasu vám rádi zašleme do SMS po potvrzení.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: BOOKING FORM */}
          <div className="lg:col-span-7">
            
            {submitSuccess ? (
              /* SUCCESS MESSAGE SCREEN */
              <div className="bg-[#F4F9F2] border border-[#D5E7CF] p-8 sm:p-10 rounded-[32px] text-center space-y-6 shadow-2xs animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-natural-sage text-natural-sage flex items-center justify-center mx-auto text-3xl font-bold shadow-2xs">
                  ✓
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-deep">
                    Poptávka úspěšně odeslána!
                  </h3>
                  <p className="text-natural-dark text-sm sm:text-base leading-relaxed">
                    Děkujeme vám za zájem o naše domácí dobroty. Vaši nezávaznou poptávku pod kódem <strong className="font-mono text-natural-sage font-bold">{sentOrderDetails?.id}</strong> jsme právě v pořádku přijali do systému.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-natural-border-light text-left max-w-md mx-auto text-xs sm:text-sm space-y-2 shadow-2xs">
                  <h5 className="font-bold text-natural-deep">Co bude následovat?</h5>
                  <ol className="list-decimal list-inside space-y-1 text-natural-text-muted pl-1">
                    <li>Zkontrolujeme dnešní ranní snášku a kapacitu pečiva.</li>
                    <li>Do několika hodin vám zavoláme nebo napíšeme e-mail.</li>
                    <li>Potvrdíme si dostupnost vybraných položek.</li>
                    <li>Domluvíme se na konkrétním čase, kdy se pro balíček zastavíte.</li>
                  </ol>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSentOrderDetails(null);
                    }}
                    className="bg-natural-sage hover:bg-natural-sage-dark text-white font-bold px-6 py-2.5 rounded-xl shadow-2xs transition-all duration-150 cursor-pointer text-sm"
                  >
                    Vytvořit novou poptávku
                  </button>
                </div>
              </div>
            ) : (
              /* BOOKING FORM BODY */
              <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-[32px] border border-natural-border space-y-6 shadow-2xs">
                
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-natural-deep">
                    Nezávazný poptávkový list
                  </h3>
                  <p className="text-natural-text-muted text-xs sm:text-sm">
                    Vyplňte prosím níže uvedený formulář. Odesláním nevzniká okamžitá platební povinnost. Dostupnost čerstvých vajec potvrdíme následně.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-natural-deep">
                      Celé jméno <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="např. Jan Novák"
                      className={`w-full bg-natural-bg-light border ${
                        errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-natural-border-light focus:bg-white focus:ring-natural-sage focus:border-natural-sage'
                      } rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2`}
                    />
                    {errors.name && <p className="text-rose-600 text-xs font-semibold">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-natural-deep">
                      E-mailová adresa <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="např. jan.novak@seznam.cz"
                      className={`w-full bg-natural-bg-light border ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-natural-border-light focus:bg-white focus:ring-natural-sage focus:border-natural-sage'
                      } rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2`}
                    />
                    {errors.email && <p className="text-rose-600 text-xs font-semibold">{errors.email}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-natural-deep">
                      Telefonní číslo <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="např. +420 777 123 456"
                      className={`w-full bg-natural-bg-light border ${
                        errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-natural-border-light focus:bg-white focus:ring-natural-sage focus:border-natural-sage'
                      } rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2`}
                    />
                    {errors.phone && <p className="text-rose-600 text-xs font-semibold">{errors.phone}</p>}
                  </div>

                  {/* Date of pickup */}
                  <div className="space-y-1.5">
                    <label htmlFor="pickupDate" className="block text-xs sm:text-sm font-bold text-natural-deep">
                      Preferovaný termín odběru
                    </label>
                    <input
                      type="text"
                      id="pickupDate"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      placeholder="např. zítra odpoledne, tento víkend"
                      className="w-full bg-natural-bg-light border border-natural-border-light focus:bg-white focus:ring-natural-sage focus:border-natural-sage rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2"
                    />
                  </div>
                </div>

                {/* Selected Products Text Block */}
                <div className="space-y-2 pt-2">
                  <label htmlFor="products" className="block text-xs sm:text-sm font-bold text-natural-deep flex justify-between items-center">
                    <span>Poptávané položky</span>
                    {cartItems.length > 0 && (
                      <span className="text-xs text-natural-sage bg-natural-sage/10 border border-natural-sage/20 px-3 py-1 rounded-xl font-bold">
                        Nahráno z košíku
                      </span>
                    )}
                  </label>
                  
                  {cartItems.length > 0 ? (
                    <div className="bg-natural-bg-light border border-natural-border-light p-4 rounded-2xl space-y-1 text-xs sm:text-sm">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-center text-natural-dark">
                          <span className="font-bold">{item.product.name}</span>
                          <span className="font-mono text-natural-text-muted text-right shrink-0 ml-2">
                            {item.quantity} ks × {item.product.price} Kč
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-natural-border-light pt-2 mt-2 flex justify-between items-center font-bold text-natural-deep">
                        <span>Předběžná orientační cena:</span>
                        <span className="font-serif text-lg">{totalEstimatedPrice} Kč</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea
                        id="products"
                        rows={3}
                        value={customRequest}
                        onChange={(e) => setCustomRequest(e.target.value)}
                        placeholder="Zde ručně vypište, co poptáváte (např. 20x Honzíkova vejce, 1x Babiččin švestkový koláč...)"
                        className={`w-full bg-natural-bg-light border ${
                          errors.products ? 'border-rose-500 focus:ring-rose-500' : 'border-natural-border-light focus:bg-white focus:ring-natural-sage focus:border-natural-sage'
                        } rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2`}
                      />
                      <p className="text-[11px] text-natural-text-muted italic">
                        Tip: Můžete si také vybrat položky výše v katalogu kliknutím na „Přidat do objednávky“.
                      </p>
                      {errors.products && <p className="text-rose-600 text-xs font-semibold">{errors.products}</p>}
                    </div>
                  )}
                </div>

                {/* Additional Note field */}
                <div className="space-y-1.5">
                  <label htmlFor="note" className="block text-xs sm:text-sm font-bold text-natural-deep">
                    Poznámka / Vzkaz pro nás
                  </label>
                  <textarea
                    id="note"
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Máte specifické přání? Chcete moučník bez vybraného ovoce? Napište nám..."
                    className="w-full bg-natural-bg-light border border-natural-border-light focus:bg-white focus:ring-natural-sage focus:border-natural-sage rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2"
                  />
                </div>

                {/* GDPR Consent Box */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="gdpr"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded-sm border-natural-border text-natural-sage focus:ring-natural-sage cursor-pointer"
                    />
                    <label htmlFor="gdpr" className="text-natural-text-muted text-xs sm:text-sm leading-relaxed cursor-pointer select-none">
                      Souhlasím se zpracováním osobních údajů (jméno, e-mail, telefon) pro účely vyřízení této poptávky v souladu se zásadami ochrany osobních údajů. <span className="text-rose-600">*</span>
                    </label>
                  </div>
                  {errors.gdpr && <p className="text-rose-600 text-xs font-semibold">{errors.gdpr}</p>}
                </div>

                {/* Submitting button with load states to prevent duplicate clicks */}
                <div className="pt-2 border-t border-natural-border-light">
                  <div className="bg-natural-bg-light border border-natural-border-light p-3.5 rounded-2xl text-center mb-4">
                    <span className="text-xs text-natural-deep font-bold block leading-normal">
                      ⚠️ Odesláním formuláře vytvoříte poptávku. Dostupnost a termín předání vám následně potvrdíme.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 border cursor-pointer ${
                      isSubmitting
                        ? 'bg-natural-bg-light border-natural-border text-natural-text-muted cursor-not-allowed'
                        : 'bg-natural-sage hover:bg-natural-sage-dark text-white border-natural-sage shadow-2xs hover:shadow-sm'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Odesílám poptávku, vyčkejte...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Odeslat nezávaznou poptávku</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
