#!/usr/bin/env node

// OG / social cover generator (satori -> SVG -> resvg -> PNG, 1200x630).
//
// Cards follow "The Underground Bulletin" (DESIGN.md): pure black ground,
// white type at the four AA tiers (100/80/62/46), IBM Plex Sans in the MX
// hierarchy (title 700, side text 600, lead 400), Plex Mono Regular only for
// machine text (breadcrumb path, dates, domain), the official MX logo SVG,
// 1px hairlines, square corners, flush-left, no shadows/gradients/colour.
//
// Output: static/images/og/<lang>-<path-with-dashes>.png, e.g.
//   content/italiano/attivita/git.md          -> it-attivita-git.png
//   content/english/_index.md                 -> en-_index.png
//   content/italiano/associazione/sede/x.md   -> it-associazione-sede-x.png
// layouts/partials/og-image.html builds the same name from .File.Path.
//
// Usage: npm run og:generate            (only new or stale images)
//        npm run og:generate -- --force (regenerate everything)

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const FORCE = process.argv.includes('--force');

const CONTENT_DIR = 'content';
const OUTPUT_DIR = 'static/images/og';
const LOGO_PATH = 'static/images/logo/MX_lettering_white.svg';

// content/<dir> -> Hugo language code, locale for dates
const LANGS = {
  italiano: { code: 'it', locale: 'it-IT' },
  english: { code: 'en', locale: 'en-GB' },
  spanish: { code: 'es', locale: 'es-ES' },
};

// ---- Design tokens (DESIGN.md / static/css/style.css :root) ----------------
const C = {
  black: '#000000',
  line: '#1a1a1a', // Hairline
  w: '#ffffff', // Text 100
  w2: 'rgba(255,255,255,.8)', // Text 80
  w3: 'rgba(255,255,255,.62)', // Text 62
  w4: 'rgba(255,255,255,.46)', // Text 46
};
// latin-ext is registered under its own name: satori falls back per glyph
// along the font-family list, not between files sharing one family name.
const SANS = "'IBM Plex Sans', 'IBM Plex Sans Ext'";
const MONO = 'IBM Plex Mono';

// ---- Grid: 1200x630, 12 columns, side column = cols 1-3 --------------------
const W = 1200;
const H = 630;
const PAD_X = 64;
const PAD_Y = 56;
const GUTTER = 24;
const COL = (W - 2 * PAD_X - 11 * GUTTER) / 12;
const SIDE_W = Math.round(3 * COL + 2 * GUTTER); // cols 1-3
const MAIN_W = W - 2 * PAD_X - SIDE_W - GUTTER; // cols 4-12
const LOGO_W = 150; // official lettering SVG is 275.61 x 225.85
const LOGO_H = Math.round((LOGO_W * 225.85323) / 275.61368);

// ---- Fonts: only the files the card uses, from @fontsource (WOFF) ----------
// latin covers it/en/es; latin-ext is a glyph fallback (e.g. "ə").
const FONT_FILES = [
  { name: 'IBM Plex Sans', weight: 400, pkg: '@fontsource/ibm-plex-sans', file: 'ibm-plex-sans-latin-400-normal.woff' },
  { name: 'IBM Plex Sans', weight: 600, pkg: '@fontsource/ibm-plex-sans', file: 'ibm-plex-sans-latin-600-normal.woff' },
  { name: 'IBM Plex Sans', weight: 700, pkg: '@fontsource/ibm-plex-sans', file: 'ibm-plex-sans-latin-700-normal.woff' },
  { name: 'IBM Plex Sans Ext', weight: 400, pkg: '@fontsource/ibm-plex-sans', file: 'ibm-plex-sans-latin-ext-400-normal.woff' },
  { name: 'IBM Plex Sans Ext', weight: 600, pkg: '@fontsource/ibm-plex-sans', file: 'ibm-plex-sans-latin-ext-600-normal.woff' },
  { name: 'IBM Plex Sans Ext', weight: 700, pkg: '@fontsource/ibm-plex-sans', file: 'ibm-plex-sans-latin-ext-700-normal.woff' },
  { name: MONO, weight: 400, pkg: '@fontsource/ibm-plex-mono', file: 'ibm-plex-mono-latin-400-normal.woff' },
];

function loadFonts() {
  return FONT_FILES.map(({ name, weight, pkg, file }) => ({
    name,
    weight,
    style: 'normal',
    data: readFileSync(join(dirname(require.resolve(`${pkg}/package.json`)), 'files', file)),
  }));
}

// ---- Content helpers -------------------------------------------------------

// Minimal front matter parser: top-level `key: value` pairs only.
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n(.*?)\r?\n---/s);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (/^\s/.test(line)) continue; // nested keys / list items
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    data[key] = value;
  }
  return data;
}

function getAllMarkdownFiles(dir, files = []) {
  for (const item of readdirSync(dir)) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) getAllMarkdownFiles(fullPath, files);
    else if (item.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

const titleCache = new Map();
function sectionTitle(dir) {
  if (!titleCache.has(dir)) {
    const index = join(dir, '_index.md');
    titleCache.set(dir, existsSync(index) ? parseFrontmatter(readFileSync(index, 'utf-8'))?.title || null : null);
  }
  return titleCache.get(dir);
}

// Ancestor section titles (dirs with an _index.md), like the site breadcrumb.
function breadcrumb(filePath, langRoot) {
  const name = basename(filePath);
  // A bundle (index.md / _index.md) is its own directory; start above it.
  let dir = name === 'index.md' || name === '_index.md' ? dirname(dirname(filePath)) : dirname(filePath);
  const crumbs = [];
  while (dir.length > langRoot.length && dir.startsWith(langRoot)) {
    const t = sectionTitle(dir);
    if (t) crumbs.unshift(t);
    dir = dirname(dir);
  }
  return ['~', ...crumbs].join(' / ');
}

// "2026-11-06T19:00:00" -> "06 nov 2026 · 19:00" (no timezone shifts)
function formatDate(value, endValue, locale) {
  const m = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (!m) return null;
  const [, y, mo, d, hh, mm] = m;
  const day = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(+y, +mo - 1, +d)))
    .replace(/\./g, '');
  let out = day;
  if (hh && `${hh}:${mm}` !== '00:00') {
    out += ` · ${hh}:${mm}`;
    const e = String(endValue || '').match(/[T ](\d{2}):(\d{2})/);
    if (e && `${e[1]}:${e[2]}` !== '00:00') out += `–${e[1]}:${e[2]}`;
  }
  return out;
}

function readI18n(lang, key) {
  const m = readFileSync(`i18n/${lang}.toml`, 'utf-8').match(new RegExp(`^${key}\\s*=\\s*"(.*)"\\s*$`, 'm'));
  return m ? m[1] : null;
}

function readSiteDescription(lang) {
  const cfg = readFileSync('config.toml', 'utf-8');
  const block = cfg.split(new RegExp(`\\[languages\\.${lang}\\.params\\]`))[1];
  const m = block && block.match(/^\s*description\s*=\s*"(.*)"\s*$/m);
  return m ? m[1] : null;
}

// ---- Card ------------------------------------------------------------------

const el = (type, style, children) => ({ type, props: { style, children } });

function titleSize(title) {
  const n = title.length;
  if (n <= 18) return 96;
  if (n <= 34) return 80;
  if (n <= 56) return 68;
  return 60;
}

function createCard({ crumb, title, lead, meta, place, logo }) {
  const size = titleSize(title);

  const main = el('div', { display: 'flex', flexDirection: 'row', flexGrow: 1 }, [
    // cols 1-3: official MX monogram + lettering
    el('div', { display: 'flex', width: SIDE_W, flexShrink: 0, marginRight: GUTTER }, [
      { type: 'img', props: { src: logo, width: LOGO_W, height: LOGO_H } },
    ]),
    // cols 4-12: breadcrumb on top, title block on the bottom rule
    el('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: MAIN_W }, [
      el('div', { display: 'block', width: MAIN_W, fontFamily: MONO, fontSize: 22, lineHeight: 1.4, color: C.w4, lineClamp: 1 }, crumb || ''),
      el('div', { display: 'flex', flexDirection: 'column', width: MAIN_W }, [
        el('div', {
          display: 'block',
          width: MAIN_W,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.05,
          letterSpacing: -0.03 * size,
          color: C.w,
          lineClamp: 3,
        }, title),
        lead && el('div', {
          display: 'block',
          width: MAIN_W,
          marginTop: 24,
          fontFamily: SANS,
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 1.4,
          color: C.w2,
          lineClamp: 2,
        }, lead),
      ].filter(Boolean)),
    ]),
  ]);

  const bottom = el('div', { display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginTop: 24 }, [
    el('div', { display: 'flex', width: SIDE_W, flexShrink: 0, marginRight: GUTTER, fontFamily: MONO, fontSize: 22, color: C.w4 }, 'olografix.org'),
    el('div', { display: 'flex', flexDirection: 'row', alignItems: 'baseline', width: MAIN_W }, [
      meta && el('div', { display: 'flex', flexShrink: 0, marginRight: 32, fontFamily: MONO, fontSize: 22, color: C.w2 }, meta),
      place && el('div', { display: 'block', flexGrow: 1, flexShrink: 1, minWidth: 0, fontFamily: SANS, fontWeight: 600, fontSize: 22, color: C.w3, lineClamp: 1 }, place),
    ].filter(Boolean)),
  ]);

  return el('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: `${PAD_Y}px ${PAD_X}px`,
    background: C.black,
    fontFamily: SANS,
  }, [
    main,
    el('div', { display: 'flex', height: 1, marginTop: 40, background: C.line }, []), // hairline
    bottom,
  ]);
}

// Everything the card shows for one content file.
function cardData(filePath, fm, langDir) {
  const { code, locale } = LANGS[langDir];
  const langRoot = join(CONTENT_DIR, langDir);
  const isHome = filePath === join(langRoot, '_index.md');
  const section = filePath.slice(langRoot.length + 1).split('/')[0];
  const sedi = "Pescara · L'Aquila";

  if (isHome) {
    const hero = readI18n(code, 'heroTitle');
    return {
      crumb: null,
      title: hero ? hero.replace('{{ .Count }}', String(new Date().getFullYear() - 1994)) : 'Metro Olografix',
      lead: readSiteDescription(code),
      meta: null,
      place: sedi,
    };
  }

  const lead = fm.subtitle || fm.description || null;
  let meta = null;
  let place = sedi;
  if (section === 'attivita' && !basename(filePath).startsWith('_index')) {
    meta = fm.recurring === 'true' ? null : formatDate(fm.date, fm.endDate, locale);
    place = fm.recurring === 'true' && fm.recurrencePattern ? fm.recurrencePattern : fm.location || null;
  } else if (fm.year) {
    // A dated archive entry (album): the sedi line would misstate where it happened.
    meta = fm.year;
    place = null;
  }
  return { crumb: breadcrumb(filePath, langRoot), title: fm.title, lead, meta, place };
}

async function generateOGImages() {
  console.log('Generating OG images...');
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  let fonts;
  let logo;
  try {
    fonts = loadFonts();
    logo = `data:image/svg+xml;base64,${readFileSync(LOGO_PATH).toString('base64')}`;
  } catch (error) {
    console.error('Failed to load fonts or logo:', error.message);
    process.exit(1);
  }

  // A change to this script invalidates every image.
  const scriptMtime = statSync(SCRIPT_PATH).mtime;
  const markdownFiles = getAllMarkdownFiles(CONTENT_DIR);
  console.log(`Found ${markdownFiles.length} markdown files`);

  let generated = 0;
  let failed = 0;
  for (const filePath of markdownFiles) {
    try {
      const [, langDir, ...rest] = filePath.split('/');
      if (!LANGS[langDir]) continue;
      const fm = parseFrontmatter(readFileSync(filePath, 'utf-8'));
      if (!fm?.title) continue;

      const imageFileName = `${LANGS[langDir].code}-${rest.join('-').replace(/\.md$/, '')}.png`;
      const imagePath = join(OUTPUT_DIR, imageFileName);

      if (!FORCE && existsSync(imagePath)) {
        const imageMtime = statSync(imagePath).mtime;
        if (imageMtime >= statSync(filePath).mtime && imageMtime >= scriptMtime) continue;
      }

      const svg = await satori(createCard({ ...cardData(filePath, fm, langDir), logo }), { width: W, height: H, fonts });
      writeFileSync(imagePath, new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng());
      generated++;
    } catch (error) {
      failed++;
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`Generated ${generated} images${failed ? `, ${failed} failed` : ''}`);
  if (failed) process.exitCode = 1;
}

generateOGImages().catch((error) => {
  console.error(error);
  process.exit(1);
});
