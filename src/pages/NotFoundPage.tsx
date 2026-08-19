/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-4">
      <span className="text-5xl">🥚</span>
      <h1 className="font-serif text-3xl font-bold text-natural-deep">
        Stránka nenalezena
      </h1>
      <p className="text-natural-text-muted">Tato adresa u nás neexistuje.</p>
      <Link
        to="/"
        className="bg-natural-sage hover:bg-natural-sage-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
      >
        Zpět na úvod
      </Link>
    </div>
  );
}
