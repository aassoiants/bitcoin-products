## node-operator-mempool-policy

| Field | Value |
|---|---|
| slug | node-operator-mempool-policy |
| statement | Give bitcoin node operators policy control over their own mempool. |
| card_body | Every bitcoin node operator has the right to choose which transactions their node relays. Exercising that right today means running a fork. Ship a plugin system, design policy profiles, and explain the consequences of these decisions. |
| body | Every bitcoin node operator has the right to decide which valid transactions their node accepts and relays. That's policy, not consensus: the transactions stay valid on the network either way; the node just chooses what to propagate. bitcoin.conf exposes some policy: relay fees, a handful of standardness knobs like `permitbaremultisig`. But the policies operators actually argue over today, like filtering inscription-shaped witnesses or rejecting specific script patterns, aren't on that config surface. [Bitcoin Knots](https://bitcoinknots.org/) and Peter Todd's [Libre Relay](https://github.com/petertodd/bitcoin) exist as forks because new policy logic has to be patched into the codebase, not toggled in a config file. A [Pluggable Filter Framework proposal](https://delvingbitcoin.org/t/proposal-pluggable-filter-framework/2064) surfaced on Delving Bitcoin in October 2025 but is still discussion-stage. Pick up the proposal, ship a plugin system, design policy profiles that don't require running a fork, and explain the consequences of each policy choice. |
| category | sovereignty |
| archetype | wire,build |
| audiences | node-operator |
| first_added | 2026-04-27 |
| last_reviewed | 2026-04-27 |

### Past products (1, status as captured)

- garbageman (2024+) — configurable mempool filtering
