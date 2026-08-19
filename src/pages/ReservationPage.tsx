/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBasket, Send, RefreshCw } from 'lucide-react';
import { useReservation } from '../context/ReservationContext';
import { createOrder } from '../services/orders';
import type { Order } from '../types/order';

export default function ReservationPage() {
  const { items, estimatedTotal, count, setQuantity, remove, clear, toOrderItems } =
    useReservation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [note, setNote] = useState('');
  const [gdpr, setGdpr] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [availabilityChanged, setAvailabilityChanged] = useState(false);
  const [confirmed, setConfirmed] = useState<Order | null>(null);

  const validate = () => {
    const e: { [key: string]: string } = {};
    if (!name.trim()) e.name = 'Zadejte prosím své jméno.';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) e.email = 'Zadejte prosím e-mail.';
    else if (!emailRe.test(email)) e.email = 'Zadejte prosím platný e-mail.';
    if (phone.trim() && phone.replace(/\s/g, '').length < 9)
      e.phone = 'Telefonní číslo musí mít alespoň 9 číslic.';
    if (!gdpr) e.gdpr = 'Pro odeslání musíte souhlasit se zpracováním osobních údajů.';
    if (items.length === 0) e.items = 'Vaše rezervace je prázdná.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setAvailabilityChanged(false);
    if (!validate()) return;

    setSubmitting(true);
    const priceAtSubmit = estimatedTotal;
    try {
      const customerNote = [
        note.trim(),
        pickupDate.trim() ? `Preferovaný termín odběru: ${pickupDate.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const order = await createOrder({
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim() || undefined,
        customerNote: customerNote || undefined,
        items: toOrderItems(),
      });
      setConfirmed({ ...order, total_price: order.total_price ?? priceAtSubmit });
      clear();
    } catch (err) {
      // create_order can reject if stock changed between viewing and submitting.
      console.error('create_order selhal', err);
      setAvailabilityChanged(true);
      setErrors({
        submit:
          'Mezitím se změnila dostupnost některého produktu. Zkontrolujte prosím rezervaci a zkuste odeslání znovu.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // --- Success screen ---
  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-white border-2 border-natural-sage text-natural-sage flex items-center justify-center mx-auto text-3xl font-bold shadow-2xs">
          ✓
        </div>
        <h1 className="font-serif text-3xl font-bold text-natural-deep">
          Rezervace odeslána!
        </h1>
        <p className="text-natural-dark leading-relaxed">
          Vaši nezávaznou rezervaci pod kódem{' '}
          <strong className="font-mono text-natural-sage">
            {confirmed.order_number ?? confirmed.id}
          </strong>{' '}
          jsme přijali. Ozveme se vám s potvrzením dostupnosti a termínu předání.
        </p>
        <div className="p-4 rounded-2xl bg-white border border-natural-border-light text-left max-w-md mx-auto text-sm space-y-2 shadow-2xs">
          <h5 className="font-bold text-natural-deep">Co bude následovat?</h5>
          <ol className="list-decimal list-inside space-y-1 text-natural-text-muted">
            <li>Zkontrolujeme dnešní snášku a kapacitu.</li>
            <li>Do několika hodin vám zavoláme nebo napíšeme.</li>
            <li>Potvrdíme dostupnost a domluvíme čas odběru ze dvora.</li>
          </ol>
        </div>
        <Link
          to="/nabidka"
          className="inline-block bg-natural-sage hover:bg-natural-sage-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Zpět na nabídku
        </Link>
      </div>
    );
  }

  // --- Empty state ---
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-5">
        <span className="w-16 h-16 rounded-full bg-natural-bg-light border border-natural-border flex items-center justify-center mx-auto text-natural-sage">
          <ShoppingBasket className="w-7 h-7" />
        </span>
        <h1 className="font-serif text-3xl font-bold text-natural-deep">
          Vaše rezervace je prázdná
        </h1>
        <p className="text-natural-text-muted">
          Vyberte si z naší nabídky a přidejte položky do rezervace.
        </p>
        <Link
          to="/nabidka"
          className="inline-block bg-natural-sage hover:bg-natural-sage-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Prohlédnout nabídku
        </Link>
      </div>
    );
  }

  // --- Checkout ---
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-8 space-y-2">
        <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
          Dokončení rezervace
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
          Přehled a odeslání
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Order overview */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="font-serif text-lg font-bold text-natural-deep px-1">
            Přehled objednávky ({count} ks)
          </h2>

          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white border border-natural-border rounded-2xl p-3 sm:p-4 flex items-center gap-4"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-xl bg-natural-bg-light border border-natural-border-light flex items-center justify-center text-xl shrink-0 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  '🧺'
                )}
              </div>

              <div className="flex-grow min-w-0">
                <Link
                  to={`/produkt/${item.slug}`}
                  className="font-bold text-natural-deep hover:text-natural-sage text-sm sm:text-base"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-natural-text-muted font-mono">
                  {item.price} Kč / {item.unit}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setQuantity(item.productId, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-natural-bg-light border border-natural-border-light flex items-center justify-center hover:bg-natural-border/20"
                  aria-label="Snížit množství"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-mono font-bold">{item.quantity}</span>
                <button
                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-natural-bg-light border border-natural-border-light flex items-center justify-center hover:bg-natural-border/20"
                  aria-label="Zvýšit množství"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => remove(item.productId)}
                className="text-rose-500 hover:text-rose-700 p-2 shrink-0"
                aria-label="Odebrat položku"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="bg-natural-bg-light border border-natural-border-light rounded-2xl p-4 flex justify-between items-center">
            <span className="text-sm text-natural-text-muted">
              Předběžná orientační cena (potvrdíme):
            </span>
            <span className="font-serif text-2xl font-bold text-natural-deep">
              {estimatedTotal} Kč
            </span>
          </div>

          <Link
            to="/nabidka"
            className="inline-block text-natural-sage font-semibold text-sm px-1 pt-1"
          >
            ← Pokračovat v nákupu
          </Link>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-natural-border rounded-[28px] p-6 sm:p-8 space-y-5 shadow-2xs"
          >
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-natural-deep">Vaše údaje</h2>
              <p className="text-xs text-natural-text-muted">
                Odesláním nevzniká platební povinnost. Dostupnost a cenu potvrdíme.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="r-name" className="block text-sm font-bold text-natural-deep">
                Jméno a příjmení <span className="text-rose-600">*</span>
              </label>
              <input
                id="r-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="např. Jan Novák"
                className={`w-full bg-natural-bg-light border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage ${errors.name ? 'border-rose-500' : 'border-natural-border-light'}`}
              />
              {errors.name && <p className="text-rose-600 text-xs font-semibold">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="r-email" className="block text-sm font-bold text-natural-deep">
                E-mail <span className="text-rose-600">*</span>
              </label>
              <input
                id="r-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="např. jan.novak@seznam.cz"
                className={`w-full bg-natural-bg-light border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage ${errors.email ? 'border-rose-500' : 'border-natural-border-light'}`}
              />
              {errors.email && <p className="text-rose-600 text-xs font-semibold">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="r-phone" className="block text-sm font-bold text-natural-deep">
                Telefon
              </label>
              <input
                id="r-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="např. +420 777 123 456"
                className={`w-full bg-natural-bg-light border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage ${errors.phone ? 'border-rose-500' : 'border-natural-border-light'}`}
              />
              {errors.phone && <p className="text-rose-600 text-xs font-semibold">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="r-pickup" className="block text-sm font-bold text-natural-deep">
                Preferovaný termín odběru
              </label>
              <input
                id="r-pickup"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                placeholder="např. tento pátek odpoledne"
                className="w-full bg-natural-bg-light border border-natural-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="r-note" className="block text-sm font-bold text-natural-deep">
                Poznámka
              </label>
              <textarea
                id="r-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Máte specifické přání? Napište nám…"
                className="w-full bg-natural-bg-light border border-natural-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-natural-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdpr}
                  onChange={(e) => setGdpr(e.target.checked)}
                  className="mt-0.5 w-4 h-4"
                />
                <span>
                  Souhlasím se zpracováním osobních údajů pro účely vyřízení této
                  rezervace. <span className="text-rose-600">*</span>
                </span>
              </label>
              {errors.gdpr && <p className="text-rose-600 text-xs font-semibold">{errors.gdpr}</p>}
            </div>

            {errors.submit && (
              <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl p-3">
                {errors.submit}
                {availabilityChanged && (
                  <>
                    {' '}
                    <Link to="/nabidka" className="underline font-semibold">
                      Zkontrolovat nabídku
                    </Link>
                  </>
                )}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-natural-sage hover:bg-natural-sage-dark disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Odesílám rezervaci…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Odeslat nezávaznou rezervaci
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
