import type { LessonContent } from "../lessonContent";

export const module05LessonsEN: LessonContent[] = [
  {
    id: "sov-01",
    title: "What Makes a System Sovereign?",
    description:
      "Define sovereignty in digital systems as ownership of identity, compute, and value — and understand why ICP canisters are the natural sovereign execution unit.",
    duration: "10-14 min",
    objectives: [
      "Define digital sovereignty as ownership of identity, compute, and value",
      "Identify ICP canisters as sovereign execution units with no infrastructure landlord",
      "Distinguish sovereign systems from platform-dependent deployments",
    ],
    content: {
      introduction:
        "Sovereignty in a digital system means owning the execution layer — not renting it. A sovereign system is one where the operator controls identity, compute, and value without requiring permission from an infrastructure provider. On the Internet Computer, canisters are the primitive unit of this model: they execute on a subnet governed by the NNS, hold state across upgrades, and transact value natively. No landlord. No eviction risk. No platform policy.",
      sections: [
        {
          title: "The Three Pillars of Digital Sovereignty",
          content:
            "Sovereignty in digital infrastructure rests on three properties: control over identity (who you are and how you authenticate), control over compute (where and how your code runs), and control over value (how economic activity is settled). A system that depends on an external party for any one of these three is not sovereign — it is a tenant. ICP is the only public compute network that addresses all three at the protocol level.",
        },
        {
          title: "Canisters as Sovereign Execution Units",
          content:
            "A canister on ICP is a self-contained execution unit. It holds its own state, processes messages deterministically, and cannot be stopped by any single actor — not by DFINITY, not by a subnet node operator, not by a cloud provider. Governance over the canister belongs to whoever controls its upgrade keys, and governance over the subnet it runs on belongs to the NNS. This creates a permission structure that is architectural, not contractual.",
        },
        {
          title: "Sovereignty vs Platform Dependence",
          content:
            "Most modern software stacks are built on rented infrastructure. Compute runs on AWS or GCP. Identity is issued by Google or Apple. Value moves through Stripe or PayPal. Each of these is a trust dependency — a single entity whose policy changes, outages, or business decisions directly affect your system. A sovereign system eliminates these dependencies not through contracts but through architecture. On ICP, your code runs on a decentralized subnet, your users authenticate through Internet Identity anchored on-chain, and value settles through ckBTC without a payment processor.",
        },
        {
          title: "Why Sovereignty Requires Protocol, Not Platform",
          content:
            "Platforms can offer features that resemble sovereignty — custom domains, portable data, open APIs — but they remain revocable. A platform can change its terms, suspend your account, or shut down. A protocol cannot do this. ICP as a protocol defines the rules of execution at the cryptographic level. When you deploy a canister on ICP, you are operating under protocol rules enforced by consensus, not under the terms of service of a company. This distinction is the foundation of genuine digital sovereignty.",
        },
      ],
      conclusion:
        'A sovereign system is not defined by its features but by its permission structure. Who can stop it? Who can evict it? Who controls the identity layer? If the answer to any of these is "a company", the system is not sovereign. On ICP, the answer is "the protocol" — and the protocol is governed by its participants through the NNS.',
    },
    quiz: {
      questions: [
        {
          id: "sov-01-q1",
          question: "Which three properties define a sovereign digital system?",
          options: [
            "Control over identity, compute, and value",
            "Open-source code, public APIs, and community governance",
            "Decentralized storage, ZK proofs, and token issuance",
            "Low latency, high throughput, and multi-region deployment",
          ],
          correctAnswer: 0,
          explanation:
            "Sovereignty in digital infrastructure requires ownership of identity, compute, and value. A system that depends on an external party for any of these is not sovereign — it is a tenant.",
        },
        {
          id: "sov-01-q2",
          question:
            "Why is ICP considered a sovereign compute layer rather than a platform?",
          options: [
            "It offers the lowest transaction fees in the industry",
            "Its execution rules are enforced by cryptographic consensus, not company policy",
            "It provides a managed Kubernetes environment for canister deployment",
            "It is owned by a foundation that cannot change its terms",
          ],
          correctAnswer: 1,
          explanation:
            "ICP is a protocol, not a platform. Its execution rules are defined cryptographically and enforced by subnet consensus. No company can change these rules unilaterally — making it a genuinely sovereign compute layer.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-02",
    title: "Identity Without Platforms",
    description:
      "Understand how Internet Identity works as an on-chain identity system anchored on ICP — not issued by any company or platform.",
    duration: "10-14 min",
    objectives: [
      "Explain how Internet Identity anchors identity keys on ICP",
      "Distinguish II from platform-issued credentials",
      "Identify the privacy properties of Internet Identity's device-based authentication",
    ],
    content: {
      introduction:
        "Every identity system has an issuer. Platform credentials — Google accounts, Apple IDs, corporate SSO — are issued and revocable by the platform. Internet Identity is different: it is an on-chain identity system deployed as a canister on ICP. Your identity key is anchored on-chain and authenticated through your device. No company holds it. No company can revoke it.",
      sections: [
        {
          title: "How Internet Identity Works",
          content:
            "Internet Identity uses WebAuthn — the same standard used by hardware security keys and biometric authenticators — to create identity anchors. Each anchor is a set of device-linked keys recorded on the ICP blockchain. When you authenticate, your device signs a challenge with a local key. The signature is verified on-chain. No password is transmitted. No email is required. No phone number is linked. The anchor is your identity and it lives on the protocol.",
        },
        {
          title: "Why Platform Credentials Are a Sovereignty Risk",
          content:
            "When your identity is issued by a platform, the platform owns the relationship. Google can suspend your account. Apple can revoke your credentials. Corporate SSO can lock you out when you leave a company. Any service that relies on these credentials inherits this dependency. For a sovereign system, this is unacceptable: the identity layer must be as durable and permission-independent as the compute layer.",
        },
        {
          title: "Privacy Through Device-Anchored Authentication",
          content:
            "Internet Identity generates a different principal for each dapp you authenticate with. This means no dapp can correlate your activity across other services by inspecting your identity. There is no global user ID, no tracking pixel, no login graph. Your identity on ICP is a set of per-dapp pseudonyms, each cryptographically derived from your anchor but unlinkable to each other from the outside.",
        },
        {
          title: "Operating Identity You Own",
          content:
            "Owning your identity on ICP means holding the device keys that control your anchor. You can add multiple devices — a laptop, a phone, a hardware key — and remove any of them at any time. If a device is lost, recovery options can be registered in advance. The identity system is governed by the NNS canister it runs on, not by a company's account recovery policy. This is what identity ownership looks like at the protocol level.",
        },
      ],
      conclusion:
        "Internet Identity moves identity ownership from platforms to protocols. Your anchor lives on ICP. Your authentication is cryptographic. No company holds the keys to your digital identity. For any sovereign system built on ICP, Internet Identity is the natural and only appropriate authentication layer.",
    },
    quiz: {
      questions: [
        {
          id: "sov-02-q1",
          question:
            "What is the key difference between Internet Identity and a platform-issued credential?",
          options: [
            "Internet Identity is anchored on-chain on ICP and is not held or revocable by any company",
            "Internet Identity requires a verified email address for account recovery",
            "Platform credentials use stronger cryptography than Internet Identity",
            "Internet Identity is issued by DFINITY and can be revoked by the foundation",
          ],
          correctAnswer: 0,
          explanation:
            "Internet Identity is an on-chain identity system deployed as a canister on ICP. The identity anchor is controlled by device-linked keys, not by any company. No platform can revoke it.",
        },
        {
          id: "sov-02-q2",
          question:
            "Why does Internet Identity generate a different principal for each dapp?",
          options: [
            "To increase transaction throughput on the subnet",
            "To prevent cross-dapp activity correlation and protect user privacy",
            "To comply with GDPR data residency requirements",
            "To allow dapps to share user profiles across services",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity generates a unique principal per dapp, making it impossible for services to correlate a user's activity across different applications. This is a core privacy property of the system.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-03",
    title: "Compute Without Cloud Dependence",
    description:
      "Understand how ICP subnets provide compute infrastructure governed by the NNS — eliminating dependency on AWS, GCP, or any infrastructure provider.",
    duration: "10-14 min",
    objectives: [
      "Explain how ICP subnets are governed and who controls them",
      "Identify the risks of cloud-dependent compute for sovereign systems",
      "Describe how canisters achieve eviction resistance at the protocol level",
    ],
    content: {
      introduction:
        "Cloud compute is powerful but not sovereign. When you deploy on AWS, GCP, or Azure, you are renting execution capacity from a corporation that can change its prices, modify its terms, or terminate your services. ICP replaces this model with protocol-governed compute: subnets run by independent node providers, coordinated by the NNS, with no single entity in control. Code that cannot be evicted by any infrastructure provider.",
      sections: [
        {
          title: "How ICP Subnets Work",
          content:
            "An ICP subnet is a collection of node machines run by independent providers — data centers, enterprises, or individuals — distributed geographically. Each subnet reaches consensus on the state of its canisters using the Internet Computer Consensus (ICC) protocol. No node operator can selectively stop a canister or access its state. The subnet operates as a collective governed by the NNS, which can add or remove nodes, upgrade subnet software, and manage governance parameters.",
        },
        {
          title: "Why Cloud Dependence Is a Sovereignty Risk",
          content:
            "A dapp deployed on cloud infrastructure inherits its operator's risk profile. AWS has experienced extended outages. GCP has terminated developer accounts without appeal. Microsoft Azure has altered service agreements on short notice. For any system where continuity is critical — financial infrastructure, governance systems, identity services — this dependency is a structural vulnerability. Sovereign compute requires that no single actor can halt execution.",
        },
        {
          title: "Eviction Resistance Through Protocol Governance",
          content:
            "On ICP, canisters cannot be evicted by a node operator, a data center, or DFINITY. The rules that govern whether a canister continues running are encoded in the protocol and enforced by subnet consensus. The only legitimate mechanism for stopping a canister is: running out of cycles (which the operator controls), or a governance proposal passed through the NNS (which requires broad consensus). This creates a credible commitment to continuity that cloud SLAs cannot match.",
        },
        {
          title: "Operating Compute You Govern",
          content:
            "Running a canister on ICP is not the same as renting a server. You are deploying code to a protocol that runs under the governance of its participants. The NNS controls the subnet, the subnet runs the canister, and the canister is controlled by its upgrade key holder. Each layer has a defined governance structure. Compare this to cloud infrastructure, where governance at every layer is unilateral corporate policy. On ICP, governance is architectural.",
        },
      ],
      conclusion:
        "Sovereign compute means running code on infrastructure that no single entity can stop. ICP subnets achieve this through protocol governance, consensus, and independent node operators. For systems that require genuine operational sovereignty, ICP is the only public compute network that delivers this at scale.",
    },
    quiz: {
      questions: [
        {
          id: "sov-03-q1",
          question:
            "What governs ICP subnets and determines whether a canister continues running?",
          options: [
            "DFINITY's infrastructure team and its operational policies",
            "The NNS through protocol governance and subnet consensus",
            "The canister developer's cloud account and billing status",
            "Individual node operators who vote on each deployment request",
          ],
          correctAnswer: 1,
          explanation:
            "ICP subnets are governed by the NNS. Canister execution is determined by protocol rules enforced by subnet consensus — not by any single entity or infrastructure provider.",
        },
        {
          id: "sov-03-q2",
          question:
            "Why is cloud-hosted compute fundamentally incompatible with sovereign system design?",
          options: [
            "Cloud compute is too expensive for most dapp developers",
            "Cloud providers can terminate services unilaterally, making continuity contingent on their policies",
            "Cloud compute does not support WebAssembly execution",
            "Cloud infrastructure lacks the bandwidth required for blockchain applications",
          ],
          correctAnswer: 1,
          explanation:
            "Cloud providers can change terms, terminate accounts, or experience outages — all of which can halt a dependent system. Sovereign compute requires infrastructure governed by protocol, not corporate policy.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-04",
    title: "Value Without Intermediaries",
    description:
      "Learn how ckBTC enables programmable Bitcoin settlement between canisters at the protocol level — with no bank, payment processor, or bridge operator.",
    duration: "10-14 min",
    objectives: [
      "Explain what ckBTC is and how it achieves Bitcoin-backed value on ICP",
      "Identify the trust model that eliminates bridge operators from the settlement path",
      "Describe how machine-to-machine value transfer operates without intermediaries",
    ],
    content: {
      introduction:
        "Every traditional payment system has an intermediary. Banks clear settlements. Payment processors authorize transactions. Even most crypto bridges rely on a multisig operated by a known set of parties. ckBTC is different: it is Chain-Key Bitcoin — a protocol-native representation of BTC on ICP, minted and redeemed through threshold cryptography executed by an ICP subnet, with no bridge operator and no custodian. Value without intermediaries.",
      sections: [
        {
          title: "What ckBTC Is",
          content:
            "ckBTC is a canister-issued token on ICP that is backed 1:1 by real Bitcoin. When you deposit BTC to the ckBTC minting canister, it issues an equivalent amount of ckBTC to your principal. When you redeem, the minting canister constructs a Bitcoin transaction using threshold ECDSA — a cryptographic scheme where no single node holds the private key. The key is distributed across the subnet. No custodian holds your Bitcoin. The protocol holds it.",
        },
        {
          title: "Why Threshold Cryptography Eliminates the Bridge Risk",
          content:
            "Traditional cross-chain bridges use a multisig wallet controlled by a known operator set. These operators can collude, be coerced, or be compromised. Billions of dollars have been lost in bridge hacks because the trust assumption was organizational, not cryptographic. ckBTC uses threshold ECDSA: the Bitcoin private key is never assembled in any single location. Signing requires consensus across a subnet. This makes the trust model equivalent to Bitcoin's own security assumptions.",
        },
        {
          title: "Machine-to-Machine Settlement",
          content:
            "ckBTC can be transferred between canisters in a single inter-canister call. A canister can receive ckBTC, evaluate a condition, and forward value to another canister — all within a single execution cycle. This enables autonomous economic workflows: an agent canister that earns ckBTC for providing a service, automatically pays for compute, and distributes earnings to stakers — without any human in the settlement path.",
        },
        {
          title: "Protocol-Level Value vs Intermediary-Level Value",
          content:
            "When value is held in a bank or processed through Stripe, the intermediary is the real owner. They can freeze funds, reverse transactions, or impose reporting requirements. ckBTC on ICP is held and transferred at the protocol level. The rules for transfer are code, not policy. A canister holding ckBTC owns it unconditionally. No payment processor can block the transaction. No platform can freeze the balance. This is what value ownership means at the protocol level.",
        },
      ],
      conclusion:
        "ckBTC enables genuine value transfer without intermediaries by anchoring Bitcoin settlement in threshold cryptography rather than organizational trust. Combined with ICP's native inter-canister messaging, it creates the infrastructure for machine-to-machine economic systems that settle real value without banks, bridges, or payment processors.",
    },
    quiz: {
      questions: [
        {
          id: "sov-04-q1",
          question:
            "How does ckBTC eliminate the need for a trusted bridge operator?",
          options: [
            "It uses a multisig wallet controlled by a DAO with elected members",
            "It uses threshold ECDSA where the Bitcoin key is distributed across a subnet and never assembled in one place",
            "It locks BTC in a smart contract on Ethereum that ICP monitors via HTTP outcalls",
            "It relies on DFINITY to custody the underlying BTC and issue receipts",
          ],
          correctAnswer: 1,
          explanation:
            "ckBTC uses threshold ECDSA: the Bitcoin private key is split across an ICP subnet and signing requires consensus. No single node or operator holds the key, eliminating the custodian trust requirement.",
        },
        {
          id: "sov-04-q2",
          question:
            "What enables machine-to-machine ckBTC settlement in a single execution cycle?",
          options: [
            "ICP's native inter-canister messaging and ckBTC's token transfer API",
            "A relayer network that monitors events and triggers cross-chain transfers",
            "Periodic batch settlement runs coordinated by the NNS",
            "An off-chain payment channel that settles on Bitcoin every 10 minutes",
          ],
          correctAnswer: 0,
          explanation:
            "ckBTC transfers are executed as inter-canister calls. A canister can receive, hold, and transfer ckBTC entirely within on-chain execution — no relayers, no batch settlement, no human authorization.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-05",
    title: "Ownership vs Access",
    description:
      "Understand the fundamental architectural distinction between owning a system and accessing a service — and why this distinction defines sovereign infrastructure.",
    duration: "10-14 min",
    objectives: [
      "Define the architectural difference between ownership and access",
      "Identify how canister deployment transfers ownership rather than access",
      "Explain why access-based models are structurally fragile for sovereign systems",
    ],
    content: {
      introduction:
        "Most users of digital infrastructure are accessing services, not owning systems. They have accounts on platforms that can be suspended. They use APIs that can be deprecated. They store data in clouds that are billed monthly. Ownership is different: it means deploying a system you control, that operates under rules you define, that cannot be revoked by a third party. On ICP, deploying a canister is an act of ownership — not service access.",
      sections: [
        {
          title: "The Access Model and Its Structural Fragility",
          content:
            "When you access a service, the service provider controls the relationship. They set the terms, the rate limits, the data retention policies, and the deprecation schedule. When the provider changes any of these, your system is affected — regardless of your preferences. This is not a minor inconvenience. For critical systems — financial infrastructure, identity services, governance mechanisms — access-based architecture is structurally fragile. The system's continuity is contingent on the provider's decisions.",
        },
        {
          title: "Ownership Through Canister Deployment",
          content:
            "Deploying a canister on ICP transfers operational control to the upgrade key holder. The canister runs on the protocol. The protocol does not have a terms of service that can suspend your deployment. The canister's behavior is defined by its code and its governance parameters — not by the infrastructure provider's current policies. This is ownership: you control the system's rules, its state, and its upgrade path.",
        },
        {
          title: "Governance as the Boundary of Ownership",
          content:
            "True ownership means defining who can modify the system. On ICP, a canister's governance is determined by its controller keys. A single-controller canister is owned by whoever holds that key. A governance-controlled canister — one whose upgrades require an SNS proposal — is owned by its token holders collectively. In both cases, the ownership structure is explicit, on-chain, and verifiable. Compare this to SaaS: who controls the upgrade schedule of a Stripe integration? Stripe does.",
        },
        {
          title: "Designing for Ownership",
          content:
            "Building sovereign systems means designing for ownership at every layer. Identity: use Internet Identity, not OAuth. Compute: deploy canisters, not serverless functions. Data: store in canister stable memory, not third-party databases. Value: settle with ckBTC, not payment APIs. Each of these is a decision to own a layer of the stack rather than access it. The aggregate of these decisions determines whether your system is genuinely sovereign.",
        },
      ],
      conclusion:
        "The distinction between ownership and access is the central design decision in sovereign system architecture. Every dependency on an access-based service is a potential failure point. ICP enables full-stack ownership — identity, compute, data, and value — at the protocol level. Sovereign systems are built by those who choose to own, not rent, their infrastructure.",
    },
    quiz: {
      questions: [
        {
          id: "sov-05-q1",
          question:
            "What is the defining characteristic of ownership vs access in digital infrastructure?",
          options: [
            "Ownership means you have paid for a premium subscription tier",
            "Ownership means you control the system's rules, state, and upgrade path without third-party revocation",
            "Access provides more features than ownership in most cloud platforms",
            "Ownership requires running your own physical servers in a data center",
          ],
          correctAnswer: 1,
          explanation:
            "Ownership means operating a system under rules you control that cannot be revoked by a third party. Access means operating under a service provider's terms, which they can change or revoke.",
        },
        {
          id: "sov-05-q2",
          question:
            "Which combination of choices represents a sovereign, ownership-based architecture on ICP?",
          options: [
            "Auth0 for identity, AWS Lambda for compute, PostgreSQL on RDS for data",
            "Internet Identity, canister deployment, stable memory storage, ckBTC settlement",
            "Google OAuth, Vercel functions, Firebase Firestore, Stripe payments",
            "Self-hosted Keycloak, Kubernetes on GCP, MongoDB Atlas, PayPal API",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity, canisters, stable memory, and ckBTC represent ownership at every layer of the stack — identity, compute, data, and value — all protocol-native and not dependent on any platform.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-06",
    title: "Protocol Governance",
    description:
      "Learn how the NNS and SNS enable on-chain governance of ICP infrastructure and dapps — replacing corporate decision-making with verifiable, protocol-native voting.",
    duration: "10-14 min",
    objectives: [
      "Explain the structure and function of the NNS as ICP's on-chain governance system",
      "Describe how SNS enables dapp-level governance through token-based voting",
      "Distinguish between governance through architecture and governance through policy",
    ],
    content: {
      introduction:
        "Governance is not optional for sovereign systems — it is the mechanism by which rules are set and changed. On ICP, governance is on-chain: the Network Nervous System (NNS) governs the ICP protocol itself, and the Service Nervous System (SNS) framework enables individual dapps to govern themselves. This is governance through architecture — not through the policies of a company's board of directors.",
      sections: [
        {
          title: "The Network Nervous System",
          content:
            "The NNS is the on-chain governance canister for the Internet Computer Protocol. It controls subnet creation, node provider admission, protocol upgrades, and economic parameters. Participants stake ICP in neurons to vote on proposals. Voting power is proportional to the amount staked and the lock-up duration. Proposals that pass are automatically executed — no human administrator implements the changes. The NNS is the constitutional layer of ICP.",
        },
        {
          title: "Neuron Staking and Voting",
          content:
            "To participate in NNS governance, you lock ICP in a neuron with a dissolve delay of at least 6 months. Longer lock-ups yield higher voting power and greater governance rewards. Neurons can vote directly or follow other neurons for automatic voting. This creates a system where long-term aligned participants have the most influence over protocol direction. Governance rewards are distributed to voting neurons from the ICP inflation schedule.",
        },
        {
          title: "SNS: Governance for Dapps",
          content:
            "The Service Nervous System allows individual dapps to decentralize their governance using a similar model to the NNS. A dapp launches an SNS, distributes governance tokens through a decentralization sale, and transfers canister control to the SNS. From that point, all upgrades to the dapp's canisters require a governance proposal that passes through token-holder voting. The dapp is no longer controlled by a founding team — it is governed by its community on-chain.",
        },
        {
          title: "Governance Through Architecture",
          content:
            "The key distinction between ICP governance and traditional corporate governance is that the rules are encoded in canisters, not in documents. An NNS proposal that passes is executed automatically. A company policy decision requires humans to implement it consistently. On-chain governance removes the gap between decision and execution. It also makes governance auditable: every proposal, every vote, and every outcome is recorded on the public ledger and verifiable by anyone.",
        },
      ],
      conclusion:
        "Protocol governance through the NNS and SNS transforms decision-making from a corporate function into an on-chain, verifiable, and community-driven process. Sovereign systems do not just run on protocol infrastructure — they are governed by it. This is the final layer of genuine sovereignty: control over the rules that control the system.",
    },
    quiz: {
      questions: [
        {
          id: "sov-06-q1",
          question: "What does the NNS govern on the Internet Computer?",
          options: [
            "Only the financial parameters of the ICP token supply",
            "Subnet creation, protocol upgrades, node admission, and economic parameters",
            "Individual canister deployments and dapp-level access control",
            "The DNS and routing layer for all .icp domains",
          ],
          correctAnswer: 1,
          explanation:
            "The NNS governs the ICP protocol at the infrastructure level: subnet creation, protocol upgrades, node provider admission, and economic parameters. It is the constitutional layer of the Internet Computer.",
        },
        {
          id: "sov-06-q2",
          question:
            "How does an SNS decentralize control of a dapp's canisters?",
          options: [
            "By publishing the canister's source code as open source",
            "By transferring canister control to the SNS, requiring governance proposals for all upgrades",
            "By distributing API keys to all token holders for direct canister access",
            "By migrating the dapp's backend to a permissioned subnet governed by the team",
          ],
          correctAnswer: 1,
          explanation:
            "An SNS takes over controller rights for a dapp's canisters. All upgrades then require a governance proposal that passes through token-holder voting — removing the founding team's unilateral control.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-07",
    title: "Sovereign User Experience",
    description:
      "Design UX for systems where users are not tracked, profiled, or extracted — using Internet Identity's privacy-preserving, device-anchored authentication model.",
    duration: "10-14 min",
    objectives: [
      "Identify the UX patterns that extract value from users in platform-dependent systems",
      "Describe how Internet Identity's no-email, no-phone approach changes the auth experience",
      "Apply sovereign UX principles to dapp design on ICP",
    ],
    content: {
      introduction:
        "Most user experiences are extraction machines. Sign-up forms collect email addresses and phone numbers for marketing. Behavioral analytics track every click and session. Personalization algorithms optimize for engagement, not user value. A sovereign UX is one that inverts this relationship: the user operates the system, the system does not operate on the user. On ICP, Internet Identity and canister-hosted frontends provide the tools to build this.",
      sections: [
        {
          title: "The Extraction Economy of Platform UX",
          content:
            "Platform UX is designed to maximize data collection, session duration, and behavioral influence. Email and phone collection is framed as a convenience but is primarily for re-targeting. Cookie consent is a legal compliance checkbox, not a privacy protection. Notification permissions enable behavioral nudges. Each of these patterns extracts value from the user and transfers it to the platform. A sovereign dapp has no platform-level interest in extracting this data.",
        },
        {
          title: "Internet Identity's No-Extraction Auth Model",
          content:
            "Internet Identity requires no email, no phone number, no password. Authentication is device-based — your biometric or security key confirms the session. There is no re-targeting identifier to collect because there is no email in the system. There is no account recovery path that requires you to submit additional personal data. The auth experience is frictionless precisely because it collects nothing.",
        },
        {
          title: "Designing for User Autonomy",
          content:
            "A sovereign UX respects the user as the operator of their own data and identity. This means: no dark patterns that obscure data permissions, no default opt-ins for tracking, no dark-mode toggle that silently enables analytics collection. It means storing user data in canisters the user can verify, not in opaque third-party databases. It means designing upgrade paths that are transparent and governed by the user community, not by the product team's roadmap.",
        },
        {
          title: "The UX of Protocol-Native Trust",
          content:
            'When every component of a dapp is on-chain — frontend served from a canister, auth through Internet Identity, data in stable memory, value in ckBTC — users can verify the system\'s behavior. The canister\'s Wasm hash is public. Its state transitions are deterministic. This creates a different kind of UX trust: not "we promise to protect your data" but "you can verify how we handle it". Protocol-native trust is the foundation of sovereign user experience.',
        },
      ],
      conclusion:
        "Sovereign UX is the user-facing expression of sovereign architecture. When the identity layer is privacy-preserving, the compute layer is verifiable, and the data layer is user-owned, the experience reflects those properties. Building sovereign UX means designing systems that serve users — not systems that extract from them.",
    },
    quiz: {
      questions: [
        {
          id: "sov-07-q1",
          question:
            "What makes Internet Identity's authentication model non-extractive compared to platform auth?",
          options: [
            "It requires a one-time verification fee that prevents bot signups",
            "It collects no email, phone, or password — authentication is device-based with no re-targeting identifier",
            "It stores user data in an encrypted database that only DFINITY can access",
            "It limits authentication to verified ICP token holders",
          ],
          correctAnswer: 1,
          explanation:
            "Internet Identity requires no email, no phone number, and no password. There is no re-targeting identifier to harvest. Authentication is cryptographic and device-anchored — the system collects nothing it can monetize.",
        },
        {
          id: "sov-07-q2",
          question:
            'What does "protocol-native trust" mean in the context of sovereign UX?',
          options: [
            "Users trust the dapp's privacy policy and terms of service",
            "Users can verify the system's behavior because canister code and state are publicly auditable on-chain",
            "The platform uses SSL certificates issued by a trusted certificate authority",
            "Trust is established through a third-party security audit report",
          ],
          correctAnswer: 1,
          explanation:
            "Protocol-native trust means users can verify the system's behavior — the canister's Wasm hash is public, state transitions are deterministic, and no opaque third-party holds the data. Trust is verifiable, not promised.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-08",
    title: "Digital Autonomy",
    description:
      "Understand what it means to operate digital infrastructure end-to-end: your keys, your code, your data, your uptime — not contingent on any platform's policies.",
    duration: "10-14 min",
    objectives: [
      "Define digital autonomy as end-to-end operational control over infrastructure",
      "Identify the four dimensions of digital autonomy: keys, code, data, and uptime",
      "Explain how ICP enables each dimension at the protocol level",
    ],
    content: {
      introduction:
        "Digital autonomy means operating infrastructure that you control completely — not partially, not contingently, but fully. It means your keys sign the transactions. Your code runs without a landlord. Your data persists without a subscription. Your uptime is governed by protocol consensus, not an SLA. On ICP, each of these properties is achievable at the protocol level — not through contractual arrangements with a provider.",
      sections: [
        {
          title: "Your Keys",
          content:
            "Key ownership is the foundation of digital autonomy. If someone else holds the keys, they own the system. On ICP, Internet Identity gives you device-anchored keys that control your identity anchor. Canister controller keys determine who can upgrade your code. ckBTC is secured by threshold keys distributed across a subnet. At every layer, key ownership is explicit and transferable — and you decide who holds what.",
        },
        {
          title: "Your Code",
          content:
            "Autonomous code operation means your software runs regardless of external policy decisions. On ICP, a canister runs until it runs out of cycles or is explicitly stopped by its controller. There is no platform policy that can pause execution. There is no infrastructure provider that can terminate your deployment. Your code runs because the protocol runs — and the protocol runs because independent node operators across the world maintain the network.",
        },
        {
          title: "Your Data",
          content:
            "Autonomous data ownership means your data persists under your control. On ICP, canister stable memory survives upgrades and is owned by the canister. The canister is owned by its controller. There is no SaaS subscription that lapses and deletes your database. There is no third-party data processor who can be subpoenaed for your users' records. Your data lives in your canister, on the protocol, under your governance.",
        },
        {
          title: "Your Uptime",
          content:
            "Autonomous uptime means your system's availability is not contingent on a platform's operational health. Cloud providers experience outages. SaaS tools go offline for maintenance. Platforms deprecate features that your system depends on. On ICP, subnet uptime is determined by the consensus of its node operators. No single node failure stops the subnet. No single actor can schedule downtime for your canister. Your uptime is a protocol property.",
        },
      ],
      conclusion:
        "Digital autonomy is not a philosophical stance — it is a set of specific technical properties: key ownership, code sovereignty, data persistence, and protocol-guaranteed uptime. On ICP, each of these is achievable through architecture. The question is not whether the tools exist. The question is whether the developer chooses to use them.",
    },
    quiz: {
      questions: [
        {
          id: "sov-08-q1",
          question:
            "Which of the following represents complete digital autonomy at the infrastructure level?",
          options: [
            "Running your app on a cloud provider with a 99.9% SLA and a data export API",
            "Holding your own controller keys, running canisters on ICP, storing data in stable memory, securing value with threshold keys",
            "Using an open-source CMS deployed on a VPS you rent from a hosting provider",
            "Operating a node on a permissioned blockchain with a governance committee",
          ],
          correctAnswer: 1,
          explanation:
            "Digital autonomy requires owning the keys, the code execution environment, the data storage, and the uptime guarantee at the protocol level. Only the ICP canister approach achieves all four simultaneously.",
        },
        {
          id: "sov-08-q2",
          question:
            "Why is canister uptime on ICP more autonomous than cloud-hosted uptime?",
          options: [
            "ICP offers a financially-backed SLA with penalty clauses for downtime",
            "Canister availability is a protocol property governed by subnet consensus, not a service agreement with a single provider",
            "DFINITY guarantees zero downtime through a dedicated operations team",
            "Canisters automatically migrate to redundant cloud regions during outages",
          ],
          correctAnswer: 1,
          explanation:
            "ICP subnet uptime is determined by the consensus of independent node operators. No single failure stops the subnet and no single actor can take it offline. This is a protocol property, not a contractual SLA.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-09",
    title: "Building Beyond Platforms",
    description:
      "Learn how to deploy full-stack dapps entirely on ICP — frontend, backend, data, and identity all canister-hosted, with no reliance on Vercel, Firebase, or any Web2 platform.",
    duration: "10-14 min",
    objectives: [
      "Identify the full-stack components that can be hosted as canisters on ICP",
      "Explain how canister-hosted frontends eliminate CDN and hosting dependencies",
      "Describe the architecture of a platform-free dapp built entirely on ICP",
    ],
    content: {
      introduction:
        "Most Web3 projects are only partially decentralized. Their smart contracts run on-chain, but their frontends are hosted on Vercel or Netlify. Their auth runs through a cloud service. Their databases use Firebase or Supabase. This creates a hybrid architecture where the decentralized backend is accessed through centralized infrastructure. A full-stack dapp on ICP eliminates this split: every component — frontend, backend, data, and identity — runs as a canister on the protocol.",
      sections: [
        {
          title: "Canister-Hosted Frontends",
          content:
            "On ICP, a canister can serve HTTP responses directly — including full web frontends. The asset canister serves HTML, CSS, and JavaScript over HTTP from an ICP subnet. Users access the frontend through a URL that resolves to the canister. There is no CDN, no web hosting provider, no Vercel deployment pipeline. The frontend is as on-chain as the backend. This means it is governed by the same controller keys and subject to the same upgrade process as the rest of the dapp.",
        },
        {
          title: "Backend as Canister Logic",
          content:
            "Canister backends replace server-side APIs. Instead of a Node.js Express server on AWS Lambda, you write Motoko or Rust code that runs as a canister on an ICP subnet. The canister exposes query and update calls — query calls return data without state changes, update calls mutate state and are committed through consensus. There is no server to provision, no container to manage, no infrastructure to scale manually. The canister scales within the subnet's capacity.",
        },
        {
          title: "Stable Memory as the Data Layer",
          content:
            "Canister stable memory is the on-chain data store for ICP dapps. It persists across canister upgrades and is not lost when the canister is stopped and restarted. There is no external database connection string, no cloud database subscription, no replication lag. Data lives in the canister and is governed by its controller. For structured data, canisters can use stable data structures from libraries like ic-stable-memory or motoko-base. The database is the canister.",
        },
        {
          title: "The Platform-Free Stack",
          content:
            "A platform-free dapp on ICP uses: Internet Identity for authentication (canister-hosted), an asset canister for the frontend (canister-hosted), a logic canister for business rules (canister-hosted), stable memory for data persistence (canister-hosted), and ckBTC for value transfer (protocol-native). Every component runs on the protocol. No Vercel. No Firebase. No Stripe. No Auth0. The entire stack is owned, governed, and operated by the deployer through their controller keys.",
        },
      ],
      conclusion:
        "Building beyond platforms means replacing every access-based infrastructure dependency with an ownership-based canister deployment. ICP provides the primitives to do this for the full stack — not just the smart contract layer. The result is a dapp that runs on the protocol, governed by its deployer, with no platform as an intermediary.",
    },
    quiz: {
      questions: [
        {
          id: "sov-09-q1",
          question:
            "Why are most Web3 projects not considered fully decentralized even when their smart contracts are on-chain?",
          options: [
            "Because their tokens are not listed on decentralized exchanges",
            "Because their frontends, auth systems, and databases rely on centralized Web2 platforms",
            "Because they have not passed a smart contract security audit",
            "Because their governance tokens are concentrated among early investors",
          ],
          correctAnswer: 1,
          explanation:
            "Most Web3 projects host their frontends on Vercel or Netlify and use Firebase or Auth0 for auth and data. This creates critical centralized dependencies that undermine decentralization at the infrastructure level.",
        },
        {
          id: "sov-09-q2",
          question:
            "What is the role of stable memory in a platform-free ICP dapp stack?",
          options: [
            "It provides a connection pool for external cloud database queries",
            "It serves as the on-chain data store that persists across canister upgrades without external database dependencies",
            "It caches frontend assets to improve CDN delivery performance",
            "It stores encrypted user credentials for Internet Identity recovery",
          ],
          correctAnswer: 1,
          explanation:
            "Stable memory is the canister's persistent data layer. It survives upgrades, is governed by the canister controller, and requires no external database subscription or connection. It is the data layer of a platform-free stack.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
  {
    id: "sov-10",
    title: "The Sovereign Internet",
    description:
      "Understand the long-arc vision of ICP as infrastructure for the post-platform internet — a network where compute, identity, and value are protocol-native and user-owned.",
    duration: "10-14 min",
    objectives: [
      "Articulate the vision of a post-platform internet built on protocol-native infrastructure",
      "Identify the role of ICP, Internet Identity, and ckBTC in this architecture",
      "Evaluate the current state of sovereign internet infrastructure and the work that remains",
    ],
    content: {
      introduction:
        "The internet was designed as a protocol, not a platform. Its original architecture distributed compute, routing, and data across independent nodes with no central authority. What followed was a century of progressive recentralization — cloud providers captured compute, identity was reissued by social platforms, and value flows were intermediated by payment networks. The sovereign internet is the project of reversing this recentralization, using protocol-native infrastructure to restore the original architecture at a higher level of capability.",
      sections: [
        {
          title: "The Recentralization Arc",
          content:
            "The internet's history is a story of centralization following democratization. Email was decentralized — then Gmail captured the majority of traffic. Websites were independently hosted — then AWS hosted most of the web. Identity was per-site — then Google and Facebook became the login layer for the internet. This recentralization was not accidental: it followed the economic gravity of network effects and operational convenience. Reversing it requires infrastructure that makes decentralization as convenient as centralization.",
        },
        {
          title: "ICP as the Compute Layer",
          content:
            "ICP was designed to host not just smart contracts but entire internet services — the same services that currently run on AWS and GCP. Canisters can serve web frontends, process API calls, store large datasets, and coordinate with other services — all on a decentralized subnet governed by the NNS. This positions ICP as the compute layer for the sovereign internet: a public infrastructure that any developer can deploy to, that no company controls, and that operates as long as its node operators maintain the network.",
        },
        {
          title: "Identity, Value, and Governance at Protocol Level",
          content:
            "Three infrastructure layers determine who controls the internet: compute (where code runs), identity (who users are), and value (how economic activity settles). ICP addresses all three: subnets provide sovereign compute, Internet Identity provides protocol-native auth, and ckBTC provides programmable Bitcoin settlement. The NNS and SNS provide on-chain governance. This is the full stack of sovereign internet infrastructure — not just one piece of it.",
        },
        {
          title: "The Work That Remains",
          content:
            "The sovereign internet is not complete. Developer tooling is maturing. Onboarding complexity remains higher than Web2 equivalents. The network effects that drive users to existing platforms are enormous and not easily reversed by better architecture alone. But the infrastructure exists. The protocol is live. Canisters are running. Internet Identity is deployed. ckBTC settles real Bitcoin value. The question is not whether sovereign internet infrastructure is possible — it is whether the development community will build enough of it to create the network effects that make it the default.",
        },
      ],
      conclusion:
        "The sovereign internet is the project of building protocol-native infrastructure that no company can control. ICP is the most complete implementation of this vision available today: a compute layer, an identity system, a value network, and a governance mechanism — all on-chain, all owned by the protocol, all governed by its participants. Building on ICP is not just deploying code. It is participating in the construction of the post-platform internet.",
    },
    quiz: {
      questions: [
        {
          id: "sov-10-q1",
          question:
            "What is the primary cause of internet recentralization according to the sovereign internet thesis?",
          options: [
            "Deliberate government regulation that mandated centralized infrastructure",
            "The economic gravity of network effects and operational convenience that made centralized platforms dominant",
            "Security vulnerabilities in decentralized protocols that forced migration to trusted providers",
            "User preference for subscription-based services over self-hosted alternatives",
          ],
          correctAnswer: 1,
          explanation:
            "Recentralization followed the economic gravity of network effects and operational convenience. Decentralized alternatives existed but could not match the convenience and scale economics of centralized platforms. Reversing this requires making decentralization as convenient as centralization.",
        },
        {
          id: "sov-10-q2",
          question:
            "What makes ICP the most complete sovereign internet infrastructure available today?",
          options: [
            "It has the highest transaction throughput of any Layer 1 blockchain",
            "It addresses compute, identity, value, and governance at the protocol level in a single integrated system",
            "It is the only blockchain that is fully compliant with GDPR and data residency regulations",
            "It has the largest developer community and most established ecosystem of any Web3 platform",
          ],
          correctAnswer: 1,
          explanation:
            "ICP addresses all four layers of sovereign internet infrastructure: compute (subnets), identity (Internet Identity), value (ckBTC), and governance (NNS/SNS) — all on-chain, all protocol-native, all governed by participants rather than a company.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 10,
  },
];

export const module05MegaQuizEN: LessonContent = {
  id: "sov-quiz",
  title: "Mega Quiz: Sovereign Systems Mastery",
  description:
    "Verify your understanding of sovereign system architecture across all ten dimensions: sovereignty, identity, compute, value, ownership, governance, UX, autonomy, platform-free building, and the sovereign internet.",
  duration: "15-20 min",
  objectives: [
    "Demonstrate mastery of the ten sovereign systems concepts",
    "Apply ICP-native sovereignty principles to architectural decisions",
    "Distinguish sovereign from platform-dependent approaches across all infrastructure layers",
  ],
  content: {
    introduction:
      "This Mega Quiz covers all ten lessons of Module 05: Sovereign Systems. Each question tests your ability to apply ICP-native sovereignty principles — not just recall definitions. Read carefully and reason from architecture, not abstraction.",
    sections: [],
    conclusion:
      "Passing this quiz confirms mastery of the Sovereign Systems module. You can now identify, design, and evaluate sovereign digital infrastructure across identity, compute, value, governance, and full-stack architecture.",
  },
  quiz: {
    questions: [
      {
        id: "sov-mq-01",
        question:
          "A developer asks: 'Is our system sovereign?' What is the most important question to answer first?",
        options: [
          "Is the frontend served over HTTPS with a valid TLS certificate?",
          "Who controls the identity, compute, and value layers — and can any of them be revoked by a third party?",
          "Is the codebase open source and audited by an external security firm?",
          "Does the system use a token with governance rights?",
        ],
        correctAnswer: 1,
        explanation:
          "Sovereignty is defined by control over identity, compute, and value — and whether that control can be revoked by a third party. These three questions determine whether a system is genuinely sovereign.",
      },
      {
        id: "sov-mq-02",
        question:
          "A user authenticates with Internet Identity and then authenticates with a Google account for the same dapp. What sovereignty property has been compromised?",
        options: [
          "Compute sovereignty — Google controls the execution environment",
          "Identity sovereignty — a platform-issued credential creates a revocable dependency",
          "Value sovereignty — Google's payment system is now in the settlement path",
          "Protocol sovereignty — the dapp is no longer governed by the NNS",
        ],
        correctAnswer: 1,
        explanation:
          "Adding a Google account login introduces a platform-issued identity credential that Google can revoke. This compromises identity sovereignty — the foundational layer of a sovereign system.",
      },
      {
        id: "sov-mq-03",
        question:
          "A canister on ICP runs out of cycles and stops executing. Is this a sovereignty failure?",
        options: [
          "Yes — the protocol failed to maintain uptime for the canister",
          "No — the operator controlled the cycles balance and chose not to top it up",
          "Yes — the NNS should guarantee uptime for all deployed canisters",
          "No — this is expected behavior and DFINITY will restore the canister automatically",
        ],
        correctAnswer: 1,
        explanation:
          "Running out of cycles is an operator decision — the controller chose not to maintain the cycles balance. This is not a protocol failure. The operator retained full control over the outcome, which is a property of sovereignty, not a violation of it.",
      },
      {
        id: "sov-mq-04",
        question:
          "A dapp uses ckBTC for all value transfers. A payment processor requests that the dapp block transactions from certain principals. What happens?",
        options: [
          "The dapp must comply because ckBTC is regulated like a payment service",
          "The payment processor has no mechanism to block ckBTC transfers — value flow is controlled by canister code, not external policy",
          "The NNS would pass a governance proposal to implement the block",
          "DFINITY would implement the block as part of its compliance obligations",
        ],
        correctAnswer: 1,
        explanation:
          "ckBTC transfers are governed by canister code, not external policy. A payment processor has no mechanism to block protocol-level transfers. The dapp developer controls the transfer logic — not any intermediary.",
      },
      {
        id: "sov-mq-05",
        question:
          "A dapp team wants to retain the ability to quickly fix bugs without a governance vote. What is the most appropriate ownership model on ICP?",
        options: [
          "Transfer control to an SNS immediately to maximize decentralization",
          "Keep a team-controlled upgrade key while documenting the architecture, then transition to SNS governance at a defined maturity milestone",
          "Use a multisig of 50 community members for all upgrades from day one",
          "Deploy with no controller key to prevent any future modifications",
        ],
        correctAnswer: 1,
        explanation:
          "Retaining a team upgrade key is appropriate during early development when rapid iteration is needed. A clear governance transition plan to SNS at a defined milestone balances operational agility with progressive decentralization.",
      },
      {
        id: "sov-mq-06",
        question:
          "The NNS passes a proposal to upgrade an ICP subnet's replica software. Who implements this upgrade?",
        options: [
          "DFINITY engineers manually push the update to each node operator",
          "The upgrade is executed automatically by the protocol following proposal passage",
          "Each node operator independently decides whether to apply the upgrade",
          "The subnet continues running the old software until the next scheduled maintenance window",
        ],
        correctAnswer: 1,
        explanation:
          "NNS governance proposals that pass are executed automatically by the protocol. There is no human administrator who implements the decision — the gap between governance decision and execution is closed by on-chain automation.",
      },
      {
        id: "sov-mq-07",
        question:
          "A dapp's frontend requires users to create a traditional account with email and password before accessing Internet Identity. What sovereignty property does this violate?",
        options: [
          "Compute sovereignty — the email server is centralized infrastructure",
          "Sovereign UX — the system extracts identity data that is not required for authentication and creates a platform-dependent onboarding layer",
          "Protocol sovereignty — the dapp is no longer compliant with ICP governance standards",
          "Value sovereignty — email addresses can be used for financial targeting",
        ],
        correctAnswer: 1,
        explanation:
          "Requiring email signup before Internet Identity authentication adds a platform-dependent identity extraction layer. It violates the sovereign UX principle: the system should not require data it does not need for its core function.",
      },
      {
        id: "sov-mq-08",
        question:
          "What is the difference between digital autonomy and digital sovereignty?",
        options: [
          "They are equivalent terms — digital autonomy is the marketing-friendly name for sovereignty",
          "Sovereignty refers to the system's architecture; autonomy refers to the operator's end-to-end control over keys, code, data, and uptime in practice",
          "Autonomy applies to individuals; sovereignty applies to nations and protocols",
          "Sovereignty is achieved through governance tokens; autonomy is achieved through encryption",
        ],
        correctAnswer: 1,
        explanation:
          "Sovereignty is an architectural property of the system — can it be stopped or revoked? Digital autonomy is the operator's practical experience of that sovereignty: owning the keys, running the code, persisting the data, and guaranteeing uptime through protocol properties.",
      },
      {
        id: "sov-mq-09",
        question:
          "A Web3 project claims to be fully decentralized. Its smart contracts are on Ethereum, its frontend is on Vercel, its auth uses Auth0, and its database is on Supabase. How would you evaluate this claim?",
        options: [
          "The claim is valid — the smart contracts are on a decentralized blockchain",
          "The claim is false — three of four infrastructure layers are centralized platform dependencies that can be unilaterally suspended",
          "The claim is partially valid — decentralization is measured only at the consensus layer",
          "The claim is valid if the smart contracts are upgradeable through governance voting",
        ],
        correctAnswer: 1,
        explanation:
          "Three of four infrastructure layers — frontend, auth, and database — are centralized platform dependencies. Vercel, Auth0, and Supabase can all unilaterally suspend the project. The smart contract layer being on-chain does not make the system fully decentralized.",
      },
      {
        id: "sov-mq-10",
        question:
          "What is the primary obstacle to the sovereign internet becoming the default architecture for new applications?",
        options: [
          "Protocol limitations — ICP cannot yet support the transaction volumes required for mainstream applications",
          "Network effects and operational convenience that make existing centralized platforms easier to use and build on than sovereign alternatives",
          "Regulatory barriers that prohibit deploying critical infrastructure on decentralized networks",
          "The lack of programming languages that support canister development",
        ],
        correctAnswer: 1,
        explanation:
          "The primary obstacle is not technical — it is economic and social. Existing platforms have massive network effects and are operationally convenient. The sovereign internet requires building enough on-chain infrastructure to create comparable network effects and developer experience.",
      },
    ],
  },
  creditsReward: 40,
  xpReward: 120,
};
