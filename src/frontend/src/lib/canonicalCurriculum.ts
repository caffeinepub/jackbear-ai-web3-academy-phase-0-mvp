// Canonical curriculum metadata for Worlds 1-7 (lessons 1-70)
// Source of truth for lesson titles, descriptions, and world assignments
// Implementation status is now dynamically computed from lessonContent.ts

import { allLessonsEN } from "./lessonContent";

export interface CanonicalLessonMeta {
  id: number;
  title: string;
  description: string;
  world: number;
  implemented: boolean;
}

// Helper to check if a lesson ID exists in lessonContent.ts
function isLessonContentAvailable(id: number): boolean {
  // Compare as strings only — never coerce lesson IDs through Number()
  // World 0 uses canonical string IDs ("0.00"-"0.90") which are not numeric
  return allLessonsEN.some((lesson) => String(lesson.id) === String(id));
}

// World 1: Sovereign Basics - Lessons 1-10
export const WORLD_1_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 1,
    title: "Introduction to Sovereignty",
    description:
      "Learn the fundamentals of digital sovereignty and self-custody",
    world: 1,
    implemented: isLessonContentAvailable(1),
  },
  {
    id: 2,
    title: "Understanding Private Keys",
    description: "Master the concept of private keys and secure storage",
    world: 1,
    implemented: isLessonContentAvailable(2),
  },
  {
    id: 3,
    title: "Decentralization Principles",
    description: "Explore the core principles of decentralized systems",
    world: 1,
    implemented: isLessonContentAvailable(3),
  },
  {
    id: 4,
    title: "Wallet Management",
    description: "Learn to manage digital wallets securely",
    world: 1,
    implemented: isLessonContentAvailable(4),
  },
  {
    id: 5,
    title: "Blockchain Fundamentals",
    description: "Understand how blockchain technology works",
    world: 1,
    implemented: isLessonContentAvailable(5),
  },
  {
    id: 6,
    title: "Tokens and Digital Assets",
    description: "Explore the world of digital tokens",
    world: 1,
    implemented: isLessonContentAvailable(6),
  },
  {
    id: 7,
    title: "Digital Identity",
    description: "Master self-sovereign identity concepts",
    world: 1,
    implemented: isLessonContentAvailable(7),
  },
  {
    id: 8,
    title: "Privacy and Consent",
    description: "Learn about data privacy in Web3",
    world: 1,
    implemented: isLessonContentAvailable(8),
  },
  {
    id: 9,
    title: "Custodial vs Non-Custodial",
    description: "Compare custody models and their trade-offs",
    world: 1,
    implemented: isLessonContentAvailable(9),
  },
  {
    id: 10,
    title: "Mega Quiz: World 1 Mastery",
    description: "Test your knowledge across all World 1 lessons",
    world: 1,
    implemented: isLessonContentAvailable(10),
  },
];

// World 2: Internet Computer Fundamentals - Lessons 11-20
export const WORLD_2_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 11,
    title: "Internet Computer Protocol Basics",
    description: "Understand ICP architecture and core concepts",
    world: 2,
    implemented: isLessonContentAvailable(11),
  },
  {
    id: 12,
    title: "Canister Development Introduction",
    description: "Learn smart contract development on ICP",
    world: 2,
    implemented: isLessonContentAvailable(12),
  },
  {
    id: 13,
    title: "ICP Ecosystem and Applications",
    description: "Explore real-world ICP applications and use cases",
    world: 2,
    implemented: isLessonContentAvailable(13),
  },
  {
    id: 14,
    title: "Advanced Canister Patterns",
    description: "Master complex canister architectures and design patterns",
    world: 2,
    implemented: isLessonContentAvailable(14),
  },
  {
    id: 15,
    title: "Chain Key Cryptography",
    description: "Understand ICP's revolutionary cryptographic protocols",
    world: 2,
    implemented: isLessonContentAvailable(15),
  },
  {
    id: 16,
    title: "Cycles and Resource Management",
    description: "Master ICP's computation and storage economics",
    world: 2,
    implemented: isLessonContentAvailable(16),
  },
  {
    id: 17,
    title: "Motoko Programming Language",
    description: "Learn ICP's native smart contract language",
    world: 2,
    implemented: isLessonContentAvailable(17),
  },
  {
    id: 18,
    title: "ICP Governance and NNS",
    description: "Participate in network governance and staking",
    world: 2,
    implemented: isLessonContentAvailable(18),
  },
  {
    id: 19,
    title: "Cross-Chain Integration",
    description: "Learn Bitcoin and Ethereum integration on ICP",
    world: 2,
    implemented: isLessonContentAvailable(19),
  },
  {
    id: 20,
    title: "Building on ICP",
    description: "Deploy your first decentralized application",
    world: 2,
    implemented: isLessonContentAvailable(20),
  },
];

// World 3: AI Integration - Lessons 21-30
export const WORLD_3_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 21,
    title: "AI and Blockchain Convergence",
    description: "Discover how AI and blockchain work together",
    world: 3,
    implemented: isLessonContentAvailable(21),
  },
  {
    id: 22,
    title: "Decentralized AI Models",
    description: "Learn about distributed machine learning",
    world: 3,
    implemented: isLessonContentAvailable(22),
  },
  {
    id: 23,
    title: "AI-Powered Smart Contracts",
    description: "Build intelligent autonomous agents",
    world: 3,
    implemented: isLessonContentAvailable(23),
  },
  {
    id: 24,
    title: "Data Privacy in AI",
    description: "Protect user data in AI applications",
    world: 3,
    implemented: isLessonContentAvailable(24),
  },
  {
    id: 25,
    title: "AI Oracles and Data Feeds",
    description: "Connect AI models to blockchain systems",
    world: 3,
    implemented: isLessonContentAvailable(25),
  },
  {
    id: 26,
    title: "Tokenized AI Services",
    description: "Monetize AI models with blockchain",
    world: 3,
    implemented: isLessonContentAvailable(26),
  },
  {
    id: 27,
    title: "AI Governance and Ethics",
    description: "Ensure responsible AI development",
    world: 3,
    implemented: isLessonContentAvailable(27),
  },
  {
    id: 28,
    title: "Federated Learning on Chain",
    description: "Train models without centralizing data",
    world: 3,
    implemented: isLessonContentAvailable(28),
  },
  {
    id: 29,
    title: "AI-Enhanced DeFi",
    description: "Build intelligent financial protocols",
    world: 3,
    implemented: isLessonContentAvailable(29),
  },
  {
    id: 30,
    title: "Future of AI and Web3",
    description: "Explore emerging trends and opportunities",
    world: 3,
    implemented: isLessonContentAvailable(30),
  },
];

// World 4: DeFi Mastery - Lessons 31-40
export const WORLD_4_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 31,
    title: "DeFi Fundamentals",
    description: "Understand decentralized finance principles",
    world: 4,
    implemented: isLessonContentAvailable(31),
  },
  {
    id: 32,
    title: "Automated Market Makers",
    description: "Learn how AMMs power decentralized exchanges",
    world: 4,
    implemented: isLessonContentAvailable(32),
  },
  {
    id: 33,
    title: "Liquidity Pools and Yield Farming",
    description: "Master liquidity provision strategies",
    world: 4,
    implemented: isLessonContentAvailable(33),
  },
  {
    id: 34,
    title: "Lending and Borrowing Protocols",
    description: "Build decentralized credit markets",
    world: 4,
    implemented: isLessonContentAvailable(34),
  },
  {
    id: 35,
    title: "Stablecoins and Pegged Assets",
    description: "Understand algorithmic and collateralized stablecoins",
    world: 4,
    implemented: isLessonContentAvailable(35),
  },
  {
    id: 36,
    title: "Derivatives and Synthetic Assets",
    description: "Create on-chain financial instruments",
    world: 4,
    implemented: isLessonContentAvailable(36),
  },
  {
    id: 37,
    title: "Flash Loans and Arbitrage",
    description: "Explore advanced DeFi strategies",
    world: 4,
    implemented: isLessonContentAvailable(37),
  },
  {
    id: 38,
    title: "DeFi Security and Auditing",
    description: "Protect protocols from exploits",
    world: 4,
    implemented: isLessonContentAvailable(38),
  },
  {
    id: 39,
    title: "Cross-Chain DeFi",
    description: "Build multi-chain financial applications",
    world: 4,
    implemented: isLessonContentAvailable(39),
  },
  {
    id: 40,
    title: "DeFi Governance and DAOs",
    description: "Participate in protocol governance",
    world: 4,
    implemented: isLessonContentAvailable(40),
  },
];

// World 5: Advanced Development - Lessons 41-50
export const WORLD_5_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 41,
    title: "Advanced Smart Contract Patterns",
    description: "Master complex contract architectures",
    world: 5,
    implemented: isLessonContentAvailable(41),
  },
  {
    id: 42,
    title: "Gas Optimization Techniques",
    description: "Build efficient and cost-effective contracts",
    world: 5,
    implemented: isLessonContentAvailable(42),
  },
  {
    id: 43,
    title: "Upgradeable Contract Design",
    description: "Create maintainable smart contracts",
    world: 5,
    implemented: isLessonContentAvailable(43),
  },
  {
    id: 44,
    title: "Security Best Practices",
    description: "Prevent common vulnerabilities and exploits",
    world: 5,
    implemented: isLessonContentAvailable(44),
  },
  {
    id: 45,
    title: "Testing and Formal Verification",
    description: "Ensure contract correctness and safety",
    world: 5,
    implemented: isLessonContentAvailable(45),
  },
  {
    id: 46,
    title: "Frontend Integration",
    description: "Build user interfaces for dApps",
    world: 5,
    implemented: isLessonContentAvailable(46),
  },
  {
    id: 47,
    title: "Indexing and Querying",
    description: "Efficiently access blockchain data",
    world: 5,
    implemented: isLessonContentAvailable(47),
  },
  {
    id: 48,
    title: "Oracles and External Data",
    description: "Connect smart contracts to real-world information",
    world: 5,
    implemented: isLessonContentAvailable(48),
  },
  {
    id: 49,
    title: "Multi-Signature and Access Control",
    description: "Implement secure permission systems",
    world: 5,
    implemented: isLessonContentAvailable(49),
  },
  {
    id: 50,
    title: "Production Deployment",
    description: "Launch and maintain dApps in production",
    world: 5,
    implemented: isLessonContentAvailable(50),
  },
];

// World 6: Ecosystem Leadership - Lessons 51-60
export const WORLD_6_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 51,
    title: "Building Web3 Communities",
    description: "Grow and engage decentralized communities",
    world: 6,
    implemented: isLessonContentAvailable(51),
  },
  {
    id: 52,
    title: "Tokenomics Design",
    description: "Create sustainable token economies",
    world: 6,
    implemented: isLessonContentAvailable(52),
  },
  {
    id: 53,
    title: "DAO Formation and Governance",
    description: "Launch and manage decentralized organizations",
    world: 6,
    implemented: isLessonContentAvailable(53),
  },
  {
    id: 54,
    title: "Fundraising and Token Sales",
    description: "Raise capital for Web3 projects",
    world: 6,
    implemented: isLessonContentAvailable(54),
  },
  {
    id: 55,
    title: "Marketing and Growth",
    description: "Scale Web3 projects and communities",
    world: 6,
    implemented: isLessonContentAvailable(55),
  },
  {
    id: 56,
    title: "Partnerships and Collaboration",
    description: "Build strategic alliances in Web3",
    world: 6,
    implemented: isLessonContentAvailable(56),
  },
  {
    id: 57,
    title: "Legal and Regulatory Compliance",
    description: "Navigate Web3 legal frameworks",
    world: 6,
    implemented: isLessonContentAvailable(57),
  },
  {
    id: 58,
    title: "Sustainability and Impact",
    description: "Build environmentally and socially responsible projects",
    world: 6,
    implemented: isLessonContentAvailable(58),
  },
  {
    id: 59,
    title: "Thought Leadership",
    description: "Become a voice in the Web3 ecosystem",
    world: 6,
    implemented: isLessonContentAvailable(59),
  },
  {
    id: 60,
    title: "Building the Future",
    description: "Shape the next generation of Web3",
    world: 6,
    implemented: isLessonContentAvailable(60),
  },
];

// World 7: Chain-Key Technology — Bonus Frontier Lessons 61-70
export const WORLD_7_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 61,
    title: "Chain-Key Cryptography Foundations",
    description:
      "Master the cryptographic innovations that power the Internet Computer",
    world: 7,
    implemented: isLessonContentAvailable(61),
  },
  {
    id: 62,
    title: "Subnet Signatures and Network Topology",
    description:
      "Understand how ICP subnets sign messages and maintain security",
    world: 7,
    implemented: isLessonContentAvailable(62),
  },
  {
    id: 63,
    title: "Chain-Key Evolution and Key Rotation",
    description:
      "Explore how ICP manages cryptographic key lifecycle and evolution",
    world: 7,
    implemented: isLessonContentAvailable(63),
  },
  {
    id: 64,
    title: "ckBTC: Chain-Key Bitcoin",
    description:
      "Discover how ICP natively integrates with Bitcoin without bridges",
    world: 7,
    implemented: isLessonContentAvailable(64),
  },
  {
    id: 65,
    title: "ckETH and Chain-Key Tokens",
    description:
      "Explore the chain-key token framework and Ethereum integration",
    world: 7,
    implemented: isLessonContentAvailable(65),
  },
  {
    id: 66,
    title: "vetKeys: Verifiable Encrypted Threshold Keys",
    description:
      "Discover ICP's breakthrough in on-chain encryption and privacy",
    world: 7,
    implemented: isLessonContentAvailable(66),
  },
  {
    id: 67,
    title: "HTTPS Outcalls and Secure Randomness",
    description:
      "Learn how ICP canisters interact with the web and generate verifiable randomness",
    world: 7,
    implemented: isLessonContentAvailable(67),
  },
  {
    id: 68,
    title: "Threshold ECDSA and Cross-Chain Signing",
    description:
      "Master how ICP canisters sign transactions on other blockchains",
    world: 7,
    implemented: isLessonContentAvailable(68),
  },
  {
    id: 69,
    title: "Internet Computer Consensus Protocol",
    description: "Deep dive into ICP's unique consensus mechanism",
    world: 7,
    implemented: isLessonContentAvailable(69),
  },
  {
    id: 70,
    title: "The Future of Chain-Key Technology",
    description:
      "Explore the roadmap and frontier innovations of ICP's cryptographic stack",
    world: 7,
    implemented: isLessonContentAvailable(70),
  },
];

// Export all canonical lessons

export const WORLD_8_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  {
    id: 71,
    title: "Humanity's New Threshold",
    description:
      "Exploring the moment humanity began sharing the world with intelligence it created",
    world: 8,
    implemented: isLessonContentAvailable(71),
  },
  {
    id: 72,
    title: "What Is Coherence?",
    description:
      "Defining the central concept of human coherence in the AI era",
    world: 8,
    implemented: isLessonContentAvailable(72),
  },
  {
    id: 73,
    title: "Artificial Intelligence vs Verifiable Intelligence",
    description:
      "Understanding the difference between black-box AI and transparent, verifiable systems",
    world: 8,
    implemented: isLessonContentAvailable(73),
  },
  {
    id: 74,
    title: "The Internet Is Becoming Autonomous",
    description:
      "Exploring the shift from static websites to autonomous networks",
    world: 8,
    implemented: isLessonContentAvailable(74),
  },
  {
    id: 75,
    title: "Data Is Identity",
    description:
      "Examining how data shapes digital identity and personal power",
    world: 8,
    implemented: isLessonContentAvailable(75),
  },
  {
    id: 76,
    title: "Platforms vs Protocols",
    description:
      "Understanding the difference between centralized systems and decentralized infrastructure",
    world: 8,
    implemented: isLessonContentAvailable(76),
  },
  {
    id: 77,
    title: "AI and Human Agency",
    description: "Exploring how humans maintain control over powerful systems",
    world: 8,
    implemented: isLessonContentAvailable(77),
  },
  {
    id: 78,
    title: "The Ethics of Intelligence",
    description:
      "Exploring ethical responsibility when building intelligent systems",
    world: 8,
    implemented: isLessonContentAvailable(78),
  },
  {
    id: 79,
    title: "Designing a Coherent Future",
    description:
      "How humanity can intentionally design systems that empower people",
    world: 8,
    implemented: isLessonContentAvailable(79),
  },
  {
    id: 80,
    title: "The Coherence Principle",
    description:
      "The final synthesis: human coherence will determine the future",
    world: 8,
    implemented: isLessonContentAvailable(80),
  },
];
export const ALL_CANONICAL_LESSONS: CanonicalLessonMeta[] = [
  ...WORLD_1_CANONICAL_LESSONS,
  ...WORLD_2_CANONICAL_LESSONS,
  ...WORLD_3_CANONICAL_LESSONS,
  ...WORLD_4_CANONICAL_LESSONS,
  ...WORLD_5_CANONICAL_LESSONS,
  ...WORLD_6_CANONICAL_LESSONS,
  ...WORLD_7_CANONICAL_LESSONS,
  ...WORLD_8_CANONICAL_LESSONS,
];
