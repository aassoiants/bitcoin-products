# What counts as a bitcoin product

This is the gate we use to decide whether a hackathon submission belongs in the archive at bitcoinproducts.xyz. If you're auditing the corpus, doing a parallel analysis, or wondering why a specific product is included or excluded, this is the contract.

---

## Unit of analysis

One bitcoin product across one or more bitcoin-themed hackathons. The archive catalogs hackathon submissions from the earliest documented bitcoin hackathon onward, as discrete units. A single product that competed at multiple hackathons gets one entry with a multi-valued hackathon slug.

"Hackathon" in this archive includes:

- Formal hackathons with galleries (Devpost, DoraHacks, Eventornado, BOLT.FUN, Taikai, Gitcoin).
- Grant-structured "hackathons" where pre-existing products applied for funding.
- Cohort-style events and showcases that used the hackathon label.

Out of scope (parked for possible future expansion, not currently collected): non-hackathon bitcoin products, VC-funded companies that didn't emerge from a hackathon, OSS side projects without an event origin.

---

## Inclusion criteria

A product qualifies as a bitcoin product when **condition 1 holds AND at least one of condition 2 (code path) or condition 3 (purpose path) holds**.

1. **Stated purpose involves bitcoin** in some way. The surface claim, what the project says about itself.
2. **Code path: code actually uses bitcoin infrastructure, AND removing that integration would break the stated purpose.** What the code does.
3. **Purpose path: bitcoin is the substantive subject of the product, AND removing it would break the product's reason for existing.** Applies to non-software bitcoin products: educational artifacts, documentation, transcripts, explainers, knowledge archives, visualizations, newsletters. Examples: an interactive tutorial about bitcoin programming, a transcript archive of bitcoin podcasts and talks, a newsletter on bitcoin protocol updates, an explainer doc about Lightning channel balances.

Condition 1 is the surface claim. Conditions 2 and 3 are alternative verification paths (code-presence OR purpose-substantiveness, either qualifies). The unifying test under condition 3 is the **product-purpose test**: remove bitcoin from the pitch, does the product still make coherent sense? If no (the product wouldn't exist or wouldn't make sense without bitcoin), it passes purpose path.

The two paths are not mutually exclusive. Most software products pass both (a Lightning wallet has Lightning code AND its purpose is Lightning). The purpose path matters specifically for products with no code, or where code is present but not bitcoin-load-bearing.

### Unit-of-analysis still applies

Both paths require the candidate to be a discrete, attributed artifact: a named submission with attribution to specific builders or a team, and some form of output (code, demo, writeup, talk, deck). The bar is that the work happened and is attributable, not that the URL is still live or the source code surfaced. Many entries in the archive point to dead links or have no public code; that's expected for older events. What doesn't qualify: a passing tweet, an unwritten idea, a stage talk that left no record.

**Catalogs, indexes, and reference pages qualify.** A product whose output takes the form of a curated list (awesome-bitcoin-style lists, a directory of Lightning apps, a reference page pointing at other tools, a Wikipedia article) is still a discrete, durable, attributed artifact. The deliverable is the collection. Unit-of-analysis failure applies to work that produces no bounded artifact at all, not to work whose artifact happens to be a list.

### What counts as "using bitcoin infrastructure" (code path)

Four categories qualify. Products usually match at least one; some match multiple.

**1. Direct bitcoin protocol code.** Code that talks to bitcoin nodes or bitcoin libraries. Examples: bitcoin RPC, PSBT signing, BIP32 derivation, BIP39 seed handling, Taproot primitives (Schnorr signatures, MuSig2, adaptor signatures, DLCs), Miniscript, Simplicity.

**2. Direct Lightning protocol code.** Code that talks to Lightning nodes or Lightning libraries. Examples: LND, Core Lightning, Eclair, LDK node APIs, BOLT11 invoice generation, BOLT12 offers, LNURL protocols, NWC (Nostr Wallet Connect), WebLN, submarine-swap libraries.

**3. Bitcoin-specific services.** Services that exist solely as bitcoin integrations. Using these counts because the service itself is a bitcoin adapter. Examples: BTCPay Server, Alby, LNbits, Breez SDK, Mutiny, Voltage, ZBD, Strike, Cashu mints, Fedimint federations, OpenTimestamps, Chainpoint (in its bitcoin-anchoring era).

**4a. Bitcoin L2 protocols that run directly on bitcoin.** Every state transition is ultimately secured by a bitcoin transaction using bitcoin's own primitives. No federation, no separate chain, no separate network. Examples: Ark (bitcoin timelocks and shared UTXOs), RGB (client-side validation with bitcoin as commitment layer), Taproot Assets (bitcoin Taproot scripts encoding assets in witness data), Statechains (bitcoin UTXO ownership transfers via cryptographic guarantees). Lightning is the most prominent protocol in this shape but is already covered by category 2 above, so it is not repeated here.

**4b. Bitcoin-family protocols with separate infrastructure.** Run separate nodes or separate federations, but use bitcoin-family code extended from Bitcoin Core or from bitcoin script primitives. Examples: Liquid (Elements, a direct fork of Bitcoin Core extended with confidential transactions and asset issuance; projects write Bitcoin-Script-family code). Cashu (ecash mints as separate servers; the mint custodies real bitcoin and tokens redeem to bitcoin via Lightning). Fedimint (federated ecash with bitcoin-custody guardians using bitcoin multisig).

---

## Exclusion criteria

A product fails the gate when condition 1 is met but conditions 2 and 3 both fail: the project claims bitcoin in its pitch, but when you open the repo the bitcoin integration is missing, not actually doing the stated work, or running on something else. The umbrella name for this failure is **"claims bitcoin but isn't."**

Three flavors, differing by what's actually in the code:

**Built on a non-bitcoin chain.** The project's core logic runs on Rootstock, Stacks, BSV as its own chain, BCH, ICP, Cardano, Starknet, NEAR, or any other chain that isn't bitcoin. Bridging or pegging to bitcoin doesn't make the project a bitcoin product if the non-bitcoin chain is where the code actually runs.

**Uses chain-agnostic middleware without verifying bitcoin.** The project uses a multi-rail standard (tbDEX, a generic payment SDK, a protocol that supports bitcoin as one of several chains) but doesn't verify that bitcoin is the actual settlement rail.

**No blockchain code at all.** The pitch advertises bitcoin integration, but the repo has no bitcoin code, no wallet code, no Lightning dependencies, no blockchain libraries. Just vanilla application code.

All three flavors fail the gate.

---

## Edge cases

### Ordinals

We don't take a position on ordinals as a category, but they qualify on the gate. Inscription-based projects read from and write to bitcoin's on-chain data, which satisfies the code-path test. Inclusion here is a technical call, not an editorial endorsement.

### Nostr-adjacent bitcoin projects

Nostr was built by bitcoiners and runs parallel to bitcoin. Projects that use both Nostr and bitcoin qualify. Projects that use only Nostr don't.

### Asset-only bitcoin holdings

A product holds bitcoin as an asset but doesn't implement bitcoin protocol code in its repo. Example: a tax-prep app with a bitcoin-denominated reward pool, where the tax workflow uses no bitcoin code and the bitcoin-holding step is hand-waved in the pitch.

Apply the **product-purpose test** (condition 3, purpose path). Remove bitcoin from the pitch, ask if the product still makes coherent sense. If yes (bitcoin was decoration), fails. If no (bitcoin was structural), passes under the purpose path.

### Multi-chain products where bitcoin is primary

If most of the product's features work on bitcoin first with other chains as optional, it qualifies. If bitcoin is a minor off-ramp attached to a product whose core runs on a non-bitcoin chain, it fails under "built on a non-bitcoin chain."

### Line between bitcoin L2s and non-bitcoin sidechains

The technical line: does the chain run bitcoin-family technology, or alien-chain technology?

**Bitcoin-family technology (in scope):** chains and protocols that extend Bitcoin Core, Bitcoin Script, or PSBT-adjacent primitives. Liquid (Elements, a Bitcoin Core fork), Ark (bitcoin timelocks and shared UTXOs), Taproot Assets (bitcoin Taproot scripts), RGB (client-side with bitcoin commitments), Statechains (bitcoin UTXO ownership transfers), Cashu and Fedimint (ecash with bitcoin custody). Projects on these chains write bitcoin-shaped code.

**Alien-chain technology (out of scope):** chains that import non-bitcoin stacks even when they bolt on a bitcoin peg. Rootstock runs a modified EVM and hosts Solidity contracts; projects on RSK write Ethereum code. Stacks has its own Clarity language. BSV is the BSV protocol. Projects on these chains write code that would make sense on Ethereum or their respective ecosystems, not on bitcoin.

Liquid and Rootstock have structurally similar peg-in-burn-out mechanics, but the application layer is what determines whether a project running on the chain is writing bitcoin code or alien-chain code.

---

## How to apply the gate

For each candidate product:

1. **Read what the project says it does** (Devpost submission, README intro, project landing page). Understand the stated purpose. Confirm condition 1 holds (it involves bitcoin in some way).
2. **Decide which path to test.** Software products with a repo: start with code path (steps 3 to 7). Non-software products (educational artifacts, docs, transcripts, explainers, newsletters): skip directly to purpose path (step 8).
3. **Open the repo.** [Code path]
4. **Look for the bitcoin integration in the code.** Check dependency manifests (`package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`) for bitcoin-related libraries. Search the code for keywords: `bitcoin`, `lightning`, `bolt`, `btc`, `sats`, `satoshi`, `psbt`, `lnd`, `core-lightning`, `eclair`, `ldk`, `taproot`, `schnorr`, `musig`, `cashu`, `fedimint`, `ark`.
5. **Find the specific file or module** that implements the claimed integration.
6. **Check that the integration is reachable** from the product's main code path, not demo-only or dead code.
7. **Ask the load-bearing test:** would removing the bitcoin piece break the product's stated purpose? If yes, passes code path. If no, fall through to step 8 (purpose path) before excluding.
8. **Ask the product-purpose test:** [Purpose path] remove bitcoin from the pitch entirely. Does the product still make coherent sense as a thing that would exist in the world? If no (the product wouldn't exist or wouldn't make sense without bitcoin), passes purpose path. If yes (bitcoin was decoration on a generic product), fails the gate.

A product that fails BOTH paths is "claims bitcoin but isn't" and would be excluded with the disqualifying flavor noted.

A product that passes purpose path but fails code path is captured as an educational-resource (or appropriate non-software type).

### Apply the gate per-product, not per-family

When a product family shares a chain context (for example, all Stacks-adjacent entries at one event, all tbDEX entries at another), resist the temptation to make a blanket scope call for the whole family. Apply the gate per-product. Most family members will classify identically, but exceptions exist: a product framed under Stacks tagging can still have a genuine bitcoin L1 code path via UniSat or sats-connect inscription flows. A product labeled tbDEX may or may not verify bitcoin as the settlement rail in its actual code. The per-product walk catches these.

---

## When in doubt

Applying this gate to a fresh candidate product should produce the same classification across reviewers. If two reviewers disagree, the resolution is usually in the load-bearing test: one is reading the stated purpose more narrowly than the other. Anchor on what the pitch says the product is *for*, and ask whether that purpose survives removal of the bitcoin piece.

If a candidate seems to stress-test the gate beyond what the edge cases above cover, leave it `unverified` rather than forcing a binary call.
