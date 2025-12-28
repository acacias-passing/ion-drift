# Ion Drift — Base Sepolia Testnet Validation

Records captured during Base Sepolia deployment and validation.

---

## Environment

- **Network:** Base Sepolia
- **Chain ID:** 84532
- **RPC:** https://sepolia.base.org
- **Explorer:** https://sepolia.basescan.org

---

## Validation Log

### 2025-12-24 — Validation Pass #1

#### 1) Config sanity
- [ ] Confirm Sepolia network entry exists (chainId `84532`)
- [ ] Confirm RPC default is reachable
- [ ] Confirm fallback RPC exists and is HTTPS
- [ ] Confirm explorer base URL is Sepolia BaseScan

#### 2) RPC connectivity
- [ ] Fetch latest block number (must be > 0)
- [ ] Re-fetch after a short pause (block may advance)
- [ ] If issues, switch to fallback RPC and retry

Result:
- [ ] PASS / [ ] FAIL  
Notes: _(fill in during run)_

#### 3) Read-only probes
- [ ] ETH balance lookup for a sample EOA
- [ ] Contract code lookup for a known contract address
- [ ] Zero address handling (no crash)
- [ ] Burn address handling (no crash)

Result:
- [ ] PASS / [ ] FAIL  
Notes: _(fill in during run)_

#### 4) Explorer verification
- [ ] Address link opens in Sepolia BaseScan
- [ ] Latest block in explorer matches RPC (roughly)
- [ ] No mainnet links used during Sepolia testing

Result:
- [ ] PASS / [ ] FAIL  
Notes: _(fill in during run)_

---

## Follow-ups

- Treat chainId/RPC/explorer changes as high-risk.
- Update this file after each meaningful validation run.

_Last updated: initial scaffold_
