## BTCSquared

| Field | Value |
|---|---|
| name | BTCSquared |
| year | 2013 |
| hackathon | Bitcoin 2013 Conference Hackathon |
| hackathon_slug | san-jose-bitcoin-2013 |
| organizer | Bitcoin Foundation |
| location | San Jose, California (in-person) |
| team | Joakim Fernstad (under the name Gliph) |
| builders | Joakim Fernstad |
| product_type | protocol-specification, mobile-app |
| categories |  |
| categories_no_match | BLE proximity-payment pattern adjacent to but not within the Optech 20. |
| specs |  |
| specs_no_match | Self-defined Bluetooth Low Energy service UUIDs for wallet, identification, and service-provider roles, predating LNURL and BIP21 QR-intent conventions. |
| language | Objective-C (iOS / macOS native) |
| source_code | https://github.com/Gliph/BTCSquared |
| description | Lets two people in the same room exchange bitcoin payments without typing an address or scanning a QR, by having wallet apps advertise a bitcoin-wallet service over Bluetooth Low Energy that nearby devices discover and connect to. |
| ideas_matches | none |
| link | https://github.com/Gliph/BTCSquared |
| origin_listing | https://github.com/Gliph/BTCSquared |
| last_activity | First commit May 19, 2013 ("Bunch of changes related to demo", final day of the event). Last commit September 14, 2013 ("Added disconnection notification. Fix UI bugs."). 43 commits total on master. Not marked archived by GitHub but dormant for 12+ years; the BLE proximity-payment pattern did not develop into a maintained standard and was eventually superseded by LNURL / Lightning-address conventions for a different transport. |
| status | dead |
| status_confidence | high |
| awards | participation (no winner or placement record surfaced in this deep analysis; BitWall was 1st place at the same event) |
| sources | https://github.com/Gliph/BTCSquared |
| notes | README states verbatim: "the Bitcoin 2013 Conference Hackathon, San Jose, on May 17-19, 2013." Scope-gate passes via purpose path: the artifact is explicitly a bitcoin-transaction protocol specification authored at a bitcoin hackathon and describing BLE services named for the bitcoin-wallet role. Code path is weak (no libbitcoin / bitcoind / ldk dependency; the project defines a transport spec, not a wallet), purpose path is strong per `docs/scope.md` catalog/spec/educational-artifact clause. MIT License 2013 Joakim Fernstad. |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
