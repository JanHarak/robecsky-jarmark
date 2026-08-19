/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 p-3.5 rounded-full bg-natural-sage hover:bg-natural-sage-dark text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer z-40 hover:-translate-y-1 active:scale-95 border border-natural-sage-dark/40 animate-fadeIn"
      aria-label="Přejít zpět nahoru"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
