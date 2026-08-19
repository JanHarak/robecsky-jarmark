/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory = 'vejce' | 'moucniky' | 'dezerty' | 'marmelady' | 'mydla' | 'esence';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  description: string;
  availability: 'skladem' | 'omezeno' | 'na_objednavku' | 'vyprodano';
  imagePlaceholderColor: string; // for high-fidelity styled CSS fallback
  badge?: 'Domácí' | 'Sezónní' | 'Novinka' | 'Na objednávku' | 'Čerstvé';
  weightOrVolume?: string;
  ingredients?: string[];
  allergens?: string[];
  storage?: string;
  instructions?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  pickupHours: string;
  instagramUrl: string;
  facebookUrl: string;
}
