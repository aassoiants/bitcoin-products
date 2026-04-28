## USAA Blockchain Insurance Receipts

| Field | Value |
|---|---|
| name | USAA Blockchain Insurance Receipts |
| year | 2015 |
| hackathon | Consensus 2015 Makeathon |
| hackathon_slug | consensus-makeathon-2015 |
| organizer | CoinDesk / Consensus |
| location | New York, NY, US (IRL, 2-day event preceding Consensus 2015 conference) |
| team | "Team 15", led by Wayne Vaughan (Tierion CEO); Thulasi Nambiar (Citi), Deepak Atal (NYU CS), Dom Steil (Apttus), Emily Faber (Coin Cafe; listed as Coinsetter in Vaughan's Medium writeup, discrepancy unresolved) |
| builders | Wayne Vaughan, Thulasi Nambiar, Deepak Atal, Dom Steil, Emily Faber |
| product_type | app, demo |
| categories |  |
| categories_no_match | Timestamp-anchoring via a third-party Tierion or Chainpoint service; no clean Optech category fits. |
| specs | op_return |
| specs_no_match | Chainpoint v1 aggregates record hashes into a Merkle tree and stores the root in a bitcoin transaction OP_RETURN output, anchoring roughly every 10 minutes. |
| language | Java (Android app, 2015 pre-Kotlin-standard era); Google Sheets + Zapier integration on backend; no repo surfaced to confirm |
| source_code | none |
| description | Lets an insurance adjuster log each state transition of a claims process ("Initial Claim" to "In-process" to "Completed") to the bitcoin blockchain via Tierion so the audit trail is tamper-evident without relying on the insurer. |
| ideas_matches | none |
| link | https://www.coindesk.com/markets/2015/09/09/blockchain-insurance-solution-wins-consensus-2015-makeathon |
| origin_listing | https://www.coindesk.com/markets/2015/09/09/blockchain-insurance-solution-wins-consensus-2015-makeathon |
| sources | https://www.coindesk.com/markets/2015/09/09/blockchain-insurance-solution-wins-consensus-2015-makeathon (primary CoinDesk recap; 403 on WebFetch, content captured from user-pasted text) · https://medium.com/@WayneVaughan/the-secret-weapon-we-used-to-win-the-coindesk-hackathon-2c208c046070 (Vaughan's own writeup, alt team composition) · https://blog.tierion.com/improving-insurance-with-the-blockchain/ (Tierion blog, corroborating mechanism) · https://medium.com/@WayneVaughan/chainpoint-a-standard-blockchain-proof-protocol-79def1c37189 (Chainpoint Medium announcement, confirming OP_RETURN aggregation) · https://github.com/Tierion/blockchain-anchor (Tierion's earliest surfaced Chainpoint library, Feb 2016, documenting OP_RETURN anchoring) |
| last_activity | Two-day hackathon demo, Sept 2015. No repo or follow-up product. USAA never adopted. Tierion the company continued independently (raised $1M seed, wound down circa 2020). Demo itself has no known post-event life. Bitcoin-via-third-party-service indirection (same shape as AnchorSupply #45). |
| status | dead |
| status_confidence | high |
| awards | Grand Prize, $5,000 (Consensus 2015 Makeathon) |
| first_added | pre-2026-04-20 |
| last_analyzed | pre-2026-04-20 |
