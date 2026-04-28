## acceptbit.com

| Field | Value |
|---|---|
| name | acceptbit.com |
| year | 2012 |
| hackathon | Berlin Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2012 |
| organizer | Amir Taaki |
| location | IN-Berlin hackerspace, Berlin, Germany (in-person) |
| team | Jeremias Kangas, Stefan Thomas |
| builders | Jeremias Kangas, Stefan Thomas |
| product_type | service, tool |
| categories | merchant-tools |
| specs | electrum, deterministic-keys |
| language | Python, JavaScript |
| source_code | https://github.com/kangasbros/electrumpos |
| description | Lets a merchant accept bitcoin payments from a web server without placing private keys on that server, so a compromised server cannot spend funds. |
| ideas_matches | none |
| link |  |
| origin_listing | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| last_activity | 3rd place at Berlin Bitcoin Hackathon July 13-15 2012 per Amir Taaki's post-event summary on bitcoin-dev mailing list (July 17 2012). Repository (kangasbros/electrumpos) created 2012-07-13T17:00:26Z on day 1 of the hackathon. Jeremias Kangas committed 67 times (July 2012 through January 2013); Stefan Thomas (justmoon) committed 14 times during the hackathon weekend (July 14-17 2012). Last code push 2013-01-29 by Kangas (merge of a typo fix). Domain dead as of 2026-04-20. |
| status | dead |
| status_confidence | high |
| awards | 3rd place, Berlin Bitcoin Hackathon 2012 |
| sources | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/, https://github.com/kangasbros/electrumpos |
| notes | Scope-gate passes via code path: wallet_server.py is derived from the Electrum bitcoin client (copyright header: "Electrum - lightweight Bitcoin client"), uses Electrum's Wallet class and master_public_key (deterministic key derivation) to generate fresh receiving addresses without the private key present on the server. Bitcoin-only architecture. README: "AcceptBit uses Electrum technology to separate public and private keys and accept payments that cannot be spent by the same systems accepting the payments." Stefan Thomas disambiguation: this is Stefan Thomas / GitHub: justmoon, the node-bitcoin-p2p and bitcoinjs author, active in bitcoin open-source since 2011, later co-founded Ripple and led Interledger. He is NOT the Stefan Thomas who famously lost ~7002 BTC on an IronKey drive. Disambiguating evidence: justmoon is listed as contributor on kangasbros/electrumpos with 14 commits; GitHub org memberships include bitcoinjs and bitcoin-labs; he created node-bitcoin-p2p in March 2011 and bitcoin-php in July 2012. README commit message on 2012-07-19 reads "Added a basic README to get rid of Github's nag message" and references "BitcoinJS technology" matching the README claim "AcceptBit also uses BitcoinJS technology to keep the payments status updated in real-time." Jeremias Kangas is a LocalBitcoins co-founder; LocalBitcoins was a named hackathon sponsor. acceptbit.com domain ECONNREFUSED 2026-04-20; archive.org fetch blocked by fetch tool this pass. |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
