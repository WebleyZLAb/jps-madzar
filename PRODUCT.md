# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing project, not greenfield: Vite (vanilla JS, ESM), GSAP + ScrollTrigger, Barlow Condensed (Google Fonts), static site, deployed via Vercel (see `CLAUDE.md` §5 for pending deployment steps). No framework, no backend. The previous build also used Three.js for a procedural truck/road hero scene; whether that survives the redesign is a visual-world decision for `new-work`, not a stack decision — the build tooling (Vite/GSAP) itself is not in question.

## Users

Primary: transport and logistics firms, dispatchers, and company owners in Bosna i Hercegovina who need a reliable driver or transport partner and decide fast from a phone screen.

Also primary (confirmed by owner): private individuals with a one-off transport need — household moves (selidbe), removal of bulky/oversized waste (gabaritni otpad) — who found him directly or through a referral.

Secondary: existing contacts forwarding his link as a referral; other people in the BiH trucking/transport community; potential collaborators; Instagram followers who know him from social content and may become clients later.

Job to be done: in a few seconds, understand who JPS Madžar is, what he does, why he can be trusted, and how to reach him directly — then call or message with zero friction, often starting from a phone/social referral, not a search engine.

## Product Purpose

A one-page personal-brand site that works as a modern digital business card and proof of professionalism for an independent professional driver (15+ years behind the wheel, previously a bus driver) — not a corporate logistics portal, not a fleet company. Success is measured by: more direct inquiries (call/WhatsApp/Viber/message), more work, easier discovery by transport firms, easier referrals from existing contacts, stronger personal credibility, and a link between the business side and his Instagram presence.

## Positioning

He is a named individual, not an invented logistics company. "Jedan vozač, jedan dogovor" — one person to talk to, no intermediaries, no dispatch layer. Core line: **"Vozač kojeg zovu kad je bitno."** Support line: **"Pouzdan. Tačan. Bez komplikacija."** This distinguishes him from both faceless corporate transport sites and from cheap, unreliable informal transport — the site must read as a real, specific person a client can trust with the job, not a company brochure.

## Operating Context

Works domestic relations within Bosna i Hercegovina only — no other countries, no claimed international routes. All contact is direct and personal: phone call, WhatsApp, Viber (same number for both), email, and Instagram (@jps_madzar) — no booking form, no dispatch software, no multi-step contact flow. Instagram carries authentic trucking-life content: real situations from the road, "real talk" from the transport industry, and discreet humor from daily life as a professional driver — the web presence and the social presence must read as the same person.

## Capabilities and Constraints

- Confirmed scope (per owner, overriding the earlier CLAUDE.md framing): **general professional cargo transport**, described without committing to a specific vehicle/trailer type, cargo category, license, or certification. Do not use "kiper"/"tipper" as the defining service — the owner explicitly asked to drop that framing because it excludes services he does offer (moves, bulky-waste removal) and the current brief never names a vehicle type.
- Covers both B2B engagements (transport/logistics firms, construction-material style dispatch work) and private individual jobs (selidbe, odvoz gabaritnog otpada), all framed as one direct working relationship, not a service catalog.
- Solo operator: **no fleet, no employees, no warehouses, no multiple offices**. Never imply otherwise.
- No fabricated numbers of any kind: no country counts, no delivery counts, no client counts, no invented certifications or licenses.
- No confirmed domain yet. Deployment target is Vercel (project `webkeyz-os` on team `webkeyzlabs-projects`, not yet live — see `CLAUDE.md` §5). Canonical URL and absolute Open Graph image URLs cannot be finalized; use root-relative paths and leave a clearly marked spot to fill in once the domain is confirmed.
- No real photography available yet. **Owner will supply real photos later** (truck, cabin, road, loading). Until then: no AI-generated-looking imagery, no generic/stock photography of smiling logistics teams. Build a stable, clearly labeled placeholder system for every photo slot instead, naming exactly what shot belongs there.
- Editorial-style quotes (e.g. a reflective line about the road/profession) are allowed only as clearly marked suggested marketing copy — never presented as a literal, verified quote from the owner unless he confirms it.
- The previous build's specific content (old phone number, old Instagram handle, "kiper"-only service list) is confirmed **inaccurate/generic** by the owner and must not be treated as fact or reused; only the confirmed facts below are real.

## Brand Commitments

- Name: **JPS Madžar**.
- Primary headline: "Vozač kojeg zovu kad je bitno."
- Support line: "Pouzdan. Tačan. Bez komplikacija."
- Trust line: "Relacije BiH · Direktan kontakt · Odgovoran pristup svakoj turi"
- Voice: direct, confident, human, brief, credible — zero corporate marketing cliché, zero inflated promises. Local jezik: srpski/bosanski, ijekavica, natural for BiH; no phrasing that reads like a translated English marketing deck. Banned stock phrases (owner-specified): "vaš partner za sva logistička rješenja", "lider u industriji", "vrhunska rješenja prilagođena vašim potrebama", "besprijekorna logistika", "revolucionarni pristup transportu", "sa strašću isporučujemo izvrsnost", "kompletna end-to-end rješenja", and equivalents.
- Instagram: **@jps_madzar** — https://www.instagram.com/jps_madzar?igsi=MXBiNm1zemk2YXI5Ng==

## Evidence on Hand

- Confirmed real contact details: phone/WhatsApp/Viber **+387 66 122 171**, email **banemadzar81@gmail.com**, Instagram **@jps_madzar** (URL above).
- No real photos exist in the repo yet; owner confirmed photos are coming later. Every photo slot (hero especially) needs a deliberate, professional-looking placeholder treatment with a clear content note, not a stand-in stock/AI image.
- No testimonials, no client logos, no case studies, no usable stats exist — none should be invented.
- Not yet decided: live domain (Vercel deployment pending); exact final CTA phone/WhatsApp copy nuances beyond what's specified above.

## Product Principles

1. Represent one real person, not an invented company — no fleet, staff, or warehouse language, ever.
2. Every claim on the page must be truthful and unembellished — no fabricated numbers, testimonials, or capabilities.
3. Contact must be immediate and frictionless — call/WhatsApp/Viber/email always one tap away, no multi-step forms.
4. Voice stays human and direct, confident BiH tone — no corporate marketing register, no empty superlatives.
5. Service framing stays general (professional cargo transport for firms and individuals) rather than tied to one vehicle type, so it stays true to the full scope of work the owner actually does.

## Accessibility & Inclusion

No product-specific accessibility requirement was raised beyond standard web-accessibility baseline: sufficient text contrast, visible keyboard focus states, semantic heading order, and respect for `prefers-reduced-motion` — treated as an engineering baseline for this build, not a special need.
