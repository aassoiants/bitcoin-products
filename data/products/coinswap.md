## Coinswap

| Field | Value |
|---|---|
| name | Coinswap |
| year | 2014 |
| hackathon | Berlin + Texas Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2014 |
| organizer | c-base hackerspace + Bitalo (Berlin); Texas Bitcoin Conference (Austin) |
| location | Berlin, Germany (c-base hackerspace); in-person |
| team | Felix Weis (backend), Dennis Wilson (UI) |
| builders | Felix Weis, Dennis Wilson |
| product_type | web-app |
| categories |  |
| categories_no_match | Cross-chain swap with no clean Optech 20 fit. |
| specs | multisig |
| language | (unknown; no surviving repo found) |
| source_code | none found |
| description | Lets two parties swap coins from different cryptocurrencies peer-to-peer without trusting a centralized exchange, using bitcoin multi-signature addresses as escrow so neither party can abscond with the other's funds. |
| ideas_matches | none |
| link |  |
| origin_listing | https://bitcoinmagazine.com/industry-events/berlin-texas-bitcoin-hackathon |
| last_activity | 1st place, Berlin + Texas Bitcoin Hackathon, February 21-23, 2014. Bitcoin Magazine recap published shortly after. Felix Weis and Dennis Wilson won trips to the Texas Bitcoin Conference (March 5-6, 2014) as the prize. Bitcoin Magazine noted the team "didn't quite manage to finish it" but "announced a spectacular launch before Easter," suggesting a post-hackathon continuation was planned. No public post-Easter launch found. No GitHub repo surfaced as of 2026-04-20 deep analysis; Felix Weis's GitHub profile shows 32 repos but activity is private. |
| status | dead |
| status_confidence | medium |
| awards | 1st Place, Berlin + Texas Bitcoin Hackathon (Feb 21-23, 2014) |
| sources | https://bitcoinmagazine.com/industry-events/berlin-texas-bitcoin-hackathon |
| notes | **Scope: bitcoin via code path** (orchestrator-resolved 2026-04-20 from agent's initial `unclear` flag). Reasoning in full below; this is a borderline case worth documenting for future multi-chain-tool scope decisions. **Primary source verbatim:** "Coinswap uses multi-signature addresses to allow trading between coins of different cryptocurrencies." Explicit example from Bitcoin Magazine: "Let's assume Alice wants to trade 2,000 Dogecoin with Bob for 1 bitcoin. They both meet on Coinswap, enter the details of the trade and are then shown QR codes. Alice pays her 2,000 DOGE into the multi-signature address and if Bob does the same with the bitcoin, the trade completes." Escrow verbatim: "If, however, Bob doesn't send the bitcoin, Coinswap uses its private key to sign a transaction that refunds Alice her 2,000 DOGE." Product description: "the same escrow functionality of an exchange like Cryptsy but does so in a decentralized, semi-trustless way using multi-signature addresses." **Scope-gate reasoning:** Condition 1 (stated purpose involves bitcoin) passes, bitcoin is explicitly present as one side of the trade. Condition 2: code path passes because the bitcoin leg uses real bitcoin multisig code to construct and sign transactions, not theoretical bitcoin settlement (this distinguishes Coinswap from tbDEX-style products where bitcoin is one of N symmetric rails without a verified settlement path). Per `docs/scope.md`'s multi-rail clause: "If the code actually settles on bitcoin (opens a Lightning invoice, signs a bitcoin transaction, etc.), it passes the gate." Coinswap does sign bitcoin transactions for the bitcoin leg. The product-purpose test (which would return "yes, a DOGE/LTC swap tool would still make sense without bitcoin") is NOT canonical per `docs/scope.md`'s open-question section, so it is not applied as the deciding factor here. The parallel case is Aircoin (Coinbase BitHack 2014, scope: bitcoin) where bitcoin is the payment rail via Coinbase API; Coinswap is similar in that bitcoin is a verified code path even if the product framing is multi-chain. **Precedent implication:** this scope decision applies code-path-priority for multi-chain products with real bitcoin settlement code. Future multi-chain tools should be scope-gated the same way: is bitcoin a verified code path, or is it a theoretical / symmetric-rail claim? Real code path → bitcoin; theoretical or chain-agnostic middleware → excluded (Blink / tbDEX precedent). **Not to be confused with CoinSwap** (Chris Belcher, 2020), a CoinJoin-variant privacy scheme for bitcoin-only transactions with no altcoin involvement; unrelated product with similar name. **Felix Weis identity:** Luxembourg-born developer living in Berlin as of 2014, affiliated with Bitalo (co-sponsor of the event); Bitcoin Magazine identifies him as "Felix Weis of Bitalo." GitHub handle FelixWeis (32 repos, activity currently private). Known post-2014 for the "Bitcoin Traveler" experiment (Jan 2015 to mid-2016, 27 countries, paying with bitcoin only); later worked on WhatTheFee.io and contributed to OrdiLabs. Well-documented bitcoin-community figure; identity unambiguous. **Dennis Wilson identity:** UI designer, listed in Bitcoin Magazine as "Dennis Wilson" with no employer affiliation given. Name is common; disambiguation low-confidence beyond the primary source citation. |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
