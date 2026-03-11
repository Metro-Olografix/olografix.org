/**
 * ICS (iCalendar) validation tests for the generated calendar.ics files.
 *
 * Run after Hugo build:
 *   node tests/validate-ics.js
 *
 * Validates RFC 5545 compliance, cross-checks against source markdown
 * front matter, and catches common template bugs.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Test runner ──────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const errors = [];

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    errors.push(message);
  }
}

// ── ICS parser ───────────────────────────────────────────────────────────────

/**
 * Parse a raw ICS string into an array of VEVENT objects.
 * Handles line unfolding (RFC 5545 §3.1).
 */
function parseICS(raw) {
  // Unfold continuation lines (CRLF + space/tab)
  const unfolded = raw.replace(/\r?\n[ \t]/g, "");
  const lines = unfolded.split(/\r?\n/);

  const events = [];
  let current = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = [];
      continue;
    }
    if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
      continue;
    }
    if (current === null) continue;

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const left = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 1);
    const semiIdx = left.indexOf(";");
    const property = semiIdx === -1 ? left : left.slice(0, semiIdx);
    const params = semiIdx === -1 ? "" : left.slice(semiIdx + 1);

    current.push({ property, params, value, raw: line });
  }

  return events;
}

function getProp(event, name) {
  return event.find((e) => e.property === name);
}

// ── Markdown front matter parser ─────────────────────────────────────────────

/**
 * Extract YAML front matter from a markdown file.
 * Returns a plain object with string values (no full YAML parsing needed).
 */
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    // Handle "key: value" and "key: \"value\"" with inline comments
    const m = line.match(/^(\w+)\s*:\s*(.+?)(?:\s+#.*)?$/);
    if (!m) continue;
    let val = m[2].trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[m[1]] = val;
  }
  return fm;
}

/**
 * Load all event front matter from a content directory.
 * Returns a Map of baseFileName -> frontMatter.
 */
function loadEventSources(contentDir) {
  const sources = new Map();
  if (!existsSync(contentDir)) return sources;

  for (const file of readdirSync(contentDir)) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    const slug = basename(file, ".md");
    const content = readFileSync(join(contentDir, file), "utf-8");
    const fm = parseFrontMatter(content);
    if (fm) sources.set(slug, fm);
  }
  return sources;
}

// ── Date helpers ─────────────────────────────────────────────────────────────

/** Parse ISO 8601 date string from front matter */
function parseISODate(isoStr) {
  return new Date(isoStr);
}

/** Format a Date as YYYYMMDD */
function formatDateOnly(d) {
  const y = d.getFullYear().toString().padStart(4, "0");
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}${m}${day}`;
}

/** Format a Date as YYYYMMDDTHHMMSS */
function formatDateTime(d) {
  return `${formatDateOnly(d)}T${d.getHours().toString().padStart(2, "0")}${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}${d.getSeconds().toString().padStart(2, "0")}`;
}

// ── Test suites ──────────────────────────────────────────────────────────────

function testFileStructure(raw, label) {
  // Must start and end correctly
  assert(raw.startsWith("BEGIN:VCALENDAR"), `${label}: must start with BEGIN:VCALENDAR`);
  assert(raw.trimEnd().endsWith("END:VCALENDAR"), `${label}: must end with END:VCALENDAR`);

  // Required calendar-level properties
  assert(raw.includes("VERSION:2.0"), `${label}: must contain VERSION:2.0`);
  assert(raw.includes("PRODID:"), `${label}: must contain PRODID`);
  assert(raw.includes("CALSCALE:GREGORIAN"), `${label}: must contain CALSCALE:GREGORIAN`);

  // Must have VTIMEZONE for Europe/Rome
  assert(raw.includes("BEGIN:VTIMEZONE"), `${label}: must contain VTIMEZONE block`);
  assert(raw.includes("TZID:Europe/Rome"), `${label}: must define Europe/Rome timezone`);

  // Balanced BEGIN/END pairs
  const beginCount = (raw.match(/^BEGIN:VEVENT$/gm) || []).length;
  const endCount = (raw.match(/^END:VEVENT$/gm) || []).length;
  assert(beginCount === endCount, `${label}: mismatched BEGIN:VEVENT (${beginCount}) vs END:VEVENT (${endCount})`);
  assert(beginCount > 0, `${label}: must contain at least one VEVENT`);
}

function testLineIntegrity(raw, label) {
  const lines = raw.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // CRITICAL: DTSTART and DTEND must never be on the same line
    if (line.includes("DTSTART") && line.includes("DTEND")) {
      assert(false, `${label}:${lineNum}: DTSTART and DTEND on same line — "${line.slice(0, 80)}"`);
    }

    // No two ICS properties concatenated on one line
    // (except inside DESCRIPTION/URL/X-ALT-DESC values which may contain property-like text)
    if (/^(DTSTART|DTEND|SUMMARY|LOCATION|RRULE|UID|DTSTAMP|STATUS)[;:]/.test(line)) {
      const colonIdx = line.indexOf(":");
      if (colonIdx !== -1) {
        const valuePart = line.slice(colonIdx + 1);
        const embedded = valuePart.match(
          /(DTSTART|DTEND|SUMMARY|RRULE|UID|DTSTAMP|STATUS|LOCATION|BEGIN|END)[;:]/
        );
        if (embedded) {
          assert(
            false,
            `${label}:${lineNum}: property "${embedded[1]}" embedded in another property's value — "${line.slice(0, 80)}"`
          );
        }
      }
    }

    // No blank lines inside VEVENT blocks (check context)
    // Blank lines between BEGIN:VEVENT and END:VEVENT are invalid
    if (line.trim() === "") {
      // Check if we're inside a VEVENT
      const preceding = lines.slice(0, i).join("\n");
      const lastBegin = preceding.lastIndexOf("BEGIN:VEVENT");
      const lastEnd = preceding.lastIndexOf("END:VEVENT");
      if (lastBegin > lastEnd) {
        assert(false, `${label}:${lineNum}: blank line inside VEVENT block`);
      }
    }
  }
}

function testEventProperties(events, label) {
  const uids = new Set();

  for (const event of events) {
    const uid = getProp(event, "UID");
    const dtstart = getProp(event, "DTSTART");
    const dtend = getProp(event, "DTEND");
    const summary = getProp(event, "SUMMARY");
    const dtstamp = getProp(event, "DTSTAMP");
    const rrule = getProp(event, "RRULE");
    const description = getProp(event, "DESCRIPTION");
    const eventLabel = summary ? `${label} [${summary.value.slice(0, 40)}]` : `${label} [unknown]`;

    // ── Required properties ──
    assert(uid, `${eventLabel}: missing UID`);
    assert(dtstart, `${eventLabel}: missing DTSTART`);
    assert(dtend, `${eventLabel}: missing DTEND`);
    assert(summary, `${eventLabel}: missing SUMMARY`);
    assert(dtstamp, `${eventLabel}: missing DTSTAMP`);
    assert(description, `${eventLabel}: missing DESCRIPTION`);

    if (!dtstart || !dtend || !uid) continue;

    // ── UID format and uniqueness ──
    assert(uid.value.includes("@"), `${eventLabel}: UID must contain @ — got "${uid.value}"`);
    assert(uid.value.endsWith("@olografix.org"), `${eventLabel}: UID must end with @olografix.org — got "${uid.value}"`);
    assert(!uids.has(uid.value), `${eventLabel}: duplicate UID "${uid.value}"`);
    uids.add(uid.value);

    // ── DTSTAMP format ──
    assert(
      /^\d{8}T\d{6}Z$/.test(dtstamp.value),
      `${eventLabel}: DTSTAMP must be UTC (YYYYMMDDTHHMMSSZ) — got "${dtstamp.value}"`
    );

    // ── DTSTART/DTEND format consistency ──
    const startIsAllDay = dtstart.params.includes("VALUE=DATE");
    const endIsAllDay = dtend.params.includes("VALUE=DATE");

    assert(
      startIsAllDay === endIsAllDay,
      `${eventLabel}: DTSTART and DTEND must use same format (start all-day=${startIsAllDay}, end all-day=${endIsAllDay})`
    );

    if (startIsAllDay) {
      // All-day: value must be exactly 8 digits
      assert(/^\d{8}$/.test(dtstart.value), `${eventLabel}: all-day DTSTART must be YYYYMMDD — got "${dtstart.value}"`);
      assert(/^\d{8}$/.test(dtend.value), `${eventLabel}: all-day DTEND must be YYYYMMDD — got "${dtend.value}"`);

      // DTEND must be strictly after DTSTART (exclusive end per RFC 5545)
      if (/^\d{8}$/.test(dtstart.value) && /^\d{8}$/.test(dtend.value)) {
        assert(
          parseInt(dtend.value) > parseInt(dtstart.value),
          `${eventLabel}: all-day DTEND (${dtend.value}) must be after DTSTART (${dtstart.value})`
        );
      }

      // Must NOT have TZID param for VALUE=DATE
      assert(!dtstart.params.includes("TZID"), `${eventLabel}: all-day DTSTART must not have TZID`);
      assert(!dtend.params.includes("TZID"), `${eventLabel}: all-day DTEND must not have TZID`);
    } else {
      // Timed: value must be YYYYMMDDTHHMMSS
      assert(
        /^\d{8}T\d{6}$/.test(dtstart.value),
        `${eventLabel}: timed DTSTART must be YYYYMMDDTHHMMSS — got "${dtstart.value}"`
      );
      assert(
        /^\d{8}T\d{6}$/.test(dtend.value),
        `${eventLabel}: timed DTEND must be YYYYMMDDTHHMMSS — got "${dtend.value}"`
      );

      // Must have TZID
      assert(dtstart.params.includes("TZID=Europe/Rome"), `${eventLabel}: timed DTSTART must have TZID=Europe/Rome`);
      assert(dtend.params.includes("TZID=Europe/Rome"), `${eventLabel}: timed DTEND must have TZID=Europe/Rome`);

      // DTEND must be >= DTSTART (timed events can have same start/end theoretically, but should be after)
      if (/^\d{8}T\d{6}$/.test(dtstart.value) && /^\d{8}T\d{6}$/.test(dtend.value)) {
        assert(
          dtend.value >= dtstart.value,
          `${eventLabel}: timed DTEND (${dtend.value}) must not be before DTSTART (${dtstart.value})`
        );
      }
    }

    // ── RRULE validation ──
    if (rrule) {
      const rv = rrule.value;

      // Must have FREQ
      const freqMatch = rv.match(/FREQ=(\w+)/);
      assert(freqMatch, `${eventLabel}: RRULE must contain FREQ`);

      if (freqMatch) {
        const validFreqs = ["SECONDLY", "MINUTELY", "HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
        assert(
          validFreqs.includes(freqMatch[1]),
          `${eventLabel}: RRULE FREQ must be valid — got "${freqMatch[1]}"`
        );
      }

      // UNTIL must end with Z
      const untilMatch = rv.match(/UNTIL=([^;]+)/);
      if (untilMatch) {
        assert(
          untilMatch[1].endsWith("Z"),
          `${eventLabel}: RRULE UNTIL must be UTC (end with Z) — got "${untilMatch[1]}"`
        );
        // UNTIL date format
        assert(
          /^\d{8}T\d{6}Z$/.test(untilMatch[1]),
          `${eventLabel}: RRULE UNTIL must be YYYYMMDDTHHMMSSZ — got "${untilMatch[1]}"`
        );
      }

      // Must not have both UNTIL and COUNT (RFC 5545 §3.3.10)
      assert(
        !(rv.includes("UNTIL=") && rv.includes("COUNT=")),
        `${eventLabel}: RRULE must not have both UNTIL and COUNT`
      );

      // BYDAY must use valid day codes
      const byDayMatch = rv.match(/BYDAY=([^;]+)/);
      if (byDayMatch) {
        const validDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
        for (const day of byDayMatch[1].split(",")) {
          // Allow optional prefix like 1MO, -1FR etc
          const dayCode = day.replace(/^-?\d+/, "");
          assert(
            validDays.includes(dayCode),
            `${eventLabel}: RRULE BYDAY contains invalid day code "${day}"`
          );
        }
      }

      // INTERVAL must be a positive integer if present
      const intervalMatch = rv.match(/INTERVAL=(\d+)/);
      if (intervalMatch) {
        assert(
          parseInt(intervalMatch[1]) >= 1,
          `${eventLabel}: RRULE INTERVAL must be >= 1 — got "${intervalMatch[1]}"`
        );
      }

      // No structural issues
      assert(!rv.includes(";;"), `${eventLabel}: RRULE has empty segments ";;": "${rv}"`);
      assert(!rv.startsWith(";"), `${eventLabel}: RRULE starts with semicolon: "${rv}"`);
      assert(!rv.endsWith(";"), `${eventLabel}: RRULE ends with semicolon: "${rv}"`);
      assert(!/FREQ=;/.test(rv), `${eventLabel}: RRULE has empty FREQ value`);
    }

    // ── Text field escaping ──
    for (const propName of ["SUMMARY", "LOCATION", "X-ALT-DESC"]) {
      const field = getProp(event, propName);
      if (!field) continue;
      const val = field.value;

      // Check for unescaped commas and semicolons (lookbehind for backslash)
      const unescapedComma = val.match(/(?<!\\),/);
      if (unescapedComma) {
        assert(false, `${eventLabel}: ${propName} contains unescaped comma — "${val.slice(0, 60)}"`);
      }

      const unescapedSemicolon = val.match(/(?<!\\);/);
      if (unescapedSemicolon) {
        assert(false, `${eventLabel}: ${propName} contains unescaped semicolon — "${val.slice(0, 60)}"`);
      }

      // Check for literal newlines (should be \n in ICS)
      assert(!val.includes("\n"), `${eventLabel}: ${propName} contains literal newline`);
      assert(!val.includes("\r"), `${eventLabel}: ${propName} contains literal carriage return`);
    }

    // ── DESCRIPTION should be an olografix.org URL ──
    if (description) {
      assert(
        description.value.startsWith("https://olografix.org/"),
        `${eventLabel}: DESCRIPTION should be an olografix.org URL — got "${description.value.slice(0, 60)}"`
      );
    }
  }
}

function testCrossValidation(events, sources, label) {
  for (const event of events) {
    const uid = getProp(event, "UID");
    if (!uid) continue;

    // Extract slug from UID (e.g., "hack-the-police@olografix.org" -> "hack-the-police")
    const slug = uid.value.replace("@olografix.org", "");
    const fm = sources.get(slug);
    if (!fm) continue; // Skip if no matching source (might be a different slug format)

    const summary = getProp(event, "SUMMARY");
    const dtstart = getProp(event, "DTSTART");
    const dtend = getProp(event, "DTEND");
    const location = getProp(event, "LOCATION");
    const rrule = getProp(event, "RRULE");
    const eventLabel = `${label} [${slug}]`;

    // ── Title must match ──
    if (summary && fm.title) {
      // ICS escapes commas and semicolons, source doesn't
      const unescaped = summary.value.replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\");
      assert(
        unescaped === fm.title,
        `${eventLabel}: SUMMARY "${unescaped}" doesn't match source title "${fm.title}"`
      );
    }

    // ── Start date must match ──
    if (dtstart && fm.date) {
      const isAllDay = dtstart.params.includes("VALUE=DATE");
      const srcDate = parseISODate(fm.date);

      if (isAllDay) {
        const expected = formatDateOnly(srcDate);
        assert(
          dtstart.value === expected,
          `${eventLabel}: DTSTART ${dtstart.value} doesn't match source date ${expected} (from ${fm.date})`
        );
      } else {
        const expected = formatDateTime(srcDate);
        assert(
          dtstart.value === expected,
          `${eventLabel}: DTSTART ${dtstart.value} doesn't match source date ${expected} (from ${fm.date})`
        );
      }
    }

    // ── End date cross-check for non-recurring events ──
    if (dtend && fm.endDate && fm.recurring !== "true") {
      const isAllDay = dtend.params.includes("VALUE=DATE");
      const srcEndDate = parseISODate(fm.endDate);

      if (isAllDay) {
        // Template adds +1 day for all-day events with 00:00 end time
        const srcTime = `${srcEndDate.getHours().toString().padStart(2, "0")}:${srcEndDate.getMinutes().toString().padStart(2, "0")}`;
        if (srcTime === "00:00") {
          const plusOne = new Date(srcEndDate);
          plusOne.setDate(plusOne.getDate() + 1);
          const expected = formatDateOnly(plusOne);
          assert(
            dtend.value === expected,
            `${eventLabel}: all-day DTEND ${dtend.value} doesn't match source endDate+1 ${expected} (from ${fm.endDate})`
          );
        }
      } else {
        const expected = formatDateTime(srcEndDate);
        assert(
          dtend.value === expected,
          `${eventLabel}: DTEND ${dtend.value} doesn't match source endDate ${expected} (from ${fm.endDate})`
        );
      }
    }

    // ── Location must match (if present in both) ──
    if (location && fm.location) {
      const unescaped = location.value.replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\");
      assert(
        unescaped === fm.location,
        `${eventLabel}: LOCATION "${unescaped}" doesn't match source "${fm.location}"`
      );
    }

    // ── Recurring events must have RRULE ──
    if (fm.recurring === "true") {
      assert(rrule, `${eventLabel}: source is recurring but ICS has no RRULE`);

      // Recurrence type must match
      if (rrule && fm.recurrenceType) {
        if (fm.recurrenceType === "weekly") {
          assert(rrule.value.includes("FREQ=WEEKLY"), `${eventLabel}: expected FREQ=WEEKLY for weekly recurrence`);
          assert(
            !rrule.value.includes("INTERVAL="),
            `${eventLabel}: weekly recurrence should not have INTERVAL`
          );
        } else if (fm.recurrenceType === "bi-weekly") {
          assert(rrule.value.includes("FREQ=WEEKLY"), `${eventLabel}: expected FREQ=WEEKLY for bi-weekly recurrence`);
          assert(rrule.value.includes("INTERVAL=2"), `${eventLabel}: expected INTERVAL=2 for bi-weekly recurrence`);
        } else if (fm.recurrenceType === "monthly") {
          assert(rrule.value.includes("FREQ=MONTHLY"), `${eventLabel}: expected FREQ=MONTHLY for monthly recurrence`);
        } else if (fm.recurrenceType === "yearly") {
          assert(rrule.value.includes("FREQ=YEARLY"), `${eventLabel}: expected FREQ=YEARLY for yearly recurrence`);
        }
      }

      // Recurrence day must match
      if (rrule && fm.recurrenceDay) {
        const dayMap = {
          monday: "MO", tuesday: "TU", wednesday: "WE", thursday: "TH",
          friday: "FR", saturday: "SA", sunday: "SU",
        };
        const expected = dayMap[fm.recurrenceDay.toLowerCase()];
        if (expected) {
          assert(
            rrule.value.includes(`BYDAY=${expected}`),
            `${eventLabel}: expected BYDAY=${expected} for recurrenceDay="${fm.recurrenceDay}"`
          );
        }
      }
    } else if (fm.recurring === "false") {
      assert(!rrule, `${eventLabel}: source is not recurring but ICS has RRULE`);
    }

    // ── Draft events should not appear ──
    if (fm.draft === "true") {
      // If we got here, a draft event IS in the ICS — this may or may not be
      // desired depending on Hugo build flags. We note it as informational.
      // Hugo with buildFuture=true still excludes draft=true.
      // Actually, drafts should NOT be in the output. Let's verify.
      assert(
        false,
        `${eventLabel}: draft event should not appear in ICS output`
      );
    }
  }

  // ── Check that all non-draft source events are present in ICS ──
  for (const [slug, fm] of sources) {
    if (fm.draft === "true") continue;

    const found = events.some((event) => {
      const uid = getProp(event, "UID");
      return uid && uid.value === `${slug}@olografix.org`;
    });
    assert(found, `${label}: source event "${slug}" is missing from ICS output`);
  }
}

function testEventCount(events, sources, label) {
  const nonDraftCount = [...sources.values()].filter((fm) => fm.draft !== "true").length;
  assert(
    events.length === nonDraftCount,
    `${label}: event count mismatch — ICS has ${events.length} events, source has ${nonDraftCount} non-draft events`
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log("ICS Validation Tests\n");

const calendars = [
  { ics: join(ROOT, "public", "calendar.ics"), content: join(ROOT, "content", "italiano", "attivita"), lang: "IT" },
  { ics: join(ROOT, "public", "en", "calendar.ics"), content: join(ROOT, "content", "english", "attivita"), lang: "EN" },
  { ics: join(ROOT, "public", "es", "calendar.ics"), content: join(ROOT, "content", "spanish", "attivita"), lang: "ES" },
];

let totalEvents = 0;

for (const { ics, content, lang } of calendars) {
  const label = ics.replace(ROOT + "/", "");

  if (!existsSync(ics)) {
    console.log(`  [${lang}] ${label}: SKIPPED (not found — run hugo build first)`);
    continue;
  }

  const raw = readFileSync(ics, "utf-8");
  const events = parseICS(raw);
  const sources = loadEventSources(content);

  console.log(`  [${lang}] ${label}: ${events.length} events (${sources.size} source files)`);

  testFileStructure(raw, label);
  testLineIntegrity(raw, label);
  testEventProperties(events, label);
  testEventCount(events, sources, label);
  testCrossValidation(events, sources, label);

  totalEvents += events.length;
}

console.log(`\nResults: ${passed} passed, ${failed} failed (${totalEvents} events across ${calendars.length} calendars)\n`);

if (errors.length > 0) {
  console.log("Failures:\n");
  for (const err of errors) {
    console.log(`  \u2717 ${err}`);
  }
  console.log();
  process.exit(1);
} else {
  console.log("All checks passed!\n");
}
