// Glossary data for Worlds 3–8: DeFi, dApps, Governance, Security, Chain-Key, Coherence
// Additive only — does not modify existing worlds 1–2 data
import type { GlossaryTermData } from "./glossaryData";

// ─── World 3: DeFi ───────────────────────────────────────────────────────────
export const world3GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Decentralized Finance",
    definition:
      "Financial services and instruments built on blockchain networks that operate without centralized intermediaries like banks, enabling open access to lending, borrowing, trading, and earning.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Finance", "Blockchain"],
    relatedTopics: ["AMM", "Liquidity Pool", "Yield Farming"],
    relatedLessons: ["World 3: DeFi - Lesson 1"],
    externalReferences: ["https://defillama.com/"],
    fullDescription:
      "Decentralized Finance (DeFi) represents the migration of traditional financial services onto open, permissionless blockchains. Smart contracts replace banks, brokerages, and exchanges, allowing anyone with an internet connection to access financial primitives. DeFi protocols handle hundreds of billions in value and continue to innovate with products impossible in traditional finance, such as flash loans and automated market makers.",
  },
  {
    term: "DEX",
    definition:
      "A Decentralized Exchange — a trading platform where users swap tokens directly from their wallets via smart contracts, without depositing funds to a centralized custodian.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Trading", "Exchange"],
    relatedTopics: ["AMM", "Liquidity Pool", "Stablecoins"],
    relatedLessons: ["World 3: DeFi - Lesson 2"],
    externalReferences: ["https://uniswap.org/"],
    fullDescription:
      "A DEX allows peer-to-peer token swaps governed entirely by on-chain logic. Unlike centralized exchanges that hold user funds and require KYC, DEXes are non-custodial and permissionless. Popular models include Automated Market Makers (Uniswap, Curve) and order-book DEXes. Users retain self-custody throughout every trade, reducing counterparty risk while accepting smart contract risk instead.",
  },
  {
    term: "Liquidity Pool",
    definition:
      "A smart contract holding reserves of two or more tokens that enables decentralized trading. Liquidity providers deposit tokens and earn a share of trading fees in return.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Liquidity", "AMM"],
    relatedTopics: ["AMM", "DEX", "Yield Farming"],
    relatedLessons: ["World 3: DeFi - Lesson 3"],
    externalReferences: ["https://docs.uniswap.org/"],
    fullDescription:
      "Liquidity pools are the backbone of AMM-based DEXes. Instead of matching buyers and sellers, trades execute against pooled reserves. The ratio of tokens in the pool determines the price via a constant-product formula (x·y=k). Liquidity providers receive LP tokens representing their share and earn fees proportional to pool volume. Key risks include impermanent loss — the divergence in value between holding tokens versus providing liquidity.",
  },
  {
    term: "Yield Farming",
    definition:
      "The practice of deploying crypto assets across DeFi protocols to maximize returns through interest, fees, and token rewards — often moving assets between protocols to chase the highest yield.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Yield", "Strategy"],
    relatedTopics: ["Liquidity Pool", "Staking", "Governance Tokens"],
    relatedLessons: ["World 3: DeFi - Lesson 4"],
    externalReferences: ["https://ethereum.org/en/defi/"],
    fullDescription:
      "Yield farming emerged during DeFi Summer 2020 when protocols began distributing governance tokens to liquidity providers. Farmers allocate assets to protocols offering the highest Annual Percentage Yield (APY), which compounds fees, interest, and token emissions. Advanced strategies involve looping positions — depositing collateral, borrowing against it, redepositing — amplifying both returns and liquidation risk. APYs can be extraordinary but also ephemeral as capital flows chase the best opportunities.",
  },
  {
    term: "AMM",
    definition:
      "Automated Market Maker — a type of DEX protocol that uses algorithmic pricing formulas instead of order books to facilitate token swaps and determine exchange rates.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Trading", "Algorithm"],
    relatedTopics: ["DEX", "Liquidity Pool", "Impermanent Loss"],
    relatedLessons: ["World 3: DeFi - Lesson 5"],
    externalReferences: [
      "https://docs.uniswap.org/concepts/protocol/v2/core-concepts/amm",
    ],
    fullDescription:
      "AMMs replaced the traditional order-book model with mathematical price curves. The most common formula is the constant product (x·y=k) pioneered by Uniswap. Others include StableSwap (Curve) optimized for pegged assets and Weighted Pools (Balancer) for custom token ratios. Because price discovery is algorithmic and continuous, AMMs require no market makers and operate 24/7 on-chain without downtime.",
  },
  {
    term: "Stablecoin",
    definition:
      "A cryptocurrency designed to maintain a stable value, typically pegged to a fiat currency like the US dollar, achieved through collateral reserves or algorithmic supply mechanisms.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Stablecoin", "Peg"],
    relatedTopics: ["Collateral", "DEX", "Liquidity Pool"],
    relatedLessons: ["World 3: DeFi - Lesson 6"],
    externalReferences: [
      "https://www.coinbase.com/learn/crypto-basics/what-is-a-stablecoin",
    ],
    fullDescription:
      "Stablecoins solve the volatility problem for day-to-day DeFi usage. Fiat-backed stablecoins (USDC, USDT) are redeemable 1:1 with underlying reserves held by custodians. Crypto-backed stablecoins (DAI) are over-collateralized on-chain, maintaining peg through liquidation mechanisms. Algorithmic stablecoins attempt to hold the peg through supply expansion and contraction — a model that failed spectacularly with TerraUST in 2022. Stablecoins are critical infrastructure for DeFi lending and trading.",
  },
  {
    term: "Flash Loan",
    definition:
      "An uncollateralized loan that must be borrowed and repaid within the same blockchain transaction. If repayment fails, the entire transaction reverts as if it never occurred.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Lending", "Advanced"],
    relatedTopics: ["Smart Contracts", "Arbitrage", "Liquidation"],
    relatedLessons: ["World 3: DeFi - Lesson 7"],
    externalReferences: ["https://docs.aave.com/developers/guides/flash-loans"],
    fullDescription:
      "Flash loans are a uniquely blockchain-native financial primitive with no traditional finance equivalent. Because Ethereum executes all steps of a transaction atomically, a borrower can draw millions in assets, use them across multiple protocols (arbitrage, collateral swaps, liquidations), and repay them — all in one block. The lender charges a small fee and never faces credit risk. Flash loans have also been weaponized in oracle manipulation attacks, highlighting the interconnected risks of composable DeFi.",
  },
  {
    term: "Impermanent Loss",
    definition:
      "The temporary loss in value that liquidity providers experience when the price ratio of pooled tokens changes compared to simply holding those tokens outside the pool.",
    category: "DeFi",
    tags: ["DeFi", "World 3", "Risk", "Liquidity"],
    relatedTopics: ["Liquidity Pool", "AMM", "Yield Farming"],
    relatedLessons: ["World 3: DeFi - Lesson 8"],
    externalReferences: [
      "https://academy.binance.com/en/articles/impermanent-loss-explained",
    ],
    fullDescription:
      "Impermanent loss occurs because AMMs rebalance pools automatically as prices shift. If ETH doubles in price while you hold ETH/USDC liquidity, the AMM sold some of your ETH to maintain the ratio, leaving you with less ETH than a pure HODLer. The loss is 'impermanent' because it reverses if prices return to entry levels, but becomes permanent on withdrawal. Concentrated liquidity (Uniswap v3) can amplify both fees and IL within price ranges, requiring active management.",
  },
];

// ─── World 4: dApps & Smart Contracts ────────────────────────────────────────
export const world4GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Smart Contract",
    definition:
      "Self-executing code stored on a blockchain that automatically enforces and executes the terms of an agreement when predefined conditions are met, without requiring intermediaries.",
    category: "Smart Contracts",
    tags: ["Smart Contracts", "World 4", "dApps", "Ethereum"],
    relatedTopics: ["EVM", "Solidity", "Gas", "Oracle"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 1"],
    externalReferences: ["https://ethereum.org/en/smart-contracts/"],
    fullDescription:
      "Smart contracts were conceptualized by Nick Szabo in 1994 and first practically implemented on Ethereum in 2015. They are immutable programs that run deterministically across all nodes in a network. Once deployed, their logic cannot be changed (unless upgrade mechanisms are coded in), making them trustworthy for parties who don't know each other. Smart contracts power DeFi protocols, NFT marketplaces, DAOs, and virtually every Web3 application.",
  },
  {
    term: "EVM",
    definition:
      "The Ethereum Virtual Machine — a Turing-complete computation engine that executes smart contract bytecode across all Ethereum nodes in a sandboxed, deterministic environment.",
    category: "Smart Contracts",
    tags: ["EVM", "World 4", "Ethereum", "Smart Contracts"],
    relatedTopics: ["Smart Contract", "Solidity", "Gas", "Bytecode"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 2"],
    externalReferences: ["https://ethereum.org/en/developers/docs/evm/"],
    fullDescription:
      "The EVM is the runtime environment for smart contracts on Ethereum and all EVM-compatible chains (Polygon, Avalanche, BNB Chain). Every node runs an identical EVM, ensuring all contract executions reach the same state. The EVM operates on a stack-based architecture with 256-bit words. It charges gas for each operation (opcode) to prevent infinite loops and compensate validators. The EVM's design has spawned an entire ecosystem of compatible chains, making EVM knowledge universally valuable.",
  },
  {
    term: "Solidity",
    definition:
      "A statically typed, contract-oriented programming language designed for writing smart contracts on Ethereum and other EVM-compatible blockchains.",
    category: "Smart Contracts",
    tags: ["Solidity", "World 4", "Programming", "Ethereum"],
    relatedTopics: ["EVM", "Smart Contract", "Gas"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 3"],
    externalReferences: ["https://soliditylang.org/"],
    fullDescription:
      "Solidity is the dominant language for EVM smart contracts, taking syntactic influence from JavaScript, Python, and C++. Key features include contract inheritance, modifiers for access control, events for logging, and built-in units for ether and time. Security gotchas — reentrancy, integer overflow, unchecked return values — have caused catastrophic hacks, driving the development of security-focused alternatives like Vyper and formal verification tooling.",
  },
  {
    term: "Gas",
    definition:
      "A unit measuring the computational effort required to execute operations on the Ethereum blockchain. Users pay gas fees in ETH to compensate validators for processing their transactions.",
    category: "Smart Contracts",
    tags: ["Gas", "World 4", "Ethereum", "Fees"],
    relatedTopics: ["EVM", "Smart Contract", "Transaction"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 4"],
    externalReferences: ["https://ethereum.org/en/developers/docs/gas/"],
    fullDescription:
      "Gas is Ethereum's metering mechanism that prevents abuse of the shared computation resource. Every EVM opcode has a fixed gas cost; complex contracts cost more gas. After EIP-1559, Ethereum splits fees into a base fee (burned, market-determined) and a priority tip (to validators). Gas prices are measured in gwei (1/1,000,000,000 ETH). Gas costs drove demand for Layer 2 rollups and motivated ICP's cycles model as an alternative fee architecture.",
  },
  {
    term: "Oracle",
    definition:
      "A service that bridges on-chain smart contracts with real-world off-chain data, such as asset prices, weather data, or sports results, enabling contracts to respond to external events.",
    category: "Smart Contracts",
    tags: ["Oracle", "World 4", "Data", "DeFi"],
    relatedTopics: ["Smart Contract", "DeFi", "Chainlink"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 5"],
    externalReferences: ["https://chain.link/education/blockchain-oracles"],
    fullDescription:
      "The oracle problem is fundamental: blockchains cannot natively access off-chain data, yet most useful contracts require it (e.g., price feeds for DeFi, real-world events for prediction markets). Centralized oracles are single points of failure; decentralized oracle networks like Chainlink aggregate data from multiple sources and stake-weighted validators. Oracle manipulation — feeding incorrect price data to exploit DeFi protocols — has drained hundreds of millions in flash loan attacks.",
  },
  {
    term: "DAO",
    definition:
      "Decentralized Autonomous Organization — an organization governed by smart contracts and token holders rather than traditional management hierarchies, making collective decisions through on-chain voting.",
    category: "Governance",
    tags: ["DAO", "World 4", "Governance", "Organization"],
    relatedTopics: ["Governance Tokens", "On-Chain Voting", "Smart Contract"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 6"],
    externalReferences: ["https://ethereum.org/en/dao/"],
    fullDescription:
      "DAOs encode the rules of an organization as smart contracts, making governance transparent and tamper-resistant. Token holders propose and vote on changes — fee adjustments, treasury allocations, protocol upgrades. Voter apathy and whale concentration are recurring governance challenges. High-profile DAOs include MakerDAO (governing DAI), Uniswap DAO, and the NNS on the Internet Computer, which automates ICP network upgrades through NNS proposals.",
  },
  {
    term: "NFT",
    definition:
      "Non-Fungible Token — a unique, indivisible token on a blockchain representing ownership of a specific digital or physical asset, with provenance and scarcity verifiable on-chain.",
    category: "Tokens",
    tags: ["NFT", "World 4", "Tokens", "Ownership"],
    relatedTopics: ["Token Standards", "Smart Contract", "Digital Ownership"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 7"],
    externalReferences: ["https://ethereum.org/en/nft/"],
    fullDescription:
      "Unlike fungible tokens (ETH, BTC) where every unit is identical, each NFT has a unique token ID and metadata. Standards like ERC-721 and ERC-1155 define how NFTs are created and transferred on Ethereum. NFTs enable digital scarcity for art, gaming items, domain names (ENS), and event tickets. Criticism focuses on metadata storage — most NFT images are stored off-chain (IPFS or centralized servers), meaning the token is a pointer, not the asset itself. ICP stores NFTs fully on-chain.",
  },
  {
    term: "Token Standard",
    definition:
      "A specification defining the interface and behavior of tokens on a blockchain, enabling interoperability between wallets, exchanges, and other smart contracts.",
    category: "Tokens",
    tags: ["Token Standards", "World 4", "ERC-20", "Interoperability"],
    relatedTopics: ["NFT", "Smart Contract", "EVM"],
    relatedLessons: ["World 4: dApps & Smart Contracts - Lesson 8"],
    externalReferences: [
      "https://ethereum.org/en/developers/docs/standards/tokens/",
    ],
    fullDescription:
      "Token standards are community-agreed interfaces that ensure all compliant tokens behave predictably. ERC-20 defines fungible tokens with transfer, approve, and allowance functions. ERC-721 defines non-fungible tokens with unique IDs. ERC-1155 supports batch operations for both fungible and non-fungible tokens in one contract. On ICP, ICRC-1 and ICRC-2 serve as the canonical fungible token standards, enabling cross-protocol composability within the Internet Computer ecosystem.",
  },
];

// ─── World 5: Governance & DAOs ───────────────────────────────────────────────
export const world5GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "On-Chain Voting",
    definition:
      "A governance mechanism where token holders submit and vote on proposals directly via smart contracts, with results automatically enforced by the protocol without human intermediaries.",
    category: "Governance",
    tags: ["Governance", "World 5", "Voting", "DAO"],
    relatedTopics: ["DAO", "Governance Tokens", "Quorum", "NNS"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 1"],
    externalReferences: [
      "https://wiki.internetcomputer.org/wiki/Network_Nervous_System",
    ],
    fullDescription:
      "On-chain voting transforms governance from informal polls into binding, auditable decisions. Proposals are submitted on-chain, a voting window opens, and token-weighted votes determine the outcome. Smart contracts execute the result automatically — no committee can override the outcome. ICP's NNS implements liquid democracy, allowing neurons to follow other neurons, creating a delegation graph that maintains high participation without requiring all stakeholders to vote on every proposal.",
  },
  {
    term: "Governance Token",
    definition:
      "A token that grants holders the right to participate in protocol governance, including voting on proposals, parameter changes, treasury spending, and upgrades.",
    category: "Governance",
    tags: ["Governance", "World 5", "Token", "Voting"],
    relatedTopics: ["DAO", "On-Chain Voting", "Staking"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 2"],
    externalReferences: ["https://ethereum.org/en/dao/"],
    fullDescription:
      "Governance tokens give their holders a stake in protocol decisions proportional to their holdings. Protocols distribute them to incentivize participation — early users, liquidity providers, developers. However, token concentration among venture capitalists and whales creates plutocratic outcomes. ICP uses 'neurons' locked for governance staking, with voting power proportional to stake and dissolve delay, creating long-term alignment incentives absent in simple token voting.",
  },
  {
    term: "Quorum",
    definition:
      "The minimum threshold of voting participation or approval required for a governance proposal to be considered valid and enacted by the protocol.",
    category: "Governance",
    tags: ["Governance", "World 5", "DAO", "Voting"],
    relatedTopics: ["On-Chain Voting", "DAO", "NNS"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 3"],
    externalReferences: [
      "https://docs.uniswap.org/contracts/v3/reference/governance/governor-bravo",
    ],
    fullDescription:
      "Quorum protects protocols from low-participation manipulation where a small minority pushes through consequential changes. Without quorum, an attacker could propose malicious changes during a holiday weekend when most stakeholders are inactive. Different protocols set different quorum thresholds — Uniswap requires 40 million UNI (4% of supply), Compound requires 400,000 COMP. ICP's NNS uses vote totals weighted by neuron stake and dissolve delay, with rewards incentivizing regular participation.",
  },
  {
    term: "NNS",
    definition:
      "The Network Nervous System — ICP's on-chain autonomous governance system that controls the Internet Computer protocol, enabling decentralized upgrades, parameter changes, and subnet management through neuron voting.",
    category: "ICP",
    tags: ["NNS", "World 5", "ICP", "Governance"],
    relatedTopics: ["On-Chain Voting", "Neuron", "ICP", "DAO"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 4"],
    externalReferences: [
      "https://wiki.internetcomputer.org/wiki/Network_Nervous_System",
    ],
    fullDescription:
      "The NNS is arguably the most sophisticated on-chain governance system in production. It manages all aspects of the Internet Computer: subnet creation and topology, canister upgrades, economic parameters (rewards, fees), and protocol upgrades. ICP holders lock tokens as neurons; the longer the dissolve delay (up to 8 years), the higher the voting reward. The NNS makes ICP the only major L1 where the network protocol itself is governed and upgraded entirely on-chain without hard forks.",
  },
  {
    term: "Proposal",
    definition:
      "A formal submission in a DAO or governance system describing a requested action, parameter change, or protocol upgrade that token holders vote to approve or reject.",
    category: "Governance",
    tags: ["Governance", "World 5", "DAO", "Voting"],
    relatedTopics: ["On-Chain Voting", "NNS", "Quorum"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 5"],
    externalReferences: [
      "https://wiki.internetcomputer.org/wiki/Governance_of_the_Internet_Computer",
    ],
    fullDescription:
      "Proposals in well-designed governance systems must be unambiguous, executable on-chain, and accompanied by sufficient context for informed voting. Types include protocol upgrades (new code deployments), economic parameter changes (reward rates, fee structures), treasury allocations (grants, investments), and emergency actions (freezing malicious canisters). The NNS processes thousands of proposals per year, with most routine network upgrades passing with delegated neuron votes.",
  },
  {
    term: "Liquid Democracy",
    definition:
      "A governance model combining direct democracy and representative democracy, allowing voters to cast their own vote or delegate it to a trusted representative who votes on their behalf.",
    category: "Governance",
    tags: ["Governance", "World 5", "Delegation", "ICP"],
    relatedTopics: ["NNS", "On-Chain Voting", "Neuron"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 6"],
    externalReferences: ["https://wiki.internetcomputer.org/wiki/Neurons_101"],
    fullDescription:
      "Liquid democracy solves the voter apathy problem: not everyone has time to research every governance proposal. By delegating to trusted expert neurons (following), token holders remain politically active without active participation. On ICP, neurons can follow different neurons per proposal topic — delegating technical upgrades to DFINITY while voting personally on economic parameters. Delegation is revocable at any time, maintaining accountability. This model is a significant advance over simple plutocratic token voting.",
  },
  {
    term: "Treasury",
    definition:
      "A pool of funds held and controlled by a DAO or protocol, allocated through governance proposals for development, grants, liquidity, marketing, or other protocol-defined purposes.",
    category: "Governance",
    tags: ["Governance", "World 5", "DAO", "Finance"],
    relatedTopics: ["DAO", "On-Chain Voting", "Governance Tokens"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 7"],
    externalReferences: ["https://ethereum.org/en/dao/"],
    fullDescription:
      "Protocol treasuries have grown to represent billions in value, managed on-chain by governance token holders. They are funded by protocol fees, token allocations, and investment proceeds. Treasury management is one of the most contentious governance activities — how to balance protocol grants, liquidity incentives, developer salaries, and reserve building. DAOs with large treasuries and weak governance have been exploited through governance attacks (e.g., Beanstalk's $182M flash loan governance hack in 2022).",
  },
  {
    term: "Governance Attack",
    definition:
      "An exploit in which an attacker acquires sufficient voting power to pass malicious proposals, steal treasury funds, or change protocol parameters in their favor.",
    category: "Governance",
    tags: ["Governance", "World 5", "Security", "Attack"],
    relatedTopics: ["DAO", "On-Chain Voting", "Treasury"],
    relatedLessons: ["World 5: Governance & DAOs - Lesson 8"],
    externalReferences: ["https://rekt.news/beanstalk-rekt/"],
    fullDescription:
      "Governance attacks exploit the gap between when voting power is acquired and when a proposal executes. In flash loan attacks (Beanstalk, 2022), an attacker borrows enormous token amounts within a single transaction, votes on a malicious proposal, and repays the loan — all atomically. Mitigations include time locks (delay between vote and execution), snapshot-based voting (using balances from a past block), and high quorum requirements. ICP's neuron staking with mandatory dissolve delays makes flash loan governance attacks impossible.",
  },
];

// ─── World 6: Security & Privacy ─────────────────────────────────────────────
export const world6GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Zero-Knowledge Proof",
    definition:
      "A cryptographic method by which one party can prove to another that a statement is true without revealing any information beyond the validity of the statement itself.",
    category: "Security",
    tags: ["Security", "World 6", "Cryptography", "Privacy"],
    relatedTopics: ["Privacy", "Cryptography", "zkSNARK"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 1"],
    externalReferences: ["https://ethereum.org/en/zero-knowledge-proofs/"],
    fullDescription:
      "Zero-knowledge proofs (ZKPs) are one of the most powerful tools in cryptography. They allow you to prove you know a secret (e.g., a password, a private key, your age) without revealing the secret itself. zkSNARKs and zkSTARKs are efficient ZKP constructions used in privacy coins (Zcash), identity systems, and Layer 2 rollups. ZK rollups use proofs to verify off-chain computation on-chain efficiently. ZKPs are central to the future of privacy-preserving blockchain applications.",
  },
  {
    term: "Multi-Sig",
    definition:
      "Multi-signature security requiring approval from multiple private keys before a transaction executes, distributing trust and eliminating single points of failure in fund management.",
    category: "Security",
    tags: ["Security", "World 6", "Multi-sig", "Wallets"],
    relatedTopics: ["Private Key", "Wallets", "Cold Storage"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 2"],
    externalReferences: ["https://bitcoin.org/en/glossary/multisig"],
    fullDescription:
      "Multi-sig (m-of-n) requires m signatures from n designated keyholders to authorize a transaction. A 2-of-3 setup means any two of three keyholders must approve. This is the gold standard for securing large treasury holdings — even if one key is compromised, funds cannot be moved. Gnosis Safe is the dominant multi-sig on EVM chains. Chain-Key technology on ICP provides threshold signatures as a protocol-native equivalent, removing the need for external multi-sig infrastructure.",
  },
  {
    term: "Cold Storage",
    definition:
      "The practice of keeping private keys offline and disconnected from the internet to protect digital assets from remote hacking, malware, and online attack vectors.",
    category: "Security",
    tags: ["Security", "World 6", "Wallets", "Keys"],
    relatedTopics: ["Private Key", "Hardware Wallet", "Self-Custody"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 3"],
    externalReferences: ["https://bitcoin.org/en/secure-your-wallet"],
    fullDescription:
      "Cold storage encompasses hardware wallets (Ledger, Trezor), air-gapped computers, and paper wallets. Because private keys never touch an internet-connected device, they are immune to remote attacks. The trade-off is reduced convenience for frequent transactions. Institutions holding significant crypto reserves use cold storage with multi-sig for the majority of funds and a hot wallet for operational liquidity. Physical security — protecting the device from theft and environmental damage — becomes the primary risk.",
  },
  {
    term: "Social Engineering",
    definition:
      "Psychological manipulation of individuals to divulge confidential information, grant unauthorized access, or perform actions that compromise security — the human layer of attack.",
    category: "Security",
    tags: ["Security", "World 6", "Phishing", "Attack"],
    relatedTopics: ["Phishing", "Private Key", "Security"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 4"],
    externalReferences: [
      "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks",
    ],
    fullDescription:
      "Social engineering exploits human psychology rather than technical vulnerabilities. Common attacks include phishing (fake websites/emails capturing seed phrases), SIM swapping (hijacking phone numbers for 2FA bypass), impersonation (fake support agents), and romance/investment scams. In crypto, social engineering causes more losses than smart contract hacks. The irreversibility of blockchain transactions makes these attacks devastating. Education and skepticism — especially of unsolicited contact — are the primary defenses.",
  },
  {
    term: "Smart Contract Audit",
    definition:
      "A systematic security review of smart contract code by external experts to identify vulnerabilities, logic errors, and attack vectors before deployment or during protocol operation.",
    category: "Security",
    tags: ["Security", "World 6", "Audit", "Smart Contracts"],
    relatedTopics: ["Smart Contract", "Exploit", "Bug Bounty"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 5"],
    externalReferences: ["https://consensys.io/diligence"],
    fullDescription:
      "Smart contract audits are standard practice before major DeFi protocol launches. Auditors (OpenZeppelin, Trail of Bits, Certik) manually review code and use automated tools to find reentrancy vulnerabilities, integer overflows, access control issues, oracle manipulation vectors, and economic design flaws. Audits reduce but do not eliminate risk — many audited protocols have been hacked. Continuous monitoring, bug bounties, and formal verification add additional security layers.",
  },
  {
    term: "Exploit",
    definition:
      "The act of using a vulnerability in a smart contract, protocol, or system to extract funds or data, or to cause unintended behavior that benefits the attacker.",
    category: "Security",
    tags: ["Security", "World 6", "Hack", "Vulnerability"],
    relatedTopics: ["Smart Contract Audit", "Flash Loan", "Reentrancy"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 6"],
    externalReferences: ["https://rekt.news/"],
    fullDescription:
      "DeFi exploits have resulted in billions of losses. Major attack vectors include reentrancy (The DAO hack, 2016 — $60M), flash loan price oracle manipulation (Compound, Cream Finance), access control failures (Poly Network, 2021 — $611M), and economic design exploits (Iron Finance bank run). Most exploits are economically motivated; some attackers return funds when confronted (white hat behavior). Post-mortem analyses from rekt.news serve as critical learning resources for the industry.",
  },
  {
    term: "Seed Phrase",
    definition:
      "A human-readable mnemonic of 12–24 words generated from the entropy of a wallet that can fully restore all private keys and accounts associated with that wallet.",
    category: "Security",
    tags: ["Security", "World 6", "Wallets", "Recovery"],
    relatedTopics: ["Private Key", "Cold Storage", "Self-Custody"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 7"],
    externalReferences: [
      "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
    ],
    fullDescription:
      "Seed phrases (BIP-39 standard) encode a wallet's master private key as human-memorizable words from a 2048-word list. They are the ultimate backup for all derived keys and accounts. Anyone who obtains your seed phrase has complete control of your assets — it must never be typed into any website, shared with anyone, or stored digitally. Best practices: write on paper or metal, store in multiple secure physical locations, never photograph. Hardware wallets generate and store seed phrases offline.",
  },
  {
    term: "51% Attack",
    definition:
      "An attack in which a single entity controls more than half of a Proof-of-Work network's hashrate, enabling double-spending and transaction censorship, but not theft of others' funds.",
    category: "Security",
    tags: ["Security", "World 6", "Consensus", "Attack"],
    relatedTopics: ["Consensus", "Proof of Work", "Decentralization"],
    relatedLessons: ["World 6: Security & Privacy - Lesson 8"],
    externalReferences: ["https://www.investopedia.com/terms/1/51-attack.asp"],
    fullDescription:
      "In Proof-of-Work blockchains, the longest chain wins. An attacker with >50% hashrate can secretly mine a longer chain, then release it to reorganize the public chain — erasing recent transactions and double-spending. This has happened to smaller chains (Ethereum Classic, Bitcoin Gold). Bitcoin's hashrate is so large that a 51% attack is economically prohibitive. Proof-of-Stake systems require 51% of stake, not hashrate; on ICP, the NNS subnet structure distributes trust across independent node providers globally.",
  },
];

// ─── World 7: Chain-Key Technology ───────────────────────────────────────────
export const world7GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Chain-Key Technology",
    definition:
      "ICP's suite of cryptographic protocols enabling the Internet Computer to operate as a single unified blockchain — allowing subnets to generate keys, sign messages, and verify state without trusted hardware.",
    category: "ICP",
    tags: ["Chain-Key", "World 7", "ICP", "Cryptography"],
    relatedTopics: ["Threshold ECDSA", "BLS Signatures", "Subnet", "NNS"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 1"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/chain-key",
    ],
    fullDescription:
      "Chain-Key Technology is the cryptographic foundation that makes ICP architecturally unique. It enables a single 48-byte public key to verify any response from any canister on the entire network, regardless of which subnet hosts it. The underlying primitives — threshold BLS signatures, non-interactive distributed key generation, and chain-evolution technology — allow subnets to be created, expanded, and upgraded continuously without halting the network. This is what allows ICP to scale horizontally without sacrificing decentralization.",
  },
  {
    term: "Threshold ECDSA",
    definition:
      "A multi-party protocol allowing a subnet of ICP nodes to collectively sign ECDSA messages without any single node ever holding the complete private key — enabling canisters to sign Bitcoin and Ethereum transactions.",
    category: "ICP",
    tags: ["Chain-Key", "World 7", "ECDSA", "Bitcoin", "ICP"],
    relatedTopics: ["Chain-Key Technology", "BLS Signatures", "Canister"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 2"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/developer-docs/multi-chain/bitcoin/overview",
    ],
    fullDescription:
      "Threshold ECDSA (tECDSA) is ICP's breakthrough that enables native multi-chain integration. A canister on ICP can request an ECDSA signature from a subnet; the nodes collectively perform a threshold signing protocol to produce a valid signature — as if a single private key signed it. No individual node ever sees the full key. This means ICP canisters can hold and control real Bitcoin and Ethereum addresses directly, without bridges or wrapped assets. It's the foundation of ICP's ckBTC and ckETH integrations.",
  },
  {
    term: "BLS Signatures",
    definition:
      "Boneh-Lynn-Shacham signatures — a pairing-based cryptographic scheme enabling efficient aggregation of multiple signatures into one, used by ICP for threshold signing across subnet node operators.",
    category: "ICP",
    tags: ["Chain-Key", "World 7", "Cryptography", "BLS"],
    relatedTopics: ["Chain-Key Technology", "Threshold ECDSA", "Subnet"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 3"],
    externalReferences: ["https://en.wikipedia.org/wiki/BLS_digital_signature"],
    fullDescription:
      "BLS signatures have a unique aggregation property: n individual signatures from n signers can be combined into a single compact signature verifiable against n public keys simultaneously. This makes them ideal for threshold signatures in distributed systems. ICP uses BLS threshold signatures for subnet certification — the combined signature from a subnet's node operators certifies the state of all canisters on that subnet. The result is a single 48-byte signature that any external party can verify using the network's master public key.",
  },
  {
    term: "Subnet",
    definition:
      "An independent blockchain running within the Internet Computer, operated by a set of node machines that replicate state and execute canisters using the Internet Computer Protocol.",
    category: "ICP",
    tags: ["ICP", "World 7", "Subnet", "Infrastructure"],
    relatedTopics: ["Canister", "Chain-Key Technology", "NNS"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 4"],
    externalReferences: [
      "https://wiki.internetcomputer.org/wiki/Subnet_blockchain",
    ],
    fullDescription:
      "Subnets are ICP's horizontal scaling mechanism. Each subnet is an independent replicated state machine, consisting of 13–40 node machines across different data centers and geographies. The NNS governs subnet creation, topology changes, and membership. From a developer perspective, canisters on different subnets interact via cross-subnet messages, while Chain-Key technology makes the entire network appear as a single entity. ICP has specialized subnets — application subnets, fiduciary subnets (for tECDSA), and the NNS subnet itself.",
  },
  {
    term: "vetKeys",
    definition:
      "Verifiably Encrypted Threshold Keys — an ICP protocol allowing canisters to derive and use decryption keys on behalf of users without the canister or any single node learning the plaintext.",
    category: "ICP",
    tags: ["Chain-Key", "World 7", "vetKeys", "Privacy"],
    relatedTopics: ["Chain-Key Technology", "Threshold ECDSA", "Privacy"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 5"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/developer-docs/integrations/vetkeys/",
    ],
    fullDescription:
      "vetKeys is a groundbreaking ICP protocol enabling identity-based encryption and threshold key derivation. A canister can request a decryption key derivation for a specific identity; the subnet produces a verifiably encrypted key that only the requesting user can decrypt — the canister itself never learns the plaintext key. This enables entirely new applications: end-to-end encrypted messaging with on-chain key management, time-lock encryption (content that decrypts only after a date), and private smart contract state. vetKeys are a uniquely ICP-native capability with no equivalent on other chains.",
  },
  {
    term: "Cycles",
    definition:
      "The computational resource unit on ICP used to pay for canister execution, storage, and network operations — derived from ICP tokens, they provide price-stable infrastructure costs for developers.",
    category: "ICP",
    tags: ["ICP", "World 7", "Cycles", "Economics"],
    relatedTopics: ["Canister", "Subnet", "Gas"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 6"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/developer-docs/gas-cost",
    ],
    fullDescription:
      "Cycles solve the gas price volatility problem endemic to Ethereum. ICP pegs cycles to XDR (a basket of currencies) rather than to ICP token price, so developers can predict infrastructure costs regardless of token market movements. One trillion cycles costs approximately 1 XDR (~$1.30). Canisters are pre-charged with cycles — a 'reverse gas' model where developers, not users, pay for computation. This enables web-speed user experiences without transaction fees, making ICP apps feel like normal web applications.",
  },
  {
    term: "NIDKG",
    definition:
      "Non-Interactive Distributed Key Generation — the protocol ICP uses to create threshold cryptographic keys among subnet nodes without requiring interactive communication rounds or a trusted dealer.",
    category: "ICP",
    tags: ["Chain-Key", "World 7", "ICP", "Cryptography"],
    relatedTopics: [
      "Chain-Key Technology",
      "Threshold ECDSA",
      "BLS Signatures",
    ],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 7"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/chain-key",
    ],
    fullDescription:
      "Traditional Distributed Key Generation (DKG) requires multiple rounds of communication between participants — impractical for a fast blockchain. NI-DKG allows each node to broadcast a single message (non-interactively) from which all nodes can reconstruct their key shares. This makes subnet initialization and resharing efficient even with many nodes. Key resharing allows the set of nodes holding a subnet's key shares to change (for planned subnet membership changes) without the key itself ever being exposed or reconstructed in one place.",
  },
  {
    term: "Chain-Key Signatures",
    definition:
      "Cryptographic signatures produced by ICP subnets using threshold protocols that certify the state of canisters, enabling external systems to verify ICP outputs without running a node.",
    category: "ICP",
    tags: ["Chain-Key", "World 7", "Signatures", "ICP"],
    relatedTopics: ["Chain-Key Technology", "BLS Signatures", "Subnet"],
    relatedLessons: ["World 7: Chain-Key Technology - Lesson 8"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/chain-key",
    ],
    fullDescription:
      "Chain-Key Signatures are the verification mechanism that makes ICP outputs trustworthy to external observers. When a subnet certifies state, it produces a threshold BLS signature using the subnet's collective private key share. An external party (another blockchain, a web browser, an enterprise system) can verify this signature against ICP's single master public key — a fixed 48-byte value published by DFINITY. This is conceptually similar to a TLS certificate but for blockchain state, and it's what makes ICP's trustless cross-chain messaging possible.",
  },
];

// ─── World 8: Coherence & AI ──────────────────────────────────────────────────
export const world8GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Coherence",
    definition:
      "The principle that intelligence — artificial or human — must remain logically consistent, transparent, and aligned with human values to be trustworthy and beneficial within complex systems.",
    category: "AI",
    tags: ["Coherence", "World 8", "AI", "Philosophy"],
    relatedTopics: [
      "AI Alignment",
      "Verifiable Intelligence",
      "Digital Sovereignty",
    ],
    relatedLessons: ["World 8: Coherence - Lesson 1"],
    externalReferences: ["https://internetcomputer.org/"],
    fullDescription:
      "Coherence in the context of World 8 means the capacity to maintain logical consistency, intellectual honesty, and human-value alignment across increasingly complex systems. As AI assumes more decision-making roles, coherence becomes the critical skill — not just for AI systems, but for the humans designing, auditing, and governing them. The Coherence Principle posits that technology should expand human awareness, not replace it. A coherent future is one where AI infrastructure remains verifiable, auditable, and aligned with human flourishing.",
  },
  {
    term: "AI Alignment",
    definition:
      "The challenge of ensuring that artificial intelligence systems pursue goals and take actions that are consistent with human intentions, values, and long-term wellbeing.",
    category: "AI",
    tags: ["AI Alignment", "World 8", "AI", "Safety"],
    relatedTopics: [
      "Coherence",
      "Verifiable Intelligence",
      "Autonomous Agents",
    ],
    relatedLessons: ["World 8: Coherence - Lesson 2"],
    externalReferences: ["https://openai.com/safety"],
    fullDescription:
      "AI alignment is one of the defining challenges of the 21st century. As models grow more capable, ensuring they optimize for human-intended objectives — rather than misaligned proxies — becomes critical. Alignment research spans technical work (RLHF, constitutional AI, interpretability) and governance (model audits, usage policies, international agreements). In the Web3 context, verifiable computation on infrastructure like ICP provides a new angle: AI logic executed on-chain is auditable and tamper-resistant, adding a technical layer to alignment guarantees.",
  },
  {
    term: "Verifiable Intelligence",
    definition:
      "AI systems whose computations, training data, and decision logic can be independently verified and audited, contrasting with black-box models whose reasoning is opaque and unaccountable.",
    category: "AI",
    tags: ["Verifiable Intelligence", "World 8", "AI", "Transparency"],
    relatedTopics: ["AI Alignment", "Coherence", "Chain-Key Technology"],
    relatedLessons: ["World 8: Coherence - Lesson 3"],
    externalReferences: ["https://internetcomputer.org/ai"],
    fullDescription:
      "Verifiable intelligence is the convergence of blockchain's trust model with AI's capability. On ICP, AI models can run as canisters — their weights, inference code, and execution can be verified by anyone. Threshold cryptography provides verifiable randomness for training; Chain-Key signatures certify inference outputs. This transforms AI from 'trust us' to 'verify it yourself' — a paradigm shift with implications for healthcare AI, financial models, autonomous vehicles, and democratic governance. The Internet Computer is uniquely positioned as the infrastructure for verifiable AI.",
  },
  {
    term: "Digital Sovereignty",
    definition:
      "The right and capacity of individuals, communities, and nations to control their digital data, infrastructure, and identity without depending on foreign corporations or governments.",
    category: "Sovereignty",
    tags: ["Digital Sovereignty", "World 8", "AI", "Privacy"],
    relatedTopics: ["Self-Custody", "Decentralization", "Coherence"],
    relatedLessons: ["World 8: Coherence - Lesson 4"],
    externalReferences: ["https://dfinity.org/"],
    fullDescription:
      "Digital sovereignty extends the concept of national sovereignty into the information age. At the individual level, it means controlling your own data and identity without dependence on Big Tech platforms. At the national level, it means running critical infrastructure on systems that cannot be shut down by foreign corporations or governments. ICP's decentralized node network, spanning global geographies and independent operators, is designed to guarantee digital sovereignty as a protocol property — not a terms-of-service promise.",
  },
  {
    term: "Autonomous Agent",
    definition:
      "A software entity capable of perceiving its environment, making decisions, and acting independently to achieve specified goals — in Web3, typically running on-chain as a canister that can initiate transactions without human input.",
    category: "AI",
    tags: ["Autonomous Agents", "World 8", "AI", "ICP"],
    relatedTopics: ["Verifiable Intelligence", "Canister", "AI Alignment"],
    relatedLessons: ["World 8: Coherence - Lesson 5"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/developer-docs/ai",
    ],
    fullDescription:
      "Autonomous agents represent the convergence of AI and blockchain. On traditional blockchains, smart contracts are reactive — they only run when called. On ICP, canisters can run persistent computation (heartbeats, timers) and make outbound HTTP calls, enabling truly autonomous agents that monitor markets, manage portfolios, coordinate DAOs, and interact with external APIs without human initiation. Combining agent autonomy with Chain-Key cryptography means agents can hold and move real assets on Bitcoin and Ethereum, raising profound questions about governance, accountability, and alignment.",
  },
  {
    term: "Protocol-Based AI",
    definition:
      "AI systems governed and operated through open, decentralized protocols rather than proprietary centralized services — enabling community oversight, transparent rules, and resistance to unilateral control.",
    category: "AI",
    tags: ["Protocol-Based AI", "World 8", "AI", "Decentralization"],
    relatedTopics: ["Verifiable Intelligence", "Coherence", "Decentralization"],
    relatedLessons: ["World 8: Coherence - Lesson 6"],
    externalReferences: ["https://internetcomputer.org/"],
    fullDescription:
      "Protocol-based AI inverts the current model where a handful of corporations control the most powerful AI systems. Instead, AI governance rules, model weights, training data provenance, and inference logic are encoded in open protocols governed by communities. The Internet Computer enables this: AI models run as canisters, governed by SNS DAOs, auditable by anyone, and upgradeable only through community governance. This is the technical architecture of Coherence — AI that is accountable by design, not by policy.",
  },
  {
    term: "Human Agency",
    definition:
      "The capacity of humans to make deliberate, informed choices and take meaningful actions that shape their environment — in AI contexts, the imperative that human decision-making retains primacy over automated systems.",
    category: "AI",
    tags: ["Human Agency", "World 8", "AI", "Philosophy"],
    relatedTopics: ["Coherence", "AI Alignment", "Digital Sovereignty"],
    relatedLessons: ["World 8: Coherence - Lesson 7"],
    externalReferences: ["https://dfinity.org/"],
    fullDescription:
      "Human agency is the core philosophical stake in the AI era. As automated systems increasingly handle decisions in finance, healthcare, legal, and civic domains, preserving meaningful human choice requires intentional design. Coherence argues that expanding AI capability must be accompanied by expanding human awareness — tools for understanding, auditing, and overriding AI decisions. Decentralized governance (DAOs, NNS) applied to AI systems is one model for maintaining collective human agency over the infrastructure that shapes collective human outcomes.",
  },
  {
    term: "Sovereign Infrastructure",
    definition:
      "Digital infrastructure — compute, storage, networking, identity — that operates under decentralized governance and cannot be unilaterally controlled, censored, or shut down by any single entity.",
    category: "Infrastructure",
    tags: ["Sovereign Infrastructure", "World 8", "ICP", "Decentralization"],
    relatedTopics: ["Digital Sovereignty", "Decentralization", "ICP"],
    relatedLessons: ["World 8: Coherence - Lesson 8"],
    externalReferences: ["https://internetcomputer.org/"],
    fullDescription:
      "Sovereign infrastructure is the foundation of digital sovereignty. The Internet Computer was designed from the ground up as sovereign infrastructure: node hardware is independently operated by certified providers globally; no single entity (including DFINITY) can alter or censor canisters without NNS governance; the protocol is open-source and governed by token holders. In contrast, cloud platforms (AWS, Azure, GCP) are sovereign infrastructure controlled by private corporations under national jurisdiction. ICP represents the first attempt to build public internet infrastructure that is permanently, verifiably decentralized.",
  },
];

// ─── Re-export all worlds ─────────────────────────────────────────────────────
export const world3to8GlossaryTermsEN: GlossaryTermData[] = [
  ...world3GlossaryTermsEN,
  ...world4GlossaryTermsEN,
  ...world5GlossaryTermsEN,
  ...world6GlossaryTermsEN,
  ...world7GlossaryTermsEN,
  ...world8GlossaryTermsEN,
];
