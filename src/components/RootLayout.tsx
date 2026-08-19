/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';

import AvailabilityBanner from './AvailabilityBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from './Cart';
import CookieBar from './CookieBar';
import BackToTop from './BackToTop';

/**
 * Single shared chrome for the whole public site: info banner, the unified
 * router-aware Navbar, the reservation cart drawer, footer and floating
 * widgets. Every public route (home page included) renders inside it, so the
 * header/footer look identical everywhere.
 */
export default function RootLayout() {
  const { count } = useReservation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change (unless a section scroll is queued).
  useEffect(() => {
    const hasScrollTarget = !!(location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!hasScrollTarget) window.scrollTo({ top: 0 });
  }, [location.pathname, location.state]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 antialiased font-sans selection:bg-amber-200 selection:text-amber-950">
      <AvailabilityBanner />

      <Navbar cartItemsCount={count} onCartToggle={() => setIsCartOpen((v) => !v)} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => navigate('/rezervace')}
      />

      <CookieBar />
      <BackToTop />
    </div>
  );
}
