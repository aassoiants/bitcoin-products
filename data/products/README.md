# Products

The bitcoin product archive in two layers, no overlap:

- **`{slug}.md`**: 76 deep entries with the full schema. The slug is the filename (no in-file field for it). These render as the rich modal cards on [bitcoinproducts.xyz/products.html](https://bitcoinproducts.xyz/products.html).
- **`0-masterlist.md`**: ~912-row breadth catalog of every other product across every hackathon we've cataloged (deep entries not duplicated here). Each row has `Name`, `Team`, `Tagline`, `Scope`, `Hackathons`, `Link`. The bitcoin-scope subset (~492 rows) renders as "indexed only" stub cards on the live site. The rest (shitcoin, unclear, excluded, withdrawn) is the public audit trail of what we've evaluated.

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
| `categories` | What bitcoin space the product is in: `lightning`, `privacy`, `custody`, `mining`, etc. Vocabulary borrowed from [Bitcoin Optech](https://bitcoinops.org)'s 20 topic categories plus 8 layer-2 break-outs (Cashu, Fedimint, Ark, Liquid, Statechain, RGB, Taproot Assets, Node Infrastructure). |
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

## Vocabulary

These are the values currently in use across the 76 deep entries. New submissions can introduce new values when a needed term isn't in the list, but please flag the addition in the PR description so the vocabulary stays curated.

### `product_type`

`app`, `bot`, `dashboard`, `demo`, `developer-tool`, `explorer`, `firmware`, `game`, `library`, `marketplace`, `mobile-app`, `node-implementation`, `plugin`, `protocol-specification`, `service`, `tool`, `wallet`, `web-app`, `website`

### `categories`

Built on top of [Bitcoin Optech](https://bitcoinops.org/en/topic-categories/)'s 20 topic categories, plus extensions for things Optech's protocol-engineering vocabulary doesn't cover at our granularity.

**From Optech, currently in use (13)**:

`backup-recovery`, `consensus` (Consensus Enforcement), `contract-protocols`, `dev-tools` (Developer Tools), `invoicing`, `lightning` (Lightning Network), `liquidity-management`, `privacy` (Privacy Enhancements), `scripts-addresses`, `security` (Security Enhancements), `security-problems`, `tx-relay` (Transaction Relay Policy), `wallet-collab` (Wallet Collaboration Tools).

Slug convention: lowercased, hyphenated abbreviation of Optech's full label. The full label is shown in parens above when our slug differs.

**From Optech, available but not yet used (7)** (valid when a product fits):

Bandwidth Reduction, Fee Management, Lightweight Client Support, Mining, P2P Network Protocol, Privacy Problems, Soft Forks

**Our L2 break-outs (in use: 4 + 1 catch-all)**:

`ark`, `cashu`, `fedimint`, `liquid`, `node-infra`. Reserved for future use: `statechain`, `rgb`, `taproot-assets`.

**Hackathon-product extensions (4)**:

`games`, `merchant-tools`, `payments`, `wallets`. Optech focuses on protocol engineering; these cover product shapes that submissions consistently fall into.


### `specs`

Bitcoin protocol specs (BIPs), Lightning specs (BOLTs), Cashu specs (NUTs), and named primitives. The `adj:` prefix marks bitcoin-adjacent specs (Nostr family) that are load-bearing alongside bitcoin in a given product.

`adaptor-sigs`, `adj:nostr`, `bip11`, `bip21`, `bip32`, `bip39`, `bip78`, `bluetooth`, `bolt11`, `bolt12`, `descriptors`, `deterministic-keys`, `discreet-log`, `dlc`, `electrum`, `lightning-address`, `lnurl`, `miniscript`, `multisig`, `musig2`, `nwc`, `op_return`, `p2wsh`, `payjoin`, `psbt`, `rbf`, `schnorr`, `simplicity`, `taproot`, `webln`

Slug convention: lowercase, no hyphen between protocol prefix and number (`bip32`, not `BIP-32`).

## Connects to

- **[`../sources/{slug}.md`](../sources/)**: `hackathon_slug` field on deep entries and `Hackathons` column on masterlist rows reference per-hackathon canonical files.
- **[`../ideas/{slug}.md`](../ideas/)**: per-idea `### Past products` bullets reference these by name.
- **`site/products.html`**: cards on bitcoinproducts.xyz/products.html are built from these files plus the masterlist.
