## Bitcoin-autosave

| Field | Value |
|---|---|
| name | Bitcoin-autosave |
| year | 2012 |
| hackathon | Berlin Bitcoin Hackathon |
| hackathon_slug | berlin-bitcoin-2012 |
| organizer | Amir Taaki |
| location | IN-Berlin hackerspace, Berlin, Germany (in-person) |
| team | Mike Hearn |
| builders | Mike Hearn |
| product_type | library |
| categories | wallets |
| specs |  |
| specs_no_match | Core wallet persistence feature with no BIP. |
| language | Java |
| source_code | https://github.com/bitcoinj/bitcoinj/commit/bc47fccaebe2a2be08af4aedab30e92db99d7ad4 |
| description | Lets a BitcoinJ wallet application persist state automatically in the background so that a crash or abrupt shutdown does not lose recent transaction history. |
| ideas_matches | none |
| link | https://github.com/bitcoinj/bitcoinj |
| origin_listing | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/ |
| last_activity | Feature committed to BitcoinJ master on July 14 2012 (day 2 of the Berlin hackathon) as commit bc47fcca: "Add an auto save function. A background thread will atomically auto-save to a file when there are wallet changes at a limited rate." Subsequent refinement commits: August 20 2012 (8746dabc, "Rewrite wallet auto-saving to not require polling. Resolves bug 242.") and August 27 2012 (56d74d50, "Another pass at the auto-save code. Resolves issue 246."). The autosave API (autosaveToFile, AutosaveEventListener) became a permanent part of BitcoinJ and is present in the repo as of 2026. BitcoinJ itself is actively maintained. |
| status | alive |
| status_confidence | high |
| awards | Unranked in Taaki's summary (top 5 placed separately) |
| sources | https://gnusha.org/pi/bitcoindev/1342516778.7448.YahooMailNeo@web121001.mail.ne1.yahoo.com/T/, https://github.com/bitcoinj/bitcoinj/commit/bc47fccaebe2a2be08af4aedab30e92db99d7ad4, https://github.com/bitcoinj/bitcoinj/commit/8746dabcad45e78be813fff498768bb6ed94d9c7, https://github.com/bitcoinj/bitcoinj/commit/56d74d504a1f5927a228c84e9657f04b6e2338fe |
| notes | Scope passes unambiguously via code path: BitcoinJ is the Java bitcoin library; wallet auto-save is a persistence feature for bitcoin wallet state. Primary source verbatim (Taaki mailing list, July 17 2012): "Bitcoin-autosave: Mike Hearn - BitcoinJ improvements (Mike did also loads of other stuff, and helped with winner project too)." The introductory commit (bc47fccaebe2a2be08af4aedab30e92db99d7ad4, July 14 2012) established an AutosaveThread daemon class, an AutosaveEventListener interface, an autosaveToFile() configuration method, and a dirty-flag + rate-limited queue mechanism. Total change: +300/-24 lines across Wallet.java, WalletTest.java, WalletTool.java, Sha256Hash.java, and core/pom.xml. The August 20 rewrite (8746dabc) replaced polling with a DelayQueue-based event-driven approach. The August 27 pass (56d74d50) added race-condition protection and improved shutdown behavior. Taaki's note "Mike did also loads of other stuff, and helped with winner project too" indicates Hearn contributed across multiple Berlin 2012 products including the 1st-place Offline BitcoinJ/Android work (which the archive credits primarily to Andreas Schildbach + grazcoin per Taaki's main line); Hearn's cross-product contribution is noted but not added to the Offline BitcoinJ `builders` field because "helped with" is not a definitive attribution. Mike Hearn later became one of the most prominent bitcoin developers of the 2012-2015 era before publicly exiting bitcoin development in January 2016; that exit has no bearing on the 2012 scope call. **Second `alive` entry from Berlin 2012 via canonical BitcoinJ absorption** (Offline BitcoinJ via the same library is the first). BitcoinJ is absorbing Berlin 2012 hackathon output at a 2-product cadence, suggesting a survival pattern specific to this library. |
| first_added | 2026-04-20 |
| last_analyzed | 2026-04-20 |
