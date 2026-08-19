# JPS Madžar — projektni CLAUDE.md
> Override-uje root `CLAUDE.md` za ovaj projekat (vidi sekciju 6 root fajla).

---

## 1. KLIJENT

**JPS Madžar** — samostalni profesionalni vozač, 15+ godina iskustva, bivši vozač autobusa.
Radi isključivo na teritoriji BiH. Direktan, bez posrednika, "jedan vozač jedan dogovor".

Lični brend, ne korporativna transportna firma — sajt namjerno ne pominje flotu, zaposlene,
skladišta ni izmišljene brojke. Opseg usluga je namjerno opisan generalno kao **profesionalni
teretni transport** (za firme/dispečere i za fizička lica — selidbe, odvoz krupnog otpada), a ne
vezan za jedan tip vozila — vidi `PRODUCT.md` §"Capabilities and Constraints" za obrazloženje
(ranija verzija ovog fajla je vozača opisivala striktno kao "kiper/tipper" vozača; to je
korisnik eksplicitno ispravio tokom redizajna).

Potvrđeni kontakt podaci: telefon/WhatsApp/Viber `+387 66 122 171`, e-mail
`banemadzar81@gmail.com`, Instagram `@jps_madzar`.

---

## 2. STATUS

- Sajt je **kompletno redizajniran** (avgust 2026) — vidi `PRODUCT.md` i `DESIGN.md` za puni
  kontekst brenda i vizuelni sistem. Prethodna verzija (Three.js kamion hero) je u potpunosti
  zamijenjena po eksplicitnom zahtjevu klijenta ("prepravi sve, prethodno nije relevantno").
- Repo: `WebleyZLAb/jps-madzar`. Razvoj se radi na `claude/*` granama, push-ovano na remote.
- **Deployment na Vercel još NIJE završen** — vidi sekciju 5, status nepromijenjen.
- Nema potvrđenog domena — canonical/OG apsolutni URL-ovi namjerno nisu upisani u `index.html`
  (vidi HTML komentar u `<head>`); popuniti kad domen bude poznat.
- Nema stvarnih fotografija još — hero i svi photo-slotovi koriste jasno označen placeholder
  sistem (autorska SVG "cesta ka horizontu" ilustracija u hero-u, tekstualni placeholder u ostalim
  slotovima). Zamijeniti stvarnim fotografijama čim ih klijent pošalje — tačno mjesto i opis
  potrebnog kadra piše u HTML komentarima uz svaki slot.

---

## 3. TECH STACK (ovaj projekat, override-uje root default)

Root `CLAUDE.md` default je Next.js + Supabase + Vercel. Za ovaj projekat je **eksplicitno**
korišten drugi stack (po specu klijenta):

| Sloj | Alat |
|---|---|
| Build | Vite (vanilla JS, ESM) |
| Animacije / scroll | Vanilla JS (`IntersectionObserver`) + CSS transitions — **bez** biblioteke |
| Tipografija | Big Shoulders (display) + Public Sans (body) — Google Fonts |
| Deployment | Vercel (planiran, vidi status ispod) |

Nema Next.js, nema Supabase, nema backend-a — čisto statički sajt.

**Napomena (promjena u odnosu na prethodnu verziju):** Three.js (procedural kamion/road/dust
scena) i GSAP + ScrollTrigger su **uklonjeni** tokom redizajna. Brief je eksplicitno tražio
minimalan JS i "ne uvodi tešku biblioteku samo zbog nekoliko jednostavnih animacija" — sve
scroll-reveal i route-line-draw animacije su rađene čistim CSS-om + malo vanilla JS-a
(`src/main.js`, ~50 linija, poštuje `prefers-reduced-motion`). Rezultat: production build je
~22 KB HTML + ~15 KB CSS + ~1.6 KB JS (negzipovano), nula runtime zavisnosti.

---

## 4. STRUKTURA

```
jps-madzar/
├── index.html          # cijeli one-pager: hero, o meni, kako radim, relacije,
│                         zašto, realno sa ceste (IG), kontakt/CTA, footer
├── src/
│   ├── main.js          # entry point: import ./style.css + scroll reveal / route-draw JS
│   └── style.css         # design system (tokeni, komponente) — vidi DESIGN.md
├── public/
│   ├── favicon.svg      # autorska SVG oznaka (route-shield motiv)
│   └── og-image.png     # Open Graph slika, autorski render (embedded provenance)
├── PRODUCT.md           # Impeccable skill — produkt istina (brend, publika, evidencija)
├── DESIGN.md             # Impeccable skill — vizuelni sistem, tokeni, komponente
├── vite.config.js
└── package.json
```

Vizuelni pravac: "putna signalizacija / trasa puta" (road signage & route system) — vidi
`DESIGN.md` za kompletan sistem. Boje: `--color-bg: #121417` (noćni asfalt), `--color-signal:
#e2842a` (jedini committed akcenat, signal-amber) — vidi `src/style.css` za sve varijable.

---

## 5. DEPLOYMENT — PENDING

Vercel projekat `webkeyz-os` je kreiran na timu `webkeyzlabs-projects` (preko Vercel MCP
integracije), ali deploy **nije uspio**:

- Root Directory je sada postavljen na `jps-madzar` (korisnik je to odradio ručno u dashboard-u).
- I dalje ne radi kako treba — korisnik nastavlja lokalno sa računara.
- Razlog zašto agent (Claude Code remote sandbox) nije mogao sam da odradi `vercel deploy`:
  sandbox network policy blokira izlazni pristup na `vercel.com` (`403 host_not_allowed`).
  Isti tip ograničenja blokira i `impeccable.style` (skill-ov roll/bundle servis — skill je
  instaliran ručno preko GitHub klona umjesto `npx impeccable install`, vidi git log).
  Vercel MCP server ima samo read-only alate (list/get projects, deployments, logs) — nema API
  alat za promjenu project settings (root directory, production branch).
- **Sljedeći koraci kad se radi lokalno:**
  1. `cd jps-madzar && npm install`
  2. `npx vercel link` (povezati sa postojećim projektom `webkeyz-os` na `webkeyzlabs-projects`
     timu, ili napraviti novi ako se odluči da je čistije)
  3. Provjeriti Root Directory / Production Branch u Project Settings ako se i dalje koristi
     postojeći `webkeyz-os` projekat
  4. `npx vercel deploy` (preview) ili `npx vercel --prod` kad se odluči da je production-ready
  5. Nakon što je domen poznat: popuniti `<link rel="canonical">` i apsolutne `og:image`/
     `twitter:image` URL-ove u `index.html` (trenutno namjerno izostavljeni/root-relative).

---

## 6. POZNATI PROBLEMI / ACCEPTED RISK

- `npm audit` prijavljuje moderate/high severity na esbuild/vite — ograničeno na dev server
  (CSRF-like), ne utiče na production build. Vite je bump-ovan na `^5.4.21` (najnoviji 5.x
  patch); pun fix traži breaking upgrade na vite 8 — nije rađen.
- Google Fonts (Big Shoulders, Public Sans) se ne učitavaju u headless test environment-u zbog
  sandbox network/cert issue-a — nije bug u kodu, samo environment limitacija (isto ograničenje
  kao ranije sa Barlow Condensed).
- OG slika (`public/og-image.png`) je autorski render (HTML/CSS/SVG → Playwright screenshot),
  ne stvarna fotografija — u skladu je sa "nema stock/AI foto" pravilom jer nije fotografija
  nego dizajnirana grafika u istom vizuelnom sistemu kao sajt.

---

## 7. ŠTA JE VEĆ VERIFIKOVANO

Kompletan redizajn je prošao Impeccable finish-review workflow (subagent, code-led build path —
nema image generation alata u ovoj sesiji, pa nema approved comp-a za pixel-diff, ocjena je
rađena po direction contract-u iz `index.html` `<body>` komentara):

- Detektor (`node .claude/skills/impeccable/scripts/detect.mjs`) prošao čisto (0 nalaza,
  non-degraded run).
- Finish review round 1: jedan material fix (kontrast `--color-ink-faint` ispod 4.5:1 WCAG
  praga za body/placeholder tekst) — ispravljeno, verifikovano numerički (5.69:1 / 6.04:1).
- Finish review round 2 (verdict pass nakon fixa): **ship**, bez regresija, "remaining: clear".
- Production build (`npm run build`) prolazi čisto: `dist/index.html` ~22 KB, CSS ~15 KB,
  JS ~1.6 KB (negzipovano), `public/` assets (favicon, OG image) kopirani ispravno.
- 320px width: bez horizontalnog overflow-a (provjereno mjerenjem `scrollWidth` vs `clientWidth`).
- Sticky mobile CTA bar (`.mobile-bar`) provjeren na stvarnoj scroll poziciji (ne samo
  full-page screenshot, koji ima poznati Chromium artefakt za `position: fixed` elemente).
- `prefers-reduced-motion` path testiran eksplicitno (Playwright `reducedMotion: 'reduce'`
  context) — sve reveal/route-draw animacije se ispravno gase na instant prikaz.
- Desktop (1440×900) i mobile (390×844, 320px) full-page screenshot review rađen i pregledan.

**Nije verifikovano (izvan dosega ove sesije):**
- Stvarni uređaji (samo Chromium/Playwright emulacija).
- WebGL fallback — više nije relevantno, Three.js je uklonjen.
- Lighthouse/realni performance audit na produkcijskom deploy-u (Vercel deployment još nije
  završen, vidi sekciju 5).

---

## 8. ŠTA OSTAJE (pending, opciono)

- Završiti Vercel deployment (sekcija 5).
- Zamijeniti hero i "o meni"/"realno sa ceste" foto-placeholdere stvarnim fotografijama kad ih
  klijent pošalje — tačna mjesta i traženi kadar su komentarisani direktno u `index.html`.
- Kad domen bude poznat: popuniti canonical/OG apsolutne URL-ove (vidi sekciju 5, korak 5).
- Opciono: real-device retest (mobile Safari/Chrome), Lighthouse audit nakon deploy-a.
