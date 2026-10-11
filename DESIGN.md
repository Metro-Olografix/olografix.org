---
name: Metro Olografix
description: Cultura hacker dal 1994. A dark, typographic bulletin for a hacker community.
colors:
  ink-black: "#000000"
  surface: "#0e0e0e"
  surface-hover: "#161616"
  hairline: "#1a1a1a"
  white: "#ffffff"
  white-80: "rgba(255,255,255,.8)"
  white-62: "rgba(255,255,255,.62)"
  white-46: "rgba(255,255,255,.46)"
  signal-red: "#e53e3e"
  signal-green: "#22c55e"
typography:
  display:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.6
  body:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(.95rem, 1.4vw, 1.05rem)"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "'Plex', 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.6
  label-section:
    fontFamily: "'Plex', 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  dot: "50%"
spacing:
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  row: "clamp(1.25rem, 2.5vw, 2rem)"
  section: "clamp(4rem, 8vw, 7rem)"
  container: "1180px"
  measure: "660px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white-62}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: ".8rem 1.75rem"
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.white}"
  button-ghost-small:
    backgroundColor: "transparent"
    textColor: "{colors.white-62}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: ".45rem .85rem"
  button-ghost-small-hover:
    textColor: "{colors.white}"
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    padding: "clamp(1.25rem, 2.5vw, 2rem) 0"
  list-row-hover:
    backgroundColor: "{colors.surface}"
  info-block:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    padding: "clamp(1.25rem, 2.5vw, 2rem)"
  badge-upcoming:
    backgroundColor: "rgba(34,197,94,.12)"
    textColor: "{colors.signal-green}"
    typography: "{typography.label}"
    padding: "3px 8px"
  dropdown:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "6px 0"
---

# Design System: Metro Olografix

## Overview

**Creative North Star: "The Underground Bulletin"**
**Secondary North Star: Swiss Style / Bauhaus**

The site reads like a bulletin from the BBS era, typeset as a modern editorial page. Pages are indexes of a community's activity: events by year, projects by name, sedi, the board. Each entry gets a heavy sans headline and is separated from the next by a single hairline rule. Everything around the content is pure black, so the white type alone carries the page. Hierarchy comes from scale, weight and opacity, not from color, boxes or ornament.

Information is dense, but each line is easy to scan. Every piece of metadata (dates, places, breadcrumbs, emails, status) is set in IBM Plex Mono, and that mono voice is the system's link to its terminal heritage (`/home/metro/pescara`). Photographs show real people and the real lab. They sit in grayscale until hovered, then come back to color, the way a bulletin quotes reality rather than decorating with it.

The palette is monochrome by design. The only colors are status signals: red when a sede is closed, green when something is upcoming. Corners are square everywhere, and nothing casts a shadow.

The secondary north star is the discipline the bulletin is set in. From Swiss International Style it takes an objective grid that every element snaps to, flush-left ragged-right type, asymmetric balance instead of centered symmetry, strong contrast in scale between display and text, and photography used as fact, not mood. From the Bauhaus it takes form following function and an elementary geometry (square, circle, line) as the only source of graphic form. Where the two north stars meet, the bulletin decides *what* is said and Swiss/Bauhaus decides *how it is set*. When a choice is unclear, choose the one a Swiss typographer would defend on grid and legibility grounds.

**Key Characteristics:**
- Pure black ground, white type at four fixed opacities, no decorative backgrounds.
- Heavy, tightly tracked Plex Sans headlines (700–800, −0.02 to −0.03em) over a mono metadata layer.
- Hairline rules (1px) and index-style rows instead of cards.
- Square corners only. No shadows. Depth comes from tone and gradient overlays.
- Grayscale photography that regains color on hover.
- Color appears only as live status.
- Swiss/Bauhaus discipline: grid-snapped, flush-left, asymmetric, elementary geometry.

## Colors

The palette is monochrome white on black, plus two signal colors that carry meaning, never mood.

### Primary
- **Bulletin White** (white): all headlines and primary text, and the color every interactive element reaches on hover or active state. It is the system's only "accent".

### Neutral
- **Ink Black** (ink-black): the page ground and the mobile menu ground. The site has no off-black base. The ground is true black.
- **Night Surface** (surface): the hover fill on list rows, the dropdown menu background, the image placeholder.
- **Night Surface Raised** (surface-hover): the hover fill inside the dropdown.
- **Hairline** (hairline): every rule, border and divider: row separators, outline buttons, info-block grids, the footer top rule.
- **Text 80** (white-80): lead paragraphs and brand-name text in the nav.
- **Text 62** (white-62): body prose, secondary descriptions, nav links at rest, button labels at rest.
- **Text 46** (white-46): tertiary metadata: dates, footer text, section labels, icons at rest, year dividers.

### Signal
- **LED Red** (signal-red): sede "closed" status only, with a soft glow (6px) and a slow pulse.
- **LED Green** (signal-green): "open" and "upcoming" status only (the status dot, and the upcoming-event badge on a 12% tint).

### Named Rules
**The LED Rule.** Red and green are status lights, not brand colors. They appear only where they report live state (open, closed, upcoming). Never use them for buttons, links, headings, highlights or campaign emphasis.

**The Four Whites Rule.** Text uses exactly four values: 100%, 80%, 62% and 46% white. The lowest tier is set so that every tier passes WCAG AA (4.5:1) on black. Hierarchy is decided by choosing among them. Don't introduce a fifth opacity or a tinted gray.

**The No Bauhaus Primaries Rule.** The Bauhaus influence is formal (geometry, function), not chromatic. Red/yellow/blue primaries are not adopted. Color stays governed by The LED Rule.

## Typography

**Display Font:** IBM Plex Sans (with system-ui, sans-serif)
**Label/Mono Font:** IBM Plex Mono, self-hosted as "Plex" (with ui-monospace, monospace)

**Character:** Plex Sans at heavy weights gives the bulletin its masthead voice: compact, slightly engineered, confident. Plex Mono is the machine voice. Both come from the same superfamily, so the switch from prose to metadata feels like changing register, not changing brand.

### Hierarchy
- **Display** (800, clamp(2.5rem→4rem), 1.05, −0.03em): page titles, the sede title, the mosaic headline (up to 800 / 5.5vw on the home mosaic).
- **Headline** (700, clamp(1.4rem→2.1rem), 1.2, −0.02em): project names in the project index. A year divider uses the same scale at 800 in Text 46.
- **Title** (600, 0.95–1.05rem): event titles, board names, location titles, info-block values.
- **Body** (400, clamp(0.95rem→1.05rem), 1.85): prose capped at 660px (about 65–70ch). Lead text runs up to 1.2rem at 80% white.
- **Label** (mono 400–500, 0.65–0.85rem): dates, breadcrumbs, metadata, nav links (0.8rem), buttons, footer. Section labels are uppercase with 0.08–0.1em tracking.

### Named Rules
**The Mono Means Data Rule.** If a piece of text is a date, place, path, email, status, count or navigation, set it in Plex Mono. If it's a name or a sentence, set it in Plex Sans. Never mix the two within one line's role.

**The Heavy Masthead Rule.** Headlines are 700–800 with negative tracking. Mid-weight (500) headlines don't exist in this system.

**The Flush Left Rule.** All type is set flush-left, ragged-right. No centered headings, no justified text. Contrast comes from the jump in scale between display and body (about 4:1), not from intermediate sizes.

## Layout

The page uses a single centered column (max 1180px) with a fluid side gutter (clamp(1.25rem, 4vw, 2.5rem)). Prose is capped at 660px and sits left-aligned in the column; there is no centered text block. Inner pages open with a generous top pad (clamp(7rem, 14vw, 10rem)) under the fixed nav, then a mono breadcrumb, then the display title.

The content is index-shaped. Lists are rows divided by hairlines. On wider screens they become a grid: the project row is icon (3rem) / name / description, and the event row is date (90px) / content / badge. Sede facts sit in a 4-column grid of bordered blocks (2 columns on mobile), with the borders collapsed by negative margins so they draw one shared hairline lattice. Equipment uses a 1px-gap grid on the hairline color to get the same lattice.

The home mosaic breaks out of the column to full viewport width on a 12-column photo grid with 4px gaps. It drops to 6 columns below 900px and 4 below 480px, hiding the tiles it can't place.

All pages share one 12-column section grid (gutter clamp(1rem, 2vw, 1.5rem)). A side heading (Plex Sans 700, 1.05rem, white) sits in columns 1–3 and the content in columns 4–12. Below 768px the heading stacks above the content. Sections after the first are separated by a 1px hairline that spans the content edges, with an even vertical rhythm (clamp(3.5rem, 7vw, 6rem)) on both sides. The desktop nav uses the same grid: logo in column 1, brand in 2–3, links starting on column 4 so they line up with section content, and the language switch (IT · EN · ES) flush right. Social links live in the footer and the mobile menu.

Breakpoints are 480, 600, 640, 768, 900 and 1100px. The 1100px breakpoint switches the nav from burger to the full grid nav (the language switch needs the room). Inner pages open with a page header (mono breadcrumb, display title) starting at column 1. The first section follows without a rule, and an untitled lead section (intro prose, the calendar bar) puts its content straight into columns 4–12. On Attività, the year groups use the side column as a large 800-weight year heading: upcoming events in white, past years in Text 46. Facts that need the full width (the sede info lattice) span columns 1–12.

### Named Rules
**The Objective Grid Rule.** Every element aligns to the column and to the 12-column grid the mosaic already uses. Elements that break out of the column (like the full-bleed mosaic) do so on the grid, never on an arbitrary offset.

**The Asymmetry Rule.** Composition balances by weight, not by mirroring: a heavy title against open space, a narrow label column against a wide content column (as in the event and project rows). Avoid centered, symmetric layouts.

## Elevation & Depth

The system is flat. There are no box-shadows on surfaces. Depth comes from three things:
1. **Tonal steps:** hovering fills a row with Night Surface (#0e0e0e).
2. **Black gradient overlays** over imagery (maps, mosaic), so text set over a picture stays readable: `linear-gradient(to top, rgba(0,0,0,.92), transparent)`.
3. **The scrolled nav:** a translucent black bar (rgba(5,5,5,.88)) with a 24px backdrop blur. It appears only after scrolling 40px.

The one glow in the system belongs to the status LED (`box-shadow: 0 0 6px` in its own color).

### Named Rules
**The No Lift Rule.** Nothing floats. Hover feedback is a tone fill, a color step to white, or a small horizontal nudge (4–16px). It is never a shadow or a vertical lift.

## Shapes

Every corner is square (0px): buttons, dropdowns, info blocks, images and the badge. The only circle is the 7px status dot. Structure is drawn with 1px hairlines in #1a1a1a. The site has no thick borders and no outlined containers inside other outlined containers. Photos are cropped with `object-fit: cover` into fixed aspect ratios (16:9 for sede photos) or into mosaic cells.

### Named Rules
**The Elementary Forms Rule.** All graphic form comes from Bauhaus primitives: the square, the circle and the line. Use them in white or white tiers, built from geometry (CSS or SVG). Each project has a 24px outline mark (1.5px stroke, square caps) built from these primitives: a node triangle (Abruzzo Off-Grid), a struck-through square (Stop Piracy-Shield), a circle around a square (Refurbish Ninja), a tent of lines (MOCA), and broadcast arcs (CYBER-FREEDOM). The 7px status dot is the existing circle.

## Components

### Buttons
Ghost-outlined, mono and quiet until touched.
- **Shape:** square (0px), 1px Hairline border, transparent fill.
- **Outline (primary action):** mono 0.85rem/500, padding .8rem 1.75rem, Text 62.
- **Small ghost (utility actions such as calendar download/subscribe/copy):** mono 0.7rem, padding .45rem .85rem.
- **Hover:** border and label step to Bulletin White; the outline variant also fills with Night Surface. 0.2s transition.

### CTA Line (signature)
This is the system's main call to action: a mono label (0.85rem/500) with a thin underline, followed by a 1px hairline that stretches across the remaining width and ends in an arrow. On hover, a white line draws across the hairline from the left (0.6s, expo-out) and the arrow nudges 6px to the right. Use it for "Scopri di più", "Vedi tutti i progetti" and "Vai allo shop".

### Index Rows (signature)
These rows are the bulletin's line items: projects, events and board members.
- **Rest:** transparent, separated by a 1px Hairline bottom border (the first row also gets a top border).
- **Hover:** fills with Night Surface and bleeds 0.75rem past the column on both sides. The title nudges right (4–6px) and the secondary text steps up one opacity tier.
- **Event badge:** the "Prossimo" badge is mono 0.65rem in LED Green on a 12% green tint, square.

### Info Blocks
Facts about a sede (Orario, Come arrivare, Zona, Contatti). Each block has an uppercase mono label (0.65rem, 0.08em tracking, Text 46), a value in Title weight, and a sub-line in Text 46. The blocks sit in a collapsed-border lattice.

### Location Cards
Map-backed cards with an SVG street map scaled into the frame and a black gradient from the bottom. Each card has a mono path title (`/home/metro/pescara`), a short description and a live status line with an LED dot.

### Navigation
- **Desktop (≥1100px):** the logo mark, a two-line mono brand name, mono links starting on grid column 4 (0.8rem, Text 62 at rest, white on hover) and the mono language switch flush right. The active page is white with a 1px underline offset 4px. The dropdown is a square Night Surface panel with a Hairline border, and its chevron rotates 180° when open.
- **Scrolled:** a translucent black bar with backdrop blur.
- **Mobile:** a burger of two 1.5px lines. It opens a full-screen black overlay with huge Plex Sans links (clamp(1.75rem→3rem)/600) that slide 16px right on hover.

### Photo Mosaic
A full-bleed 12-column grid of real photos with 4px gaps. Photos show at `grayscale(1) contrast(1.1) brightness(.85)` and return to color with a 1.06 zoom on hover (0.5s). A display headline and a CTA sit over a bottom gradient.

## Do's and Don'ts

### Do:
- **Do** keep the page ground true black (#000) and draw all structure with 1px #1a1a1a hairlines.
- **Do** set every date, place, path, email and status in Plex Mono, and every name and sentence in Plex Sans.
- **Do** build lists as hairline-separated index rows with the tone-fill and nudge hover.
- **Do** show photography in grayscale at rest and bring back color only on hover.
- **Do** use the CTA Line for primary navigation-style calls to action.
- **Do** use the expo-out ease `cubic-bezier(.16,1,.3,1)` for movement and 0.2s linear color transitions for hover color changes.
- **Do** set all type flush-left and snap every element to the column grid.
- **Do** build icons and graphic marks from squares, circles and lines.

### Don't:
- **Don't** use red or green for anything except live status (The LED Rule).
- **Don't** round corners or add box-shadows to any surface.
- **Don't** introduce a text opacity outside 100/80/62/46%.
- **Don't** use Unicode glyphs (`((•))`, `◇`, `↻`, `⌘`, `☆`) as project or feature icons. They are slated for replacement and should not be extended into new work.
- **Don't** wrap content in filled cards. Rows and hairline lattices carry the structure.
- **Don't** center or justify text, and don't bring in Bauhaus red/yellow/blue.

## Implementation (Hugo)

- Stylesheet: `static/css/style.css` (plain CSS, no framework, no build step). Fonts are self-hosted in `static/fonts/`.
- Page shell: `layouts/_default/baseof.html` → `partials/nav.html`, `partials/mobile-menu.html`, `partials/footer.html`.
- Section grid markup: `<section class="sec"><div class="wrap sec__in"><h2 class="sec__h">…</h2><div class="sec__body">…</div></div></section>`. Omit the `h2` for a lead section; add `sec__body--full` to span all 12 columns.
- Index rows: `partials/event-row.html` (activities) and `partials/project-row.html` (projects, with `partials/project-mark.html`). Give a new project a mark by adding its file name to `project-mark.html`, or set `mark:` in its front matter to reuse one.
- Live status light: `partials/sede-status.html`, driven by `static/js/main.js` from `sede.olografix.org`.
- Markdown content gets `.prose` styling. The handful of Tailwind utility classes that existing content embeds on images (`md:float-right`, `md:float-left`, `max-w-sm`, `max-w-lg`) are mapped in `style.css`. Don't add new ones; prefer plain markdown.
