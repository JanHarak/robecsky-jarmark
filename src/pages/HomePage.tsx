/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToId } from '../lib/scroll';

import Hero from '../components/Hero';
import Features from '../components/Features';
import Products from '../components/Products';
import HowToBuy from '../components/HowToBuy';
import AboutUs from '../components/AboutUs';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';

/**
 * Unified home page: marketing sections wrapped around the live, DB-driven
 * catalogue. The site chrome (banner, nav, cart, footer) lives in RootLayout,
 * shared with every other public page.
 */
export default function HomePage() {
  const location = useLocation();

  // When arriving from another page with a queued section (e.g. "Kontakt"),
  // scroll to it once the sections are mounted.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const t = window.setTimeout(() => scrollToId(target), 60);
      return () => window.clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Hero
        onExploreScroll={() => scrollToId('honzikova-vejce')}
        onHowToBuyScroll={() => scrollToId('jak-nakoupit')}
      />
      <Features />
      <Products />
      <HowToBuy />
      <AboutUs />
      <FAQ />
      <ContactForm />
    </>
  );
}
