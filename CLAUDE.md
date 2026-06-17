# JPS Madžar — projektni CLAUDE.md
> Override-uje root `CLAUDE.md` za ovaj projekat (vidi sekciju 6 root fajla).

---

## 1. KLIJENT

**JPS Madžar** — samostalni vozač kamiona (kiper/tipper), 15+ godina iskustva, bivši vozač autobusa.
Radi isključivo na teritoriji BiH. Direktan, bez posrednika, "jedan vozač jedan dogovor".

---

## 2. STATUS

- Sajt je **napravljen i funkcionalan**, push-ovan na grani `claude/jps-madzar-website-fj9ygq` u repou `WebleyZLAb/webkeyz-os`.
- **Nije mergeovan u `main`.**
- **Deployment na Vercel još NIJE završen** — vidi sekciju 5.

---

## 3. TECH STACK (ovaj projekat, override-uje root default)

Root `CLAUDE.md` default je Next.js + Supabase + Vercel. Za ovaj projekat je **eksplicitno** korišten drugi stack (po specu klijenta):

| Sloj | Alat |
|---|---|
| Build | Vite (vanilla JS, ESM) |
| 3D scena | Three.js (procedural truck/road/dust particles) |
| Animacije / scroll | GSAP + ScrollTrigger |
| Tipografija | Barlow Condensed (Google Fonts) |
| Deployment | Vercel (planiran, vidi status ispod) |

Nema Next.js, nema Supabase, nema backend-a — čisto statički sajt.

---

## 4. STRUKTURA

```
jps-madzar/
├── index.html              # sve sekcije: hero, usluge, zasto, kontakt, footer
├── src/
│   ├── main.js              # entry point, GSAP ScrollTrigger setup, reveal animacije
│   ├── style.css             # design system (boje, tipografija, layout)
│   └── three/
│       ├── webgl-detect.js   # feature detection -> CSS fallback ako nema WebGL
│       ├── truck.js          # procedural truck (cabin + tipper bed pivot + wheels)
│       ├── road.js           # CanvasTexture asfalt + treadmill scroll ilizija
│       ├── particles.js      # dust/gravel čestice iz tipper bed-a
│       └── scene.js          # HeroScene klasa, kamera/light/render loop, tipper progress
├── vite.config.js
└── package.json
```

Boje: `--color-bg: #1a1a2e`, `--color-accent: #e07b2a` (vidi `src/style.css` za sve varijable).

---

## 5. DEPLOYMENT — PENDING

Vercel projekat `webkeyz-os` je kreiran na timu `webkeyzlabs-projects` (preko Vercel MCP integracije), ali deploy **nije uspio**:

- Root Directory je sada postavljen na `jps-madzar` (korisnik je to odradio ručno u dashboard-u).
- I dalje ne radi kako treba — korisnik nastavlja lokalno sa računara.
- Razlog zašto agent (Claude Code remote sandbox) nije mogao sam da odradi `vercel deploy`: sandbox network policy blokira izlazni pristup na `vercel.com` (`403 host_not_allowed`). Vercel MCP server ima samo read-only alate (list/get projects, deployments, logs) — nema API alat za promjenu project settings (root directory, production branch).
- **Sljedeći koraci kad se radi lokalno:**
  1. `cd jps-madzar && npm install`
  2. `npx vercel link` (povezati sa postojećim projektom `webkeyz-os` na `webkeyzlabs-projects` timu, ili napraviti novi ako se odluči da je čistije)
  3. Provjeriti Root Directory / Production Branch u Project Settings ako se i dalje koristi postojeći `webkeyz-os` projekat
  4. `npx vercel deploy` (preview) ili `npx vercel --prod` kad se odluči da je production-ready

---

## 6. POZNATI PROBLEMI / ACCEPTED RISK

- `npm audit` prijavljuje moderate/high severity na esbuild/vite — ograničeno na dev server (CSRF-like), ne utiče na production build. Vite je bump-ovan na `^5.4.21` (najnoviji 5.x patch); pun fix traži breaking upgrade na vite 8 — nije rađen.
- Google Fonts (Barlow Condensed) se ne učitava u headless test environment-u zbog sandbox network/cert issue-a — nije bug u kodu, samo environment limitacija.

---

## 7. ŠTA JE VEĆ VERIFIKOVANO

- Hero scroll-pin (tipper bed raise) radi kroz cijelu pin distancu, bez bleed-through-a iz `usluge` sekcije (popravljena dva CSS/GSAP bug-a — vidi git log za detalje).
- WebGL fallback (`html.no-webgl` CSS path) postoji u kodu, testiran samo vizualno kroz screenshot, nije dubinski proveren na realnom browseru bez WebGL-a.
- `prefers-reduced-motion` path postoji u kodu (gasi truck bob/sway i entrance animacije), nije posebno re-testiran nakon zadnjih CSS izmjena.
- Mobile/responsive layout nije posebno testiran (samo desktop 1440×900 viewport).

---

## 8. ŠTA OSTAJE (pending, opciono)

- Završiti Vercel deployment (sekcija 5).
- Zamijeniti placeholder broj telefona i lokaciju u `index.html` (`.kontakt__grid`) sa stvarnim podacima kad ih klijent pošalje.
- Opciono: re-test mobile/responsive, no-WebGL fallback, reduced-motion na stvarnom uređaju.
