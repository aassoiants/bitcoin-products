## advanced-custody

| Field | Value |
|---|---|
| slug | advanced-custody |
| statement | Make advanced custody usable without being a cryptographer. |
| card_body | Advanced bitcoin custody uses multisig and timelocks to survive key loss. Today that means descriptor-fluent DIY tools, recurring white-glove subscriptions, or bundled hardware where a third party holds one of the keys. Build the version that's as easy as password managers, self-serve on recovery, and works with hardware people already own. |
| body | Advanced custody uses multisig and miniscript timelocks to survive key loss while supporting inheritance. A DIY tier ships free ([Sparrow](https://sparrowwallet.com/), [Specter](https://specter.solutions/), [Liana](https://wizardsardine.com/liana/), [Nunchuk](https://nunchuk.io/), [Theya](https://theya.us/)) for users comfortable with descriptors and PSBTs. A white-glove tier charges recurring fees for expert setup and recovery ([Casa](https://casa.io/), [Unchained](https://unchained.com/), [Anchorwatch](https://anchorwatch.com/), [Onramp](https://onrampbitcoin.com/)). [Bitkey](https://bitkey.build/) bundles 3-key multisig into hardware with no subscription, but only with its own hardware and with Block holding a key. Build the version that's password-manager-easy, self-serve on recovery, and works with hardware wallets people already own. |
| category | sovereignty |
| archetype | wire,build |
| audiences | bitcoin-user |
| first_added | 2026-04-27 |
| last_reviewed | 2026-04-27 |

### Past products (6, status as captured)

- descriptor-encrypt (2025, bitcoin-2025-official) — wallet authors encrypt a descriptor so only the keyholders required by its spending policy can recover it
- Munstr (2023, mit-bitcoin-2023) — MuSig2 multisig coordination over Nostr, producing an on-chain tx indistinguishable from single-sig
- Glacier Wallet (2025, lightning-plus-plus-berlin-2025) — lock bitcoin until a future block height; auto-generates the unlock PSBT when the timelock expires
- munt (2024, bitcoinpp-ecash-2024) — Cashu token backup/restore across devices
- Bitcoin Core 2.0 (2020, mit-bitcoin-2020) — Bitcoin Core wallet fork with YubiKey/hardware-wallet-first UI
- Cete (Self Sovereign Family) (2022, mit-bitcoin-2022) — bitcoin wallet app designed for families with members in all life stages
