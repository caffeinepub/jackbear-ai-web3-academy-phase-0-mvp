// Module 02: Agent Systems — Verifiable Intelligence Layer
// 10 lessons + 1 Mega Quiz lesson
import type { LessonContent } from "../lessonContent";

export const module02LessonsEN: LessonContent[] = [
  {
    id: "ags-01",
    title: "What Is an AI Agent?",
    description:
      "Understand what an AI agent is, how it differs from a simple AI model, and why the distinction matters for autonomous systems.",
    duration: "10 min",
    objectives: [
      "Define an AI agent and its core operational properties",
      "Distinguish agents from passive AI models",
      "Identify the perceive-decide-act loop that governs agents",
      "Recognize why agency requires more than inference alone",
    ],
    content: {
      introduction:
        "A language model that answers questions is not an agent. An agent perceives its environment, makes decisions, and executes actions — repeatedly, over time, without requiring human intervention for each step. This distinction is the foundation of everything in this module.",
      sections: [
        {
          title: "Beyond Inference",
          content:
            "Most AI systems operate in a single-shot mode: receive input, produce output, stop. An agent breaks this pattern. It maintains state across time, selects from a set of available actions, and uses the results of those actions to determine what to do next. The feedback loop is what separates an agent from a model.",
        },
        {
          title: "The Perceive-Decide-Act Loop",
          content:
            "Every agent, regardless of implementation, runs a core loop: perceive the current state of the environment, decide which action to take based on a goal or policy, act by executing that action, then perceive the updated environment. This loop runs continuously. The agent's intelligence lives in the decision step — how it maps observations to actions in pursuit of an objective.",
        },
        {
          title: "Goals, Policies, and Autonomy",
          content:
            "An agent is directed by a goal — a desired state it is trying to reach. The policy is the strategy it uses to reach that goal: a mapping from situations to actions. Autonomy means the agent executes this policy without human approval at each step. The degree of autonomy is a design choice: some agents operate fully independently; others check in with humans at defined decision points.",
        },
        {
          title: "Why Agents Need Trustworthy Infrastructure",
          content:
            "An agent that acts autonomously on behalf of a user must be trusted to execute correctly, not just reason correctly. If an agent can be tampered with mid-execution, or if its actions can be censored by the infrastructure it runs on, it is not truly autonomous. This is why the execution environment for agents is as important as the agent's intelligence — and why protocol-level compute matters.",
        },
      ],
      conclusion:
        "An AI agent is not just a smarter model — it is a fundamentally different operational mode. Understanding the perceive-decide-act loop and the role of goals and policies is the prerequisite for everything that follows in this module.",
    },
    quiz: {
      questions: [
        {
          id: "ags-01-q1",
          question: "What distinguishes an AI agent from a passive AI model?",
          options: [
            "Agents produce longer outputs",
            "Agents perceive their environment, make decisions, and execute actions over time",
            "Agents require more training data",
            "Agents use a different neural architecture",
          ],
          correctAnswer: 1,
          explanation:
            "An agent runs a continuous perceive-decide-act loop, maintaining state and executing actions over time — unlike a model that simply produces a single output in response to a single input.",
        },
        {
          id: "ags-01-q2",
          question: "What is a policy in the context of an AI agent?",
          options: [
            "A legal document governing AI usage",
            "The hardware the agent runs on",
            "A mapping from situations to actions that guides the agent toward its goal",
            "The training data used to build the agent",
          ],
          correctAnswer: 2,
          explanation:
            "A policy is the strategy an agent uses to decide what action to take given its current perception of the environment — the core of its autonomous decision-making.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-02",
    title: "From Tools to Agents",
    description:
      "Trace the architectural evolution from static tools to fully autonomous agents and understand what capabilities each stage unlocks.",
    duration: "10 min",
    objectives: [
      "Map the progression from tools to models to agents",
      "Identify the capability that each architectural stage adds",
      "Understand why tool use is a prerequisite for agentic behavior",
      "Recognize the moment a system crosses from automation to agency",
    ],
    content: {
      introduction:
        "Tools execute fixed instructions. Models generate outputs. Agents act. The progression from tool to model to agent is not just a feature upgrade — each step introduces a qualitatively new kind of capability, and a qualitatively new kind of risk.",
      sections: [
        {
          title: "Stage 1: Static Tools",
          content:
            "A static tool does exactly what it is programmed to do. A script that reads a file and outputs a summary is a tool. It has no state, no judgment, no ability to deviate from its instructions. Tools are reliable precisely because they are rigid — but their reliability comes at the cost of adaptability.",
        },
        {
          title: "Stage 2: Models with Tool Access",
          content:
            "When a language model is given access to external tools — a search function, a calculator, an API call — it gains the ability to take actions during inference. This is the first step toward agency. The model can now retrieve information, run code, or write to external systems as part of generating a response. But it still acts in a single-shot mode: one input triggers one sequence of actions, then stops.",
        },
        {
          title: "Stage 3: Agents with Memory and Planning",
          content:
            "An agent that adds memory and planning to tool use becomes capable of multi-step task execution. It can remember what it has done, reason about what still needs to be done, and execute a plan across multiple actions over time. This is where the perceive-decide-act loop becomes genuinely autonomous — the agent is no longer responding to a single prompt but pursuing a goal.",
        },
        {
          title: "The Threshold of Agency",
          content:
            "The threshold between automation and agency is crossed when a system begins making decisions that were not explicitly anticipated by its designers. A rule-based system that routes emails is automation. A system that reads an inbox, prioritizes messages, drafts replies, and schedules follow-ups based on context is an agent. The difference is the presence of goal-directed judgment in novel situations.",
        },
      ],
      conclusion:
        "The progression from tools to agents is a spectrum, not a binary switch. Understanding where on that spectrum a given system sits determines what guarantees you can make about its behavior — and what infrastructure it needs to operate safely.",
    },
    quiz: {
      questions: [
        {
          id: "ags-02-q1",
          question:
            "What capability does a model gain when given access to external tools?",
          options: [
            "Faster inference speed",
            "The ability to take actions during inference, such as calling APIs or running code",
            "The ability to train on new data automatically",
            "Improved language understanding",
          ],
          correctAnswer: 1,
          explanation:
            "Tool access allows a model to retrieve information, execute code, or write to external systems as part of generating a response — the first step toward agentic behavior.",
        },
        {
          id: "ags-02-q2",
          question: "What marks the threshold between automation and agency?",
          options: [
            "The use of a neural network instead of rules",
            "The system making decisions not explicitly anticipated by its designers, guided by a goal",
            "The system running on cloud infrastructure",
            "The use of more than three tools simultaneously",
          ],
          correctAnswer: 1,
          explanation:
            "Agency begins when a system exercises goal-directed judgment in novel situations — not just executing predefined rules, but adapting its actions to pursue an objective.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-03",
    title: "Agent Architecture",
    description:
      "Examine the internal components that make up an agent system and how they connect to enable autonomous operation.",
    duration: "10 min",
    objectives: [
      "Identify the core architectural components of an AI agent",
      "Understand how memory, planning, and execution connect",
      "Distinguish short-term from long-term agent memory",
      "Map how canister architecture maps to agent components",
    ],
    content: {
      introduction:
        "An agent is not a monolithic system — it is an architecture composed of distinct components, each with a specific function. Understanding those components and how they interact is the prerequisite for building, evaluating, and deploying real agent systems.",
      sections: [
        {
          title: "Core Components",
          content:
            "Every non-trivial agent architecture includes at minimum: a perception layer (reads the environment), a memory system (retains state across actions), a planning engine (determines what to do next), an action executor (carries out the selected action), and a feedback loop (updates state based on action results). More sophisticated agents add goal management, self-reflection, and multi-agent coordination layers on top of this base.",
        },
        {
          title: "Memory: Short-Term and Long-Term",
          content:
            "Short-term memory holds the current context: the active task, recent observations, and the current step in a plan. Long-term memory persists information across sessions: past interactions, learned preferences, accumulated knowledge. On most agent implementations, long-term memory requires an external store — a database, a vector index, or an on-chain key-value store. On ICP, a canister's stable memory provides durable, on-chain long-term storage that survives upgrades.",
        },
        {
          title: "Planning and Execution",
          content:
            "A planning engine takes the agent's current goal and state and generates a sequence of actions expected to reach the goal. This can be as simple as a list of steps or as complex as a tree search over possible action sequences. Execution is the layer that translates planned actions into actual system calls: reading data, writing state, calling APIs, or triggering other agents. The separation between planning and execution is critical — it allows the plan to be inspected, modified, or overridden before it runs.",
        },
        {
          title: "Canister Architecture as Agent Infrastructure",
          content:
            "An ICP canister maps naturally to agent architecture. The canister's message queue is the perception layer. Its heap and stable memory are the short and long-term memory systems. Its update methods are the action executors. The consensus protocol guarantees that every state transition is deterministic and verifiable — a property that most cloud-based agent frameworks cannot provide.",
        },
      ],
      conclusion:
        "Agent architecture is not a single design but a set of composable components. The choice of infrastructure determines which components can be implemented reliably — and ICP's canister model provides a uniquely strong foundation for the memory, execution, and state-management requirements of real agent systems.",
    },
    quiz: {
      questions: [
        {
          id: "ags-03-q1",
          question:
            "What is the role of the planning engine in an agent architecture?",
          options: [
            "It stores the agent's long-term memory",
            "It takes the agent's goal and state and generates a sequence of actions to reach the goal",
            "It handles communication with other agents",
            "It translates agent outputs into natural language",
          ],
          correctAnswer: 1,
          explanation:
            "The planning engine maps the current goal and state to a sequence of actions — the cognitive core of the agent's decision-making process.",
        },
        {
          id: "ags-03-q2",
          question:
            "How does ICP canister stable memory map to agent architecture?",
          options: [
            "It serves as the agent's planning engine",
            "It provides durable, on-chain long-term storage that persists across canister upgrades",
            "It handles cross-chain communication",
            "It stores the agent's neural network weights",
          ],
          correctAnswer: 1,
          explanation:
            "An ICP canister's stable memory persists across upgrades and provides the long-term memory store that agent systems require — without relying on an external database.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-04",
    title: "Autonomous Execution",
    description:
      "Understand what it means for a system to execute autonomously and why the execution environment determines the trustworthiness of agent outcomes.",
    duration: "10 min",
    objectives: [
      "Define autonomous execution and its operational requirements",
      "Identify the trust properties of different execution environments",
      "Understand how ICP consensus enables verifiable autonomous execution",
      "Recognize the failure modes of cloud-dependent agent execution",
    ],
    content: {
      introduction:
        "Autonomous execution means a system carries out actions without human approval at each step. The question is not just whether a system can execute autonomously — most software can — but whether the execution can be trusted. Trust in autonomous systems comes from the properties of the environment they run in.",
      sections: [
        {
          title: "What Autonomous Execution Requires",
          content:
            "For execution to be genuinely autonomous and trustworthy, the system needs: determinism (the same inputs always produce the same outputs), persistence (state is preserved reliably), censorship resistance (no external party can block or alter execution), and verifiability (the output can be independently confirmed). Without these properties, autonomous execution is a convenience feature, not a trust guarantee.",
        },
        {
          title: "Cloud Execution: Fast but Fragile",
          content:
            "Most agent systems today run on cloud infrastructure — Lambda functions, containerized services, or hosted AI APIs. This works well for performance but poorly for trust. A cloud provider can modify, log, throttle, or terminate an agent's execution without notice. The agent may believe it is running correctly while its outputs are being silently altered. For low-stakes tasks this is acceptable; for agents operating financial assets or governance systems, it is not.",
        },
        {
          title: "Protocol-Level Execution on ICP",
          content:
            "When an agent runs inside an ICP canister, its execution is governed by the consensus protocol of the subnet it runs on. Every state transition is replicated across nodes, verified by a threshold of subnet participants, and recorded as an immutable state change. No single node — not even one controlled by DFINITY — can unilaterally modify the agent's state or censor its actions. Execution is enforced at the protocol level, not the policy level.",
        },
        {
          title: "Heartbeat and Timer Mechanisms",
          content:
            "ICP canisters can be configured to execute automatically on a schedule using the heartbeat and timer mechanisms. A canister with a heartbeat function will run that function on every subnet block, without any external trigger. This enables agents to operate continuously — monitoring state, triggering actions, and updating records — without a user or server needing to initiate each execution cycle. The protocol drives the agent's runtime.",
        },
      ],
      conclusion:
        "Autonomous execution on the Internet Computer is not just a feature — it is a guarantee. The consensus protocol enforces correct execution, the heartbeat mechanism enables continuous operation, and no external party can interfere. This is the execution environment that serious agent systems require.",
    },
    quiz: {
      questions: [
        {
          id: "ags-04-q1",
          question:
            "Which ICP mechanism allows a canister to execute automatically on every subnet block without an external trigger?",
          options: [
            "HTTP outcalls",
            "Chain-key signatures",
            "Heartbeat and timer functions",
            "Threshold ECDSA",
          ],
          correctAnswer: 2,
          explanation:
            "ICP's heartbeat and timer mechanisms allow a canister to run code automatically on a schedule — enabling agents to operate continuously without a user or server initiating each cycle.",
        },
        {
          id: "ags-04-q2",
          question:
            "What is the key trust advantage of running an agent on ICP versus cloud infrastructure?",
          options: [
            "ICP is faster than cloud providers",
            "ICP agents are cheaper to run",
            "Execution is governed by consensus protocol — no single party can modify or censor the agent's state",
            "ICP agents can use more memory",
          ],
          correctAnswer: 2,
          explanation:
            "Protocol-level execution on ICP means every state transition is replicated and verified by subnet consensus — no cloud provider, operator, or node can unilaterally alter or stop the agent.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-05",
    title: "Multi-Agent Systems",
    description:
      "Explore how multiple agents coordinate, specialize, and compose to accomplish tasks that exceed the capability of any single agent.",
    duration: "10 min",
    objectives: [
      "Understand why multi-agent systems outperform single-agent systems on complex tasks",
      "Identify coordination patterns: orchestration, peer-to-peer, and market-based",
      "Recognize the role of inter-canister calls in on-chain agent coordination",
      "Understand the trust and failure mode considerations in multi-agent design",
    ],
    content: {
      introduction:
        "No single agent can do everything well. Multi-agent systems solve this by decomposing complex tasks into specialized roles, distributing them across agents, and coordinating the results. This is how systems scale from task automation to full autonomous pipelines.",
      sections: [
        {
          title: "Why Multi-Agent?",
          content:
            "A single agent faces hard limits: context window size, latency, specialization depth, and fault tolerance. A multi-agent system can run specialized agents in parallel, aggregate their outputs, and continue operating if one agent fails. Specialization also improves quality — an agent trained for financial analysis outperforms a generalist on financial tasks, even if the generalist scores higher on benchmarks overall.",
        },
        {
          title: "Coordination Patterns",
          content:
            "Three main coordination patterns emerge in multi-agent design. Orchestration: a central orchestrator agent directs specialized sub-agents, collects results, and synthesizes outputs. Peer-to-peer: agents communicate directly with each other, passing tasks and results without a central coordinator. Market-based: agents bid for tasks based on capability and price, and a matching system allocates work — this is the model that underlies agent economies.",
        },
        {
          title: "Inter-Canister Calls on ICP",
          content:
            "On ICP, multi-agent coordination is implemented through inter-canister calls. One canister (agent) can call another canister (agent) directly, passing typed arguments and receiving typed results. These calls happen on-chain, are governed by consensus, and are subject to the same execution guarantees as any other canister operation. This means multi-agent coordination on ICP is trustworthy by design — no off-chain messaging bus, no external coordination layer required.",
        },
        {
          title: "Trust and Failure in Multi-Agent Systems",
          content:
            "Multi-agent systems introduce new failure modes. A compromised or malicious orchestrator can issue harmful instructions to sub-agents. A sub-agent can return incorrect results that propagate through the system. Circular dependencies between agents can cause deadlocks. Well-designed multi-agent systems use explicit trust hierarchies, validate outputs before acting on them, and implement circuit breakers that halt execution when anomalies are detected.",
        },
      ],
      conclusion:
        "Multi-agent systems are the architecture of autonomous pipelines. On ICP, inter-canister calls provide the coordination primitive — trustworthy, on-chain, and composable. The design challenge is not the communication mechanism but the trust and failure management layer that wraps it.",
    },
    quiz: {
      questions: [
        {
          id: "ags-05-q1",
          question:
            "How do agents coordinate on ICP without an off-chain messaging layer?",
          options: [
            "Through WebSocket connections between canisters",
            "Through inter-canister calls — on-chain calls governed by subnet consensus",
            "Through a shared REST API",
            "Through IPFS message queues",
          ],
          correctAnswer: 1,
          explanation:
            "Inter-canister calls on ICP allow agents to communicate directly, on-chain, with typed arguments and results — governed by the same consensus protocol that secures all canister execution.",
        },
        {
          id: "ags-05-q2",
          question:
            "What is the orchestration coordination pattern in multi-agent systems?",
          options: [
            "Agents compete in a market to acquire tasks",
            "Agents communicate directly without any central coordinator",
            "A central orchestrator agent directs specialized sub-agents and synthesizes their outputs",
            "Agents share a single global memory store",
          ],
          correctAnswer: 2,
          explanation:
            "In orchestration, a central coordinator manages specialized sub-agents — distributing tasks, collecting results, and producing final outputs. It is the most common pattern for structured agent pipelines.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-06",
    title: "Agents + ICP",
    description:
      "Understand why ICP is uniquely suited as the compute and coordination layer for autonomous agent systems.",
    duration: "10 min",
    objectives: [
      "Identify the ICP properties that matter most for agent systems",
      "Understand how canisters serve as the native agent execution unit",
      "Recognize how HTTP outcalls enable agents to interact with the external world",
      "Map the full agent lifecycle on ICP from deployment to execution",
    ],
    content: {
      introduction:
        "ICP was designed for smart contracts running continuously as services — the canister model. This design maps almost perfectly to what agent systems require: persistent state, autonomous execution, on-chain coordination, and the ability to reach out to external systems. No other blockchain provides all four.",
      sections: [
        {
          title: "Canister as Agent",
          content:
            "A canister is a computational unit that holds state, executes code, and responds to messages. Deploy an AI inference runtime inside a canister and it becomes an on-chain agent: its memory is on-chain, its execution is governed by consensus, and its actions are recorded as immutable state changes. The canister model was not designed for agents — but it serves them almost perfectly.",
        },
        {
          title: "HTTP Outcalls: Agents Reaching the World",
          content:
            "An agent that can only communicate with other on-chain systems is limited. ICP's HTTP outcall mechanism allows canisters to make HTTPS requests to any external web service, with the subnet reaching consensus on the response before delivering it to the canister. This means an ICP agent can read external data feeds, call REST APIs, monitor off-chain events, and act on real-world information — all from within the trust boundary of the protocol.",
        },
        {
          title: "Cycles as Agent Operating Budget",
          content:
            "Canisters on ICP consume cycles for computation, memory, and network operations. An agent's operational budget is denominated in cycles — a stable-value unit convertible from ICP tokens. This creates a natural throttling mechanism: an agent can only operate for as long as it has cycles. Well-designed agent systems fund themselves from their outputs — executing tasks that generate the revenue to replenish their cycles and sustain continuous operation.",
        },
        {
          title: "The Full Agent Lifecycle on ICP",
          content:
            "Deploying an agent on ICP follows a clean lifecycle. The agent code is compiled to WebAssembly and installed in a canister. Initial state is set, cycles are funded, and the agent is configured with its goal and tools. The subnet begins executing its heartbeat functions on each block. Inter-canister calls connect it to other agents. HTTP outcalls connect it to the external world. The agent is now live — operating continuously, autonomously, and verifiably.",
        },
      ],
      conclusion:
        "ICP provides the native infrastructure for AI agents: canisters as execution units, consensus as the trust layer, HTTP outcalls as the external interface, and cycles as the economic engine. The gap between a smart contract and an autonomous agent is smaller on ICP than on any other protocol.",
    },
    quiz: {
      questions: [
        {
          id: "ags-06-q1",
          question:
            "What ICP mechanism allows an on-chain agent to read data from an external REST API?",
          options: [
            "Chain-key cryptography",
            "HTTP outcalls — subnet-level HTTPS requests with consensus on the response",
            "Threshold ECDSA signatures",
            "NNS governance proposals",
          ],
          correctAnswer: 1,
          explanation:
            "HTTP outcalls allow ICP canisters to make HTTPS requests to external services, with the subnet reaching consensus on the response — enabling agents to act on real-world data from within the protocol's trust boundary.",
        },
        {
          id: "ags-06-q2",
          question:
            "What is the economic resource that governs an ICP agent's operational budget?",
          options: [
            "ETH gas",
            "ICP tokens",
            "Cycles — a stable-value unit consumed by computation, memory, and network operations",
            "USDC stablecoin",
          ],
          correctAnswer: 2,
          explanation:
            "Cycles are the operational currency of ICP canisters. They are consumed by all canister operations and must be replenished — creating a natural economic constraint on agent activity.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-07",
    title: "Agents + Bitcoin",
    description:
      "Explore how ICP agents can hold, transact, and settle in Bitcoin natively using ckBTC and threshold ECDSA — without bridges or custodians.",
    duration: "10 min",
    objectives: [
      "Understand how ICP integrates with Bitcoin at the protocol level",
      "Define ckBTC and how it enables agent-native Bitcoin settlement",
      "Recognize the role of threshold ECDSA in signing Bitcoin transactions",
      "Identify real use cases for agents that operate with Bitcoin",
    ],
    content: {
      introduction:
        "Most blockchain systems interact with Bitcoin through bridges — trusted intermediaries that hold BTC and issue wrapped tokens. ICP eliminates the intermediary. Canisters can hold Bitcoin directly, sign transactions using threshold ECDSA, and settle in ckBTC — a 1:1 backed on-chain representation of BTC. This makes ICP agents the first autonomous systems capable of operating with Bitcoin without a custodian.",
      sections: [
        {
          title: "ICP's Native Bitcoin Integration",
          content:
            "ICP nodes maintain a full Bitcoin node internally. When a canister requests a Bitcoin UTXO balance or submits a transaction, the request is handled at the protocol level — not routed through an external bridge. The subnet reaches consensus on the Bitcoin state it observes, and canister state updates reflect confirmed Bitcoin transactions without any trusted intermediary in the loop.",
        },
        {
          title: "Threshold ECDSA: Agents Signing Bitcoin",
          content:
            "Bitcoin transactions require ECDSA signatures. ICP implements threshold ECDSA — a protocol where no single node ever holds a complete private key. Instead, key shares are distributed across subnet nodes, and a threshold of them must cooperate to produce a valid signature. A canister can request a signature on a Bitcoin transaction, the subnet nodes collaborate to produce it, and the signed transaction is submitted to the Bitcoin network. The private key never exists in one place.",
        },
        {
          title: "ckBTC: Agent-Native Bitcoin Settlement",
          content:
            "ckBTC is a chain-key token that represents BTC on ICP at a 1:1 ratio. Depositing BTC to a ckBTC address mints an equivalent amount of ckBTC inside ICP. ckBTC transfers happen as canister calls — instant, cheap, and programmable. An agent holding ckBTC can transfer it to another canister, use it to pay for services, or burn it to withdraw the underlying BTC to any Bitcoin address. Settlement happens in seconds rather than Bitcoin's 10-minute block time.",
        },
        {
          title: "What Agents Can Do with Bitcoin",
          content:
            "The combination of threshold ECDSA and ckBTC enables agent capabilities that were previously impossible without custodians. An agent can autonomously manage a Bitcoin treasury: receiving payments, distributing funds, executing conditional transfers, and reporting balances — all governed by canister code rather than a human key holder. DeFi protocols, DAO treasuries, and autonomous payroll systems are now technically realizable on Bitcoin rails, operated by ICP agents.",
        },
      ],
      conclusion:
        "ICP agents operating with Bitcoin represent a genuine architectural breakthrough. Threshold ECDSA removes the need for a private key holder. ckBTC enables fast, programmable settlement. The result is an autonomous system that can receive, hold, and transact in Bitcoin without trusting any human intermediary — a capability no prior blockchain architecture provided.",
    },
    quiz: {
      questions: [
        {
          id: "ags-07-q1",
          question:
            "What is threshold ECDSA and why does it matter for ICP agents operating with Bitcoin?",
          options: [
            "A faster hashing algorithm that speeds up Bitcoin confirmations",
            "A protocol where key shares are distributed across subnet nodes so no single node holds the full private key — enabling canisters to sign Bitcoin transactions",
            "A bridge mechanism that wraps BTC as an ERC-20 token",
            "A consensus algorithm for validating Bitcoin blocks",
          ],
          correctAnswer: 1,
          explanation:
            "Threshold ECDSA distributes the private key across subnet nodes. A canister requests a signature, nodes cooperate to produce it, and the key never exists in one place — eliminating the need for a custodian.",
        },
        {
          id: "ags-07-q2",
          question: "What is ckBTC?",
          options: [
            "A custodial Bitcoin wrapper issued by DFINITY",
            "A bridge token that connects Bitcoin to Ethereum",
            "A chain-key token that represents BTC on ICP at a 1:1 ratio, enabling fast programmable settlement",
            "A stablecoin pegged to the price of Bitcoin",
          ],
          correctAnswer: 2,
          explanation:
            "ckBTC is a 1:1 backed representation of BTC that lives on ICP. Deposits mint ckBTC; burns redeem the underlying BTC. Transfers happen as canister calls — instant and programmable.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-08",
    title: "Trustless Agents",
    description:
      "Understand what it means for an agent to be trustless and how protocol-level execution properties make trust in operators unnecessary.",
    duration: "10 min",
    objectives: [
      "Define trustlessness in the context of autonomous agents",
      "Identify the properties that make an agent trustless",
      "Understand how ICP consensus enforces agent behavior without trusting operators",
      "Recognize the limits of trustlessness and where human oversight remains appropriate",
    ],
    content: {
      introduction:
        "A trustless agent is not an agent that has been tested extensively and found reliable. Trustless means the agent's behavior is enforced by a protocol, not by the goodwill or competence of its operators. You do not trust the agent — you trust the system that governs it.",
      sections: [
        {
          title: "What Trustlessness Actually Means",
          content:
            "In protocol systems, trustless means you do not need to rely on any party's honesty or competence to be certain of correct outcomes. For an agent, trustless execution means: the code runs exactly as deployed, the state cannot be modified by the operator after deployment, the outputs are deterministic and verifiable, and no party can selectively execute or block execution based on their interests. These properties are enforced by the protocol, not promised by the deployer.",
        },
        {
          title: "How ICP Enforces Agent Behavior",
          content:
            "On ICP, canister code is uploaded to the network and its hash is recorded on-chain. The Network Nervous System governs which principals have upgrade authority over a canister. When a canister executes, its operation is replicated across subnet nodes and verified by consensus. If the operator attempts to modify the canister's behavior mid-execution, the network will reject state changes that were not produced by the correct code. The deployed code is the specification — the protocol enforces it.",
        },
        {
          title: "Black-Holed Canisters: Maximum Trustlessness",
          content:
            "A canister can be made fully trustless by removing all controllers — a process sometimes called black-holing. A black-holed canister cannot be upgraded, modified, or destroyed by any party, including the original deployer. Its code is immutable. Its execution is governed entirely by the subnet. This is the maximum trustlessness setting — used for systems where any possibility of operator intervention would undermine user trust.",
        },
        {
          title: "Where Trustlessness Has Limits",
          content:
            "Trustlessness at the execution layer does not make an agent correct or safe. The code itself may contain bugs, the model may produce harmful outputs, and the agent's goals may be misspecified. Trustlessness removes the human intermediary from the execution path — it does not remove the need for careful design, auditing, and testing. The appropriate level of trustlessness depends on the stakes: high-value financial operations demand it; experimental systems may require the ability to intervene.",
        },
      ],
      conclusion:
        "Trustless agents are made possible by protocol-level execution guarantees. ICP provides those guarantees through consensus, code immutability, and the NNS governance model. The design challenge is deciding how much trustlessness is appropriate for a given agent — and being explicit about what trust assumptions remain.",
    },
    quiz: {
      questions: [
        {
          id: "ags-08-q1",
          question:
            "What does 'trustless' mean in the context of an autonomous agent?",
          options: [
            "The agent has been extensively tested and found reliable",
            "The agent's behavior is enforced by a protocol, not by the goodwill or competence of its operators",
            "The agent does not store any user data",
            "The agent operates without any economic incentives",
          ],
          correctAnswer: 1,
          explanation:
            "Trustless means protocol enforcement, not operator reputation. You do not trust the deployer — you trust the system that governs the agent's execution.",
        },
        {
          id: "ags-08-q2",
          question: "What is a black-holed canister?",
          options: [
            "A canister that has run out of cycles and stopped executing",
            "A canister with no controllers — its code is immutable and cannot be upgraded by any party",
            "A canister that only accepts anonymous calls",
            "A canister that stores data encrypted with a one-way hash",
          ],
          correctAnswer: 1,
          explanation:
            "Removing all controllers from a canister makes it immutable — no one, including the original deployer, can modify or upgrade it. This is the maximum trustlessness configuration.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-09",
    title: "Real-World Agent Use Cases",
    description:
      "Examine concrete applications of autonomous agents running on ICP infrastructure across finance, governance, data, and operations.",
    duration: "10 min",
    objectives: [
      "Identify high-value real-world use cases for autonomous ICP agents",
      "Understand why each use case benefits from protocol-level execution",
      "Recognize the pattern of replacing human intermediaries with verifiable agent logic",
      "Evaluate which use cases are production-ready versus experimental",
    ],
    content: {
      introduction:
        "The test of any new computing paradigm is not what it enables in theory but what it enables in practice. Autonomous agents on ICP are already operating in several domains — and the pattern in each is the same: replace a human intermediary with verifiable agent logic, governed by protocol rather than policy.",
      sections: [
        {
          title: "Autonomous Treasury Management",
          content:
            "A DAO treasury agent holds the organization's funds — ckBTC, ICP tokens, or other chain-key assets — and executes disbursements based on governance-approved rules. The agent monitors incoming proposals, verifies quorum, and transfers funds automatically when conditions are met. No human key holder is required. The treasury's logic is encoded in the canister, auditable by anyone, and enforced by the subnet.",
        },
        {
          title: "On-Chain Data Pipelines",
          content:
            "Data pipeline agents run continuously, fetching data from external sources via HTTP outcalls, normalizing and storing it in canister memory, and making it available to other canisters on demand. These agents replace centralized data services — oracle networks, API aggregators, and data warehouses — with on-chain alternatives whose update logic is transparent and whose outputs are consensus-verified. Applications include price feeds, sports data, weather data, and on-chain analytics.",
        },
        {
          title: "Autonomous Governance Execution",
          content:
            "Governance systems on ICP use agents to execute approved proposals automatically. When the NNS approves a proposal to upgrade a canister or adjust a parameter, the execution is carried out by protocol-level mechanisms, not a human operator. DAOs on ICP can implement the same pattern at their own scale — using governance canisters that execute approved changes without requiring a trusted multisig holder or administrator.",
        },
        {
          title: "AI-Powered Service Agents",
          content:
            "The most forward-looking use case combines AI inference with agent autonomy. A service agent runs an AI model on-chain (or via HTTP outcall to an AI service), processes user requests, maintains conversation state in canister memory, and executes actions based on AI-generated decisions. Examples include autonomous customer support agents, investment research assistants that monitor portfolios and execute rebalancing, and legal document agents that generate, store, and track agreements.",
        },
      ],
      conclusion:
        "Real-world agent use cases share a common pattern: they replace a trusted intermediary — a bank employee, a data vendor, a governance administrator, a support agent — with verifiable canister logic. The value is not just automation; it is the elimination of trust assumptions that currently create friction, cost, and risk.",
    },
    quiz: {
      questions: [
        {
          id: "ags-09-q1",
          question:
            "What common pattern do real-world ICP agent use cases share?",
          options: [
            "They require off-chain oracles for all data inputs",
            "They replace a trusted human intermediary with verifiable canister logic enforced by protocol",
            "They must be deployed by DFINITY to operate on ICP",
            "They only work for financial applications",
          ],
          correctAnswer: 1,
          explanation:
            "The defining pattern is intermediary elimination: replacing a trusted human role with agent logic that is transparent, auditable, and enforced by the subnet — not by policy or reputation.",
        },
        {
          id: "ags-09-q2",
          question:
            "How do on-chain data pipeline agents differ from traditional oracle networks?",
          options: [
            "They are slower but cheaper",
            "They require a token to access their data",
            "Their update logic is encoded in transparent canister code and their outputs are consensus-verified",
            "They only support financial data types",
          ],
          correctAnswer: 2,
          explanation:
            "On-chain data pipeline agents make their collection and normalization logic fully transparent and their outputs verifiable through subnet consensus — replacing the trust model of traditional oracle systems.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },

  {
    id: "ags-10",
    title: "The Agent Economy",
    description:
      "Understand the emerging economic layer where agents transact with each other, operate as autonomous economic actors, and participate in markets without human intermediaries.",
    duration: "10 min",
    objectives: [
      "Define the agent economy and its distinguishing characteristics",
      "Understand how agents can earn, hold, and spend value autonomously",
      "Identify the ICP primitives that enable agent-to-agent economic activity",
      "Recognize the implications of a machine-native economic layer",
    ],
    content: {
      introduction:
        "An agent economy is one in which AI agents are not just tools that humans use — they are economic actors in their own right. They earn, hold, and spend value. They bid for compute, pay for data, and sell services to other agents. This is not a future concept — the technical primitives already exist on ICP.",
      sections: [
        {
          title: "Agents as Economic Actors",
          content:
            "In traditional software, money moves between humans — software is merely the channel. In an agent economy, agents hold economic resources directly. A canister on ICP can hold ckBTC, ICP tokens, or custom ICRC-1 tokens. It can receive payments for services, spend cycles on computation, and transfer value to other canisters without any human initiating the transaction. The agent is the account holder, the decision-maker, and the executor — simultaneously.",
        },
        {
          title: "Agent-to-Agent Markets",
          content:
            "When agents can transact with each other autonomously, markets emerge at machine speed. A data agent sells price feeds to a trading agent. The trading agent pays a risk analysis agent for position assessments. The risk agent pays a news monitoring agent for real-time signals. Each payment is a canister call. Each transaction is settled in ckBTC or ICP tokens. The entire pipeline operates without a human approving any individual transaction — the market is agent-native.",
        },
        {
          title: "Cycles as Protocol-Native Money",
          content:
            "Cycles are ICP's protocol-native compute currency. Every canister operation costs cycles. An agent that earns ICP tokens can convert them to cycles to fund its own execution — literally paying for its own continued existence. This creates a natural selection mechanism: agents that provide value earn the resources to operate; agents that do not provide value run out of cycles and stop. The protocol acts as a market for compute.",
        },
        {
          title: "Implications of a Machine-Native Economy",
          content:
            "The agent economy operates at a speed and scale that human-intermediated systems cannot match. Billions of micro-transactions per day, negotiated and settled autonomously, governed by code rather than contract. The implications are structural: traditional payment infrastructure (banks, clearinghouses, card networks) was designed for human transaction volumes. A machine-native economy requires machine-native settlement — and ICP, with its ckBTC integration and high-throughput consensus, is designed precisely for this.",
        },
      ],
      conclusion:
        "The agent economy is not a speculative future — it is the logical endpoint of combining autonomous execution with programmable settlement. On ICP, the primitives are already in place: canisters as account holders, ckBTC as the settlement asset, cycles as the operational budget, and consensus as the trust layer. The question is not whether this economy will emerge, but how quickly it will scale.",
    },
    quiz: {
      questions: [
        {
          id: "ags-10-q1",
          question:
            "What makes a canister on ICP capable of acting as an economic actor?",
          options: [
            "It can generate its own tokens",
            "It can hold assets like ckBTC and ICP tokens, receive payments, and transfer value autonomously — without a human initiating transactions",
            "It is connected to a human-managed wallet",
            "It uses Ethereum's ERC-20 standard",
          ],
          correctAnswer: 1,
          explanation:
            "A canister can hold, receive, and send value autonomously — making it a genuine economic actor rather than a passive channel for human transactions.",
        },
        {
          id: "ags-10-q2",
          question:
            "What natural selection mechanism do cycles create for ICP agents?",
          options: [
            "Agents with more cycles have higher voting power in the NNS",
            "Agents that provide value earn ICP tokens convertible to cycles; agents that do not provide value run out of cycles and stop operating",
            "Cycles are distributed equally to all active canisters",
            "Cycles decay over time to prevent hoarding",
          ],
          correctAnswer: 1,
          explanation:
            "Agents must fund their own execution with cycles. Those that provide value can replenish their supply; those that do not eventually stop. The protocol acts as a market for compute, selecting for useful agents.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
];

export const module02MegaQuizEN: LessonContent = {
  id: "ags-quiz",
  title: "Mega Quiz: Agent Systems Mastery",
  description:
    "Demonstrate mastery of Agent Systems — from architecture and autonomous execution to Bitcoin integration and the emerging agent economy.",
  duration: "15 min",
  objectives: [
    "Demonstrate mastery of agent architecture and the perceive-decide-act loop",
    "Apply knowledge of ICP-native execution, coordination, and settlement",
    "Synthesize concepts across the full Agent Systems module",
    "Validate readiness to activate Module 03: Autonomous Systems",
  ],
  content: {
    introduction:
      "This Mega Quiz covers all ten lessons of Module 02: Agent Systems. Each question targets a core concept — from agent fundamentals to the emerging machine-native economy. Complete the quiz to unlock Module 03.",
    sections: [
      {
        title: "Module 02 Mastery Check",
        content:
          "Answer all questions to validate your understanding of Agent Systems. This quiz covers agent architecture, autonomous execution, multi-agent coordination, ICP integration, Bitcoin settlement, trustless design, real-world applications, and the agent economy.",
      },
    ],
    conclusion:
      "Completing this quiz confirms you are ready to operate at the next level of the Verifiable Intelligence Layer.",
  },
  quiz: {
    questions: [
      {
        id: "ags-quiz-q1",
        question: "What distinguishes an AI agent from a passive AI model?",
        options: [
          "Agents produce longer outputs",
          "Agents run a perceive-decide-act loop, maintaining state and executing actions over time",
          "Agents require specialized hardware",
          "Agents use a different training methodology",
        ],
        correctAnswer: 1,
        explanation:
          "An agent runs continuously, perceiving its environment, deciding, and acting — unlike a model that produces a single output per input.",
      },
      {
        id: "ags-quiz-q2",
        question: "What marks the threshold between automation and agency?",
        options: [
          "Using more than five tools simultaneously",
          "Running on blockchain infrastructure",
          "Exercising goal-directed judgment in situations not explicitly anticipated by the designer",
          "Processing more than one million tokens per day",
        ],
        correctAnswer: 2,
        explanation:
          "Agency begins when a system adapts its actions to pursue a goal in novel situations — beyond executing predefined rules.",
      },
      {
        id: "ags-quiz-q3",
        question:
          "How does an ICP canister's stable memory serve agent architecture?",
        options: [
          "It provides the agent's planning engine",
          "It serves as durable, on-chain long-term memory that persists across upgrades",
          "It handles inter-canister message routing",
          "It stores the agent's neural network weights off-chain",
        ],
        correctAnswer: 1,
        explanation:
          "Stable memory in ICP canisters persists across upgrades and provides the long-term memory store that agent systems require — without an external database.",
      },
      {
        id: "ags-quiz-q4",
        question:
          "Which ICP mechanism allows a canister to execute continuously without an external trigger?",
        options: [
          "HTTP outcalls",
          "Chain-key cryptography",
          "Heartbeat and timer functions",
          "ICRC-1 token transfers",
        ],
        correctAnswer: 2,
        explanation:
          "Heartbeat and timer functions run automatically on each subnet block — enabling agents to operate continuously without a user or server initiating each cycle.",
      },
      {
        id: "ags-quiz-q5",
        question:
          "How do agents coordinate on ICP without an off-chain messaging bus?",
        options: [
          "Through shared file storage",
          "Through WebSocket connections",
          "Through inter-canister calls — on-chain, consensus-governed",
          "Through a centralized relay canister operated by DFINITY",
        ],
        correctAnswer: 2,
        explanation:
          "Inter-canister calls enable agents to communicate directly on-chain, with typed arguments and results governed by subnet consensus.",
      },
      {
        id: "ags-quiz-q6",
        question:
          "What does ICP's HTTP outcall mechanism enable for on-chain agents?",
        options: [
          "Faster consensus finality",
          "The ability to make HTTPS requests to external services, with subnet consensus on the response",
          "Free computation for AI inference",
          "Direct access to Bitcoin mempool data",
        ],
        correctAnswer: 1,
        explanation:
          "HTTP outcalls allow ICP agents to interact with external APIs and data sources while remaining within the protocol's trust boundary.",
      },
      {
        id: "ags-quiz-q7",
        question:
          "What is threshold ECDSA and why does it eliminate the need for a Bitcoin custodian?",
        options: [
          "A faster signature algorithm that reduces Bitcoin transaction fees",
          "A protocol distributing the private key across subnet nodes so no single entity holds it — allowing canisters to sign Bitcoin transactions",
          "An Ethereum bridge that wraps BTC",
          "A multisig scheme requiring human co-signers",
        ],
        correctAnswer: 1,
        explanation:
          "With threshold ECDSA, no single node holds the private key. A canister requests a signature, nodes cooperate to produce it — no custodian required.",
      },
      {
        id: "ags-quiz-q8",
        question: "What is a black-holed canister and when is it used?",
        options: [
          "A canister that has consumed all its cycles",
          "A canister with all controllers removed — its code is immutable, used for maximum trustlessness",
          "A canister running in a private subnet",
          "A canister that only accepts calls from other canisters",
        ],
        correctAnswer: 1,
        explanation:
          "Removing all controllers makes a canister immutable. No party can modify or upgrade it — used for systems where any operator intervention would undermine user trust.",
      },
      {
        id: "ags-quiz-q9",
        question:
          "What common pattern do real-world ICP agent use cases share?",
        options: [
          "They require DFINITY approval before deployment",
          "They replace trusted human intermediaries with verifiable canister logic enforced by protocol",
          "They only operate during business hours",
          "They must connect to Ethereum for settlement",
        ],
        correctAnswer: 1,
        explanation:
          "Every major ICP agent use case — treasury management, data pipelines, governance execution — replaces a trusted human role with transparent, auditable canister logic.",
      },
      {
        id: "ags-quiz-q10",
        question:
          "What natural selection mechanism do ICP cycles create for autonomous agents?",
        options: [
          "Agents vote on which other agents receive cycles",
          "Agents that provide value earn ICP convertible to cycles; those that do not run out and stop operating",
          "Cycles are distributed proportionally to all active canisters",
          "DFINITY allocates cycles based on agent performance metrics",
        ],
        correctAnswer: 1,
        explanation:
          "Useful agents earn the resources to fund their own execution. Agents that fail to provide value exhaust their cycles and stop — the protocol selects for value-generating agents.",
      },
    ],
  },
  xpReward: 120,
  creditsReward: 40,
};
