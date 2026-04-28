## Offline transactions for BitcoinJ/Android wallet

| Field | Value |
|---|---|
| name | Offline transactions for BitcoinJ/Android wallet |
| year | 2012 |
| hackathon | Berlin Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2012 |
| organizer | Amir Taaki |
| location | IN-Berlin hackerspace, Berlin, Germany (in-person) |
| team | Andreas Schildbach, grazcoin |
| builders | Andreas Schildbach, grazcoin |
| product_type | mobile-app |
| categories | wallets |
| specs | BIP-21, bluetooth |
| language | Java |
| source_code | https://github.com/livne/Bitcoin-Wallet-for-Android/tree/hackathon |
| description | Lets a bitcoin payer send a transaction to a nearby merchant when neither party has an active internet connection, so payments work in low-connectivity environments. |
| ideas_matches | none |
| link | https://github.com/bitcoin-wallet/bitcoin-wallet |
| origin_listing | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| last_activity | 1st Place at the Berlin Bitcoin Hackathon, July 13-15 2012, per Amir Taaki's post-event summary on the bitcoin-dev mailing list (July 17 2012). Hackathon branch at github.com/livne/Bitcoin-Wallet-for-Android (branch: hackathon) documented in the BitcoinTalk event thread (topic 87553). The offline/Bluetooth transaction capability was subsequently developed further and merged into the canonical bitcoin-wallet repo at github.com/bitcoin-wallet/bitcoin-wallet, which is actively maintained as of 2026. |
| status | alive |
| status_confidence | high |
| awards | 1st Place, Berlin Bitcoin Hackathon 2012 |
| sources | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/, https://bitcointalk.org/index.php?topic=87553.0, https://github.com/livne/Bitcoin-Wallet-for-Android/tree/hackathon, https://github.com/bitcoin-wallet/bitcoin-wallet |
| notes | Scope passes unambiguously via code path: BitcoinJ is the Java bitcoin library; the Android wallet is a direct bitcoin wallet; offline/Bluetooth transactions are a bitcoin-protocol payment feature. Primary source verbatim (Taaki mailing list, July 17 2012): "Offline transactions for BitcoinJ/Android bitcoin wallet: Andreas Schildbach and grazcoin." Technical mechanism per BitcoinTalk topic 87553 (Mike Hearn comment): "The MAC address of the sellers Bluetooth adapter is included in the QRcode and then the client can connect to it when sending coins without peering or discovery." A second offline mode was in scope per the same thread: "letting the receiving side keep the transaction around in the wallet so if both parties are offline but trust each other, they'll broadcast it later when they have internet access." The hackathon branch repo (github.com/livne/Bitcoin-Wallet-for-Android, branch: hackathon) is a fork of the main wallet and was specifically linked in the BitcoinTalk event thread as the hackathon deliverable. The canonical wallet repo at bitcoin-wallet/bitcoin-wallet is the successor and is actively maintained. First `alive` status entry in the pre-2013 cohort of the archive. |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
