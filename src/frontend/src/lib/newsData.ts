export type NewsCategory = "Protocol" | "DeFi" | "dApps" | "Governance" | "AI";
export type NewsSource =
  | "dfinity-medium"
  | "internetcomputer-news"
  | "youtube-rd"
  | "icp-reddit";

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  externalUrl: string;
  source: NewsSource;
  category: NewsCategory;
  relatedLesson?: { title: string; path: string };
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n01",
    title: "DFINITY Unveils Next-Gen Chain-Key Cryptography Upgrades",
    excerpt:
      "The DFINITY Foundation has announced significant improvements to Chain-Key cryptography, enabling faster subnet recovery times and enhanced cross-chain interoperability across the Internet Computer ecosystem.",
    publishedAt: new Date("2026-03-10"),
    externalUrl: "https://medium.com/dfinity",
    source: "dfinity-medium",
    category: "Protocol",
  },
  {
    id: "n02",
    title: "ICP DeFi TVL Surpasses $500M Milestone as Ecosystem Matures",
    excerpt:
      "Total value locked across Internet Computer DeFi protocols has crossed the $500 million mark, driven by growth in native DEXs, lending protocols, and Bitcoin integration through ckBTC.",
    publishedAt: new Date("2026-03-08"),
    externalUrl: "https://internetcomputer.org/news",
    source: "internetcomputer-news",
    category: "DeFi",
    relatedLesson: { title: "DeFi Basics", path: "/courses" },
  },
  {
    id: "n03",
    title: "Verifiable AI on ICP: How On-Chain Models Are Changing Everything",
    excerpt:
      "A deep dive into how Internet Computer's on-chain AI capabilities enable fully verifiable machine learning inference, with zero reliance on centralized model providers or cloud APIs.",
    publishedAt: new Date("2026-03-07"),
    externalUrl: "https://www.youtube.com/c/DFINITY",
    source: "youtube-rd",
    category: "AI",
    relatedLesson: { title: "AI on ICP", path: "/courses" },
  },
  {
    id: "n04",
    title:
      "OpenChat Reaches 1 Million Registered Users on the Internet Computer",
    excerpt:
      "Decentralized messaging dApp OpenChat has surpassed one million registered users, cementing its position as one of the most widely adopted applications built entirely on-chain.",
    publishedAt: new Date("2026-03-05"),
    externalUrl: "https://reddit.com/r/dfinity",
    source: "icp-reddit",
    category: "dApps",
  },
  {
    id: "n05",
    title: "NNS Governance Proposal: Raising Neuron Dissolve Delay Rewards",
    excerpt:
      "A new Network Nervous System proposal seeks to increase voting rewards for neurons with long dissolve delays, encouraging deeper long-term participation in ICP governance decisions.",
    publishedAt: new Date("2026-03-03"),
    externalUrl: "https://internetcomputer.org/news",
    source: "internetcomputer-news",
    category: "Governance",
    relatedLesson: { title: "ICP Governance", path: "/courses" },
  },
  {
    id: "n06",
    title: "HTTP Outcalls 2.0: Canisters Can Now Stream Real-Time Data",
    excerpt:
      "DFINITY's latest protocol update brings streaming HTTP responses to canister smart contracts, enabling real-time data feeds, live market prices, and continuous API polling directly on-chain.",
    publishedAt: new Date("2026-03-01"),
    externalUrl: "https://medium.com/dfinity",
    source: "dfinity-medium",
    category: "Protocol",
  },
  {
    id: "n07",
    title: "ICPSwap Launches Multi-Hop Routing for Optimal DeFi Trades",
    excerpt:
      "ICPSwap's new multi-hop routing engine automatically splits trades across multiple liquidity pools, dramatically reducing slippage for large swaps in the Internet Computer DeFi ecosystem.",
    publishedAt: new Date("2026-02-27"),
    externalUrl: "https://reddit.com/r/dfinity",
    source: "icp-reddit",
    category: "DeFi",
  },
  {
    id: "n08",
    title:
      "DFINITY R&D: Threshold Schnorr Signatures Enable Bitcoin Taproot Support",
    excerpt:
      "The latest R&D video series explains how threshold Schnorr signatures expand ICP's Bitcoin integration to include Taproot addresses, opening up new possibilities for BTC-native dApps.",
    publishedAt: new Date("2026-02-25"),
    externalUrl: "https://www.youtube.com/c/DFINITY",
    source: "youtube-rd",
    category: "Protocol",
  },
  {
    id: "n09",
    title: "Decentralized AI Agents: Running Autonomous Bots on ICP Canisters",
    excerpt:
      "Builders are experimenting with fully autonomous AI agents hosted in ICP canisters, removing the need for centralized servers while maintaining verifiability and tamper-proof execution.",
    publishedAt: new Date("2026-02-22"),
    externalUrl: "https://medium.com/dfinity",
    source: "dfinity-medium",
    category: "AI",
  },
  {
    id: "n10",
    title: "SNS DAOs: How Communities Are Governing ICP dApps On-Chain",
    excerpt:
      "The Service Nervous System framework has enabled over 20 fully decentralized dApp DAOs, letting token holders vote on upgrades, treasury allocations, and protocol parameters without any central authority.",
    publishedAt: new Date("2026-02-20"),
    externalUrl: "https://internetcomputer.org/news",
    source: "internetcomputer-news",
    category: "Governance",
  },
  {
    id: "n11",
    title: "Sonic DEX Integrates ckETH for Seamless ETH Swaps on ICP",
    excerpt:
      "Sonic DEX now supports native swapping of ckETH, the chain-key wrapped Ethereum token on the Internet Computer, allowing users to trade ETH without bridges or custodial intermediaries.",
    publishedAt: new Date("2026-02-18"),
    externalUrl: "https://reddit.com/r/dfinity",
    source: "icp-reddit",
    category: "DeFi",
  },
  {
    id: "n12",
    title: "DSCVR Social Platform Rolls Out AI-Curated Content Feeds",
    excerpt:
      "On-chain social platform DSCVR has deployed an AI curation layer running entirely within ICP canisters, personalizing content discovery for users without exposing their data to external services.",
    publishedAt: new Date("2026-02-15"),
    externalUrl: "https://medium.com/dfinity",
    source: "dfinity-medium",
    category: "dApps",
  },
  {
    id: "n13",
    title: "Subnet Splitting: ICP Scales Horizontally to Handle Growing Demand",
    excerpt:
      "The Network Nervous System approved a proposal to split the highest-load subnet into two independent subnets, demonstrating ICP's horizontal scalability model in a live production environment.",
    publishedAt: new Date("2026-02-12"),
    externalUrl: "https://internetcomputer.org/news",
    source: "internetcomputer-news",
    category: "Protocol",
  },
  {
    id: "n14",
    title: "Building Trustless AI: On-Chain Inference with Verifiable Outputs",
    excerpt:
      "DFINITY's research team presents a framework for fully verifiable AI inference on the Internet Computer, where model weights, inputs, and outputs are all stored and audited on-chain.",
    publishedAt: new Date("2026-02-10"),
    externalUrl: "https://www.youtube.com/c/DFINITY",
    source: "youtube-rd",
    category: "AI",
  },
  {
    id: "n15",
    title:
      "ICP Governance: Voting Participation Hits All-Time High in February",
    excerpt:
      "NNS governance participation reached a record high last month, with over 68% of staked ICP neurons voting on proposals — reflecting growing community engagement in the network's future.",
    publishedAt: new Date("2026-02-08"),
    externalUrl: "https://reddit.com/r/dfinity",
    source: "icp-reddit",
    category: "Governance",
  },
  {
    id: "n16",
    title: "NFT Marketplace Yumi Integrates AI-Powered Provenance Verification",
    excerpt:
      "Yumi, ICP's leading NFT marketplace, has deployed an on-chain AI tool that automatically verifies artwork provenance and flags suspected plagiarism before assets are listed for sale.",
    publishedAt: new Date("2026-02-05"),
    externalUrl: "https://internetcomputer.org/news",
    source: "internetcomputer-news",
    category: "dApps",
  },
  {
    id: "n17",
    title:
      "ckBTC Lightning Integration Brings Sub-Second Bitcoin Finality to ICP",
    excerpt:
      "A new bridge proposal combines ckBTC with Lightning Network channels, enabling near-instant Bitcoin micropayments from within ICP smart contracts at negligible transaction costs.",
    publishedAt: new Date("2026-01-30"),
    externalUrl: "https://medium.com/dfinity",
    source: "dfinity-medium",
    category: "DeFi",
  },
  {
    id: "n18",
    title:
      "ICP's Reverse Gas Model Explained: Why Users Never Pay Transaction Fees",
    excerpt:
      "A comprehensive breakdown of how the Internet Computer's reverse gas model works — where smart contracts pre-pay for computation using cycles, removing all transaction fees from end users.",
    publishedAt: new Date("2026-01-25"),
    externalUrl: "https://www.youtube.com/c/DFINITY",
    source: "youtube-rd",
    category: "Protocol",
  },
];
