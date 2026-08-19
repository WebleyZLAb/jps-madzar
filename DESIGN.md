---
name: JPS Madžar
description: A one-page digital business card for an independent BiH transport driver, styled as road signage — trust read in one glance, not sold.
colors:
  night-asphalt: "#121417"
  asphalt-raised: "#1b1e23"
  asphalt-sunk: "#0b0c0e"
  signage-ink: "#f5f2ea"
  signage-ink-dim: "#a9adb6"
  signage-ink-faint: "#8b8f98"
  signal-amber: "#e2842a"
  signal-amber-ink: "#1a1204"
  signal-amber-dim: "rgba(226, 132, 42, 0.16)"
  signal-amber-line: "rgba(226, 132, 42, 0.45)"
  hairline: "rgba(245, 242, 234, 0.12)"
  hairline-strong: "rgba(245, 242, 234, 0.22)"
typography:
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.005em"
    textTransform: "uppercase"
  body:
    fontFamily: "Public Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Public Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    letterSpacing: "0.03em"
    textTransform: "uppercase"
rounded:
  sm: "3px"
  md: "4px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 3rem)"
  section-block: "clamp(4.5rem, 9vw, 7.5rem)"
  container-max: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.signal-amber-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.5em"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#ef9440"
    textColor: "{colors.signal-amber-ink}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.5em"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signage-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.5em"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.signal-amber}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.5em"
    height: "48px"
  photo-slot:
    backgroundColor: "{colors.asphalt-sunk}"
    textColor: "{colors.signage-ink-faint}"
    rounded: "{rounded.md}"
    padding: "2rem"
  sign-heading:
    backgroundColor: "transparent"
    textColor: "{colors.signage-ink}"
    typography: "{typography.headline}"
    padding: "0.2em 0"
---

# Design System: JPS Madžar

## Overview

**Creative North Star: "The Road Sign, Not the Billboard"**

The site reads the way a road sign reads: high contrast, one glance, no persuasion attempt. Trust is communicated by clarity and restraint, not by decoration — a night-asphalt ground, one committed amber signal color, condensed uppercase display type standing in for signage lettering, and a single recurring device (a route line with waypoint dots) that ties every section together as one continuous route from hero to final call-to-action. This is a direct rejection of the soft corporate-fleet dashboard look: no card grids, no glassmorphism, no gradient-as-decoration, no neon glow on the accent.

The build honors this thesis literally rather than referencing it: sections are joined edge-to-edge with hairline rules (not floating cards), the "Kako radim" list is a vertical route with dashed line and waypoint dots rather than a feature grid, and the "Relacije" section renders an actual drawn SVG route line as its illustration. Photo slots (hero, "Iza volana", "Realno sa ceste") are honest, labeled placeholders — bordered frames with a camera-style mark and a text note naming exactly what shot belongs there — because no real photography exists yet (confirmed in PRODUCT.md); nothing pretends to be a finished photograph.

**Key Characteristics:**
- Near-black asphalt ground with one matte-amber signal color, used in bands (rules, dots, CTAs, route strokes) rather than sprinkled as micro-accents
- Big Shoulders (condensed, uppercase, display) paired with Public Sans (body) — a two-family system, no third face
- Rectangular geometry throughout: 3–4px radii only, hairline dividers instead of shadows or cards
- One recurring signature device — the route line / waypoint dot — used literally in both the process list and the relations map
- Honest, labeled placeholder frames for every unavailable photo, never stock or AI-styled imagery

## Colors

Palette strategy is deliberately narrow: one dark ground family, one ink family, one committed accent. No secondary or tertiary accent exists in the build.

### Primary
- **Signal Amber** (`#e2842a`): the single accent color for the whole system. Used for primary CTA fills, focus outlines, hover states, the route-line stroke and waypoint dots, the sign-panel corner tick, active/hover text on ghost links, and inline emphasis inside the hero headline (`<em>`). Deliberately matte — never combined with a glow, blur, or gradient halo. Its ink pairing (`#1a1204`) is used as text-on-amber for contrast, not black.

### Neutral
- **Night Asphalt** (`#121417`): base page background.
- **Asphalt Raised** (`#1b1e23`): the alternating band background for "O meni," "Relacije," and the pull-quote card — used to separate sections without a shadow or card border-radius jump.
- **Asphalt Sunk** (`#0b0c0e`): the deepest tone, used for the hero, the "Realno sa ceste" band, the final CTA/footer band, and inside photo-slot frames — reserved for full-bleed or frame-interior surfaces, not general section background.
- **Signage Ink** (`#f5f2ea`): primary text color, an off-white (never pure white) that reads as painted signage lettering.
- **Signage Ink Dim** (`#a9adb6`): body copy and supporting paragraph text.
- **Signage Ink Faint** (`#8b8f98`): the quietest tier — labels, placeholder-frame copy, footer meta text.
- **Hairline** (`rgba(245,242,234,0.12)`) / **Hairline Strong** (`rgba(245,242,234,0.22)`): the two-weight border/divider system. Hairline separates list items and sections; Hairline Strong frames photo slots, the relations map panel, and the pull-quote card.

### Named Rules
**The One Accent Rule.** Amber is the only chromatic color in the system. It never appears as a secondary tint, a gradient stop, or a soft glow — only as a flat fill, a flat stroke, or flat text color, always at full or near-full saturation where it appears at all.

**The Band, Not Sprinkle Rule.** Amber shows up as a deliberate mark (a CTA fill, a rule, a dot, a stroke) rather than as decorative micro-accents scattered across a layout. If a screen has more than a small handful of amber marks, the design has drifted from this system.

## Typography

**Display Font:** Big Shoulders (with Arial Narrow, sans-serif fallback)
**Body Font:** Public Sans (with -apple-system, Segoe UI, sans-serif fallback)

**Character:** A condensed, uppercase, heavy-weight display face reads as painted road-sign lettering; Public Sans carries all reading copy in a plain, civic-grade grotesk with no personality of its own — the pairing puts all of the system's voice into the display face and none into the body.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 9vw, 5.5rem)`, line-height 0.96): the hero `<h1>` only.
- **Headline** (700, `clamp(2rem, 5.5vw, 3.4rem)`, line-height 0.96): every section's `<h2>`, always uppercase, always wrapped in the `.sign` panel device (see Components).
- **Title** (700, `1.5rem`, line-height 0.96, uppercase): sub-headings inside a component, e.g. each "Kako radim" waypoint title.
- **Body** (400, `1.08rem` in text blocks / `16px` base, line-height 1.55): all paragraph copy; measure capped at 62–68ch (`.measure`).
- **Label** (500, `0.75–0.95rem`, letter-spacing 0.02–0.03em, uppercase): buttons, nav, contact-line labels, trust line, footer meta.

All headings (`h1`–`h3`) are uppercase with tight/negative letter-spacing and a line-height near 1 by base rule, not a per-component override — this is a global type rule, not a component choice.

### Named Rules
**The Uppercase-Display Rule.** Every heading-level element renders in Big Shoulders, uppercase, at a line-height near 1. Body and label text never adopt the display face; the two families never mix within one text run.

## Layout

Single-column, one-page scroll: `header` (sticky top bar) → `hero` → `about` → `principles` → `relations` → `why` → `social` → `cta-final` → `footer`, plus a `position: fixed` two-item contact bar that appears only below 720px. Content is constrained by a shared `.container` (max-width 1180px, fluid inline padding via `clamp(1.25rem, 5vw, 3rem)`). Section vertical rhythm is a single clamp value (`clamp(4.5rem, 9vw, 7.5rem)` block padding) applied uniformly to every `<section>` — no section gets a bespoke padding override.

Section backgrounds alternate between three fixed dark tones (sunk / base / raised) to separate content bands, each division marked by a 1px hairline top/bottom border rather than a shadow, margin gap, or corner radius. Two-column grids (`about`, `relations`, `social`, `why`) collapse to one column below 860px and split roughly 45/55 or 50/50 above it — always image-slot-plus-text or content-plus-device, never a 3+ column grid. The mobile-only fixed bottom bar (`Pozovi` / `Poruka`, two equal columns, 56px min height) exists specifically because the direct-contact job-to-be-done requires zero-friction contact on phone screens; body gets matching bottom padding below 720px to avoid overlap.

## Elevation & Depth

Flat by construction: there is no shadow vocabulary in the system beyond one small utility (`0 0 0 4px var(--color-bg)` as a background-colored ring around the route waypoint dot, used to punch it out from the dashed line behind it — not a drop shadow). Depth and separation are conveyed entirely through hairline borders, background-tone banding (sunk/base/raised), and a translucent `backdrop-filter: blur()` on the sticky top bar and mobile contact bar only (a functional legibility aid for content scrolling underneath, not a decorative glass panel).

### Named Rules
**The Flat Ground Rule.** No component uses `box-shadow` for lift or depth. Separation between surfaces is done with a 1px hairline border and/or a background-tone step, never a shadow.

## Shapes

Rectangular geometry throughout, with radius used only as a light edge-softener, never as a rounded-card signature: 3px (`--radius-s`) on buttons, the brand shield, and the top-bar call pill; 4px (`--radius-m`) on the larger framed panels (photo slots, the relations-map panel, the pull-quote card). Nothing in the system exceeds 5px of radius, and nothing is circular except the waypoint dots and the Instagram icon's rounded-square badge. Borders are hairline (1–1.5px) and low-opacity by default, stepping to `--color-signal` only as a hover/active or emphasis state (e.g. the photo-slot's inset amber frame line, ghost-button hover border). Photo-placeholder frames and the pull-quote card share one visual grammar: a bordered rectangle at `--radius-m` with a centered icon-plus-caption mark, not a filled illustration.

## Components

### Buttons
- **Shape:** rectangular with a 3px radius (`--radius-s`), 1.5px border (transparent on primary, hairline-strong on ghost), minimum 48px tap height.
- **Primary:** amber fill (`#e2842a`) with dark-ink text (`#1a1204`), uppercase Big Shoulders label, `0.95em 1.5em` padding. Used for the single most important action per section (`Pozovi direktno`, `Pozovi JPS Madžar`).
- **Ghost:** transparent fill, hairline-strong border, ink-colored text; used for the secondary action in any given group (`Pošalji poruku`, `WhatsApp poruka`, `Viber poruka`, `Provjeri dostupnost`).
- **Hover / Focus:** primary lightens to `#ef9440`; ghost border and text both shift to signal amber. Every button carries a trailing arrow glyph that nudges 3px right on hover (`transform: translateX(3px)`, 180ms). Focus-visible on all interactive elements is a 2px amber outline with 3px offset — never suppressed.

### Cards / Containers
- **Corner Style:** 4px radius (`--radius-m`).
- **Background:** photo-slot frames sit on `--color-bg-sunk`; the pull-quote card sits on `--color-bg-raised`; the relations-map panel sits on `--color-bg-sunk`.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px `--color-line-strong`, with the photo-slot frame adding an inset 1px amber line at 35% opacity, 10px in from the edge, as its one accent touch.
- **Internal Padding:** `clamp(1.75rem, 4vw, 3rem)` depending on container.

### Navigation
- **Top bar:** sticky, translucent dark background with blur, hairline bottom border. Brand mark is a bordered amber-outlined initials badge ("JM") plus wordmark, both in Big Shoulders uppercase. A single amber-outlined `Pozovi` pill sits opposite, filling solid amber on hover.
- **Mobile bar:** fixed to viewport bottom below 720px only, two equal-width actions (call filled amber, message ghost with a left hairline divider), safe-area-aware bottom padding.

### Route Line / Waypoint Device (signature component)
The system's one recurring signature motif, used in two literal expressions that share the same visual grammar (amber dashed stroke, solid amber circular waypoints):
1. **Manifest list** ("Kako radim"): a vertical dashed amber line runs down the left edge of a stacked list, with a solid amber dot marking each item — each principle is a waypoint on one route, not a card in a grid.
2. **Route map** ("Relacije"): an SVG path with a dashed amber stroke draws itself in on scroll reveal (`stroke-dashoffset` animated via measured path length in `main.js`), start and end marked by solid amber circles, ending at a labeled destination row.
Both instances draw from the same `--color-signal` / `--color-signal-line` tokens and the same dot styling — this is intentionally one device reused, not two separate illustrations.

### Section Heading ("Sign panel")
Every `<h2>` is wrapped in `.sign`: an inline block with a short (1.6em) solid-amber tick positioned above-left of the text, standing in for a destination-sign corner marker. This is the system's replacement for a kicker/eyebrow label — see Do's and Don'ts.

## Do's and Don'ts

### Do:
- **Do** keep amber (`#e2842a`) as the only chromatic color in the system; every other color is a neutral asphalt or ink tone.
- **Do** use the `.sign` corner-tick device on every section heading instead of a small label line above it.
- **Do** separate sections with a hairline border and a background-tone step (sunk/base/raised), never a shadow or a rounded card boundary.
- **Do** build any new photo slot as a bordered, labeled placeholder frame naming the exact shot needed, matching the existing `photo-slot` pattern, until real photography exists.
- **Do** keep the route-line/waypoint-dot grammar consistent (dashed amber stroke, solid amber circle) anywhere it's reused; don't introduce a second illustration style for the same idea.
- **Do** cap radius at 4px anywhere in the system; treat anything larger as off-system.

### Don't:
- **Don't** add a kicker/eyebrow label above headings — the `.sign` corner-tick device is the system's answer to that pattern and replaces it everywhere.
- **Don't** introduce card grids, glassmorphism, or gradient-as-decoration; the system is edge-to-edge banded sections joined by hairlines.
- **Don't** add drop shadows for elevation or hover lift; depth comes from tone-stepping and hairlines only (see Elevation & Depth).
- **Don't** let amber glow, blur, or gradient-fade — it stays a flat matte fill or stroke everywhere it appears.
- **Don't** use a third font family or a display face for body copy; the system is exactly two families (Big Shoulders + Public Sans).
- **Don't** substitute a stock photo, AI-generated image, or generic logistics-team imagery for an empty photo slot; use the labeled placeholder frame until the owner supplies a real photo.
