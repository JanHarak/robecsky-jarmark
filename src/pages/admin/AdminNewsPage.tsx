/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { getPosts } from '../../services/content';
import type { Post } from '../../types/database';

/**
 * Read-only view of published news. Creating/editing posts requires additional
 * backend endpoints (RPC or an admin-scoped table policy) that are not part of
 * the current API surface, so full CRUD is intentionally left as a follow-up.
 */
export default function AdminNewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getPosts()
      .then((data) => active && setPosts(data))
      .catch((err: Error) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-natural-deep">Aktuality</h1>

      <p className="text-sm text-natural-text-muted bg-natural-bg-light border border-natural-border-light rounded-xl p-4">
        Přehled publikovaných příspěvků. Vytváření a úpravy vyžadují doplnění
        backendových endpointů (zatím není součástí API).
      </p>

      {error && <p className="text-rose-600">Chyba: {error}</p>}
      {loading && <p className="text-natural-text-muted">Načítám…</p>}

      <div className="bg-white border border-natural-border rounded-2xl divide-y divide-natural-border-light">
        {posts.map((post) => (
          <div key={post.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-natural-deep">{post.title}</p>
              <p className="text-xs text-natural-text-muted font-mono">/{post.slug}</p>
            </div>
            {post.published_at && (
              <span className="text-xs text-natural-text-muted">
                {new Date(post.published_at).toLocaleDateString('cs-CZ')}
              </span>
            )}
          </div>
        ))}
        {!loading && posts.length === 0 && (
          <p className="p-4 text-natural-text-muted">Žádné publikované příspěvky.</p>
        )}
      </div>
    </div>
  );
}
