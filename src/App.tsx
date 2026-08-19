/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';

// Component imports
import AvailabilityBanner from './components/AvailabilityBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import HowToBuy from './components/HowToBuy';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CookieBar from './components/CookieBar';
import BackToTop from './components/BackToTop';

export default function App() {
  // Cart state: Record<productId, quantity>
  const [cart, setCart] = useState<{ [productId: string]: number }>(() => {
    try {
      const savedCart = localStorage.getItem('robec_cart');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('robec_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  // Compute Cart Items array
  const cartItems: CartItem[] = Object.keys(cart)
    .map((id) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return product ? { product, quantity: cart[id] } : null;
    })
    .filter((item): item is CartItem => item !== null);

  // Compute cart statistics
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalEstimatedPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // --- Cart Actions ---
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const currentQty = prev[product.id] || 0;
      return {
        ...prev,
        [product.id]: currentQty + 1,
      };
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setCart((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  // --- Smooth Scroll Actions ---
  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const navHeight = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 antialiased font-sans scroll-smooth selection:bg-amber-200 selection:text-amber-950">
      
      {/* Top Banner */}
      <AvailabilityBanner />

      {/* Sticky Header Nav */}
      <Navbar
        cartItemsCount={cartItemsCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onOrderScroll={() => scrollToSection('#kontakt')}
      />

      {/* Main Sections Wrapper */}
      <main className="flex-grow">
        
        {/* 1. Hero Welcome Section */}
        <Hero
          onExploreScroll={() => scrollToSection('#honzikova-vejce')}
          onHowToBuyScroll={() => scrollToSection('#jak-nakoupit')}
        />

        {/* 2. Values / Features Section */}
        <Features />

        {/* 3. Products Catalog (includes Jumbotron Honzíkova vejce + filters) */}
        <Products
          onAddToCart={handleAddToCart}
          cartItems={cart}
        />

        {/* 4. Practical Guide (Step wizard) */}
        <HowToBuy />

        {/* 5. Our Story & Testimonials */}
        <AboutUs />

        {/* 6. Accordion-based FAQs */}
        <FAQ />

        {/* 7. Contact Info & Reservation Form */}
        <ContactForm
          cartItems={cartItems}
          clearCart={handleClearCart}
          totalEstimatedPrice={totalEstimatedPrice}
        />

      </main>

      {/* Footer copyright, navigation, links */}
      <Footer />

      {/* Sliding Checkout Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        totalPrice={totalEstimatedPrice}
        onCheckoutScroll={() => scrollToSection('#kontakt')}
      />

      {/* Privacy Notice (local localStorage use) */}
      <CookieBar />

      {/* Floating Back To Top */}
      <BackToTop />
    </div>
  );
}
