# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` – start the Vite dev server on `http://localhost:3000` (binds `0.0.0.0`).
- `npm run build` – produce the production bundle in `dist/`.
- `npm run preview` – serve the built bundle locally.
- `npm run lint` – type-check the whole project with `tsc --noEmit`. This is the only automated check in the repo; there is no test suite, no ESLint, and no formatter. Run it before considering a change done.
- `npm run clean` – remove `dist` and `server.js`.

## Architecture

Storefront site for a Czech family farm ("Robečský jarmark" / "Honzíkova vejce"). Stack: **React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router 6 + Supabase**. Everything runs on **one shared reservation** and **live Supabase data**:

1. **Unified home page** at `/` – marketing sections (Hero, Features, story, FAQ, contact) wrapped around a **live, DB-driven product catalogue**. The catalogue, the cart drawer, and the contact/reservation form all read/write the single `ReservationContext`, and the form submits through the `create_order` RPC.
2. **Dedicated public pages** at `/nabidka` (full catalogue), `/produkt/:slug`, `/rezervace`, `/aktuality*`, content pages – same Supabase data and same reservation as the home page.
3. **Admin area** under `/admin/*` – Supabase-Auth-gated management of orders, inventory, and products.

- **`src/main.tsx`** mounts the tree wrapped in `BrowserRouter` → `AuthProvider` → `ReservationProvider`.
- **`src/App.tsx`** is just the route table (see routing below).
- **`src/pages/`** holds one component per route. `HomePage.tsx` composes the marketing sections around the live catalogue. `src/pages/admin/` holds the admin pages and `AdminLayout`.
- **`src/components/`** holds the marketing section components (Navbar, Hero, Features, HowToBuy, AboutUs, FAQ, Footer, CookieBar, AvailabilityBanner, BackToTop) plus the unified pieces that are now Supabase-backed: `Products` (home-page catalogue via `useCatalog`), the `Cart` drawer, and `ContactForm` (all consume `ReservationContext`). **Checkout happens on the dedicated `/rezervace` page** (`ReservationPage`): the cart's "Dokončit rezervaci" button and the homepage `ContactForm`'s summary both link there, and `ReservationPage` shows the order overview + contact form and is the only place that calls `create_order`. The homepage `ContactForm` (`#kontakt`) is now contact-info + a reservation summary, not a submitting form. Shared helpers: `RootLayout` (the one public chrome), `Navbar` (unified router-aware header), `AdminRoute`, `AvailabilityBadge`, and **`ProductCard`** – the single card rendered by BOTH the home-page catalogue and the `/nabidka` page (they also share the same `useCatalog` + category-tab logic), so keep the two visually identical by editing `ProductCard`, not one page.

> **One reservation, everywhere.** There is a single cart: `ReservationContext` (localStorage key `robec_reservation`). `Products`, `Cart`, `ContactForm`, `ProductDetailPage`, and `ReservationPage` all use it; only `ReservationPage` submits it via `create_order`. The old per-page `robec_cart` and the mock contact-form submit have been removed.

### Routing (`src/App.tsx`)

**All** public routes (home page included) render inside one shared **`RootLayout`** (`<Outlet/>`) so the chrome is identical everywhere: `AvailabilityBanner`, the unified sticky `Navbar`, the `Cart` drawer (open-state owned here), `Footer`, `CookieBar`, `BackToTop`. Public routes: `/`, `/nabidka`, `/produkt/:slug`, `/rezervace`, `/aktuality`, `/aktuality/:slug`, `/o-hospodarstvi`, `/nase-slepice`. The content pages `/nase-slepice` (`NaseSlepicePage.tsx`, flock breeds + pasture) and `/o-hospodarstvi` (`OHospodarstviPage.tsx`, farm story + principles) are **bespoke hand-designed static pages**. The generic DB-driven `ContentPage` (reads the `pages` table) is currently wired to no route – kept for future DB-backed pages. Admin pages render inside `AdminLayout`, wrapped by `AdminRoute`: `/admin/login` (unguarded) and guarded `/admin`, `/admin/produkty`, `/admin/rezervace`, `/admin/sklad`, `/admin/aktuality`.

**Navigation & scrolling.** `Navbar` is router-aware and used on every public page. Route links use `<Link>`; homepage section links (e.g. "Jak nakoupit", "Kontakt") go through `useAnchorNav` (`src/hooks/`), which scrolls via `scrollToId` (`src/lib/scroll.ts`) when already on `/`, otherwise navigates to `/` with `state.scrollTo` and `HomePage` performs the scroll on arrival. `RootLayout` also scrolls to top on route change unless a section scroll is queued. There is no more separate `SiteLayout` — it was replaced by `RootLayout`.

### Supabase data layer

Queries never live in components – they go through a layered structure:

- **`src/lib/supabase.ts`** – the singleton browser client, created from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (throws if either is missing). `.env` is required; copy `.env.example`.
- **`src/services/*.ts`** – one module per domain (`categories`, `products`, `orders`, `content`, `admin`, `auth`, `storage`). All DB access lives here. Each function throws on `error` and returns `data`.
- **`src/hooks/`** – `useAuth` (auth context: session + profile + `isAdmin`), `useCatalog` (home-page catalogue: products + categories + per-product availability), `useProducts`, `useProduct` (product + live availability, with `refreshAvailability`).
- **`src/context/ReservationContext.tsx`** – the single reservation "cart" (`localStorage` key `robec_reservation`), used app-wide. Items store `{productId, slug, name, price, unit, quantity, image?}`; `toOrderItems()` yields the `{product_id, quantity}` payload for `create_order`.
- **`src/types/`** – `product.ts`, `order.ts`, `database.ts` model the DB rows and RPC shapes.

**Critical backend contracts (do not bypass):**
- **Never read `inventory` publicly**; get customer-facing stock from the `get_product_availability` RPC.
- **Never INSERT into `orders`/`order_items` from the client.** Reservations go through the `create_order` RPC (it locks stock in one transaction). This RPC can legitimately fail if stock changed between view and submit – `ReservationPage` surfaces that as a human message and points the user back to the offer.
- **Never send client-side prices** to the backend; `create_order` takes only `{ product_id, quantity }` and resolves the authoritative price server-side.
- Order lifecycle and stock changes are RPCs too: `confirm_order`, `mark_order_ready`, `complete_order`, `reject_order`, `cancel_order`, `add_stock`.
- Product images live in the **`farm-public`** storage bucket; resolve `storage_path` via `getPublicImageUrl` in `services/storage.ts`. Admins add a product photo via `uploadProductImage` (`services/admin.ts`) — it uploads the file to `farm-public` (path `products/<slug>/<ts>-<name>`) then inserts a `product_images` row as the cover (and unsets any previous cover); wired into `AdminProductsPage`. That page does full product CRUD: create, **edit** (the row's "Upravit" button loads the product into the same form → `updateProduct`), and **delete** (`deleteProduct`, with confirm); each edit/create can also upload/replace the cover image.
- **Security model:** `AdminRoute` and the `profiles.role` check are **UX only**. Real authorization is enforced by Postgres **RLS**. Only ever put the publishable/anon key in `VITE_` vars – never a `service_role`/secret key, DB password, or connection string.

### Marketing content (`src/data.ts`)

**`src/data.ts`** now supplies only static marketing content: `TESTIMONIALS` (AboutUs), `FAQS` (FAQ), and `CONTACT_DATA` (ContactForm's contact column). Products come from the DB, so **`PRODUCTS` is legacy/unused** – do not wire the catalogue back to it. `src/types.ts` still types those legacy shapes and is kept for `data.ts` itself; live product/order types live in `src/types/`.

The UI language is **Czech** throughout (labels, validation messages, copy). Keep new user-facing strings in Czech.

### Styling

Tailwind CSS v4 via the `@tailwindcss/vite` plugin – there is **no `tailwind.config.js`**. The theme is defined in **`src/index.css`** inside an `@theme` block: fonts (`font-serif` = Fraunces, `font-sans` = Inter, `font-mono` = JetBrains Mono, loaded from Google Fonts) and a custom `natural-*` color palette (e.g. `bg-natural-cream`, `text-natural-deep`, `border-natural-border`). Prefer these tokens over ad-hoc hex values to stay consistent. Icons come from `lucide-react`; `motion` is available for animation.

### Known placeholders / not-yet-wired

- **`AdminNewsPage` is read-only.** Listing published posts works, but creating/editing posts needs additional backend endpoints (an RPC or admin-scoped table policy) that are not yet in the API surface.
- `@google/genai`, `express`, and `dotenv` are declared dependencies and `metadata.json`/old `.env.example` notes reference a `GEMINI_API_KEY` and an Express server, but **none of this is used in `src/`** – it is leftover Google AI Studio scaffolding. There is no `server.js`. Do not assume a Gemini or server integration exists.
- New code (services/hooks/pages/context) uses **relative imports**, matching the existing components. The `@` alias resolves to the project root in `vite.config.ts`/`tsconfig.json` but is not used.
- `@types/react` / `@types/react-dom` were added as devDependencies so `npm run lint` (`tsc`) type-checks JSX properly; without them all React types silently degrade to `any`.

Before going live, several placeholders in `data.ts` and `components/Products.tsx` must be filled in (real prices, address, testimonials, allergen numbers, farm registration number, GDPR link). See the checklist in `README.md`.
