/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogOut } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LINKS = [
  { to: '/admin', label: 'Přehled', end: true },
  { to: '/admin/produkty', label: 'Produkty' },
  { to: '/admin/rezervace', label: 'Rezervace' },
  { to: '/admin/sklad', label: 'Sklad' },
  { to: '/admin/aktuality', label: 'Aktuality' },
];

export default function AdminLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-natural-bg-light text-natural-dark">
      <aside className="w-56 shrink-0 bg-white border-r border-natural-border flex flex-col">
        <div className="p-5 border-b border-natural-border">
          <p className="font-serif text-lg font-bold text-natural-deep">Administrace</p>
          <p className="text-xs text-natural-text-muted truncate">
            {profile?.display_name ?? 'Přihlášen'}
          </p>
        </div>
        <nav className="flex-grow p-3 space-y-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-natural-sage text-white'
                    : 'text-natural-dark hover:bg-natural-bg-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleSignOut}
          className="m-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Odhlásit se
        </button>
      </aside>

      <main className="flex-grow p-6 sm:p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
