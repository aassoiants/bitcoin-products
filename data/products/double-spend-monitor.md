## Double-spend monitor

| Field | Value |
|---|---|
| name | Double-spend monitor |
| year | 2012 |
| hackathon | Berlin Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2012 |
| organizer | Amir Taaki |
| location | IN-Berlin hackerspace, Berlin, Germany (in-person) |
| team | genjix (Amir Taaki) |
| builders | genjix |
| product_type | developer-tool |
| categories | security |
| specs |  |
| specs_no_match | No specs identified. |
| language | (unverified; Taaki's 2012 bitcoin work was primarily C++ via libbitcoin) |
| source_code | none found (originally on gitorious.org/bitcoin-hackathon, defunct; no surviving mirror located as of 2026-04-20) |
| description | Lets a node operator detect conflicting transactions broadcast to the network so that double-spend attempts against unconfirmed payments can be identified in real time. |
| ideas_matches | node-activity-viewer |
| link | none |
| origin_listing | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| last_activity | 5th Place at the Berlin Bitcoin Hackathon, July 13-15 2012, per Amir Taaki's post-event summary on the bitcoin-dev mailing list (July 17 2012). No post-hackathon activity or standalone release located. The tool may have been absorbed into the libbitcoin ecosystem (libbitcoin-node / libbitcoin-server handle mempool and relay logic), but no direct attribution from the hackathon prototype to a specific libbitcoin commit was found. Gitorious.org, where the hackathon code was originally hosted (gitorious.org/bitcoin-hackathon per the primary source), is defunct and no archive copy was reachable as of 2026-04-20. |
| status | dead |
| status_confidence | medium |
| awards | 5th Place, Berlin Bitcoin Hackathon 2012 |
| sources | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| notes | Scope passes unambiguously via code path: monitoring the bitcoin network mempool for conflicting (double-spend) transactions is canonical bitcoin protocol work. Primary source verbatim (Taaki mailing list, July 17 2012): "Double-spend monitor: tool to monitor double spends" attributed to genjix. No additional technical description exists in the primary source beyond this one line. Source code originally hosted at gitorious.org/bitcoin-hackathon per the primary source; gitorious.org is fully defunct and the Wayback Machine did not return a usable snapshot for this URL in the fetch attempted 2026-04-20. No GitHub mirror, fork, or downstream reference to this specific hackathon prototype was found in the genjix GitHub profile, the libbitcoin org, or the libbitcoin-explorer / libbitcoin-node repositories. Status set to dead with medium confidence because the absence of a repo does not rule out code surviving inside libbitcoin's early commits; a git-log search of libbitcoin-system pre-2013 commits could potentially surface it but was not feasible this pass. Builder recurrence: genjix (Amir Taaki) submitted 5 entries to this same hackathon: Bitcoin Pong (2nd), Double-spend monitor (5th), Live-calculator (7th), Bitcoin Mages (8th), Embed block message (9th). product_type set to developer-tool because the primary source describes it as a monitoring "tool"; insufficient evidence to classify it as a library or service. Wayback Machine retry was performed via user-paste fallback on 2026-04-20 (orchestrator blocked this session) for 3 URL patterns covering the gitorious.org/bitcoin-hackathon project; all returned zero snapshots. Retention record at `data/sources/berlin-bitcoin-2012/wayback-gitorious-2026-04-20.md`. Standalone gitorious-hosted code is truly unrecoverable; the one remaining upgrade path is the libbitcoin early-commit-log pass (not yet performed). |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-22 |
