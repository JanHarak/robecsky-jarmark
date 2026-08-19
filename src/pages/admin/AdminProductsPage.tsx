/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getInventory,
  type CreateProductInput,
} from '../../services/admin';
import { getCategories } from '../../services/categories';
import { getProducts } from '../../services/products';
import { getPublicImageUrl } from '../../services/storage';
import type { InventoryRow } from '../../types/database';
import type { Category, Product } from '../../types/product';

const EMPTY: CreateProductInput = {
  name: '',
  slug: '',
  category_id: null,
  short_description: '',
  description: '',
  price: 0,
  unit: 'ks',
  availability_type: 'stock',
};

function coverUrl(p: Product): string | null {
  const imgs = p.product_images ?? [];
  if (imgs.length === 0) return null;
  const cover = imgs.find((i) => i.is_cover) ?? imgs[0];
  return getPublicImageUrl(cover.storage_path);
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stockByProduct, setStockByProduct] = useState<Record<string, InventoryRow>>({});
  const [form, setForm] = useState<CreateProductInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0); // force-reset the file input
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(() => {
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message));
    getCategories()
      .then(setCategories)
      .catch(() => {
        /* categories are optional for the form */
      });
    getInventory()
      .then((rows) => {
        const map: Record<string, InventoryRow> = {};
        for (const row of rows) map[row.product_id] = row;
        setStockByProduct(map);
      })
      .catch(() => {
        /* inventory is optional for the overview */
      });
  }, []);

  useEffect(load, [load]);

  const update = <K extends keyof CreateProductInput>(
    key: K,
    value: CreateProductInput[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setImageFile(null);
    setFileKey((k) => k + 1);
  };

  const startEdit = (p: Product) => {
    setError(null);
    setNotice(null);
    setForm({
      name: p.name,
      slug: p.slug,
      category_id: p.category_id,
      short_description: p.short_description ?? '',
      description: p.description ?? '',
      price: p.price,
      unit: p.unit,
      availability_type: p.availability_type,
    });
    setEditingId(p.id);
    setImageFile(null);
    setFileKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (p: Product) => {
    if (!window.confirm(`Opravdu smazat produkt „${p.name}"? Tuto akci nelze vrátit.`)) return;
    setError(null);
    setNotice(null);
    setBusyId(p.id);
    try {
      await deleteProduct(p.id);
      if (editingId === p.id) resetForm();
      setNotice(`Produkt „${p.name}" byl smazán.`);
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        category_id: form.category_id || null,
      };

      const saved = editingId
        ? await updateProduct(editingId, payload)
        : await createProduct(payload);

      if (imageFile) {
        try {
          await uploadProductImage(saved, imageFile, { altText: saved.name });
          setNotice(editingId ? 'Změny i obrázek byly uloženy.' : 'Produkt i obrázek byly uloženy.');
        } catch (imgErr) {
          setError(
            `Produkt byl uložen, ale obrázek se nepodařilo nahrát: ${(imgErr as Error).message}`,
          );
        }
      } else {
        setNotice(editingId ? 'Změny byly uloženy.' : 'Produkt byl vytvořen.');
      }

      resetForm();
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;
  const isEditing = editingId !== null;

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl font-bold text-natural-deep">Produkty</h1>

      {error && (
        <p className="text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3 text-sm">
          {error}
        </p>
      )}
      {notice && (
        <p className="text-natural-sage-dark bg-natural-sage/10 border border-natural-sage/25 rounded-xl p-3 text-sm">
          {notice}
        </p>
      )}

      {/* Create / edit form */}
      <form
        onSubmit={handleSubmit}
        className={`bg-white border rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ${
          isEditing ? 'border-natural-sage ring-1 ring-natural-sage/30' : 'border-natural-border'
        }`}
      >
        <div className="sm:col-span-2 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-natural-deep">
            {isEditing ? 'Upravit produkt' : 'Nový produkt'}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1 text-sm text-natural-text-muted hover:text-natural-dark"
            >
              <X className="w-4 h-4" />
              Zrušit úpravy
            </button>
          )}
        </div>

        <Field label="Název">
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Slug (URL)">
          <input required value={form.slug} onChange={(e) => update('slug', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Kategorie">
          <select
            value={form.category_id ?? ''}
            onChange={(e) => update('category_id', e.target.value || null)}
            className={inputClass}
          >
            <option value="">– bez kategorie –</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Dostupnostní typ">
          <input value={form.availability_type} onChange={(e) => update('availability_type', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Cena (Kč)">
          <input type="number" min={0} required value={form.price} onChange={(e) => update('price', Number(e.target.value))} className={inputClass} />
        </Field>
        <Field label="Jednotka">
          <input required value={form.unit} onChange={(e) => update('unit', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Krátký popis" full>
          <input value={form.short_description} onChange={(e) => update('short_description', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Popis" full>
          <textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} className={inputClass} />
        </Field>

        {/* Product image */}
        <Field label={isEditing ? 'Přidat / nahradit obrázek' : 'Obrázek produktu'} full>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-natural-bg-light border border-natural-border-light flex items-center justify-center overflow-hidden shrink-0 text-2xl">
              {previewUrl ? (
                <img src={previewUrl} alt="Náhled" className="w-full h-full object-cover" />
              ) : (
                '🖼️'
              )}
            </div>
            <div className="space-y-1">
              <input
                key={fileKey}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="block text-sm text-natural-text-muted file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-natural-sage file:text-white hover:file:bg-natural-sage-dark file:cursor-pointer cursor-pointer"
              />
              <p className="text-[11px] text-natural-text-muted">
                {isEditing
                  ? 'Nový obrázek se nastaví jako hlavní (cover). Ponechte prázdné pro zachování stávajícího.'
                  : 'Nahraje se do úložiště a nastaví jako hlavní (cover) obrázek. Volitelné.'}
              </p>
            </div>
          </div>
        </Field>

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-natural-sage hover:bg-natural-sage-dark disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl"
          >
            {saving ? 'Ukládám…' : isEditing ? 'Uložit změny' : 'Vytvořit produkt'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-xl border border-natural-border text-natural-dark font-bold hover:border-natural-sage hover:text-natural-sage transition-colors"
            >
              Zrušit
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="bg-white border border-natural-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-natural-bg-light text-natural-text-muted text-left">
            <tr>
              <th className="px-4 py-3 font-semibold w-16">Foto</th>
              <th className="px-4 py-3 font-semibold">Název</th>
              <th className="px-4 py-3 font-semibold">Kategorie</th>
              <th className="px-4 py-3 font-semibold text-right">Cena</th>
              <th className="px-4 py-3 font-semibold text-right">Skladem</th>
              <th className="px-4 py-3 font-semibold text-right">Akce</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const img = coverUrl(p);
              const busy = busyId === p.id;
              return (
                <tr
                  key={p.id}
                  className={`border-t border-natural-border-light ${editingId === p.id ? 'bg-natural-sage/5' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-natural-bg-light border border-natural-border-light overflow-hidden flex items-center justify-center text-base">
                      {img ? (
                        <img src={img} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        '🥚'
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-natural-deep">{p.name}</td>
                  <td className="px-4 py-3 text-natural-text-muted">{p.category?.name ?? '–'}</td>
                  <td className="px-4 py-3 text-right font-mono">{p.price} Kč</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {(() => {
                      const inv = stockByProduct[p.id];
                      if (!inv) return <span className="text-natural-text-muted">–</span>;
                      const unit = inv.product?.unit ?? p.unit ?? '';
                      return (
                        <span>
                          <span className="font-bold text-natural-deep">{inv.quantity_on_hand}</span>{' '}
                          <span className="text-natural-text-muted">{unit}</span>
                          {inv.quantity_reserved > 0 && (
                            <span className="block text-[11px] text-amber-700">
                              rez. {inv.quantity_reserved}
                            </span>
                          )}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-natural-bg-light border border-natural-border-light text-natural-dark hover:border-natural-sage hover:text-natural-sage transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Upravit
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={busy}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 disabled:opacity-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Smazat
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-4 text-natural-text-muted">Zatím žádné aktivní produkty.</p>
        )}
      </div>
    </div>
  );
}

const inputClass =
  'w-full bg-natural-bg-light border border-natural-border-light rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-natural-sage';

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`space-y-1 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="block text-xs font-bold text-natural-deep">{label}</span>
      {children}
    </label>
  );
}
