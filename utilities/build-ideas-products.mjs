#!/usr/bin/env node
// build-ideas-products.mjs
//
// Reads data/ideas/*.md (canonical per-idea files) and emits a
// `window.ideaProducts = {...}` JSON object inlined into site/ideas.html.
//
// Each per-idea .md has a `### Past products (...)` section with bullets:
//   - ProductName (year, hackathon-slug, status, ...flags) — mechanism
//
// Output shape per idea: { name, year, hack, status, mech }.
// `hack` is the first hackathon-slug found in the bullet's parens.
// `status` is 'alive' | 'dormant' | 'dead' | 'wound-down' | 'unknown'.
// Multi-product bullets ("Foo, Bar (year, ...) — desc") emit one entry each
// with the shared parens/mech.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const IDEAS_DIR = path.join(REPO_ROOT, 'data', 'ideas');
const OUTPUT_HTML = path.join(REPO_ROOT, 'site', 'ideas.html');

const KNOWN_STATUSES = new Set(['alive', 'dormant', 'dead', 'wound-down', 'wound down']);
const HACK_SLUG_RE = /^[a-z][a-z0-9-]*-(?:20\d{2})(?:-[a-z]{3})?(?:\+[a-z][a-z0-9-]*-20\d{2}(?:-[a-z]{3})?)*$/;
const YEAR_TOKEN_RE = /^(?:20\d{2})(?:[-+]20?\d{2}|\+)?(?:\+)?$/;

function parseBullet(line) {
  // line example: "ProductName / Alt (2024, mit-bitcoin-2024, alive) — mechanism"
  const dashSplit = line.split(' — ');
  const head = dashSplit[0];
  const mech = dashSplit.slice(1).join(' — ').trim();

  const parenMatch = head.match(/^(.+?)\s*\(([^)]*)\)\s*$/);
  if (!parenMatch) return [{ name: head.trim(), year: '', hack: '', status: 'unknown', mech }];

  const namesRaw = parenMatch[1];
  const parens = parenMatch[2];

  const tokens = parens.split(',').map(t => t.trim()).filter(Boolean);

  let year = '';
  let hack = '';
  let status = 'unknown';
  let deeplyAnalyzed = false;

  for (const t of tokens) {
    const tl = t.toLowerCase();
    if (!year && /^20\d{2}/.test(t)) {
      year = t;
      continue;
    }
    if (!hack) {
      // Strip any " + extra-event" continuations and trailing flags
      const firstSlug = t.split('+')[0].trim();
      if (HACK_SLUG_RE.test(firstSlug) || /^[a-z][a-z0-9-]*$/.test(firstSlug)) {
        hack = firstSlug;
        continue;
      }
    }
    if (KNOWN_STATUSES.has(tl)) { status = tl.replace(' ', '-'); continue; }
    if (/alive via canonical/i.test(t)) { status = 'alive'; continue; }
    if (/^status as captured$/i.test(t)) { status = 'unknown'; continue; }
    if (/^deeply analyzed|deep-scraped/i.test(t)) { deeplyAnalyzed = true; continue; }
    // Anything else gets ignored gracefully (e.g. "Honorable Mentions", "1st Place")
  }

  // Slash-names ("Moneysocket / Costanza") are one product with alt-name — keep as
  // single entry. Comma-separated multi-product bullets are rare and would break
  // names like "Foo Bar, Inc" if auto-split, so keep verbatim too. Split by hand
  // in the source .md if a real multi-product bullet appears.
  const name = namesRaw.trim();
  return [{ name, year, hack, status, mech, deeply_analyzed: deeplyAnalyzed }];
}

function parseIdeaFile(filepath) {
  const md = fs.readFileSync(filepath, 'utf8');
  const slug = path.basename(filepath, '.md');

  // Find the `### Past products (...)` header and capture text after it.
  const headerMatch = md.match(/^### Past products\s*\(([^)]*)\)/m);
  if (!headerMatch) return { slug, products: [] };

  const meta = headerMatch[1];
  if (/greenfield/i.test(meta)) return { slug, products: [] };

  const after = md.slice(headerMatch.index + headerMatch[0].length);

  const bullets = after
    .split('\n')
    .filter(l => l.trim().startsWith('- '))
    .map(l => l.replace(/^\s*-\s*/, '').trim())
    .filter(b => b && !/^none\s*\(greenfield\)$/i.test(b));

  const products = [];
  for (const b of bullets) {
    for (const entry of parseBullet(b)) products.push(entry);
  }
  return { slug, products };
}

function buildIdeaProductsObject() {
  const files = fs.readdirSync(IDEAS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md').sort();
  const obj = {};
  for (const f of files) {
    const { slug, products } = parseIdeaFile(path.join(IDEAS_DIR, f));
    obj[slug] = products;
  }
  return { obj, fileCount: files.length };
}

function inlineIntoHtml(obj) {
  const html = fs.readFileSync(OUTPUT_HTML, 'utf8');
  const json = JSON.stringify(obj, null, 4)
    .replace(/^/gm, '  ')          // indent the whole object 2 spaces
    .replace(/\n( {2})}/, '\n$1};') // close with semicolon
    .replace(/^ {2}/, '');           // un-indent the leading {

  // Match window.ideaProducts = { ... }; including trailing semicolon, balancing braces by lazy regex up to the closing };
  const pattern = /window\.ideaProducts\s*=\s*\{[\s\S]*?\n\s*\};/;
  if (!pattern.test(html)) {
    console.error('error: could not find `window.ideaProducts = {...};` block in ideas.html');
    process.exit(1);
  }
  const replacement = `window.ideaProducts = ${json}`;
  const updated = html.replace(pattern, replacement);
  fs.writeFileSync(OUTPUT_HTML, updated);
  return { changed: updated !== html, bytes: Buffer.byteLength(replacement, 'utf8') };
}

function main() {
  const { obj, fileCount } = buildIdeaProductsObject();
  const ideaCount = Object.keys(obj).length;
  const productCount = Object.values(obj).reduce((n, arr) => n + arr.length, 0);
  const greenfieldCount = Object.values(obj).filter(arr => arr.length === 0).length;

  const { changed, bytes } = inlineIntoHtml(obj);

  console.log(`${changed ? 'wrote' : 'verified (no change)'} window.ideaProducts: ${ideaCount} ideas, ${productCount} past-products, ${greenfieldCount} greenfield (${(bytes / 1024).toFixed(1)} KB inline) in ${path.relative(REPO_ROOT, OUTPUT_HTML)}`);

  // Sanity: any ideas with zero products that aren't expected to be greenfield?
  const empties = Object.entries(obj).filter(([_, arr]) => arr.length === 0).map(([s]) => s);
  if (empties.length > 0) {
    console.log(`\nempty (greenfield) ideas: ${empties.join(', ')}`);
  }
}

main();
