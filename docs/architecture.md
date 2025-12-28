# Ion Drift — Architecture Notes

Notes describing architectural decisions and the read-only design approach.

---

## Overview

Ion Drift is a **Base-aligned**, read-only tool intended for safe inspection of onchain state.
The project is designed to run against:
- **Base Mainnet** (production reads)
- **Base Sepolia** (testnet validation)

Network configuration (RPC, explorers, chain IDs) should live in config (not hardcoded in code).

---

## Read-only Design

Ion Drift is intentionally scoped to **non-mutating operations**.

 hookup examples:
- Get latest block number
- Read ETH balances
- Check if an address has contract bytecode
- Read token metadata (symbol/decimals) where applicable

Out of scope (by design):
- Sending transactions
- Signing messages as a requirement
- Key management / wallet custody
- Any write-path flows that change onchain state

This keeps the behavior deterministic and reduces operational risk.

---

## Base Alignment

Key Base choices:
- **Base RPC** endpoints are used with a fallback list for reliability.
- **BaseScan** is the canonical explorer for verification links.
- Chain IDs are treated as configuration:
  - `8453` (Base Mainnet)
  - `84532` (Base Sepolia)

---

## Operational Considerations

- Prefer configuration changes over code changes for network issues.
- Treat RPC/chainId changes as high-risk.
- Keep dependencies minimal and aligned with the Base ecosystem.

---

## Tradeoffs

Pros:
- Easy to validate and audit
- Minimal attack surface
- Stable read-only behavior

Cons:
- No coverage of write-side bugs
- Does not test signing or transaction lifecycle

These tradeoffs are intentional for the current scope.

---

_Last updated: initial scaffold_
