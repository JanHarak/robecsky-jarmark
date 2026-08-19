/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/content';
import { getPublicImageUrl } from '../services/storage';
import type { Post } from '../types/database';

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    getPosts()
      .then((data) => active && setPosts(data))
      .catch((err: Error) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-deep tracking-tight mb-8">
        Aktuality
      </h1>

      {loading && <p className="text-natural-text-muted">Načítám aktuality…</p>}
      {error && (
        <p className="text-rose-600">Aktuality se nepodařilo načíst: {error.message}</p>
      )}
      {!loading && !error && posts.length === 0 && (
        <p className="text-natural-text-muted">Zatím tu nejsou žádné příspěvky.</p>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/aktuality/${post.slug}`}
            className="block bg-white border border-natural-border rounded-3xl overflow-hidden hover:shadow-md transition-shadow sm:flex"
          >
            {post.cover_image && (
              <div className="sm:w-56 aspect-video sm:aspect-auto bg-natural-bg-light shrink-0">
                <img
                  src={getPublicImageUrl(post.cover_image)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-5 space-y-2">
              {post.published_at && (
                <span className="text-xs font-mono text-natural-text-muted">
                  {new Date(post.published_at).toLocaleDateString('cs-CZ')}
                </span>
              )}
              <h2 className="font-serif text-xl font-bold text-natural-deep">
                {post.title}
              </h2>
              {post.content && (
                <p className="text-sm text-natural-text-muted line-clamp-2">
                  {post.content}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
