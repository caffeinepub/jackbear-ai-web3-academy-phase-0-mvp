import type { LessonContent } from "../lessonContent";

export const module03LessonsEN: LessonContent[] = [
  {
    id: "aut-01",
    title: "What Makes a System Autonomous?",
    description:
      "Understand the properties that define a genuinely autonomous system and how ICP canisters embody them.",
    duration: "12 min",
    objectives: [
      "Define autonomy in the context of protocol-level compute",
      "Identify the core properties: persistence, self-execution, determinism",
      "Distinguish autonomous systems from automated scripts or managed cloud services",
    ],
    content: {
      introduction:
        "Autonomy is not about removing humans from a workflow. It is about building systems that continue to operate correctly, indefinitely, without requiring human intervention at runtime. On the Internet Computer, canisters are the unit of autonomous compute.",
      sections: [
        {
          title: "Defining Autonomy",
          content:
            "A system is autonomous when it can initiate and complete operations based on its own state and rules, without external triggers from a human operator. This requires three properties: persistent state that survives restarts, the ability to schedule its own execution, and deterministic behavior under the same conditions. Canisters on ICP satisfy all three natively at the protocol level.",
        },
        {
          title: "Persistence as a Prerequisite",
          content:
            "Autonomy is impossible without persistence. A function that runs and discards all state cannot maintain goals across time. ICP canisters store state in stable memory and heap, both of which survive canister upgrades and node restarts. This means a canister can maintain a queue of work, track progress, and resume exactly where it left off — without a database, without a coordinator, without infrastructure management.",
        },
        {
          title: "Determinism and Trust",
          content:
            "For a system to be trusted without human supervision, its behavior must be deterministic. Given the same inputs and state, it must always produce the same outputs. ICP's consensus protocol enforces this: all replicas in a subnet execute the same messages in the same order and must arrive at the same result. Non-deterministic behavior would break consensus and reject the computation. This is a protocol-level guarantee of correctness.",
        },
        {
          title: "Autonomous vs Automated",
          content:
            "Automation is a human-defined trigger chain: a cron job, a script, a Lambda function. These systems wait for external invocation. Autonomous systems schedule and execute themselves. A canister using ICP timers can set its own heartbeat cadence, react to internal state transitions, and call other canisters — all without any external orchestration layer. The distinction is self-governance versus managed execution.",
        },
      ],
      conclusion:
        "Autonomous systems on ICP are not a design pattern — they are a native capability. Canisters are built to run indefinitely, maintain state, and execute on schedule. Understanding these foundations is the first step toward deploying systems that operate without human intervention.",
    },
    quiz: {
      questions: [
        {
          id: "aut-01-q1",
          question:
            "Which ICP-native property is essential for a canister to maintain autonomy across restarts?",
          options: [
            "HTTP outcalls to external APIs",
            "Persistent stable memory that survives upgrades",
            "Proximity to a subnet boundary node",
            "A trusted admin principal",
          ],
          correctAnswer: 1,
          explanation:
            "Stable memory in ICP canisters persists across upgrades and node restarts, making it the foundation of autonomous state management.",
        },
        {
          id: "aut-01-q2",
          question:
            "What distinguishes an autonomous system from an automated one?",
          options: [
            "Autonomous systems are faster",
            "Automated systems never fail",
            "Autonomous systems schedule and initiate their own execution without external triggers",
            "Automated systems use blockchain consensus",
          ],
          correctAnswer: 2,
          explanation:
            "Automation depends on external invocation; autonomous systems self-schedule and self-execute based on internal state and rules.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-02",
    title: "Event-Driven Execution",
    description:
      "Learn how ICP canisters respond to messages and state changes to drive execution without polling or external triggers.",
    duration: "13 min",
    objectives: [
      "Understand the ICP message model and how it enables event-driven patterns",
      "Distinguish between query calls, update calls, and inter-canister messages",
      "Design systems that react to state transitions rather than scheduled polls",
    ],
    content: {
      introduction:
        "Event-driven architecture on ICP is not an integration pattern layered on top of infrastructure — it is the native execution model. Every canister interaction is a message. State changes propagate through message passing. Systems that react to events are the default, not an advanced technique.",
      sections: [
        {
          title: "The Message Model",
          content:
            "ICP canisters communicate exclusively through messages. An update call from a user, a timer firing, or an inter-canister call are all messages arriving at the canister's message queue. The canister runtime processes messages one at a time, serializing all state mutations. This model eliminates race conditions at the execution layer and makes event-driven design natural.",
        },
        {
          title: "Reacting to State Changes",
          content:
            "Canisters can emit notifications, update derived state, or trigger downstream canisters in response to any message that modifies their state. When a user completes an action — mints an NFT, submits a proposal, transfers tokens — the canister handling that message can immediately propagate the event to subscriber canisters, update indices, or queue follow-up work. No external event bus required.",
        },
        {
          title: "Inter-Canister Calls as Events",
          content:
            "An inter-canister call is both an event and an instruction. When canister A calls canister B, it sends a message and awaits a response asynchronously. This enables chains of causally linked state transitions across the entire system. Each canister in the chain reacts to an incoming event, performs its work, and optionally generates outgoing events. This is protocol-native event streaming.",
        },
        {
          title: "Avoiding Polling",
          content:
            "Polling — repeatedly querying state to detect changes — is wasteful and introduces latency. ICP's async inter-canister model enables push-based notification patterns. A registry canister can notify subscribers when data changes. A market canister can trigger settlement logic when a price threshold is crossed. These patterns execute in reaction to state, not on a fixed schedule, making them both efficient and responsive.",
        },
      ],
      conclusion:
        "Event-driven execution is built into ICP's message-passing architecture. Designing canisters that react to messages rather than polling external sources produces systems that are leaner, faster, and more composable.",
    },
    quiz: {
      questions: [
        {
          id: "aut-02-q1",
          question: "What is the execution unit in ICP's native model?",
          options: [
            "HTTP requests",
            "Cron jobs",
            "Messages",
            "WebSocket events",
          ],
          correctAnswer: 2,
          explanation:
            "All ICP canister interactions — user calls, timers, and inter-canister calls — are messages processed by the canister runtime.",
        },
        {
          id: "aut-02-q2",
          question:
            "Why does the ICP message model eliminate execution-level race conditions?",
          options: [
            "It uses optimistic concurrency control",
            "Messages are processed one at a time, serializing state mutations",
            "All canisters run on the same thread",
            "State is read-only during execution",
          ],
          correctAnswer: 1,
          explanation:
            "The canister runtime processes messages serially, ensuring that state mutations never overlap, which eliminates race conditions without locks.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-03",
    title: "Timers and Scheduled Tasks",
    description:
      "Use ICP's native timer system to schedule one-time and recurring canister execution without external cron infrastructure.",
    duration: "14 min",
    objectives: [
      "Use setTimer and recurringTimer to schedule canister work",
      "Understand timer persistence across upgrades",
      "Design time-based workflows that are self-contained within a canister",
    ],
    content: {
      introduction:
        "ICP provides a protocol-native timer system. Canisters can schedule their own execution using setTimer for one-shot delays and recurringTimer for periodic tasks. No cron service, no external scheduler, no operator — the protocol delivers the callback.",
      sections: [
        {
          title: "setTimer and recurringTimer",
          content:
            "The Motoko and Rust CDKs expose timer primitives directly. `setTimer(delay, callback)` schedules a function to run once after a duration. `recurringTimer(interval, callback)` schedules repeated execution at a fixed interval. These are protocol-level timers — the Internet Computer's consensus layer tracks them and delivers execution callbacks without any external dependency.",
        },
        {
          title: "Timer Persistence",
          content:
            "Timers registered with `recurringTimer` persist across canister upgrades by default in Motoko. This means a canister upgraded to a new version continues executing its scheduled tasks without re-registration. For one-shot timers, state must be managed explicitly in stable variables if the timer must survive an upgrade in flight. Timer persistence is a first-class concern in autonomous system design.",
        },
        {
          title: "Practical Scheduling Patterns",
          content:
            "Common patterns: a treasury canister runs a recurring timer to distribute staking rewards every 24 hours; a data aggregator canister polls on-chain sources every 10 minutes; a governance canister uses a timer to transition proposals from voting to execution phase. All of these run without operator intervention once deployed. The canister itself manages its own execution schedule.",
        },
        {
          title: "Heartbeats vs Timers",
          content:
            "Heartbeats are a lower-level mechanism: a canister implementing the heartbeat system hook gets called every consensus round. This provides fine-grained scheduling but consumes cycles continuously. Timers are preferred for most scheduled work because they fire only when needed, conserving cycles. Heartbeats are appropriate for continuous state monitoring or rate-limiting logic that must check state every round.",
        },
      ],
      conclusion:
        "ICP's timer system makes scheduled execution a native property of canisters. Systems that previously required external cron jobs or scheduler infrastructure can now schedule their own work directly within the protocol.",
    },
    quiz: {
      questions: [
        {
          id: "aut-03-q1",
          question:
            "Which ICP timer primitive schedules repeated execution at a fixed interval?",
          options: ["setTimer", "recurringTimer", "heartbeat", "scheduleTask"],
          correctAnswer: 1,
          explanation:
            "`recurringTimer(interval, callback)` schedules a function to execute repeatedly at the specified interval without requiring re-registration.",
        },
        {
          id: "aut-03-q2",
          question:
            "Why are timers generally preferred over heartbeats for scheduled work?",
          options: [
            "Timers are faster to execute",
            "Heartbeats require a separate canister",
            "Timers fire only when needed, conserving cycles",
            "Heartbeats do not support async callbacks",
          ],
          correctAnswer: 2,
          explanation:
            "Heartbeats execute every consensus round regardless of whether work is needed, consuming cycles continuously. Timers fire only at scheduled intervals, making them more cycle-efficient.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-04",
    title: "Persistent State on ICP",
    description:
      "Design canister state that survives upgrades and long-running operations using stable memory and upgrade hooks.",
    duration: "13 min",
    objectives: [
      "Distinguish heap memory from stable memory in ICP canisters",
      "Use preupgrade and postupgrade hooks to preserve state across upgrades",
      "Design long-running autonomous systems with durable state",
    ],
    content: {
      introduction:
        "Persistent state is the backbone of autonomous systems. A canister that loses its state on upgrade cannot maintain long-running workflows, manage open positions, or track accumulated history. ICP provides two storage layers — heap and stable memory — each with distinct trade-offs for autonomous system design.",
      sections: [
        {
          title: "Heap vs Stable Memory",
          content:
            "Heap memory is fast and supports the full Motoko/Rust type system, but it does not survive canister upgrades by default. Stable memory persists across upgrades and is unbounded in size, but requires explicit management. Autonomous systems that must maintain continuity across upgrades — which includes any production system — must use stable variables in Motoko or the StableBTreeMap and related structures in Rust.",
        },
        {
          title: "Upgrade Hooks",
          content:
            "Motoko's `system func preupgrade()` and `system func postupgrade()` execute immediately before and after a canister upgrade. `preupgrade` serializes heap state into stable variables; `postupgrade` deserializes it back into heap data structures after the new code is installed. These hooks give developers full control over what state survives an upgrade. Forgetting to serialize critical state in `preupgrade` is a common source of data loss.",
        },
        {
          title: "Stable Data Structures",
          content:
            "For large datasets, serializing everything in `preupgrade` is slow and may exceed the instruction limit. ICP's ecosystem provides stable data structures — StableBTreeMap, StableHashMap, StableVec — that write directly to stable memory at runtime, bypassing the need for upgrade hooks. These structures are the preferred pattern for any canister that manages large amounts of persistent data, such as a registry, index, or ledger.",
        },
        {
          title: "State Design for Long-Running Workflows",
          content:
            "Autonomous workflows often span days or months: a vesting schedule, a multi-phase governance vote, a compound reward accumulation. Designing state for these workflows means thinking about what must be durable (balances, schedules, commitments), what is reconstructible (derived indices, caches), and what can be discarded (ephemeral processing state). Stable memory is finite — every byte should be justified.",
        },
      ],
      conclusion:
        "Persistent state on ICP is a design discipline, not just a runtime feature. Selecting the right memory layer, managing upgrade hooks carefully, and using stable data structures for large datasets are the practices that make autonomous systems reliable over time.",
    },
    quiz: {
      questions: [
        {
          id: "aut-04-q1",
          question:
            "Which Motoko hook executes immediately before a canister upgrade to preserve state?",
          options: ["postupgrade", "preinstall", "preupgrade", "onMigrate"],
          correctAnswer: 2,
          explanation:
            "`system func preupgrade()` executes before the upgrade, allowing developers to serialize heap data into stable variables that persist into the new version.",
        },
        {
          id: "aut-04-q2",
          question:
            "Why are stable data structures preferred over upgrade hooks for large datasets?",
          options: [
            "They are faster to read during query calls",
            "They write directly to stable memory at runtime, avoiding instruction-limit issues during upgrades",
            "They do not require Motoko",
            "They compress data automatically",
          ],
          correctAnswer: 1,
          explanation:
            "Serializing large datasets in `preupgrade` can exceed instruction limits. Stable data structures write to stable memory continuously at runtime, making upgrades safe regardless of dataset size.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-05",
    title: "Inter-Canister Coordination",
    description:
      "Build autonomous multi-canister systems using ICP's async inter-canister call model and callback patterns.",
    duration: "15 min",
    objectives: [
      "Execute async inter-canister calls from within a canister",
      "Handle call failures and implement retry logic",
      "Design loosely coupled canister workflows",
    ],
    content: {
      introduction:
        "Most real autonomous systems are not monolithic. They coordinate across multiple canisters: a controller canister orchestrates workers, a settlement canister interacts with a ledger, a registry canister responds to updates from data providers. ICP's inter-canister call model is the primitive that makes multi-canister coordination possible.",
      sections: [
        {
          title: "Async Inter-Canister Calls",
          content:
            "In Motoko, inter-canister calls use async/await syntax: `let result = await remoteCanister.method(args)`. The calling canister suspends execution, allows other messages to be processed, and resumes when the response arrives. This non-blocking model means a coordinator canister can issue multiple calls in parallel using `async` expressions and collect results without blocking the subnet.",
        },
        {
          title: "Call Failure Handling",
          content:
            "Inter-canister calls can fail: the target canister may trap, be stopped, or run out of cycles. These failures are surfaced as error values in Motoko's Result type or as rejected futures in Rust. Robust autonomous systems must handle failures explicitly — retrying transient errors, logging permanent failures to stable state, and maintaining system invariants even when sub-calls do not complete as expected.",
        },
        {
          title: "Reentrancy and State Safety",
          content:
            "When a canister awaits an inter-canister call, it yields control. Other messages can be processed before the await resumes. This creates a reentrancy window: state that was valid when the call was issued may have changed by the time the response arrives. Safe coordination requires either committing state before issuing calls, using locks in stable variables, or designing idempotent operations that tolerate being executed more than once.",
        },
        {
          title: "Coordination Topologies",
          content:
            "Common coordination patterns: hub-and-spoke (one orchestrator calls many workers), pipeline (each canister calls the next in a processing chain), and fanout-collect (a coordinator dispatches work in parallel and aggregates results). Each topology has different failure modes. Hub-and-spoke centralizes failure; pipelines propagate it; fanout-collect must handle partial results. Choosing the right topology is part of autonomous system design.",
        },
      ],
      conclusion:
        "Inter-canister coordination is how autonomous systems grow beyond single canisters into networked workflows. Mastering async calls, failure handling, and reentrancy safety is essential for building reliable multi-canister systems on ICP.",
    },
    quiz: {
      questions: [
        {
          id: "aut-05-q1",
          question:
            "What happens to a canister's execution when it awaits an inter-canister call in Motoko?",
          options: [
            "The entire subnet pauses",
            "The canister suspends and allows other messages to be processed",
            "The call executes synchronously within the same round",
            "The canister is stopped until the response arrives",
          ],
          correctAnswer: 1,
          explanation:
            "Await suspends the calling canister's current execution context without blocking the subnet, allowing other messages to be processed while the response is pending.",
        },
        {
          id: "aut-05-q2",
          question:
            "Why do inter-canister call patterns require careful state management around reentrancy?",
          options: [
            "Because calls are synchronous and block state access",
            "Because state can be modified by other messages during the await window before the response arrives",
            "Because ICP does not support async execution",
            "Because canister state is reset after every call",
          ],
          correctAnswer: 1,
          explanation:
            "While awaiting a response, other messages can modify canister state. Code that resumes after an await may be operating on state different from when the call was issued.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-06",
    title: "Autonomous Workflows",
    description:
      "Design multi-step canister workflows that execute, track state, and complete without human intervention.",
    duration: "14 min",
    objectives: [
      "Model multi-step workflows as canister state machines",
      "Combine timers and inter-canister calls to advance workflow state",
      "Handle partial completion and resumable workflows",
    ],
    content: {
      introduction:
        "An autonomous workflow is a sequence of operations that runs to completion without human intervention. On ICP, workflows are implemented as state machines inside canisters: each state represents a phase of the workflow, and transitions are triggered by messages, timers, or inter-canister call results.",
      sections: [
        {
          title: "Workflows as State Machines",
          content:
            "Modeling a workflow as a state machine forces explicit representation of every phase and transition. A vesting workflow might have states: Pending → Active → Claimable → Claimed. Each transition is a message handler or timer callback that validates preconditions, mutates state, and optionally triggers downstream work. State machines make workflow logic auditable and verifiable.",
        },
        {
          title: "Combining Timers and Calls",
          content:
            "Complex workflows often combine both primitives: a timer triggers a phase transition, which issues inter-canister calls to execute work, whose results trigger the next timer. A DeFi settlement workflow might use: (1) a recurring timer to check oracle price, (2) an inter-canister call to execute trades when threshold is hit, (3) a follow-up call to the ledger canister to settle balances. All autonomous, all protocol-native.",
        },
        {
          title: "Resumable Workflows",
          content:
            "Long-running workflows must be resumable. If a canister is upgraded mid-workflow, the workflow state must survive in stable memory and execution must continue correctly in the new version. This requires designing workflow state as a stable data structure, not ephemeral heap state. Workflow identifiers, phase, accumulated results, and pending retries must all be persisted.",
        },
        {
          title: "Workflow Observability",
          content:
            "Autonomous workflows must be observable without requiring human intervention. Query methods that expose current state, history of transitions, and pending work allow operators and users to monitor workflow progress. Logging transition events to stable storage creates an audit trail. Emitting notifications to subscriber canisters on completion enables downstream automation.",
        },
      ],
      conclusion:
        "Autonomous workflows combine the persistent state, timer, and inter-canister call primitives into cohesive execution sequences. Designing them as state machines with durable state and clear observability produces systems that are both powerful and trustworthy.",
    },
    quiz: {
      questions: [
        {
          id: "aut-06-q1",
          question:
            "Why is modeling a workflow as a state machine valuable for autonomous systems?",
          options: [
            "It reduces cycle consumption",
            "It makes every phase and transition explicit, auditable, and verifiable",
            "It removes the need for inter-canister calls",
            "It allows workflows to run on multiple subnets simultaneously",
          ],
          correctAnswer: 1,
          explanation:
            "State machines make workflow logic explicit. Every valid state and transition is defined, making the system's behavior auditable and easier to verify for correctness.",
        },
        {
          id: "aut-06-q2",
          question:
            "What must be stored in stable memory for a workflow to survive a canister upgrade?",
          options: [
            "Only the final result",
            "Workflow identifiers, current phase, accumulated results, and pending retries",
            "Only active timer references",
            "Nothing — workflows restart automatically after upgrade",
          ],
          correctAnswer: 1,
          explanation:
            "For a workflow to resume correctly after an upgrade, all durable state — phase, identifiers, accumulated work, and pending retries — must be persisted in stable memory.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-07",
    title: "Self-Updating Systems",
    description:
      "Explore how canisters can update their own code and configuration autonomously under governance control.",
    duration: "13 min",
    objectives: [
      "Understand the canister upgrade mechanism on ICP",
      "Use governance-controlled upgrade flows",
      "Design systems that evolve without operator downtime",
    ],
    content: {
      introduction:
        "A self-updating system can evolve its own behavior without downtime or manual operator deployment. On ICP, canisters can be upgraded programmatically. Governance canisters — like the NNS or custom SNS DAOs — can authorize and execute upgrades. This makes system evolution a protocol-governed process, not an infrastructure operation.",
      sections: [
        {
          title: "The Upgrade Mechanism",
          content:
            "Upgrading a canister installs new WebAssembly code while preserving stable memory. The management canister exposes `install_code` with mode `upgrade`. Any principal with controller permissions can issue this call. In production autonomous systems, controller permissions are transferred to a governance canister — meaning upgrades require a passed proposal, not a developer's private key.",
        },
        {
          title: "Governance-Controlled Upgrades",
          content:
            "The NNS controls upgrades of system canisters like the ledger and governance canister itself. SNS DAOs control upgrades of dapp canisters. Custom governance canisters can implement any upgrade authorization policy — multisig, token-weighted vote, time-locked proposal. The key property: no single principal can unilaterally modify the system. Upgrade authority is distributed and auditable.",
        },
        {
          title: "Zero-Downtime Upgrades",
          content:
            "ICP canister upgrades execute in a single consensus round. There is no deployment window, no traffic drain, no rolling restart. The canister briefly processes `preupgrade`, installs new code, runs `postupgrade`, and resumes processing messages. In practice, the upgrade is invisible to users. For systems with high message throughput, upgrade timing may require brief traffic management, but the protocol itself provides instant switching.",
        },
        {
          title: "Versioned State and Migration",
          content:
            "When a canister's data model changes across versions, state migration must be handled in `postupgrade`. A versioned state pattern stores a version number in stable memory. `postupgrade` reads the version, applies the necessary transformations to migrate data to the new schema, and updates the version number. This enables safe schema evolution without data loss or manual migration scripts.",
        },
      ],
      conclusion:
        "Self-updating systems on ICP are governed by protocol, not operators. Upgrades are atomic, zero-downtime, and authorized by governance. Designing for governance-controlled evolution from the start is what makes autonomous systems durable over years, not just weeks.",
    },
    quiz: {
      questions: [
        {
          id: "aut-07-q1",
          question:
            "What must be transferred to a governance canister to make canister upgrades decentralized?",
          options: [
            "Cycles balance",
            "Controller permissions",
            "Stable memory access",
            "The canister's API surface",
          ],
          correctAnswer: 1,
          explanation:
            "Controller permissions govern who can issue `install_code`. Transferring controller to a governance canister means upgrades require a governance proposal rather than a private key.",
        },
        {
          id: "aut-07-q2",
          question:
            "What is the purpose of a versioned state pattern in canister upgrades?",
          options: [
            "To reduce stable memory consumption",
            "To track and migrate data schema changes safely across versions in postupgrade",
            "To prevent unauthorized upgrades",
            "To replicate state across subnets",
          ],
          correctAnswer: 1,
          explanation:
            "A version number in stable memory allows `postupgrade` to detect schema changes and apply the correct data migrations, enabling safe canister evolution without data loss.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-08",
    title: "Fault Tolerance and Recovery",
    description:
      "Build autonomous systems that detect failures, recover gracefully, and maintain correctness under adverse conditions.",
    duration: "14 min",
    objectives: [
      "Identify failure modes in autonomous canister systems",
      "Implement retry logic, circuit breakers, and idempotent operations",
      "Design systems that maintain invariants under partial failure",
    ],
    content: {
      introduction:
        "Autonomous systems must operate without human intervention even when things go wrong. Failures in sub-calls, cycles exhaustion, and unexpected message ordering are all real scenarios. A system that requires an operator to recover it is not truly autonomous. Fault tolerance must be designed in, not patched in after the first incident.",
      sections: [
        {
          title: "Failure Modes in Autonomous Systems",
          content:
            "The main failure modes on ICP: (1) inter-canister calls that trap or reject, (2) cycles exhaustion causing canister freeze, (3) message queue overflow under load, (4) state corruption from reentrancy bugs. Each requires a different response. Trapped calls must be logged and retried. Cycles must be monitored and replenished. Queue limits must be respected in fanout designs. Reentrancy must be eliminated by design.",
        },
        {
          title: "Retry Logic and Idempotency",
          content:
            "Retry logic is only safe when operations are idempotent — producing the same result if executed multiple times. Idempotency keys (a unique identifier per operation stored in stable state) allow a canister to detect and skip duplicate work. Without idempotency, retrying a failed transfer could result in double execution. Designing operations to be idempotent first, then adding retry logic, is the correct order.",
        },
        {
          title: "Circuit Breakers",
          content:
            "A circuit breaker pattern tracks failure rates for a downstream canister and temporarily stops calling it when failures exceed a threshold. This prevents a failing dependency from degrading the whole system. The circuit breaker resets after a timeout and attempts a probe call. If the probe succeeds, normal operation resumes. This pattern is implemented as canister state — failure count, threshold, and reset timer in stable variables.",
        },
        {
          title: "Maintaining System Invariants",
          content:
            "System invariants — conservation of tokens, completeness of a data set, consistency of indices — must hold even when individual operations fail. This requires careful transaction design: commit state atomically where possible, roll back on failure, and use compensation logic (a correcting action that undoes partial work) when rollback is not possible. The canister model's serial message processing makes atomic state mutation achievable.",
        },
      ],
      conclusion:
        "Fault tolerance in autonomous systems is an operational property built into the design. Retry logic, idempotency, circuit breakers, and invariant-preserving transactions make systems that self-recover rather than requiring human intervention on every failure.",
    },
    quiz: {
      questions: [
        {
          id: "aut-08-q1",
          question:
            "Why is idempotency required before implementing retry logic in autonomous systems?",
          options: [
            "Retries consume more cycles without idempotency",
            "Without idempotency, retrying a failed operation can result in duplicate execution and incorrect state",
            "Idempotency is required by the ICP protocol",
            "Retries are not supported in Motoko",
          ],
          correctAnswer: 1,
          explanation:
            "Retry logic assumes that re-executing an operation is safe. Without idempotency guarantees, a retried transfer or state mutation can execute twice, corrupting system state.",
        },
        {
          id: "aut-08-q2",
          question:
            "What does a circuit breaker pattern track to protect an autonomous system?",
          options: [
            "Cycles balance of the local canister",
            "Failure rates for a downstream canister, pausing calls when failures exceed a threshold",
            "The number of active timers",
            "Subnet load metrics",
          ],
          correctAnswer: 1,
          explanation:
            "A circuit breaker tracks failures against a downstream dependency and temporarily stops calling it when failures exceed a threshold, preventing cascade failure.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-09",
    title: "Real-World Autonomous Use Cases",
    description:
      "Examine deployed autonomous systems on ICP and the design decisions that make them production-viable.",
    duration: "13 min",
    objectives: [
      "Identify real autonomous systems operating on ICP today",
      "Analyze the design decisions behind production autonomous canisters",
      "Map use case requirements to ICP-native primitives",
    ],
    content: {
      introduction:
        "Autonomous systems on ICP are not theoretical. The NNS, SNS governance, ICP ledger, ckBTC minter, and the Internet Identity canister all operate autonomously. Each demonstrates different design patterns. Studying them reveals how the primitives — timers, stable state, inter-canister calls — combine into reliable production systems.",
      sections: [
        {
          title: "The NNS as an Autonomous System",
          content:
            "The Network Nervous System is the most complex autonomous canister system deployed on ICP. It manages neuron staking, proposal lifecycle, voting tallies, reward distribution, and canister upgrades — all without human intervention. Proposals advance through states on a timer. Voting periods expire automatically. Rewards are distributed on a recurring schedule. The NNS canister operates indefinitely based on protocol rules alone.",
        },
        {
          title: "ckBTC Minter: Cross-Chain Autonomous Settlement",
          content:
            "The ckBTC minter canister autonomously manages the issuance and redemption of ckBTC tokens. When a user deposits BTC, the minter monitors the Bitcoin network via threshold ECDSA and ICP's Bitcoin integration, verifies the deposit, and mints ckBTC. Withdrawals trigger autonomous BTC transaction signing and broadcast. This cross-chain operation runs without a custodian, operator, or bridge operator — it is governed by protocol.",
        },
        {
          title: "Autonomous DeFi Protocols",
          content:
            "DeFi protocols on ICP use recurring timers for interest accrual, price feed updates, and liquidation checks. A lending protocol canister checks collateral ratios on every timer tick and triggers liquidation calls to trading canisters when thresholds are breached. A DEX canister processes swaps, updates liquidity pool state, and distributes fees — all within atomic message handlers, with no off-chain keeper bots required.",
        },
        {
          title: "SNS DAOs: Autonomous Governance",
          content:
            "Service Nervous System DAOs give any dapp on ICP decentralized governance. An SNS canister autonomously manages token distribution, proposal submission and execution, neuron rewards, and treasury management. When a proposal passes, the SNS canister autonomously executes it — upgrading a dapp canister, transferring treasury funds, or updating system parameters. No multisig wallet, no human execution step.",
        },
      ],
      conclusion:
        "Production autonomous systems on ICP demonstrate that the primitives work at scale. The NNS, ckBTC, SNS DAOs, and DeFi protocols are all running without operators. Understanding their design is the fastest path to building your own autonomous system.",
    },
    quiz: {
      questions: [
        {
          id: "aut-09-q1",
          question:
            "What mechanism does the ckBTC minter use to sign Bitcoin transactions without a human custodian?",
          options: [
            "A multisig wallet controlled by DFINITY",
            "Threshold ECDSA via ICP's chain-key cryptography",
            "An off-chain relayer service",
            "A hardware security module",
          ],
          correctAnswer: 1,
          explanation:
            "The ckBTC minter uses threshold ECDSA, part of ICP's chain-key cryptography, to autonomously sign Bitcoin transactions without any human custodian or off-chain component.",
        },
        {
          id: "aut-09-q2",
          question:
            "What does an SNS DAO do when a proposal passes, without human intervention?",
          options: [
            "Emails a notification to the founding team",
            "Autonomously executes the proposal — upgrading canisters, transferring funds, or updating parameters",
            "Queues the action for manual review",
            "Submits the action to the NNS for approval",
          ],
          correctAnswer: 1,
          explanation:
            "An SNS canister automatically executes passed proposals — including canister upgrades, treasury transfers, and parameter changes — without requiring a human execution step.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
  {
    id: "aut-10",
    title: "The Future of Autonomous Infrastructure",
    description:
      "Examine the trajectory of autonomous compute on ICP and the implications for software, organizations, and society.",
    duration: "12 min",
    objectives: [
      "Project the evolution of autonomous systems on ICP",
      "Understand the role of autonomous infrastructure in decentralized economies",
      "Identify the open design problems in autonomous system engineering",
    ],
    content: {
      introduction:
        "The Internet Computer is the first platform where autonomous systems are not an architectural aspiration but a runtime property. The implications — for software development, for organizations, for economic coordination — are still unfolding. This lesson looks at where autonomous infrastructure is headed and what it means to build for that future.",
      sections: [
        {
          title: "From Services to Autonomous Protocols",
          content:
            "Traditional software is deployed as a service: a company runs infrastructure, manages access, and can shut it down. Autonomous canisters are protocols: once deployed with distributed governance, no single party can stop them. This shifts the fundamental nature of software from a product controlled by a vendor to a protocol governed by its users. The implications for trust, longevity, and coordination are profound.",
        },
        {
          title: "AI and Autonomous Execution",
          content:
            "The convergence of on-chain AI inference and autonomous execution is ICP's next frontier. An AI model running inside a canister can make decisions, trigger workflows, and coordinate with other canisters — all autonomously. A credit scoring canister running a neural network could autonomously approve loans and instruct a lending canister to disburse funds. The computation is on-chain, the output is verifiable, the execution is protocol-governed.",
        },
        {
          title: "Open Problems in Autonomous Systems",
          content:
            "Significant problems remain: cycles management for long-running canisters without a revenue model, governance of systems that must evolve rapidly, formal verification of autonomous workflows, and composability of autonomous systems that were not designed to interact. These are active research and engineering problems in the ICP ecosystem. The primitives exist; the tooling, patterns, and best practices are still being established.",
        },
        {
          title: "Building for Protocol Time",
          content:
            "Human organizations operate on human time: quarterly reviews, annual plans, multi-year roadmaps. Autonomous protocols operate on protocol time: every consensus round, indefinitely. Building for protocol time means designing systems whose correctness holds for years, not months — where state management, fee structures, governance mechanisms, and upgrade paths are all considered from day one. The systems that will matter most are the ones designed to run forever.",
        },
      ],
      conclusion:
        "Autonomous infrastructure on ICP represents a new category of software: systems that operate by protocol, governed by their users, running indefinitely. Building in this space requires combining the technical primitives covered in this module with a long-horizon design perspective. The infrastructure of the future is being built now.",
    },
    quiz: {
      questions: [
        {
          id: "aut-10-q1",
          question:
            "What distinguishes an autonomous canister protocol from a traditional software service?",
          options: [
            "Protocols are faster to execute",
            "No single party can shut down a protocol with distributed governance, unlike a service controlled by a vendor",
            "Protocols do not require upgrades",
            "Services use more cycles than protocols",
          ],
          correctAnswer: 1,
          explanation:
            "Once deployed with distributed governance, an autonomous canister protocol cannot be unilaterally stopped by any single party, unlike a traditional service which a company can shut down at will.",
        },
        {
          id: "aut-10-q2",
          question:
            "What enables verifiable AI decision-making in an autonomous ICP canister?",
          options: [
            "Off-chain AI inference reported by an oracle",
            "On-chain AI inference inside a canister, where computation is protocol-governed and outputs are verifiable",
            "A trusted AI provider API accessed via HTTP outcalls",
            "Zero-knowledge proofs of model execution",
          ],
          correctAnswer: 1,
          explanation:
            "Running AI inference inside a canister means the computation executes under ICP consensus, making outputs verifiable and the process protocol-governed with no trusted third party.",
        },
      ],
    },
    xpReward: 50,
    creditsReward: 10,
  },
];

export const module03MegaQuizEN: LessonContent = {
  id: "aut-quiz",
  title: "Mega Quiz: Autonomous Systems Mastery",
  description:
    "Verify your understanding of autonomous system design, ICP-native execution primitives, and production deployment patterns.",
  duration: "20 min",
  objectives: [
    "Demonstrate mastery of ICP autonomous system fundamentals",
    "Apply knowledge of timers, state, inter-canister coordination, and fault tolerance",
    "Validate understanding of real-world autonomous system design",
  ],
  content: {
    introduction:
      "This mastery quiz covers all ten lessons of Module 03: Autonomous Systems. Each question tests applied understanding of ICP-native autonomous system design — from execution primitives to production deployment patterns.",
    sections: [
      {
        title: "Mastery Assessment",
        content:
          "You will be tested on: system autonomy properties, event-driven execution, ICP timer primitives, persistent state management, inter-canister coordination, workflow design, self-updating systems, fault tolerance, real-world use cases, and the future of autonomous infrastructure. All questions are grounded in ICP-native architecture.",
      },
    ],
    conclusion:
      "Completing this quiz demonstrates readiness to design and deploy autonomous systems on the Internet Computer.",
  },
  quiz: {
    questions: [
      {
        id: "aut-quiz-q1",
        question:
          "Which three properties define a genuinely autonomous system on ICP?",
        options: [
          "Speed, scalability, and availability",
          "Persistent state, self-execution, and deterministic behavior",
          "HTTP access, token support, and upgrade capability",
          "Frontend, backend, and storage layers",
        ],
        correctAnswer: 1,
        explanation:
          "Autonomous systems require state that survives restarts (persistence), the ability to schedule their own execution (self-execution), and consistent behavior under the same conditions (determinism).",
      },
      {
        id: "aut-quiz-q2",
        question:
          "What is the execution unit in ICP's native model that enables event-driven architecture?",
        options: ["Cron jobs", "HTTP requests", "Messages", "Subroutines"],
        correctAnswer: 2,
        explanation:
          "All ICP canister interactions are messages. This message-passing model is the foundation of ICP's event-driven execution architecture.",
      },
      {
        id: "aut-quiz-q3",
        question:
          "Which ICP timer primitive should be used for work that must execute repeatedly at a fixed interval?",
        options: [
          "setTimer",
          "heartbeat",
          "recurringTimer",
          "scheduleCallback",
        ],
        correctAnswer: 2,
        explanation:
          "`recurringTimer(interval, callback)` schedules periodic execution. It is preferred over heartbeats for most scheduled work because it only consumes cycles when it fires.",
      },
      {
        id: "aut-quiz-q4",
        question:
          "What is the primary purpose of `system func preupgrade()` in a Motoko canister?",
        options: [
          "To authorize upgrade transactions",
          "To serialize heap state into stable variables before the upgrade installs new code",
          "To reset stable memory to its initial state",
          "To notify subscriber canisters of the pending upgrade",
        ],
        correctAnswer: 1,
        explanation:
          "`preupgrade` executes just before new code is installed, allowing developers to move data from heap into stable variables so it persists into the new version.",
      },
      {
        id: "aut-quiz-q5",
        question:
          "What reentrancy risk must be managed when a canister awaits an inter-canister call?",
        options: [
          "The canister's cycles balance may be depleted",
          "Other messages can modify canister state during the await window before the response arrives",
          "The await prevents new messages from being queued",
          "The caller canister is stopped until the response is delivered",
        ],
        correctAnswer: 1,
        explanation:
          "During an await, other messages can be processed and modify state. Code that resumes after an await may be operating on state different from when the call was issued.",
      },
      {
        id: "aut-quiz-q6",
        question:
          "What must a resumable workflow store in stable memory to survive a canister upgrade?",
        options: [
          "Only the final expected result",
          "Workflow identifiers, current phase, accumulated results, and pending retries",
          "The Wasm binary of the current version",
          "A copy of all inter-canister call responses",
        ],
        correctAnswer: 1,
        explanation:
          "For a workflow to resume correctly after an upgrade, all durable operational state must be in stable memory, including its identity, phase, work done so far, and any pending retry operations.",
      },
      {
        id: "aut-quiz-q7",
        question:
          "Why must idempotency be established before implementing retry logic in a canister?",
        options: [
          "ICP rejects non-idempotent update calls",
          "Without idempotency, retrying a failed operation may execute it twice, corrupting system state",
          "Retry logic is not supported in Rust CDK",
          "Idempotency reduces the cycles cost of each call",
        ],
        correctAnswer: 1,
        explanation:
          "Retry logic is only safe when the operation produces the same result if executed more than once. Non-idempotent retries can cause double-execution of transfers or state mutations.",
      },
      {
        id: "aut-quiz-q8",
        question:
          "Which governance mechanism allows SNS DAO proposals to execute autonomously on ICP?",
        options: [
          "A multisig wallet held by the founding team",
          "The SNS canister executing passed proposals — upgrades, transfers, parameter changes — without a human step",
          "An off-chain executor service run by the SNS",
          "DFINITY Foundation approval of each proposal",
        ],
        correctAnswer: 1,
        explanation:
          "SNS canisters autonomously execute proposals once they pass — including canister upgrades, treasury transfers, and system parameter changes — with no human execution step required.",
      },
      {
        id: "aut-quiz-q9",
        question:
          "What does a circuit breaker pattern track to protect a canister from a failing dependency?",
        options: [
          "The cycles balance of the dependency",
          "Failure rates for a downstream canister, pausing calls when the rate exceeds a threshold",
          "The number of pending messages in the local queue",
          "The time since the last successful subnet checkpoint",
        ],
        correctAnswer: 1,
        explanation:
          "A circuit breaker tracks failure rates against a specific downstream canister and stops calling it when failures exceed a threshold, preventing one failing component from degrading the entire system.",
      },
      {
        id: "aut-quiz-q10",
        question:
          "What is the fundamental difference between software deployed as a service and software deployed as an autonomous protocol on ICP?",
        options: [
          "Protocols are faster and cheaper",
          "No single party can shut down a governance-distributed protocol, unlike a vendor-controlled service",
          "Services require more canisters than protocols",
          "Protocols do not support user authentication",
        ],
        correctAnswer: 1,
        explanation:
          "With distributed governance, no single party can unilaterally stop or modify an autonomous protocol. This makes it fundamentally different from a service that a company controls and can shut down.",
      },
    ],
  },
  xpReward: 120,
  creditsReward: 40,
};
