---
name: Metro Olografix
description: The Corkboard Bulletin — a terminal-native, neobrutalist community board for a 30-year hacker collective.
colors:
  deep-circuit: "#16213e"
  deep-circuit-accent: "#042a59"
  pale-slate: "#e2e8f0"
  board-indigo: "#eef2ff"
  card-white: "#ffffff"
  prose-ink: "#333333"
  signal-green: "#10b981"
  signal-green-deep: "#059669"
  alert-red: "#dc2626"
  spark-pink: "#e94560"
  spark-amber: "#fca311"
  muted-line: "#666666"
  code-mist: "#f1f5f9"
typography:
  display:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.prose-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "16px"
  card-title:
    textColor: "{colors.deep-circuit-accent}"
    typography: "{typography.title}"
  button-primary:
    backgroundColor: "{colors.deep-circuit-accent}"
    textColor: "{colors.pale-slate}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-event:
    backgroundColor: "{colors.signal-green-deep}"
    textColor: "{colors.card-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  badge:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.prose-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-upcoming:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.card-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
---

# Design System: Metro Olografix

## 1. Overview

**Creative North Star: "The Corkboard Bulletin"**

Metro Olografix looks like a community noticeboard run by hackers: hard-edged cards pinned to a wall, events and projects tacked up where anyone can read them, everything typed in the same honest monospace. It is terminal-native — IBM Plex Mono end to end, a blinking `_` cursor after the wordmark, `//` comment prefixes on section headers — but the terminal here is a door held open, not a gate. The system's job is to make a living, 30-year-old collective feel *present*: real dates, real spaces, real people, stamped onto the page with weight.

The signature move is the frame. Cards wear a thick `4px` Deep Circuit border and a hard `8px 8px` offset shadow with no blur — a deliberate paper-cutout weight that reads as tactile and confident, a bulletin pinned up rather than a soft SaaS surface floating in space. Nothing is glassy, nothing gradients, nothing apologizes for being built by hand. Seasonal flourishes (the December Christmas-lights string, the membership "shop effect") are welcome precisely because they're handmade and a little irreverent — the underground voice showing through.

This system explicitly rejects the corporate SaaS/startup look (no gradient heroes, no interchangeable rounded icon-cards, no stock "team collaborating" photography), the sterile-institutional register (nothing gray, bureaucratic, or public-office lifeless), the generic AI landing page (no cream backgrounds, no tracked eyebrows, no identical repeated card grids), and the overdesigned/flashy trap (effects never win over usability). The mono is heritage, not costume — this is a literal hacker association, so the terminal register is earned.

**Key Characteristics:**
- Monospace everything — IBM Plex Mono is the single voice, weighted for hierarchy.
- Hard neobrutalist frames — `border-4` + blurless `8px` offset shadow, sharp corners.
- Terminal grammar — blinking cursor, `//` comment headers, `>>` link affordances.
- Deep Circuit navy on a soft indigo board, with green as the "it's live / it's open" signal.
- Handmade over slick — seasonal, playful, unmistakably built by the collective.

## 2. Colors

A restrained, high-contrast palette: one deep navy carries structure, green signals life, and a two-note spark pair adds hacker mischief on hover.

### Primary
- **Deep Circuit** (#16213e): The structural navy. Card borders, the desktop header bar, section headings, prose emphasis. This is the ink the whole board is drawn with.
- **Deep Circuit Accent** (#042a59): The slightly bluer sibling used for interactive ink — links, card titles, primary buttons, the "visit / go" affordances. Where Deep Circuit is structure, this is action.

### Secondary
- **Signal Green** (#10b981) and **Signal Green Deep** (#059669): The "it's happening" color. Upcoming-event badges, the highlighted next-event panel, the primary event CTA, the sede "open now" status dot. Green means real, live, and go.

### Tertiary
- **Spark Pink** (#e94560) and **Spark Amber** (#fca311): The rainbow-hover pair. Reserved for playful moments — the animated wordmark/menu hover cycling pink → amber → white. Personality, never structure.

### Neutral
- **Board Indigo** (#eef2ff): The page background (Tailwind `indigo-50`). The soft board that everything is pinned to — cool, quiet, never cream.
- **Card White** (#ffffff): The surface of every pinned card.
- **Prose Ink** (#333333): Body copy on white.
- **Muted Line** (#666666): Badge outlines, hairline dividers, secondary meta text.
- **Code Mist** (#f1f5f9): Inline `code` background and table zebra.
- **Alert Red** (#dc2626): Reserved strictly for the sede "closed" status. Never decorative.

### Named Rules
**The Board-Not-Cream Rule.** The background is cool Board Indigo, never a warm cream/sand/paper tint. Warmth in this brand comes from voice and seasonal flourishes, never from a beige surface.

**The Green-Means-Live Rule.** Green is the signal that something is real and happening now — upcoming events, open spaces, active membership. Never spend it on decoration; its meaning is the point.

## 3. Typography

**Display Font:** IBM Plex Mono (fallback `ui-monospace, monospace`)
**Body Font:** IBM Plex Mono (same family)
**Label/Mono Font:** IBM Plex Mono (same family)

**Character:** One family, many weights. The whole system speaks in a single monospace voice and builds hierarchy through weight and size alone — the honest, evenly-spaced cadence of a terminal or a typewritten bulletin. Chosen deliberately as heritage for a real hacker collective, not as a shorthand for "technical."

### Hierarchy
- **Display** (700, `clamp(1.5rem, 4vw, 3rem)`, line-height 1.1): The "Metro Olografix_" wordmark with its blinking cursor. One per page, top-left.
- **Headline** (700, 1.875rem / `text-3xl`): Section headers, often prefixed `//` as a code-comment (`// Le nostre sedi`). The primary way the page is chunked.
- **Title** (700, 1.25rem / `text-xl`, Deep Circuit Accent): Card titles — the name of an event, project, or space.
- **Body** (400, 1rem, line-height 1.6, Prose Ink): Card content and long-form prose. Cap measure at 65–75ch in prose contexts.
- **Label** (600, 0.75rem): Badges, dates, recurrence and location meta. Short strings only.

### Named Rules
**The One-Voice Rule.** IBM Plex Mono is the only typeface. Never introduce a second family for "contrast" — contrast comes from weight (400 → 700) and size. A proportional font anywhere breaks the terminal.

**The Comment-Header Rule.** Section headings may lead with `//` as a deliberate code-comment gesture. It's a brand system, not a decorative eyebrow — use it as structure, never as a tracked all-caps kicker above every block.

## 4. Elevation

Flat surface, hard shadow. This system has no ambient/blurred elevation. Depth is expressed by a single neobrutalist device: a thick border plus a blurless, offset drop shadow that reads as a physical cutout pinned to the board. Shadows are structural and decorative-by-identity, never soft ambience.

### Shadow Vocabulary
- **Pinned Card** (`box-shadow: 8px 8px 0px 0px rgba(22,33,62,1)`): The signature. A hard Deep Circuit shadow offset down-right with zero blur. Applied to feature cards (`withShadow: true`). The whole neobrutalist identity lives here.
- **Stamped Badge** (`box-shadow: 1px 1px 0px rgba(0,0,0,0.2)`): A tiny hard shadow giving badges a stamped, tactile lift.

### Named Rules
**The No-Blur Rule.** Shadows never blur. Every shadow is a hard offset (`0px` blur) in a solid color. A soft, blurred, low-opacity shadow is the SaaS look this system rejects — if it looks like it's floating on a cloud, it's wrong; it should look pinned to a board.

**The Frame-First Rule.** Elevation always pairs with a real border (`border-4` Deep Circuit). The shadow is the border's cast, not a standalone glow.

## 5. Components

### Buttons
- **Shape:** Softly rounded (`8px` / `rounded-lg`) — the one place corners relax, so tap targets read as pressable.
- **Primary:** Deep Circuit Accent background, Pale Slate text, `8px 16px` padding. Used for "all activities / all projects" and the membership banner. Often full-width and centered.
- **Event CTA:** Signal Green Deep background, white text — the "come to this event" action, tinted with the live-green meaning.
- **Hover / Focus:** Color deepens on hover (`hover:bg-green-700` etc.); links underline. All state changes stay within a `~0.2–0.3s` ease. Ensure a visible `:focus-visible` ring for keyboard users.

### Badges
- **Style:** Card White background, `1px` Muted Line border, `4px` radius, Stamped-Badge shadow, `12px` label type.
- **State:** Default (neutral, e.g. "past") vs **Upcoming** — Signal Green fill, white text, green border. Green badge = live.

### Cards / Containers (signature)
- **Corner Style:** Sharp (`0` radius). Corners are never rounded on cards — the hard edge is the identity.
- **Background:** Card White on the Board Indigo page.
- **Border:** `4px` solid Deep Circuit. Non-negotiable; the frame defines the card.
- **Shadow Strategy:** Optional Pinned-Card hard offset shadow (see Elevation) for featured cards; list cards may sit flat inside a grid.
- **Internal Padding:** `16px` (`p-4`). Footer strip (badge + `link >>`) sits on a `gray-100` band, flush to the frame.

### Inputs / Fields
No native form system ships today (the site is content-first). When inputs are added: `2px` Deep Circuit stroke, sharp corners, Card White fill, a hard `focus` shift (border thickens / offset shadow appears) rather than a soft glow — consistent with the No-Blur Rule.

### Navigation
- **Desktop:** A full-width Deep Circuit bar. White links, `hover:underline`, active link bold. Dropdowns open on hover as bordered Deep Circuit panels. Social icons + it/en/es language switch sit at the right, always visible and equivalent per page.
- **Mobile:** Bar collapses to a menu-image button that opens the menu partial.
- **Wordmark:** "Metro Olografix" with a blinking `_` cursor; hover triggers the rainbow (Spark Pink → Amber → white) cycle.

### Signature: the Highlighted Next Event
A Signal-Green-framed panel (`border-2` green, `green-50` fill) that surfaces the single nearest upcoming activity with a large day/month/year stamp. This is the primary-CTA engine — it makes "come to an event" impossible to miss.

## 6. Do's and Don'ts

### Do:
- **Do** frame cards with `4px` Deep Circuit borders and sharp `0` corners — the hard edge is the brand.
- **Do** use the blurless `8px 8px 0 rgba(22,33,62,1)` offset shadow for featured cards, and only ever hard, un-blurred shadows.
- **Do** keep IBM Plex Mono as the single voice; build hierarchy with weight (400→700) and size.
- **Do** spend Signal Green only on things that are genuinely live — upcoming events, open sedi, active membership.
- **Do** keep the it/en/es switch obvious, consistent, and equivalent on every page; language access is core here.
- **Do** honor `prefers-reduced-motion` for the blink cursor, hover rainbow, and any seasonal effect (the Christmas lights already do).
- **Do** hold WCAG AA contrast — bump muted grays toward Prose Ink if body text on white is even close.

### Don't:
- **Don't** ship the corporate SaaS/startup look — no gradient heroes, no soft blurred shadows, no interchangeable rounded icon-card grids, no "empower/supercharge/next-generation" copy.
- **Don't** drift sterile-institutional — nothing gray, bureaucratic, or public-office lifeless.
- **Don't** slide into the generic AI landing page — no cream/sand/paper background, no tiny tracked uppercase eyebrows above every section, no identical repeated card grids.
- **Don't** overdesign — effects never win over usability; the terminal personality is texture, not spectacle.
- **Don't** use gradient text (`background-clip: text`), decorative glassmorphism, or side-stripe `border-left` accents. Emphasis comes from weight, the frame, and green.
- **Don't** round card corners or blur a shadow — that instantly reads as the SaaS surface this system rejects.
- **Don't** add a second typeface. If it isn't IBM Plex Mono, it doesn't belong.
