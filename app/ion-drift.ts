// app/ion-drift.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  createPublicClient,
  http,
  formatEther,
  isAddress,
  getAddress,
} from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETWORKS: Network[] = [
  {
    chain: baseSepolia,
    chainId: 84532,
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    label: "Base Sepolia",
  },
  {
    chain: base,
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    label: "Base Mainnet",
  },
];

let active = NETWORKS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Ion Drift (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const panel = document.createElement("pre");
panel.style.background = "#0b1224";
panel.style.color = "#e3ebff";
panel.style.padding = "16px";
panel.style.borderRadius = "12px";
panel.style.minHeight = "320px";

function log(lines: string[]) {
  panel.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({
    chain: active.chain,
    transport: http(active.rpc),
  });
}

async function connectWallet() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];

  const address = getAddress(accounts[0]);
  const balance = await client().getBalance({ address });

  log([
    "Wallet connected",
    `Network: ${active.label}`,
    `chainId: ${active.chainId}`,
    `Address: ${address}`,
    `Balance: ${formatEther(balance)} ETH`,
    `${active.explorer}/address/${address}`,
  ]);
}

async function networkOverview() {
  const c = client();
  const [block, gasPrice] = await Promise.all([
    c.getBlock(),
    c.getGasPrice(),
  ]);

  log([
    "Network overview",
    `Network: ${active.label}`,
    `Latest block: ${block.number}`,
    `Timestamp: ${block.timestamp}`,
    `Gas used: ${block.gasUsed}`,
    `Gas limit: ${block.gasLimit}`,
    `Gas price: ${gasPrice.toString()}`,
    `${active.explorer}/block/${block.number}`,
  ]);
}

async function inspectAddress(raw: string) {
  if (!isAddress(raw)) throw new Error("Invalid address");

  const address = getAddress(raw);
  const c = client();

  const [balance, nonce, code] = await Promise.all([
    c.getBalance({ address }),
    c.getTransactionCount({ address }),
    c.getBytecode({ address }),
  ]);

  log([
    "Address inspection",
    `Network: ${active.label}`,
    `Address: ${address}`,
    `Balance: ${formatEther(balance)} ETH`,
    `Tx count: ${nonce}`,
    `Contract: ${code ? "yes" : "no"}`,
    `${active.explorer}/address/${address}`,
  ]);
}

function switchNetwork() {
  active = active.chainId === 84532 ? NETWORKS[1] : NETWORKS[0];
  log([`Switched to ${active.label}`, `chainId: ${active.chainId}`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "960px";
  root.style.margin = "32px auto";
  root.style.fontFamily = "system-ui";

  const h1 = document.createElement("h1");
  h1.textContent = "Ion Drift";

  const input = document.createElement("input");
  input.placeholder = "0x… address";
  input.style.minWidth = "420px";
  input.style.marginTop = "8px";

  function btn(label: string, fn: () => void | Promise<void>) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = () => Promise.resolve(fn()).catch(e => log([String(e)]));
    return b;
  }

  root.append(
    h1,
    btn("Connect wallet", connectWallet),
    btn("Switch network", switchNetwork),
    btn("Network overview", networkOverview),
    input,
    btn("Inspect address", () => inspectAddress(input.value)),
    panel,
  );

  document.body.appendChild(root);
  log(["Ready", `Active network: ${active.label}`, "Read-only mode enabled"]);
}

mount();
