export interface ResearchPaper {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  pdfPath: string;
  videoId?: string;
  sections: Array<{ heading: string; body: string }>;
}

export const researchPapers: ResearchPaper[] = [
  {
    slug: "chain-key-cryptography",
    title: "Chain-Key Cryptography",
    subtitle: "How ICP achieves trustless cross-chain integration",
    description:
      "An exploration of the threshold signature schemes and distributed key generation protocols that allow the Internet Computer to sign transactions on external blockchains without a bridge or custodian.",
    tags: ["cryptography", "security", "chain-key"],
    pdfPath: "/assets/pdfs/chain-key-cryptography.pdf",
    videoId: "03OPlwxydxA",
    sections: [
      {
        heading: "What Is Chain-Key Cryptography?",
        body: "Chain-key cryptography is the foundational cryptographic framework that powers the Internet Computer. At its core, it enables the IC network to operate as a single, coherent computer despite being composed of thousands of independently operated nodes spread across multiple data centers and geographies. The key innovation is a suite of threshold cryptographic protocols — most prominently threshold BLS signatures and distributed key generation (DKG) — that allow subnets to collectively produce cryptographic outputs without any single node ever holding a complete private key.",
      },
      {
        heading: "Threshold Signatures and Subnet Keys",
        body: "Each subnet on the Internet Computer holds a distributed key: no individual replica node possesses the full private key. Instead, each node holds a key share. When the subnet needs to sign a message — whether that is finalizing a block, certifying state, or authorizing a cross-chain transaction — a threshold number of nodes must cooperate to produce a valid signature. The threshold is typically set at two-thirds of the subnet's nodes, ensuring that even if up to one-third of nodes are compromised, no unauthorized signature can be produced. This design eliminates single points of failure and trust.",
      },
      {
        heading: "Integration with Bitcoin and Ethereum",
        body: "Chain-key signatures extend directly into cross-chain integration. With tECDSA (threshold ECDSA) and tSchnorr, IC canisters can hold and sign Bitcoin and Ethereum transactions natively — without any external bridge, wrapped asset, or custodial intermediary. A canister requests a signature from the threshold signing protocol; the subnet's nodes cooperate to produce a valid ECDSA or Schnorr signature that can be broadcast directly to Bitcoin or Ethereum. The result is that a canister can own a Bitcoin address, receive BTC, and send BTC entirely on-chain, with execution governed by canister code and consensus enforced by the IC protocol.",
      },
      {
        heading: "Protocol-Level Trust vs. Bridge-Level Risk",
        body: "Traditional cross-chain bridges rely on a small committee of validators or a multisig wallet — both are attack surfaces. Chain-key cryptography eliminates the bridge layer entirely. The trust assumption is the same as the IC protocol itself: that the subnet's consensus holds. Because key shares are rotated on a regular schedule and DKG ceremonies re-establish key material without ever reconstructing the full key, the system is resistant to key leakage over time. This is a fundamentally different security model from any approach that relies on off-chain committees, oracles, or lock-and-mint architectures.",
      },
    ],
  },
  {
    slug: "canister-smart-contracts",
    title: "Canister Smart Contracts",
    subtitle: "Beyond EVM — execution at web speed",
    description:
      "A technical examination of the canister execution model on the Internet Computer: how WebAssembly modules, orthogonal persistence, and message-passing enable smart contracts that serve web content, store state indefinitely, and process calls at the speed of a web server.",
    tags: ["canisters", "smart-contracts", "compute"],
    pdfPath: "/assets/pdfs/canister-smart-contracts.pdf",
    sections: [
      {
        heading: "The Canister Model",
        body: "A canister is a unit of computation and state on the Internet Computer. It consists of a WebAssembly (Wasm) module and a persistent memory store. Unlike Ethereum smart contracts, canisters are not limited to 24 KB of bytecode or simple key-value state transitions. A single canister can hold gigabytes of stable memory, execute complex computation, and serve HTTP responses directly to browsers — all within the same execution environment. Canisters are actors in the actor model sense: they process messages sequentially, maintain private state, and communicate with other canisters by sending and receiving messages.",
      },
      {
        heading: "Orthogonal Persistence",
        body: "One of the defining properties of the canister execution model is orthogonal persistence. Canister state is automatically persisted between calls without the developer needing to serialize data to external storage or manage database connections. The IC runtime snapshots and restores canister memory as part of the normal execution cycle. Developers declare which memory regions are 'stable' — meaning they survive canister upgrades — and the system handles the rest. This eliminates entire categories of infrastructure complexity that are standard in cloud-based application development.",
      },
      {
        heading: "Cycles and the Compute Economy",
        body: "Computation on the IC is metered through cycles, which are the fuel that canisters burn to execute instructions, store data, and send messages. Cycles are acquired by converting ICP tokens at a stable USD-denominated rate, decoupling compute costs from ICP price volatility. Unlike Ethereum gas, which is paid by the caller on every transaction, cycles in the IC follow a 'reverse gas' model: the canister itself holds cycles and pays for its own execution. This enables seamless user experiences where end users do not need to hold any token to interact with an application.",
      },
      {
        heading: "Inter-Canister Calls and Composability",
        body: "Canisters compose by sending messages to one another. A canister can call any other canister on the same subnet or across subnets, with cross-subnet calls routed through the XNet messaging protocol. Inter-canister calls are asynchronous: a canister sends a call, continues processing other messages, and handles the response when it arrives. This architecture enables fully on-chain applications where business logic, data storage, authentication, and front-end serving are all handled by canisters, with no off-chain servers required in the execution path.",
      },
    ],
  },
  {
    slug: "network-nervous-system",
    title: "The Network Nervous System",
    subtitle: "Decentralized governance at protocol scale",
    description:
      "An analysis of the NNS DAO — the on-chain governance system that controls the Internet Computer's topology, protocol upgrades, subnet configuration, and tokenomics — and how liquid democracy through neuron voting enables scalable decentralized control.",
    tags: ["governance", "NNS", "DAO"],
    pdfPath: "/assets/pdfs/network-nervous-system.pdf",
    sections: [
      {
        heading: "What the NNS Controls",
        body: "The Network Nervous System is the on-chain governing body of the Internet Computer. It is responsible for decisions that would, in a traditional infrastructure context, require a central authority: adding new node machines to the network, upgrading the IC protocol software running on subnets, adjusting the topology of the subnet structure, managing the ICP token economy, and approving or rejecting proposals that affect any aspect of the network. The NNS runs as a set of system canisters on a dedicated, high-replication subnet that cannot be modified except through its own governance process.",
      },
      {
        heading: "Neurons and Liquid Democracy",
        body: "Governance participation in the NNS is mediated through neurons — staked ICP tokens locked for a defined dissolve delay. The longer a neuron's dissolve delay and the more ICP it contains, the greater its voting power. Neuron holders can vote directly on proposals or delegate their voting power to other neurons through 'following' — a form of liquid democracy. A neuron configured to follow a trusted expert or organization will automatically cast its vote in the same direction, enabling passive participation without requiring every ICP holder to evaluate every technical proposal.",
      },
      {
        heading: "Proposal Types and Execution",
        body: "NNS proposals span a wide range of action types: NodeAdmin proposals add or remove node machines; SubnetManagement proposals configure individual subnets; NNSCanisterUpgrade proposals update the NNS's own canisters; NetworkEconomics proposals adjust parameters like minimum neuron stake or voting rewards. When a proposal passes — determined by a majority of voting power cast within the voting period — it is executed automatically by the NNS system canisters. There is no trusted party that executes the outcome; the governance result is enforced by the protocol itself.",
      },
      {
        heading: "Voting Rewards and Incentive Design",
        body: "The NNS incentivizes active governance participation through voting rewards. Neurons that vote on proposals (directly or through following) earn maturity, which can be spawned into new ICP or merged back into the neuron to compound. The reward rate is higher for neurons with longer dissolve delays, aligning incentives toward long-term thinking. This creates a system where the participants with the greatest economic exposure to the protocol's future also have the strongest structural incentive to govern it carefully and consistently.",
      },
    ],
  },
  {
    slug: "internet-identity",
    title: "Internet Identity",
    subtitle: "Self-sovereign authentication without passwords",
    description:
      "A deep dive into the Internet Identity system: how WebAuthn-based passkeys, canister-hosted authentication anchors, and per-application pseudonymous principals deliver password-free login with no tracking, no custodian, and no shared credentials across apps.",
    tags: ["identity", "auth", "privacy"],
    pdfPath: "/assets/pdfs/internet-identity.pdf",
    sections: [
      {
        heading: "The Problem with Password Authentication",
        body: "Traditional authentication systems share a fundamental design flaw: they require users to prove identity using a shared secret — a password — that must be stored on a server. When that server is breached, every credential it holds is compromised. Password reuse amplifies the damage across services. Phishing attacks exploit the fact that passwords can be entered into any form that looks legitimate. The Internet Identity system eliminates passwords entirely, replacing them with cryptographic hardware-backed keys through the WebAuthn standard.",
      },
      {
        heading: "WebAuthn and Passkey Infrastructure",
        body: "Internet Identity uses WebAuthn — the same standard underlying passkeys on modern operating systems and devices — as its authentication primitive. Users register one or more authenticators: a device's biometric sensor, a security key, or a platform authenticator like Face ID or Windows Hello. Each authenticator generates a public-private key pair. The private key never leaves the device's secure enclave; only the public key and a signature over a challenge are sent to the authentication service. This means there is no password to steal, no secret shared with a server, and no phishing attack surface against the credential itself.",
      },
      {
        heading: "Anchors and Pseudonymous Principals",
        body: "Internet Identity assigns each user an 'anchor' — a numeric identifier — that acts as the root of their identity. When a user authenticates to an IC application, the Internet Identity canister derives a unique principal for that specific application from the anchor. This principal is cryptographically tied to both the user's identity and the application's origin. The result is that a user has a different principal on every application they use, making cross-application tracking impossible by design. No two applications can correlate the same user's actions, even if the user logs into both with the same Internet Identity anchor.",
      },
      {
        heading: "Canister-Native, No Third Party",
        body: "The entire Internet Identity system runs as a canister on the Internet Computer. There is no external OAuth provider, no Google login, no centralized identity server that can be shut down or coerced. The canister code is open source, governance-controlled through the NNS, and verifiable by any party. Users own their authentication anchors; no platform can revoke them, block them, or collect telemetry about how they are used. This makes Internet Identity a genuinely self-sovereign authentication system — one that is owned by its users and governed by the same decentralized protocol that runs the applications built on top of it.",
      },
    ],
  },
];
