// World 5: Advanced Development - Lessons 41-50
// Complete English lesson content with objectives, sections, quizzes, and rewards

import type { LessonContent } from "../lessonContent";

export const world5LessonsEN: LessonContent[] = [
  {
    id: 41,
    title: "Advanced Smart Contract Patterns",
    description: "Master complex contract architectures and design patterns",
    duration: "25 min",
    objectives: [
      "Understand advanced contract design patterns",
      "Learn proxy patterns and upgradeable contracts",
      "Master factory and registry patterns",
      "Implement modular contract architectures",
    ],
    content: {
      introduction:
        "Advanced smart contract patterns enable you to build sophisticated, maintainable, and scalable decentralized applications. These patterns solve common architectural challenges in blockchain development.",
      sections: [
        {
          title: "Proxy Patterns",
          content:
            "Proxy patterns separate contract logic from storage, enabling upgrades without losing state. The proxy contract holds the state and delegates calls to an implementation contract. This allows you to fix bugs and add features while preserving user data and addresses.",
        },
        {
          title: "Factory Pattern",
          content:
            "Factory contracts create and manage multiple instances of other contracts. This pattern is essential for platforms that need to deploy many similar contracts (like token launches or NFT collections). Factories track deployed contracts and can enforce standards.",
        },
        {
          title: "Registry Pattern",
          content:
            "Registry contracts maintain a directory of other contracts or addresses. They act as a single source of truth for contract locations, making it easy to update dependencies without changing client code. Registries are crucial for modular systems.",
        },
        {
          title: "Modular Architecture",
          content:
            "Breaking contracts into small, focused modules improves security, testability, and reusability. Each module handles one responsibility and communicates through well-defined interfaces. This approach mirrors microservices in traditional software.",
        },
      ],
      conclusion:
        "Mastering these patterns transforms you from a basic smart contract developer into an architect capable of building production-grade decentralized systems.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the main benefit of the proxy pattern?",
          options: [
            "Faster execution",
            "Lower gas costs",
            "Upgradeable contracts without losing state",
            "Better security",
          ],
          correctAnswer: 2,
          explanation:
            "The proxy pattern allows you to upgrade contract logic while preserving the state and address, solving the immutability challenge of smart contracts.",
        },
        {
          id: "q2",
          question: "What does a factory contract do?",
          options: [
            "Stores data",
            "Creates and manages multiple contract instances",
            "Validates transactions",
            "Manages user accounts",
          ],
          correctAnswer: 1,
          explanation:
            "Factory contracts deploy and track multiple instances of other contracts, essential for platforms that need to create many similar contracts.",
        },
        {
          id: "q3",
          question: "Why use a registry pattern?",
          options: [
            "To save gas",
            "To maintain a directory of contract addresses",
            "To encrypt data",
            "To speed up transactions",
          ],
          correctAnswer: 1,
          explanation:
            "Registry patterns provide a single source of truth for contract locations, making it easy to update dependencies in modular systems.",
        },
        {
          id: "q4",
          question: "What is a key principle of modular architecture?",
          options: [
            "One contract does everything",
            "Each module handles one responsibility",
            "Avoid using interfaces",
            "Maximize contract size",
          ],
          correctAnswer: 1,
          explanation:
            "Modular architecture breaks systems into small, focused modules that each handle one responsibility, improving security and maintainability.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 42,
    title: "Gas Optimization Techniques",
    description: "Build efficient and cost-effective smart contracts",
    duration: "25 min",
    objectives: [
      "Understand gas costs and optimization strategies",
      "Learn storage optimization techniques",
      "Master efficient data structures",
      "Implement gas-saving coding patterns",
    ],
    content: {
      introduction:
        "Gas optimization is critical for user experience and adoption. High transaction costs can make dApps unusable. Learning to write gas-efficient code is a core skill for professional blockchain developers.",
      sections: [
        {
          title: "Understanding Gas Costs",
          content:
            "Every operation in a smart contract costs gas. Storage operations (SSTORE) are the most expensive, followed by computation and memory operations. Reading from storage (SLOAD) is cheaper than writing. Understanding these costs helps you make informed optimization decisions.",
        },
        {
          title: "Storage Optimization",
          content:
            "Pack multiple variables into single storage slots when possible. Use smaller data types (uint8, uint16) instead of uint256 when appropriate. Delete unused storage to get gas refunds. Consider using events for data that doesn't need to be stored on-chain.",
        },
        {
          title: "Efficient Data Structures",
          content:
            "Choose the right data structure for your use case. Mappings are more gas-efficient than arrays for lookups. Use bytes32 instead of strings when possible. Avoid dynamic arrays in storage when you can use fixed-size arrays or mappings.",
        },
        {
          title: "Coding Patterns",
          content:
            "Cache storage variables in memory when reading multiple times. Use unchecked blocks for arithmetic that can't overflow. Batch operations to amortize fixed costs. Use view/pure functions to avoid gas costs for read operations. Short-circuit boolean expressions.",
        },
      ],
      conclusion:
        "Gas optimization is an art that balances efficiency with readability and security. Always profile your contracts and optimize the most expensive operations first.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "Which operation is most expensive in terms of gas?",
          options: [
            "Reading from storage (SLOAD)",
            "Writing to storage (SSTORE)",
            "Memory operations",
            "Arithmetic operations",
          ],
          correctAnswer: 1,
          explanation:
            "Writing to storage (SSTORE) is the most expensive operation, which is why storage optimization is crucial for gas efficiency.",
        },
        {
          id: "q2",
          question: "What is storage packing?",
          options: [
            "Compressing data",
            "Combining multiple variables into single storage slots",
            "Deleting old data",
            "Using external storage",
          ],
          correctAnswer: 1,
          explanation:
            "Storage packing combines multiple smaller variables into single 32-byte storage slots, reducing the number of expensive storage operations.",
        },
        {
          id: "q3",
          question: "When should you cache storage variables?",
          options: [
            "Never",
            "When reading them multiple times in a function",
            "Always",
            "Only for strings",
          ],
          correctAnswer: 1,
          explanation:
            "Caching storage variables in memory when reading them multiple times saves gas by avoiding repeated expensive SLOAD operations.",
        },
        {
          id: "q4",
          question: "Which data structure is more gas-efficient for lookups?",
          options: ["Arrays", "Strings", "Mappings", "Structs"],
          correctAnswer: 2,
          explanation:
            "Mappings provide O(1) lookups and are more gas-efficient than arrays for finding specific elements.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 43,
    title: "Upgradeable Contract Design",
    description: "Create maintainable and evolvable smart contracts",
    duration: "25 min",
    objectives: [
      "Understand upgradeability patterns and trade-offs",
      "Learn transparent and UUPS proxy patterns",
      "Master storage layout management",
      "Implement safe upgrade procedures",
    ],
    content: {
      introduction:
        "Smart contracts are immutable by default, but real-world applications need to evolve. Upgradeable contracts balance immutability's security benefits with the flexibility to fix bugs and add features.",
      sections: [
        {
          title: "Upgradeability Patterns",
          content:
            "The most common pattern uses a proxy contract that delegates calls to an implementation contract. When you need to upgrade, you deploy a new implementation and update the proxy to point to it. This preserves the contract address and state while changing the logic.",
        },
        {
          title: "Transparent vs UUPS Proxies",
          content:
            "Transparent proxies handle upgrade logic in the proxy itself, while UUPS (Universal Upgradeable Proxy Standard) puts upgrade logic in the implementation. UUPS is more gas-efficient but requires careful implementation to avoid bricking the contract.",
        },
        {
          title: "Storage Layout Management",
          content:
            "Upgrades must maintain storage layout compatibility. Never reorder, remove, or change the type of existing storage variables. Only append new variables. Use storage gaps to reserve space for future variables. Tools like OpenZeppelin's upgrade plugins help validate storage safety.",
        },
        {
          title: "Safe Upgrade Procedures",
          content:
            "Test upgrades thoroughly on testnets. Use timelocks to give users notice before upgrades. Implement emergency pause mechanisms. Consider using multi-sig wallets for upgrade authority. Document all storage layout changes. Have a rollback plan.",
        },
      ],
      conclusion:
        "Upgradeable contracts are powerful but complex. Use them when necessary, but always consider whether immutability might be the better choice for your use case.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "How do proxy patterns enable upgradeability?",
          options: [
            "By modifying the original contract",
            "By delegating calls to a replaceable implementation contract",
            "By creating new contracts",
            "By using external storage",
          ],
          correctAnswer: 1,
          explanation:
            "Proxy patterns delegate calls to an implementation contract that can be replaced, preserving the proxy address and state while changing logic.",
        },
        {
          id: "q2",
          question:
            "What is the main advantage of UUPS over transparent proxies?",
          options: [
            "Easier to implement",
            "More secure",
            "More gas-efficient",
            "Better documentation",
          ],
          correctAnswer: 2,
          explanation:
            "UUPS proxies are more gas-efficient because upgrade logic is in the implementation, reducing the proxy's complexity and gas costs.",
        },
        {
          id: "q3",
          question: "What must you never do when upgrading storage layout?",
          options: [
            "Add new variables",
            "Reorder or remove existing variables",
            "Use storage gaps",
            "Test on testnets",
          ],
          correctAnswer: 1,
          explanation:
            "Reordering or removing existing storage variables breaks storage layout compatibility and corrupts contract state.",
        },
        {
          id: "q4",
          question: "Why use timelocks for upgrades?",
          options: [
            "To save gas",
            "To give users notice and time to react",
            "To speed up upgrades",
            "To reduce complexity",
          ],
          correctAnswer: 1,
          explanation:
            "Timelocks give users advance notice of upgrades, allowing them to review changes and exit if they disagree, maintaining trust.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 44,
    title: "Security Best Practices",
    description: "Prevent common vulnerabilities and exploits",
    duration: "30 min",
    objectives: [
      "Understand common smart contract vulnerabilities",
      "Learn reentrancy attack prevention",
      "Master access control and authorization",
      "Implement comprehensive security measures",
    ],
    content: {
      introduction:
        "Smart contract security is paramount. Bugs can lead to millions in losses and are impossible to fix without upgradeability. Learning security best practices is essential for every blockchain developer.",
      sections: [
        {
          title: "Common Vulnerabilities",
          content:
            "Reentrancy attacks exploit external calls to recursively call back into your contract. Integer overflow/underflow can cause unexpected behavior. Front-running allows attackers to profit from seeing pending transactions. Unchecked external calls can fail silently. Understanding these threats is the first step to prevention.",
        },
        {
          title: "Reentrancy Prevention",
          content:
            "Use the checks-effects-interactions pattern: check conditions, update state, then interact with external contracts. Implement reentrancy guards using mutex locks. Consider using pull payment patterns instead of pushing funds. Modern Solidity versions have built-in overflow protection.",
        },
        {
          title: "Access Control",
          content:
            "Implement role-based access control for privileged functions. Use OpenZeppelin's AccessControl or Ownable contracts. Never rely on tx.origin for authorization. Implement multi-signature requirements for critical operations. Use timelocks for sensitive changes.",
        },
        {
          title: "Comprehensive Security",
          content:
            "Validate all inputs and check return values. Use SafeMath or Solidity 0.8+ for arithmetic. Implement circuit breakers for emergencies. Limit contract functionality to reduce attack surface. Get professional audits before mainnet deployment. Monitor contracts post-deployment.",
        },
      ],
      conclusion:
        "Security is not a feature you add at the end—it must be built into every aspect of your contract design and development process.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is a reentrancy attack?",
          options: [
            "Calling a function twice",
            "Recursively calling back into a contract before state updates complete",
            "Overflowing integers",
            "Stealing private keys",
          ],
          correctAnswer: 1,
          explanation:
            "Reentrancy attacks exploit external calls to recursively call back into a contract before state updates complete, potentially draining funds.",
        },
        {
          id: "q2",
          question: "What is the checks-effects-interactions pattern?",
          options: [
            "A testing methodology",
            "Check conditions, update state, then interact externally",
            "A deployment process",
            "A gas optimization technique",
          ],
          correctAnswer: 1,
          explanation:
            "The checks-effects-interactions pattern prevents reentrancy by updating state before making external calls.",
        },
        {
          id: "q3",
          question: "Why should you never use tx.origin for authorization?",
          options: [
            "It's too expensive",
            "It's vulnerable to phishing attacks",
            "It doesn't work",
            "It's deprecated",
          ],
          correctAnswer: 1,
          explanation:
            "tx.origin can be exploited through phishing attacks where a malicious contract tricks users into calling it, bypassing authorization checks.",
        },
        {
          id: "q4",
          question: "What is a circuit breaker in smart contracts?",
          options: [
            "A gas optimization",
            "An emergency pause mechanism",
            "A testing tool",
            "A deployment script",
          ],
          correctAnswer: 1,
          explanation:
            "Circuit breakers are emergency pause mechanisms that allow you to stop contract operations if a vulnerability is discovered.",
        },
      ],
    },
    xpReward: 120,
    creditsReward: 18,
  },
  {
    id: 45,
    title: "Testing and Formal Verification",
    description:
      "Ensure contract correctness and safety through rigorous testing",
    duration: "25 min",
    objectives: [
      "Master unit and integration testing strategies",
      "Learn property-based testing techniques",
      "Understand formal verification methods",
      "Implement comprehensive test coverage",
    ],
    content: {
      introduction:
        "Testing is your first line of defense against bugs. Smart contracts handle real value and can't be easily patched, making thorough testing absolutely critical.",
      sections: [
        {
          title: "Unit and Integration Testing",
          content:
            "Unit tests verify individual functions in isolation. Integration tests check how contracts interact. Use frameworks like Hardhat or Foundry. Test happy paths, edge cases, and failure scenarios. Aim for 100% code coverage, but remember coverage doesn't guarantee correctness.",
        },
        {
          title: "Property-Based Testing",
          content:
            'Instead of testing specific inputs, property-based testing verifies invariants that should always hold. For example, "total supply equals sum of all balances" or "contract balance never goes negative." Tools like Echidna and Foundry\'s fuzzing find edge cases you might miss.',
        },
        {
          title: "Formal Verification",
          content:
            "Formal verification uses mathematical proofs to guarantee contract correctness. Tools like Certora and K Framework can prove that your contract satisfies specified properties. While complex and time-consuming, formal verification provides the highest assurance for critical contracts.",
        },
        {
          title: "Test Coverage Strategy",
          content:
            "Test all state transitions and access control. Verify arithmetic operations don't overflow. Check external call failures are handled. Test upgrade procedures. Simulate attack scenarios. Use continuous integration to run tests automatically. Document test cases and their rationale.",
        },
      ],
      conclusion:
        "Comprehensive testing catches bugs before they reach production. Invest time in testing—it's always cheaper than fixing exploits.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question:
            "What is the difference between unit and integration tests?",
          options: [
            "Unit tests are faster",
            "Unit tests verify individual functions, integration tests check interactions",
            "Integration tests are more important",
            "There is no difference",
          ],
          correctAnswer: 1,
          explanation:
            "Unit tests verify individual functions in isolation, while integration tests check how multiple contracts or components interact.",
        },
        {
          id: "q2",
          question: "What does property-based testing verify?",
          options: [
            "Specific input-output pairs",
            "Invariants that should always hold",
            "Gas costs",
            "Code style",
          ],
          correctAnswer: 1,
          explanation:
            "Property-based testing verifies invariants that should always hold true, regardless of specific inputs, finding edge cases through fuzzing.",
        },
        {
          id: "q3",
          question: "What is formal verification?",
          options: [
            "Manual code review",
            "Mathematical proofs of contract correctness",
            "Automated testing",
            "Gas optimization",
          ],
          correctAnswer: 1,
          explanation:
            "Formal verification uses mathematical proofs to guarantee that a contract satisfies specified properties, providing the highest level of assurance.",
        },
        {
          id: "q4",
          question: "Does 100% code coverage guarantee bug-free code?",
          options: [
            "Yes, always",
            "No, coverage measures execution but not correctness",
            "Only for simple contracts",
            "Only with formal verification",
          ],
          correctAnswer: 1,
          explanation:
            "Code coverage measures which lines are executed but doesn't guarantee correctness—you still need to test the right scenarios and edge cases.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 46,
    title: "Frontend Integration",
    description: "Build user interfaces for decentralized applications",
    duration: "25 min",
    objectives: [
      "Learn Web3 library integration (ethers.js, web3.js)",
      "Master wallet connection and transaction signing",
      "Implement real-time blockchain data updates",
      "Handle errors and edge cases gracefully",
    ],
    content: {
      introduction:
        "A great smart contract needs a great user interface. Frontend integration bridges the gap between blockchain technology and user experience, making dApps accessible to everyone.",
      sections: [
        {
          title: "Web3 Libraries",
          content:
            "Libraries like ethers.js and web3.js provide JavaScript interfaces to interact with blockchains. They handle RPC connections, transaction formatting, and ABI encoding/decoding. Ethers.js is lightweight and modern, while web3.js has broader ecosystem support. Choose based on your needs.",
        },
        {
          title: "Wallet Connection",
          content:
            "Use libraries like RainbowKit or Web3Modal to support multiple wallets. Request account access with proper permissions. Handle wallet switching and network changes. Store connection state in React context or state management. Always verify the connected network matches your contract deployment.",
        },
        {
          title: "Real-Time Updates",
          content:
            "Listen to contract events using event listeners or WebSocket connections. Poll for state changes when events aren't available. Use libraries like React Query or SWR for data fetching and caching. Implement optimistic updates for better UX, but always verify on-chain state.",
        },
        {
          title: "Error Handling",
          content:
            "Handle wallet rejections gracefully. Display clear error messages for failed transactions. Implement retry logic for network issues. Show transaction status (pending, confirmed, failed). Handle edge cases like insufficient gas, slippage, and deadline expiration. Always validate user inputs before sending transactions.",
        },
      ],
      conclusion:
        "Great frontend integration makes blockchain technology invisible to users. Focus on UX, handle errors gracefully, and always prioritize security.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What do Web3 libraries like ethers.js provide?",
          options: [
            "Smart contract templates",
            "JavaScript interfaces to interact with blockchains",
            "Wallet software",
            "Blockchain nodes",
          ],
          correctAnswer: 1,
          explanation:
            "Web3 libraries provide JavaScript interfaces to interact with blockchains, handling RPC connections, transactions, and ABI encoding.",
        },
        {
          id: "q2",
          question: "Why should you verify the connected network?",
          options: [
            "To save gas",
            "To ensure users interact with the correct contract deployment",
            "To speed up transactions",
            "To improve security",
          ],
          correctAnswer: 1,
          explanation:
            "Verifying the connected network ensures users interact with the correct contract deployment and prevents accidental transactions on wrong networks.",
        },
        {
          id: "q3",
          question: "What are optimistic updates?",
          options: [
            "Automatic retries",
            "Updating UI before transaction confirmation for better UX",
            "Gas optimization",
            "Error handling",
          ],
          correctAnswer: 1,
          explanation:
            "Optimistic updates show changes in the UI immediately while waiting for transaction confirmation, improving perceived performance.",
        },
        {
          id: "q4",
          question: "How should you handle wallet rejections?",
          options: [
            "Retry automatically",
            "Display clear error messages and allow users to try again",
            "Ignore them",
            "Force the transaction",
          ],
          correctAnswer: 1,
          explanation:
            "Handle wallet rejections gracefully by displaying clear error messages and allowing users to try again, respecting their decision.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 47,
    title: "Indexing and Querying Blockchain Data",
    description: "Efficiently access and query on-chain data",
    duration: "25 min",
    objectives: [
      "Understand blockchain data indexing challenges",
      "Learn to use The Graph protocol",
      "Master subgraph development",
      "Implement efficient data queries",
    ],
    content: {
      introduction:
        "Blockchains are optimized for writing, not reading. Indexing solutions transform blockchain data into queryable databases, enabling fast and complex queries essential for modern dApps.",
      sections: [
        {
          title: "Indexing Challenges",
          content:
            "Querying blockchain data directly is slow and expensive. You can't filter events efficiently or perform complex queries. Historical data requires scanning thousands of blocks. Indexing solutions solve this by processing blockchain events and storing them in traditional databases.",
        },
        {
          title: "The Graph Protocol",
          content:
            "The Graph is a decentralized indexing protocol. You define a subgraph that specifies which events to index and how to transform them. The Graph nodes process blockchain data and serve it via GraphQL APIs. It's like creating a custom API for your smart contract.",
        },
        {
          title: "Subgraph Development",
          content:
            "Write a subgraph manifest defining your contract addresses and events. Create schema defining your data model. Implement mapping functions to transform events into entities. Deploy to The Graph's hosted service or decentralized network. Query your data using GraphQL.",
        },
        {
          title: "Query Optimization",
          content:
            "Design your schema for your query patterns. Use pagination for large datasets. Implement caching strategies. Consider denormalizing data for faster queries. Monitor query performance and optimize slow queries. Balance between query flexibility and performance.",
        },
      ],
      conclusion:
        "Efficient data access is crucial for dApp performance. Indexing solutions like The Graph make blockchain data as accessible as traditional databases.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "Why is querying blockchain data directly challenging?",
          options: [
            "It's too expensive",
            "Blockchains are optimized for writing, not complex queries",
            "It's not secure",
            "It requires special hardware",
          ],
          correctAnswer: 1,
          explanation:
            "Blockchains are optimized for writing and consensus, not for complex queries or filtering, making direct querying slow and inefficient.",
        },
        {
          id: "q2",
          question: "What is The Graph protocol?",
          options: [
            "A blockchain",
            "A decentralized indexing protocol for blockchain data",
            "A smart contract framework",
            "A wallet",
          ],
          correctAnswer: 1,
          explanation:
            "The Graph is a decentralized indexing protocol that processes blockchain events and serves them via GraphQL APIs.",
        },
        {
          id: "q3",
          question: "What is a subgraph?",
          options: [
            "A type of smart contract",
            "A definition of which events to index and how to transform them",
            "A blockchain network",
            "A testing tool",
          ],
          correctAnswer: 1,
          explanation:
            "A subgraph defines which smart contract events to index and how to transform them into queryable entities.",
        },
        {
          id: "q4",
          question: "What query language does The Graph use?",
          options: ["SQL", "REST", "GraphQL", "JSON-RPC"],
          correctAnswer: 2,
          explanation:
            "The Graph uses GraphQL, allowing flexible and efficient queries with exactly the data you need.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 48,
    title: "Oracles and External Data",
    description: "Connect smart contracts to real-world information",
    duration: "25 min",
    objectives: [
      "Understand the oracle problem",
      "Learn Chainlink and other oracle solutions",
      "Master price feed integration",
      "Implement secure external data usage",
    ],
    content: {
      introduction:
        "Smart contracts can't access external data directly—they're isolated from the outside world. Oracles bridge this gap, bringing real-world data on-chain while maintaining security and decentralization.",
      sections: [
        {
          title: "The Oracle Problem",
          content:
            "Blockchains are deterministic and isolated by design. They can't make HTTP requests or access external APIs. If smart contracts could access external data directly, different nodes might get different results, breaking consensus. Oracles solve this by bringing external data on-chain in a verifiable way.",
        },
        {
          title: "Oracle Solutions",
          content:
            "Chainlink is the leading decentralized oracle network, aggregating data from multiple sources. Band Protocol offers similar functionality. API3 enables first-party oracles where data providers run their own nodes. Each solution has different trust assumptions and decentralization trade-offs.",
        },
        {
          title: "Price Feeds",
          content:
            "Price feeds are the most common oracle use case. Chainlink Price Feeds aggregate data from multiple exchanges and data providers. They update at regular intervals or when prices move significantly. DeFi protocols rely on accurate price feeds for liquidations, swaps, and collateral management.",
        },
        {
          title: "Secure Integration",
          content:
            "Always validate oracle data freshness and check for stale prices. Use multiple oracle sources when possible. Implement circuit breakers for extreme price movements. Consider oracle manipulation risks in your protocol design. Monitor oracle health and have fallback mechanisms.",
        },
      ],
      conclusion:
        "Oracles are critical infrastructure for smart contracts that interact with the real world. Choose reliable oracle solutions and implement proper safeguards.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the oracle problem?",
          options: [
            "Oracles are too expensive",
            "Smart contracts can't access external data without breaking consensus",
            "Oracles are too slow",
            "Oracles are insecure",
          ],
          correctAnswer: 1,
          explanation:
            "The oracle problem is that smart contracts can't access external data directly without breaking blockchain consensus and determinism.",
        },
        {
          id: "q2",
          question: "What is Chainlink?",
          options: [
            "A blockchain",
            "A decentralized oracle network",
            "A wallet",
            "A programming language",
          ],
          correctAnswer: 1,
          explanation:
            "Chainlink is a decentralized oracle network that aggregates external data from multiple sources and brings it on-chain.",
        },
        {
          id: "q3",
          question: "Why are price feeds important for DeFi?",
          options: [
            "They make transactions faster",
            "They enable accurate liquidations, swaps, and collateral management",
            "They reduce gas costs",
            "They improve security",
          ],
          correctAnswer: 1,
          explanation:
            "Price feeds provide accurate asset prices essential for DeFi operations like liquidations, swaps, and collateral management.",
        },
        {
          id: "q4",
          question: "What should you check when using oracle data?",
          options: [
            "Only the price",
            "Data freshness and implement staleness checks",
            "The oracle's website",
            "Nothing, oracles are always accurate",
          ],
          correctAnswer: 1,
          explanation:
            "Always validate oracle data freshness and check for stale prices to prevent using outdated information in critical operations.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 49,
    title: "Multi-Signature and Access Control",
    description: "Implement secure permission systems for smart contracts",
    duration: "25 min",
    objectives: [
      "Understand multi-signature wallet concepts",
      "Learn role-based access control patterns",
      "Master timelock mechanisms",
      "Implement secure governance systems",
    ],
    content: {
      introduction:
        "Single-key control is a security risk. Multi-signature wallets and sophisticated access control systems distribute power, prevent single points of failure, and enable secure governance.",
      sections: [
        {
          title: "Multi-Signature Wallets",
          content:
            "Multi-sig wallets require multiple signatures to execute transactions. For example, a 2-of-3 wallet needs any 2 out of 3 owners to approve. This prevents single key compromise and enables shared control. Gnosis Safe is the most popular multi-sig solution.",
        },
        {
          title: "Role-Based Access Control",
          content:
            "RBAC assigns permissions to roles rather than individual addresses. Admins can grant/revoke roles. Different roles have different permissions. OpenZeppelin's AccessControl provides a battle-tested implementation. This pattern scales better than simple owner-based control.",
        },
        {
          title: "Timelock Mechanisms",
          content:
            "Timelocks delay sensitive operations, giving users time to react. Propose a change, wait for the timelock period, then execute. This prevents surprise malicious upgrades and gives users time to exit if they disagree. Essential for trustless protocols.",
        },
        {
          title: "Governance Systems",
          content:
            "Combine multi-sig, RBAC, and timelocks for comprehensive governance. Token holders vote on proposals. Successful proposals enter a timelock. After the delay, anyone can execute. This creates transparent, decentralized decision-making while maintaining security.",
        },
      ],
      conclusion:
        "Sophisticated access control is essential for production protocols. Distribute power, implement checks and balances, and give users time to react to changes.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is a multi-signature wallet?",
          options: [
            "A wallet with multiple addresses",
            "A wallet requiring multiple signatures to execute transactions",
            "A wallet for multiple users",
            "A wallet with multiple tokens",
          ],
          correctAnswer: 1,
          explanation:
            "A multi-signature wallet requires multiple signatures (e.g., 2-of-3) to execute transactions, preventing single key compromise.",
        },
        {
          id: "q2",
          question: "What is role-based access control (RBAC)?",
          options: [
            "Assigning permissions to roles rather than individual addresses",
            "Controlling gas costs",
            "Managing user accounts",
            "Encrypting data",
          ],
          correctAnswer: 0,
          explanation:
            "RBAC assigns permissions to roles (like admin, minter, pauser) rather than individual addresses, making permission management scalable.",
        },
        {
          id: "q3",
          question: "Why use timelock mechanisms?",
          options: [
            "To save gas",
            "To give users time to react to sensitive changes",
            "To speed up transactions",
            "To reduce complexity",
          ],
          correctAnswer: 1,
          explanation:
            "Timelocks delay sensitive operations, giving users advance notice and time to react or exit if they disagree with changes.",
        },
        {
          id: "q4",
          question:
            "What is a key benefit of combining multi-sig, RBAC, and timelocks?",
          options: [
            "Lower gas costs",
            "Faster transactions",
            "Comprehensive governance with checks and balances",
            "Simpler code",
          ],
          correctAnswer: 2,
          explanation:
            "Combining these mechanisms creates comprehensive governance with distributed power, transparency, and user protection.",
        },
      ],
    },
    xpReward: 100,
    creditsReward: 15,
  },
  {
    id: 50,
    title: "Production Deployment and Maintenance",
    description: "Launch and maintain dApps in production environments",
    duration: "30 min",
    objectives: [
      "Master mainnet deployment procedures",
      "Learn monitoring and alerting strategies",
      "Understand incident response protocols",
      "Implement continuous maintenance practices",
    ],
    content: {
      introduction:
        "Deploying to mainnet is just the beginning. Production dApps require ongoing monitoring, maintenance, and incident response. This lesson covers everything you need to run a successful production system.",
      sections: [
        {
          title: "Deployment Procedures",
          content:
            "Test exhaustively on testnets first. Use deployment scripts for reproducibility. Verify contracts on block explorers. Start with limited functionality and gradually enable features. Use multi-sig for contract ownership. Document all deployment parameters. Have a rollback plan.",
        },
        {
          title: "Monitoring and Alerting",
          content:
            "Monitor contract events in real-time. Track key metrics like TVL, transaction volume, and gas usage. Set up alerts for unusual activity, failed transactions, or oracle issues. Use services like Tenderly or Defender. Monitor social media for user reports. Have an on-call rotation.",
        },
        {
          title: "Incident Response",
          content:
            "Have a documented incident response plan. Implement emergency pause mechanisms. Maintain a security contact for vulnerability reports. Communicate clearly with users during incidents. Conduct post-mortems to learn from issues. Keep a war room channel for coordination.",
        },
        {
          title: "Continuous Maintenance",
          content:
            "Regularly review and update dependencies. Monitor for new vulnerabilities in libraries you use. Keep documentation current. Maintain test coverage as you add features. Plan and communicate upgrades well in advance. Build a community of users who can provide feedback.",
        },
      ],
      conclusion:
        "Production deployment is a marathon, not a sprint. Build robust monitoring, prepare for incidents, and maintain your system continuously. Your users depend on you.",
    },
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What should you do before mainnet deployment?",
          options: [
            "Deploy immediately",
            "Test exhaustively on testnets",
            "Skip testing",
            "Deploy to multiple chains at once",
          ],
          correctAnswer: 1,
          explanation:
            "Always test exhaustively on testnets before mainnet deployment to catch bugs and issues in a safe environment.",
        },
        {
          id: "q2",
          question: "What metrics should you monitor in production?",
          options: [
            "Only gas prices",
            "TVL, transaction volume, gas usage, and unusual activity",
            "Only user count",
            "Nothing, smart contracts are autonomous",
          ],
          correctAnswer: 1,
          explanation:
            "Monitor comprehensive metrics including TVL, transaction volume, gas usage, and unusual activity to detect issues early.",
        },
        {
          id: "q3",
          question: "What is an emergency pause mechanism?",
          options: [
            "A gas optimization",
            "A way to stop contract operations during incidents",
            "A testing tool",
            "A deployment script",
          ],
          correctAnswer: 1,
          explanation:
            "Emergency pause mechanisms allow you to stop contract operations quickly during security incidents or critical bugs.",
        },
        {
          id: "q4",
          question: "Why conduct post-mortems after incidents?",
          options: [
            "To assign blame",
            "To learn from issues and prevent recurrence",
            "To satisfy regulators",
            "To generate reports",
          ],
          correctAnswer: 1,
          explanation:
            "Post-mortems help teams learn from incidents, identify root causes, and implement preventive measures for the future.",
        },
      ],
    },
    xpReward: 120,
    creditsReward: 18,
  },
];
