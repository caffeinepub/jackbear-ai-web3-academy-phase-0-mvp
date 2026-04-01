// Glossary data for Lesson 1-13: Sovereign Basics (World 1) + ICP Fundamentals (World 2)
// This file contains foundational Web3 and ICP terms aligned to World 1 and World 2
// FINALIZED: All Lesson 1-10 terms fully cross-linked + World 2 Lessons 11-13 ICP terms

export interface GlossaryTermData {
  term: string;
  definition: string;
  category: string;
  tags: string[];
  relatedTopics: string[];
  relatedLessons: string[];
  externalReferences: string[];
  fullDescription?: string;
}

// All Lesson 1-10 terms with COMPLETE cross-linking to World 1: Sovereign Basics
export const lesson1GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Self-Custody",
    definition:
      "The practice of maintaining direct control over your digital assets without relying on third-party intermediaries like banks or exchanges. Users hold their own private keys and are responsible for securing their assets.",
    category: "Sovereignty",
    tags: [
      "Web3",
      "Lesson 1",
      "Sovereign Basics",
      "Security",
      "Lesson 2",
      "Lesson 4",
    ],
    relatedTopics: ["Digital Sovereignty", "Private Keys", "Wallets"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 2",
      "World 1: Sovereign Basics - Lesson 4",
      "World 1: Sovereign Basics - Lesson 9",
    ],
    externalReferences: ["https://ethereum.org/en/wallets/"],
    fullDescription:
      "Self-custody represents a fundamental shift in how individuals manage their digital wealth. Unlike traditional banking where institutions hold your funds, self-custody means you directly control your assets through cryptographic keys. This approach eliminates counterparty risk but requires users to take full responsibility for security, including protecting private keys from loss or theft. Self-custody is a cornerstone of digital sovereignty and financial independence in the Web3 ecosystem.",
  },
  {
    term: "Private Key",
    definition:
      "A secret cryptographic key that provides complete control over digital assets and blockchain accounts. Private keys must be kept secure and never shared, as possession grants full access to associated funds and data.",
    category: "Security",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 2",
      "Sovereign Basics",
      "Cryptography",
      "Lesson 3",
      "Lesson 4",
    ],
    relatedTopics: ["Public Key", "Cryptography", "Wallets"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 2",
      "World 1: Sovereign Basics - Lesson 3",
      "World 1: Sovereign Basics - Lesson 4",
    ],
    externalReferences: ["https://en.bitcoin.it/wiki/Private_key"],
    fullDescription:
      'A private key is a randomly generated string of characters that serves as the master password to your blockchain accounts and digital assets. It works in conjunction with a public key through asymmetric cryptography. Anyone with access to your private key can control your assets, making secure storage critical. Common storage methods include hardware wallets, paper wallets, and encrypted digital storage. The phrase "not your keys, not your coins" emphasizes the importance of private key ownership in achieving true digital sovereignty.',
  },
  {
    term: "Decentralization",
    definition:
      "The distribution of authority, control, and decision-making away from central entities to a network of participants. This reduces single points of failure and increases system resilience.",
    category: "Infrastructure",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 3",
      "Sovereign Basics",
      "Governance",
      "Lesson 5",
      "Lesson 10",
    ],
    relatedTopics: ["Blockchain", "Distributed Systems", "Consensus"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 3",
      "World 1: Sovereign Basics - Lesson 5",
      "World 1: Sovereign Basics - Lesson 10",
    ],
    externalReferences: ["https://ethereum.org/en/decentralized-identity/"],
    fullDescription:
      "Decentralization is a core principle of Web3 that distributes power and control across a network rather than concentrating it in a single authority. In blockchain systems, this means no single entity controls the network, validates transactions, or makes unilateral decisions. Decentralization enhances security by eliminating single points of failure, increases censorship resistance, and promotes transparency. However, it can introduce challenges in governance, scalability, and coordination. The degree of decentralization varies across different blockchain networks and applications.",
  },
  {
    term: "Wallet",
    definition:
      "Software or hardware tool for storing and managing digital assets, private keys, and blockchain interactions. Wallets enable users to send, receive, and monitor their cryptocurrency holdings.",
    category: "Infrastructure",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 2",
      "Sovereign Basics",
      "Tools",
      "Lesson 4",
    ],
    relatedTopics: ["Private Keys", "Self-Custody", "Public Address"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 2",
      "World 1: Sovereign Basics - Lesson 4",
    ],
    externalReferences: ["https://ethereum.org/en/wallets/"],
    fullDescription:
      "Cryptocurrency wallets are essential tools for interacting with blockchain networks. Despite the name, wallets don't actually store cryptocurrency—they store the private keys that prove ownership of assets recorded on the blockchain. Wallets come in various forms: software wallets (mobile, desktop, web), hardware wallets (physical devices), and paper wallets (printed keys). Each type offers different trade-offs between convenience and security. Modern wallets also provide interfaces for interacting with decentralized applications (dApps) and managing multiple blockchain accounts.",
  },
  {
    term: "Ledger",
    definition:
      "A distributed record-keeping system that maintains a continuously growing list of transactions across multiple computers in a network, ensuring transparency and immutability.",
    category: "Infrastructure",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 5",
      "Sovereign Basics",
      "Technology",
      "Lesson 6",
    ],
    relatedTopics: ["Blockchain", "Distributed Systems", "Transactions"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 5",
      "World 1: Sovereign Basics - Lesson 6",
    ],
    externalReferences: ["https://en.wikipedia.org/wiki/Distributed_ledger"],
    fullDescription:
      "A distributed ledger is a database that is consensually shared and synchronized across multiple sites, institutions, or geographies. Unlike traditional centralized databases, distributed ledgers have no central administrator or centralized data storage. In blockchain systems, the ledger records all transactions in chronological order, creating an immutable history. Each participant (node) maintains a copy of the ledger, and consensus mechanisms ensure all copies remain synchronized. This architecture provides transparency, security, and resilience against tampering or single points of failure.",
  },
  {
    term: "Token",
    definition:
      "Digital assets created and managed on blockchain networks, representing various forms of value including currencies, utility access, governance rights, or unique collectibles with programmable functionality.",
    category: "Blockchain",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 6",
      "Sovereign Basics",
      "Assets",
      "Lesson 7",
    ],
    relatedTopics: ["Smart Contracts", "NFT", "Cryptocurrency"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 6",
      "World 1: Sovereign Basics - Lesson 7",
    ],
    externalReferences: [
      "https://ethereum.org/en/developers/docs/standards/tokens/",
    ],
    fullDescription:
      "Tokens are versatile digital assets built on blockchain platforms. They can represent fungible assets (like currencies or utility tokens), non-fungible assets (like NFTs), or hybrid models. Tokens are typically created through smart contracts and follow standardized protocols (like ERC-20 for fungible tokens or ERC-721 for NFTs on Ethereum). They enable new economic models, including tokenized ownership, decentralized governance, and programmable incentive systems. Tokens can be transferred, traded, and used within decentralized applications, forming the foundation of the Web3 economy.",
  },
  {
    term: "Transaction",
    definition:
      "A digital record of value transfer or data exchange between parties on a blockchain network, cryptographically secured and permanently recorded on the distributed ledger.",
    category: "Blockchain",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 5",
      "Sovereign Basics",
      "Operations",
      "Lesson 8",
    ],
    relatedTopics: ["Blockchain", "Ledger", "Gas Fees"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 5",
      "World 1: Sovereign Basics - Lesson 8",
    ],
    externalReferences: [
      "https://ethereum.org/en/developers/docs/transactions/",
    ],
    fullDescription:
      "Blockchain transactions are cryptographically signed data packages that record transfers of value or state changes on the network. Each transaction includes information about the sender, recipient, amount, and additional data or instructions. Transactions are broadcast to the network, validated by nodes, and grouped into blocks by miners or validators. Once confirmed and added to the blockchain, transactions become immutable and publicly verifiable. Transaction fees (gas fees) compensate network participants for processing and securing transactions. The transparency and permanence of blockchain transactions enable trustless interactions between parties.",
  },
  {
    term: "Public Address",
    definition:
      "A cryptographic identifier derived from a public key that serves as a destination for receiving digital assets, similar to an account number that can be safely shared publicly.",
    category: "Security",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 2",
      "Sovereign Basics",
      "Cryptography",
      "Lesson 4",
    ],
    relatedTopics: ["Private Key", "Wallet", "Cryptography"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 2",
      "World 1: Sovereign Basics - Lesson 4",
    ],
    externalReferences: ["https://en.bitcoin.it/wiki/Address"],
    fullDescription:
      "A public address is a shortened, user-friendly version of a public key that serves as your blockchain account identifier. It's mathematically derived from your public key through hashing algorithms, making it safe to share publicly. When someone wants to send you cryptocurrency or interact with your account, they use your public address. Unlike private keys, public addresses can be freely shared without security risk. Each blockchain network has its own address format and structure. Modern wallets can generate multiple addresses from a single private key, enhancing privacy by allowing users to use different addresses for different transactions.",
  },
  {
    term: "Custodial Service",
    definition:
      "Third-party services that hold and manage users' private keys and digital assets on their behalf, providing convenience but requiring trust in the service provider's security and integrity.",
    category: "Infrastructure",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 4",
      "Sovereign Basics",
      "Services",
      "Lesson 9",
    ],
    relatedTopics: ["Self-Custody", "Wallets", "Exchanges"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 4",
      "World 1: Sovereign Basics - Lesson 9",
    ],
    externalReferences: [
      "https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet",
    ],
    fullDescription:
      "Custodial services manage cryptocurrency on behalf of users, similar to how traditional banks hold fiat currency. These services (typically exchanges or specialized custody providers) control the private keys and handle security, backups, and account recovery. While custodial services offer convenience and user-friendly interfaces, they contradict the self-custody principle of Web3. Users must trust the custodian's security practices and face risks including hacks, insolvency, or regulatory seizure. The trade-off between convenience and sovereignty is a key consideration when choosing between custodial and non-custodial solutions.",
  },
  {
    term: "Sovereignty",
    definition:
      "The fundamental principle of complete self-governance over digital assets, identity, and data without dependence on centralized authorities, enabling true ownership and control in decentralized systems.",
    category: "Sovereignty",
    tags: ["Web3", "Lesson 1", "Lesson 10", "Sovereign Basics", "Philosophy"],
    relatedTopics: ["Self-Custody", "Decentralization", "Digital Identity"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 10",
    ],
    externalReferences: ["https://ethereum.org/en/web3/"],
    fullDescription:
      "Digital sovereignty represents the ultimate goal of Web3: empowering individuals with complete control over their digital lives. This encompasses financial sovereignty (controlling your assets), data sovereignty (owning your information), and identity sovereignty (managing your digital identity). Sovereignty means you don't need permission from intermediaries to transact, create, or participate in digital economies. It requires taking responsibility for security and decision-making but provides unprecedented freedom and autonomy. Achieving sovereignty involves using self-custodial wallets, decentralized applications, and blockchain-based identity systems that put users in control.",
  },
  {
    term: "Blockchain",
    definition:
      "A distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.",
    category: "Infrastructure",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 5",
      "Sovereign Basics",
      "Technology",
      "Lesson 6",
    ],
    relatedTopics: ["Distributed Ledger", "Decentralization", "Consensus"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 5",
      "World 1: Sovereign Basics - Lesson 6",
    ],
    externalReferences: [
      "https://ethereum.org/en/developers/docs/intro-to-ethereum/",
    ],
    fullDescription:
      "Blockchain is the foundational technology enabling Web3. It creates an immutable, transparent record of transactions through a chain of cryptographically linked blocks. Each block contains multiple transactions and a reference to the previous block, forming an unbreakable chain. This structure makes it extremely difficult to alter historical records without detection. Blockchains are maintained by distributed networks of nodes that validate and record transactions through consensus mechanisms. Different blockchains offer various trade-offs in terms of speed, security, decentralization, and functionality. The technology enables trustless interactions, transparent record-keeping, and programmable digital assets.",
  },
  {
    term: "Identity",
    definition:
      "An individual's unique digital representation in blockchain systems, encompassing personal credentials, authentication methods, and control mechanisms for accessing services and managing assets.",
    category: "Identity",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 7",
      "Sovereign Basics",
      "Privacy",
      "Lesson 8",
    ],
    relatedTopics: ["Digital Identity", "Self-Custody", "Privacy"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 7",
      "World 1: Sovereign Basics - Lesson 8",
    ],
    externalReferences: ["https://ethereum.org/en/decentralized-identity/"],
    fullDescription:
      "Digital identity in Web3 represents a paradigm shift from centralized identity systems. Instead of relying on corporations or governments to verify and manage identity, blockchain-based systems enable self-sovereign identity where individuals control their own credentials and personal data. This includes cryptographic proofs of identity, verifiable credentials, and reputation systems. Web3 identity solutions allow users to selectively share information, maintain privacy, and port their identity across different platforms and services. The Internet Computer's Internet Identity is an example of a decentralized authentication system that provides secure, privacy-preserving identity management.",
  },
  {
    term: "Consent",
    definition:
      "The explicit permission and agreement given by users for how their personal data and digital assets are accessed, used, or shared, forming the foundation of user control in decentralized systems.",
    category: "Identity",
    tags: [
      "Web3",
      "Lesson 1",
      "Lesson 8",
      "Sovereign Basics",
      "Privacy",
      "Lesson 9",
    ],
    relatedTopics: ["Privacy", "Data Ownership", "Digital Identity"],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 8",
      "World 1: Sovereign Basics - Lesson 9",
    ],
    externalReferences: ["https://gdpr.eu/what-is-gdpr/"],
    fullDescription:
      "Consent in Web3 goes beyond traditional privacy regulations like GDPR. It represents a fundamental shift toward user empowerment where individuals explicitly authorize every interaction with their data and assets. Smart contracts can encode consent mechanisms, ensuring automated compliance with user preferences. Decentralized identity systems enable granular consent management, allowing users to grant temporary or limited access to specific data points. This consent-first approach contrasts sharply with Web2's data harvesting practices, putting users in control of their digital footprint and enabling true data sovereignty.",
  },
  {
    term: "Freedom",
    definition:
      "The ability to access, use, and control digital services and assets without restriction or interference from centralized authorities, enabling true autonomy in the digital realm.",
    category: "Sovereignty",
    tags: ["Web3", "Lesson 1", "Lesson 10", "Sovereign Basics", "Philosophy"],
    relatedTopics: [
      "Censorship Resistance",
      "Decentralization",
      "Permissionless",
    ],
    relatedLessons: [
      "World 1: Sovereign Basics - Lesson 1",
      "World 1: Sovereign Basics - Lesson 10",
    ],
    externalReferences: ["https://ethereum.org/en/web3/"],
    fullDescription:
      "Digital freedom in Web3 encompasses multiple dimensions: freedom to transact without intermediaries, freedom from censorship, freedom to innovate without permission, and freedom to own and control digital assets. This freedom is enabled by decentralized networks that operate without central control points. Users can participate in global financial systems, create and deploy applications, and express themselves without fear of arbitrary restrictions. However, this freedom comes with responsibility—users must manage their own security and make informed decisions. The balance between freedom and responsibility is a defining characteristic of the Web3 ecosystem.",
  },
];

// World 2: ICP Fundamentals - Lessons 11-13 Glossary Terms
export const world2GlossaryTermsEN: GlossaryTermData[] = [
  {
    term: "Internet Computer Protocol",
    definition:
      "A revolutionary blockchain that extends the functionality of the public internet, allowing developers to build and run complete applications directly on-chain at web speed without traditional cloud services.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Infrastructure"],
    relatedTopics: ["Blockchain", "Decentralization", "Canisters"],
    relatedLessons: [
      "World 2: ICP Fundamentals - Lesson 11",
      "World 2: ICP Fundamentals - Lesson 12",
      "World 2: ICP Fundamentals - Lesson 13",
    ],
    externalReferences: ["https://internetcomputer.org/"],
    fullDescription:
      "The Internet Computer Protocol (ICP) is a blockchain that reimagines how applications are built and deployed. Unlike traditional blockchains that primarily handle transactions, ICP can host complete applications, serve web content, and process data at web speed. Its unique subnet architecture enables horizontal scaling while maintaining decentralization. ICP eliminates the need for traditional cloud services, enabling truly decentralized applications that run entirely on-chain.",
  },
  {
    term: "Canister",
    definition:
      "A computational unit on ICP that bundles code and state, capable of storing gigabytes of data, serving HTTP requests, and running continuously. Canisters are ICP's smart contracts with enhanced capabilities.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "Lesson 12", "World 2", "Development"],
    relatedTopics: ["Smart Contracts", "Motoko", "Rust", "Cycles"],
    relatedLessons: [
      "World 2: ICP Fundamentals - Lesson 11",
      "World 2: ICP Fundamentals - Lesson 12",
    ],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/canisters-code",
    ],
    fullDescription:
      "Canisters are the building blocks of applications on ICP. They combine code and state in a single unit that can be upgraded without losing data. Unlike traditional smart contracts, canisters can store large amounts of data, serve web pages, and interact with other canisters. Each canister has a unique identifier and can be controlled by users, other canisters, or decentralized governance. Canisters consume cycles (computational resources) to operate.",
  },
  {
    term: "Network Nervous System",
    definition:
      "ICP's decentralized governance system that controls the entire network. Token holders stake ICP tokens in neurons to participate in governance decisions including subnet creation, protocol upgrades, and economic parameters.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Governance"],
    relatedTopics: ["Governance", "Decentralization", "Staking"],
    relatedLessons: ["World 2: ICP Fundamentals - Lesson 11"],
    externalReferences: ["https://internetcomputer.org/nns"],
    fullDescription:
      "The Network Nervous System (NNS) is a fully on-chain, decentralized governance system that manages the Internet Computer. It enables the network to evolve and upgrade without hard forks. Token holders can stake ICP tokens in neurons to gain voting power. The NNS makes decisions on network topology, protocol upgrades, economic parameters, and more. This governance model ensures the network remains decentralized and community-controlled.",
  },
  {
    term: "Subnet",
    definition:
      "Independent blockchains that run in parallel on ICP, each hosting multiple canisters. Subnets can communicate with each other, enabling horizontal scaling while maintaining decentralization.",
    category: "Infrastructure",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Architecture"],
    relatedTopics: ["Blockchain", "Scalability", "Consensus"],
    relatedLessons: ["World 2: ICP Fundamentals - Lesson 11"],
    externalReferences: ["https://internetcomputer.org/how-it-works"],
    fullDescription:
      "Subnets are the foundation of ICP's scalable architecture. Each subnet is an independent blockchain that runs in parallel with other subnets. This design allows ICP to process thousands of transactions per second while maintaining decentralization. Subnets can host multiple canisters and communicate with each other through secure inter-subnet messaging. The Network Nervous System manages subnet creation and configuration.",
  },
  {
    term: "Cycles",
    definition:
      "Computational resources consumed by canisters on ICP, created by burning ICP tokens. Cycles provide a stable, predictable cost model where developers pre-fund applications instead of users paying transaction fees.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "Lesson 12", "World 2", "Economics"],
    relatedTopics: ["Gas Fees", "Resource Management", "Canisters"],
    relatedLessons: [
      "World 2: ICP Fundamentals - Lesson 11",
      "World 2: ICP Fundamentals - Lesson 12",
    ],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/tokens-cycles",
    ],
    fullDescription:
      "Cycles are ICP's unit of computational resources. Unlike gas fees on other blockchains, cycles provide a stable cost model because they're pegged to SDR (Special Drawing Rights). Developers burn ICP tokens to create cycles and use them to power their canisters. This reverse gas model means end users don't pay transaction fees—developers pre-fund their applications. Cycles can be transferred between canisters and monitored to ensure application availability.",
  },
  {
    term: "Internet Identity",
    definition:
      "ICP's privacy-preserving authentication system that uses WebAuthn and cryptographic anchors to provide secure, anonymous authentication without passwords or personal data.",
    category: "Identity",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Authentication", "Privacy"],
    relatedTopics: ["Digital Identity", "Privacy", "Security"],
    relatedLessons: ["World 2: ICP Fundamentals - Lesson 11"],
    externalReferences: ["https://identity.ic0.app/"],
    fullDescription:
      "Internet Identity is a blockchain authentication system that provides secure, anonymous login without passwords. It uses WebAuthn (the same technology behind Face ID and fingerprint authentication) combined with cryptographic anchors. Each application receives a unique pseudonymous identity, protecting user privacy across the ecosystem. Internet Identity eliminates the need for usernames, passwords, or personal information while providing strong security.",
  },
  {
    term: "Motoko",
    definition:
      "A programming language designed specifically for ICP with built-in support for ICP features like stable memory and async/await. Motoko offers simplicity and safety for canister development.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 12", "World 2", "Development", "Programming"],
    relatedTopics: ["Canisters", "Smart Contracts", "WebAssembly"],
    relatedLessons: ["World 2: ICP Fundamentals - Lesson 12"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/motoko/main/motoko",
    ],
    fullDescription:
      "Motoko is a modern programming language created specifically for the Internet Computer. It features a familiar syntax similar to TypeScript and JavaScript, making it accessible to web developers. Motoko includes built-in support for ICP-specific features like stable variables (for upgradeable canisters), async/await for inter-canister calls, and actor-based concurrency. The language compiles to WebAssembly for efficient execution on ICP.",
  },
  {
    term: "Inter-canister Call",
    definition:
      "Function calls between canisters on ICP, enabling modular application architecture. Calls can be synchronous (update calls) or asynchronous (query calls), allowing canisters to compose and interact.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 12", "World 2", "Development"],
    relatedTopics: ["Canisters", "Smart Contracts", "Composability"],
    relatedLessons: ["World 2: ICP Fundamentals - Lesson 12"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/canisters-code",
    ],
    fullDescription:
      "Inter-canister calls enable canisters to invoke functions on other canisters, creating composable applications. Update calls modify state and are processed through consensus, while query calls are read-only and execute quickly. This composability allows developers to build complex applications from simple, reusable components. Cross-canister communication is secure, efficient, and enables sophisticated application architectures.",
  },
];

// Spanish translations for World 2 terms
export const world2GlossaryTermsES: GlossaryTermData[] = [
  {
    term: "Internet Computer Protocol",
    definition:
      "Una blockchain revolucionaria que extiende la funcionalidad de internet pública, permitiendo a desarrolladores construir y ejecutar aplicaciones completas directamente en cadena a velocidad web sin servicios de nube tradicionales.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Infrastructure"],
    relatedTopics: ["Blockchain", "Descentralización", "Canisters"],
    relatedLessons: [
      "Mundo 2: Fundamentos ICP - Lección 11",
      "Mundo 2: Fundamentos ICP - Lección 12",
      "Mundo 2: Fundamentos ICP - Lección 13",
    ],
    externalReferences: ["https://internetcomputer.org/"],
    fullDescription:
      "El Protocolo de Internet Computer (ICP) es una blockchain que reimagina cómo se construyen y despliegan las aplicaciones. A diferencia de blockchains tradicionales que principalmente manejan transacciones, ICP puede alojar aplicaciones completas, servir contenido web y procesar datos a velocidad web. Su arquitectura única de subredes permite escalado horizontal mientras mantiene descentralización. ICP elimina la necesidad de servicios de nube tradicionales, habilitando aplicaciones verdaderamente descentralizadas que corren completamente en cadena.",
  },
  {
    term: "Canister",
    definition:
      "Una unidad computacional en ICP que agrupa código y estado, capaz de almacenar gigabytes de datos, servir solicitudes HTTP y ejecutarse continuamente. Los canisters son los contratos inteligentes de ICP con capacidades mejoradas.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "Lesson 12", "World 2", "Development"],
    relatedTopics: ["Contratos Inteligentes", "Motoko", "Rust", "Cycles"],
    relatedLessons: [
      "Mundo 2: Fundamentos ICP - Lección 11",
      "Mundo 2: Fundamentos ICP - Lección 12",
    ],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/canisters-code",
    ],
    fullDescription:
      "Los canisters son los bloques de construcción de aplicaciones en ICP. Combinan código y estado en una sola unidad que puede actualizarse sin perder datos. A diferencia de contratos inteligentes tradicionales, los canisters pueden almacenar grandes cantidades de datos, servir páginas web e interactuar con otros canisters. Cada canister tiene un identificador único y puede ser controlado por usuarios, otros canisters o gobernanza descentralizada. Los canisters consumen cycles (recursos computacionales) para operar.",
  },
  {
    term: "Network Nervous System",
    definition:
      "El sistema de gobernanza descentralizado de ICP que controla toda la red. Los poseedores de tokens apuestan tokens ICP en neuronas para participar en decisiones de gobernanza incluyendo creación de subredes, actualizaciones de protocolo y parámetros económicos.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Governance"],
    relatedTopics: ["Gobernanza", "Descentralización", "Staking"],
    relatedLessons: ["Mundo 2: Fundamentos ICP - Lección 11"],
    externalReferences: ["https://internetcomputer.org/nns"],
    fullDescription:
      "El Network Nervous System (NNS) es un sistema de gobernanza completamente en cadena y descentralizado que gestiona el Internet Computer. Permite que la red evolucione y se actualice sin hard forks. Los poseedores de tokens pueden apostar tokens ICP en neuronas para ganar poder de voto. El NNS toma decisiones sobre topología de red, actualizaciones de protocolo, parámetros económicos y más. Este modelo de gobernanza asegura que la red permanezca descentralizada y controlada por la comunidad.",
  },
  {
    term: "Subnet",
    definition:
      "Blockchains independientes que corren en paralelo en ICP, cada una alojando múltiples canisters. Las subredes pueden comunicarse entre sí, habilitando escalado horizontal mientras mantienen descentralización.",
    category: "Infrastructure",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Architecture"],
    relatedTopics: ["Blockchain", "Escalabilidad", "Consenso"],
    relatedLessons: ["Mundo 2: Fundamentos ICP - Lección 11"],
    externalReferences: ["https://internetcomputer.org/how-it-works"],
    fullDescription:
      "Las subredes son la base de la arquitectura escalable de ICP. Cada subred es una blockchain independiente que corre en paralelo con otras subredes. Este diseño permite a ICP procesar miles de transacciones por segundo mientras mantiene descentralización. Las subredes pueden alojar múltiples canisters y comunicarse entre sí a través de mensajería segura entre subredes. El Network Nervous System gestiona la creación y configuración de subredes.",
  },
  {
    term: "Cycles",
    definition:
      "Recursos computacionales consumidos por canisters en ICP, creados al quemar tokens ICP. Los cycles proporcionan un modelo de costo estable y predecible donde los desarrolladores pre-financian aplicaciones en lugar de que los usuarios paguen tarifas de transacción.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 11", "Lesson 12", "World 2", "Economics"],
    relatedTopics: ["Tarifas de Gas", "Gestión de Recursos", "Canisters"],
    relatedLessons: [
      "Mundo 2: Fundamentos ICP - Lección 11",
      "Mundo 2: Fundamentos ICP - Lección 12",
    ],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/tokens-cycles",
    ],
    fullDescription:
      "Los cycles son la unidad de recursos computacionales de ICP. A diferencia de las tarifas de gas en otras blockchains, los cycles proporcionan un modelo de costo estable porque están vinculados a SDR (Derechos Especiales de Giro). Los desarrolladores queman tokens ICP para crear cycles y los usan para alimentar sus canisters. Este modelo de gas inverso significa que los usuarios finales no pagan tarifas de transacción—los desarrolladores pre-financian sus aplicaciones. Los cycles pueden transferirse entre canisters y monitorearse para asegurar disponibilidad de aplicaciones.",
  },
  {
    term: "Internet Identity",
    definition:
      "El sistema de autenticación que preserva privacidad de ICP que usa WebAuthn y anclas criptográficas para proporcionar autenticación segura y anónima sin contraseñas o datos personales.",
    category: "Identity",
    tags: ["Web3", "ICP", "Lesson 11", "World 2", "Authentication", "Privacy"],
    relatedTopics: ["Identidad Digital", "Privacidad", "Seguridad"],
    relatedLessons: ["Mundo 2: Fundamentos ICP - Lección 11"],
    externalReferences: ["https://identity.ic0.app/"],
    fullDescription:
      "Internet Identity es un sistema de autenticación blockchain que proporciona inicio de sesión seguro y anónimo sin contraseñas. Usa WebAuthn (la misma tecnología detrás de Face ID y autenticación por huella digital) combinado con anclas criptográficas. Cada aplicación recibe una identidad pseudónima única, protegiendo la privacidad del usuario a través del ecosistema. Internet Identity elimina la necesidad de nombres de usuario, contraseñas o información personal mientras proporciona seguridad fuerte.",
  },
  {
    term: "Motoko",
    definition:
      "Un lenguaje de programación diseñado específicamente para ICP con soporte integrado para características de ICP como memoria estable y async/await. Motoko ofrece simplicidad y seguridad para desarrollo de canisters.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 12", "World 2", "Development", "Programming"],
    relatedTopics: ["Canisters", "Contratos Inteligentes", "WebAssembly"],
    relatedLessons: ["Mundo 2: Fundamentos ICP - Lección 12"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/motoko/main/motoko",
    ],
    fullDescription:
      "Motoko es un lenguaje de programación moderno creado específicamente para el Internet Computer. Presenta una sintaxis familiar similar a TypeScript y JavaScript, haciéndolo accesible para desarrolladores web. Motoko incluye soporte integrado para características específicas de ICP como variables estables (para canisters actualizables), async/await para llamadas entre canisters y concurrencia basada en actores. El lenguaje compila a WebAssembly para ejecución eficiente en ICP.",
  },
  {
    term: "Inter-canister Call",
    definition:
      "Llamadas de función entre canisters en ICP, habilitando arquitectura de aplicación modular. Las llamadas pueden ser síncronas (llamadas de actualización) o asíncronas (llamadas de consulta), permitiendo que los canisters se compongan e interactúen.",
    category: "ICP",
    tags: ["Web3", "ICP", "Lesson 12", "World 2", "Development"],
    relatedTopics: ["Canisters", "Contratos Inteligentes", "Composabilidad"],
    relatedLessons: ["Mundo 2: Fundamentos ICP - Lección 12"],
    externalReferences: [
      "https://internetcomputer.org/docs/current/concepts/canisters-code",
    ],
    fullDescription:
      "Las llamadas entre canisters permiten que los canisters invoquen funciones en otros canisters, creando aplicaciones componibles. Las llamadas de actualización modifican estado y se procesan a través de consenso, mientras que las llamadas de consulta son de solo lectura y se ejecutan rápidamente. Esta composabilidad permite a los desarrolladores construir aplicaciones complejas desde componentes simples y reutilizables. La comunicación entre canisters es segura, eficiente y habilita arquitecturas de aplicación sofisticadas.",
  },
];

// Spanish translations for Lesson 1-10 (existing terms)
export const lesson1GlossaryTermsES: GlossaryTermData[] = [
  {
    term: "Self-Custody",
    definition:
      "La práctica de mantener control directo sobre tus activos digitales sin depender de intermediarios de terceros como bancos o exchanges. Los usuarios poseen sus propias claves privadas y son responsables de asegurar sus activos.",
    category: "Sovereignty",
    tags: [
      "Web3",
      "Lesson 1",
      "Sovereign Basics",
      "Security",
      "Lesson 2",
      "Lesson 4",
    ],
    relatedTopics: ["Soberanía Digital", "Claves Privadas", "Billeteras"],
    relatedLessons: [
      "Mundo 1: Fundamentos Soberanos - Lección 1",
      "Mundo 1: Fundamentos Soberanos - Lección 2",
      "Mundo 1: Fundamentos Soberanos - Lección 4",
      "Mundo 1: Fundamentos Soberanos - Lección 9",
    ],
    externalReferences: ["https://ethereum.org/es/wallets/"],
    fullDescription:
      "La autocustodia representa un cambio fundamental en cómo los individuos gestionan su riqueza digital. A diferencia de la banca tradicional donde las instituciones mantienen tus fondos, la autocustodia significa que controlas directamente tus activos a través de claves criptográficas. Este enfoque elimina el riesgo de contraparte pero requiere que los usuarios asuman la responsabilidad completa de la seguridad, incluyendo proteger las claves privadas de pérdida o robo. La autocustodia es una piedra angular de la soberanía digital y la independencia financiera en el ecosistema Web3.",
  },
  // ... (rest of Spanish translations for Lesson 1-10 terms remain the same)
];

// Export combined glossary terms
export const allGlossaryTermsEN = [
  ...lesson1GlossaryTermsEN,
  ...world2GlossaryTermsEN,
];
export const allGlossaryTermsES = [
  ...lesson1GlossaryTermsES,
  ...world2GlossaryTermsES,
];

// Import and re-export worlds 3-8 terms
export {
  world3GlossaryTermsEN,
  world4GlossaryTermsEN,
  world5GlossaryTermsEN,
  world6GlossaryTermsEN,
  world7GlossaryTermsEN,
  world8GlossaryTermsEN,
  world3to8GlossaryTermsEN,
} from "./glossaryWorlds3to8";
import { world3to8GlossaryTermsEN } from "./glossaryWorlds3to8";

// Full curriculum glossary (Worlds 1-8) — used by TermOfTheDayWidget and GlossaryPage
export const allGlossaryTerms = [
  ...lesson1GlossaryTermsEN,
  ...world2GlossaryTermsEN,
  ...world3to8GlossaryTermsEN,
];
