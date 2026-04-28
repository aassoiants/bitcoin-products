#!/usr/bin/env node
// build-products-json.mjs
//
// Reads every data/products/*.md file (excluding 0-masterlist.md),
// parses the Field | Value markdown table, and inlines a products[]
// array into site/products.html by replacing the `const products = [...]`
// block.
//
// `ideas_matches` is derived from data/ideas/*.md `### Past products`
// sections at build time (not read from each per-product .md's `ideas_matches`
// field). Per-idea files are the authorial source; per-product files cache
// a stale copy.
//
// Field conventions (per docs/canonical-product-decision.md):
//   - hackathon, hackathon_slug   : semicolon-separated when multi-event
//   - origin_listing              : "slug1: val1; slug2: val2" when multi-event
//   - year                        : comma-separated
//   - product_type, categories,
//     specs, builders             : comma-separated lists
//   - awards, source_code         : string or "none"
//
// Usage:
//   node utilities/build-products-json.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const PRODUCTS_DIR = path.join(REPO_ROOT, 'data', 'products');
const IDEAS_DIR = path.join(REPO_ROOT, 'data', 'ideas');
const OUTPUT_HTML = path.join(REPO_ROOT, 'site', 'products.html');
const MASTERLIST_MD = path.join(REPO_ROOT, 'data', 'products', '0-masterlist.md');

function parseMarkdownTable(md) {
  const fields = {};
  for (const line of md.split('\n')) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*$/);
    if (!m) continue;
    const key = m[1].trim();
    const value = m[2].trim();
    if (key === 'Field' || /^-+$/.test(key)) continue;
    fields[key] = value;
  }
  return fields;
}

function splitList(value, separator) {
  if (!value || value === 'none' || value === '-') return [];
  return value.split(separator).map(s => s.trim()).filter(Boolean);
}

// --- Field validators ---
// categories + specs must be slug lists, never prose. If either contains a
// paren we treat the product as malformed and skip it (loud fail, not silent).
const validationErrors = [];

function validateSlugList(fieldName, value, productSlug) {
  if (!value || value === 'none' || value === '-') return true;
  if (value.includes('(')) {
    validationErrors.push(`${productSlug}: ${fieldName} contains prose; move to ${fieldName}_no_match. Got: ${value.slice(0, 80)}...`);
    return false;
  }
  return true;
}

function validateLink(value, productSlug, fieldName = 'link') {
  if (!value || value === 'none' || value === '-') return true;
  if (!/^https?:\/\//.test(value)) {
    validationErrors.push(`${productSlug}: ${fieldName} is not a URL. Got: ${value.slice(0, 80)}...`);
    return false;
  }
  if (/\s/.test(value) || /\(/.test(value)) {
    validationErrors.push(`${productSlug}: ${fieldName} contains whitespace or paren prose; should be a single canonical URL. Got: ${value.slice(0, 80)}...`);
    return false;
  }
  return true;
}

function deriveSeries(hackathonSlug) {
  return hackathonSlug.replace(/-20\d{2}.*$/, '');
}

function parseOriginListing(raw, hackathonSlugs) {
  if (!raw || raw === 'none') return null;
  if (hackathonSlugs.length <= 1) return raw;
  const byEvent = {};
  for (const part of raw.split(';').map(s => s.trim()).filter(Boolean)) {
    const m = part.match(/^([a-z0-9-]+):\s*(.+)$/);
    if (m) byEvent[m[1]] = m[2];
  }
  return Object.keys(byEvent).length > 0 ? byEvent : raw;
}

// --- Per-idea past-products parser ---
//
// Reads data/ideas/*.md (canonical per-idea files) and returns a Map of
// {normalizedName → Set<ideaSlug>}. Each per-idea .md has the shape:
//   ## {slug}
//   | Field | Value |
//   ...table...
//   ### Past products (N, status):
//   - Product Name (year, hackathon-slug, status, ...) — description
//   - Another Name, Third Name (year, ...) — description   [multi-product bullet]
//
// Greenfield ideas ("(0, greenfield)") have a `- none (greenfield)` placeholder
// bullet which we skip.

function normalizeName(name) {
  return name
    .trim()
    .toLowerCase()
    .split(' / ')[0]                                  // "Pathos / Agora" → "pathos"
    .replace(/\s*\(.*?\)\s*/g, '')                    // strip parentheticals
    .replace(/:\s*.*$/, '')                           // strip after colon (TANOS)
    .replace(/\s*-\s*self sovereign family.*/i, '')   // Cete
    .replace(/\s+diy\s+hardware\s+wallet$/i, '')      // Bowser
    .replace(/\s+wallet$/i, '')                        // trailing "wallet"
    .replace(/\s+(?:renamed|formerly)\s+.*$/i, '')
    .trim();
}

function parseIdeaPastProducts() {
  const nameToJobs = new Map();
  const landscapeNames = new Set();

  const files = fs.readdirSync(IDEAS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md').sort();
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(IDEAS_DIR, file), 'utf8');

    // Find the past-products section + capture its bullet block
    const ppHeaderMatch = md.match(/^### Past products\s*\(([^)]*)\)/m);
    if (!ppHeaderMatch) continue;
    if (/greenfield/i.test(ppHeaderMatch[1])) continue;

    const after = md.slice(ppHeaderMatch.index + ppHeaderMatch[0].length);
    const bullets = after.split('\n').filter(l => l.startsWith('- '));

    for (const line of bullets) {
      if (/^-\s*none\s*\(greenfield\)$/i.test(line.trim())) continue;
      const bulletMatch = line.match(/^-\s+(.+?)\s*\(/);
      if (!bulletMatch) continue;

      const namesStr = bulletMatch[1];
      const names = namesStr.split(/,\s*/);
      for (const rawName of names) {
        if (rawName.includes('{')) continue;  // skip template placeholders
        const normalized = normalizeName(rawName);
        if (!normalized) continue;
        landscapeNames.add(normalized);
        if (!nameToJobs.has(normalized)) nameToJobs.set(normalized, new Set());
        nameToJobs.get(normalized).add(slug);
      }
    }
  }

  return { nameToJobs, landscapeNames };
}

function productFromFields(fields, filename, nameToJobs) {
  const slug = filename.replace(/\.md$/, '');
  const hackathonSlugs = splitList(fields['hackathon_slug'], ';');
  const hackathonLabels = splitList(fields['hackathon'], ';');
  const years = splitList(fields['year'], ',').map(y => parseInt(y, 10)).filter(Number.isFinite);
  const series = [...new Set(hackathonSlugs.map(deriveSeries))];
  const origin = parseOriginListing(fields['origin_listing'], hackathonSlugs);
  const awards = fields['awards'];

  const productName = fields['name'] || slug;
  const matchedJobs = nameToJobs.get(normalizeName(productName)) || new Set();
  const ideasMatches = [...matchedJobs].sort();

  // Validate (collects errors, doesn't throw)
  validateSlugList('categories', fields['categories'], slug);
  validateSlugList('specs', fields['specs'], slug);
  validateLink(fields['link'], slug, 'link');
  validateLink(fields['source_code'], slug, 'source_code');

  const categoriesRaw = fields['categories'];
  const specsRaw = fields['specs'];
  const linkRaw = fields['link'];
  const sourceCodeRaw = fields['source_code'];

  const categories = (categoriesRaw && !categoriesRaw.includes('(')) ? splitList(categoriesRaw, ',') : [];
  const specs = (specsRaw && !specsRaw.includes('(')) ? splitList(specsRaw, ',') : [];
  // Prefer clean URL; fall back to first URL match if value contains prose; null if no URL at all.
  // Skip extraction when the value is explicitly negative ("none ...", "not surfaced ...") even if a URL appears later — that's usually a placeholder reference, not a canonical link.
  const extractFirstUrl = v => {
    if (!v) return null;
    if (/^\s*(none|not surfaced|n\/a|tbd)/i.test(v)) return null;
    return v.match(/(https?:\/\/[^\s,;)]+)/)?.[1] || null;
  };
  const link = linkRaw && /^https?:\/\/\S+$/.test(linkRaw) ? linkRaw : extractFirstUrl(linkRaw);
  const sourceCode = sourceCodeRaw && /^https?:\/\/\S+$/.test(sourceCodeRaw) ? sourceCodeRaw : extractFirstUrl(sourceCodeRaw);

  return {
    slug,
    deeply_analyzed: true,
    name: productName,
    years,
    year_display: years.join(', '),
    year_primary: years[0] || null,
    hackathon_slugs: hackathonSlugs,
    hackathon_labels: hackathonLabels,
    hackathon_series: series,
    team: fields['team'] || null,
    builders: splitList(fields['builders'], ','),
    product_type: splitList(fields['product_type'], ','),
    categories,
    categories_no_match: fields['categories_no_match'] || null,
    specs,
    specs_no_match: fields['specs_no_match'] || null,
    language: fields['language'] || null,
    source_code: sourceCode,
    description: fields['description'] || '',
    ideas_matches: ideasMatches,
    link,
    origin_listing: origin,
    last_activity: fields['last_activity'] || null,
    status: fields['status'] || null,
    status_confidence: fields['status_confidence'] || null,
    awards: (awards && awards !== 'none') ? awards : null,
  };
}

// --- Hackathons index (slug → display label) ---
//
// Reads each per-hackathon .md at github/data/sources/{slug}.md to extract
// the `name` field for slug → display label mapping used when rendering
// breadth-row hackathon labels.

const HACKATHONS_DIR = path.join(REPO_ROOT, 'data', 'sources');

function parseHackathons() {
  const slugToLabel = new Map();
  for (const file of fs.readdirSync(HACKATHONS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md')) {
    const slug = file.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(HACKATHONS_DIR, file), 'utf8');
    const m = md.match(/^\| name \|\s*(.+?)\s*\|\s*$/m);
    if (m) slugToLabel.set(slug, m[1].trim());
  }
  return slugToLabel;
}

// --- Masterlist breadth-row parser ---
//
// Reads data/products/0-masterlist.md `| Name | Team | Tagline | Scope |
// Hackathons | Link | Deep |` table and emits stub product entries for rows
// that pass scope (`bitcoin` or `bitcoin (adj:nostr)`) and aren't already
// covered by a deep .md entry.
//
// Stub schema mirrors the deep schema but with `deeply_analyzed: false` and
// most rich fields nulled out (no per-product file = no team metadata, no
// product_type, etc.). Filters degrade gracefully via empty arrays / null.

function slugifyName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function extractYearFromHackathonSlug(slug) {
  const m = slug.match(/(20\d{2})(?:-[a-z]{3})?$/);
  return m ? parseInt(m[1], 10) : null;
}

function parseMasterlist(hackathonLabels, nameToJobs, deepNormalizedNames) {
  const md = fs.readFileSync(MASTERLIST_MD, 'utf8');
  const stubs = [];
  const seenSlugs = new Set(); // tracks slugs to avoid collision (vs deep + vs other stubs)
  // Pre-seed with deep slugs (filename-derived) so stubs don't clash with them
  for (const f of fs.readdirSync(PRODUCTS_DIR)) {
    if (f.endsWith('.md') && f !== '0-masterlist.md' && f !== 'README.md') seenSlugs.add(f.replace(/\.md$/, ''));
  }

  let skippedDup = 0, skippedScope = 0, skippedEmpty = 0, skippedDeep = 0;

  for (const line of md.split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map(c => c.trim());
    if (cells.length < 8) continue;
    const [, name, team, tagline, scope, hackathonsRaw, link, deep] = cells;
    if (name === 'Name' || /^-+$/.test(name)) continue;
    if (!name || name === '[]') { skippedEmpty++; continue; }
    if (deep === '✓') { skippedDeep++; continue; }
    if (!/^bitcoin(\s*\(.+\))?$/.test(scope)) { skippedScope++; continue; }

    const normalized = normalizeName(name);
    if (deepNormalizedNames.has(normalized)) { skippedDup++; continue; }

    const hackathonSlugs = splitList(hackathonsRaw, ',');
    const labels = hackathonSlugs.map(s => hackathonLabels.get(s) || s);
    const series = [...new Set(hackathonSlugs.map(deriveSeries))];
    const years = [...new Set(hackathonSlugs.map(extractYearFromHackathonSlug).filter(Boolean))].sort();

    let baseSlug = slugifyName(name) || `unnamed-${stubs.length}`;
    let slug = baseSlug;
    let i = 2;
    while (seenSlugs.has(slug)) { slug = `${baseSlug}-${i++}`; }
    seenSlugs.add(slug);

    const matchedJobs = nameToJobs.get(normalized) || new Set();
    const ideasMatches = [...matchedJobs].sort();

    const linkClean = (link && /^https?:\/\/\S+$/.test(link)) ? link : null;

    stubs.push({
      slug,
      deeply_analyzed: false,
      name,
      years,
      year_display: years.join(', '),
      year_primary: years[0] || null,
      hackathon_slugs: hackathonSlugs,
      hackathon_labels: labels,
      hackathon_series: series,
      team: team || null,
      builders: [],
      product_type: [],
      categories: [],
      categories_no_match: null,
      specs: [],
      specs_no_match: null,
      language: null,
      source_code: null,
      description: tagline || '',
      ideas_matches: ideasMatches,
      link: linkClean,
      origin_listing: null,
      last_activity: null,
      status: null,
      status_confidence: null,
      awards: null,
    });
  }

  return { stubs, skipped: { duplicate: skippedDup, scope: skippedScope, empty: skippedEmpty, deep: skippedDeep } };
}

const { nameToJobs, landscapeNames } = parseIdeaPastProducts();
const hackathonLabels = parseHackathons();

const files = fs.readdirSync(PRODUCTS_DIR)
  .filter(f => f.endsWith('.md') && f !== '0-masterlist.md' && f !== 'README.md')
  .sort();

const products = [];
const unmappedProducts = [];
const mdNormalizedNames = new Set();
let errors = 0;
for (const file of files) {
  const md = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf8');
  const fields = parseMarkdownTable(md);
  if (!fields.name) {
    console.error(`[skip] ${file}: no name field`);
    errors++;
    continue;
  }
  const product = productFromFields(fields, file, nameToJobs);
  mdNormalizedNames.add(normalizeName(product.name));
  products.push(product);
  if (product.ideas_matches.length === 0) {
    unmappedProducts.push(`${file}: ${product.name}`);
  }
}

const deepCount = products.length;

const { stubs, skipped: stubSkipped } = parseMasterlist(hackathonLabels, nameToJobs, mdNormalizedNames);
products.push(...stubs);

products.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const json = JSON.stringify(products, null, 2);
const html = fs.readFileSync(OUTPUT_HTML, 'utf8');
const updated = html.replace(
  /const products = \[[\s\S]*?\];/,
  `const products = ${json};`
);

const productsBlockRegex = /const products = \[[\s\S]*?\];/;
if (!productsBlockRegex.test(html)) {
  console.error('error: could not find `const products = [...]` block in products.html');
  process.exit(1);
}

fs.writeFileSync(OUTPUT_HTML, updated);
const noChange = updated === html;
const bytes = Buffer.byteLength(json, 'utf8');
const verb = noChange ? 'verified (no change)' : 'wrote';
console.log(`${verb} ${products.length} products (${deepCount} deep + ${stubs.length} breadth, ${(bytes / 1024).toFixed(1)} KB) in ${path.relative(REPO_ROOT, OUTPUT_HTML)}`);
console.log(`masterlist breadth-row skips: ${stubSkipped.deep} already-deep, ${stubSkipped.duplicate} dup-by-name, ${stubSkipped.scope} non-bitcoin scope, ${stubSkipped.empty} empty/placeholder`);

const mappedCount = products.length - unmappedProducts.length;
const jobsCovered = new Set();
for (const p of products) for (const j of p.ideas_matches) jobsCovered.add(j);
console.log(`ideas_matches derived from data/ideas/*.md: ${mappedCount}/${products.length} products map to ${jobsCovered.size} idea slugs (${products.filter(p => !p.deeply_analyzed && p.ideas_matches.length).length} of those matches are on breadth stubs)`);

if (unmappedProducts.length > 0) {
  console.log(`\n${unmappedProducts.length} product(s) have no landscape mapping (ideas_matches=[]):`);
  for (const u of unmappedProducts) console.log(`  - ${u}`);
}

const landscapeOrphans = [...landscapeNames].filter(n => !mdNormalizedNames.has(n));
if (landscapeOrphans.length > 0) {
  console.log(`\n${landscapeOrphans.length} idea past-product name(s) have no matching .md (commercial refs or name drift):`);
  for (const n of landscapeOrphans.slice(0, 10)) console.log(`  - ${n}`);
  if (landscapeOrphans.length > 10) console.log(`  ... and ${landscapeOrphans.length - 10} more`);
}

if (errors > 0) console.log(`\n${errors} file(s) skipped`);

if (validationErrors.length > 0) {
  console.log(`\n=== VALIDATION ERRORS (${validationErrors.length}) ===`);
  console.log(`Malformed values were stripped from JSON output. Fix in source .md files.`);
  for (const e of validationErrors) console.log(`  - ${e}`);
}
