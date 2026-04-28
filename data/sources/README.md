# Sources

118 per-hackathon canonical files. Each `.md` is one bitcoin-themed hackathon (or buildathon, grant cohort, makeathon). The slug is the filename and includes the year (e.g. `berlin-bitcoin-2012.md`).

These provide the per-event metadata that products reference via their `hackathon_slug` field.

## Schema

| Field | Meaning |
|---|---|
| `slug` | URL-safe identifier including the year (`berlin-bitcoin-2012`). Filename matches. |
| `name` | Display name as the organizer used. |
| `year` | Calendar year of the event. |
| `dates` | Month/day range if known (`July 13-15, 2012`). |
| `location` | City or `online`. |
| `organizer` | Running entity or person, plus any co-organizers. |
| `type` | Primary product focus of the hackathon. See vocabulary below. |
| `sponsors` | List of sponsoring orgs. |
| `product_count` | Number of submissions to the hackathon. |
| `count_confidence` | How sure we are about the count: `confirmed`, `estimated`, or `none`. See vocabulary below. |
| `gallery_url` | Canonical project gallery if one exists, else a recap or announcement link. |
| `products_indexed` | Count of submissions that landed in our archive. |
| `products_deeply_analyzed` | Subset that has a per-product `.md` deep entry at [`../products/{slug}.md`](../products/). |
| `prizes` | Total prize pool or notable prizes. |
| `first_indexed` | ISO date when the event first entered the archive. |
| `last_reviewed` | ISO date of the most recent review pass. |

## Type vocabulary

| Value | What it means |
|---|---|
| `bitcoin` | A bitcoin-focused event. Includes both L1 protocol work (Core, Taproot, Miniscript, BIPs, on-chain tooling) and layer-2 / overlay work (Lightning, Liquid, ecash, Nostr-bitcoin, Payjoin, WebLN, NWC). |
| `mixed` | Multi-track events spanning bitcoin alongside non-bitcoin chains. |
| `shitcoin[, chain]` | Events branded around a non-bitcoin chain. The chain is noted after the comma when known: `shitcoin, stacks`, `shitcoin, rsk`, `shitcoin, bsv`, etc. We index these because some submissions inside them turn out to be genuine bitcoin work that passes the scope gate. |

## Count confidence vocabulary

| Value | What it means |
|---|---|
| `confirmed` | The count was verified against the hackathon's project gallery (we counted submissions ourselves). |
| `estimated` | The count comes from organizer announcements or press recaps; we couldn't independently verify. |
| `none` | No count available. The event happened but we don't have a reliable submission tally. |

## Sections

Each file has up to four sections after the field table:

- `### Winners` — placements (1st, 2nd, 3rd, etc.) with the winning product names. Optional; only present when the data is available.
- `### Notes` — organizer / judge / sponsor / era flavor. Free-form prose preserving context that doesn't fit the schema fields.
- `### Sources` — recap and announcement links extracted from Notes.
- `### Products from this hackathon` — auto-derived cross-link list of per-product `.md` files at [`../products/{slug}.md`](../products/) whose `hackathon_slug` includes this slug.

## Connects to

- **[`../products/{slug}.md`](../products/)** — per-product deep entries reference these via their `hackathon_slug` field; per-product breadth rows in [`../products/0-masterlist.md`](../products/0-masterlist.md) reference these via their `Hackathons` column.
- **[`../ideas/{slug}.md`](../ideas/)** — `### Past products` bullets in per-idea files name a hackathon-slug as the second-position parens token.
- **`site/products.html`** and **`site/ideas.html`** — the build pipeline reads each per-hackathon file's `name` field to render hackathon labels on cards.
