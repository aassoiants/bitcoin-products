# Ideas

35 forward-looking ideas that bitcoin builders could pick up. One `.md` per idea. The slug is the filename (no in-file field for it).

These render as cards on [bitcoinproducts.xyz/ideas.html](https://bitcoinproducts.xyz/ideas.html).

## Schema

| Field | Meaning |
|---|---|
| `slug` | URL-safe identifier; matches the filename. Stable across reorderings. Used as the cross-link key from per-product files (in their `ideas_matches` field) and from the URL pattern `/idea/{slug}`. |
| `idea` | The one-sentence headline of the idea, written as an action verb plus outcome. Renders as the card's `<h2>`. |
| `card_body` | Three short sentences shown on the live card: a setup fact, the gap, and the invitation. No product names. |
| `body` | Longer body shown when someone opens the card's modal. Names real-world products and explains the specific gap. |
| `category` | One of: `reach`, `sovereignty`, `visibility`, `commerce`, `builder-tools`, `ai`. |
| `archetype` | One or more of `wire` (connect / integrate), `build` (ship something new), `understand` (explain a concept). Comma-separated for multi. |
| `audiences` | One or more of `bitcoin-user`, `newcomer`, `creator-merchant`, `custodian`, `node-operator`, `builder`, `gamer-game-designer`, `ai-agent-operator`. Comma-separated for multi. |
| `first_added` | ISO date the idea entered the archive. |
| `last_reviewed` | ISO date of the most recent body update. |

## `### Past products` section

Lists every hackathon product that's tackled this idea. Each bullet is one product:

```
- ProductName (year, hackathon-slug, status, optional-flags) — short note on the approach
```

Examples:

```
- Aircoin (2014, coinbase-bithack-2014) — mobile proximity transfer to a nearby person; 2nd Place, $5,000
- Bitcoin Connect (2023, lol-2-2023, alive) — One-button Lightning wallet connector for any webapp via NWC
- Mesh Lightning (2025, status as captured) — Lightning over Bluetooth mesh
```

Status values when present: `alive`, `dormant`, `dead`, `wound-down`, `unknown`. The hackathon-slug links to a per-hackathon file at [`../sources/{slug}.md`](../sources/). The product name (when normalized) often matches a per-product file at [`../products/{slug}.md`](../products/).

For greenfield ideas (no past attempts in our archive), the section reads `### Past products (0, greenfield)` with no bullets.

## Connects to

- **[`../products/{slug}.md`](../products/)**: product names in the Past products section reference per-product deep entries.
- **[`../sources/{slug}.md`](../sources/)**: hackathon slugs in Past products bullets reference per-hackathon canonical files.
- **`site/ideas.html`**: cards on bitcoinproducts.xyz/ideas.html are derived from these files.
