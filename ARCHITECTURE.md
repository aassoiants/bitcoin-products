# Architecture

How the data layer, the schemas, and the live site at [bitcoinproducts.xyz](https://bitcoinproducts.xyz) all hang together.

If you're trying to understand what feeds what, this is the map.

---

## File layout

```
repo root/
│
├── github/                                    ← THIS FOLDER (the published surface)
│   ├── README.md                               project overview + contribute guide
│   ├── ARCHITECTURE.md                         this doc
│   ├── LICENSE                                 MIT
│   │
│   ├── docs/
│   │   └── product-definition.md               scope reference: what counts as a bitcoin product
│   │
│   └── data/
│       │
│       ├── ideas/                              35 forward-looking ideas
│       │   ├── README.md                       schema + vocabulary docs
│       │   ├── wallet-less-recipient.md
│       │   ├── monetize-per-use.md
│       │   └── ...
│       │
│       ├── products/                           the product archive
│       │   ├── README.md                       schema + vocabulary docs
│       │   ├── 0-masterlist.md                 977-row catalog (all scopes, all events)
│       │   ├── nolooking.md                    76 deep entries
│       │   └── ...
│       │
│       └── sources/                            118 per-hackathon files
│           ├── README.md                       schema + vocabulary docs
│           ├── berlin-bitcoin-2012.md
│           ├── lol-1-2022.md
│           └── ...
│
├── site/                                      ← deployed to bitcoinproducts.xyz
│   ├── index.html                              landing
│   ├── ideas.html                              /ideas.html
│   ├── products.html                           /products.html
│   ├── 404.html                                /idea/{slug} + /product/{slug} routing
│   ├── favicon.svg
│   ├── og.png                                  social preview (shared)
│   └── CNAME                                   bitcoinproducts.xyz
│
└── .github/
    └── workflows/
        └── pages.yml                           deploy site/ on push to main
```

---

## The three data folders

### `data/ideas/` — forward-looking jobs to build

35 files. Each is one canonical idea: a job-to-be-done that bitcoin builders could pick up. The slug is the filename.

Schema in [`data/ideas/README.md`](data/ideas/README.md). Key fields: `idea` (the one-line headline), `body` (the longer prose), `category`, `archetype`, `audiences`. Each file also carries a `### Past products` section listing every hackathon attempt at that idea.

### `data/products/` — the bitcoin product archive

Two layers in one folder.

**Bulk index** (`0-masterlist.md`): 977 rows, one per submission across every event we've cataloged. Each row carries Name, Team, Tagline, Scope, Hackathons, Link, and a Deep flag. This is the raw inventory.

**Deep entries** (`{slug}.md`): 76 files, one per deeply analyzed product. Rich schema (~20 fields including `description`, `status`, `awards`, `source_code`, `last_activity`, `hackathon_slug`).

Schema + scope vocabulary in [`data/products/README.md`](data/products/README.md).

### `data/sources/` — the hackathon registry

118 files. Each is one canonical hackathon (or buildathon, grant cohort, makeathon). The slug includes the year (`berlin-bitcoin-2012`).

Schema in [`data/sources/README.md`](data/sources/README.md). Key fields: `name`, `year`, `dates`, `organizer`, `type`, `gallery_url`, `products_indexed`, `products_deeply_analyzed`. Each file also carries a `### Notes` section (organizer / judge / sponsor / era flavor) and an auto-derived `### Products from this hackathon` cross-link list.

---

## How they cross-reference

```
data/ideas/{slug}.md
   ├── slug ──────────────────► used by /idea/{slug} URLs
   │                             and as cross-link target from per-product files
   └── ### Past products bullets reference:
       ├── product names ─────► resolve to data/products/{slug}.md (by name)
       └── hackathon slugs ───► resolve to data/sources/{slug}.md

data/products/{slug}.md (deep)
   ├── filename = slug ───────► /product/{slug} URLs
   │                             and the cross-link target from per-idea Past products
   └── hackathon_slug ────────► resolves to data/sources/{slug}.md (semicolon-separated for multi-event)

data/products/0-masterlist.md (breadth rows)
   ├── Hackathons column ─────► resolves to data/sources/{slug}.md (comma-separated for multi-event)
   └── Deep flag ✓ ───────────► implies a sibling data/products/{slug}.md exists

data/sources/{slug}.md
   ├── filename = slug ───────► referenced by per-product hackathon_slug field
   │                             and by per-idea Past products bullets
   └── ### Products from this hackathon ── auto-cross-links to data/products/{slug}.md
```

---

## Product inventory math

The numbers you'll see across the site and the data:

```
977   total rows in 0-masterlist.md
        full catalog of every cataloged submission, all scopes, all events

569   bitcoin-scope rows
        the subset that passes the scope gate (rendered publicly)
        the rest: shitcoin, unclear, excluded, withdrawn (private record only)

 76   deeply analyzed
        have a per-product .md with full schema; rich modal card on the live site

492   indexed but not deep
        bitcoin-scope row in the masterlist, no per-product .md yet
        renders as a stub card with the dashed "indexed only" treatment

568   total cards on /products.html
        76 deep + 492 breadth (off by 1 from 569 due to a name-dedup at build time)
```

The hackathon side is simpler:

```
118   per-hackathon files in data/sources/
        the events we've cataloged at all, regardless of how many products surfaced

 ~50  events with at least one deep-scraped product
        the rest are registry-only or breadth-only
```

---

## Live site files

| File | What it is | Data source |
|---|---|---|
| `site/index.html` | landing page (manifesto, scoreboard, three teasers) | hardcoded numbers + 3-row teaser table linking to `/product/{slug}` |
| `site/ideas.html` | 35 cards + filter + modal | cards hand-authored HTML; `window.ideaProducts` JS object built from `data/ideas/` past-products sections |
| `site/products.html` | 568 cards + filter + modal | `const products = [...]` JSON inlined, built from `data/products/` (deep + masterlist), `data/ideas/` (for the ideas_matches field), `data/sources/` (for hackathon labels) |
| `site/404.html` | URL routing | regex rewrites `/idea/{slug}` → `/ideas.html#idea/{slug}`, `/product/{slug}` → `/products.html#product/{slug}` |
| `site/og.png` | social preview image | shared across all three pages via og:image |
| `site/CNAME` | custom domain | tells GitHub Pages to serve at `bitcoinproducts.xyz` |
| `.github/workflows/pages.yml` | deploy job | watches main, copies `site/*` to GitHub Pages on every push |

---

## Visitor data flow

When someone opens `/products.html`:

1. GitHub Pages serves the static `site/products.html` (all 568 products inlined as JSON).
2. JS renders the 76 deep cards (default analysis filter is "deeply analyzed").
3. User unticks the filter or adds "lightly analyzed" → 492 breadth cards render too.
4. User clicks a card → modal opens with all schema fields from the inlined JSON.
5. The modal's "ideas match" field shows links to `/idea/{slug}` for each idea this product addresses.
6. Click → `/idea/{slug}` 404s → `site/404.html` rewrites to `/ideas.html#idea/{slug}` → ideas.html opens that idea's modal.

When someone opens `/ideas.html`:

1. GitHub Pages serves the static `site/ideas.html` (35 cards + `window.ideaProducts` inlined).
2. JS renders the 35 cards. Default state shows all of them; filters narrow by archetype, category, audience.
3. User clicks a card → modal opens with the long body and a past-products table.
4. Each past-product row links to `/product/{slug}` if the product has a deep entry; otherwise it's text-only.

---

## Relationship to internal working files

The repo on disk has more than what's in `github/`. The rest is internal: working drafts, audit trails, methodology docs, build scripts, design exploration. Those don't ship and aren't linked from anything you see at github.com or bitcoinproducts.xyz.

If you're cloning this repo to fork or reuse: everything you need is in `github/` and `site/`. The rest is the curator's workshop.
