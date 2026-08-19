/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLoginPage() {
  const { session, isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in as admin → go straight to the dashboard.
  if (!loading && session && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Přihlášení se nezdařilo. Zkontrolujte e-mail a heslo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-natural-bg-light px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-natural-border rounded-3xl p-8 space-y-5"
      >
        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl font-bold text-natural-deep">
            Administrace
          </h1>
          <p className="text-sm text-natural-text-muted">Přihlaste se prosím.</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="a-email" className="block text-sm font-bold text-natural-deep">
            E-mail
          </label>
          <input
            id="a-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-natural-bg-light border border-natural-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="a-pass" className="block text-sm font-bold text-natural-deep">
            Heslo
          </label>
          <input
            id="a-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-natural-bg-light border border-natural-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage"
          />
        </div>

        {error && (
          <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-natural-sage hover:bg-natural-sage-dark disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {submitting ? 'Přihlašuji…' : 'Přihlásit se'}
        </button>
      </form>
    </div>
  );
}
