// World 7: Chain-Key Technology — Bonus Frontier Lessons 61-70
// Advanced Chain-Key cryptography, threshold signatures, vetKeys, ckBTC/ckETH, and ICP cryptographic innovations

import type { LessonContent } from "../lessonContent";

export const world7LessonsEN: LessonContent[] = [
  {
    id: 61,
    title: "Chain-Key Cryptography Foundations",
    description:
      "Master the cryptographic innovations that power the Internet Computer",
    duration: "30 min",
    objectives: [
      "Understand what Chain-Key Cryptography is",
      "Learn how it differs from traditional blockchain cryptography",
      "Discover the role of threshold BLS signatures",
      "Explore why Chain-Key enables ICP's unique capabilities",
    ],
    content: {
      introduction:
        "Chain-Key Cryptography is the revolutionary cryptographic framework that makes the Internet Computer possible. It enables the entire network to operate under a single public key, allowing any device to verify ICP computations instantly.",
      sections: [
        {
          title: "What is Chain-Key Cryptography?",
          content:
            "Chain-Key Cryptography is a suite of advanced cryptographic protocols developed by DFINITY that allows the Internet Computer to function as a unified, verifiable computing platform. At its core, the entire ICP network is controlled by a single public key — a feat made possible by threshold cryptography distributed across hundreds of nodes.",
        },
        {
          title: "Threshold BLS Signatures",
          content:
            "The foundation of Chain-Key is the threshold BLS (Boneh-Lynn-Shacham) signature scheme. Instead of one party holding a private key, the key is split into shares distributed across subnet nodes. A threshold number of nodes (e.g., 2/3) must cooperate to produce a valid signature, meaning no single node can forge signatures or compromise the network.",
        },
        {
          title: "The Single Public Key Advantage",
          content:
            "Because the entire ICP network operates under one public key, any client — even a smartphone — can verify the authenticity of any response from any canister without downloading the full blockchain. This is fundamentally different from Bitcoin or Ethereum, where verification requires significant computation or trust in third parties.",
        },
        {
          title: "Chain-Key vs Traditional Blockchain Cryptography",
          content:
            "Traditional blockchains use simple ECDSA or EdDSA signatures where each node signs independently. ICP's Chain-Key uses distributed key generation (DKG) and threshold signing, enabling subnet-level signatures that represent collective agreement. This enables features impossible on other chains: subnet rotation, canister upgrades, and cross-subnet communication with cryptographic guarantees.",
        },
      ],
      conclusion:
        "Chain-Key Cryptography is the bedrock of ICP's security and scalability. Understanding it unlocks a deeper appreciation of why the Internet Computer can do things no other blockchain can.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "What is the key advantage of ICP operating under a single public key?",
          options: [
            "It makes transactions faster",
            "Any device can verify ICP computations without downloading the full blockchain",
            "It reduces transaction fees",
            "It allows more tokens to be created",
          ],
          correctAnswer: 1,
          explanation:
            "A single public key means any client, even a smartphone, can verify the authenticity of any canister response without needing the full blockchain state.",
        },
        {
          id: "q2",
          question:
            "What signature scheme is at the foundation of Chain-Key Cryptography?",
          options: ["ECDSA", "RSA", "Threshold BLS signatures", "EdDSA"],
          correctAnswer: 2,
          explanation:
            "Threshold BLS (Boneh-Lynn-Shacham) signatures allow a group of nodes to collectively sign without any single node holding the full private key.",
        },
        {
          id: "q3",
          question:
            "In a threshold signature scheme, what is required to produce a valid signature?",
          options: [
            "All nodes must sign",
            "Only one node needs to sign",
            "A threshold number of nodes (e.g., 2/3) must cooperate",
            "A central authority must approve",
          ],
          correctAnswer: 2,
          explanation:
            "A threshold number of nodes must cooperate to produce a valid signature, ensuring no single node can compromise the network.",
        },
        {
          id: "q4",
          question: "What does Distributed Key Generation (DKG) enable?",
          options: [
            "Faster token transfers",
            "Subnet-level signatures representing collective agreement without any single party holding the full key",
            "Lower gas fees",
            "Larger block sizes",
          ],
          correctAnswer: 1,
          explanation:
            "DKG allows key shares to be generated and distributed across nodes so no single party ever holds the complete private key, enabling secure collective signing.",
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
  {
    id: 62,
    title: "Subnet Signatures and Network Topology",
    description:
      "Understand how ICP subnets sign messages and maintain security",
    duration: "28 min",
    objectives: [
      "Learn how subnet signatures work",
      "Understand subnet topology and node distribution",
      "Discover how subnets achieve Byzantine fault tolerance",
      "Explore subnet rotation and key resharing",
    ],
    content: {
      introduction:
        "ICP is organized into subnets — groups of nodes that collectively run canisters and produce subnet signatures. Understanding subnet architecture is key to understanding ICP's security model.",
      sections: [
        {
          title: "Subnet Architecture",
          content:
            "A subnet is a collection of nodes (typically 13-40) that collectively run a set of canisters. Each subnet maintains its own replicated state and produces blocks via the Internet Computer Consensus (ICC) protocol. Subnets are geographically distributed across independent data centers to maximize fault tolerance.",
        },
        {
          title: "How Subnet Signatures Work",
          content:
            "Each subnet has its own threshold key derived from the network's master key. When a subnet needs to certify its state or sign a response, nodes cooperate using their key shares to produce a subnet signature. This signature can be verified by anyone using the subnet's public key, which is itself certified by the NNS (Network Nervous System).",
        },
        {
          title: "Byzantine Fault Tolerance",
          content:
            "Subnets are designed to tolerate Byzantine faults — nodes that behave maliciously or incorrectly. With a 2/3 threshold, up to 1/3 of nodes can fail or act maliciously without compromising the subnet. This is the theoretical maximum for Byzantine fault tolerance in asynchronous networks, as proven by the CAP theorem.",
        },
        {
          title: "Subnet Rotation and Key Resharing",
          content:
            'One of ICP\'s unique capabilities is proactive security through subnet rotation. Nodes can be added or removed from subnets, and the threshold key is reshared to the new set of nodes without ever reconstructing the full private key. This "proactive secret sharing" means even if an attacker compromises nodes over time, they can never accumulate enough shares to forge signatures.',
        },
      ],
      conclusion:
        "Subnet signatures are the mechanism by which ICP achieves verifiable, decentralized computation at scale. The combination of threshold cryptography and proactive security makes ICP uniquely resilient.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is an ICP subnet?",
          options: [
            "A type of token",
            "A collection of nodes that collectively run canisters and produce signatures",
            "A smart contract",
            "A wallet type",
          ],
          correctAnswer: 1,
          explanation:
            "A subnet is a group of nodes (typically 13-40) that collectively run canisters, maintain replicated state, and produce subnet signatures.",
        },
        {
          id: "q2",
          question:
            "What fraction of nodes can fail in a subnet without compromising security?",
          options: [
            "Up to 1/2",
            "Up to 1/4",
            "Up to 1/3",
            "None — all nodes must be honest",
          ],
          correctAnswer: 2,
          explanation:
            "With a 2/3 threshold, up to 1/3 of nodes can fail or act maliciously without compromising the subnet — the theoretical maximum for Byzantine fault tolerance.",
        },
        {
          id: "q3",
          question: "What is proactive secret sharing?",
          options: [
            "Sharing your private key with friends",
            "Resharing threshold key shares to new nodes without reconstructing the full private key",
            "Publishing your public key",
            "A type of token distribution",
          ],
          correctAnswer: 1,
          explanation:
            "Proactive secret sharing reshares key shares to new node sets without ever reconstructing the full private key, preventing attackers from accumulating shares over time.",
        },
        {
          id: "q4",
          question: "Who certifies a subnet's public key?",
          options: [
            "The subnet itself",
            "Individual nodes",
            "The NNS (Network Nervous System)",
            "External auditors",
          ],
          correctAnswer: 2,
          explanation:
            "The NNS (Network Nervous System) certifies subnet public keys, creating a chain of trust from the NNS root key down to individual subnets.",
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
  {
    id: 63,
    title: "Chain-Key Evolution and Key Rotation",
    description:
      "Explore how ICP manages cryptographic key lifecycle and evolution",
    duration: "25 min",
    objectives: [
      "Understand the ICP key hierarchy",
      "Learn how keys are rotated and updated",
      "Discover the role of the NNS in key management",
      "Explore forward secrecy in ICP's design",
    ],
    content: {
      introduction:
        "Cryptographic keys don't last forever. ICP's Chain-Key system includes sophisticated mechanisms for key rotation, evolution, and lifecycle management that ensure long-term security without disrupting the network.",
      sections: [
        {
          title: "The ICP Key Hierarchy",
          content:
            "ICP has a hierarchical key structure. At the top is the NNS root key, which certifies subnet keys. Subnet keys certify canister keys and state. This hierarchy means that verifying any piece of ICP data ultimately traces back to the NNS root key — a single, auditable trust anchor for the entire network.",
        },
        {
          title: "Key Rotation Mechanisms",
          content:
            "ICP rotates signing keys regularly to limit the window of exposure if any key material is compromised. Key rotation happens through the NNS governance process. New keys are generated via DKG, certified by the NNS, and old keys are retired. This process is transparent and verifiable on-chain.",
        },
        {
          title: "Forward Secrecy",
          content:
            "Forward secrecy ensures that compromising current keys doesn't expose past communications. ICP achieves this through regular key rotation combined with proactive secret sharing. Even if an attacker eventually compromises enough nodes to reconstruct a past key, the damage is limited to the period that key was active.",
        },
        {
          title: "Canister Signing Keys",
          content:
            "Individual canisters can also have their own signing keys derived from the subnet's threshold key. This enables canisters to sign messages, authenticate to external services, and participate in cross-chain protocols. Canister keys are deterministically derived, meaning a canister always has the same key as long as it exists on the same subnet.",
        },
      ],
      conclusion:
        "Key lifecycle management is a critical but often overlooked aspect of cryptographic security. ICP's sophisticated key rotation and hierarchy ensure long-term security without sacrificing usability.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is at the top of ICP's key hierarchy?",
          options: [
            "Individual canister keys",
            "Subnet keys",
            "The NNS root key",
            "User wallet keys",
          ],
          correctAnswer: 2,
          explanation:
            "The NNS root key is at the top of ICP's key hierarchy, certifying all subnet keys and serving as the ultimate trust anchor for the network.",
        },
        {
          id: "q2",
          question: "What does forward secrecy protect against?",
          options: [
            "Future attacks",
            "Compromising current keys exposing past communications",
            "Slow transactions",
            "High fees",
          ],
          correctAnswer: 1,
          explanation:
            "Forward secrecy ensures that even if current keys are compromised, past communications remain secure because different keys were used.",
        },
        {
          id: "q3",
          question: "How are canister signing keys derived?",
          options: [
            "Randomly generated for each transaction",
            "Provided by users",
            "Deterministically derived from the subnet's threshold key",
            "Assigned by the NNS",
          ],
          correctAnswer: 2,
          explanation:
            "Canister keys are deterministically derived from the subnet's threshold key, meaning a canister always has the same key as long as it exists on the same subnet.",
        },
        {
          id: "q4",
          question: "How does ICP rotate keys?",
          options: [
            "Automatically every block",
            "Through the NNS governance process with new DKG and NNS certification",
            "Manually by node operators",
            "Keys are never rotated",
          ],
          correctAnswer: 1,
          explanation:
            "Key rotation happens through the NNS governance process: new keys are generated via DKG, certified by the NNS, and old keys are retired transparently on-chain.",
        },
      ],
    },
    xpReward: 140,
    creditsReward: 18,
  },
  {
    id: 64,
    title: "ckBTC: Chain-Key Bitcoin",
    description:
      "Discover how ICP natively integrates with Bitcoin without bridges",
    duration: "30 min",
    objectives: [
      "Understand how ckBTC works",
      "Learn the difference between ckBTC and wrapped Bitcoin",
      "Discover the security model of chain-key tokens",
      "Explore use cases for ckBTC in DeFi",
    ],
    content: {
      introduction:
        "ckBTC (Chain-Key Bitcoin) is a native ICP token backed 1:1 by real Bitcoin, but without the risks of traditional bridges. It represents one of the most significant innovations in cross-chain interoperability.",
      sections: [
        {
          title: "What is ckBTC?",
          content:
            "ckBTC is an ICRC-1 token on ICP that is backed 1:1 by real Bitcoin held in a canister-controlled Bitcoin address. Unlike wrapped tokens on other chains, ckBTC doesn't rely on a multisig bridge or trusted custodian. Instead, it uses ICP's native Bitcoin integration and threshold ECDSA to control Bitcoin addresses directly.",
        },
        {
          title: "How ckBTC Differs from Wrapped Bitcoin",
          content:
            "Wrapped Bitcoin (WBTC) on Ethereum requires trusting a centralized custodian (BitGo) to hold the underlying BTC. ckBTC eliminates this trust requirement: the Bitcoin is held by a canister using threshold ECDSA, meaning no single entity controls it. The minting and burning process is fully on-chain and verifiable.",
        },
        {
          title: "The ckBTC Minting Process",
          content:
            "To mint ckBTC: send BTC to a unique deposit address generated by the ckBTC minter canister. The minter monitors the Bitcoin network, detects the deposit, and mints an equivalent amount of ckBTC to your ICP address. To redeem: burn ckBTC and the minter sends BTC to your specified Bitcoin address using threshold ECDSA to sign the Bitcoin transaction.",
        },
        {
          title: "ckBTC in DeFi",
          content:
            "ckBTC enables Bitcoin to participate in ICP's DeFi ecosystem. It can be used in DEXes, lending protocols, and yield strategies — all with ICP's fast finality (1-2 seconds) and low fees (fractions of a cent). This unlocks Bitcoin's $1T+ liquidity for DeFi without the security risks of traditional bridges.",
        },
      ],
      conclusion:
        "ckBTC demonstrates the power of Chain-Key Cryptography applied to real-world assets. It brings Bitcoin into the DeFi world without compromising on security or decentralization.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What backs ckBTC?",
          options: [
            "ICP tokens",
            "Real Bitcoin held in a canister-controlled address using threshold ECDSA",
            "A centralized custodian",
            "Algorithmic collateral",
          ],
          correctAnswer: 1,
          explanation:
            "ckBTC is backed 1:1 by real Bitcoin held in addresses controlled by a canister using threshold ECDSA — no centralized custodian required.",
        },
        {
          id: "q2",
          question: "What is the main security advantage of ckBTC over WBTC?",
          options: [
            "ckBTC is faster",
            "ckBTC eliminates the need for a trusted centralized custodian",
            "ckBTC has lower fees",
            "ckBTC is older",
          ],
          correctAnswer: 1,
          explanation:
            "Unlike WBTC which requires trusting BitGo as custodian, ckBTC uses threshold ECDSA so no single entity controls the underlying Bitcoin.",
        },
        {
          id: "q3",
          question: "How do you mint ckBTC?",
          options: [
            "Buy it on an exchange",
            "Send BTC to a deposit address generated by the ckBTC minter canister",
            "Stake ICP tokens",
            "Complete a KYC process",
          ],
          correctAnswer: 1,
          explanation:
            "You mint ckBTC by sending BTC to a unique deposit address generated by the ckBTC minter canister, which then mints equivalent ckBTC to your ICP address.",
        },
        {
          id: "q4",
          question: "What advantage does ckBTC bring to Bitcoin DeFi?",
          options: [
            "Higher Bitcoin prices",
            "Fast finality (1-2 seconds) and low fees while maintaining Bitcoin's security",
            "More Bitcoin supply",
            "Centralized control",
          ],
          correctAnswer: 1,
          explanation:
            "ckBTC enables Bitcoin to participate in DeFi with ICP's fast finality and low fees, unlocking Bitcoin's massive liquidity without bridge security risks.",
        },
      ],
    },
    xpReward: 160,
    creditsReward: 22,
  },
  {
    id: 65,
    title: "ckETH and Chain-Key Tokens",
    description:
      "Explore the chain-key token framework and Ethereum integration",
    duration: "28 min",
    objectives: [
      "Understand ckETH and how it works",
      "Learn the chain-key token standard",
      "Discover the EVM RPC canister",
      "Explore the future of chain-key tokens",
    ],
    content: {
      introduction:
        "Building on the success of ckBTC, ICP has extended chain-key technology to Ethereum with ckETH and a growing family of chain-key ERC-20 tokens. This creates a trustless bridge between ICP and the Ethereum ecosystem.",
      sections: [
        {
          title: "ckETH: Chain-Key Ethereum",
          content:
            "ckETH is the Ethereum equivalent of ckBTC — a native ICP token backed 1:1 by real ETH, controlled by a canister using threshold ECDSA. Like ckBTC, it eliminates bridge risks. ckETH enables Ethereum's liquidity to flow into ICP's DeFi ecosystem with fast finality and minimal fees.",
        },
        {
          title: "Chain-Key ERC-20 Tokens",
          content:
            "The chain-key token framework extends beyond ETH to any ERC-20 token. ckUSDC, ckUSDT, ckLINK, and other chain-key tokens follow the same pattern: a canister holds the underlying ERC-20 tokens on Ethereum and mints equivalent ICRC-1 tokens on ICP. This creates a trustless, decentralized bridge for the entire Ethereum token ecosystem.",
        },
        {
          title: "The EVM RPC Canister",
          content:
            "The EVM RPC canister enables ICP canisters to interact directly with Ethereum and other EVM-compatible chains. Using HTTPS outcalls, canisters can query Ethereum state, monitor transactions, and trigger actions based on on-chain events. This is the infrastructure layer that makes ckETH and chain-key ERC-20 tokens possible.",
        },
        {
          title: "The Future of Chain-Key Tokens",
          content:
            "The chain-key token framework is designed to be extensible. Any blockchain with a compatible cryptographic scheme can potentially have chain-key tokens on ICP. Future developments include chain-key tokens for Solana, Cosmos chains, and other ecosystems, making ICP a universal hub for cross-chain liquidity.",
        },
      ],
      conclusion:
        "Chain-key tokens represent a paradigm shift in cross-chain interoperability — from trusted bridges to cryptographically guaranteed, trustless token representations. ICP is becoming the hub of a multi-chain future.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is ckETH?",
          options: [
            "A new Ethereum token",
            "A native ICP token backed 1:1 by real ETH, controlled by a canister using threshold ECDSA",
            "An Ethereum smart contract",
            "A type of NFT",
          ],
          correctAnswer: 1,
          explanation:
            "ckETH is a native ICP token backed 1:1 by real ETH held in a canister-controlled Ethereum address using threshold ECDSA.",
        },
        {
          id: "q2",
          question: "What does the EVM RPC canister enable?",
          options: [
            "Faster ICP transactions",
            "ICP canisters to interact directly with Ethereum and other EVM chains",
            "Lower gas fees on Ethereum",
            "New token creation",
          ],
          correctAnswer: 1,
          explanation:
            "The EVM RPC canister uses HTTPS outcalls to let ICP canisters query Ethereum state, monitor transactions, and interact with EVM-compatible chains.",
        },
        {
          id: "q3",
          question: "Which token standard do chain-key tokens on ICP follow?",
          options: ["ERC-20", "ERC-721", "ICRC-1", "BEP-20"],
          correctAnswer: 2,
          explanation:
            "Chain-key tokens on ICP follow the ICRC-1 token standard, ICP's native fungible token standard.",
        },
        {
          id: "q4",
          question: "What is the long-term vision for chain-key tokens?",
          options: [
            "Replace all other blockchains",
            "Create chain-key tokens for multiple blockchains, making ICP a universal cross-chain hub",
            "Only support Bitcoin and Ethereum",
            "Centralize all crypto assets",
          ],
          correctAnswer: 1,
          explanation:
            "The vision is to extend chain-key tokens to Solana, Cosmos, and other ecosystems, making ICP a universal hub for trustless cross-chain liquidity.",
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
  {
    id: 66,
    title: "vetKeys: Verifiable Encrypted Threshold Keys",
    description:
      "Discover ICP's breakthrough in on-chain encryption and privacy",
    duration: "32 min",
    objectives: [
      "Understand what vetKeys are and why they matter",
      "Learn how vetKeys enable on-chain encryption",
      "Discover use cases for vetKeys",
      "Explore the cryptographic foundations of vetKeys",
    ],
    content: {
      introduction:
        "vetKeys (Verifiable Encrypted Threshold Keys) is one of ICP's most anticipated cryptographic innovations. It enables a new class of applications that require on-chain encryption, time-locked secrets, and identity-based encryption — all without trusting any single party.",
      sections: [
        {
          title: "The Problem vetKeys Solves",
          content:
            "Traditional blockchains are fully transparent — all data is public. This makes them unsuitable for applications requiring privacy. While you can encrypt data off-chain, managing encryption keys on-chain has been impossible without trusting a centralized key manager. vetKeys solves this by enabling decentralized, threshold-based key derivation on-chain.",
        },
        {
          title: "How vetKeys Work",
          content:
            'vetKeys uses Identity-Based Encryption (IBE) combined with threshold cryptography. A subnet can derive encryption keys for any identity (a principal, a time, a condition) without any single node learning the derived key. The key is "verifiably encrypted" — you can prove the key was correctly derived without revealing it. Only the intended recipient can decrypt and use the key.',
        },
        {
          title: "Use Cases for vetKeys",
          content:
            "vetKeys enables: end-to-end encrypted messaging where keys are managed on-chain; time-locked secrets that can only be decrypted after a certain time or block; condition-based encryption where decryption requires meeting on-chain conditions; private voting where votes are encrypted until the voting period ends; and sealed-bid auctions where bids are revealed only after the auction closes.",
        },
        {
          title: "vetKeys and the Future of Privacy",
          content:
            "vetKeys represents a fundamental shift in what's possible on blockchains. For the first time, smart contracts can manage encryption keys in a trustless, decentralized way. This enables a new generation of privacy-preserving dApps that were previously impossible. Combined with ICP's other capabilities, vetKeys positions ICP as the platform for the next wave of Web3 applications.",
        },
      ],
      conclusion:
        "vetKeys is a breakthrough that brings true privacy to smart contracts. It opens up entirely new categories of applications and demonstrates ICP's commitment to pushing the boundaries of what blockchains can do.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What fundamental problem do vetKeys solve?",
          options: [
            "Slow transaction speeds",
            "The inability to manage encryption keys on-chain without trusting a centralized party",
            "High gas fees",
            "Limited token supply",
          ],
          correctAnswer: 1,
          explanation:
            "vetKeys solve the problem of managing encryption keys on-chain without trusting any centralized key manager, enabling true on-chain privacy.",
        },
        {
          id: "q2",
          question: "What cryptographic technique do vetKeys combine?",
          options: [
            "RSA and AES",
            "Identity-Based Encryption (IBE) and threshold cryptography",
            "ECDSA and SHA-256",
            "Zero-knowledge proofs and ring signatures",
          ],
          correctAnswer: 1,
          explanation:
            "vetKeys combine Identity-Based Encryption (IBE) with threshold cryptography to enable decentralized, verifiable key derivation.",
        },
        {
          id: "q3",
          question: 'What is a "time-locked secret" enabled by vetKeys?',
          options: [
            "A secret that expires",
            "A secret that can only be decrypted after a certain time or block",
            "A secret stored in a time capsule",
            "A secret with a timestamp",
          ],
          correctAnswer: 1,
          explanation:
            "Time-locked secrets can only be decrypted after a specified time or block height, enabling applications like sealed auctions and scheduled reveals.",
        },
        {
          id: "q4",
          question:
            'What does "verifiably encrypted" mean in the context of vetKeys?',
          options: [
            "The key is stored in a verified wallet",
            "You can prove the key was correctly derived without revealing it",
            "The encryption is verified by a third party",
            "The key is publicly visible",
          ],
          correctAnswer: 1,
          explanation:
            '"Verifiably encrypted" means you can cryptographically prove that a key was correctly derived according to the protocol without revealing the key itself.',
        },
      ],
    },
    xpReward: 160,
    creditsReward: 22,
  },
  {
    id: 67,
    title: "HTTPS Outcalls and Secure Randomness",
    description:
      "Learn how ICP canisters interact with the web and generate verifiable randomness",
    duration: "25 min",
    objectives: [
      "Understand how HTTPS outcalls work",
      "Learn the security model of HTTPS outcalls",
      "Discover ICP's on-chain randomness beacon",
      "Explore use cases for secure randomness",
    ],
    content: {
      introduction:
        "Two of ICP's most powerful capabilities are HTTPS outcalls — allowing canisters to fetch data from any web API — and a cryptographically secure on-chain randomness beacon. Both are made possible by Chain-Key Cryptography.",
      sections: [
        {
          title: "HTTPS Outcalls Explained",
          content:
            "HTTPS outcalls allow ICP canisters to make HTTP requests to external web services directly from the blockchain. Unlike traditional oracle systems, HTTPS outcalls don't require a trusted intermediary. Multiple nodes independently make the same request and reach consensus on the response, ensuring the data is authentic and tamper-proof.",
        },
        {
          title: "The Security Model of HTTPS Outcalls",
          content:
            'When a canister makes an HTTPS outcall, all nodes in the subnet independently fetch the URL. They then use consensus to agree on the response. A "transform function" can be specified to normalize responses (e.g., removing timestamps that vary between requests). This ensures that even if some nodes receive different responses, the subnet reaches a consistent, verifiable result.',
        },
        {
          title: "On-Chain Randomness Beacon",
          content:
            "ICP provides a cryptographically secure randomness beacon that canisters can use. This randomness is generated using threshold BLS signatures over the current block height — a process that is unpredictable, unbiasable, and publicly verifiable. No single node can predict or manipulate the random output, making it suitable for high-stakes applications like lotteries and games.",
        },
        {
          title: "Use Cases",
          content:
            "HTTPS outcalls enable: price oracles that fetch real-time asset prices; weather data for parametric insurance; sports results for prediction markets; and AI API calls for on-chain AI inference. Secure randomness enables: fair NFT minting; on-chain lotteries; random validator selection; and provably fair gaming. Together, they make ICP canisters the most capable smart contracts in existence.",
        },
      ],
      conclusion:
        "HTTPS outcalls and secure randomness eliminate two of the biggest limitations of traditional smart contracts: isolation from the web and lack of true randomness. ICP canisters can now interact with the real world in ways previously impossible.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "How do HTTPS outcalls differ from traditional oracle systems?",
          options: [
            "They are faster",
            "They don't require a trusted intermediary — multiple nodes independently fetch and reach consensus",
            "They are cheaper",
            "They only work with certain APIs",
          ],
          correctAnswer: 1,
          explanation:
            "Unlike oracles that require trusting a third party, HTTPS outcalls have multiple nodes independently fetch data and reach consensus, eliminating the trusted intermediary.",
        },
        {
          id: "q2",
          question:
            'What is the purpose of a "transform function" in HTTPS outcalls?',
          options: [
            "To encrypt the response",
            "To normalize responses by removing variable elements like timestamps",
            "To translate the response language",
            "To compress the data",
          ],
          correctAnswer: 1,
          explanation:
            "Transform functions normalize responses to remove variable elements (like timestamps) that might differ between nodes, enabling consensus on a consistent result.",
        },
        {
          id: "q3",
          question: "How is ICP's on-chain randomness generated?",
          options: [
            "Using a random number generator",
            "Through threshold BLS signatures over the current block height",
            "By a trusted oracle",
            "From user inputs",
          ],
          correctAnswer: 1,
          explanation:
            "ICP's randomness beacon uses threshold BLS signatures over the block height — unpredictable, unbiasable, and publicly verifiable.",
        },
        {
          id: "q4",
          question:
            "Why is ICP's randomness suitable for high-stakes applications?",
          options: [
            "It is very fast",
            "No single node can predict or manipulate the random output",
            "It is free to use",
            "It is stored on-chain",
          ],
          correctAnswer: 1,
          explanation:
            "Because the randomness is generated via threshold signatures, no single node can predict or bias the output, making it suitable for lotteries, games, and other high-stakes uses.",
        },
      ],
    },
    xpReward: 140,
    creditsReward: 18,
  },
  {
    id: 68,
    title: "Threshold ECDSA and Cross-Chain Signing",
    description:
      "Master how ICP canisters sign transactions on other blockchains",
    duration: "30 min",
    objectives: [
      "Understand threshold ECDSA on ICP",
      "Learn how canisters sign Bitcoin and Ethereum transactions",
      "Discover the security guarantees of threshold ECDSA",
      "Explore cross-chain dApp architectures",
    ],
    content: {
      introduction:
        "Threshold ECDSA is the cryptographic primitive that enables ICP canisters to control addresses on Bitcoin, Ethereum, and other ECDSA-based blockchains. It is the engine behind ckBTC, ckETH, and ICP's native multi-chain capabilities.",
      sections: [
        {
          title: "What is Threshold ECDSA?",
          content:
            "ECDSA (Elliptic Curve Digital Signature Algorithm) is the signature scheme used by Bitcoin and Ethereum. Threshold ECDSA distributes the ECDSA private key across multiple nodes so that no single node ever holds the complete key. A threshold of nodes must cooperate to produce a valid ECDSA signature, enabling canisters to sign Bitcoin and Ethereum transactions without any single point of compromise.",
        },
        {
          title: "How Canisters Sign Cross-Chain Transactions",
          content:
            "When a canister needs to sign a Bitcoin or Ethereum transaction, it calls the threshold ECDSA API provided by ICP. The subnet nodes cooperate using their key shares to produce a valid ECDSA signature without reconstructing the private key. The canister receives the signature and can broadcast the signed transaction to the target blockchain.",
        },
        {
          title: "Security Guarantees",
          content:
            "Threshold ECDSA on ICP provides strong security guarantees: the private key is never reconstructed in one place; up to 1/3 of nodes can be compromised without affecting security; key shares are periodically reshared to new node sets; and the entire process is governed by the NNS. This makes canister-controlled cross-chain addresses more secure than most hardware wallets.",
        },
        {
          title: "Cross-Chain dApp Architectures",
          content:
            'Threshold ECDSA enables entirely new dApp architectures. A single ICP canister can simultaneously control Bitcoin addresses, Ethereum wallets, and ICP accounts. This enables: multi-chain DeFi protocols that operate across chains; cross-chain DAOs that hold assets on multiple networks; and chain-agnostic identity systems. ICP becomes the "smart contract layer" for the entire blockchain ecosystem.',
        },
      ],
      conclusion:
        "Threshold ECDSA is one of the most powerful capabilities in all of blockchain. It transforms ICP canisters into multi-chain agents capable of controlling assets and executing transactions across the entire crypto ecosystem.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "What blockchains use ECDSA signatures that ICP can sign for?",
          options: [
            "Only ICP",
            "Bitcoin and Ethereum (and other ECDSA-based blockchains)",
            "Only Ethereum",
            "Only Bitcoin",
          ],
          correctAnswer: 1,
          explanation:
            "Bitcoin, Ethereum, and many other blockchains use ECDSA signatures, all of which ICP canisters can produce using threshold ECDSA.",
        },
        {
          id: "q2",
          question:
            "Is the ECDSA private key ever reconstructed in one place during threshold signing?",
          options: [
            "Yes, briefly",
            "No — the key is never reconstructed; nodes cooperate using shares",
            "Only on the NNS subnet",
            "Only during key rotation",
          ],
          correctAnswer: 1,
          explanation:
            "The private key is never reconstructed in one place. Nodes cooperate using their individual key shares to produce a valid signature without ever combining the full key.",
        },
        {
          id: "q3",
          question: "What does threshold ECDSA enable for ICP canisters?",
          options: [
            "Faster ICP transactions",
            "The ability to control addresses and sign transactions on Bitcoin, Ethereum, and other chains",
            "Lower fees",
            "More storage",
          ],
          correctAnswer: 1,
          explanation:
            "Threshold ECDSA enables ICP canisters to control addresses and sign transactions on Bitcoin, Ethereum, and any other ECDSA-based blockchain.",
        },
        {
          id: "q4",
          question:
            "What is a key advantage of canister-controlled cross-chain addresses?",
          options: [
            "They are faster than hardware wallets",
            "They are more secure than most hardware wallets due to threshold security and no single point of compromise",
            "They are free to use",
            "They support more tokens",
          ],
          correctAnswer: 1,
          explanation:
            "Canister-controlled addresses use threshold security with periodic resharing, meaning no single point of compromise — often more secure than hardware wallets.",
        },
      ],
    },
    xpReward: 160,
    creditsReward: 22,
  },
  {
    id: 69,
    title: "Internet Computer Consensus Protocol",
    description: "Deep dive into ICP's unique consensus mechanism",
    duration: "28 min",
    objectives: [
      "Understand the Internet Computer Consensus (ICC) protocol",
      "Learn how ICP achieves fast finality",
      "Discover the role of random beacons in consensus",
      "Explore how consensus integrates with Chain-Key",
    ],
    content: {
      introduction:
        "The Internet Computer Consensus (ICC) protocol is a novel consensus mechanism that achieves fast finality, high throughput, and strong security guarantees. It is deeply integrated with Chain-Key Cryptography, using threshold signatures at every step.",
      sections: [
        {
          title: "Overview of ICC",
          content:
            "ICC is a Byzantine fault-tolerant consensus protocol designed specifically for ICP's subnet architecture. It achieves finality in 1-2 seconds — orders of magnitude faster than Bitcoin (60 min) or Ethereum (12 sec). ICC operates in rounds, with each round producing a certified block that is immediately final. There are no forks or reorganizations.",
        },
        {
          title: "The Role of Random Beacons",
          content:
            "ICC uses a random beacon to select block makers and notaries for each round. The beacon is generated using threshold BLS signatures, making it unpredictable and unbiasable. This randomness prevents adversaries from predicting who will propose the next block, making targeted attacks much harder. The random beacon is a core component of ICP's security model.",
        },
        {
          title: "Block Certification",
          content:
            'In ICC, blocks are certified using threshold signatures. When a sufficient number of nodes agree on a block, they produce a threshold signature (a "certification") that proves consensus was reached. This certification is what makes ICP\'s state verifiable — any client can check the certification to confirm a block is final without running a full node.',
        },
        {
          title: "Integration with Chain-Key",
          content:
            "ICC and Chain-Key are deeply intertwined. The random beacon used in consensus is generated by the same threshold BLS infrastructure as Chain-Key signatures. Block certifications are threshold signatures. The NNS uses ICC to govern the network. This tight integration means ICP's consensus and cryptography are mutually reinforcing, creating a uniquely secure and efficient system.",
        },
      ],
      conclusion:
        "ICC is a state-of-the-art consensus protocol that achieves what was previously thought impossible: fast finality, high security, and decentralization simultaneously. Its integration with Chain-Key makes it uniquely powerful.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "How fast does ICP achieve finality compared to Bitcoin?",
          options: [
            "About the same speed",
            "ICP achieves finality in 1-2 seconds vs Bitcoin's ~60 minutes",
            "ICP is slower",
            "ICP takes about 12 seconds like Ethereum",
          ],
          correctAnswer: 1,
          explanation:
            "ICP achieves finality in 1-2 seconds, compared to Bitcoin's ~60 minutes and Ethereum's ~12 seconds, making it orders of magnitude faster.",
        },
        {
          id: "q2",
          question: "What is the purpose of the random beacon in ICC?",
          options: [
            "To generate tokens",
            "To unpredictably select block makers and notaries, preventing targeted attacks",
            "To encrypt blocks",
            "To measure network speed",
          ],
          correctAnswer: 1,
          explanation:
            "The random beacon unpredictably selects block makers and notaries each round, preventing adversaries from predicting and targeting specific nodes.",
        },
        {
          id: "q3",
          question: 'What is a "block certification" in ICC?',
          options: [
            "A certificate of authenticity for NFTs",
            "A threshold signature proving that consensus was reached on a block",
            "A government certification",
            "A block hash",
          ],
          correctAnswer: 1,
          explanation:
            "A block certification is a threshold signature produced when enough nodes agree on a block, proving consensus was reached and making the block immediately final.",
        },
        {
          id: "q4",
          question: "Can ICP blocks be reorganized after finality?",
          options: [
            "Yes, like Bitcoin",
            "Yes, occasionally",
            "No — ICC achieves immediate finality with no forks or reorganizations",
            "Only during network upgrades",
          ],
          correctAnswer: 2,
          explanation:
            "ICC achieves immediate finality — once a block is certified, it is final. There are no forks or reorganizations, unlike Bitcoin and Ethereum.",
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
  {
    id: 70,
    title: "The Future of Chain-Key Technology",
    description:
      "Explore the roadmap and frontier innovations of ICP's cryptographic stack",
    duration: "25 min",
    objectives: [
      "Understand the Chain-Key technology roadmap",
      "Learn about upcoming cryptographic innovations",
      "Discover how Chain-Key enables the multi-chain future",
      "Explore ICP's position in the broader cryptographic landscape",
    ],
    content: {
      introduction:
        "Chain-Key Technology is not static — it is an evolving suite of cryptographic innovations. Understanding the roadmap helps you anticipate where ICP is headed and how it will shape the future of decentralized computing.",
      sections: [
        {
          title: "The Chain-Key Roadmap",
          content:
            "DFINITY's cryptography research team continues to push the boundaries of what's possible. Key upcoming developments include: full deployment of vetKeys for on-chain encryption; threshold Schnorr signatures for Taproot Bitcoin and Solana compatibility; improved threshold ECDSA performance; and new subnet types optimized for specific use cases like privacy-preserving computation.",
        },
        {
          title: "Threshold Schnorr and Taproot",
          content:
            "Bitcoin's Taproot upgrade introduced Schnorr signatures, enabling more efficient and private Bitcoin transactions. ICP is developing threshold Schnorr to support Taproot-native Bitcoin integration. This will enable more sophisticated Bitcoin smart contracts on ICP, including Lightning Network channels and advanced multi-sig schemes, all controlled by ICP canisters.",
        },
        {
          title: "ICP as the Cryptographic Hub",
          content:
            'The long-term vision for Chain-Key is to make ICP the cryptographic hub of the multi-chain ecosystem. Every major blockchain will have chain-key token representations on ICP. Canisters will be able to sign transactions on any chain. ICP\'s vetKeys will provide encryption services to dApps across all chains. ICP becomes the "cryptographic operating system" for Web3.',
        },
        {
          title: "Chain-Key and the Broader Cryptographic Landscape",
          content:
            "ICP's Chain-Key innovations are contributing to the broader field of applied cryptography. DFINITY's research on threshold BLS, DKG, and vetKeys has produced academic papers and open-source implementations that benefit the entire cryptographic community. ICP is not just building a blockchain — it is advancing the science of secure, decentralized computation.",
        },
      ],
      conclusion:
        "Chain-Key Technology represents the frontier of applied cryptography in blockchain. As it continues to evolve, ICP will become increasingly central to the multi-chain future — the cryptographic backbone that connects and secures the entire Web3 ecosystem.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is threshold Schnorr being developed for?",
          options: [
            "Faster ICP transactions",
            "Taproot Bitcoin integration and Solana compatibility",
            "Lower fees",
            "New token creation",
          ],
          correctAnswer: 1,
          explanation:
            "Threshold Schnorr is being developed to support Bitcoin's Taproot upgrade and Solana compatibility, enabling more sophisticated cross-chain capabilities.",
        },
        {
          id: "q2",
          question:
            "What is the long-term vision for ICP in the multi-chain ecosystem?",
          options: [
            "To replace all other blockchains",
            "To become the cryptographic hub — providing signing, encryption, and token services across all chains",
            "To focus only on DeFi",
            "To become a Layer 2 for Ethereum",
          ],
          correctAnswer: 1,
          explanation:
            "The vision is for ICP to become the cryptographic hub of Web3 — providing threshold signing, vetKeys encryption, and chain-key tokens for the entire multi-chain ecosystem.",
        },
        {
          id: "q3",
          question:
            "How does DFINITY's Chain-Key research benefit the broader community?",
          options: [
            "It doesn't — it's proprietary",
            "Through academic papers and open-source implementations that advance applied cryptography",
            "By creating more tokens",
            "By reducing competition",
          ],
          correctAnswer: 1,
          explanation:
            "DFINITY publishes academic research and open-source implementations of Chain-Key innovations, contributing to the broader field of applied cryptography.",
        },
        {
          id: "q4",
          question:
            'What does it mean for ICP to be the "cryptographic operating system" for Web3?',
          options: [
            "ICP runs all other blockchains",
            "ICP provides foundational cryptographic services (signing, encryption, randomness) that other chains and dApps can use",
            "ICP controls all crypto assets",
            "ICP replaces traditional operating systems",
          ],
          correctAnswer: 1,
          explanation:
            'As the "cryptographic OS," ICP provides foundational services — threshold signing, vetKeys encryption, secure randomness — that dApps and other chains can leverage, just as an OS provides services to applications.',
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
];
