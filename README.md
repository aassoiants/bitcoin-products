# bitcoinproducts.xyz

> The canonical archive of what bitcoin builders have tried.
> Plus the forward-looking view of what's still worth building.
> So you can stop searching and start creating.

**Live at [bitcoinproducts.xyz](https://bitcoinproducts.xyz)** *(beta)*.

The bitcoin ecosystem's open problems are visible only to people already deep inside it. New builders show up ready to ship and can't see what needs building. Returning builders waste cycles on paths the last cohort already explored. Strategists trying to read the arc are stuck stitching it together from twelve dead Devpost galleries.

We built bitcoinproducts.xyz to fix that. Two surfaces over one data layer:

- **IDEAS.TXT** is 35 forward-looking ideas, each anchored in a decade of past attempts so you can see what's been tried and where the openings are.
- **PRODUCTS.TXT** is 76 bitcoin products read end to end plus 492 indexed across 118 hackathons since 2012. Filterable by year, hackathon, status, category, spec, and more.

For motivated bitcoin builders picking their next project. For strategists mapping the arc. For researchers tracking who built what when. The archive collapses your search-cost from "scroll twelve dead galleries" to "open one page, filter, decide."

[**See it live →**](https://bitcoinproducts.xyz)

---

## Why hackathons?

Three reasons.

**Hackathons have a known set of inputs.** With over 100 bitcoin-themed events since 2012, each with a finite submission list, an organizer, a date, a place. You can audit the corpus end to end. This is much harder for a Twitter thread, a Telegram group, or "the whole bitcoin ecosystem."

**Hackathons are time-honest.** What people built at a 2014 hackathon tells you what bitcoin builders thought was urgent in 2014. What's getting built at the most recent bitcoin++ tells you what's urgent today. Side by side, they trace the arc of what the space cared about, year by year.

**Hackathons compound.** The same idea (pay someone who doesn't have a wallet, route around remittance fees, monetize a single article instead of a subscription) recurs across years and events. Eight separate teams take eight separate runs at the same problem across thirteen years. That pattern is invisible when you only look at one product at a time. We make it visible.

Hackathons are just a logical starting point. 

---

## What is a bitcoin product?

Read what the project says it does. Now imagine it without bitcoin. Does the product still make coherent sense as a thing that would exist in the world?

If yes, bitcoin was decoration. Doesn't count. If no, bitcoin was structural. Counts.

Concretely: a Lightning wallet, a Cashu mint, a privacy tool, a node policy patch, an explainer that walks newcomers through self-custody, a hardware signer DIY guide. Bitcoin or a bitcoin layer is doing the work the product exists to do.

Not in scope: a generic Web3 game with a bitcoin reward pool stapled on. A multi-chain DEX that lists BTC alongside everything else. A token issued on a non-bitcoin chain that markets itself with bitcoin imagery.

Full criteria, edge cases, and how we apply the test: [docs/product-definition.md](docs/product-definition.md).

---

## What's in this repo

The data layer behind the live site. Three folders.

### `data/ideas/`

35 per-idea canonical files. One `.md` per idea. Each file has these fields:

- **slug**: URL-safe identifier matching the filename (`{slug}.md`).
- **idea**: the one-sentence headline of the idea.
- **card_body**: three short sentences (situation, gap, invitation) shown on the live card.
- **body**: longer body shown when the idea is opened, names real-world products and the specific gap.
- **category**: one of `reach`, `sovereignty`, `visibility`, `commerce`, `builder-tools`, `ai`.
- **archetype**: one or more of `wire` (connect / integrate), `build` (ship something new), `understand` (explain a concept). Comma-separated for multi.
- **audiences**: one or more of `bitcoin-user`, `newcomer`, `creator-merchant`, `custodian`, `node-operator`, `builder`, `gamer-game-designer`, `ai-agent-operator`. Comma-separated for multi.
- **first_added**: ISO date the idea entered the archive.
- **last_reviewed**: ISO date of the most recent body update.

Plus a `### Past products` section listing every hackathon product that's tackled this idea: product name (links by slug), year, hackathon slug, status, and a short note on how the product tried to solve the idea.

See [`data/ideas/wallet-less-recipient.md`](data/ideas/wallet-less-recipient.md) for an example.

### `data/products/`

76 per-product canonical files. One `.md` per deeply analyzed product. The slug is the filename (no in-file field). Each file has these fields:

- **name**: the product's displayed name.
- **year**: year of the hackathon submission. Comma-separated if multi-event.
- **hackathon**: display label for the event.
- **hackathon_slug**: matching slug from `data/sources/`. Semicolon-separated for multi-event products.
- **team**: builders or organization name as it appeared at the time.
- **builders**: comma-separated list of canonical builder handles.
- **product_type**: type tags from a controlled vocabulary (`wallet`, `app`, `service`, `tool`, `library`, `educational-resource`, etc.).
- **categories**: what bitcoin space the product is in (`lightning`, `privacy`, `custody`, `mining`, etc.).
- **specs**: bitcoin-protocol or layer-2 specs the product implements (`bip78`, `taproot`, `payjoin`, `lndk`, etc.).
- **language**: primary programming language(s).
- **source_code**: canonical repo URL, or `none` if not surfaced.
- **link**: canonical product URL (live site, demo, or repo).
- **origin_listing**: gallery URL where the submission first appeared (Devpost and the like).
- **description**: one-sentence "what it does" line.
- **status**: one of `alive`, `dormant`, `dead`, `wound-down`, `source-not-published`.
- **status_confidence**: `low`, `medium`, or `high`.
- **awards**: placement, prize, or special mentions earned at the hackathon. `none` if none.
- **last_activity**: free-form notes on the most recent observed activity (commit, release, post-hackathon update).
- **first_added**: ISO date the product entered the archive.
- **last_analyzed**: ISO date of the most recent deep review.

See [`data/products/nolooking.md`](data/products/nolooking.md) for an example.

### `data/sources/`

118 per-hackathon canonical files. One `.md` per hackathon. Each file has these fields:

- **slug**: URL-safe identifier including the year (`berlin-bitcoin-2012`). Filename is `{slug}.md`.
- **name**: display name as the organizer used.
- **year**: calendar year of the event.
- **dates**: month/day range if known (`July 13-15, 2012`).
- **location**: city or `online`.
- **organizer**: running entity or person, plus any co-organizers.
- **type**: primary product focus of the hackathon:`bitcoin`, `bitcoin-layer`, `mixed`, or `shitcoin` (events that branded around non-bitcoin chains).
- **sponsors**: list of sponsoring orgs.
- **product_count**: number of submissions to the hackathon.
- **count_confidence**: `confirmed` (verified against the gallery), `estimated` (organizer or press estimate), or `none`.
- **gallery_url**: canonical project gallery if one exists, else a recap or announcement link.
- **products_indexed**: count of submissions that landed in our archive.
- **products_deeply_analyzed**: subset that has a per-product `.md` deep entry.
- **prizes**: total prize pool or notable prizes.
- **first_indexed**: ISO date when the event first entered the archive.
- **last_reviewed**: ISO date of the most recent review pass.

Plus `### Winners` (1st, 2nd, 3rd, etc.), `### Notes` (organizer / judge / sponsor / era flavor), `### Sources` (recap and announcement links), and an auto-derived `### Products from this hackathon` cross-link section.

See [`data/sources/berlin-bitcoin-2012.md`](data/sources/berlin-bitcoin-2012.md) for an example with rich notes; [`data/sources/dapphack-atlanta-2018.md`](data/sources/dapphack-atlanta-2018.md) for one with sparse data.

---

## Coming next

- **Sources page** at [bitcoinproducts.xyz/sources.html](https://bitcoinproducts.xyz/sources.html). A filterable, searchable, sortable list of all 118 hackathons. Sort by year, organizer, type, count confidence, products indexed, products deeply analyzed. Built from [`data/sources/`](data/sources/).
- **Corpus expansion beyond hackathons.** The hackathon corpus is the starting point, not the ceiling. Bring in user-submitted products, VC-funded bitcoin companies, grant-funded products from organizations like HRF, Brink, Vinteum, Btrust, and other sources outside the hackathon track.
- **Dashboard** at [bitcoinproducts.xyz/dashboard.html](https://bitcoinproducts.xyz/dashboard.html). A deep dive into bitcoin product history for strategists and researchers. How the space has shifted year by year, which problems got sustained attention, builder-recurrence patterns, alive-rates per category, era framing.
- **Conversational interface over the archive.** Ask the data in plain English: "what bitcoin payment ideas have been tried, and which products are still alive?", "which builders shipped multiple products across years?", "what ideas have zero alive past attempts?" The per-idea, per-product, and per-hackathon files become a queryable knowledge base for builders deciding what to ship next.
- **Builder profiles.** Per-handle pages showing every product a builder has submitted across hackathons, repeat-builder patterns, eras of activity. Surfaces the people behind the products.

---

## Contribute

The fastest path is a pull request that edits a single `.md` file.

- **Make corrections to the data.** Wrong attribution, year, status, link? Edit the relevant `data/ideas/{slug}.md`, `data/products/{slug}.md`, or `data/sources/{slug}.md` and open a PR. Schema above is the contract.
- **Suggest a user-added product** (non-hackathon, non-buildathon). Open an issue with the per-product fields filled in. We're tracking commercial bitcoin products separately and may merge them in once the surface lands.
- **Pick a breadth-only product and deep-analyze it.** Browse the breadth catalog at [`data/products/0-masterlist.md`](data/products/0-masterlist.md). Each row is a hackathon submission we've cataloged but not yet analyzed in depth. If you know one well enough to fill in the full schema (status, source code, mechanism, awards, last activity, etc.), PR a new `data/products/{slug}.md`. The `unclear`-scope rows in particular need community eyes to confirm whether the underlying repo actually uses bitcoin.
- **Submit a hackathon we missed.** Regional events, university-run buildathons. Open an issue or PR a new `data/sources/{slug}.md`. Please provide the link of products worked on if there is one available. 
- **Add a way to slice or analyze the data.** Open an issue describing the cut you want: by builder recurrence, by spec maturity, by alive-rate per year, by anything. We'll consider adding it as a filter facet or a new surface.
- **Tell us how this informed a decision.** Did you pick a project, kill a project, change scope, or learn something about the space using the archive? [Open an issue](https://github.com/aassoiants/bitcoin-products/issues/new) and tell us. The patterns of how it gets used shape what we ship next.
- **Anything else.** If you see a use we haven't named, open an issue describing the work. The contribution surface is intentionally open-ended.

---

## Acknowledgments

The `categories` vocabulary on per-product entries is borrowed from [Bitcoin Optech](https://bitcoinops.org)'s 20 topic categories, with 8 layer-2 break-outs added (Cashu, Fedimint, Ark, Liquid, Statechain, RGB, Taproot Assets, Node Infrastructure). Optech's newsletter and topic taxonomy are essential reading for anyone working on bitcoin protocol or layer-2 development.

## Run locally

Static site, no build needed:

```bash
git clone https://github.com/aassoiants/bitcoin-products
cd bitcoin-products
python -m http.server 8000 --directory site
# open http://localhost:8000
```

Rebuild after editing data:

```bash
node utilities/build-products-json.mjs    # rewrites site/products.html
node utilities/build-ideas-products.mjs   # rewrites site/ideas.html
```

The build scripts are plain Node (no dependencies). Run them from the repo root after editing any `.md` file in `data/`.

---

## License

MIT. See [LICENSE](LICENSE).
