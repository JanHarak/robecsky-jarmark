/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPageBySlug } from '../services/content';
import type { Page } from '../types/database';

/** Renders a published static content page by its slug (e.g. o-hospodarstvi). */
export default function ContentPage({ slug }: { slug: string }) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setPage(null);
    getPageBySlug(slug)
      .then((data) => active && setPage(data))
      .catch((err: Error) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-natural-text-muted">Načítám…</div>;
  }

  if (error || !page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        <p className="text-rose-600">Stránka nebyla nalezena.</p>
        <Link to="/" className="text-natural-sage font-semibold">
          ← Zpět domů
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
        {page.title}
      </h1>
      {page.content && (
        <div className="mt-8 text-natural-dark leading-relaxed whitespace-pre-line">
          {page.content}
        </div>
      )}
    </article>
  );
}
