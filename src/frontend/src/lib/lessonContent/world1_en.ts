// World 1: Sovereign Basics - Lessons 1-10
// Complete English lesson content with objectives, sections, quizzes, and rewards

import type { LessonContent } from "../lessonContent";

export const world1LessonsEN: LessonContent[] = [
  {
    id: 1,
    title: "Decentralization Explained",
    description: "Understand the core principle of Web3",
    duration: "15 min",
    objectives: [
      "Define decentralization and its importance",
      "Compare centralized vs decentralized systems",
      "Understand the benefits and trade-offs",
      "Explore real-world decentralized applications",
    ],
    content: {
      introduction:
        "Decentralization is the foundational principle of Web3. It shifts power from central authorities to distributed networks, creating systems that are more resilient, transparent, and fair.",
      sections: [
        {
          title: "What is Decentralization?",
          content:
            "Decentralization means distributing control across many participants instead of concentrating it in one place. In traditional systems, a single company or authority makes all decisions. In decentralized systems, the network collectively maintains and governs itself through consensus.",
        },
        {
          title: "Centralized vs Decentralized",
          content:
            "Centralized systems (like banks or social media) have a single point of control and failure. They're efficient but vulnerable to censorship, data breaches, and abuse of power. Decentralized systems distribute control, making them more resilient but sometimes slower. No single entity can shut them down or manipulate them.",
        },
        {
          title: "Benefits and Trade-offs",
          content:
            "Benefits: censorship resistance, no single point of failure, transparency, user ownership, and trustless operation. Trade-offs: slower transaction speeds, higher complexity, and the challenge of coordinating many participants. The key is finding the right balance for each use case.",
        },
        {
          title: "Real-World Examples",
          content:
            "Bitcoin: decentralized money without banks. Ethereum: decentralized computing platform. IPFS: decentralized file storage. Mastodon: decentralized social media. These systems prove that decentralization works at scale and offers real alternatives to centralized services.",
        },
      ],
      conclusion:
        "Decentralization isn't just a technical choice—it's a philosophical shift toward systems that serve users rather than corporations.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "What is the main characteristic of a decentralized system?",
          options: [
            "It's faster than centralized systems",
            "Control is distributed across many participants",
            "It's always free to use",
            "It requires no internet connection",
          ],
          correctAnswer: 1,
          explanation:
            "Decentralized systems distribute control across many participants instead of concentrating it in a single authority.",
        },
        {
          id: "q2",
          question: "What is a key benefit of decentralization?",
          options: [
            "Always faster transactions",
            "Lower complexity",
            "Censorship resistance and no single point of failure",
            "Requires less energy",
          ],
          correctAnswer: 2,
          explanation:
            "Decentralization provides censorship resistance and eliminates single points of failure, making systems more resilient.",
        },
        {
          id: "q3",
          question: "What is a trade-off of decentralized systems?",
          options: [
            "They're less secure",
            "They can be slower and more complex",
            "They're more expensive to build",
            "They require permission to use",
          ],
          correctAnswer: 1,
          explanation:
            "Decentralized systems can be slower and more complex because they require coordination among many participants.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
  {
    id: 2,
    title: "Cryptographic Hashing",
    description: "Master the security foundation of blockchain",
    duration: "15 min",
    objectives: [
      "Understand what cryptographic hashes are",
      "Learn how hash functions work",
      "Discover why hashes are one-way",
      "Explore hash applications in blockchain",
    ],
    content: {
      introduction:
        "Cryptographic hashing is the mathematical magic that makes blockchain secure and tamper-proof. Understanding hashes is essential for grasping how blockchain technology works.",
      sections: [
        {
          title: "What is a Hash?",
          content:
            "A cryptographic hash is a unique digital fingerprint of data. Hash functions take any input (text, file, transaction) and produce a fixed-size output (the hash). Even tiny changes to the input create completely different hashes. This property makes hashes perfect for detecting tampering.",
        },
        {
          title: "How Hash Functions Work",
          content:
            "Hash functions use complex mathematical algorithms to transform input data. Popular algorithms include SHA-256 (used by Bitcoin) and Keccak-256 (used by Ethereum). These functions are deterministic (same input always produces same output) and produce avalanche effects (small input changes create drastically different outputs).",
        },
        {
          title: "One-Way Functions",
          content:
            "Hash functions are one-way: you can easily compute a hash from data, but you can't reverse it to get the original data. This makes hashes perfect for storing passwords and verifying data integrity without revealing the actual content. It's mathematically infeasible to find two different inputs that produce the same hash.",
        },
        {
          title: "Hashes in Blockchain",
          content:
            "Blockchain uses hashes everywhere: each block contains a hash of the previous block (creating the chain), transactions are hashed for verification, Merkle trees use hashes to efficiently verify large datasets, and mining involves finding hashes that meet specific criteria.",
        },
      ],
      conclusion:
        "Cryptographic hashing is the invisible force that makes blockchain secure, efficient, and trustworthy.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "What happens when you change even one character in the input to a hash function?",
          options: [
            "The hash changes slightly",
            "The hash stays the same",
            "The hash changes completely",
            "The hash becomes invalid",
          ],
          correctAnswer: 2,
          explanation:
            "Hash functions have an avalanche effect—even tiny input changes create completely different hashes.",
        },
        {
          id: "q2",
          question: 'Why are hash functions called "one-way"?',
          options: [
            "They only work in one direction",
            "You can compute a hash but can't reverse it to get the original data",
            "They're faster in one direction",
            "They only accept one type of input",
          ],
          correctAnswer: 1,
          explanation:
            "Hash functions are one-way because you can easily compute a hash from data, but you can't reverse the process to recover the original data.",
        },
        {
          id: "q3",
          question: 'How does blockchain use hashes to create the "chain"?',
          options: [
            "By encrypting each block",
            "By storing hashes in a database",
            "Each block contains a hash of the previous block",
            "By hashing user passwords",
          ],
          correctAnswer: 2,
          explanation:
            "Each block contains a hash of the previous block, creating an unbreakable chain where tampering with any block breaks all subsequent links.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
  {
    id: 3,
    title: "Peer-to-Peer Networks",
    description: "Explore how decentralized networks communicate",
    duration: "15 min",
    objectives: [
      "Understand peer-to-peer (P2P) architecture",
      "Learn how nodes communicate",
      "Discover network resilience",
      "Compare P2P with client-server models",
    ],
    content: {
      introduction:
        "Peer-to-peer networks are the infrastructure of decentralization. They enable direct communication between participants without intermediaries, creating resilient and censorship-resistant systems.",
      sections: [
        {
          title: "P2P Architecture",
          content:
            "In peer-to-peer networks, every participant (node) is equal. There are no servers or clients—each node can both provide and consume resources. This creates a flat, democratic network structure where no single entity has special privileges or control.",
        },
        {
          title: "How Nodes Communicate",
          content:
            "Nodes discover each other through various methods: bootstrap nodes, DHT (Distributed Hash Tables), or peer exchange. Once connected, they share data directly. When you broadcast a transaction, it propagates through the network as nodes forward it to their peers, eventually reaching all participants.",
        },
        {
          title: "Network Resilience",
          content:
            "P2P networks are incredibly resilient. If some nodes go offline, the network continues functioning through remaining nodes. There's no single point of failure. Even if 90% of nodes disappeared, the remaining 10% could keep the network alive. This makes P2P networks nearly impossible to shut down.",
        },
        {
          title: "P2P vs Client-Server",
          content:
            "Client-server: centralized, efficient, single point of failure, easy to censor. P2P: decentralized, resilient, no single point of failure, censorship-resistant. Traditional web uses client-server. Blockchain uses P2P. Each model has its place, but P2P is essential for truly decentralized systems.",
        },
      ],
      conclusion:
        "Peer-to-peer networks are the backbone of Web3, enabling the decentralized, resilient systems that define the future of the internet.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "What makes P2P networks different from client-server networks?",
          options: [
            "P2P is faster",
            "In P2P, all participants are equal with no central server",
            "P2P requires less bandwidth",
            "P2P is easier to build",
          ],
          correctAnswer: 1,
          explanation:
            "In P2P networks, all participants (nodes) are equal and can both provide and consume resources, unlike client-server where there's a central authority.",
        },
        {
          id: "q2",
          question: "What happens if many nodes in a P2P network go offline?",
          options: [
            "The entire network stops",
            "The network continues functioning through remaining nodes",
            "Data is lost",
            "New nodes must be created",
          ],
          correctAnswer: 1,
          explanation:
            "P2P networks are resilient—if some nodes go offline, the network continues functioning through remaining nodes with no single point of failure.",
        },
        {
          id: "q3",
          question: "How do transactions propagate in a P2P network?",
          options: [
            "Through a central server",
            "Nodes forward transactions to their peers until all nodes receive it",
            "Through email",
            "Only the sender and receiver see it",
          ],
          correctAnswer: 1,
          explanation:
            "Transactions propagate as nodes forward them to their peers, creating a ripple effect that eventually reaches all participants in the network.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
  {
    id: 4,
    title: "Digital Signatures Deep Dive",
    description: "Master the cryptography behind authentication",
    duration: "18 min",
    objectives: [
      "Understand digital signature algorithms",
      "Learn signature verification process",
      "Explore non-repudiation",
      "Practice signature security",
    ],
    content: {
      introduction:
        "Digital signatures are the cryptographic proof that makes Web3 trustless. They enable authentication without passwords and transactions without intermediaries.",
      sections: [
        {
          title: "Signature Algorithms",
          content:
            "Digital signatures use asymmetric cryptography. Common algorithms include ECDSA (Elliptic Curve Digital Signature Algorithm) used by Bitcoin and Ethereum, and EdDSA (Edwards-curve Digital Signature Algorithm) used by newer systems. These algorithms create signatures that are easy to verify but impossible to forge.",
        },
        {
          title: "Creating and Verifying Signatures",
          content:
            "To sign: hash the message, then encrypt the hash with your private key—this is the signature. To verify: decrypt the signature with the signer's public key to get the hash, hash the message yourself, and compare. If they match, the signature is valid and proves the signer authorized the message.",
        },
        {
          title: "Non-Repudiation",
          content:
            "Digital signatures provide non-repudiation: once you sign something, you can't deny it. Only your private key could have created that signature. This makes signatures legally binding in many jurisdictions and essential for blockchain transactions where there's no authority to resolve disputes.",
        },
        {
          title: "Signature Security",
          content:
            "Signature security depends entirely on private key security. Use hardware wallets for important keys. Never reuse signatures across different contexts. Be aware of signature malleability issues in some algorithms. Always verify what you're signing—malicious apps can trick you into signing harmful transactions.",
        },
      ],
      conclusion:
        "Digital signatures are the cryptographic foundation of trust in Web3, enabling secure, verifiable, and non-repudiable transactions.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is used to create a digital signature?",
          options: ["Public key", "Private key", "Password", "Username"],
          correctAnswer: 1,
          explanation:
            "Digital signatures are created using your private key, which proves you authorized the message or transaction.",
        },
        {
          id: "q2",
          question: "What does non-repudiation mean?",
          options: [
            "Signatures can be reused",
            "You can deny signing something",
            "Once you sign, you can't deny it",
            "Signatures expire",
          ],
          correctAnswer: 2,
          explanation:
            "Non-repudiation means once you sign something with your private key, you can't deny it—only you could have created that signature.",
        },
        {
          id: "q3",
          question: "How do you verify a digital signature?",
          options: [
            "Use the signer's private key",
            "Use the signer's public key to decrypt and compare hashes",
            "Ask the signer to confirm",
            "Check a central database",
          ],
          correctAnswer: 1,
          explanation:
            "You verify a signature by using the signer's public key to decrypt it and comparing the result with a hash of the message.",
        },
      ],
    },
    xpReward: 70,
    creditsReward: 7,
  },
  {
    id: 5,
    title: "Merkle Trees",
    description: "Learn efficient data verification structures",
    duration: "18 min",
    objectives: [
      "Understand Merkle tree structure",
      "Learn how Merkle proofs work",
      "Discover efficiency benefits",
      "Explore blockchain applications",
    ],
    content: {
      introduction:
        "Merkle trees are elegant data structures that enable efficient and secure verification of large datasets. They're fundamental to how blockchain achieves scalability and light client support.",
      sections: [
        {
          title: "Merkle Tree Structure",
          content:
            "A Merkle tree is a binary tree of hashes. Leaf nodes contain hashes of data (like transactions). Parent nodes contain hashes of their children. This continues up to a single root hash. The root hash represents the entire dataset—change any data and the root changes.",
        },
        {
          title: "Merkle Proofs",
          content:
            'Merkle proofs let you verify that specific data is in the tree without downloading the entire dataset. You only need the data, the root hash, and a small "proof path" of sibling hashes. This makes verification logarithmically efficient—a tree with a million items needs only about 20 hashes for proof.',
        },
        {
          title: "Efficiency Benefits",
          content:
            "Merkle trees enable light clients: nodes that verify transactions without storing the entire blockchain. They only need block headers (containing Merkle roots) and can request proofs for specific transactions. This makes blockchain accessible on mobile devices and low-power hardware.",
        },
        {
          title: "Blockchain Applications",
          content:
            "Bitcoin uses Merkle trees to organize transactions in blocks. Ethereum uses Patricia Merkle tries for state storage. IPFS uses Merkle DAGs for content addressing. These structures make blockchain efficient, verifiable, and scalable.",
        },
      ],
      conclusion:
        "Merkle trees are a brilliant example of how clever data structures enable blockchain to be both secure and efficient.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the Merkle root?",
          options: [
            "The first transaction",
            "A single hash representing the entire dataset",
            "The largest hash",
            "The block number",
          ],
          correctAnswer: 1,
          explanation:
            "The Merkle root is a single hash at the top of the tree that represents the entire dataset—changing any data changes the root.",
        },
        {
          id: "q2",
          question: "What is the main benefit of Merkle proofs?",
          options: [
            "They're faster to compute",
            "You can verify data is in the tree without downloading everything",
            "They use less memory",
            "They're more secure",
          ],
          correctAnswer: 1,
          explanation:
            "Merkle proofs enable efficient verification—you can prove data is in the tree with just a small proof path, not the entire dataset.",
        },
        {
          id: "q3",
          question: "How do Merkle trees enable light clients?",
          options: [
            "By reducing block size",
            "By allowing verification with just block headers and proofs",
            "By speeding up transactions",
            "By encrypting data",
          ],
          correctAnswer: 1,
          explanation:
            "Merkle trees let light clients verify transactions using only block headers (containing Merkle roots) and small proofs, without storing the entire blockchain.",
        },
      ],
    },
    xpReward: 70,
    creditsReward: 7,
  },
  {
    id: 6,
    title: "Transaction Lifecycle",
    description: "Follow a transaction from creation to confirmation",
    duration: "18 min",
    objectives: [
      "Understand transaction creation",
      "Learn about mempool and propagation",
      "Discover block inclusion process",
      "Explore confirmation and finality",
    ],
    content: {
      introduction:
        "Understanding the complete lifecycle of a blockchain transaction reveals how decentralized systems achieve consensus and finality without central coordination.",
      sections: [
        {
          title: "Transaction Creation",
          content:
            "You create a transaction by specifying recipient, amount, and fee. Your wallet constructs the transaction data, signs it with your private key, and broadcasts it to the network. The signature proves you authorized it and prevents tampering.",
        },
        {
          title: "Mempool and Propagation",
          content:
            "Transactions enter the mempool (memory pool)—a waiting area for unconfirmed transactions. Nodes propagate transactions to peers, spreading them across the network. Miners/validators select transactions from their mempool, typically prioritizing higher fees.",
        },
        {
          title: "Block Inclusion",
          content:
            "Miners/validators bundle selected transactions into a block. They must solve a puzzle (PoW) or be selected by the protocol (PoS). Once they create a valid block, they broadcast it to the network. Other nodes verify the block and add it to their blockchain.",
        },
        {
          title: "Confirmation and Finality",
          content:
            'Your transaction is "confirmed" once included in a block. More confirmations (subsequent blocks) increase security against reorganizations. Bitcoin typically requires 6 confirmations for finality. Some blockchains offer instant finality. The more confirmations, the more irreversible the transaction.',
        },
      ],
      conclusion:
        "The transaction lifecycle demonstrates how blockchain achieves trustless, decentralized consensus through cryptography and economic incentives.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the mempool?",
          options: [
            "A type of wallet",
            "A waiting area for unconfirmed transactions",
            "A mining algorithm",
            "A consensus mechanism",
          ],
          correctAnswer: 1,
          explanation:
            "The mempool is a waiting area where unconfirmed transactions sit before being included in a block.",
        },
        {
          id: "q2",
          question:
            "Why do miners typically prioritize transactions with higher fees?",
          options: [
            "They're more secure",
            "They're faster to process",
            "Miners earn the fees as rewards",
            "They're required by protocol",
          ],
          correctAnswer: 2,
          explanation:
            "Miners earn transaction fees as rewards, so they typically prioritize transactions with higher fees to maximize their earnings.",
        },
        {
          id: "q3",
          question: 'What does "confirmation" mean for a transaction?',
          options: [
            "The transaction was created",
            "The transaction was included in a block",
            "The transaction was signed",
            "The transaction was broadcast",
          ],
          correctAnswer: 1,
          explanation:
            'A transaction is "confirmed" once it\'s included in a block. More confirmations (subsequent blocks) increase security.',
        },
      ],
    },
    xpReward: 70,
    creditsReward: 7,
  },
  {
    id: 7,
    title: "Mining and Validation",
    description: "Understand how new blocks are created",
    duration: "20 min",
    objectives: [
      "Learn how mining works",
      "Understand validation in PoS",
      "Discover block rewards and incentives",
      "Compare mining vs validation",
    ],
    content: {
      introduction:
        "Mining and validation are the processes that secure blockchain networks and create new blocks. Understanding these mechanisms reveals how blockchain achieves security through economic incentives.",
      sections: [
        {
          title: "How Mining Works (PoW)",
          content:
            "In Proof of Work, miners compete to solve a cryptographic puzzle: finding a nonce that makes the block hash meet a difficulty target. This requires massive computational power. The first miner to solve it broadcasts the block and earns rewards. The difficulty adjusts to maintain consistent block times.",
        },
        {
          title: "Validation in Proof of Stake",
          content:
            "In Proof of Stake, validators are selected to create blocks based on their stake (locked cryptocurrency). Selection is pseudo-random but weighted by stake size. Validators propose blocks and other validators attest to their validity. Dishonest validators lose their stake (slashing).",
        },
        {
          title: "Block Rewards and Incentives",
          content:
            "Miners/validators earn two types of rewards: block rewards (newly created cryptocurrency) and transaction fees. Block rewards decrease over time (Bitcoin halving), making fees increasingly important. These incentives align participants' interests with network security.",
        },
        {
          title: "Mining vs Validation Comparison",
          content:
            "Mining (PoW): energy-intensive, proven security, anyone can participate with hardware. Validation (PoS): energy-efficient, requires capital stake, faster finality. PoW favors computational power; PoS favors capital. Both secure the network through economic incentives.",
        },
      ],
      conclusion:
        "Mining and validation transform economic incentives into network security, creating systems where acting honestly is more profitable than attacking.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What are miners trying to find in Proof of Work?",
          options: [
            "A private key",
            "A nonce that makes the block hash meet the difficulty target",
            "The next transaction",
            "A new algorithm",
          ],
          correctAnswer: 1,
          explanation:
            "Miners search for a nonce (number) that, when included in the block, produces a hash meeting the difficulty target.",
        },
        {
          id: "q2",
          question: "What happens to dishonest validators in Proof of Stake?",
          options: [
            "They get banned",
            "They lose their staked cryptocurrency (slashing)",
            "They pay a small fine",
            "Nothing happens",
          ],
          correctAnswer: 1,
          explanation:
            "Dishonest validators lose their staked cryptocurrency through a process called slashing, creating strong economic incentives for honest behavior.",
        },
        {
          id: "q3",
          question: "What are the two types of rewards miners/validators earn?",
          options: [
            "Fees and taxes",
            "Block rewards and transaction fees",
            "Interest and dividends",
            "Bonuses and commissions",
          ],
          correctAnswer: 1,
          explanation:
            "Miners and validators earn block rewards (newly created cryptocurrency) and transaction fees from users.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 8,
    title: "Forks and Chain Splits",
    description: "Learn how blockchains evolve and diverge",
    duration: "20 min",
    objectives: [
      "Understand soft forks vs hard forks",
      "Learn about chain reorganizations",
      "Discover famous fork examples",
      "Explore governance implications",
    ],
    content: {
      introduction:
        "Forks are how blockchains evolve, upgrade, and sometimes split into separate chains. Understanding forks is essential for grasping blockchain governance and evolution.",
      sections: [
        {
          title: "Soft Forks vs Hard Forks",
          content:
            "Soft forks are backward-compatible upgrades—old nodes still work with new rules. Hard forks are breaking changes—old nodes can't validate new blocks, potentially splitting the chain. Soft forks are safer but more limited. Hard forks enable bigger changes but risk community splits.",
        },
        {
          title: "Chain Reorganizations",
          content:
            "Sometimes two miners find blocks simultaneously, creating temporary forks. The network follows the longest chain (most cumulative work). When a longer chain emerges, nodes reorganize to follow it. This is why confirmations matter—deeper blocks are less likely to be reorganized.",
        },
        {
          title: "Famous Fork Examples",
          content:
            "Bitcoin Cash forked from Bitcoin over block size debates. Ethereum Classic split from Ethereum after the DAO hack. These contentious forks created separate cryptocurrencies with different philosophies. Not all forks are controversial—many are planned upgrades.",
        },
        {
          title: "Governance Implications",
          content:
            "Forks reveal blockchain governance challenges. Who decides on changes? How do you achieve consensus? Hard forks can split communities. This has led to various governance models: Bitcoin's rough consensus, Ethereum's core developer leadership, and on-chain governance in newer chains.",
        },
      ],
      conclusion:
        "Forks demonstrate that blockchain isn't just technology—it's a social system where technical changes require community consensus.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the difference between soft forks and hard forks?",
          options: [
            "Soft forks are easier",
            "Soft forks are backward-compatible, hard forks are not",
            "Hard forks are faster",
            "There is no difference",
          ],
          correctAnswer: 1,
          explanation:
            "Soft forks are backward-compatible (old nodes still work), while hard forks are breaking changes that can split the chain.",
        },
        {
          id: "q2",
          question: "Why do temporary forks sometimes occur?",
          options: [
            "Due to bugs",
            "When two miners find blocks simultaneously",
            "During upgrades",
            "To increase speed",
          ],
          correctAnswer: 1,
          explanation:
            "Temporary forks occur when two miners find blocks at nearly the same time, creating competing chains until one becomes longer.",
        },
        {
          id: "q3",
          question: "What famous fork occurred after the DAO hack?",
          options: ["Bitcoin Cash", "Litecoin", "Ethereum Classic", "Dogecoin"],
          correctAnswer: 2,
          explanation:
            "Ethereum Classic split from Ethereum after the DAO hack, with Ethereum Classic maintaining the original chain and Ethereum reversing the hack.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 9,
    title: "Blockchain Scalability",
    description: "Explore solutions to blockchain's biggest challenge",
    duration: "20 min",
    objectives: [
      "Understand the scalability trilemma",
      "Learn about Layer 2 solutions",
      "Discover sharding and sidechains",
      "Explore future scalability approaches",
    ],
    content: {
      introduction:
        "Scalability is blockchain's greatest challenge. As networks grow, they must handle more transactions without sacrificing security or decentralization. Various solutions are emerging to solve this trilemma.",
      sections: [
        {
          title: "The Scalability Trilemma",
          content:
            "Blockchain faces a trilemma: you can optimize for two of three properties—security, decentralization, scalability—but not all three simultaneously. Bitcoin prioritizes security and decentralization over speed. Traditional databases prioritize scalability but sacrifice decentralization. The challenge is finding the right balance.",
        },
        {
          title: "Layer 2 Solutions",
          content:
            "Layer 2 solutions process transactions off the main chain (Layer 1) while inheriting its security. Lightning Network (Bitcoin) and Rollups (Ethereum) batch many transactions into one on-chain transaction. This dramatically increases throughput while maintaining security. Users can transact quickly and cheaply on Layer 2.",
        },
        {
          title: "Sharding and Sidechains",
          content:
            "Sharding splits the blockchain into parallel chains (shards) that process transactions simultaneously. Ethereum 2.0 uses sharding. Sidechains are separate blockchains connected to the main chain, processing transactions independently. Both approaches increase throughput by parallelizing work.",
        },
        {
          title: "Future Approaches",
          content:
            "Emerging solutions include: state channels for instant micropayments, validity proofs (ZK-rollups) for privacy and scalability, data availability sampling for light clients, and novel consensus mechanisms. The future likely involves multiple complementary solutions working together.",
        },
      ],
      conclusion:
        "Scalability solutions are rapidly evolving, bringing us closer to blockchain systems that can serve billions of users without compromising core principles.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the blockchain scalability trilemma?",
          options: [
            "Three types of blockchains",
            "You can optimize for two of: security, decentralization, scalability",
            "Three consensus mechanisms",
            "Three types of transactions",
          ],
          correctAnswer: 1,
          explanation:
            "The trilemma states you can optimize for two of three properties—security, decentralization, scalability—but not all three simultaneously.",
        },
        {
          id: "q2",
          question: "How do Layer 2 solutions improve scalability?",
          options: [
            "By making blocks bigger",
            "By processing transactions off-chain while inheriting Layer 1 security",
            "By using faster computers",
            "By reducing security",
          ],
          correctAnswer: 1,
          explanation:
            "Layer 2 solutions process many transactions off the main chain and batch them into one on-chain transaction, increasing throughput while maintaining security.",
        },
        {
          id: "q3",
          question: "What is sharding?",
          options: [
            "Breaking blocks into pieces",
            "Splitting the blockchain into parallel chains that process transactions simultaneously",
            "A type of mining",
            "A consensus mechanism",
          ],
          correctAnswer: 1,
          explanation:
            "Sharding splits the blockchain into parallel chains (shards) that process transactions simultaneously, increasing overall throughput.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 10,
    title: "Mega Quiz: World 1 Mastery",
    description: "Test your complete understanding of Sovereign Basics",
    duration: "30 min",
    objectives: [
      "Demonstrate mastery of all World 1 concepts",
      "Apply knowledge across multiple topics",
      "Identify connections between concepts",
      "Achieve World 1 completion",
    ],
    content: {
      introduction:
        "Congratulations on completing World 1! This mega quiz tests your comprehensive understanding of all the sovereign basics you've learned. Take your time and demonstrate your mastery.",
      sections: [
        {
          title: "Comprehensive Assessment",
          content:
            "This quiz covers all nine lessons from World 1: decentralization, cryptographic hashing, peer-to-peer networks, digital signatures, Merkle trees, transaction lifecycle, mining and validation, forks, and scalability. You'll need to recall specific details and understand how concepts connect.",
        },
        {
          title: "Application and Synthesis",
          content:
            "Beyond memorization, you'll apply your knowledge to real scenarios. How do these concepts work together? What are the trade-offs? Why do certain design decisions matter? This quiz tests your ability to think critically about blockchain technology.",
        },
        {
          title: "Mastery Demonstration",
          content:
            "Passing this quiz proves you've mastered the foundational concepts of blockchain and Web3. You understand not just what these technologies are, but why they work and why they matter. This knowledge prepares you for more advanced topics in World 2 and beyond.",
        },
      ],
      conclusion:
        "Complete this mega quiz to prove your World 1 mastery and unlock World 2: ICP Fundamentals!",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the primary benefit of decentralization?",
          options: [
            "Faster transactions",
            "No single point of failure and censorship resistance",
            "Lower costs",
            "Easier to use",
          ],
          correctAnswer: 1,
          explanation:
            "Decentralization eliminates single points of failure and provides censorship resistance by distributing control across many participants.",
        },
        {
          id: "q2",
          question:
            "What property of hash functions makes blockchain tamper-proof?",
          options: [
            "They're fast",
            "Small input changes create completely different hashes",
            "They're reversible",
            "They're encrypted",
          ],
          correctAnswer: 1,
          explanation:
            "The avalanche effect—where small input changes create completely different hashes—makes it obvious when data has been tampered with.",
        },
        {
          id: "q3",
          question:
            "In a P2P network, what happens if 50% of nodes go offline?",
          options: [
            "The network stops",
            "The network continues through remaining nodes",
            "Data is lost",
            "Transactions reverse",
          ],
          correctAnswer: 1,
          explanation:
            "P2P networks are resilient—even if many nodes go offline, the network continues functioning through remaining nodes.",
        },
        {
          id: "q4",
          question: "What proves you authorized a transaction?",
          options: [
            "Your username",
            "Your digital signature created with your private key",
            "Your email",
            "Your IP address",
          ],
          correctAnswer: 1,
          explanation:
            "Your digital signature, created with your private key, cryptographically proves you authorized the transaction.",
        },
        {
          id: "q5",
          question: "What is the main advantage of Merkle trees?",
          options: [
            "They're faster",
            "You can verify data is in the tree without downloading everything",
            "They use less storage",
            "They're more secure",
          ],
          correctAnswer: 1,
          explanation:
            "Merkle trees enable efficient verification—you can prove data is in the tree with just a small proof path.",
        },
        {
          id: "q6",
          question:
            "Where do unconfirmed transactions wait before being included in a block?",
          options: [
            "In the blockchain",
            "In the mempool",
            "In the wallet",
            "In the network",
          ],
          correctAnswer: 1,
          explanation:
            "Unconfirmed transactions wait in the mempool (memory pool) before miners/validators include them in blocks.",
        },
        {
          id: "q7",
          question: "What economic incentive keeps miners/validators honest?",
          options: [
            "Reputation",
            "Block rewards and transaction fees",
            "Legal requirements",
            "Community pressure",
          ],
          correctAnswer: 1,
          explanation:
            "Miners and validators earn block rewards and transaction fees, making honest behavior more profitable than attacking the network.",
        },
        {
          id: "q8",
          question: "What type of fork is backward-compatible?",
          options: ["Hard fork", "Soft fork", "Chain split", "Reorganization"],
          correctAnswer: 1,
          explanation:
            "Soft forks are backward-compatible—old nodes can still work with the new rules.",
        },
        {
          id: "q9",
          question: "What is the blockchain scalability trilemma?",
          options: [
            "Three types of consensus",
            "You can optimize for two of: security, decentralization, scalability",
            "Three types of forks",
            "Three types of transactions",
          ],
          correctAnswer: 1,
          explanation:
            "The trilemma states you can optimize for two of three properties—security, decentralization, scalability—but not all three.",
        },
        {
          id: "q10",
          question: "How do Layer 2 solutions improve blockchain scalability?",
          options: [
            "By making blocks bigger",
            "By processing transactions off-chain and batching them",
            "By using faster consensus",
            "By reducing security",
          ],
          correctAnswer: 1,
          explanation:
            "Layer 2 solutions process many transactions off-chain and batch them into one on-chain transaction, dramatically increasing throughput.",
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
];
