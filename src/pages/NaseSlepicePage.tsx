/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Leaf, ArrowRight } from 'lucide-react';
import { useAnchorNav } from '../hooks/useAnchorNav';

interface Breed {
  origin: string;
  name: string;
  desc: string;
  egg: string;
  /** Approximate shell colour for the swatch. */
  color: string;
  /** Whether the swatch needs a visible border (light shells). */
  light?: boolean;
  /** Optional photo of the breed. When missing, a placeholder tile is shown. */
  image?: string;
}

const BREEDS: Breed[] = [
  {
    origin: 'České tradiční plemeno',
    name: 'Česká zlatá kropenka',
    desc: 'Otužilé, čilé slepičky se skvělou shánčlivostí v travnatém výběhu.',
    egg: 'Smetanově hnědé',
    color: '#E7D3B3',
    light: true,
  },
  {
    origin: 'Francouzské plemeno',
    name: 'Maranska',
    desc: 'Klidné slepice snášející velká vejce s nezaměnitelnou tmavou skořápkou.',
    egg: 'Tmavě čokoládové',
    color: '#5B3A29',
  },
  {
    origin: 'Italský původ',
    name: 'Vlaška koroptví',
    desc: 'Živé a zvídavé slepice s vysokou vitalitou a krásným zbarvením peří.',
    egg: 'Sněhově bílé',
    color: '#FFFFFF',
    light: true,
  },
  {
    origin: 'Původem z Chile',
    name: 'Araukana',
    desc: 'Bezocasé slepičky se zvláštními lícními licousy snášející pastelová vajíčka.',
    egg: 'Tyrkysově modrozelené',
    color: '#8FD8CC',
    light: true,
  },
  {
    origin: 'Anglické plemeno',
    name: 'Sasexka',
    desc: 'Přátelské a klidné slepice s vytrvalou snáškou po celý rok.',
    egg: 'Světle hnědé',
    color: '#C99E6A',
  },
  {
    origin: 'Americké plemeno',
    name: 'Hempšírka',
    desc: 'Odolné a temperamentní slepice s výbornou užitkovostí a rychlým růstem.',
    egg: 'Červenohnědé',
    color: '#A9683F',
  },
];

function EggSwatch({ color, light }: { color: string; light?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-6 h-8 shrink-0 shadow-inner ${light ? 'border border-natural-border' : ''}`}
      style={{ backgroundColor: color, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
    />
  );
}

/** Breed photo with graceful fallback to a placeholder tile. */
function BreedPhoto({ image, name }: { image?: string; name: string }) {
  const [errored, setErrored] = useState(false);

  if (image && !errored) {
    return (
      <img
        src={image}
        alt={`Plemeno ${name}`}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-natural-bg-light">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      <span className="relative text-5xl select-none group-hover:scale-110 transition-transform duration-300">🐔</span>
      <span className="relative text-[10px] font-mono uppercase tracking-wider text-natural-text-muted">
        Fotka brzy
      </span>
    </div>
  );
}

export default function NaseSlepicePage() {
  const anchorNav = useAnchorNav();

  return (
    <div className="bg-natural-cream">
      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
          Volný chov slepic
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-natural-deep tracking-tight">
          Naše slepice a pastvina
        </h1>
        <p className="text-natural-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Celodenní přístup k zelené louce, přirozené popelení a poctivé obilí. Poznejte, jak žijí naše slepičky.
        </p>
      </section>

      {/* Pasture highlight (photo + text) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Photo */}
          <div className="relative rounded-[32px] overflow-hidden border border-natural-border shadow-2xs min-h-[260px]">
            <img
              src="/src/assets/images/rustic_eggs_basket_1784042313358.jpg"
              alt="Naše slepice ve volném výběhu na zelené pastvině"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-4 left-4 bg-natural-cream/95 backdrop-blur-xs text-natural-deep text-xs font-bold px-3 py-1.5 rounded-xl border border-natural-border shadow-2xs">
              🐔 Slepice na zelené pastvině
            </span>
          </div>

          {/* Text highlight */}
          <div className="relative overflow-hidden rounded-[32px] border border-natural-border bg-gradient-to-br from-natural-sage/15 via-natural-bg-light to-natural-cream p-8 sm:p-12 flex items-center">
            <div className="absolute -top-8 -right-6 text-[8rem] opacity-15 select-none pointer-events-none">
              🐔
            </div>
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-natural-border shadow-2xs flex items-center justify-center text-natural-sage shrink-0">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-natural-sage-dark">
                  Slepice na zelené pastvině
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-natural-deep mt-1">
                  Zelený výběh
                </h2>
                <p className="text-natural-dark mt-1">
                  Více než <strong>2 000 m²</strong> čisté louky a starého sadu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flock breeds */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
            Různorodost hejna
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-natural-deep">
            Plemena v našem hejnu
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BREEDS.map((breed) => (
            <div
              key={breed.name}
              className="bg-white rounded-[28px] border border-natural-border shadow-2xs hover:shadow-sm transition-shadow overflow-hidden flex flex-col group"
            >
              {/* Photo */}
              <div className="h-44 relative overflow-hidden border-b border-natural-border-light">
                <BreedPhoto image={breed.image} name={breed.name} />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-natural-sage border border-natural-sage/25 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-2xs">
                  {breed.origin}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-grow">
                <h3 className="font-serif text-xl font-bold text-natural-deep">
                  {breed.name}
                </h3>
                <p className="text-natural-text-muted text-sm leading-relaxed flex-grow">
                  {breed.desc}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-natural-border-light">
                  <EggSwatch color={breed.color} light={breed.light} />
                  <div className="text-sm">
                    <span className="block text-[11px] uppercase tracking-wider text-natural-text-muted font-bold">
                      Barva vajec
                    </span>
                    <span className="font-semibold text-natural-deep">{breed.egg}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unified info + offer block (single bordered container, calm styling) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-[32px] border border-natural-border bg-white shadow-2xs overflow-hidden">
          <div className="p-6 sm:p-10 space-y-8">

            {/* Narrative */}
            <div className="space-y-4">
              <p className="text-natural-dark text-base leading-relaxed">
                Naše slepice mají vlastní prostor na hospodářství. Právě od nich pochází čerstvá vejce, která nabízíme podle aktuální snášky.
              </p>
              <p className="text-natural-text-muted leading-relaxed">
                Vejce z lokálního malochovu v Robči, pečlivě ručně sbíraná a připravená k osobnímu odběru přímo ze dvora. Naše slepice žijí spokojeným životem s celodenním přístupem k čerstvé zelené trávě, což dává žloutkům nezaměnitelnou sytou barvu a skvělou chuť.
              </p>
            </div>

            {/* Sale info */}
            <div className="bg-natural-bg-light border border-natural-border-light rounded-2xl p-5 text-natural-text-muted text-sm space-y-2.5">
              <h3 className="font-bold text-natural-dark flex items-center gap-1.5 text-base">
                <Info className="w-4 h-4 text-natural-sage" />
                Důležité informace o prodeji vajec
              </h3>
              <ul className="list-disc list-inside space-y-1.5 pl-1">
                <li><strong>Původ:</strong> Robečský rodinný malochov, Česká republika.</li>
                <li><strong>Způsob chovu:</strong> Volný výběh na travnatém sadu s přírodním krmením bez GMO.</li>
                <li><strong>Skladování:</strong> Skladujte v chladu od +5 °C do +12 °C, nevystavujte slunci a vlhku.</li>
                <li><strong>Datum snášky:</strong> Vždy vyznačeno na obalu při převzetí (garantujeme maximální čerstvost).</li>
                <li><strong>Úřední upozornění:</strong> Registrovaný malochov pod evidenčním číslem chovu CZ-XXXXXXXX. Prodej ze dvora v souladu s platnými veterinárními předpisy ČR.</li>
              </ul>
            </div>

            {/* Decent inline offer */}
            <div className="border-t border-natural-border-light pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-natural-deep">
                  Chcete čerstvá domácí vajíčka?
                </h3>
                <p className="text-sm text-natural-text-muted">
                  Sbíráme je denně a třídíme do balení po 6 ks.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/nabidka"
                  className="inline-flex items-center justify-center gap-1.5 bg-natural-sage hover:bg-natural-sage-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Prohlédnout nabídku
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => anchorNav('kontakt')}
                  className="inline-flex items-center justify-center text-sm font-bold px-5 py-2.5 rounded-xl border border-natural-border text-natural-dark hover:border-natural-sage hover:text-natural-sage transition-colors"
                >
                  Nezávazně objednat
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
