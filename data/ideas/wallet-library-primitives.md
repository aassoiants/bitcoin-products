## wallet-library-primitives

| Field | Value |
|---|---|
| slug | wallet-library-primitives |
| idea | Build the wallet-library support for bitcoin operations, primitives, and features that isn't there yet. |
| card_body | Most wallets build on one of three bitcoin dev kits. Each kit has the operations it was built around. Operations these libraries don't yet expose need filling in. Pick an unexposed primitive and ship it as a library addition. |
| body | Most wallets build on [BDK](https://bitcoindevkit.org/), [LDK](https://lightningdevkit.org/), or [BitcoinJ](https://github.com/bitcoinj/bitcoinj). Each library has the operations it was built around: multisig construction and [background autosave](https://github.com/bitcoinj/bitcoinj/commit/bc47fccaebe2a2be08af4aedab30e92db99d7ad4) in BitcoinJ, channel management in LDK, descriptor wallets in BDK. The operations these libraries don't yet expose need filling in. A wallet that wants to ship one either writes from spec or drops the operation. |
| category | builder-tools |
| archetype | wire |
| audiences | builder |
| first_added | 2026-04-27 |
| last_reviewed | 2026-04-27 |

### Past products (2, 1 alive via canonical absorption)

- BitcoinJ Multisig (2012, gitorious-defunct) — multisig support for the Java bitcoin library
- Bitcoin-autosave (2012, alive via BitcoinJ canonical absorption) — background wallet-state autosave for BitcoinJ
