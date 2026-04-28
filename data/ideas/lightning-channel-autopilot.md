## lightning-channel-autopilot

| Field | Value |
|---|---|
| slug | lightning-channel-autopilot |
| idea | Automate opening, closing, rebalancing, and fee-setting for Lightning channels. |
| card_body | Lightning node operators make four decisions at once: which peers to open channels with, when to rebalance, what fees to charge, and when to close. Core Lightning has a daemon that stitches them together. LND (Lightning Network Daemon) doesn't. Port the pattern, or ship the LND-native autopilot. |
| body | Lightning node operators make four liquidity decisions at once: which peers to open channels with, when to rebalance, what fees to charge, and when to close. [Balance of Satoshis](https://github.com/alexbosworth/balanceofsatoshis) and [Thunderhub](https://github.com/apotdevin/thunderhub) provide the levers manually on LND. [charge-lnd](https://github.com/accumulator/charge-lnd) sets fees by policy; [Loop](https://github.com/lightninglabs/loop) does on-chain swaps, [Peerswap](https://github.com/ElementsProject/peerswap) does peer-to-peer swaps. [LNDg](https://github.com/cryptosharks131/lndg) automates fees and rebalancing with a web UI but doesn't open or close channels. On CLN, [clboss](https://github.com/ksedgwic/clboss) already stitches open, rebalance, and fees together. Port the pattern to LND, build an LND-native autopilot, or orchestrate the existing LND tools into one integrated daemon. |
| category | sovereignty |
| archetype | wire,build |
| audiences | node-operator |
| first_added | 2026-04-27 |
| last_reviewed | 2026-04-27 |

### Past products (1, status as captured)

- Lightning Network Autopilot (2019+, Rene Pickhardt) — autopilot for channel decisions
