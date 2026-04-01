// World 2: ICP Fundamentals - Lessons 11-20
// Complete English lesson content with objectives, sections, quizzes, and rewards

import type { LessonContent } from "../lessonContent";

export const world2LessonsEN: LessonContent[] = [
  {
    id: 11,
    title: "Introduction to Internet Computer",
    description:
      "Discover the World Computer and its revolutionary architecture",
    duration: "20 min",
    objectives: [
      "Understand what the Internet Computer is",
      "Learn how ICP differs from other blockchains",
      "Discover the vision of the World Computer",
      "Explore ICP's unique capabilities",
    ],
    content: {
      introduction:
        "The Internet Computer Protocol (ICP) is a revolutionary blockchain that extends the internet with decentralized computation. It's not just another blockchain—it's a complete reimagining of how we build and run software.",
      sections: [
        {
          title: "What is the Internet Computer?",
          content:
            "The Internet Computer is a blockchain that runs at web speed, serving web content directly to users without cloud providers. It's designed to host entire applications—frontend, backend, and data—completely on-chain. ICP aims to replace traditional IT infrastructure with a decentralized alternative.",
        },
        {
          title: "How ICP Differs",
          content:
            "Unlike Ethereum (which runs small smart contracts), ICP runs full-stack applications. Unlike Bitcoin (which processes simple transactions), ICP executes complex computations. ICP achieves web-speed performance through a novel architecture of subnets, canisters, and chain-key cryptography.",
        },
        {
          title: "The World Computer Vision",
          content:
            'ICP envisions a future where all software runs on a decentralized network, not corporate servers. Users control their data. Developers deploy without cloud bills. Applications are unstoppable and tamper-proof. This is the "World Computer"—a global, decentralized computing platform.',
        },
        {
          title: "Unique Capabilities",
          content:
            "ICP offers capabilities impossible on other blockchains: serving web content directly, storing unlimited data, running at web speed, integrating with Web2 APIs, and enabling true decentralized autonomous organizations. These features make ICP suitable for mainstream applications.",
        },
      ],
      conclusion:
        "The Internet Computer represents a paradigm shift from blockchain as a database to blockchain as a complete computing platform.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What makes ICP different from Ethereum?",
          options: [
            "ICP is faster",
            "ICP runs full-stack applications, not just smart contracts",
            "ICP is cheaper",
            "ICP is older",
          ],
          correctAnswer: 1,
          explanation:
            "ICP is designed to run complete full-stack applications (frontend, backend, data) on-chain, unlike Ethereum which primarily runs smart contracts.",
        },
        {
          id: "q2",
          question: 'What is the "World Computer" vision?',
          options: [
            "A faster computer",
            "A global, decentralized computing platform replacing traditional IT",
            "A new operating system",
            "A cloud provider",
          ],
          correctAnswer: 1,
          explanation:
            "The World Computer vision is a global, decentralized computing platform that replaces traditional IT infrastructure and cloud providers.",
        },
        {
          id: "q3",
          question:
            "What unique capability does ICP have that other blockchains don't?",
          options: [
            "Mining",
            "Serving web content directly to users",
            "Proof of Work",
            "Token transfers",
          ],
          correctAnswer: 1,
          explanation:
            "ICP can serve web content directly to users without intermediaries, a capability unique among blockchains.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 12,
    title: "Canisters: Smart Contracts Evolved",
    description: "Master ICP's powerful computational units",
    duration: "20 min",
    objectives: [
      "Understand what canisters are",
      "Learn canister capabilities and limits",
      "Discover canister lifecycle",
      "Explore canister communication",
    ],
    content: {
      introduction:
        "Canisters are ICP's evolution of smart contracts. They're powerful computational units that can store gigabytes of data, serve web pages, and communicate with each other and the outside world.",
      sections: [
        {
          title: "What are Canisters?",
          content:
            "Canisters are smart contracts on steroids. Each canister is a bundle of WebAssembly code and memory that runs on ICP. Unlike traditional smart contracts limited to simple logic, canisters can run complex applications, store large amounts of data, and serve content directly to users.",
        },
        {
          title: "Capabilities and Limits",
          content:
            "Canisters can store up to 400GB of data (and growing), execute billions of instructions per message, serve HTTP requests directly, make HTTP outcalls to Web2 APIs, and communicate with other canisters. They're limited by cycles (ICP's gas) and subnet capacity.",
        },
        {
          title: "Canister Lifecycle",
          content:
            "Canisters are created by deploying WebAssembly code. They must be funded with cycles to pay for computation and storage. Developers can upgrade canister code while preserving state. Canisters can be frozen (paused) or deleted. Controllers manage canister permissions.",
        },
        {
          title: "Inter-Canister Communication",
          content:
            "Canisters communicate through asynchronous messages. They can call functions on other canisters, even across subnets. This enables modular architectures where specialized canisters handle different tasks. Communication is secure and guaranteed by the protocol.",
        },
      ],
      conclusion:
        "Canisters transform smart contracts from simple scripts into powerful, scalable applications capable of replacing traditional backend services.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "How much data can a canister store?",
          options: ["1MB", "100MB", "Up to 400GB", "Unlimited"],
          correctAnswer: 2,
          explanation:
            "Canisters can store up to 400GB of data (and this limit is increasing), far more than traditional smart contracts.",
        },
        {
          id: "q2",
          question: "What powers canister computation and storage?",
          options: ["Electricity", "Cycles (ICP's gas)", "Tokens", "Mining"],
          correctAnswer: 1,
          explanation:
            "Canisters are powered by cycles, ICP's equivalent of gas, which pay for computation and storage.",
        },
        {
          id: "q3",
          question: "How do canisters communicate with each other?",
          options: [
            "Through HTTP",
            "Through asynchronous messages",
            "Through email",
            "They can't communicate",
          ],
          correctAnswer: 1,
          explanation:
            "Canisters communicate through asynchronous messages, enabling modular architectures and cross-canister calls.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 13,
    title: "Network Nervous System (NNS)",
    description: "Explore ICP's decentralized governance system",
    duration: "20 min",
    objectives: [
      "Understand what the NNS is",
      "Learn how governance works on ICP",
      "Discover neurons and voting",
      "Explore proposal types and execution",
    ],
    content: {
      introduction:
        "The Network Nervous System (NNS) is ICP's decentralized autonomous organization that governs the entire network. It's one of the most advanced on-chain governance systems in existence.",
      sections: [
        {
          title: "What is the NNS?",
          content:
            "The NNS is a fully on-chain DAO that controls the Internet Computer. It makes all network decisions: upgrading protocol, adding nodes, setting parameters, and managing the treasury. The NNS itself runs as a set of canisters on ICP, making it completely decentralized.",
        },
        {
          title: "How Governance Works",
          content:
            "ICP holders can stake their tokens in neurons to participate in governance. Neurons vote on proposals. Voting power depends on stake amount, lock-up period, and age. This liquid democracy allows delegation—you can follow other neurons on topics you don't understand.",
        },
        {
          title: "Neurons and Voting",
          content:
            "Creating a neuron requires locking ICP for a minimum period. Longer lock-ups earn higher voting rewards. Neurons can vote manually or follow other neurons. Voting rewards incentivize participation. Neurons can be dissolved after their lock-up period expires.",
        },
        {
          title: "Proposals and Execution",
          content:
            "Anyone can submit proposals (with a small fee to prevent spam). Proposal types include: network upgrades, node management, parameter changes, and treasury disbursements. Approved proposals execute automatically—the NNS directly controls the network. This is true decentralized governance.",
        },
      ],
      conclusion:
        "The NNS demonstrates that decentralized governance can work at scale, managing a complex network through community consensus.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the Network Nervous System?",
          options: [
            "A mining algorithm",
            "ICP's decentralized governance system",
            "A wallet",
            "A programming language",
          ],
          correctAnswer: 1,
          explanation:
            "The NNS is ICP's fully on-chain decentralized autonomous organization that governs the entire network.",
        },
        {
          id: "q2",
          question: "What are neurons?",
          options: [
            "Network nodes",
            "Staked ICP tokens used for governance voting",
            "Smart contracts",
            "Miners",
          ],
          correctAnswer: 1,
          explanation:
            "Neurons are staked ICP tokens that give holders voting power in network governance.",
        },
        {
          id: "q3",
          question: "What happens when a proposal is approved by the NNS?",
          options: [
            "Nothing",
            "It executes automatically on-chain",
            "Developers must implement it",
            "It goes to another vote",
          ],
          correctAnswer: 1,
          explanation:
            "Approved NNS proposals execute automatically on-chain—the NNS directly controls the network, enabling true decentralized governance.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 14,
    title: "Subnets and Scalability",
    description: "Learn how ICP achieves unlimited scalability",
    duration: "22 min",
    objectives: [
      "Understand ICP's subnet architecture",
      "Learn how subnets enable scalability",
      "Discover cross-subnet communication",
      "Explore subnet types and specialization",
    ],
    content: {
      introduction:
        "ICP achieves unlimited scalability through subnets—independent blockchains that run in parallel. This architecture allows ICP to scale horizontally by adding more subnets.",
      sections: [
        {
          title: "Subnet Architecture",
          content:
            "ICP consists of multiple subnet blockchains running in parallel. Each subnet is a blockchain operated by a set of node machines. Subnets run independently but are coordinated by the NNS. Canisters are deployed to specific subnets. This architecture enables horizontal scaling.",
        },
        {
          title: "How Subnets Enable Scalability",
          content:
            "Each subnet can process transactions independently. Adding more subnets increases total network capacity linearly. Unlike single-chain blockchains that hit throughput limits, ICP can scale indefinitely by adding subnets. The NNS manages subnet creation and node assignment.",
        },
        {
          title: "Cross-Subnet Communication",
          content:
            "Canisters on different subnets can communicate through XNet messaging. Messages are routed through the ICP protocol with guaranteed delivery. This enables complex applications spanning multiple subnets. Cross-subnet calls are slightly slower than intra-subnet calls but still fast.",
        },
        {
          title: "Subnet Specialization",
          content:
            "Different subnets can have different characteristics. System subnets run NNS and core infrastructure. Application subnets host user applications. Some subnets might optimize for throughput, others for security. This specialization allows ICP to serve diverse use cases efficiently.",
        },
      ],
      conclusion:
        "Subnet architecture is ICP's secret weapon for scalability, enabling the network to grow without hitting the limits that plague other blockchains.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What are subnets in ICP?",
          options: [
            "Mining pools",
            "Independent blockchains running in parallel",
            "Smart contracts",
            "Wallets",
          ],
          correctAnswer: 1,
          explanation:
            "Subnets are independent blockchains that run in parallel, enabling ICP to scale horizontally.",
        },
        {
          id: "q2",
          question: "How does ICP achieve unlimited scalability?",
          options: [
            "Faster computers",
            "By adding more subnets to increase capacity",
            "Larger blocks",
            "Proof of Work",
          ],
          correctAnswer: 1,
          explanation:
            "ICP scales by adding more subnets, each processing transactions independently, enabling linear scalability.",
        },
        {
          id: "q3",
          question: "How do canisters on different subnets communicate?",
          options: [
            "They can't",
            "Through XNet messaging",
            "Through HTTP",
            "Through email",
          ],
          correctAnswer: 1,
          explanation:
            "Canisters on different subnets communicate through XNet messaging, which is routed by the ICP protocol with guaranteed delivery.",
        },
      ],
    },
    xpReward: 90,
    creditsReward: 9,
  },
  {
    id: 15,
    title: "Chain-Key Cryptography",
    description: "Discover ICP's revolutionary cryptographic innovation",
    duration: "22 min",
    objectives: [
      "Understand chain-key cryptography",
      "Learn about threshold signatures",
      "Discover non-interactive DKG",
      "Explore chain-key benefits",
    ],
    content: {
      introduction:
        "Chain-key cryptography is ICP's breakthrough innovation that enables web-speed finality, seamless subnet scaling, and light client verification. It's the cryptographic foundation that makes ICP possible.",
      sections: [
        {
          title: "What is Chain-Key Cryptography?",
          content:
            "Chain-key cryptography allows the entire state of ICP to be validated using a single public key. This key remains constant even as nodes join and leave. It enables instant finality, light clients, and seamless scaling. It's a suite of advanced cryptographic protocols working together.",
        },
        {
          title: "Threshold Signatures",
          content:
            "ICP uses threshold BLS signatures where a subnet's nodes collectively hold a private key. Any threshold of nodes (e.g., 2/3) can create a valid signature, but individual nodes can't. This enables fast consensus without traditional blockchain mining or long confirmation times.",
        },
        {
          title: "Non-Interactive DKG",
          content:
            "Distributed Key Generation (DKG) allows nodes to collectively generate keys without any single node knowing the complete private key. ICP's non-interactive DKG enables seamless node replacement and subnet scaling without disrupting operations. This is crucial for network evolution.",
        },
        {
          title: "Chain-Key Benefits",
          content:
            "Benefits include: instant finality (2 seconds), light client support (verify with just the public key), seamless scaling (add nodes without disruption), and cross-chain integration (ICP can sign for other blockchains). These capabilities are impossible with traditional blockchain cryptography.",
        },
      ],
      conclusion:
        "Chain-key cryptography is the cryptographic breakthrough that enables ICP to achieve what other blockchains cannot.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What does chain-key cryptography enable?",
          options: [
            "Mining",
            "Validating ICP state with a single public key",
            "Proof of Work",
            "Token transfers",
          ],
          correctAnswer: 1,
          explanation:
            "Chain-key cryptography allows the entire ICP state to be validated using a single public key, enabling instant finality and light clients.",
        },
        {
          id: "q2",
          question: "What are threshold signatures?",
          options: [
            "Very large signatures",
            "Signatures created collectively by a threshold of nodes",
            "Encrypted signatures",
            "Fast signatures",
          ],
          correctAnswer: 1,
          explanation:
            "Threshold signatures are created collectively by a threshold of nodes (e.g., 2/3), enabling fast consensus without traditional mining.",
        },
        {
          id: "q3",
          question: "How fast is finality on ICP?",
          options: ["10 minutes", "1 minute", "2 seconds", "1 hour"],
          correctAnswer: 2,
          explanation:
            "ICP achieves instant finality in about 2 seconds, thanks to chain-key cryptography and threshold signatures.",
        },
      ],
    },
    xpReward: 90,
    creditsReward: 9,
  },
  {
    id: 16,
    title: "Cycles: ICP's Reverse Gas Model",
    description: "Learn ICP's innovative approach to computation costs",
    duration: "20 min",
    objectives: [
      "Understand what cycles are",
      "Learn the reverse gas model",
      "Discover cycle management",
      "Compare cycles to traditional gas",
    ],
    content: {
      introduction:
        "Cycles are ICP's fuel for computation, but they work differently than gas on other blockchains. ICP's reverse gas model enables better user experience and predictable costs.",
      sections: [
        {
          title: "What are Cycles?",
          content:
            "Cycles are ICP's unit of computation cost. They're created by burning ICP tokens at a fixed rate (1 trillion cycles per SDR). Cycles pay for canister computation, storage, and network bandwidth. Unlike gas prices that fluctuate, cycle costs are stable and predictable.",
        },
        {
          title: "The Reverse Gas Model",
          content:
            'In traditional blockchains, users pay gas for each transaction. On ICP, canisters pay for their own computation using their cycle balance. This "reverse gas model" means users don\'t need tokens to use applications—developers cover the costs. This enables mainstream adoption.',
        },
        {
          title: "Cycle Management",
          content:
            "Developers fund canisters with cycles. Canisters automatically deduct cycles for operations. Developers can top up canisters or implement mechanisms for users to contribute cycles. Canisters can transfer cycles to each other. Monitoring cycle balance is crucial to prevent canister freezing.",
        },
        {
          title: "Cycles vs Traditional Gas",
          content:
            "Traditional gas: users pay per transaction, prices fluctuate wildly, requires holding native tokens. Cycles: developers pay, costs are stable and predictable, users don't need tokens. The reverse gas model removes a major barrier to mainstream blockchain adoption.",
        },
      ],
      conclusion:
        "Cycles and the reverse gas model demonstrate ICP's focus on user experience and mainstream adoption, not just technical innovation.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the reverse gas model?",
          options: [
            "Gas that goes backwards",
            "Canisters pay for computation instead of users",
            "Cheaper gas",
            "Faster gas",
          ],
          correctAnswer: 1,
          explanation:
            "In the reverse gas model, canisters pay for their own computation using cycles, so users don't need tokens to use applications.",
        },
        {
          id: "q2",
          question: "How are cycles created?",
          options: [
            "By mining",
            "By burning ICP tokens at a fixed rate",
            "By staking",
            "By voting",
          ],
          correctAnswer: 1,
          explanation:
            "Cycles are created by burning ICP tokens at a fixed rate (1 trillion cycles per SDR), providing stable and predictable costs.",
        },
        {
          id: "q3",
          question: "What advantage does the reverse gas model provide?",
          options: [
            "Faster transactions",
            "Users don't need tokens to use applications",
            "Lower costs",
            "Better security",
          ],
          correctAnswer: 1,
          explanation:
            "The reverse gas model means users don't need to hold tokens to use applications, removing a major barrier to mainstream adoption.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 17,
    title: "Internet Identity",
    description: "Master ICP's passwordless authentication system",
    duration: "20 min",
    objectives: [
      "Understand Internet Identity",
      "Learn how it works technically",
      "Discover privacy and security benefits",
      "Explore integration with applications",
    ],
    content: {
      introduction:
        "Internet Identity is ICP's revolutionary authentication system that eliminates passwords while providing privacy and security. It's Web3 authentication done right.",
      sections: [
        {
          title: "What is Internet Identity?",
          content:
            "Internet Identity is a blockchain-based authentication system that uses your device's biometrics (fingerprint, face ID) or security keys. No passwords, no email, no personal information required. Each application sees a different identity, protecting your privacy.",
        },
        {
          title: "How It Works",
          content:
            "You create an Internet Identity using your device's secure hardware (TPM, Secure Enclave). This generates cryptographic keys stored securely on your device. When authenticating, you prove control of your device through biometrics. The system generates application-specific identities for privacy.",
        },
        {
          title: "Privacy and Security",
          content:
            "Internet Identity provides strong privacy: each application sees a different identity, preventing tracking across services. It's secure: keys never leave your device, biometrics are processed locally, and there's no central database to hack. You can add multiple devices for redundancy.",
        },
        {
          title: "Application Integration",
          content:
            "Developers integrate Internet Identity with a few lines of code. Users authenticate with a single click and biometric confirmation. No need to manage passwords, email verification, or account recovery flows. This dramatically improves user experience while enhancing security.",
        },
      ],
      conclusion:
        "Internet Identity shows that Web3 authentication can be more secure and user-friendly than Web2, not less.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What does Internet Identity use instead of passwords?",
          options: [
            "Email",
            "Device biometrics or security keys",
            "Phone numbers",
            "Social media",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity uses your device's biometrics (fingerprint, face ID) or security keys, eliminating the need for passwords.",
        },
        {
          id: "q2",
          question: "How does Internet Identity protect privacy?",
          options: [
            "By encrypting data",
            "Each application sees a different identity",
            "By hiding your IP",
            "By using VPN",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity generates application-specific identities, so each application sees a different identity, preventing tracking across services.",
        },
        {
          id: "q3",
          question: "Where are Internet Identity keys stored?",
          options: [
            "On ICP blockchain",
            "Securely on your device",
            "On a central server",
            "In the cloud",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity keys are stored securely on your device using secure hardware (TPM, Secure Enclave) and never leave your device.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 18,
    title: "Motoko Programming Language",
    description: "Introduction to ICP's native smart contract language",
    duration: "22 min",
    objectives: [
      "Understand what Motoko is",
      "Learn Motoko's key features",
      "Discover actor model programming",
      "Compare Motoko to other languages",
    ],
    content: {
      introduction:
        "Motoko is a programming language designed specifically for the Internet Computer. It makes building secure, efficient canisters easier than using general-purpose languages.",
      sections: [
        {
          title: "What is Motoko?",
          content:
            "Motoko is a modern, type-safe language created by DFINITY for ICP development. It compiles to WebAssembly and is optimized for canister development. Motoko handles ICP-specific concerns like orthogonal persistence, async messaging, and cycle management automatically.",
        },
        {
          title: "Key Features",
          content:
            "Motoko offers: strong static typing for safety, orthogonal persistence (state automatically persists), async/await for inter-canister calls, pattern matching for elegant code, and built-in support for ICP primitives. It's designed to prevent common smart contract bugs.",
        },
        {
          title: "Actor Model Programming",
          content:
            "Motoko uses the actor model: each canister is an actor that processes messages asynchronously. Actors have private state and communicate through messages. This model naturally maps to ICP's architecture and makes concurrent programming safer and easier.",
        },
        {
          title: "Motoko vs Other Languages",
          content:
            "Compared to Solidity: Motoko is more modern and type-safe. Compared to Rust: Motoko is simpler and ICP-specific. You can also use Rust, TypeScript, or Python on ICP, but Motoko provides the best developer experience for canister development.",
        },
      ],
      conclusion:
        "Motoko demonstrates that blockchain-specific languages can make development safer, easier, and more productive than adapting general-purpose languages.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is Motoko?",
          options: [
            "A wallet",
            "A programming language designed for ICP",
            "A consensus mechanism",
            "A token",
          ],
          correctAnswer: 1,
          explanation:
            "Motoko is a modern, type-safe programming language created specifically for developing canisters on the Internet Computer.",
        },
        {
          id: "q2",
          question: "What is orthogonal persistence?",
          options: [
            "Fast storage",
            "State automatically persists without explicit save operations",
            "Encrypted storage",
            "Distributed storage",
          ],
          correctAnswer: 1,
          explanation:
            "Orthogonal persistence means canister state automatically persists across upgrades without developers needing to explicitly save data.",
        },
        {
          id: "q3",
          question: "What programming model does Motoko use?",
          options: [
            "Object-oriented",
            "Functional",
            "Actor model",
            "Procedural",
          ],
          correctAnswer: 2,
          explanation:
            "Motoko uses the actor model where each canister is an actor that processes messages asynchronously, naturally mapping to ICP's architecture.",
        },
      ],
    },
    xpReward: 90,
    creditsReward: 9,
  },
  {
    id: 19,
    title: "HTTP Outcalls and Web2 Integration",
    description: "Learn how ICP connects to the traditional web",
    duration: "20 min",
    objectives: [
      "Understand HTTP outcalls",
      "Learn how canisters call Web2 APIs",
      "Discover consensus on external data",
      "Explore integration use cases",
    ],
    content: {
      introduction:
        "HTTP outcalls enable ICP canisters to directly interact with Web2 services and APIs. This bridges the gap between Web3 and Web2, enabling hybrid applications.",
      sections: [
        {
          title: "What are HTTP Outcalls?",
          content:
            "HTTP outcalls allow canisters to make HTTPS requests to external Web2 services. Canisters can call REST APIs, fetch web pages, interact with databases, and more. This is impossible on most blockchains, which are isolated from the external world.",
        },
        {
          title: "How It Works",
          content:
            "When a canister makes an HTTP outcall, multiple nodes independently make the request. They compare responses and reach consensus on the result. This ensures the external data is trustworthy and prevents individual nodes from lying. The consensus mechanism maintains blockchain security.",
        },
        {
          title: "Consensus on External Data",
          content:
            "Reaching consensus on external data is challenging because Web2 services aren't deterministic. ICP uses transformation functions to normalize responses and threshold signatures to verify consensus. This allows canisters to trustlessly incorporate external data.",
        },
        {
          title: "Integration Use Cases",
          content:
            "HTTP outcalls enable: price oracles (fetch crypto prices), weather data, social media integration, payment processing, email notifications, and more. This makes ICP suitable for real-world applications that need to interact with existing Web2 infrastructure.",
        },
      ],
      conclusion:
        "HTTP outcalls demonstrate ICP's vision of extending the internet, not replacing it—enabling seamless integration between Web3 and Web2.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What are HTTP outcalls?",
          options: [
            "Internal canister calls",
            "Canisters making HTTPS requests to external Web2 services",
            "User requests",
            "Subnet communication",
          ],
          correctAnswer: 1,
          explanation:
            "HTTP outcalls allow canisters to make HTTPS requests to external Web2 services and APIs, bridging Web3 and Web2.",
        },
        {
          id: "q2",
          question: "How does ICP ensure external data is trustworthy?",
          options: [
            "By trusting one node",
            "Multiple nodes make the request and reach consensus on the result",
            "By caching data",
            "By encrypting data",
          ],
          correctAnswer: 1,
          explanation:
            "Multiple nodes independently make the HTTP request and reach consensus on the result, ensuring the external data is trustworthy.",
        },
        {
          id: "q3",
          question: "What use case do HTTP outcalls enable?",
          options: [
            "Faster transactions",
            "Price oracles and integration with Web2 services",
            "Lower costs",
            "Better security",
          ],
          correctAnswer: 1,
          explanation:
            "HTTP outcalls enable use cases like price oracles, weather data, social media integration, and other Web2 service interactions.",
        },
      ],
    },
    xpReward: 80,
    creditsReward: 8,
  },
  {
    id: 20,
    title: "Mega Quiz: ICP Fundamentals Mastery",
    description: "Demonstrate complete understanding of Internet Computer",
    duration: "30 min",
    objectives: [
      "Prove mastery of all World 2 concepts",
      "Apply ICP knowledge to real scenarios",
      "Understand ICP's unique architecture",
      "Achieve World 2 completion",
    ],
    content: {
      introduction:
        "Congratulations on completing World 2! This mega quiz tests your comprehensive understanding of the Internet Computer Protocol. Show your mastery of ICP fundamentals.",
      sections: [
        {
          title: "Comprehensive ICP Assessment",
          content:
            "This quiz covers all ten lessons: Internet Computer introduction, canisters, NNS governance, subnets, chain-key cryptography, cycles, Internet Identity, Motoko, HTTP outcalls, and Web2 integration. You'll need deep understanding of ICP's unique architecture.",
        },
        {
          title: "Real-World Application",
          content:
            "Beyond theory, you'll apply your knowledge to practical scenarios. How would you architect an application on ICP? What trade-offs would you make? How do ICP's features enable use cases impossible on other blockchains?",
        },
        {
          title: "ICP Mastery",
          content:
            "Passing this quiz proves you understand not just what ICP is, but why it's revolutionary. You grasp how its unique features—canisters, subnets, chain-key cryptography, reverse gas model—work together to create the World Computer.",
        },
      ],
      conclusion:
        "Complete this mega quiz to prove your ICP mastery and unlock World 3: AI Integration!",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What makes ICP different from other blockchains?",
          options: [
            "It's faster",
            "It runs full-stack applications at web speed",
            "It's cheaper",
            "It's older",
          ],
          correctAnswer: 1,
          explanation:
            "ICP is designed to run complete full-stack applications at web speed, unlike other blockchains that primarily run simple smart contracts.",
        },
        {
          id: "q2",
          question: "What are canisters?",
          options: [
            "Storage containers",
            "ICP's powerful computational units that can store data and serve web content",
            "Mining machines",
            "Wallets",
          ],
          correctAnswer: 1,
          explanation:
            "Canisters are ICP's evolution of smart contracts—powerful computational units that can store gigabytes of data and serve web content.",
        },
        {
          id: "q3",
          question: "What does the NNS do?",
          options: [
            "Mines blocks",
            "Governs the entire Internet Computer through decentralized voting",
            "Stores data",
            "Processes transactions",
          ],
          correctAnswer: 1,
          explanation:
            "The Network Nervous System is ICP's fully on-chain DAO that governs the entire network through decentralized voting.",
        },
        {
          id: "q4",
          question: "How does ICP achieve unlimited scalability?",
          options: [
            "Faster computers",
            "By adding more subnets that run in parallel",
            "Larger blocks",
            "Sharding",
          ],
          correctAnswer: 1,
          explanation:
            "ICP scales by adding more subnets (independent blockchains) that run in parallel, enabling linear scalability.",
        },
        {
          id: "q5",
          question: "What is chain-key cryptography?",
          options: [
            "A wallet",
            "Cryptographic innovation enabling instant finality and light clients",
            "A consensus mechanism",
            "An encryption method",
          ],
          correctAnswer: 1,
          explanation:
            "Chain-key cryptography is ICP's breakthrough that enables instant finality, light clients, and seamless scaling through threshold signatures.",
        },
        {
          id: "q6",
          question: "What is the reverse gas model?",
          options: [
            "Cheaper gas",
            "Canisters pay for computation instead of users",
            "Faster gas",
            "No gas",
          ],
          correctAnswer: 1,
          explanation:
            "In the reverse gas model, canisters pay for their own computation using cycles, so users don't need tokens to use applications.",
        },
        {
          id: "q7",
          question: "How does Internet Identity protect privacy?",
          options: [
            "By encrypting everything",
            "Each application sees a different identity",
            "By hiding IP addresses",
            "By using VPN",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity generates application-specific identities, so each application sees a different identity, preventing tracking.",
        },
        {
          id: "q8",
          question: "What is Motoko?",
          options: [
            "A wallet",
            "A programming language designed specifically for ICP",
            "A token",
            "A consensus mechanism",
          ],
          correctAnswer: 1,
          explanation:
            "Motoko is a modern, type-safe programming language created specifically for developing canisters on the Internet Computer.",
        },
        {
          id: "q9",
          question: "What do HTTP outcalls enable?",
          options: [
            "Faster transactions",
            "Canisters to interact with Web2 services and APIs",
            "Lower costs",
            "Better security",
          ],
          correctAnswer: 1,
          explanation:
            "HTTP outcalls allow canisters to make HTTPS requests to external Web2 services, bridging Web3 and Web2.",
        },
        {
          id: "q10",
          question:
            "How do multiple nodes reach consensus on HTTP outcall results?",
          options: [
            "They trust one node",
            "They independently make requests and compare responses",
            "They cache results",
            "They vote",
          ],
          correctAnswer: 1,
          explanation:
            "Multiple nodes independently make the HTTP request and reach consensus on the result, ensuring external data is trustworthy.",
        },
      ],
    },
    xpReward: 150,
    creditsReward: 20,
  },
];
