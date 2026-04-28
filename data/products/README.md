# Products

The bitcoin product archive in two layers, no overlap:

- **`{slug}.md`** — 76 deep entries with the full schema. The slug is the filename (no in-file field for it). These render as the rich modal cards on [bitcoinproducts.xyz/products.html](https://bitcoinproducts.xyz/products.html).
- **`0-masterlist.md`** — ~912-row breadth catalog of every other product across every hackathon we've cataloged (deep entries not duplicated here). Each row has `Name`, `Team`, `Tagline`, `Scope`, `Hackathons`, `Link`. The bitcoin-scope subset (~492 rows) renders as "indexed only" stub cards on the live site. The rest (shitcoin, unclear, excluded, withdrawn) is the public audit trail of what we've evaluated.

**If you know one of the breadth-row products well**, pick a row from `0-masterlist.md` and PR a deep entry as a sibling `{slug}.md` file. See the deep-entry schema below.

## Per-product deep schema

| Field | Meaning |
|---|---|
| `name` | The product's displayed name. |
| `year` | Year of the hackathon submission. Comma-separated if multi-event. |
| `hackathon` | Display label for the event. |
| `hackathon_slug` | Matching slug from [`../sources/`](../sources/). Semicolon-separated for multi-event products. |
| `team` | Builders or organization name as it appeared at the time. |
| `builders` | Comma-separated list of canonical builder handles. |
| `product_type` | Type tags from a controlled vocabulary: `wallet`, `app`, `service`, `tool`, `library`, `educational-resource`, etc. |
| `categories` | What bitcoin space the product is in: `lightning`, `privacy`, `custody`, `mining`, etc. |
| `specs` | Bitcoin-protocol or layer-2 specs the product implements: `bip78`, `taproot`, `payjoin`, `lndk`, etc. |
| `language` | Primary programming language(s). |
| `source_code` | Canonical repo URL, or `none` if not surfaced. |
| `link` | Canonical product URL (live site, demo, or repo). |
| `origin_listing` | Gallery URL where the submission first appeared (Devpost, DoraHacks, BOLT.FUN, and the like). |
| `description` | One-sentence "what it does" line. |
| `status` | One of `alive`, `dormant`, `dead`, `wound-down`, `source-not-published`. |
| `status_confidence` | `low`, `medium`, or `high`. How sure we are about the status. |
| `awards` | Placement, prize, or special mentions earned at the hackathon. `none` if none. |
| `last_activity` | Free-form notes on the most recent observed activity (commit, release, post-hackathon update). |
| `first_added` | ISO date the product entered the archive. |
| `last_analyzed` | ISO date of the most recent deep review. |

## Masterlist columns

| Column | Meaning |
|---|---|
| `Name` | Product name as submitted to the hackathon. |
| `Team` | Builders or org. |
| `Tagline` | One-line pitch. |
| `Scope` | One of `bitcoin`, `shitcoin`, `unclear`, `excluded`, `withdrawn`. See vocabulary below. |
| `Hackathons` | Comma-separated event slug(s). Resolves to [`../sources/{slug}.md`](../sources/). |
| `Link` | Canonical product URL. |

## Scope vocabulary

Full criteria + edge cases at [`../../docs/product-definition.md`](../../docs/product-definition.md). Quick reference:

| Value | What it means |
|---|---|
| `bitcoin` | Passes the scope gate. Bitcoin or a bitcoin layer is structural to the product (removing it would break the product's reason for existing). |
| `shitcoin` | Built on a non-bitcoin chain (Stacks, RSK, BCH, BSV, ICP, Cardano, Starknet, etc.). The chain may have a bitcoin peg, but the product's code runs elsewhere. |
| `unclear` | Tagline doesn't give enough signal. Pending review. |
| `excluded` | Evaluated and ruled out (scope failure). The pitch claimed bitcoin but the code didn't deliver, or the work doesn't qualify as a discrete artifact. |
| `withdrawn` | Team rescinded their submission and no external evidence remains. Kept in the masterlist for the internal record but not rendered in public output. |

## Connects to

- **[`../sources/{slug}.md`](../sources/)** — `hackathon_slug` field on deep entries and `Hackathons` column on masterlist rows reference per-hackathon canonical files.
- **[`../ideas/{slug}.md`](../ideas/)** — per-idea `### Past products` bullets reference these by name.
- **`site/products.html`** — cards on bitcoinproducts.xyz/products.html are built from these files plus the masterlist.
