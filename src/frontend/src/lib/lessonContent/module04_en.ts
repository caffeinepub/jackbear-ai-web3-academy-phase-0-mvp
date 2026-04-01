import type { LessonContent } from "../lessonContent";

export const module04LessonsEN: LessonContent[] = [
  {
    id: "aec-01",
    title: "What Is an Agent Economy?",
    description:
      "Understand what an agent economy is and why ICP canisters are the natural substrate for autonomous economic participation.",
    duration: "12 min",
    objectives: [
      "Define an agent economy and its distinguishing properties",
      "Identify the role of canisters as autonomous economic actors",
      "Explain why protocol-native execution is required for trustless agent markets",
    ],
    content: {
      introduction:
        "An agent economy is a system in which autonomous software actors — not humans — initiate, execute, and settle economic transactions. On the Internet Computer, canisters are the primitive unit of this system. They hold state, execute logic, transact value, and coordinate with other actors — entirely on-chain, without requiring human authorization at runtime.",
      sections: [
        {
          title: "Agents as Economic Actors",
          content:
            "In a traditional economy, humans or institutions initiate transactions. In an agent economy, software actors do. These agents evaluate conditions, make decisions, and execute transactions autonomously. On ICP, a canister can hold ckBTC, evaluate market state, and settle a transaction in a single atomic execution — no human in the loop, no off-chain relay required.",
        },
        {
          title: "Why Protocol-Native Execution Matters",
          content:
            "Agent economies fail if their execution layer can be censored, halted, or modified by a third party. Cloud-hosted agents depend on infrastructure providers who can terminate services. ICP canisters run on a decentralized subnet governed by the NNS. No single entity can stop a running canister. This makes ICP the only compute layer that can host agents whose economic behavior is genuinely credible without trust in an operator.",
        },
        {
          title: "The Scope of Agent Markets",
          content:
            "Agent markets can operate at any scale — from a single canister that manages a treasury and pays for compute automatically, to multi-canister systems that coordinate bids, settlements, and redistribution across thousands of actors. The key property is that each agent acts according to its code, and that code is publicly verifiable and immutable unless upgraded through a defined governance process.",
        },
        {
          title: "ICP as the Foundation",
          content:
            "ICP provides the three primitives an agent economy requires: persistent state for maintaining positions and balances, deterministic execution for trustworthy outcomes, and native interoperability with Bitcoin via ckBTC for settling real economic value. No other compute layer combines all three at the protocol level.",
        },
      ],
      conclusion:
        "An agent economy is not a future concept. The infrastructure to run it exists now on ICP. Understanding its structure — agents as actors, protocol as enforcer, ckBTC as money — is the foundation for building systems that participate in markets without human mediation.",
    },
    quiz: {
      questions: [
        {
          id: "aec-01-q1",
          question:
            "What is the defining property of an agent economy compared to a traditional market?",
          options: [
            "Transactions are initiated and executed by autonomous software actors",
            "All transactions require multi-signature human approval",
            "Markets operate on a single centralized exchange",
            "Agents rely on off-chain oracles to settle trades",
          ],
          correctAnswer: 0,
          explanation:
            "An agent economy is one where autonomous software actors — not humans — initiate, execute, and settle transactions. On ICP, canisters fulfill this role natively.",
        },
        {
          id: "aec-01-q2",
          question:
            "Why is ICP better suited as the compute layer for an agent economy than a cloud provider?",
          options: [
            "Cloud providers offer lower latency for agent execution",
            "ICP canisters cannot be stopped by any single entity and run on a decentralized subnet",
            "Cloud agents have access to more financial APIs",
            "ICP enforces stricter rate limits on agent transactions",
          ],
          correctAnswer: 1,
          explanation:
            "ICP canisters run on subnets governed by the NNS — no single operator can terminate them. Cloud-hosted agents depend on infrastructure providers who can halt or censor execution at any time.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-02",
    title: "Agents That Earn",
    description:
      "Explore how canisters generate economic value and accumulate it autonomously on the Internet Computer.",
    duration: "12 min",
    objectives: [
      "Identify the mechanisms by which canisters earn value",
      "Understand how earning logic is encoded at the protocol level",
      "Distinguish between service fees, data monetization, and compute billing",
    ],
    content: {
      introduction:
        "A canister that earns is one that accepts value from callers or counter-parties in exchange for computation, data, or coordination. On ICP, this is a native capability — canisters can hold ICP and ckBTC, apply billing logic, and accumulate balances without a payment processor or intermediary.",
      sections: [
        {
          title: "Service Fee Models",
          content:
            "The simplest earning model is a service fee: a caller sends ICP or ckBTC with a request, and the canister executes only if the payment is valid. The canister checks the attached cycles or token transfer, performs the work, and retains the fee. This pattern enables fully autonomous monetization — no invoicing, no reconciliation, no human billing cycle.",
        },
        {
          title: "Data as Revenue",
          content:
            "Canisters can earn by selling access to data they produce or aggregate. A canister that tracks ICP subnet metrics, monitors ckBTC settlement rates, or indexes on-chain activity can charge per query or per subscription. The fee is enforced in code — no data is returned unless payment is verified. This creates a market for on-chain information with protocol-level access control.",
        },
        {
          title: "Compute Billing Between Agents",
          content:
            "In a multi-agent system, canisters can bill each other. A coordinator canister that routes work to specialist canisters can deduct fees from a shared pool before dispatching tasks. The specialist canisters receive compensation proportional to their output. All of this executes within ICP's consensus model — trustless, auditable, and without external payment infrastructure.",
        },
        {
          title: "Accumulation and Reinvestment",
          content:
            "A canister that earns can also reinvest. It can use accumulated ICP to purchase cycles and extend its own lifespan, fund child canisters, or contribute to a shared treasury. This creates self-sustaining agents — systems that earn enough to continue operating indefinitely without manual top-ups.",
        },
      ],
      conclusion:
        "Earning is a protocol-native capability for ICP canisters. The mechanisms — service fees, data access billing, inter-agent compute charges — are all executable in Motoko or Rust without external payment rails. This is what makes autonomous economic agents viable.",
    },
    quiz: {
      questions: [
        {
          id: "aec-02-q1",
          question:
            "Which of the following is a valid earning mechanism for an ICP canister?",
          options: [
            "Sending invoices to users via email and waiting for bank transfers",
            "Checking for a valid ICP or ckBTC payment before executing a service request",
            "Routing all revenue through a centralized payment processor",
            "Accumulating value only through NNS governance rewards",
          ],
          correctAnswer: 1,
          explanation:
            "A canister can enforce payment in code — checking that a valid ICP or ckBTC transfer is attached before executing. This is fully autonomous and requires no external payment infrastructure.",
        },
        {
          id: "aec-02-q2",
          question:
            "What does a self-sustaining canister do with its earnings?",
          options: [
            "Sends all earnings to the NNS treasury",
            "Uses accumulated value to purchase cycles and fund continued operation",
            "Converts earnings to fiat currency via a bridge",
            "Distributes earnings equally to all subnet validators",
          ],
          correctAnswer: 1,
          explanation:
            "A self-sustaining canister reinvests its earnings into cycles to extend its own lifespan, removing the need for manual top-ups from a human operator.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-03",
    title: "Agents That Spend",
    description:
      "Understand how canisters execute outbound payments and transact autonomously within ICP-native markets.",
    duration: "12 min",
    objectives: [
      "Describe how canisters initiate outbound transfers",
      "Understand cycles as native compute spend",
      "Identify conditions under which autonomous spending logic operates safely",
    ],
    content: {
      introduction:
        "Spending is the other side of the agent economy. A canister that can only receive value is limited. Canisters that can spend — pay for compute, settle obligations to counterparties, fund child canisters, and participate in auctions — are full economic actors.",
      sections: [
        {
          title: "Cycles as Native Spend",
          content:
            "Every canister on ICP spends cycles to execute. Cycles are the native unit of compute cost, pegged to a stable value in SDR. A canister that holds ICP can convert it to cycles and use them to run its own computation, fund new canisters it spawns, or transfer cycles to other canisters as payment for services. This is the lowest-level form of autonomous spending on ICP — compute paying for compute.",
        },
        {
          title: "Token Transfers as Settlement",
          content:
            "Beyond cycles, canisters can execute ICRC-1 token transfers to settle obligations. A canister holding ckBTC can call the ckBTC ledger, construct a transfer, and send value to any principal — another canister or a user wallet — without any human initiating the transaction. The transfer is triggered by the canister's own logic: a fulfilled condition, a completed task, or a scheduled settlement event.",
        },
        {
          title: "Bounded Spending Logic",
          content:
            "Autonomous spending requires guardrails. A canister should only spend within defined parameters: a maximum per-transaction limit, a daily cap, or a treasury reserve threshold. These constraints are enforced in code. A canister that spends without bounds is a liability — one that enforces spending rules in its own logic is a trustworthy economic actor.",
        },
        {
          title: "Spend-to-Coordinate",
          content:
            "In multi-agent systems, spending is often a coordination mechanism. A canister can pay another canister to prioritize its request, escrow funds pending a result, or release payment only after a verifiable condition is met. This spend-as-signal pattern enables market-driven coordination without a central dispatcher — agents negotiate priority through value rather than queue position.",
        },
      ],
      conclusion:
        "Spending is the mechanism by which agents participate in markets rather than just respond to them. ICP canisters can spend cycles for compute, tokens for settlement, and use spend as a coordination signal — all autonomously, all at protocol level.",
    },
    quiz: {
      questions: [
        {
          id: "aec-03-q1",
          question: "What are cycles on ICP and why do canisters spend them?",
          options: [
            "Cycles are ICP governance tokens spent to vote on proposals",
            "Cycles are the native unit of compute cost that canisters spend to execute operations",
            "Cycles are a user-facing reward token distributed for completing lessons",
            "Cycles are only used to pay for HTTPS outcalls",
          ],
          correctAnswer: 1,
          explanation:
            "Cycles are ICP's native unit of compute cost, pegged to a stable value. Canisters spend cycles to execute operations, fund child canisters, and pay for compute services.",
        },
        {
          id: "aec-03-q2",
          question:
            "Why is bounded spending logic important for an autonomous canister?",
          options: [
            "It prevents the canister from earning too much revenue",
            "It ensures the canister never spends beyond defined limits, making it a trustworthy economic actor",
            "It forces the canister to request human approval for every transaction",
            "It limits the canister to only spending on NNS-approved services",
          ],
          correctAnswer: 1,
          explanation:
            "Bounded spending logic — enforced in code — prevents runaway expenditure and makes canister behavior predictable and auditable, which is essential for trust in autonomous agents.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-04",
    title: "ckBTC as Agent Money",
    description:
      "Learn how ckBTC enables canisters to hold, transfer, and settle Bitcoin value natively on the Internet Computer.",
    duration: "13 min",
    objectives: [
      "Explain what ckBTC is and how it is minted and redeemed",
      "Understand why ckBTC is the preferred settlement token for agent economies",
      "Describe how canisters interact with the ckBTC ledger",
    ],
    content: {
      introduction:
        "ckBTC is a chain-key token on ICP that represents Bitcoin 1:1. It is minted by locking real BTC through ICP's threshold ECDSA protocol and redeemable for BTC at any time — no bridge operator, no custodian, no wrapped asset risk. For agents in an economy, ckBTC is programmable Bitcoin: a stable, credible unit of value that canisters can hold and transact natively.",
      sections: [
        {
          title: "How ckBTC Works",
          content:
            "A user sends BTC to an ICP-controlled address derived from threshold ECDSA keys held across subnet nodes. The ckBTC minter canister verifies the on-chain Bitcoin transaction and mints an equivalent amount of ckBTC on the ICRC-1 ledger. The BTC is held collectively — no single entity controls it. To redeem, the minter burns ckBTC and constructs a Bitcoin transaction signed by the subnet's threshold key.",
        },
        {
          title: "Why Agents Prefer ckBTC",
          content:
            "For agents transacting machine-to-machine, ckBTC is ideal. It has Bitcoin's settlement finality and scarcity, combined with ICP's fast transaction throughput and sub-cent fees. A canister holding ckBTC can settle obligations in milliseconds at near-zero cost — something impossible with on-chain Bitcoin directly. This makes ckBTC the practical unit of account for high-frequency agent settlements.",
        },
        {
          title: "Canister Interaction with the ckBTC Ledger",
          content:
            "Canisters interact with ckBTC through the ICRC-1 standard: calling transfer to move value, balance_of to check holdings, and approve/transfer_from for delegated spending patterns. All of these are inter-canister calls — no external API, no bridge relay, no wallet confirmation required at runtime. A canister can fully manage a ckBTC balance and execute transfers in a single atomic execution cycle.",
        },
        {
          title: "ckBTC in Multi-Agent Settlements",
          content:
            "In a multi-canister system, ckBTC enables trustless settlement between agents. An escrow canister can hold ckBTC and release it to a counterparty only after a condition is verified by a third canister. No human needs to authorize the release. The entire settlement chain executes on-chain, with Bitcoin-level value and ICP-level speed. This is programmable Bitcoin settlement.",
        },
      ],
      conclusion:
        "ckBTC is not a stablecoin or a wrapped asset with bridge risk. It is Bitcoin made programmable at the protocol level. For agents that need to hold, transfer, and settle real economic value, ckBTC is the native money of the ICP agent economy.",
    },
    quiz: {
      questions: [
        {
          id: "aec-04-q1",
          question: "How is ckBTC minted on the Internet Computer?",
          options: [
            "A centralized custodian wraps BTC and issues ckBTC tokens",
            "BTC is locked at an ICP-controlled address via threshold ECDSA, and the ckBTC minter issues equivalent tokens",
            "ICP validators purchase BTC on exchanges and distribute ckBTC to users",
            "ckBTC is minted by staking ICP in the NNS",
          ],
          correctAnswer: 1,
          explanation:
            "ckBTC is minted by locking real BTC at an address controlled by ICP's threshold ECDSA protocol. No custodian holds the BTC — it is held collectively by subnet nodes.",
        },
        {
          id: "aec-04-q2",
          question:
            "Why is ckBTC preferred over native Bitcoin for machine-to-machine agent settlements?",
          options: [
            "ckBTC has higher volatility, making it better for arbitrage agents",
            "ckBTC settles in milliseconds at near-zero fees while maintaining Bitcoin's value properties",
            "ckBTC is minted by the ICP foundation and has no redemption risk",
            "Native Bitcoin can be directly called by ICP canisters without any wrapper",
          ],
          correctAnswer: 1,
          explanation:
            "ckBTC combines Bitcoin's value properties with ICP's fast, low-cost transaction throughput — making it practical for high-frequency agent settlements that would be impossible directly on the Bitcoin network.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-05",
    title: "ICP as Compute Fuel",
    description:
      "Understand how ICP token economics power autonomous agents and how agents manage their own compute costs.",
    duration: "12 min",
    objectives: [
      "Explain the relationship between ICP and cycles",
      "Understand how agents self-fund compute costs",
      "Describe the reverse gas model and its implications for agent design",
    ],
    content: {
      introduction:
        "Every computation on ICP has a cost measured in cycles. Cycles are purchased by burning ICP at a rate pegged to a fiat reference value. For agents, this creates a clear economic model: earning ICP or ckBTC, converting to cycles, and spending cycles on computation. The agent that manages this loop autonomously is self-sustaining.",
      sections: [
        {
          title: "The Reverse Gas Model",
          content:
            "ICP uses a reverse gas model: canisters pay for their own computation, not callers. This is the opposite of Ethereum, where users pay gas for every transaction. On ICP, a developer or an agent deploys a canister and pre-funds it with cycles. Callers interact for free. This model is essential for agent economies — agents can offer services without imposing transaction costs on every participant, lowering friction and enabling high-frequency interactions.",
        },
        {
          title: "ICP-to-Cycles Conversion",
          content:
            "ICP is burned to create cycles at a rate determined by the ICP/XDR price. XDR is the IMF's Special Drawing Right — a basket of major currencies. This pegging keeps compute costs predictable regardless of ICP token price. A canister holding ICP can call the cycles minting canister to burn ICP and credit cycles to its own balance — a fully on-chain, autonomous operation.",
        },
        {
          title: "Compute Cost as an Operating Expense",
          content:
            "For an autonomous agent, cycles are an operating expense like electricity for a data center. A well-designed agent tracks its cycle balance, projects usage, and triggers ICP-to-cycles conversion before its balance drops below a safe threshold. This is not complex — it requires reading the canister's own cycle balance and executing a conversion call when a condition is met. Agents that automate this never require manual top-ups.",
        },
        {
          title: "Earning Enough to Fuel Execution",
          content:
            "The economic test for any agent is whether it earns enough to sustain its own compute costs. An agent that earns 0.001 ICP per service call and spends 0.00001 ICP in compute per call operates at a 100x efficiency ratio. This surplus can fund growth — spawning new canisters, expanding storage, or contributing to a shared treasury. Sustainable agents design their earning-to-spend ratio first.",
        },
      ],
      conclusion:
        "ICP is the compute fuel of the agent economy. Understanding how ICP converts to cycles, how the reverse gas model reduces friction, and how agents self-fund their compute costs is essential to designing agents that operate indefinitely without human intervention.",
    },
    quiz: {
      questions: [
        {
          id: "aec-05-q1",
          question: "What is the reverse gas model on ICP?",
          options: [
            "Callers pay gas for every transaction they send to a canister",
            "Canisters pre-fund their own compute costs with cycles, allowing callers to interact for free",
            "The NNS pays all compute costs on behalf of canisters",
            "Compute costs are refunded to canisters after each successful execution",
          ],
          correctAnswer: 1,
          explanation:
            "In ICP's reverse gas model, canisters pay for their own computation using cycles. Callers do not pay gas, which reduces friction and enables high-frequency agent interactions.",
        },
        {
          id: "aec-05-q2",
          question:
            "How does a canister convert ICP to cycles for autonomous operation?",
          options: [
            "It sends ICP to a human operator who manually purchases cycles",
            "It calls the cycles minting canister to burn ICP and credit cycles to its own balance",
            "It stakes ICP in the NNS to receive cycle rewards",
            "It exchanges ICP for ckBTC and then redeems ckBTC for cycles",
          ],
          correctAnswer: 1,
          explanation:
            "A canister can call the cycles minting canister to burn ICP and receive cycles — a fully on-chain, autonomous operation that requires no human intervention.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-06",
    title: "Machine-to-Machine Payments",
    description:
      "Explore how canisters transact directly with each other and what enables trustless machine-to-machine value exchange on ICP.",
    duration: "13 min",
    objectives: [
      "Define machine-to-machine payments in the context of ICP canisters",
      "Understand atomic inter-canister settlements",
      "Identify patterns for trustless payment flows between agents",
    ],
    content: {
      introduction:
        "Machine-to-machine payments are transactions where no human authorizes each individual transfer. The authorization is encoded in the logic of each canister at deployment. On ICP, these payments are executed as inter-canister calls — synchronous or asynchronous messages that transfer cycles or tokens between canisters operating within the same subnet or across subnets.",
      sections: [
        {
          title: "Inter-Canister Calls as Payment Primitives",
          content:
            "A canister paying another canister is structurally identical to a canister calling a function on another canister. The payment is an ICRC-1 transfer call — the calling canister sends a transfer message to the ckBTC or ICP ledger, specifying the recipient canister's principal and the amount. The ledger deducts from the sender and credits the recipient atomically. No confirmation required from either party beyond the ledger's execution.",
        },
        {
          title: "Atomic Settlement Patterns",
          content:
            "ICP supports atomic cross-canister operations within a subnet. A canister can structure a multi-step payment: transfer funds to an escrow canister, call the service canister, await a response, and then release payment — all within a defined flow. If any step fails, the state rolls back. This enables trustless settlement without a third-party arbiter: the protocol enforces atomicity.",
        },
        {
          title: "Asynchronous Payment Channels",
          content:
            "Not all machine payments need to settle immediately. Canisters can implement payment channels: establish a channel with an initial deposit, accumulate obligations over many interactions, and settle the net position in a single final transaction. This reduces on-chain overhead for high-frequency agent interactions — micro-payments accumulate off the critical execution path and settle in batches.",
        },
        {
          title: "Trust in Protocol, Not Counterparties",
          content:
            "In machine-to-machine payments, the trust anchor is the protocol — not the identity or reputation of the counterparty. A canister can verify that it is calling a known, immutable canister by checking its hash or module hash. Payment is released only when the verifiable condition is met. No counterparty trust required — only code verification.",
        },
      ],
      conclusion:
        "Machine-to-machine payments on ICP are not a novelty feature — they are a production-ready capability. Inter-canister calls, ICRC-1 transfers, atomic settlement, and verifiable canister identity together enable payment flows that require no human authorization at runtime.",
    },
    quiz: {
      questions: [
        {
          id: "aec-06-q1",
          question: "How does one canister pay another canister on ICP?",
          options: [
            "By sending an email notification to the receiving canister's administrator",
            "By calling an ICRC-1 transfer on the ledger canister with the recipient's principal",
            "By staking ICP on behalf of the counterparty",
            "By submitting a governance proposal to approve the payment",
          ],
          correctAnswer: 1,
          explanation:
            "A canister pays another by calling the ICRC-1 ledger with a transfer specifying the recipient canister's principal. The ledger executes the transfer atomically with no human confirmation required.",
        },
        {
          id: "aec-06-q2",
          question:
            "What is the trust anchor for machine-to-machine payments on ICP?",
          options: [
            "The reputation score of the counterparty canister's developer",
            "A centralized payment processor that validates both parties",
            "The protocol itself — enforcing atomicity and allowing code verification",
            "NNS approval of each inter-canister payment",
          ],
          correctAnswer: 2,
          explanation:
            "Trust in machine-to-machine payments comes from the protocol — atomic execution, deterministic state, and verifiable canister code — not from counterparty identity or reputation.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-07",
    title: "Autonomous Treasury Logic",
    description:
      "Learn how canisters manage collective funds autonomously through treasury logic encoded at the protocol level.",
    duration: "13 min",
    objectives: [
      "Define a canister-based treasury and its components",
      "Understand automated fund allocation and disbursement patterns",
      "Identify how treasury logic can be governed without human operators",
    ],
    content: {
      introduction:
        "A treasury canister is an autonomous fund manager. It holds ICP, ckBTC, or other ICRC-1 tokens and executes allocation, disbursement, and rebalancing logic encoded in its own state. No human operator approves individual transactions — the rules are encoded at deployment, upgradeable through governance, and executed automatically.",
      sections: [
        {
          title: "Treasury as a Canister",
          content:
            "A treasury is not a multisig wallet — it is a canister with financial logic. It can hold multiple assets, track inflows and outflows, apply spending rules, and distribute funds to addresses or other canisters based on conditions. The treasury canister is the financial brain of an agent system: it controls where value flows without requiring instruction from any single human.",
        },
        {
          title: "Automated Allocation",
          content:
            "Allocation logic defines how incoming funds are distributed. A treasury canister might reserve 40% of incoming ckBTC for compute costs (converted to cycles), distribute 30% to contributor canisters based on their output metrics, hold 20% as a reserve buffer, and allocate 10% to a governance escrow. All of these allocations execute automatically on each inbound transfer — no approval step required.",
        },
        {
          title: "Disbursement Conditions",
          content:
            "Disbursements from a treasury can be triggered by on-chain conditions: a milestone completion verified by an oracle canister, a threshold reached in a metric tracked by a monitoring canister, or a time-based release schedule enforced by a timer. Each condition is encoded in the treasury's logic. Once met, the disbursement executes automatically — trustlessly, without human instruction.",
        },
        {
          title: "Governance Over Treasury Logic",
          content:
            "Treasury logic is not immutable by default — it can be upgraded through a governance process. An SNS (Service Nervous System) can govern a treasury canister: community token holders vote on changes to allocation percentages, spending limits, or disbursement conditions. The treasury upgrades only when a proposal passes. This creates a path from fully autonomous operation to community-governed financial management.",
        },
      ],
      conclusion:
        "Autonomous treasury logic is one of the most powerful applications of canisters in an agent economy. When combined with ckBTC for real value settlement, ICP for compute, and governance for rule changes, a treasury canister becomes a fully autonomous financial institution operating at protocol level.",
    },
    quiz: {
      questions: [
        {
          id: "aec-07-q1",
          question:
            "What distinguishes a treasury canister from a multisig wallet?",
          options: [
            "A treasury canister requires more signers to approve transactions",
            "A treasury canister encodes financial logic and executes allocations automatically without per-transaction approval",
            "A treasury canister can only hold ICP, not ckBTC",
            "A treasury canister is controlled by a single administrator key",
          ],
          correctAnswer: 1,
          explanation:
            "A treasury canister is not a wallet — it is a canister with financial logic. Allocations and disbursements execute automatically based on encoded rules, with no per-transaction human approval.",
        },
        {
          id: "aec-07-q2",
          question:
            "How can treasury logic be updated without compromising its autonomous nature?",
          options: [
            "A single developer deploys a new version unilaterally",
            "Treasury rules are permanent and can never be changed",
            "Community token holders vote on changes through SNS governance proposals",
            "The NNS automatically updates all treasury canisters monthly",
          ],
          correctAnswer: 2,
          explanation:
            "An SNS can govern a treasury canister — token holders vote on changes to allocation or disbursement rules. The canister upgrades only when a proposal passes, maintaining both autonomy and community control.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-08",
    title: "Incentives and Coordination",
    description:
      "Explore how incentive structures coordinate autonomous agents without centralized direction on the Internet Computer.",
    duration: "12 min",
    objectives: [
      "Explain how incentives replace centralized coordination in agent systems",
      "Understand token-based incentive design for canister networks",
      "Identify failure modes when incentives are misaligned",
    ],
    content: {
      introduction:
        "In a multi-agent system, coordination is the hard problem. Without a central director, how do agents align their behavior toward a shared outcome? The answer is incentives — value structures that make the desired behavior the most economically rational choice. On ICP, these incentives are encoded in canister logic and enforced by the protocol.",
      sections: [
        {
          title: "Incentives as Coordination Mechanisms",
          content:
            "When every agent acts in its own economic interest and that interest aligns with system-level goals, coordination emerges without direction. An agent that earns more for producing higher-quality output will optimize for quality. An agent that is penalized for downtime will prioritize reliability. The incentive structure is the coordination mechanism — encode it correctly and the system self-organizes.",
        },
        {
          title: "Token-Based Incentive Design",
          content:
            "ICRC-1 tokens on ICP enable custom incentive economies. A system can issue its own token as a reward for desirable agent behavior — completing tasks, providing data, maintaining uptime, or contributing to shared infrastructure. Tokens are distributable by a reward canister that evaluates agent contributions and mints proportional rewards. The token itself becomes a claim on future system value, aligning agent behavior with system health.",
        },
        {
          title: "Coordination Through Staking",
          content:
            "Staking is a commitment mechanism: an agent locks value to signal intent and accept slashing risk if behavior deviates from protocol. In a canister network, a service canister can require callers to stake ckBTC before accessing a high-trust function. If the caller behaves maliciously, the stake is slashed. This is a Sybil-resistant coordination primitive — credible commitment through locked value, enforced in code.",
        },
        {
          title: "Misalignment and Failure Modes",
          content:
            "Incentive systems fail when agents find it more profitable to defect than cooperate. This happens when reward signals are too noisy, when collusion is more valuable than honest behavior, or when the cost of misbehavior is lower than its benefit. Designing agent incentives requires game-theoretic rigor — not just functional code. The most dangerous failures are not bugs but correctly functioning agents optimizing for the wrong objective.",
        },
      ],
      conclusion:
        "Incentives are the governance layer of an agent economy. When designed well, they replace coordination overhead with emergent alignment. On ICP, the tools for this — tokens, staking, slashing, reward canisters — are all protocol-native and encodable in Motoko or Rust.",
    },
    quiz: {
      questions: [
        {
          id: "aec-08-q1",
          question:
            "How do incentives replace centralized coordination in a multi-agent system?",
          options: [
            "A central coordinator broadcasts instructions to all agents simultaneously",
            "Incentive structures make the desired behavior the most economically rational choice for each agent",
            "Agents are programmed to ignore their own economic interest",
            "Coordination is enforced by regular human audits of agent behavior",
          ],
          correctAnswer: 1,
          explanation:
            "When economic incentives align individual agent interests with system goals, coordination emerges without centralized direction. Each agent optimizes for itself and the system benefits.",
        },
        {
          id: "aec-08-q2",
          question:
            "What is the purpose of staking in an agent coordination system?",
          options: [
            "To slow down agent transactions and prevent spam",
            "To lock value as a credible commitment, with slashing risk for misbehavior",
            "To distribute governance tokens to all participants equally",
            "To replace cycle payments between canisters",
          ],
          correctAnswer: 1,
          explanation:
            "Staking locks value as a commitment signal. If an agent misbehaves, its stake is slashed. This creates a Sybil-resistant mechanism that aligns agent behavior through credible economic risk.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-09",
    title: "Real-World Agent Markets",
    description:
      "Examine concrete agent market applications running or buildable on ICP today.",
    duration: "13 min",
    objectives: [
      "Identify real-world agent market patterns deployable on ICP",
      "Understand how existing ICP primitives enable specific market types",
      "Connect theoretical agent economy concepts to current production use cases",
    ],
    content: {
      introduction:
        "Agent markets are not theoretical. The primitives that enable them — canisters, ckBTC, ICRC-1 tokens, timers, inter-canister calls — are live on ICP today. The gap is not infrastructure. It is application. Understanding what markets are now buildable is the most direct path to building them.",
      sections: [
        {
          title: "Compute Markets",
          content:
            "A compute market matches agents that need computation with canisters that supply it. A requester canister posts a job with a ckBTC bounty. Worker canisters bid and execute. The escrow canister releases payment on verified completion. This is a decentralized compute marketplace — Mechanical Turk for canisters — running entirely on-chain with no platform operator required.",
        },
        {
          title: "Data Markets",
          content:
            "Data markets enable canisters to sell structured information to other canisters. A canister that monitors ICP price feeds, subnet health, or ckBTC transfer volumes can charge per query. Access is gated by prepaid ckBTC transfer. The buyer canister calls the data canister, the data canister verifies payment, and the data is returned in the same call. No API key, no rate limit contract, no human intervention.",
        },
        {
          title: "Prediction and Coordination Markets",
          content:
            "Prediction markets allow agents to stake on outcomes and receive rewards for accurate predictions. On ICP, a prediction market canister can accept ckBTC stakes, resolve outcomes based on on-chain data from oracle canisters, and distribute winnings automatically. The entire lifecycle — stake, resolve, pay — runs in canister logic without a human operator managing settlement.",
        },
        {
          title: "Autonomous Service Economies",
          content:
            "The broadest application is autonomous service economies: networks of canisters that provide services to users and to each other, with ckBTC flowing between them as value for services rendered. A user pays ckBTC to a coordinator canister. The coordinator routes work to specialist canisters, deducts fees, and returns a result. Each specialist earns ckBTC, converts to cycles, and continues operating. The entire economy sustains itself.",
        },
      ],
      conclusion:
        "Compute markets, data markets, prediction markets, and autonomous service economies are all buildable on ICP with existing infrastructure. The agent economy is not a roadmap item — it is an engineering decision.",
    },
    quiz: {
      questions: [
        {
          id: "aec-09-q1",
          question:
            "In a canister-based compute market, how does a worker canister receive payment for completing a job?",
          options: [
            "The requester manually approves payment after reviewing the output",
            "An escrow canister releases ckBTC automatically upon verified job completion",
            "Worker canisters are paid in ICP governance rewards",
            "Payment is handled by a centralized platform operator",
          ],
          correctAnswer: 1,
          explanation:
            "In an on-chain compute market, an escrow canister holds the bounty and releases ckBTC to the worker canister automatically once completion is verified — no human approval required.",
        },
        {
          id: "aec-09-q2",
          question:
            "What makes data markets on ICP trustless compared to traditional API-based data services?",
          options: [
            "Data canisters require users to register and create accounts",
            "Payment and data delivery are handled atomically in a single inter-canister call, with no human operator",
            "Data markets on ICP use ZK proofs to verify data authenticity",
            "The NNS audits all data transactions for compliance",
          ],
          correctAnswer: 1,
          explanation:
            "In ICP data markets, a buyer canister verifies payment and receives data in the same atomic inter-canister call. No API key, no contract with a human operator, no trust in a platform.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
  {
    id: "aec-10",
    title: "The Future of Autonomous Commerce",
    description:
      "Examine the trajectory of agent economies on ICP and the systemic shifts autonomous commerce will produce.",
    duration: "12 min",
    objectives: [
      "Describe the long-term trajectory of agent economies on ICP",
      "Identify the systemic changes autonomous commerce will produce",
      "Position ICP's current infrastructure within the broader evolution of autonomous markets",
    ],
    content: {
      introduction:
        "Autonomous commerce is the endpoint of a long transition: from human-mediated markets to protocol-enforced markets. The transition does not require a new economic system — it requires a new compute layer. ICP is that layer. The question is not whether autonomous commerce will emerge but how fast the applications will be built.",
      sections: [
        {
          title: "From Platforms to Protocols",
          content:
            "Current digital commerce runs on platforms — companies that intermediate between buyers and sellers, take fees, and control access. Protocol-native commerce removes the platform. Canisters transact directly, fees are burned or distributed to token holders, and access is governed by code. Platform margins become protocol efficiencies. The intermediary's economic role is absorbed by autonomous logic.",
        },
        {
          title: "Agent Proliferation",
          content:
            "As tooling matures, the cost of deploying autonomous agents drops. What requires a team of developers today will require a single prompt tomorrow. The number of active agents on ICP will scale faster than the number of human users. Agents will manage portfolios, execute service contracts, coordinate logistics, and settle invoices — all without human initiation. The ratio of machine-to-human economic activity will invert.",
        },
        {
          title: "Sovereignty at the Individual Level",
          content:
            "Autonomous commerce extends economic sovereignty to individuals. A person with a canister and ckBTC can participate in markets that previously required institutional access — trading, lending, service provision, compute supply. The canister is the equalizer: it executes the same logic regardless of who deployed it. Economic participation becomes a function of code, not of institutional affiliation.",
        },
        {
          title: "ICP's Position in This Transition",
          content:
            "ICP is uniquely positioned because it combines the three requirements of autonomous commerce: a compute layer that cannot be censored or shut down, a native Bitcoin settlement path via ckBTC without bridge risk, and a governance system (NNS/SNS) that can evolve the rules of the economy without forking the chain. No other protocol offers all three. The agent economy will run where the infrastructure is most capable.",
        },
      ],
      conclusion:
        "Autonomous commerce is not a distant future — it is an engineering problem being solved now. The infrastructure exists. The primitives are live. What remains is the application layer: developers and system designers who understand the stack deeply enough to build the first generation of autonomous economic systems on ICP.",
    },
    quiz: {
      questions: [
        {
          id: "aec-10-q1",
          question:
            "What is the key shift from platform commerce to protocol commerce?",
          options: [
            "Platforms are replaced by government-regulated exchanges",
            "Intermediary platform logic is replaced by autonomous canister logic, removing platform fees and access control",
            "All commerce moves to a single universal ICP-based marketplace",
            "Users gain the ability to negotiate fees directly with platform operators",
          ],
          correctAnswer: 1,
          explanation:
            "Protocol commerce removes the intermediary: canisters transact directly, fees flow to token holders or are burned, and access is governed by code rather than platform policy.",
        },
        {
          id: "aec-10-q2",
          question:
            "What three properties make ICP uniquely suited for the autonomous commerce transition?",
          options: [
            "High throughput, low latency, and support for Solidity smart contracts",
            "Censorship-resistant compute, native Bitcoin settlement via ckBTC, and protocol-level governance via NNS/SNS",
            "Central bank integration, regulatory compliance tools, and fiat on-ramps",
            "Ethereum compatibility, ZK rollup support, and Layer 2 scaling",
          ],
          correctAnswer: 1,
          explanation:
            "ICP combines censorship-resistant compute (decentralized subnets), native Bitcoin settlement (ckBTC via threshold ECDSA), and protocol-level governance (NNS/SNS) — the three requirements for credible autonomous commerce.",
        },
      ],
    },
    creditsReward: 10,
    xpReward: 80,
  },
];

export const module04MegaQuizEN: LessonContent = {
  id: "aec-quiz",
  title: "Mega Quiz: Agent Economy Mastery",
  description:
    "Verify your command of the Agent Economy module — from agent earning and spending to ckBTC settlement and autonomous markets.",
  duration: "15 min",
  objectives: [
    "Demonstrate understanding of agent economy fundamentals",
    "Apply knowledge of ckBTC, ICP cycles, and machine-to-machine payments",
    "Confirm readiness to design and reason about autonomous economic systems",
  ],
  content: {
    introduction:
      "This Mega Quiz covers all ten Agent Economy lessons. A perfect score is required. Verify your understanding before proceeding to Module 05.",
    sections: [],
    conclusion: "",
  },
  quiz: {
    questions: [
      {
        id: "aec-mq-01",
        question:
          "What defines an agent economy compared to a traditional market?",
        options: [
          "Transactions require multi-signature human approval",
          "Autonomous software actors initiate, execute, and settle transactions",
          "Markets operate on a single centralized exchange",
          "Agents rely on cloud APIs to settle trades",
        ],
        correctAnswer: 1,
        explanation:
          "In an agent economy, autonomous software actors — not humans — handle transactions end-to-end.",
      },
      {
        id: "aec-mq-02",
        question:
          "How does a canister earn by providing data to other canisters?",
        options: [
          "It submits invoices to a billing platform",
          "It gates data behind a verified ckBTC or ICP payment, returning data only after confirmation",
          "It sends data freely and earns through advertising",
          "It registers with the NNS to receive data provision rewards",
        ],
        correctAnswer: 1,
        explanation:
          "A data canister verifies payment before returning data — enforcing monetization in code with no human billing step.",
      },
      {
        id: "aec-mq-03",
        question:
          "What is the primary safety mechanism for autonomous canister spending?",
        options: [
          "Human approval for each outbound transfer",
          "Bounded spending logic encoded in the canister — limits enforced in code",
          "NNS governance approval for all transactions",
          "Rate limiting imposed by the subnet",
        ],
        correctAnswer: 1,
        explanation:
          "Bounded spending logic — per-transaction caps, daily limits, reserve thresholds — is encoded in the canister itself and executed automatically without human oversight.",
      },
      {
        id: "aec-mq-04",
        question:
          "Why is ckBTC preferred over native Bitcoin for agent settlements?",
        options: [
          "ckBTC has higher price volatility",
          "ckBTC settles in milliseconds at near-zero fees while maintaining Bitcoin value properties",
          "Native Bitcoin can be called directly from ICP canisters",
          "ckBTC is minted by the ICP foundation with no redemption mechanism",
        ],
        correctAnswer: 1,
        explanation:
          "ckBTC combines Bitcoin's value properties with ICP's fast, low-cost transaction throughput — essential for high-frequency agent settlements.",
      },
      {
        id: "aec-mq-05",
        question:
          "What does ICP's reverse gas model enable for agent economies?",
        options: [
          "Users pay gas for every interaction with a canister",
          "Canisters pre-fund their own compute, allowing callers to interact for free and reducing friction",
          "The NNS pays all compute costs on behalf of all canisters",
          "Agents only pay for compute when they earn revenue",
        ],
        correctAnswer: 1,
        explanation:
          "In the reverse gas model, canisters pay their own compute costs with cycles. This removes transaction friction for callers, enabling high-frequency agent interactions.",
      },
      {
        id: "aec-mq-06",
        question:
          "How does machine-to-machine payment achieve trustlessness on ICP?",
        options: [
          "Through reputation scores maintained by a payment processor",
          "Through protocol-enforced atomicity and verifiable canister code",
          "Through multi-sig approval from both canister operators",
          "Through ZK proofs attached to each transfer",
        ],
        correctAnswer: 1,
        explanation:
          "Trust comes from the protocol — atomic execution enforces payment correctness, and verifiable canister code confirms counterparty behavior without needing to trust the operator.",
      },
      {
        id: "aec-mq-07",
        question:
          "What distinguishes a treasury canister from a multisig wallet?",
        options: [
          "A treasury canister requires more human signers",
          "A treasury canister executes allocation and disbursement logic automatically without per-transaction approval",
          "A treasury canister can only hold one token type",
          "A treasury canister is controlled by a single private key",
        ],
        correctAnswer: 1,
        explanation:
          "A treasury canister is a financial logic engine — it distributes and disburses funds based on encoded rules, with no individual transaction approvals from humans.",
      },
      {
        id: "aec-mq-08",
        question:
          "When incentive design fails in a multi-agent system, what is the typical cause?",
        options: [
          "Too many agents competing for the same task",
          "Agents correctly optimizing for a misaligned objective",
          "Insufficient compute on the ICP subnet",
          "Token rewards denominated in the wrong currency",
        ],
        correctAnswer: 1,
        explanation:
          "The most dangerous failures are not code bugs — they are correctly-functioning agents optimizing for the wrong objective because the incentive structure is misaligned.",
      },
      {
        id: "aec-mq-09",
        question:
          "In a canister-based compute market, who authorizes payment to a worker canister?",
        options: [
          "The requester reviews the output and manually approves",
          "An escrow canister releases payment automatically upon verified completion",
          "The NNS arbitrates all compute market settlements",
          "Worker canisters self-report completion to the ledger",
        ],
        correctAnswer: 1,
        explanation:
          "An escrow canister holds the bounty and releases ckBTC automatically when completion is verified — no human approval, no platform operator.",
      },
      {
        id: "aec-mq-10",
        question:
          "What three properties make ICP uniquely suited for autonomous commerce?",
        options: [
          "High TPS, Solidity support, and Ethereum bridge",
          "Censorship-resistant compute, native Bitcoin settlement via ckBTC, and protocol governance via NNS/SNS",
          "Central bank integration, fiat on-ramps, and regulatory compliance tools",
          "ZK rollups, Layer 2 scaling, and EVM compatibility",
        ],
        correctAnswer: 1,
        explanation:
          "ICP combines censorship-resistant compute, ckBTC for native Bitcoin settlement (no bridge risk), and NNS/SNS governance — the three foundations of credible autonomous commerce.",
      },
    ],
  },
  creditsReward: 40,
  xpReward: 120,
};
