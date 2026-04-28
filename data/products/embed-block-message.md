## Embed block message

| Field | Value |
|---|---|
| name | Embed block message |
| year | 2012 |
| hackathon | Berlin Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2012 |
| organizer | Amir Taaki |
| location | IN-Berlin hackerspace, Berlin, Germany (in-person) |
| team | genjix (Amir Taaki) |
| builders | genjix |
| product_type | developer-tool |
| categories |  |
| categories_no_match | On-chain data embedding from before OP_RETURN standardization in 2014. |
| specs |  |
| specs_no_match | No specs identified. |
| language | (unverified; Taaki's 2012 bitcoin work was primarily C++ via libbitcoin) |
| source_code | not surfaced (originally on gitorious.org/bitcoin-hackathon, defunct; no surviving mirror located as of 2026-04-20) |
| description | Lets a developer write an arbitrary message into the bitcoin blockchain so that a string can be permanently embedded in the chain without requiring a custom miner. |
| ideas_matches | none |
| link | none |
| origin_listing | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| last_activity | Unranked extra (9th of 9 listed) at the Berlin Bitcoin Hackathon, July 13-15 2012, per Amir Taaki's post-event summary on the bitcoin-dev mailing list (July 17 2012). No post-hackathon activity or standalone release located. Gitorious.org, where the hackathon code was originally hosted (gitorious.org/bitcoin-hackathon per the primary source), is defunct and no archive copy was reachable as of 2026-04-20. |
| status | dead |
| status_confidence | medium |
| awards | none (unranked; listed 9th of 9 in Taaki's summary) |
| sources | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| notes | Scope passes unambiguously via code path: embedding messages in the bitcoin blockchain is canonical bitcoin protocol work operating on bitcoin's transaction/block structures. Primary source verbatim (Taaki mailing list, July 17 2012): "9. Embed block message: genjix - simple tool for embedding messages in block chain". No additional technical description exists beyond this one line. **Era context:** in mid-2012, the standard mechanism for embedding data in the bitcoin blockchain was coinbase-scriptSig text injection (miners could write arbitrary data into the coinbase input script, as Satoshi did in the genesis block with the Times headline). OP_RETURN as a standardized, non-prunable data-carrier output was not introduced until Bitcoin Core 0.9 (March 2014); prior proposals to use OP_RETURN were discussed on the bitcoin-dev list through 2012-2013 but not yet standardized. A non-miner tool for embedding messages in 2012 would most plausibly have constructed a transaction with data encoded in a scriptSig or early multi-output hack; no direct technical evidence survives to confirm the mechanism genjix used. The libbitcoin documentation shows functionality for reading coinbase messages from blocks, consistent with this being an active area in the libbitcoin ecosystem at the time. This product is part of the **"2012 protocol/infrastructure era" pattern** (`data/taxonomy.md` Section 6 Pattern 12): genjix was exploring low-level block/transaction primitives at a time when most of bitcoin's data-embedding conventions were informal and community-driven rather than BIP-standardized. Source code originally hosted at gitorious.org/bitcoin-hackathon per the primary source; gitorious.org is fully defunct and the Wayback Machine did not return a usable snapshot for this URL (retention record at `data/sources/berlin-bitcoin-2012/wayback-gitorious-2026-04-20.md`). Status set to dead with medium confidence because absence of a repo does not rule out code surviving in libbitcoin's early commits; a git-log search of libbitcoin-system pre-2013 commits could potentially surface it but was not feasible this pass. Builder recurrence: genjix (Amir Taaki) submitted 5 entries to this same hackathon: Bitcoin Pong (2nd), Double-spend monitor (5th), Live-calculator (7th), Bitcoin Mages (8th), Embed block message (9th, this entry). |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
