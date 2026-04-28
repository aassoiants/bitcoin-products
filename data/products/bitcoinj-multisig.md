## BitcoinJ Multisig

| Field | Value |
|---|---|
| name | BitcoinJ Multisig |
| year | 2012 |
| hackathon | Berlin Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2012 |
| organizer | Amir Taaki |
| location | IN-Berlin hackerspace, Berlin, Germany (in-person) |
| team | yellowhat, PK |
| builders | yellowhat, PK |
| product_type | library |
| categories | scripts-addresses |
| categories_no_match | Multisig and scripting work in the pre-category-system era. |
| specs | multisig, bip11 |
| language | Java |
| source_code | not surfaced (originally on gitorious.org/bitcoin-hackathon per primary source; gitorious defunct; Wayback Machine fetch blocked this pass) |
| description | Lets a bitcoin application built on BitcoinJ construct and broadcast multisig transactions, enabling m-of-n spending conditions that were not yet supported in the Java library at the time. |
| ideas_matches | none |
| link |  |
| origin_listing | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| last_activity | 4th place at the Berlin Bitcoin Hackathon, July 13-15 2012, per Amir Taaki's post-event summary on the bitcoin-dev mailing list dated July 17 2012. No subsequent public activity found. Earliest multisig-related commits in the canonical bitcoinj/bitcoinj repo are from April 2013 (Mike Hearn's ScriptBuilder work) with no author attribution to yellowhat or PK. |
| status | unknown |
| status_confidence | low |
| awards | 4th place, Berlin Bitcoin Hackathon 2012 |
| sources | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| notes | Scope-gate passes unambiguously via code path: multisig transaction construction is a bitcoin-protocol feature and BitcoinJ is the Java bitcoin library. Primary source verbatim (Taaki mailing list, July 17 2012): "BitcoinJ Multisig: yellowhat and PK - way to do multisig transactions for BitcoinJ/Android." The Taaki email links code for genjix entries (gitorious.org/bitcoin-hackathon), acceptbit.com (github.com/kangasbros/electrumpos), and the offline-tx/Android entry (github.com/livne/Bitcoin-Wallet-for-Android branch hackathon), but provides no separate repository link for the multisig entry. The github.com/yellowhat account exists but contains only repos created 2021+, with no bitcoin content, and is almost certainly a different person sharing the pseudonym. GitHub code search and repo search for "bitcoinj multisig" returned no repos created before 2013-06-01. gitorious.org is defunct; Wayback Machine retry was performed via user-paste fallback on 2026-04-20 (orchestrator blocked this session) for 3 URL patterns (gitorious.org/bitcoin-hackathon project root, and guessed bitcoinj-multisig and double-spend-monitor repo paths). All 3 returned zero snapshots — the project was never indexed by Wayback before Gitorious shut down. Retention record at `data/sources/berlin-bitcoin-2012/wayback-gitorious-2026-04-20.md`. Code is **truly unrecoverable** from public sources. The only remaining recovery path is direct contact with yellowhat or PK for offline backups (not currently planned). product_type is provisionally `library` (likely a BitcoinJ patch); would shift to `mobile-app` if evidence surfaces that the deliverable was an Android app rather than a library patch. One remaining followup: the bitcoin-dev list archive could be checked for any post-July-2012 follow-up from yellowhat or PK, but the code itself is gone. |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
