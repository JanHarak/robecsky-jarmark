/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ShoppingBasket, Egg } from 'lucide-react';

interface NavbarProps {
  cartItemsCount: number;
  onCartToggle: () => void;
  onOrderScroll: () => void;
}

export default function Navbar({ cartItemsCount, onCartToggle, onOrderScroll }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Úvod', href: '#uvod' },
    { name: 'Honzíkova vejce', href: '#honzikova-vejce' },
    { name: 'Další dobroty', href: '#dalsi-dobroty' },
    { name: 'Jak nakoupit', href: '#jak-nakoupit' },
    { name: 'O nás', href: '#o-nas' },
    { name: 'Časté dotazy', href: '#faq' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-natural-cream/90 backdrop-blur-md shadow-sm py-3 border-b border-natural-border/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#uvod"
            onClick={(e) => handleLinkClick(e, '#uvod')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-natural-sage flex items-center justify-center border border-natural-sage-dark/10 shadow-sm group-hover:bg-natural-sage-dark transition-colors duration-200">
              <Egg className="w-6 h-6 text-white transform rotate-12 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-natural-deep tracking-tight block">
                Robečský jarmark
              </span>
              <span className="text-[10px] tracking-wider text-natural-sage uppercase font-mono block -mt-1 font-medium">
                S láskou ze dvora
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-natural-dark hover:text-natural-sage font-medium text-sm transition-colors duration-150 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-natural-sage after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Interactive Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Cart trigger button */}
            <button
              onClick={onCartToggle}
              className="relative p-2.5 rounded-full bg-natural-bg-light hover:bg-natural-border/20 text-natural-dark transition-all duration-150 border border-natural-border/60 shadow-xs cursor-pointer"
              aria-label="Otevřít košík"
            >
              <ShoppingBasket className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-natural-sage text-white font-mono text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-natural-cream shadow-sm animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <button
              onClick={onOrderScroll}
              className="bg-natural-sage hover:bg-natural-sage-dark text-white font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-150 border border-natural-sage-dark/10 text-sm cursor-pointer active:scale-95"
            >
              Nezávazně objednat
            </button>
          </div>

          {/* Mobile Right Container (Cart + Menu Button) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onCartToggle}
              className="relative p-2.5 rounded-full bg-natural-bg-light text-natural-dark border border-natural-border/60 shadow-sm"
              aria-label="Otevřít košík"
            >
              <ShoppingBasket className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-natural-sage text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-natural-cream shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full bg-natural-bg-light text-natural-dark border border-natural-border/60"
              aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-natural-cream/98 backdrop-blur-lg border-b border-natural-border shadow-xl transition-all duration-300 z-30">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-natural-dark hover:text-natural-sage hover:bg-natural-bg-light transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOrderScroll();
                }}
                className="w-full bg-natural-sage hover:bg-natural-sage-dark text-white font-medium py-3 px-4 rounded-xl text-center shadow-md transition-all duration-150"
              >
                Nezávazně objednat
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
