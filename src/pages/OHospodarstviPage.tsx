/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Users } from 'lucide-react';

interface Principle {
  num: string;
  title: string;
  desc: string;
  Icon: typeof Leaf;
}

const PRINCIPLES: Principle[] = [
  {
    num: '1',
    title: 'Bez průmyslové chemie',
    desc: 'Půdu hnojíme vlastním vyzrálým kompostem. Nepoužíváme syntetické pesticidy ani umělá hnojiva.',
    Icon: Leaf,
  },
  {
    num: '2',
    title: 'Pohoda zvířat',
    desc: 'Naše slepice i včely mají neomezený prostor v přirozeném prostředí s pestrou a zdravou stravou.',
    Icon: Heart,
  },
  {
    num: '3',
    title: 'Osobní kontakt',
    desc: 'Všechny produkty předáváme osobně ze dvora. Víte přesně, kdo vaše jídlo vypěstoval a připravil.',
    Icon: Users,
  },
];

export default function OHospodarstviPage() {
  return (
    <div className="bg-natural-cream">
      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-natural-sage font-mono font-bold block">
          Příběh hospodářství
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-natural-deep tracking-tight">
          O našem hospodářství
        </h1>
        <p className="text-natural-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Malé rodinné hospodářství založené na úctě k půdě, zvířatům a tradičním řemeslným postupům.
        </p>
      </section>

      {/* Photo band with name */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative rounded-[32px] overflow-hidden border border-natural-border shadow-2xs min-h-[320px] sm:min-h-[440px] bg-natural-bg-light">
          <img
            src="/src/assets/images/hospodarstvi.png"
            alt="Naše rodinné hospodářství – Luční Dvůr"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-4 left-4 bg-natural-cream/95 backdrop-blur-xs text-natural-deep text-xs font-bold px-3 py-1.5 rounded-xl border border-natural-border shadow-2xs">
            🌾 Robeč
          </span>
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map(({ num, title, desc, Icon }) => (
            <div
              key={num}
              className="bg-white rounded-[28px] border border-natural-border shadow-2xs hover:shadow-sm transition-shadow p-6 sm:p-7 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-natural-sage text-white font-serif font-bold text-lg flex items-center justify-center shrink-0">
                  {num}
                </span>
                <span className="w-9 h-9 rounded-xl bg-natural-sage/10 border border-natural-sage/20 text-natural-sage flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-natural-deep">{title}</h3>
              <p className="text-natural-text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unified narrative + decent offer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-[32px] border border-natural-border bg-white shadow-2xs overflow-hidden">
          <div className="p-6 sm:p-10 space-y-8">
            <p className="text-natural-dark text-base leading-relaxed">
              Jsme malé hospodářství, kde chováme slepice, pěstujeme ovoce a zeleninu a vyrábíme vlastní domácí produkty.
            </p>

            <div className="border-t border-natural-border-light pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-natural-deep">
                  Chcete ochutnat naše produkty?
                </h3>
                <p className="text-sm text-natural-text-muted">
                  Prohlédněte si, co máme právě čerstvě sklizeno a připraveno k odběru.
                </p>
              </div>
              <Link
                to="/nabidka"
                className="inline-flex items-center justify-center gap-1.5 bg-natural-sage hover:bg-natural-sage-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Přejít do nabídky
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
