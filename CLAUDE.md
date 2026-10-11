# CLAUDE.md

Guidance for agents working in this repository.

## Design Context

This is the official site of **Metro Olografix**, a hacker / free-digital-culture association founded in 1994 (Pescara + L'Aquila). It's a Hugo static site, trilingual (it/en/es), source in `layouts/` + `static/css`, built output in `public/`.

- **Register:** brand (identity/content site — design is the product). **Platform:** web.
- **Strategy:** a community hub before a funnel. Serve curious newcomers and active regulars on the same page. Underground yet welcoming, with 30 years of roots. Primary CTA: come to an event in person; secondary: browse activities/projects.
- **Visual system — "The Underground Bulletin"** (secondary north star: Swiss Style / Bauhaus): pure black ground, white type at four AA-passing opacities, heavy IBM Plex Sans headlines over an IBM Plex Mono metadata layer, 1px hairline rules, square corners, no shadows, a 12-column grid with side headings in columns 1–3. Red/green appear only as live status. Plain CSS in `static/css/style.css`; no Tailwind, no third-party requests except the optional Umami param.
- **Anti-references:** corporate SaaS/startup, sterile-institutional, generic AI landing, overdesigned/flashy.

See **[PRODUCT.md](PRODUCT.md)** for strategy and **[DESIGN.md](DESIGN.md)** for the full token spec before designing or editing UI.
