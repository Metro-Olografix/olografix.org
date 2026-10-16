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
  signal-green-tint: "rgba(34,197,94,.12)"
  veil: "rgba(5,5,5,.95)"
  veil-soft: "rgba(5,5,5,.3)"
  veil-card: "rgba(5,5,5,.82)"
  veil-mid: "rgba(5,5,5,.6)"
  veil-faint: "rgba(5,5,5,.05)"
  scrim: "rgba(0,0,0,.92)"
  scrim-mid: "rgba(0,0,0,.4)"
typography:
  display:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 500
    lineHeight: 1.6
  body:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(.95rem, 1.4vw, 1.05rem)"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.6
  label-section:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  machine:
    fontFamily: "'Plex', 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
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

The site reads like a bulletin from the BBS era, typeset as a modern editorial page. Pages are indexes of a community's activity: events by year, projects by name, sedi, the board. Each entry gets a strong sans headline and is separated from the next by a single hairline rule. Everything around the content is pure black, so the white type alone carries the page. Hierarchy comes from scale, weight and opacity, not from color, boxes or ornament.

Information is dense, but each line is easy to scan. Machine text (paths, dates in columns, emails, handles, IDs, code) is set in IBM Plex Mono, and that mono voice is the system's link to its terminal heritage (`~/pescara`). Everything else, including navigation and buttons, is Plex Sans. Photographs show real people and the real lab. They sit in grayscale until hovered, then come back to color, the way a bulletin quotes reality rather than decorating with it. The photogallery is the exception: there the photos are the content, so albums and album pages show them in color.

The palette is monochrome by design. The only colors are status signals: red when a sede is closed, green when something is upcoming. Corners are square everywhere, and nothing casts a shadow.

The secondary north star is the discipline the bulletin is set in. From Swiss International Style it takes an objective grid that every element snaps to, flush-left ragged-right type, asymmetric balance instead of centered symmetry, strong contrast in scale between display and text, and photography used as fact, not mood. From the Bauhaus it takes form following function and an elementary geometry (square, circle, line) as the only source of graphic form. Where the two north stars meet, the bulletin decides *what* is said and Swiss/Bauhaus decides *how it is set*. When a choice is unclear, choose the one a Swiss typographer would defend on grid and legibility grounds.

**Key Characteristics:**
- Pure black ground, white type at four fixed opacities, no decorative backgrounds.
- IBM Plex Sans in the official MX hierarchy (H1 700, H2 600, H3 500), with Plex Mono reserved for machine text.
- The official MX monogram in the nav; monogram + lettering in the footer.
- Hairline rules (1px) and index-style rows instead of cards.
- Square corners only. No shadows. Depth comes from tone and gradient overlays.
- Grayscale photography that regains color on hover (except in the photogallery, which is in color).
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
- **Text 80** (white-80): lead paragraphs.
- **Text 62** (white-62): body prose, secondary descriptions, nav links at rest, button labels at rest.
- **Text 46** (white-46): tertiary metadata: dates, footer text, section labels, icons at rest, year dividers.
- **Veils and scrims** (veil, veil-soft, veil-card, veil-mid, veil-faint, scrim, scrim-mid): the near-black gradients that keep type readable over maps and photos. Use the tokens, never a new rgba.

### Signal
- **LED Red** (signal-red): sede "closed" status text only.
- **LED Green** (signal-green): "open" status text and the upcoming-event badge (on a 12% tint) only.

### Named Rules
**The LED Rule.** Red and green are status lights, not brand colors. They appear only where they report live state (open, closed, upcoming). Never use them for buttons, links, headings, highlights or campaign emphasis.

**The Four Whites Rule.** Text uses exactly four values: 100%, 80%, 62% and 46% white. The lowest tier is set so that every tier passes WCAG AA (4.5:1) on black. Hierarchy is decided by choosing among them. Don't introduce a fifth opacity or a tinted gray.

**The No Bauhaus Primaries Rule.** The Bauhaus influence is formal (geometry, function), not chromatic. Red/yellow/blue primaries are not adopted. Color stays governed by The LED Rule.

## Typography

**Display Font:** IBM Plex Sans (with system-ui, sans-serif)
**Label/Mono Font:** IBM Plex Mono, self-hosted as "Plex" (with ui-monospace, monospace)

**Source of truth:** the MX Graphics Standards Manual (github.com/Metro-Olografix/mx-graphics-assets). IBM Plex Sans is the primary typeface for all communication, in Regular 400, Medium 500, SemiBold 600 and Bold 700. IBM Plex Mono (Regular only) is for code, URLs, domains, paths and other technical strings.

**Character:** Plex Sans carries the bulletin's voice: compact, slightly engineered, confident. Plex Mono is the machine voice. Both come from the same superfamily, so the switch from prose to metadata feels like changing register, not changing brand.

### Hierarchy
- **Display / H1** (Bold 700, clamp(2.5rem→4rem), 1.05, −0.03em): page titles, the sede title, the mosaic headline.
- **Headline / H2** (SemiBold 600, clamp(1.4rem→2.1rem), 1.2, −0.02em): project names, section side headings, year dividers (Text 46), markdown h2.
- **Title / H3** (Medium 500, 0.95–1.1rem): event titles, board names, album titles, info-block values, markdown h3/h4.
- **Body** (400, clamp(0.95rem→1.05rem), 1.85): prose capped at 660px (about 65–70ch). Lead text runs up to 1.2rem at 80% white.
- **Emphasis** (SemiBold 600): `strong`/`b` inside running text, used sparingly.
- **Label** (Plex Sans 400–500, 0.72–0.85rem): nav links, buttons, badges, info-block labels (uppercase, 0.08em tracking), event metadata, status.
- **Machine** (Plex Mono 400, 0.7–0.95rem): breadcrumb paths (`~ / …`), `~/pescara`-style card titles, dates in event columns, emails, nicknames, P.IVA/C.F., code.

### Named Rules
**The Machine Text Rule.** Plex Mono is only for text a machine would produce or read: paths, URLs, domains, emails, handles, IDs, code, and dates aligned in a column. Navigation, buttons, labels and sentences are Plex Sans. Mono is Regular only.

**The Manual Hierarchy Rule.** Heading weights follow the MX manual: H1 Bold 700, H2 SemiBold 600, H3 Medium 500, emphasis SemiBold 600. Nothing is heavier than 700.

**The Flush Left Rule.** All type is set flush-left, ragged-right. No centered headings, no justified text. Contrast comes from the jump in scale between display and body (about 4:1), not from intermediate sizes.

## Layout

The page uses a single centered column (max 1180px) with a fluid side gutter (clamp(1.25rem, 4vw, 2.5rem)). Prose is capped at 660px and sits left-aligned in the column; there is no centered text block. Inner pages open with a page header in one of two kinds, decided by whether there is a real image:

- **Photo header** (`.sede__hero`): when the page has a photo or map (Attività, Progetti, the sedi, or any page whose front matter sets `image:`, with optional `imagePosition:`), the header is as tall as the home mosaic and the image runs full-bleed behind the breadcrumb and title, in grayscale under a veil. The same `image` becomes the share image when no generated OG image exists.
- **Text header** (`.phdr`): every other page gets a compact header (the nav height plus clamp(3.5rem, 8vw, 6rem) above the mono breadcrumb and the display title) and the content follows right after. A tall black hero with nothing in it only pushes the content (often the date and place a regular is looking for) below the fold.

Never add a decorative or stock photo just to fill a header. Photography is fact here: use a photo of the actual event, project or place, or use the text header.

The content is index-shaped. Lists are rows divided by hairlines. On wider screens they become a grid: the project row is icon (3rem) / name / description, and the event row is date (90px) / content / badge. Sede facts sit in a 4-column grid of bordered blocks (2 columns on mobile), with the borders collapsed by negative margins so they draw one shared hairline lattice. Equipment uses a 1px-gap grid on the hairline color to get the same lattice.

The home mosaic breaks out of the column to full viewport width on a 12-column photo grid with 4px gaps. It starts below the nav bar (4px under its hairline), never underneath it. It drops to 6 columns below 900px and 4 below 480px, hiding the tiles it can't place.

Under the mosaic, the home keeps the menu's names and order — L'associazione (with the sedi and their live status inside), Attività (whose live end is "Prossimi eventi"; the archive of past events is on the Attività page), Progetti, Associati, Shop, with the BBS closing the page as it closes the menu. Photogallery stays in the menu without its own home section: the mosaic already speaks for it.

All pages share one 12-column section grid (gutter clamp(1rem, 2vw, 1.5rem)). A side heading (Plex Sans 700, 1.05rem, white) sits in columns 1–3 and the content in columns 4–12. Below 768px (48em) the heading stacks above the content and the grid drops its column gaps, since every child then spans the full row. Sections after the first are separated by a 1px hairline that spans the content edges, with an even vertical rhythm (clamp(3.5rem, 7vw, 6rem)) on both sides. The desktop nav uses the same grid: logo in column 1, brand in 2–3, links starting on column 4 so they line up with section content, and the language switch (IT · EN · ES) flush right. Social links live in the footer and the mobile menu.

Breakpoints are 480, 600, 640, 768, 900 and 1100px, written in `em` (30, 37.5, 40, 48, 56.25 and 68.75em) so they also respond to the reader's font-size setting: with the text at 200% a desktop window gets the mobile layout instead of colliding type. The 1100px (68.75em) breakpoint switches the nav from burger to the full grid nav (the language switch needs the room). Inner pages open with a page header (mono breadcrumb, display title; see the two kinds above) starting at column 1. The first section follows without a rule, and an untitled lead section (intro prose, the calendar bar) puts its content straight into columns 4–12. On Attività, the year groups use the side column as a large 600-weight year heading: upcoming events in white, past years in Text 46. Facts that need the full width (the sede info lattice) span columns 1–12.

### Named Rules
**The Objective Grid Rule.** Every element aligns to the column and to the 12-column grid the mosaic already uses. Elements that break out of the column (like the full-bleed mosaic) do so on the grid, never on an arbitrary offset.

**The Asymmetry Rule.** Composition balances by weight, not by mirroring: a heavy title against open space, a narrow label column against a wide content column (as in the event and project rows). Avoid centered, symmetric layouts.

## Elevation & Depth

The system is flat. There are no box-shadows on surfaces. Depth comes from two things:
1. **Tonal steps:** hovering fills a row with Night Surface (#0e0e0e).
2. **Black gradient overlays** over imagery (maps, mosaic), so text set over a picture stays readable: `linear-gradient(to top, rgba(0,0,0,.92), transparent)`.

The nav is not a layer over the page: it is a solid black bar with a hairline, and nothing (photo, map, title) ever runs underneath it.

Nothing glows. Live status is carried by the color of the status text itself (see The LED Rule).

### Named Rules
**The No Lift Rule.** Nothing floats. Hover feedback is a tone fill, a color step to white, or a small horizontal nudge (4–16px). It is never a shadow or a vertical lift.

## Shapes

Every corner is square (0px): buttons, dropdowns, info blocks, images and the badge. Structure is drawn with 1px hairlines in #1a1a1a. The site has no thick borders and no outlined containers inside other outlined containers. Photos are cropped with `object-fit: cover` into fixed aspect ratios (16:9 for sede photos) or into mosaic cells.

### Named Rules
**The Elementary Forms Rule.** All graphic form comes from Bauhaus primitives: the square, the circle and the line. Use them in white or white tiers, built from geometry (CSS or SVG). Each project has a 24px outline mark (1.5px stroke, square caps) built from these primitives: a node triangle (Abruzzo Off-Grid), a struck-through square (Stop Piracy-Shield), a circle around a square (Refurbish Ninja), a tent of lines (MOCA), and broadcast arcs (CYBER-FREEDOM).

## Components

### Buttons
Ghost-outlined, Plex Sans and quiet until touched.
- **Shape:** square (0px), 1px Hairline border, transparent fill.
- **Outline (primary action):** Plex Sans 0.85rem/500, padding .8rem 1.75rem, Text 62.
- **Small ghost (utility actions such as calendar download/subscribe/copy):** Plex Sans 0.78rem, padding .45rem .85rem.
- **Hover:** border and label step to Bulletin White; the outline variant also fills with Night Surface. 0.2s transition.

### CTA Line (signature)
This is the system's main call to action: a Plex Sans label (0.85rem/500) with a thin underline, followed by a 1px hairline that stretches across the remaining width and ends in an arrow. On hover, a white line draws across the hairline from the left (`scaleX`, 0.6s, expo-out) and the arrow nudges 6px to the right. Use it for "Scopri di più", "Vedi tutti i progetti" and "Vai allo shop".

### Index Rows (signature)
These rows are the bulletin's line items: projects, events and board members.
- **Rest:** transparent, separated by a 1px Hairline bottom border (the first row also gets a top border).
- **Hover:** fills with Night Surface and bleeds 0.75rem past the column on both sides. The title nudges right (4–6px) and the secondary text steps up one opacity tier.
- **Event badge:** the "Prossimo" badge is Plex Sans 0.72rem in LED Green on a 12% green tint, square.

### Info Blocks
Facts about a sede (Orario, Come arrivare, Zona, Contatti). Each block has an uppercase Plex Sans label (0.72rem, 0.08em tracking, Text 46), a value in Title weight, and a sub-line in Text 46. The blocks sit in a collapsed-border lattice.

### Location Cards
Map-backed cards with an SVG street map scaled into the frame. The black veil is anchored to the text block (`.loc__body::before`: veil-card behind the text, fading through veil-mid to veil-faint 3.5rem above it), so text that grows with zoom or longer copy never climbs onto bare map. Each card has a mono path title (`~/pescara`), a short description and a live status line (see Live Status).

### Logo
The logo comes from the official MX Graphics Standards Manual and is never redrawn.
- **Files:** `static/images/logo/MX_white.svg` (monogram) and `MX_lettering_white.svg` (monogram + "metro olografix" lettering, with the redrawn "m"). Black versions are alongside. The white files are the official SVGs with the fill set to white, matching the official white PNGs.
- **Monogram only:** nav bar and mobile menu, where space is tight and the brand is already established.
- **Monogram + lettering:** footer (formal context, next to the legal data).
- **Proportions:** 13:8. Never stretch, rotate, recolour (white on black only here), or add effects.
- **Clear space:** at least the width of the main stroke on every side.
- **Never** set "metro olografix" next to the monogram in live text; the lettering only exists as the official SVG, under the monogram, at the monogram's width.

### Navigation
- **Desktop (≥1100px):** the official MX monogram (24px high), Plex Sans links starting on grid column 4 (0.85rem, Text 62 at rest, white on hover) and the language switch flush right. The active page is white with a 1px underline offset 4px. The dropdown is a square Night Surface panel with a Hairline border, and its chevron rotates 180° when open. It opens on hover or focus, and Esc dismisses it (focus returns to its button) until the pointer or focus leaves.
- **Bar:** fixed, solid Ink Black, `--nav-h` (3.5rem) tall with a 1px Hairline at the bottom, on every page and at every width. The home mosaic starts below it, and image headers are covered by it rather than showing through. The mobile menu's top row has the same height and hairline, so the logo and the burger/close button stay put when it opens. `scroll-padding-top` keeps anchored sections clear of it.
- **Mobile:** a burger of three 1.5px lines. It opens a full-screen black overlay with huge Plex Sans links (clamp(1.75rem→3rem)/600) that slide 16px right on hover. Opening it moves focus to the close button (the overlay turns visible at once and only the opacity fades), everything behind it is inert, and Esc closes it and returns focus to the burger.
- **Language switch:** always IT · EN · ES on every page. A language links to the page's translation, or, when the page has none, to the same section in that language, then to that language's home.

### Photo Mosaic
A full-bleed 12-column grid of real photos with 4px gaps. Photos show at `grayscale(1) contrast(1.1) brightness(.85)` and return to color with a 1.06 zoom on hover (0.5s). A display headline and a CTA sit over a bottom gradient, on the same left edge as the logo and the section side headings.

### BBS (home + menu)
The association was born as a BBS and the board still runs, so it gets a recognizable access: the last entry of the menu (and the mobile menu), "BBS", pointing at `telnet://bbs.olografix.org`, and the last home section — a short paragraph of what it is, ending on a colon that the command itself answers (`$ telnet bbs.olografix.org`, Plex Mono as the link: The Machine Text Rule). The footer link stays.

### Associati (home)
Joining the community outweighs buying from the Shop, so it precedes it: a short invitation, the membership fees in one Plex Sans line, and the page's only filled button — the inverted `.obtn` (white ground, black label), the strongest action the bulletin can make.

### Shop (home)
The Shop section uses the same side heading as every other home section ("Shop", columns 1–3). Its body (columns 4–12) is its own 9-column grid: the photo in the first four columns and, after one empty column, the fleece print ("INFORMATION WANTS TO BE FREE.", Plex Mono Bold, every line justified to 11ch, with "FREE." boxed in white), the intro, the bundle price and the outline button. Photo and print are top-aligned with the heading. The print is capped at 14.5cqi so it never leaves its column.

### Live Status
The open/closed state of each sede, polled from `sede.olografix.org` every 60s while the tab is visible. It has four states, all set in Plex Sans: loading (Text 46), open (LED Green), closed (LED Red) and unknown (Text 46, "stato non disponibile"). Any failure (network error, non-2xx response, a body that isn't exactly `true` or `false`, an 8s timeout) shows unknown. It never falls back to "closed", because a false "closed" turns people away from an open door. The text is rewritten only when the state changes, so the live region doesn't re-announce itself.

### Photo Lightbox
The photogallery opens photos in lightbox2, reskinned in `lightbox.min.css` (the "MX skin" block): a 95% black overlay, square corners, no frame, and controls drawn from lines (`static/images/lightbox/`, 1.5px stroke, square caps). The prev/next arrows sit on 48px black squares at the photo's edges and stay visible on touch. Every thumbnail link is named ("Apri la foto 3 di 88"), and the controls get labels in the page language from `main.js`.

## Do's and Don'ts

### Do:
- **Do** keep the page ground true black (#000) and draw all structure with 1px #1a1a1a hairlines.
- **Do** set every path, email, handle, ID and column-aligned date in Plex Mono, and every name, label, status and sentence in Plex Sans.
- **Do** build lists as hairline-separated index rows with the tone-fill and nudge hover.
- **Do** show photography in grayscale at rest and bring back color only on hover, except in the photogallery, where the photos are the content and stay in color.
- **Do** use the CTA Line for primary navigation-style calls to action.
- **Do** use the expo-out ease `cubic-bezier(.16,1,.3,1)` for movement and 0.2s linear color transitions for hover color changes.
- **Do** set all type flush-left and snap every element to the column grid.
- **Do** build icons and graphic marks from squares, circles and lines.

### Don't:
- **Don't** redraw, recolour, stretch or annotate the MX logo, or typeset "metro olografix" beside it. Use the official SVGs.
- **Don't** use Plex Mono for navigation, buttons or sentences, or at any weight other than Regular.
- **Don't** use red or green for anything except live status (The LED Rule).
- **Don't** round corners or add box-shadows to any surface.
- **Don't** introduce a text opacity outside 100/80/62/46%.
- **Don't** use Unicode glyphs (`((•))`, `◇`, `↻`, `⌘`, `☆`) as project or feature icons. They are slated for replacement and should not be extended into new work.
- **Don't** wrap content in filled cards. Rows and hairline lattices carry the structure.
- **Don't** center or justify text, and don't bring in Bauhaus red/yellow/blue.

## Implementation (Hugo)

- Brand source: github.com/Metro-Olografix/mx-graphics-assets (logo SVG/PNG, fonts, Graphics Standards Manual). Check it before changing logo or type.

- Stylesheet: `static/css/style.css` (plain CSS, no framework, no build step). Fonts are self-hosted in `static/fonts/`.
- Page shell: `layouts/_default/baseof.html` → `partials/nav.html`, `partials/mobile-menu.html`, `partials/footer.html`.
- Page headers: `partials/page-header.html` (photo header when the caller or the page's front matter gives an `image`, text header otherwise). The `image`/`imagePosition` fields are in the Attività archetype and in Front Matter CMS (`frontmatter.json`) for Attività, Progetti, Associazione and default pages.
- Section grid markup: `<section class="sec"><div class="wrap sec__in"><h2 class="sec__h">…</h2><div class="sec__body">…</div></div></section>`. Omit the `h2` for a lead section; add `sec__body--full` to span all 12 columns.
- Index rows: `partials/event-row.html` (activities) and `partials/project-row.html` (projects, with `partials/project-mark.html`). Give a new project a mark by adding its file name to `project-mark.html`, or set `mark:` in its front matter to reuse one.
- Live status light: `partials/sede-status.html`, driven by `static/js/main.js` from `sede.olografix.org`.
- Markdown headings are renumbered by `layouts/_default/_markup/render-heading.html`: the shallowest heading in a page becomes h2, so content that opens with `###` doesn't skip levels. Authors can keep writing whatever level reads right in the source.
- Markdown content gets `.prose` styling. The handful of Tailwind utility classes that existing content embeds on images (`md:float-right`, `md:float-left`, `max-w-sm`, `max-w-lg`) are mapped in `style.css`. Don't add new ones; prefer plain markdown.
