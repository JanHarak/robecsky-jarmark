/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPostBySlug } from '../services/content';
import { getPublicImageUrl } from '../services/storage';
import type { Post } from '../types/database';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    getPostBySlug(slug)
      .then((data) => active && setPost(data))
      .catch((err: Error) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-natural-text-muted">Načítám…</div>;
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        <p className="text-rose-600">Příspěvek nebyl nalezen.</p>
        <Link to="/aktuality" className="text-natural-sage font-semibold">
          ← Zpět na aktuality
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link to="/aktuality" className="text-sm text-natural-sage font-semibold">
        ← Zpět na aktuality
      </Link>
      {post.published_at && (
        <p className="mt-6 text-xs font-mono text-natural-text-muted">
          {new Date(post.published_at).toLocaleDateString('cs-CZ')}
        </p>
      )}
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight">
        {post.title}
      </h1>
      {post.cover_image && (
        <img
          src={getPublicImageUrl(post.cover_image)}
          alt={post.title}
          className="mt-6 w-full rounded-3xl border border-natural-border"
        />
      )}
      {post.content && (
        <div className="mt-8 prose prose-stone max-w-none text-natural-dark leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      )}
    </article>
  );
}
