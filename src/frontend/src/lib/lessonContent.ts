// Complete lesson content aggregation for all 70 lessons (World 0: 0.00-0.90, Worlds 1-6: 1-60) plus Bonus World 7: 61-70
// All lessons fully implemented with bilingual support, interactive quizzes, XP/credit rewards, and glossary keyword extraction.

export interface LessonContent {
  id: number | string;
  title: string;
  description: string;
  duration: string;
  objectives: string[];
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
  quiz: {
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
  };
  xpReward: number;
  creditsReward: number;
}

// Import all world lessons
import { world1LessonsEN } from "./lessonContent/world1_en";
import { world2LessonsEN } from "./lessonContent/world2_en";
import { world3LessonsEN } from "./lessonContent/world3_en";
import { world4LessonsEN } from "./lessonContent/world4_en";
import { world5_6_SpanishMeta } from "./lessonContent/world5_6_esMeta";
import { world5LessonsEN } from "./lessonContent/world5_en";
import { world6LessonsEN } from "./lessonContent/world6_en";
import { world7LessonsEN } from "./lessonContent/world7_en";
import { world8LessonsEN } from "./lessonContent/world8_en";

// ============================================================================
// WORLD 0: BEGINNER FOUNDATIONS - LESSONS 0.00-0.90
// Ultra-beginner introduction to Web3 and blockchain concepts
// ============================================================================

export const world0LessonsEN: LessonContent[] = [
  {
    id: "0.00",
    title: "What is Web3?",
    description:
      "Discover the next evolution of the internet and why it matters",
    duration: "10 min",
    objectives: [
      "Understand what Web3 means",
      "Learn the difference between Web1, Web2, and Web3",
      "Discover why Web3 is important",
      "Explore real-world Web3 examples",
    ],
    content: {
      introduction:
        "Welcome to your Web3 journey! Web3 represents the next generation of the internet—one where you own your data, control your identity, and participate in a truly decentralized digital world.",
      sections: [
        {
          title: "The Evolution of the Web",
          content:
            "Web1 (1990s-2000s) was read-only—static websites where you could only consume content. Web2 (2000s-present) became read-write—social media and interactive platforms where you create content but companies own it. Web3 is read-write-own—you create, control, and own your digital assets and data.",
        },
        {
          title: "What Makes Web3 Different?",
          content:
            "Web3 is built on blockchain technology, enabling true digital ownership without intermediaries. Instead of trusting companies with your data, you use cryptographic proof. Instead of platforms controlling your content, you own it directly. Web3 puts power back in users' hands.",
        },
        {
          title: "Why Web3 Matters",
          content:
            "Web3 solves fundamental problems: data breaches (you control your data), censorship (no single authority can silence you), platform lock-in (your identity and assets are portable), and unfair value distribution (creators earn directly from their work).",
        },
        {
          title: "Web3 in Action",
          content:
            "Real Web3 applications include: decentralized social media where you own your posts, digital art marketplaces where artists keep most profits, decentralized finance where you control your money, and gaming where you truly own in-game items.",
        },
      ],
      conclusion:
        "Web3 isn't just technology—it's a movement toward a fairer, more open internet. You're now part of this revolution!",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the main difference between Web2 and Web3?",
          options: [
            "Web3 is faster",
            "Web3 gives users ownership and control",
            "Web3 has better graphics",
            "Web3 is only for experts",
          ],
          correctAnswer: 1,
          explanation:
            "Web3 gives users true ownership and control over their data, identity, and digital assets, unlike Web2 where companies control everything.",
        },
        {
          id: "q2",
          question: "What technology powers Web3?",
          options: ["Social media", "Cloud computing", "Blockchain", "Email"],
          correctAnswer: 2,
          explanation:
            "Blockchain technology is the foundation of Web3, enabling decentralization and true digital ownership.",
        },
        {
          id: "q3",
          question: "In Web3, who owns your data?",
          options: [
            "The platform",
            "The government",
            "You own your data",
            "Advertisers",
          ],
          correctAnswer: 2,
          explanation:
            "In Web3, you own and control your own data, unlike Web2 where platforms own your information.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 5,
  },
  {
    id: "0.10",
    title: "What Is Blockchain?",
    description: "Learn the technology that powers Web3",
    duration: "12 min",
    objectives: [
      "Understand what blockchain is",
      "Learn how blocks are linked together",
      "Discover why blockchain is secure",
      "Explore blockchain use cases",
    ],
    content: {
      introduction:
        "Blockchain is the revolutionary technology behind Web3. It's a digital ledger that records transactions in a way that's transparent, secure, and impossible to tamper with.",
      sections: [
        {
          title: "What is a Blockchain?",
          content:
            "A blockchain is a chain of blocks, where each block contains data (like transactions), a timestamp, and a cryptographic link to the previous block. This creates an unbreakable chain of records that everyone can verify but no one can alter.",
        },
        {
          title: "How Blocks Connect",
          content:
            "Each block contains a unique fingerprint (hash) of the previous block. If someone tries to change an old block, its hash changes, breaking the chain. This makes blockchain tamper-proof—you'd have to change every subsequent block, which is practically impossible.",
        },
        {
          title: "Why Blockchain is Secure",
          content:
            "Blockchain security comes from three factors: cryptography (mathematical locks), decentralization (no single point of failure), and consensus (network agreement). Together, these make blockchain one of the most secure technologies ever created.",
        },
        {
          title: "Real-World Uses",
          content:
            "Blockchain powers cryptocurrencies like Bitcoin, enables smart contracts, tracks supply chains, secures medical records, verifies digital identities, and much more. Any system that needs trust and transparency can benefit from blockchain.",
        },
      ],
      conclusion:
        "Blockchain is more than just cryptocurrency—it's a fundamental shift in how we store and verify information in the digital age.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What makes blockchain tamper-proof?",
          options: [
            "It's stored in the cloud",
            "Each block links to the previous block with cryptographic hashes",
            "It requires passwords",
            "It's encrypted",
          ],
          correctAnswer: 1,
          explanation:
            "Each block contains a hash of the previous block, creating an unbreakable chain. Changing any block would break all subsequent links.",
        },
        {
          id: "q2",
          question: "What does each block in a blockchain contain?",
          options: [
            "Only transaction data",
            "Data, timestamp, and link to previous block",
            "Just a hash",
            "User passwords",
          ],
          correctAnswer: 1,
          explanation:
            "Each block contains data (like transactions), a timestamp, and a cryptographic hash linking it to the previous block.",
        },
        {
          id: "q3",
          question: "What are the three main security factors of blockchain?",
          options: [
            "Speed, size, and cost",
            "Cryptography, decentralization, and consensus",
            "Passwords, firewalls, and encryption",
            "Servers, databases, and networks",
          ],
          correctAnswer: 1,
          explanation:
            "Blockchain security comes from cryptography (mathematical locks), decentralization (no single point of failure), and consensus (network agreement).",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 5,
  },
  {
    id: "0.20",
    title: "Keys & Signatures",
    description: "Master the cryptographic foundation of Web3",
    duration: "12 min",
    objectives: [
      "Understand public and private keys",
      "Learn how digital signatures work",
      "Discover why keys are important",
      "Practice key security basics",
    ],
    content: {
      introduction:
        "In Web3, you are your keys. Understanding cryptographic keys and signatures is essential for safely navigating the decentralized world.",
      sections: [
        {
          title: "Public and Private Keys",
          content:
            "Think of keys like a mailbox: your public key is the address anyone can use to send you things, while your private key is the key that only you have to open it. Your private key proves you own your assets—lose it, and you lose everything.",
        },
        {
          title: "How Digital Signatures Work",
          content:
            "When you make a transaction, you sign it with your private key. This creates a unique digital signature that proves you authorized it. Anyone can verify the signature using your public key, but only you could have created it with your private key.",
        },
        {
          title: "Why Keys Matter",
          content:
            "Keys are the foundation of Web3 security and ownership. They replace usernames and passwords with mathematical proof. No company holds your keys—you do. This gives you true ownership but also full responsibility for security.",
        },
        {
          title: "Key Security Basics",
          content:
            'Never share your private key with anyone. Store it securely offline (hardware wallets are best). Use strong passwords for wallets. Enable two-factor authentication where possible. Remember: "Not your keys, not your crypto."',
        },
      ],
      conclusion:
        "Keys are your identity and ownership in Web3. Treat them with the utmost care and never compromise on security.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the difference between public and private keys?",
          options: [
            "There is no difference",
            "Public key is your address, private key proves ownership",
            "Private key is faster",
            "Public key is more secure",
          ],
          correctAnswer: 1,
          explanation:
            "Your public key is like an address others can use to send you things, while your private key proves you own your assets and must be kept secret.",
        },
        {
          id: "q2",
          question: "What does a digital signature prove?",
          options: [
            "Your identity",
            "You authorized a transaction",
            "Your balance",
            "Your location",
          ],
          correctAnswer: 1,
          explanation:
            "A digital signature created with your private key proves that you authorized a specific transaction.",
        },
        {
          id: "q3",
          question: "What should you NEVER do with your private key?",
          options: [
            "Store it securely",
            "Share it with anyone",
            "Back it up",
            "Use it to sign transactions",
          ],
          correctAnswer: 1,
          explanation:
            "Never share your private key with anyone. If someone has your private key, they have complete control over your assets.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 5,
  },
  {
    id: "0.30",
    title: "How to Use a Wallet",
    description: "Set up and secure your first Web3 wallet",
    duration: "15 min",
    objectives: [
      "Understand what a crypto wallet is",
      "Learn different types of wallets",
      "Set up a wallet safely",
      "Practice basic wallet operations",
    ],
    content: {
      introduction:
        "Your wallet is your gateway to Web3. It stores your keys, manages your assets, and lets you interact with decentralized applications.",
      sections: [
        {
          title: "What is a Crypto Wallet?",
          content:
            "A crypto wallet doesn't actually store your cryptocurrency—it stores your private keys. Your assets live on the blockchain; the wallet just gives you access to them. Think of it as a keychain for your digital life.",
        },
        {
          title: "Types of Wallets",
          content:
            "Hot wallets (software) are connected to the internet—convenient but less secure. Cold wallets (hardware) store keys offline—more secure but less convenient. Custodial wallets (exchanges) hold your keys—easy but you don't truly own your assets. Non-custodial wallets give you full control.",
        },
        {
          title: "Setting Up Safely",
          content:
            "Download wallets only from official sources. Write down your seed phrase (recovery words) on paper—never digitally. Store it in a safe place. Never share your seed phrase or private key. Test with small amounts first. Enable all security features.",
        },
        {
          title: "Basic Operations",
          content:
            "Receiving: Share your public address (like an email address). Sending: Enter recipient address, amount, and confirm. Always double-check addresses—transactions are irreversible. Start with small test transactions. Keep some funds for transaction fees (gas).",
        },
      ],
      conclusion:
        "Your wallet is your responsibility. Take time to learn it well, prioritize security, and never rush transactions.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What does a crypto wallet actually store?",
          options: [
            "Cryptocurrency coins",
            "Your private keys",
            "Blockchain data",
            "Transaction history",
          ],
          correctAnswer: 1,
          explanation:
            "A crypto wallet stores your private keys, not the actual cryptocurrency. Your assets live on the blockchain.",
        },
        {
          id: "q2",
          question: "What is the most secure type of wallet?",
          options: [
            "Exchange wallet",
            "Mobile wallet",
            "Hardware wallet (cold storage)",
            "Web wallet",
          ],
          correctAnswer: 2,
          explanation:
            "Hardware wallets (cold storage) are the most secure because they store your private keys offline, away from internet threats.",
        },
        {
          id: "q3",
          question: "What should you do with your seed phrase?",
          options: [
            "Email it to yourself",
            "Store it in the cloud",
            "Write it on paper and store it safely offline",
            "Share it with customer support",
          ],
          correctAnswer: 2,
          explanation:
            "Write your seed phrase on paper and store it safely offline. Never store it digitally or share it with anyone.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
  {
    id: "0.40",
    title: "Consensus Basics",
    description: "Learn how blockchains reach agreement",
    duration: "12 min",
    objectives: [
      "Understand what consensus means",
      "Learn about Proof of Work",
      "Discover Proof of Stake",
      "Compare consensus mechanisms",
    ],
    content: {
      introduction:
        "Consensus is how decentralized networks agree on the truth without a central authority. It's the magic that makes blockchain work.",
      sections: [
        {
          title: "What is Consensus?",
          content:
            "In a decentralized network, thousands of computers need to agree on which transactions are valid and in what order. Consensus mechanisms are the rules that let them reach agreement even when some participants might be dishonest or offline.",
        },
        {
          title: "Proof of Work (PoW)",
          content:
            "Bitcoin uses Proof of Work: miners compete to solve complex math puzzles. The winner gets to add the next block and earn rewards. This requires massive computational power, making attacks expensive. It's secure but energy-intensive.",
        },
        {
          title: "Proof of Stake (PoS)",
          content:
            'Proof of Stake selects validators based on how much cryptocurrency they "stake" (lock up). Validators who act dishonestly lose their stake. PoS is much more energy-efficient than PoW while maintaining security through economic incentives.',
        },
        {
          title: "Other Mechanisms",
          content:
            "Many other consensus mechanisms exist: Delegated Proof of Stake (DPoS), Proof of Authority (PoA), Practical Byzantine Fault Tolerance (PBFT), and more. Each has trade-offs between security, speed, decentralization, and energy efficiency.",
        },
      ],
      conclusion:
        "Consensus mechanisms are the heart of blockchain technology, enabling trustless agreement in a decentralized world.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the purpose of consensus mechanisms?",
          options: [
            "To speed up transactions",
            "To let decentralized networks agree on the truth",
            "To encrypt data",
            "To create new coins",
          ],
          correctAnswer: 1,
          explanation:
            "Consensus mechanisms enable decentralized networks to agree on which transactions are valid without a central authority.",
        },
        {
          id: "q2",
          question: "What does Bitcoin use for consensus?",
          options: [
            "Proof of Stake",
            "Proof of Authority",
            "Proof of Work",
            "Delegated Proof of Stake",
          ],
          correctAnswer: 2,
          explanation:
            "Bitcoin uses Proof of Work, where miners compete to solve complex math puzzles to add new blocks.",
        },
        {
          id: "q3",
          question:
            "What is the main advantage of Proof of Stake over Proof of Work?",
          options: [
            "It's more secure",
            "It's much more energy-efficient",
            "It's faster",
            "It's older",
          ],
          correctAnswer: 1,
          explanation:
            "Proof of Stake is much more energy-efficient than Proof of Work while maintaining security through economic incentives.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 5,
  },
  {
    id: "0.50",
    title: "Fungible & Non-fungible Tokens",
    description: "Understand the two types of digital assets",
    duration: "12 min",
    objectives: [
      "Understand fungible tokens",
      "Learn what makes tokens non-fungible",
      "Discover NFT use cases",
      "Compare FT and NFT standards",
    ],
    content: {
      introduction:
        "Tokens are the building blocks of Web3 economies. Understanding the difference between fungible and non-fungible tokens is essential for navigating the digital asset landscape.",
      sections: [
        {
          title: "Fungible Tokens",
          content:
            "Fungible tokens are interchangeable—each unit is identical and equal in value. Bitcoin is fungible: one BTC equals any other BTC. Fungible tokens are used as currencies, governance tokens, and utility tokens. ERC-20 on Ethereum and ICRC-1 on ICP are fungible token standards.",
        },
        {
          title: "Non-Fungible Tokens (NFTs)",
          content:
            "NFTs are unique digital assets—each token has distinct properties and cannot be exchanged 1:1 with another. Think of them as digital certificates of ownership. Each NFT has a unique ID and metadata that distinguishes it from all others.",
        },
        {
          title: "NFT Use Cases",
          content:
            "NFTs represent: digital art and collectibles; gaming items and characters; music and media rights; real estate and physical assets; identity and credentials; event tickets; and domain names. Any unique digital or physical asset can be represented as an NFT.",
        },
        {
          title: "Token Standards",
          content:
            "Standards ensure interoperability. ERC-20 (Ethereum fungible), ERC-721 (Ethereum NFT), ERC-1155 (multi-token). On ICP: ICRC-1 (fungible), ICRC-7 (NFT). Standards define how tokens behave, enabling wallets and dApps to support them without custom integration.",
        },
      ],
      conclusion:
        "Fungible and non-fungible tokens serve different purposes in Web3. Together, they enable a rich ecosystem of digital ownership and value exchange.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: 'What makes a token "fungible"?',
          options: [
            "It has a unique ID",
            "Each unit is identical and interchangeable with any other unit",
            "It can be divided",
            "It has special properties",
          ],
          correctAnswer: 1,
          explanation:
            "Fungible tokens are interchangeable — each unit is identical and equal in value to any other unit of the same token.",
        },
        {
          id: "q2",
          question: "What is the key property of an NFT?",
          options: [
            "It's very valuable",
            "Each token is unique and cannot be exchanged 1:1 with another",
            "It's on Ethereum",
            "It's a currency",
          ],
          correctAnswer: 1,
          explanation:
            "NFTs are unique — each has distinct properties and a unique ID, making them non-interchangeable with other tokens.",
        },
        {
          id: "q3",
          question: "What is the ICP fungible token standard?",
          options: ["ERC-20", "ERC-721", "ICRC-1", "BEP-20"],
          correctAnswer: 2,
          explanation:
            "ICRC-1 is the Internet Computer's fungible token standard, similar to ERC-20 on Ethereum.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 5,
  },
  {
    id: "0.60",
    title: "Bitcoin vs. ICP",
    description: "Compare the two revolutionary blockchain networks",
    duration: "15 min",
    objectives: [
      "Understand Bitcoin's design and purpose",
      "Learn ICP's unique architecture",
      "Compare their capabilities",
      "Discover how they complement each other",
    ],
    content: {
      introduction:
        "Bitcoin and the Internet Computer Protocol (ICP) are both revolutionary blockchain networks, but they serve very different purposes and have fundamentally different architectures.",
      sections: [
        {
          title: "Bitcoin: Digital Gold",
          content:
            "Bitcoin was created in 2009 as a peer-to-peer electronic cash system. Its primary purpose is to be a store of value and medium of exchange. Bitcoin prioritizes security and decentralization over speed and functionality. It processes ~7 transactions per second with ~10 minute block times.",
        },
        {
          title: "ICP: The World Computer",
          content:
            "ICP was launched in 2021 with a much broader vision: to be a decentralized world computer that can host any software. ICP can run web applications, store data, and execute complex smart contracts at web speed. It processes thousands of transactions per second with 1-2 second finality.",
        },
        {
          title: "Key Differences",
          content:
            "Bitcoin: simple scripting, limited smart contracts, energy-intensive PoW, ~7 TPS, 10-min finality. ICP: full smart contracts (canisters), serves web content, efficient consensus, thousands of TPS, 1-2 sec finality. Bitcoin excels at being digital gold; ICP excels at being a decentralized computer.",
        },
        {
          title: "How They Complement Each Other",
          content:
            "ICP natively integrates with Bitcoin through Chain-Key Cryptography. ICP canisters can hold and transact Bitcoin directly. This means you can build sophisticated Bitcoin applications on ICP — combining Bitcoin's security and value with ICP's programmability and speed.",
        },
      ],
      conclusion:
        "Bitcoin and ICP are not competitors — they're complementary. Bitcoin provides the most secure store of value; ICP provides the most capable decentralized computing platform. Together, they represent the future of Web3.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is Bitcoin's primary purpose?",
          options: [
            "Running web applications",
            "A store of value and medium of exchange (digital gold)",
            "Hosting smart contracts",
            "Social media",
          ],
          correctAnswer: 1,
          explanation:
            'Bitcoin was designed primarily as a store of value and peer-to-peer electronic cash system — often called "digital gold."',
        },
        {
          id: "q2",
          question: "How does ICP's transaction speed compare to Bitcoin?",
          options: [
            "They are the same speed",
            "Bitcoin is faster",
            "ICP processes thousands of TPS vs Bitcoin's ~7 TPS",
            "ICP is only slightly faster",
          ],
          correctAnswer: 2,
          explanation:
            "ICP processes thousands of transactions per second with 1-2 second finality, compared to Bitcoin's ~7 TPS and 10-minute block times.",
        },
        {
          id: "q3",
          question: "How do Bitcoin and ICP work together?",
          options: [
            "They compete for the same users",
            "ICP natively integrates with Bitcoin via Chain-Key, enabling Bitcoin apps on ICP",
            "They share the same blockchain",
            "They don't interact",
          ],
          correctAnswer: 1,
          explanation:
            "ICP natively integrates with Bitcoin through Chain-Key Cryptography, allowing ICP canisters to hold and transact Bitcoin directly.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
  {
    id: "0.70",
    title: "Smart Contracts Explained",
    description: "Understand self-executing code on the blockchain",
    duration: "12 min",
    objectives: [
      "Understand what smart contracts are",
      "Learn how they execute automatically",
      "Discover smart contract use cases",
      "Explore ICP's canister smart contracts",
    ],
    content: {
      introduction:
        "Smart contracts are self-executing programs stored on a blockchain that automatically enforce agreements when predetermined conditions are met. They eliminate the need for intermediaries in many transactions.",
      sections: [
        {
          title: "What is a Smart Contract?",
          content:
            "A smart contract is code that lives on a blockchain and executes automatically when specific conditions are met. Think of it as a vending machine: insert the right input, get the predetermined output — no human needed. Once deployed, smart contracts are immutable and execute exactly as programmed.",
        },
        {
          title: "How Smart Contracts Work",
          content:
            "Smart contracts are written in programming languages (Solidity for Ethereum, Motoko/Rust for ICP). They define rules and consequences. When triggered by a transaction, they execute automatically. Results are recorded on the blockchain. No party can alter the outcome once conditions are met.",
        },
        {
          title: "Use Cases",
          content:
            "Smart contracts power: DeFi (automated lending, trading); NFT minting and trading; DAOs (automated governance); supply chain tracking; insurance (automatic payouts); gaming (provably fair mechanics); and identity verification. Any agreement that can be codified can be a smart contract.",
        },
        {
          title: "ICP Canisters: Next-Gen Smart Contracts",
          content:
            "ICP's smart contracts are called \"canisters\" — they're more powerful than traditional smart contracts. Canisters can serve web content directly, store large amounts of data, make HTTP requests, and run for years without interruption. They're essentially full applications running on a decentralized computer.",
        },
      ],
      conclusion:
        "Smart contracts are the foundation of Web3 applications. They enable trustless, automated agreements that transform how we interact digitally.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is a smart contract?",
          options: [
            "A legal document",
            "Self-executing code on a blockchain that enforces agreements automatically",
            "A type of cryptocurrency",
            "A wallet feature",
          ],
          correctAnswer: 1,
          explanation:
            "A smart contract is self-executing code on a blockchain that automatically enforces agreements when predetermined conditions are met.",
        },
        {
          id: "q2",
          question: "What makes smart contracts trustless?",
          options: [
            "They are audited by experts",
            "They execute automatically as programmed without needing intermediaries",
            "They are insured",
            "They require multiple signatures",
          ],
          correctAnswer: 1,
          explanation:
            "Smart contracts execute automatically as programmed — no intermediary can alter the outcome, making them trustless.",
        },
        {
          id: "q3",
          question: "What are ICP's smart contracts called?",
          options: ["Tokens", "Nodes", "Canisters", "Validators"],
          correctAnswer: 2,
          explanation:
            'ICP\'s smart contracts are called "canisters" — more powerful than traditional smart contracts, they can serve web content and store large amounts of data.',
        },
      ],
    },
    xpReward: 50,
    creditsReward: 5,
  },
  {
    id: "0.80",
    title: "Case Study: Bitcoin Mining",
    description: "Explore how Bitcoin mining works in practice",
    duration: "15 min",
    objectives: [
      "Understand the Bitcoin mining process",
      "Learn about mining economics",
      "Discover mining's role in security",
      "Explore the environmental debate",
    ],
    content: {
      introduction:
        "Bitcoin mining is the process by which new Bitcoin transactions are verified and added to the blockchain. It's also how new Bitcoin is created. Understanding mining gives you deep insight into how Proof of Work blockchains function.",
      sections: [
        {
          title: "How Mining Works",
          content:
            "Miners collect pending transactions and compete to find a special number (nonce) that, when combined with the block data, produces a hash starting with many zeros. This requires trillions of calculations. The first miner to find the solution broadcasts the block, gets the block reward, and the process repeats.",
        },
        {
          title: "Mining Economics",
          content:
            "Miners earn Bitcoin through block rewards (currently 3.125 BTC per block after the 2024 halving) plus transaction fees. Mining requires expensive hardware (ASICs) and significant electricity. Profitability depends on Bitcoin price, mining difficulty, hardware efficiency, and electricity cost. Mining difficulty adjusts every 2016 blocks to maintain ~10 minute block times.",
        },
        {
          title: "Mining and Security",
          content:
            "Mining secures Bitcoin by making attacks economically infeasible. A 51% attack (controlling majority of hash power) would cost billions of dollars and would likely destroy the value of the Bitcoin gained. The more miners participate, the more secure the network. This is the genius of Proof of Work.",
        },
        {
          title: "The Environmental Debate",
          content:
            "Bitcoin mining consumes significant electricity — comparable to some countries. Critics argue this is wasteful. Proponents argue: much mining uses renewable energy; it incentivizes renewable energy development; the security it provides justifies the cost; and it's more efficient than the traditional banking system. The debate continues.",
        },
      ],
      conclusion:
        "Bitcoin mining is a fascinating economic and technical system that secures the world's most valuable cryptocurrency. Understanding it reveals the elegant design of Proof of Work consensus.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What do Bitcoin miners compete to find?",
          options: [
            "The largest transaction",
            "A nonce that produces a hash with many leading zeros",
            "The fastest computer",
            "New Bitcoin addresses",
          ],
          correctAnswer: 1,
          explanation:
            "Miners compete to find a nonce that, combined with block data, produces a hash starting with many zeros — requiring trillions of calculations.",
        },
        {
          id: "q2",
          question: "What is the Bitcoin block reward after the 2024 halving?",
          options: ["6.25 BTC", "12.5 BTC", "3.125 BTC", "1 BTC"],
          correctAnswer: 2,
          explanation:
            "After the 2024 halving, the Bitcoin block reward is 3.125 BTC per block.",
        },
        {
          id: "q3",
          question: "Why is a 51% attack on Bitcoin economically infeasible?",
          options: [
            "It's technically impossible",
            "It would cost billions and likely destroy the value of any Bitcoin gained",
            "The government prevents it",
            "Miners would stop it",
          ],
          correctAnswer: 1,
          explanation:
            "A 51% attack would cost billions of dollars in hardware and electricity, and would likely destroy Bitcoin's value — making it economically irrational.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
  {
    id: "0.90",
    title: "First Steps in Web3",
    description: "Take your first practical steps in the Web3 ecosystem",
    duration: "15 min",
    objectives: [
      "Set up your first Web3 identity",
      "Explore your first dApp",
      "Understand gas fees and transactions",
      "Plan your Web3 learning journey",
    ],
    content: {
      introduction:
        "You've learned the theory — now it's time to take your first practical steps in Web3. This lesson guides you through setting up your Web3 presence and making your first interactions.",
      sections: [
        {
          title: "Setting Up Your Web3 Identity",
          content:
            "Start with Internet Identity on ICP — it's free, secure, and doesn't require personal information. Or set up MetaMask for Ethereum. Your wallet address is your Web3 identity. Keep your seed phrase safe. Consider using a hardware wallet for significant assets.",
        },
        {
          title: "Exploring Your First dApp",
          content:
            "Start with low-risk exploration: browse OpenSea to see NFTs, use Uniswap's interface (without transacting) to understand DEXes, explore ICP's NNS dApp for governance. Read documentation. Join Discord communities. Ask questions. The Web3 community is generally welcoming to newcomers.",
        },
        {
          title: "Understanding Gas Fees",
          content:
            "Gas fees are transaction costs paid to network validators. On Ethereum, fees vary with network congestion and can be high. On ICP, fees are fractions of a cent. Always check fees before transacting. Never send your entire balance — keep some for fees. Use testnets to practice without real money.",
        },
        {
          title: "Your Learning Journey",
          content:
            'Web3 is vast — focus on one area at a time. Suggested path: master wallets and security first; then explore one blockchain deeply; then expand to DeFi, NFTs, or development based on your interests. Follow reputable sources. Be skeptical of "guaranteed returns." Learn from mistakes — everyone makes them.',
        },
      ],
      conclusion:
        "Your Web3 journey has begun! Take it step by step, prioritize security, and enjoy the exploration. The decentralized future is being built right now, and you're part of it.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is Internet Identity on ICP?",
          options: [
            "A social media profile",
            "A free, secure Web3 identity that doesn't require personal information",
            "A type of token",
            "A government ID",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity is ICP's free, secure Web3 identity system that doesn't require personal information — just a device with biometrics or a security key.",
        },
        {
          id: "q2",
          question: "Why should you keep some funds for gas fees?",
          options: [
            "To pay for the wallet",
            "Transactions require fees paid to validators — sending your entire balance leaves nothing for fees",
            "For security",
            "It's a legal requirement",
          ],
          correctAnswer: 1,
          explanation:
            "Gas fees are required for transactions. If you send your entire balance, you'll have nothing left to pay fees for future transactions.",
        },
        {
          id: "q3",
          question: "What is the recommended first step in your Web3 journey?",
          options: [
            "Invest all your savings",
            "Master wallets and security first",
            "Start trading immediately",
            "Create an NFT",
          ],
          correctAnswer: 1,
          explanation:
            "Mastering wallets and security first is essential — it protects your assets and gives you the foundation for all other Web3 activities.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 6,
  },
];

// ============================================================================
// AGGREGATED LESSON CONTENT
// ============================================================================

// Combine all world lessons into a single lookup array
export const allLessonsEN: LessonContent[] = [
  ...world0LessonsEN,
  ...world1LessonsEN,
  ...world2LessonsEN,
  ...world3LessonsEN,
  ...world4LessonsEN,
  ...world5LessonsEN,
  ...world6LessonsEN,
  ...world7LessonsEN,
  ...world8LessonsEN,
];

// DEV mode: check for duplicate IDs
if (import.meta.env.DEV) {
  const ids = allLessonsEN.map((l) => String(l.id));
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) {
      console.warn(`[lessonContent] Duplicate lesson ID detected: ${id}`);
    }
    seen.add(id);
  }
}
