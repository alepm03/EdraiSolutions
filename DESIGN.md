---
name: Edrai Solutions
description: AI agents, custom software and automation for Spanish service SMBs, shown working on a near-black product stage.
colors:
  ink-ground: "#05070b"
  surface-1: "#0e0f12"
  surface-2: "#14161a"
  surface-3: "#1b1e23"
  line: "rgba(255, 255, 255, 0.07)"
  line-strong: "rgba(255, 255, 255, 0.12)"
  glass-line: "rgba(255, 255, 255, 0.09)"
  text: "#f5f6f7"
  text-2: "#b4b9c1"
  muted: "#8b9099"
  faint: "#7d838c"
  agent-cyan: "#22d3ee"
  cyan-deep: "#0ea5e9"
  cyan-bright: "#67e8f9"
  cyan-ink: "#03161c"
  cyan-tint: "rgba(34, 211, 238, 0.1)"
  cyan-line: "rgba(34, 211, 238, 0.35)"
  live-green: "#4ade80"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, min(1rem + 4.6vw, 9vh), 5rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 96"
  display-page:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.4rem + 4.4vw, 5.2rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 2.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 96"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 0.98rem + 0.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'cv11', 'ss01'"
  label:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 550
    lineHeight: 1
    letterSpacing: "-0.005em"
rounded:
  link: "8px"
  tile: "12px"
  rail: "14px"
  step: "18px"
  card: "20px"
  frame: "22px"
  pill: "999px"
spacing:
  wrap: "1200px"
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(88px, 14vh, 160px)"
  section-tight: "clamp(64px, 10vh, 120px)"
  nav-height: "68px"
components:
  button-primary:
    backgroundColor: "{colors.agent-cyan}"
    textColor: "{colors.cyan-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cyan-bright}"
    textColor: "{colors.cyan-ink}"
  button-quiet:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-quiet-hover:
    backgroundColor: "{colors.surface-2}"
  button-light:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ink-ground}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  card:
    rounded: "{rounded.card}"
    textColor: "{colors.text}"
  icon-tile:
    backgroundColor: "{colors.cyan-tint}"
    textColor: "{colors.cyan-bright}"
    rounded: "{rounded.tile}"
    size: "44px"
  icon-tile-solid:
    backgroundColor: "{colors.agent-cyan}"
    textColor: "{colors.cyan-ink}"
    rounded: "{rounded.tile}"
    size: "44px"
  tag-demo:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  nav-link:
    textColor: "{colors.text-2}"
    rounded: "{rounded.link}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text}"
---

# Design System: Edrai Solutions

## Overview

**Creative North Star: "The Lit Control Room"**

A near-black stage with a navy cast where the product works in plain sight. The page is dark and quiet so that the things that are alive (the agent console, the film, the reel, the live chat) carry the light. Cyan is the colour of the agent itself: it marks the one action to take, the live state and the thin lines that connect things, and nothing else. The craft bar is the category standard at full finish (linear.app, sierra.ai, decagon.ai): restrained, product-led, legible.

Surfaces are glass cards floating over four very soft cyan and sky radial light fields painted on the body. Depth comes from translucency, a hairline top edge and long, low, black ambient shadows, never from colour fills. Motion is part of the world: content rises once as it enters, the film pins and grows as you scroll, the reel follows the video, and navigating between the home and a service page morphs the pillar title and icon in place.

This world is a user-pinned hybrid: the production site's rich components inside the multi-page prototype's restraint. It explicitly refuses production's noise (particles, aurora, canvas beams, marquee, uppercase black headings).

**Key Characteristics:**
- Near-black navy ground with three greyscale surfaces and hairline white borders.
- One accent, cyan, used as a signal and never as a field.
- Archivo heavy, slightly condensed, sentence case, tight negative tracking; Inter for everything you read.
- Glass cards (20px radius) with a cursor-following cyan glow on hover.
- Motion that explains: expo-out reveals once, scroll-pinned film, video-synced reel, shared-element page transitions.
- Illustrative data is always labelled; real figures come from one monthly source.

## Colors

A dark, nearly monochrome palette with a single electric cyan reserved for the agent and the next step.

### Primary
- **Agent Cyan** (agent-cyan): primary button fill, solid icon tile, progress bars on the film and reel, the active-nav underline, the rule in the logo lockup, focus outlines, selection, caret. Its tint and line variants (cyan-tint, cyan-line) draw icon tiles, active reel steps and hovered card borders.
- **Bright Cyan** (cyan-bright): hover state of the primary button and the glyph colour inside outlined icon tiles.
- **Deep Sky** (cyan-deep): only inside the body's ambient light fields, alternating with Agent Cyan so the glow has temperature.
- **Cyan Ink** (cyan-ink): text and icons placed on a cyan fill. Never plain black.

### Neutral
- **Navy Ink Ground** (ink-ground): the page background everywhere, behind the radial light fields; also the nav glass base at 72% and the mobile sheet.
- **Surface 1 / 2 / 3** (surface-1, surface-2, surface-3): three steps of tonal lift. Surface 2 is the hover and active state for quiet buttons and nav links; Surface 3 fills small inline icon chips and the scrollbar thumb.
- **Hairline / Strong Hairline / Glass Line** (line, line-strong, glass-line): dividers, quiet button and burger borders, card and frame borders.
- **Text, Text 2, Muted, Faint** (text, text-2, muted, faint): headings and primary copy; ledes, nav links and list copy; meta and demo tags; the quietest captions.

### Tertiary
- **Live Green** (live-green): the live-state dot only, with a 3px halo of itself at 18%.

### Named Rules
**The Signal, Not Field Rule.** Cyan is an accent: primary action, icon tiles, live state, progress and connecting lines. It is never a full-bleed or section background (owner decision, 19 Oct 2026). The largest permitted cyan area is a button or the film's "Ver con sonido" control.

**The One Cyan Action Rule.** A cyan-filled button always means one thing: request the free diagnosis (the nav CTA and the hero CTA are the same action). Every other action uses the quiet (outlined) or light button.

**The Light Fields Rule.** Atmosphere comes only from the four fixed radial gradients on the body (cyan and sky at 7 to 13% opacity). Do not add per-section glows, auroras or particle layers.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui), width axis at 96%
**Body Font:** Inter Variable (with Inter, system-ui), stylistic sets cv11 and ss01

**Character:** A heavy, slightly narrow grotesk headline that reads like a product launch, set against Inter's neutral, highly legible text. Sentence case throughout; the weight and tight tracking do the work that capitals used to.

### Hierarchy
- **Display** (850, fluid up to 5rem, 0.98): the home H1 only, max 14ch, balanced wrap.
- **Display page** (850, fluid up to 5.2rem, 0.98): inner page and service hero titles (service titles run slightly larger, up to 5.6rem), max 16ch.
- **Headline** (800, fluid 2 to 3.25rem, 1.05): section heads, paired with a right-aligned lede in a two-column head that stacks under 860px.
- **Title** (800, 19px, 1.2): card and step titles in Archivo.
- **Lede** (400, fluid 1.05 to 1.2rem, 1.55, Text 2): one paragraph under a heading, max 46 to 58ch, pretty wrap.
- **Body** (400, 16px, 1.6): running copy; list items in check lists sit at 14.5px.
- **Label** (550, 15px): buttons and arrow links. Demo tags are 12px in Muted.

### Named Rules
**The Sentence Case Rule.** Headings are sentence case in Archivo 800 to 850 with negative tracking. No uppercase headings, no tracked-out labels above headings. The only uppercase, tracked text in the system is the "SOLUTIONS" line of the logo lockup, which is a brand asset.

**The Tabular Figures Rule.** Any figure that can change (monthly numbers, money in demos) uses tabular numerals.

## Layout

A centred column of 1200px with fluid gutters (16 to 40px). Sections breathe with fluid vertical padding (88 to 160px; tighter 64 to 120px variant on inner pages), dropping to 72px and 56px below 640px. Section heads use an asymmetric two-column grid (1.15fr / 1fr) with the lede bottom-aligned on the right; under 860px it becomes one column.

The nav is sticky, 68px tall, persistent across page navigations, and collapses to a burger with a full-width sheet under 960px (the nav CTA hides under 520px). Anchors scroll with an 80px offset; the page reserves 88px of scroll padding.

The home first viewport splits left copy (H1, lede, primary CTA, WhatsApp) and right live console; the monthly proof strip sits at the fold edge. Desktop-only choreography (film pin) activates at 900px and above; below that the same content plays inline and full-bleed.

## Elevation & Depth

Depth is translucency plus ambient shadow. Cards are glass: a faint vertical white gradient (4.5% to 1.8%), a 1px glass-line border, an inset 1px top highlight, and a long soft black drop that reads as lift without a visible edge. Media frames (film, clips, phone) sit lower and heavier. The nav and floating panels blur what is behind them (18px, saturation 1.35). There are no hard or offset shadows and no coloured shadows on surfaces.

### Shadow Vocabulary
- **Glass edge** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07)`): the top highlight on every glass surface.
- **Card lift** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 48px -32px rgba(0, 0, 0, 0.8)`): cards at rest.
- **Stage drop** (`box-shadow: 0 50px 120px -40px rgba(0, 0, 0, 0.9)`): film frame, service clip frame, phone.
- **Cursor glow** (`radial-gradient(220px circle at var(--glow-x) var(--glow-y), rgba(34, 211, 238, 0.12), transparent 60%)`): a card overlay that follows the pointer on hover-capable devices.

### Named Rules
**The Lift By Light Rule.** A card responds to the pointer with light, not movement: its border warms to cyan at 32% and the cursor glow fades in. Cards do not jump or scale on hover.

## Shapes

Soft, generous radii that scale with the object: 8px for nav links, 12px for icon tiles, 14px for rails and small panels, 18px for steps, 20px for cards, 22px for the film frame, 999px for every button and tag. Device frames follow the device (phone 46px outer, 37px screen). Borders are always 1px hairlines; the only dashed border is the illustrative-data tag. On narrow screens the film frame drops to square corners and runs edge to edge.

## Components

### Buttons
Full pills, confident and compact.
- **Shape:** fully rounded (999px), 44px tall (52px for the hero size, 38px in the nav).
- **Primary:** Agent Cyan fill with Cyan Ink label, Inter 550 at 15px. Hover brightens to Bright Cyan.
- **Quiet:** transparent with a strong hairline border and Text label; hover fills Surface 2.
- **Light:** Text fill with ground-coloured label, for the second action on a dark media panel.
- **Press:** every button scales to 0.98. Focus is a 2px cyan outline at 3px offset.
- **Arrow link:** Text label with a 15px arrow that slides 3px right on hover.

### Chips
- **Demo tag:** 12px Muted label in a pill with a dashed strong-hairline border. It marks illustrative footage and example data ("Demo ilustrativa", "Datos de ejemplo"). Its presence is a content rule, not decoration.

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** glass gradient over the ground; never a solid cyan or a solid surface.
- **Shadow Strategy:** Card lift, plus Cursor glow on hover (see Elevation & Depth).
- **Border:** 1px glass line, cyan at 32% on hover.
- **Content:** an outlined icon tile (44px, 12px radius, cyan tint, cyan line at 28%, Bright Cyan glyph), an Archivo title, a check list with cyan check glyphs, and an arrow link. A product visual (console, P&L, flow nodes) sits above the copy.

### Inputs / Fields
- **Style:** 12px radius, 1px white 10% border, white 4% fill, 15px text, generous padding (14px by 16px).
- **Focus:** border turns Agent Cyan and the fill lifts to white 7%; caret is cyan.
- **Error / Success:** tinted panels (red or green at 10% fill, 25% border) with a matching light label.

### Navigation
Sticky glass bar (ground at 72%, blur 14px). Links are 14px Text 2 in 8px-radius hit areas; hover and current page fill Surface 2, and the current page adds a 2px cyan underline drawn inset at the bottom. A hairline bottom border appears once the page scrolls past 8px. The nav and the floating chat persist across page transitions.

### Scroll-Expand Film (signature)
A 16:9 frame (22px radius) that, at 900px and wider, pins and grows from 72% scale to full as the visitor scrolls, while the intro text lifts away. Chapters below seek the video; a cyan progress bar tracks time; a cyan "Ver con sonido" control is the only large cyan object on the page. Below 900px it plays inline, edge to edge.

### Sticky Reel (signature)
A 9:16 video in a phone frame that stays sticky beside three steps. The active step follows the video's current time (cyan line border, cyan 5% fill, a cyan progress bar filling along its bottom); clicking a step seeks the video.

### Page Transitions (signature)
Astro View Transitions with a persistent nav and chat. Leaving content fades up 14px with a 4px blur (0.32s, accelerate); arriving content rises 22px out of a 6px blur (0.6s, expo-out); back navigation mirrors the direction. Each pillar's icon tile and title carry shared names (pillar-icon-slug, pillar-title-slug) so the bento card's title and icon morph into the service page hero.

## Do's and Don'ts

### Do:
- **Do** keep the ground at Navy Ink with only the four body light fields for atmosphere.
- **Do** use Agent Cyan for the diagnosis action, icon tiles, live state, progress and lines, and Cyan Ink for anything sitting on it.
- **Do** set headings in Archivo 800 to 850, sentence case, negative tracking, balanced wrap.
- **Do** build containers as glass cards: 20px radius, hairline glass border, inset top highlight, long soft black drop, cursor glow on hover.
- **Do** use the expo-out curve (cubic-bezier(0.16, 1, 0.3, 1)) for reveals, entrances and transitions; reveal content once, staggered by 80ms, and enter the first viewport with the CSS rise (110ms stagger) so it never waits on JavaScript.
- **Do** keep everything visible without JavaScript and with reduced motion: reveals, rise, film pin and reel sync switch off, and muted loops keep their poster.
- **Do** label every illustrative video or example figure with the dashed demo tag, and pull real results from the single monthly figures source, naming the month.
- **Do** write copy without the em dash character.

### Don't:
- **Don't** use cyan as a full-bleed, section or hero background.
- **Don't** set headings in uppercase or Archivo black, and don't put tracked uppercase labels above headings.
- **Don't** add particles, aurora layers, canvas beams, marquees or per-section glows.
- **Don't** move or scale cards on hover; respond with border colour and the cursor glow.
- **Don't** put video behind a modal; it plays inline.
- **Don't** use hard, offset or coloured drop shadows on surfaces.
- **Don't** show an unlabelled demo number or a business figure without a source.
