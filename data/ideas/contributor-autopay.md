## contributor-autopay

| Field | Value |
|---|---|
| slug | contributor-autopay |
| idea | Auto-pay contributors for a specific unit of work. |
| card_body | Maintainers want to pay open-source contributors in sats when their work ships. Today's tools auto-pay in fiat, distribute across dependency trees, or keep the on-merge flow private. Port the mechanics to bitcoin, open-source the pattern, or ship a GitHub Action that pays sats on merge. |
| body | Maintainers want to pay open-source contributors in sats when their work ships, but no end-to-end tool does this today. Hackathon builders have attempted this across four angles (AI training payments, PR-merge bounties, L402 workforce payments, activist bounties) without a dominant solution. [Algora](https://algora.io) auto-pays on PR merge via Stripe, fiat-only. [thanks.dev](https://thanks.dev) distributes periodically across dependency trees, not per unit of work. [PlanB Network](https://planb.network) runs a Lightning-on-merge flow internally but hasn't open-sourced it. Port Algora's mechanics to bitcoin, open-source a pattern similar to PlanB, or ship a GitHub Action that pays sats on merge. |
| category | commerce |
| archetype | wire,build |
| audiences | creator-merchant |
| first_added | 2026-04-27 |
| last_reviewed | 2026-04-27 |

### Past products (4, status as captured)

- Bitcoin-PAL (2023, ai4all-2023) — docs contributors auto-paid sats to Lightning Address on merged contributions via GitHub Actions; dormant since July 2023
- Lightning Bounties (2024, mit-bitcoin-2024) — pays open-source developers in BTC for merged GitHub contributions (PR-merge bounty platform)
- OpenAutoPay (2025, bitcoinpp-pool-2025) — AI workforce payments using Lightning, L402, Nostr
- Pathos / Agora (2026, hrf-ai-hack-2026) — Nostr + Lightning + Bluetooth-mesh activist platform with bitcoin bounties for dissidents (primary fit: offline-bitcoin; secondary: auto-pay)
