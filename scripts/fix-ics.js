/**
 * Post-process generated ICS files to ensure RFC 5545 compliance:
 * - Fold lines longer than 75 octets (§3.1)
 * - Use CRLF line endings (§3.1)
 *
 * Run after Hugo build:
 *   node scripts/fix-ics.js
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const MAX_OCTETS = 75;

/**
 * Fold a single content line so that no line exceeds MAX_OCTETS bytes.
 * Continuation lines start with a single space character (RFC 5545 §3.1).
 */
function foldLine(line) {
  const buf = Buffer.from(line, "utf-8");
  if (buf.length <= MAX_OCTETS) return line;

  const parts = [];
  let offset = 0;
  let isFirst = true;

  while (offset < buf.length) {
    // First line gets full 75 bytes; continuation lines lose 1 byte to the leading space
    const maxChunk = isFirst ? MAX_OCTETS : MAX_OCTETS - 1;
    let end = offset + maxChunk;

    if (end >= buf.length) {
      end = buf.length;
    } else {
      // Don't split in the middle of a multi-byte UTF-8 character
      // UTF-8 continuation bytes start with 10xxxxxx (0x80-0xBF)
      while (end > offset && (buf[end] & 0xc0) === 0x80) {
        end--;
      }
    }

    const chunk = buf.slice(offset, end).toString("utf-8");
    if (isFirst) {
      parts.push(chunk);
    } else {
      parts.push(" " + chunk);
    }

    offset = end;
    isFirst = false;
  }

  return parts.join("\r\n");
}

/**
 * Process an ICS file: fold long lines and convert to CRLF.
 */
function processICS(filePath) {
  if (!existsSync(filePath)) return false;

  const raw = readFileSync(filePath, "utf-8");

  // Normalize to LF first (in case of mixed endings), then split
  const lines = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  // Remove trailing empty lines from Hugo output
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  // Fold and rejoin with CRLF, ensure trailing CRLF
  const folded = lines.map(foldLine);
  const output = folded.join("\r\n") + "\r\n";

  writeFileSync(filePath, output);
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const icsFiles = [
  join(ROOT, "public", "calendar.ics"),
  join(ROOT, "public", "en", "calendar.ics"),
  join(ROOT, "public", "es", "calendar.ics"),
];

let processed = 0;
for (const f of icsFiles) {
  const rel = f.replace(ROOT + "/", "");
  if (processICS(f)) {
    processed++;
    console.log(`  OK  ${rel}`);
  } else {
    console.log(`  SKIP ${rel} (not found)`);
  }
}

console.log(`\nProcessed ${processed} ICS files.`);
