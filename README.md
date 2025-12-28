# Ion Drift (Built for Base)

Ion Drift is a read-only inspection utility for the Base ecosystem. It is built to help developers explore public onchain data, verify network context, and validate testnet deployments without sending transactions or modifying blockchain state.

---

## Network Coverage

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

---

## What This Tool Is Used For

Ion Drift is designed for lightweight verification and exploration workflows, such as:
- Making sure the correct Base network is selected
- Reviewing blocks, gas usage, and network state
- Inspecting balances, transaction counts, and contract bytecode
- Cross-checking deployed contracts using Basescan
- Running safe checks before production rollout

All actions remain strictly read-only.

---

## Project Layout

- **app/ion-drift.ts**  
  Browser-based entry script that connects to Coinbase Wallet and queries Base RPC endpoints.

- **contracts/**  
  Solidity contracts deployed on Base Sepolia for testnet validation:
  - `arrays.sol` — stores lists of values using dynamic or fixed-size arrays
  - `mapping.sol` — stores data as key → value pairs
  - `structs.sol` — groups related variables into a single structure

- **docs/architecture.md**  
  Notes describing architectural decisions and the read-only design approach.

- **docs/testnet-validation.md**  
  Records captured during Base Sepolia deployment and validation.

- **package.json**  
  Dependency manifest referencing Base and Coinbase repositories.

- **README.md**  
  Primary project documentation.

---

## Execution Model

Ion Drift connects to Coinbase Wallet using the Coinbase Wallet SDK and communicates directly with Base RPC endpoints through viem. It retrieves public blockchain data such as block details, balances, bytecode, and transaction counts, and includes direct explorer links for independent verification.

No transactions are signed or broadcast.

---

## Toolchain Overview

This repository relies on a focused set of tools:
- Coinbase Wallet SDK for wallet connectivity  
- OnchainKit references for Base-aligned primitives  
- viem for efficient, type-safe RPC communication  
- Selected Base and Coinbase GitHub repositories  

---
## Base Sepolia Testnet Deployments

The following contracts were deployed on Base Sepolia to validate tooling behavior and network compatibility before mainnet usage.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract arrays.sol address:  
0x62E6E461F6B1dC06f35ee0897E2ced0A0E1b3cD2

Deployment and verification:
- https://sepolia.basescan.org/address/0x62E6E461F6B1dC06f35ee0897E2ced0A0E1b3cD2
- https://sepolia.basescan.org/0x62E6E461F6B1dC06f35ee0897E2ced0A0E1b3cD2/0#code  

Contract mapping.sol address:  
0x08Ddd113656085f148AF8175c873dcbe0FD3c2A9 

Deployment and verification:
- https://sepolia.basescan.org/address/0x08Ddd113656085f148AF8175c873dcbe0FD3c2A9 
- https://sepolia.basescan.org/0x08Ddd113656085f148AF8175c873dcbe0FD3c2A96/0#code  

Contract structs.sol address:  
0x89264680D35a5bc7c75E8B5f2Bbe73c89B89aAD6

Deployment and verification:
- https://sepolia.basescan.org/address/0x89264680D35a5bc7c75E8B5f2Bbe73c89B89aAD6
- https://sepolia.basescan.org/0x89264680D35a5bc7c75E8B5f2Bbe73c89B89aAD6/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.

## License

MIT License  
Copyright (c) 2025 YOUR_NAME

---

## Maintainer

GitHub: https://github.com/acacias-passing

Email: acacias.passing-0b@icloud.com  

---
