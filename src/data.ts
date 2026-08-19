/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, FAQItem, ContactInfo } from './types';

export const PRODUCTS: Product[] = [
  // --- HONZÍKOVA VEJCE ---
  {
    id: 'vejce-6',
    name: 'Honzíkova čerstvá vejce – 6 ks',
    category: 'vejce',
    price: 36,
    unit: 'balení (6 ks)',
    description: 'Čerstvá vejce velikosti M/L z našeho vlastního malochovu v Robči. Slepice mají celodenní volný výběh na travnaté louce a jsou krmeny výhradně přírodním obilným šrotem a zbytky ze zahrady.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-amber-100 border-amber-300',
    badge: 'Čerstvé',
    weightOrVolume: 'cca 350 g',
    ingredients: ['100% čerstvá slepičí vejce'],
    allergens: ['Vejce (alergen č. 3)'],
    storage: 'Uchovávejte v chladu při stabilní teplotě od +5 °C do +12 °C. Před konzumací tepelně upravte.',
    instructions: 'Sneseno v podhůří Robečského potoka. Minimální trvanlivost je 28 dní od data snášky (vždy uvedeno na obalu).'
  },
  {
    id: 'vejce-10',
    name: 'Honzíkova čerstvá vejce – 10 ks',
    category: 'vejce',
    price: 58,
    unit: 'balení (10 ks)',
    description: 'Nejoblíbenější rodinné balení deseti čerstvých vajec z volného výběhu. Krásně žluté žloutky díky přirozené stravě a volnému pohybu na slunci.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-amber-100 border-amber-300',
    badge: 'Čerstvé',
    weightOrVolume: 'cca 580 g',
    ingredients: ['100% čerstvá slepičí vejce'],
    allergens: ['Vejce (alergen č. 3)'],
    storage: 'Uchovávejte v chladu při stabilní teplotě od +5 °C do +12 °C. Před konzumací tepelně upravte.',
    instructions: 'Vejce pocházejí z neregistrovaného domácího chovu do 100 kusů nosnic – prodej ze dvora přímo spotřebiteli.'
  },
  {
    id: 'vejce-30',
    name: 'Honzíkova čerstvá vejce – 30 ks (Plato)',
    category: 'vejce',
    price: 165,
    unit: 'plato (30 ks)',
    description: 'Velké plato čerstvých vajec pro nadšené pekařky, cukráře nebo početnější rodiny za zvýhodněnou cenu. Sbíráno ručně každé ráno.',
    availability: 'omezeno',
    imagePlaceholderColor: 'bg-amber-200 border-amber-400',
    badge: 'Sezónní',
    weightOrVolume: 'cca 1750 g',
    ingredients: ['100% čerstvá slepičí vejce'],
    allergens: ['Vejce (alergen č. 3)'],
    storage: 'Uchovávejte v chladu při stabilní teplotě od +5 °C do +12 °C. Před konzumací tepelně upravte.',
    instructions: 'Baleno na papírovém proložném platu. Vyzvednutí doporučujeme v košíku, abyste předešli poškození při přepravě.'
  },

  // --- MOUČNÍKY ---
  {
    id: 'moucnik-kolac',
    name: 'Babiččin kynutý švestkový koláč s drobenkou',
    category: 'moucniky',
    price: 180,
    unit: 'celý koláč (ø 28 cm)',
    description: 'Tradiční kynuté těsto s poctivou porcí našich domácích švestek, provoněné vanilkou a posypané křupavou máslovou drobenkou. Pečeno v ranních hodinách před předáním.',
    availability: 'na_objednavku',
    imagePlaceholderColor: 'bg-orange-50 border-orange-200',
    badge: 'Na objednávku',
    weightOrVolume: 'cca 800 g',
    ingredients: ['Pšeničná mouka', 'Švestky', 'Máslo', 'Cukr', 'Mléko', 'Droždí', 'Honzíkova vejce', 'Sůl', 'Citronová kůra'],
    allergens: ['Obiloviny obsahující lepek (pšenice - 1)', 'Vejce (3)', 'Mléko a výrobky z něj (7)'],
    storage: 'Spotřebujte nejlépe do 48 hodin od upečení. Skladujte v suchu při pokojové teplotě, chraňte před osycháním.',
    instructions: 'Pečeme výhradně na objednávku minimálně 24 hodin předem.'
  },
  {
    id: 'moucnik-babovka',
    name: 'Poctivá máslová mramorová bábovka',
    category: 'moucniky',
    price: 140,
    unit: 'ks (cca 700 g)',
    description: 'Klasická nadýchaná bábovka z pravého másla a Honzíkových vajec, s mramorovým vzorem z holandského kakaa. Skvělá k nedělní kávě nebo čaji.',
    availability: 'na_objednavku',
    imagePlaceholderColor: 'bg-orange-50 border-orange-200',
    badge: 'Domácí',
    weightOrVolume: 'cca 700 g',
    ingredients: ['Pšeničná mouka', 'Máslo', 'Cukr', 'Honzíkova vejce', 'Mléko', 'Kakao se sníženým obsahem tuku', 'Prášek do pečiva', 'Vanilkový cukr'],
    allergens: ['Obiloviny obsahující lepek (pšenice - 1)', 'Vejce (3)', 'Mléko a výrobky z něj (7)'],
    storage: 'Skladujte pod skleněným poklopem nebo v potravinové dóze při teplotě do 22 °C. Trvanlivost cca 4 dny.',
    instructions: 'Tradiční babiččin recept bez umělých náhražek a rostlinných tuků.'
  },

  // --- DEZERTY ---
  {
    id: 'dezert-pohar',
    name: 'Smetanový dezert s lesním ovocem a piškotem',
    category: 'dezert-pohar' as any, // category: 'dezerty'
    price: 45,
    unit: 'sklenička (150 ml)',
    description: 'Lehký nepečený dezert z poctivé zakysané smetany a tvarohu, proložený domácími piškoty pokapanými ovocnou šťávou a přelitý redukcí z lesního ovoce.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-red-50 border-red-200',
    badge: 'Novinka',
    weightOrVolume: '150 g',
    ingredients: ['Zakysaná smetana', 'Tvaroh', 'Lesní směs (borůvky, ostružiny, maliny)', 'Cukr', 'Dětské piškoty (pšeničná mouka, vejce, cukr)'],
    allergens: ['Obiloviny obsahující lepek (pšenice - 1)', 'Vejce (3)', 'Mléko (7)'],
    storage: 'Uchovávejte v chladničce při teplotě do +6 °C. Spotřebujte do 24 hodin od zakoupení.',
    instructions: 'Podáváno ve vratné zálohované skleničce (+10 Kč záloha není v ceně započtena).'
  },
  {
    id: 'dezert-kulicky',
    name: 'Medovníkové kuličky s vlašskými ořechy',
    category: 'dezert-pohar' as any, // category: 'dezerty'
    price: 95,
    unit: 'krabička (8 ks)',
    description: 'Sladké kuličky z domácího medového těsta, zahuštěného máslovým krémem s karamelovým salkem a obalené ve strouhaných vlašských ořeších z naší zahrady.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-yellow-50 border-yellow-200',
    badge: 'Domácí',
    weightOrVolume: 'cca 180 g',
    ingredients: ['Pšeničná mouka', 'Med', 'Máslo', 'Kondenzované slazené mléko karamelové', 'Vlašské ořechy', 'Cukr', 'Honzíkova vejce', 'Jedlá soda'],
    allergens: ['Obiloviny obsahující lepek (pšenice - 1)', 'Vejce (3)', 'Mléko (7)', 'Skořápkové plody (vlašské ořechy - 8)'],
    storage: 'Skladujte v chladu do +8 °C. Trvanlivost 7 dní od data výroby.',
    instructions: 'Vynikající jemná a sladká tečka k čaji.'
  },

  // --- MARMELÁDY ---
  {
    id: 'marmelada-jahoda',
    name: 'Jahodový džem s bezovým květem',
    category: 'marmelady',
    price: 85,
    unit: 'sklenička (210 ml)',
    description: 'Výběrový džem z čerstvě natrhaných jahod a sirupu z voňavého černého bezu, který sbíráme u Robečského potoka. Jemně želírovaný s vysokým podílem ovoce (75 %).',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-rose-50 border-rose-200',
    badge: 'Domácí',
    weightOrVolume: '230 g',
    ingredients: ['Jahody (75 %)', 'Cukr', 'Bezový extrakt', 'Želírující látka: pektin z ovoce', 'Regulátor kyselosti: kyselina citronová'],
    allergens: ['Žádné'],
    storage: 'Skladujte v suchu při teplotě do 25 °C. Po otevření uchovejte v chladu do +6 °C a spotřebujte do 14 dnů.',
    instructions: 'Zavařeno sterilací. Bez přidaných barviv a konzervantů.'
  },
  {
    id: 'marmelada-svestka',
    name: 'Poctivá švestková povidla s badyánem a rumem',
    category: 'marmelady',
    price: 90,
    unit: 'sklenička (210 ml)',
    description: 'Tradiční, dlouho tažená povidla bez přidaného želírovacího cukru. Sladkost pochází ze zralých podzimních švestek, doplněná vůní badyánu, skořice a kapkou tuzemáku pro vůni.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-purple-50 border-purple-200',
    badge: 'Sezónní',
    weightOrVolume: '240 g',
    ingredients: ['Švestky', 'Cukr', 'Tuzemský rum (0,5 % obj.)', 'Skořice', 'Badyán'],
    allergens: ['Žádné'],
    storage: 'Skladujte v temnu a chladu. Po otevření uchovávejte v lednici.',
    instructions: 'Ideální na domácí buchty, vdolky nebo jen tak na čerstvý chleba s máslem.'
  },

  // --- PŘÍRODNÍ MÝDLA ---
  {
    id: 'mydlo-mesicek',
    name: 'Měsíčkové mýdlo s kozím milkem',
    category: 'mydla',
    price: 110,
    unit: 'ks (cca 90 g)',
    description: 'Šetrné, ručně vyráběné mýdlo metodou za studena s macerátem z měsíčku lékařského a čerstvým kozím mlékem od sousedního chovatele. Zvláčňuje a zklidňuje citlivou pokožku.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-emerald-50 border-emerald-200',
    badge: 'Domácí',
    weightOrVolume: '90 g (± 5 % odpar)',
    ingredients: ['Sodné soli mastných kyselin olivového, kokosového a řepkového oleje', 'Kozí mléko', 'Macerát měsíčku lékařského', 'Bambucké máslo', 'Sušené květy měsíčku'],
    allergens: ['Mléko (v kozím mléce) - u citlivých osob může vyvolat reakci'],
    storage: 'Skladujte na suchém a tmavém místě. Po použití nechte uschnout na mýdlovce s odtokem vody.',
    instructions: '100% přírodní složení bez umělých parfémů, sulfátů a barviv. Kosmetický výrobek určený k hygieně.'
  },
  {
    id: 'mydlo-levandule',
    name: 'Levandulové mýdlo s ovesnými vločkami',
    category: 'mydla',
    price: 110,
    unit: 'ks (cca 90 g)',
    description: 'Relaxační přírodní mýdlo s esenciálním olejem z levandule lékařské. Jemně mleté ovesné vločky působí jako velmi jemný přírodní peeling, odstraňující staré buňky.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-emerald-50 border-emerald-200',
    badge: 'Novinka',
    weightOrVolume: '90 g (± 5 % odpar)',
    ingredients: ['Saponifikovaný olivový a kokosový olej', 'Bambucké máslo', 'Levandulový esenciální olej', 'Ovesné vločky mleté', 'Ultramarín (přírodní minerální barvivo)', 'Sušené květy levandule'],
    allergens: ['Obsahuje linalool a d-limonene (přirozená součást levandulového esenciálního oleje)'],
    storage: 'Skladujte v suchu, nevystavujte přímému slunci.',
    instructions: 'Vyrobeno ručně v malých šaržích s láskou k bylinkám.'
  },

  // --- VONNÉ ESENCE ---
  {
    id: 'esence-smrk',
    name: 'Přírodní vonná esence – Smrková jehličí',
    category: 'esence',
    price: 125,
    unit: 'lahvička (10 ml)',
    description: '100% čistý esenciální olej získaný šetrnou parní destilací jehličí smrku ztepilého z našich lesů. Přináší očistnou lesní vůni, čistí vzduch a navozuje atmosféru klidu.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-teal-50 border-teal-200',
    badge: 'Domácí',
    weightOrVolume: '10 ml',
    ingredients: ['100% Picea Abies Leaf Oil (smrkový esenciální olej)'],
    allergens: ['Limonene (přirozená součást esenciálních olejů)'],
    storage: 'Uchovávejte v dobře uzavřené lahvičce z tmavého skla, mimo dosah dětí, při teplotě do 20 °C. Chraňte před ohněm.',
    instructions: 'Určeno do aromalamp, difuzérů, sauny nebo k provonění potpourri. Nepoužívejte neředěné přímo na kůži.'
  },
  {
    id: 'esence-medunka',
    name: 'Zklidňující esence – Meduňka a Luční kvítí',
    category: 'esence',
    price: 135,
    unit: 'lahvička (10 ml)',
    description: 'Jemná vonná kompozice přírodních olejů s dominantní svěží, citrónovo-bylinnou vůní meduňky a divokých lučních květů z našich luk. Ideální pro večerní relaxaci a klidný spánek.',
    availability: 'skladem',
    imagePlaceholderColor: 'bg-teal-50 border-teal-200',
    badge: 'Na objednávku',
    weightOrVolume: '10 ml',
    ingredients: ['Meduňkový esenciální olej', 'Citronelový esenciální olej', 'Macerát lučních bylin v mandlovém oleji'],
    allergens: ['Citral', 'Geraniol', 'Linalool', 'Citronellol'],
    storage: 'Skladujte v chladu a temnu. Chraňte před přímým sluncem.',
    instructions: 'Pár kapek do odpařovače provoní celou místnost a navodí hluboký pocit pohody.'
  }
];

// Fix for category mismatch
PRODUCTS.forEach(p => {
  if (p.id.startsWith('dezert-')) {
    p.category = 'dezerty';
  }
});

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marie Novotná',
    role: 'Pravidelná sousedka z Robče',
    text: 'Honzíkova vajíčka kupuji každé dva týdny na doporučení. Žloutky jsou úžasně žluté, těsto na koláče s nimi úplně svítí! Navíc ten milý osobní přístup při předání je k nezaplacení.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Petr Svoboda',
    role: 'Zákazník z Litoměřic',
    text: 'Jahodový džem s bezovým květem je absolutní pecka, s dětmi jsme ho snědli na posezení. Švestkový koláč chutná přesně tak, jak si ho pamatuji ze dětství u babičky na chalupě. Doporučuji!',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Jana Horáková',
    role: 'Nadšená chovatelka a sousedka',
    text: 'Přírodní mýdlo s kozím mlékem je úžasně šetrné k mé suché pokožce. Používáme ho celá rodina a na běžná tekutá mýdla z drogerie už jsme úplně zapomněli. Skvělá řemeslná práce!',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Jak zjistím aktuální dostupnost produktů?',
    answer: 'Aktuální dostupnost zobrazujeme přímo u každého produktu (Skladem / Omezeno / Na objednávku). Vzhledem k tomu, že se jedná o maloobjemovou domácí produkci závislou na snášce a sezóně, přesný počet kusů vám vždy potvrdíme v odpovědi na vaši nezávaznou poptávku.'
  },
  {
    id: 'faq-2',
    question: 'Kde a jak si mohu objednávku vyzvednout?',
    answer: 'Osobní odběr probíhá přímo u nás v Robči (č. p. 42) po předchozí domluvě. Po odeslání poptávky vás budeme kontaktovat a domluvíme si konkrétní den a čas, který vám bude vyhovovat. Platba probíhá v hotovosti při převzetí.'
  },
  {
    id: 'faq-3',
    question: 'Je možné objednat větší množství vajec?',
    answer: 'Ano, ale u odběrů nad 30 ks (např. 2 a více plat) doporučujeme provést nezávaznou poptávku s dostatečným předstihem (cca 3-5 dní), abychom pro vás stihli čerstvá vajíčka nastřádat. Naše kapacita se odvíjí od aktuální kondice a aktivity našich nosnic.'
  },
  {
    id: 'faq-4',
    question: 'Jak dlouho dopředu je nutné objednat domácí moučník?',
    answer: 'Domácí moučníky (koláče, bábovky) pečeme vždy čerstvé, speciálně pro vaši objednávku. Je proto nutné provést poptávku alespoň 24 až 48 hodin předem, abychom stihli nakynout těsto, připravit ingredience a koláč čerstvě upéct.'
  },
  {
    id: 'faq-5',
    question: 'Jaké alergeny vaše potravinářské produkty obsahují?',
    answer: 'Alergeny jsou podrobně rozepsány u každého produktu po rozkliknutí detailu. Nejčastěji se v našem pečivu vyskytuje lepek (1), vejce (3) a mléko (7). Vejce samotná jsou přirozeným alergenem č. 3. Všechny produkty připravujeme v domácím prostředí.'
  },
  {
    id: 'faq-6',
    question: 'Nabízíte dopravu nebo zaslání poštou?',
    answer: 'Vejce, dezerty a čerstvé koláče z hygienických a bezpečnostních důvodů nezasíláme poštou – možný je pouze osobní odběr u nás v Robči. U trvanlivých produktů, jako jsou marmelády, mýdla a vonné esence, se můžeme individuálně domluvit na zaslání přes Zásilkovnu při větším odběru.'
  }
];

export const CONTACT_DATA: ContactInfo = {
  phone: '+420 774 123 456',
  email: 'info@robecskyjarmark.cz',
  address: 'Robeč 42, 411 15 Úštěk, Česká republika',
  pickupHours: 'Po - Pá: 16:00 - 19:00, So - Ne: 9:00 - 12:00 (vždy po předchozí telefonické domluvě)',
  instagramUrl: 'https://instagram.com/robecsky_jarmark',
  facebookUrl: 'https://facebook.com/robecskyjarmark'
};
