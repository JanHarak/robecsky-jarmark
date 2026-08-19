# Robečský jarmark – Čerstvá vejce a domácí výrobky

Kompletní, vysoce responzivní a vizuálně propracovaný web pro propagaci a prodej lokálních domácích produktů, se zaměřením na **Honzíkova vejce** a doplňkový řemeslný sortiment (koláče, dezerty, zavařeniny, ručně vyráběná mýdla a lesní esence).

---

## 🛠️ Jak spustit projekt lokálně

Pro spuštění a vývoj této aplikace potřebujete mít nainstalovaný [Node.js](https://nodejs.org/).

1. **Instalace závislostí:**
   ```bash
   npm install
   ```

2. **Spuštění vývojového serveru:**
   ```bash
   npm run dev
   ```
   Aplikace bude dostupná v prohlížeči na adrese: `http://localhost:3000`

3. **Sestavení produkční verze (Build):**
   ```bash
   npm run build
   ```

---

## 📝 Jak upravovat produkty, ceny a kontaktní údaje

Veškerá data a textový obsah aplikace jsou přísně odděleny od vykreslovací logiky, aby je mohl provozovatel snadno spravovat na jednom místě.

### 1. Změna nebo přidání produktů
Otevřete soubor **`/src/data.ts`**. V poli `PRODUCTS` najdete všechny nabízené varianty.
Chcete-li například změnit cenu 10ks balení vajec, upravte položku `price`:

```typescript
{
  id: 'vejce-10',
  name: 'Honzíkova čerstvá vejce – 10 ks',
  category: 'vejce',
  price: 65, // Zde upravte cenu v Kč
  unit: 'balení (10 ks)',
  description: 'Čerstvá vajíčka s jasně žlutými žloutky ze dvora...',
  availability: 'skladem', // Možnosti: 'skladem' | 'omezeno' | 'na_objednavku' | 'vyprodano'
  // ...
}
```

### 2. Změna kontaktních údajů a výdejních hodin
V témže souboru (**`/src/data.ts`**) vyhledejte objekt `CONTACT_DATA`. Zde můžete přímo přepsat telefonní číslo, e-mailovou adresu, sídlo i otevírací dobu:

```typescript
export const CONTACT_DATA: ContactInfo = {
  phone: '+420 774 123 456',
  email: 'info@robecskyjarmark.cz',
  address: 'Robeč 42, 411 15 Úštěk, Česká republika',
  pickupHours: 'Po - Pá: 16:00 - 19:00, So - Ne: 9:00 - 12:00...',
  instagramUrl: 'https://instagram.com/robecsky_jarmark',
  facebookUrl: 'https://facebook.com/robecskyjarmark'
};
```

### 3. Editace Často kladených otázek (FAQ)
Otázky a odpovědi lze libovolně doplňovat nebo měnit v poli `FAQS` v souboru **`/src/data.ts`**.

---

## 🏗️ Architektura a struktura souborů

Aplikace je napsána v **Reactu (19)** s **TypeScriptem** a využívá rychlý sestavovací nástroj **Vite** s plnou integrací moderního **Tailwind CSS v4** pro rychlý a dokonale čistý responzivní design bez zbytečné zátěže.

* **`/src/types.ts`**: Definice datových typů a struktur (Product, CartItem, FAQItem, ContactInfo) pro maximální typovou bezpečnost.
* **`/src/data.ts`**: Samostatný zdroj pravdy pro produkty, recenze, FAQs a kontakty.
* **`/src/components/AvailabilityBanner.tsx`**: Vrchní notifikační lišta informující o čerstvosti ranního sběru vajec.
* **`/src/components/Navbar.tsx`**: Lepkavé záhlaví s responzivním hamburger menu a počítadlem košíku.
* **`/src/components/Hero.tsx`**: Vstupní sekce s rustikálním nádechem a dvěma CTA tlačítky.
* **`/src/components/Features.tsx`**: Prezentace 4 hlavních předností malochovu ("Proč nakoupit u nás").
* **`/src/components/Products.tsx`**: Interaktivní katalog produktů rozdělený do kategorií s filtry a rozbalovacími detaily o složení/alergenech.
* **`/src/components/HowToBuy.tsx`**: Přehledný 4krokový návod na dokončení nákupu.
* **`/src/components/AboutUs.tsx`**: Příběh rodinné tradice a 3 demonstrační zákaznické recenze.
* **`/src/components/FAQ.tsx`**: Rozbalovací harmonika pro často kladené dotazy.
* **`/src/components/ContactForm.tsx`**: Rezervační formulář s validací, kontrolou duplicitního odeslání a přímým napojením na stav košíku.
* **`/src/components/Cart.tsx`**: Výsuvný postranní panel s přehledem vybraného zboží a úpravou množství.
* **`/src/components/CookieBar.tsx`**: Transparentní lišta informující o využití localStorage místo sledovacích cookies.
* **`/src/components/BackToTop.tsx`**: Plovoucí tlačítko pro rychlý návrat na začátek stránky.

---

## 🔍 Seznam věcí, které musí provozovatel doplnit před spuštěním

Před ostrým nasazením na internet je nezbytné, aby provozovatel prošel a upravil následující zástupný (placeholder) obsah:

1. **Skutečné ceny a dostupnost:** Ověřte ceny vajec a ostatního sortimentu v `/src/data.ts` podle reálných nákladů.
2. **Kontaktní údaje a adresa:** Nastavte správné číslo, e-mail a reálné popisné číslo vašeho domu v Robči v objektu `CONTACT_DATA`.
3. **Zákaznické reference:** Nahraďte 3 ukázkové recenze v poli `TESTIMONIALS` skutečným hodnocením od vašich prvních reálných odběratelů.
4. **Složení, hmotnost a alergeny:** U moučníků, mýdel i esencí pečlivě zkontrolujte ingredience a alergenní čísla, abyste splnili zákonnou povinnost o informování spotřebitele.
5. **Legislativní a spotřebitelské náležitosti:**
   - Doplňte odkaz na **Zásady ochrany osobních údajů (GDPR)** v patičce.
   - Vložte správné evidenční číslo chovu u Státní veterinární správy (SVS) – viz placeholder v detailu vajec v `/src/components/Products.tsx`.
   - Zajistěte dodržení pravidel pro **prodej ze dvora** (limit počtu nosnic do 100 ks pro zjednodušený režim prodeje konečnému spotřebiteli).
6. **Backendové napojení formuláře:** V souboru `/src/components/ContactForm.tsx` v metodě `handleSubmit` je připravené označené místo pro napojení e-mailové služby (např. Formspree) nebo vlastního e-mailového API, aby vám rezervace chodily přímo do e-mailové schránky.
