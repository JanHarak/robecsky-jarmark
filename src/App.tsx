/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route, Routes } from 'react-router-dom';

import AdminRoute from './components/AdminRoute';
import RootLayout from './components/RootLayout';

import HomePage from './pages/HomePage';
import OfferPage from './pages/OfferPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReservationPage from './pages/ReservationPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import OHospodarstviPage from './pages/OHospodarstviPage';
import NaseSlepicePage from './pages/NaseSlepicePage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminNewsPage from './pages/admin/AdminNewsPage';

export default function App() {
  return (
    <Routes>
      {/* Whole public site shares one layout (banner, nav, cart, footer) */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/nabidka" element={<OfferPage />} />
        <Route path="/produkt/:slug" element={<ProductDetailPage />} />
        <Route path="/rezervace" element={<ReservationPage />} />
        <Route path="/aktuality" element={<NewsPage />} />
        <Route path="/aktuality/:slug" element={<NewsDetailPage />} />
        <Route path="/o-hospodarstvi" element={<OHospodarstviPage />} />
        <Route path="/nase-slepice" element={<NaseSlepicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/produkty" element={<AdminProductsPage />} />
        <Route path="/admin/rezervace" element={<AdminOrdersPage />} />
        <Route path="/admin/sklad" element={<AdminInventoryPage />} />
        <Route path="/admin/aktuality" element={<AdminNewsPage />} />
      </Route>
    </Routes>
  );
}
