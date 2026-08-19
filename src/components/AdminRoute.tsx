/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Guards the admin area. This is UX protection only — real authorization is
 * enforced by RLS in the database, so even a tampered frontend cannot perform
 * admin operations.
 */
export default function AdminRoute({ children }: { children: ReactNode }) {
  const { session, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-natural-text-muted">
        Ověřuji přihlášení…
      </div>
    );
  }

  // Not logged in → go to the login page.
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in, but the account is not an administrator. Show a clear message
  // instead of silently bouncing to the homepage.
  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-natural-border rounded-[28px] shadow-2xs p-8 text-center space-y-4">
          <span className="text-4xl">🔒</span>
          <h1 className="font-serif text-2xl font-bold text-natural-deep">
            Nemáte oprávnění administrátora
          </h1>
          <p className="text-sm text-natural-text-muted leading-relaxed">
            Jste přihlášeni, ale tento účet nemá roli <strong>admin</strong>. Přihlaste se
            účtem s oprávněním administrátora, nebo požádejte o přidělení role.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={async () => {
                await signOut();
                navigate('/admin/login', { replace: true });
              }}
              className="bg-natural-sage hover:bg-natural-sage-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              Odhlásit a přihlásit jiný účet
            </button>
            <Link
              to="/"
              className="text-sm font-bold px-5 py-2.5 rounded-xl border border-natural-border text-natural-dark hover:border-natural-sage hover:text-natural-sage transition-colors"
            >
              Zpět na web
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
