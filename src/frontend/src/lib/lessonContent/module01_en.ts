// Module 01: Decentralized AI — Verifiable Intelligence Layer
// 10 lessons + 1 Mega Quiz lesson
import type { LessonContent } from "../lessonContent";

export const module01LessonsEN: LessonContent[] = [
  {
    id: "vil-01",
    title: "What Is Decentralized AI?",
    description:
      "Understand what decentralized AI means, why it matters, and how it differs from traditional AI systems.",
    duration: "12 min",
    objectives: [
      "Define decentralized AI and its core properties",
      "Contrast centralized vs decentralized AI architectures",
      "Identify the key problems decentralized AI solves",
      "Recognize real-world implications of AI decentralization",
    ],
    content: {
      introduction:
        "Every AI system you interact with today runs on servers owned by a handful of corporations. Your queries, your data, and the model weights themselves are locked inside private data centers. Decentralized AI changes this fundamental dynamic — placing inference, training, and governance on networks that no single entity controls.",
      sections: [
        {
          title: "The Centralization Problem",
          content:
            "Today's leading AI systems — GPT, Gemini, Claude — run on infrastructure controlled by Amazon Web Services, Google Cloud, and Microsoft Azure. This means a single company can modify a model's outputs, censor queries, raise prices arbitrarily, or simply shut off access. For a technology becoming as foundational as electricity, this concentration of control is a structural risk.",
        },
        {
          title: "What Decentralized AI Actually Means",
          content:
            "Decentralized AI refers to AI systems where the compute, data, and governance are distributed across networks with no single point of control. This can mean models running inside blockchain canisters, inference results verified by cryptographic proofs, training data owned by collectives rather than corporations, and governance of model updates handled by token-holding communities rather than product teams.",
        },
        {
          title: "Key Properties That Define It",
          content:
            "Three properties distinguish decentralized AI from its centralized counterpart: verifiability (you can prove the model ran correctly without trusting the operator), permissionlessness (anyone can query or deploy without approval), and censorship resistance (no authority can block access or alter outputs). These properties combine to create AI systems that are trustworthy by design, not by corporate promise.",
        },
        {
          title: "Why This Matters Now",
          content:
            "As AI becomes infrastructure — embedded in healthcare, finance, legal systems, and governance — the question of who controls AI becomes as important as the question of what AI can do. A world where three companies control the world's reasoning infrastructure is fragile. Decentralized AI is the architectural response to that fragility.",
        },
      ],
      conclusion:
        "Decentralized AI is not just a technical preference — it is an architectural stance about who should control intelligent systems. As you move through this module, you will develop the vocabulary and mental models to evaluate, build, and critique these systems from first principles.",
    },
    quiz: {
      questions: [
        {
          id: "vil-01-q1",
          question:
            "Which property ensures that a decentralized AI model ran correctly without trusting the operator?",
          options: [
            "Permissionlessness",
            "Verifiability",
            "Censorship resistance",
            "Tokenization",
          ],
          correctAnswer: 1,
          explanation:
            "Verifiability means you can cryptographically confirm that the model executed correctly — no trust in the operator required.",
        },
        {
          id: "vil-01-q2",
          question:
            "What is the main structural risk of having AI infrastructure controlled by a few large corporations?",
          options: [
            "AI models become too slow",
            "A single entity can modify outputs, censor access, or shut down the service",
            "AI becomes more expensive to train",
            "Models lose accuracy over time",
          ],
          correctAnswer: 1,
          explanation:
            "Centralized control gives a single company the power to alter, restrict, or revoke access to critical AI infrastructure — a structural risk for a technology becoming as foundational as electricity.",
        },
        {
          id: "vil-01-q3",
          question:
            "Which of the following is NOT a defining property of decentralized AI?",
          options: [
            "Verifiability",
            "Permissionlessness",
            "Faster inference speed",
            "Censorship resistance",
          ],
          correctAnswer: 2,
          explanation:
            "The three core properties are verifiability, permissionlessness, and censorship resistance. Inference speed is a performance metric, not a defining structural property of decentralization.",
        },
        {
          id: "vil-01-q4",
          question:
            "Where does decentralized AI place compute, data, and governance?",
          options: [
            "On a single high-performance server",
            "In private data centers owned by cloud providers",
            "Distributed across networks with no single point of control",
            "On user devices only",
          ],
          correctAnswer: 2,
          explanation:
            "Decentralized AI distributes compute, data, and governance across networks so that no single entity controls the system.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-02",
    title: "AI Without Cloud Providers",
    description:
      "Explore what AI systems look like when they operate outside of traditional cloud infrastructure.",
    duration: "12 min",
    objectives: [
      "Identify the dependency chain between AI and cloud providers",
      "Understand the failure modes of cloud-dependent AI",
      "Explore alternatives to cloud AI infrastructure",
      "Evaluate tradeoffs between cloud and sovereign AI compute",
    ],
    content: {
      introduction:
        "The entire modern AI stack sits on a foundation of rented compute. GPUs in Amazon data centers run OpenAI models. Google's TPUs power Gemini. Microsoft's Azure hosts Copilot. This dependency is so normalized that we rarely question it — but it carries consequences that are only beginning to be understood.",
      sections: [
        {
          title: "The Cloud Dependency Chain",
          content:
            "When you send a query to a hosted AI model, you are trusting a chain of providers: the AI company, their cloud vendor, the cloud vendor's data center operators, and the networking providers in between. Each link in that chain is a point of failure, a surveillance surface, and a policy enforcement point. Cloud providers can and do throttle, log, and terminate access to AI workloads with little notice.",
        },
        {
          title: "What Breaks When Cloud AI Fails",
          content:
            "Cloud AI failures are not hypothetical. Outages at AWS, Google Cloud, and Azure have taken down AI-dependent products across industries simultaneously. More subtle failures include silent model updates where a company changes the model behind an API without announcement, rate limiting during high demand, price changes that make products economically unviable, and geopolitical shutoffs where cloud providers deny access to entire countries.",
        },
        {
          title: "Alternatives: Sovereign and On-Chain Compute",
          content:
            "Three alternative architectures are emerging: local inference (running models on consumer hardware using tools like llama.cpp or Ollama), decentralized compute networks (networks like Bittensor or ICP's AI subnets where nodes are operated by independent validators), and peer-to-peer model hosting (protocols where models are distributed across community-run nodes rather than corporate servers). Each approach sacrifices something — latency, model size, ease of use — in exchange for independence.",
        },
        {
          title: "The Case for Independence",
          content:
            "The question is not whether cloud AI works. It clearly does. The question is what kind of dependency is acceptable for critical infrastructure. Societies do not allow a single company to control water or electricity networks — the same logic is beginning to be applied to AI. Sovereign and decentralized compute is not about rejecting cloud efficiency; it is about ensuring that alternatives exist and are viable.",
        },
      ],
      conclusion:
        "AI without cloud providers is not a constraint — it is a design choice. As the infrastructure matures, the ability to run AI on networks that resist corporate and political capture becomes a meaningful competitive and philosophical differentiator.",
    },
    quiz: {
      questions: [
        {
          id: "vil-02-q1",
          question:
            "Which of the following is a real failure mode of cloud-dependent AI?",
          options: [
            "Models become smarter over time",
            "Silent model updates where APIs change without announcement",
            "Users gain ownership of model weights",
            "Inference speeds improve automatically",
          ],
          correctAnswer: 1,
          explanation:
            "Silent model updates — where a cloud provider changes the model behind an API without notice — are a documented failure mode that can break downstream applications.",
        },
        {
          id: "vil-02-q2",
          question:
            'What does "sovereign compute" refer to in the context of AI infrastructure?',
          options: [
            "AI models owned by governments",
            "Compute that operates independently of major cloud providers",
            "Hardware purchased by individual users",
            "AI regulated by international treaties",
          ],
          correctAnswer: 1,
          explanation:
            "Sovereign compute refers to infrastructure that operates independently of large cloud providers, giving operators control without external dependency.",
        },
        {
          id: "vil-02-q3",
          question:
            "Which alternative AI infrastructure model uses independent validators to host compute?",
          options: [
            "Local inference on consumer hardware",
            "Cloud AI with enhanced SLAs",
            "Decentralized compute networks",
            "Government data centers",
          ],
          correctAnswer: 2,
          explanation:
            "Decentralized compute networks like Bittensor or ICP AI subnets use independent node operators (validators) rather than corporate-owned infrastructure.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-03",
    title: "ICP as the Compute Layer for AI",
    description:
      "Understand how the Internet Computer Protocol provides a native compute substrate for decentralized AI systems.",
    duration: "14 min",
    objectives: [
      "Describe ICP's unique compute architecture",
      "Explain how canisters enable AI workloads",
      "Understand WASM execution and its relevance for AI",
      "Identify current and emerging ICP AI capabilities",
    ],
    content: {
      introduction:
        "Most blockchains are designed for financial transactions — small, fast, deterministic operations on lightweight data. AI is the opposite: compute-heavy, probabilistic, and data-hungry. The Internet Computer was designed from the ground up as a general-purpose compute layer, making it one of the few blockchains where AI workloads are not just theoretically possible but practically deployable.",
      sections: [
        {
          title: "Canisters as Compute Units",
          content:
            "ICP's fundamental unit is the canister — a WebAssembly smart contract that combines code and state. Unlike Ethereum contracts that execute tiny operations, canisters can run large programs, maintain gigabytes of persistent state, serve HTTP directly to browsers, and call external APIs via HTTPS outcalls. This architectural difference is what makes canisters viable as AI inference hosts rather than mere transaction validators.",
        },
        {
          title: "WASM and AI Model Execution",
          content:
            "WebAssembly (WASM) is a portable binary instruction format that runs near-native speed in any environment. ICP executes all canister code as WASM. This matters for AI because WASM runtimes now support SIMD instructions, enabling matrix multiplication — the core operation in neural networks — at competitive speeds. Machine learning inference runtimes like ONNX and TensorFlow Lite have been ported to WASM, meaning models can run directly inside ICP canisters.",
        },
        {
          title: "ICP's AI-Specific Infrastructure",
          content:
            "ICP has several properties that align specifically with AI workloads: large canister memory (up to 400GB of stable storage per canister), deterministic execution enabling reproducible AI outputs, chain-key cryptography enabling AI agents to hold and move assets, HTTPS outcalls enabling canisters to call external AI APIs and verify responses, and orthogonal persistence meaning AI model state survives upgrades without explicit serialization.",
        },
        {
          title: "Current and Emerging Capabilities",
          content:
            "As of today, ICP supports small-to-medium AI models running entirely on-chain (sentiment analysis, classification, embedding generation), larger models via hybrid approaches where inference calls external services verified via HTTPS outcalls, and AI agents built as autonomous canisters that hold ICP or ckBTC and execute multi-step workflows. The DFINITY Foundation is actively developing dedicated AI subnets with GPU-equipped nodes to bring large model inference fully on-chain.",
        },
      ],
      conclusion:
        "ICP is not retrofitting AI onto a blockchain designed for financial transfers. Its architecture — WebAssembly execution, massive persistent memory, HTTP-native serving, and chain-key cryptography — was designed for general compute, and that generality is exactly what AI requires.",
    },
    quiz: {
      questions: [
        {
          id: "vil-03-q1",
          question:
            "What is the fundamental compute unit on the Internet Computer?",
          options: ["Smart contract", "Node", "Canister", "Subnet"],
          correctAnswer: 2,
          explanation:
            "The canister is ICP's fundamental compute unit — a WebAssembly smart contract combining code and persistent state, capable of running large programs and serving HTTP directly.",
        },
        {
          id: "vil-03-q2",
          question: "Why is WASM execution relevant for running AI on ICP?",
          options: [
            "WASM is slower than native code, making it safer for AI",
            "WASM supports SIMD instructions enabling fast matrix multiplication, the core operation in neural networks",
            "WASM is required for financial transactions on ICP",
            "WASM reduces the size of AI models automatically",
          ],
          correctAnswer: 1,
          explanation:
            "WASM with SIMD support enables fast matrix multiplication — neural networks' core operation — making near-native speed AI inference possible inside canisters.",
        },
        {
          id: "vil-03-q3",
          question:
            "How does orthogonal persistence benefit AI workloads on ICP?",
          options: [
            "It makes AI inference faster",
            "It enables canisters to call external AI APIs",
            "AI model state survives canister upgrades without explicit serialization",
            "It reduces compute costs by 50%",
          ],
          correctAnswer: 2,
          explanation:
            "Orthogonal persistence means canister state — including AI model weights — is automatically preserved across upgrades without developers writing explicit serialization code.",
        },
        {
          id: "vil-03-q4",
          question: "What do HTTPS outcalls enable for AI canisters on ICP?",
          options: [
            "Running larger models locally on the canister",
            "Canisters calling external AI APIs and verifying the responses",
            "Reducing memory usage in canisters",
            "Compressing neural network weights",
          ],
          correctAnswer: 1,
          explanation:
            "HTTPS outcalls allow canisters to query external AI services (like OpenAI) and verify the responses, enabling hybrid AI architectures with on-chain verification.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-04",
    title: "AI Agents and Autonomous Execution",
    description:
      "Learn what AI agents are, how they operate autonomously on-chain, and why autonomous execution changes the economics of AI.",
    duration: "13 min",
    objectives: [
      "Define AI agents and their core properties",
      "Distinguish between reactive and autonomous AI agents",
      "Understand how canisters enable agent autonomy on ICP",
      "Identify the trust and verification challenges of autonomous AI",
    ],
    content: {
      introduction:
        "An AI that only answers questions is a tool. An AI that takes actions — booking appointments, executing trades, deploying code, moving funds — is an agent. The shift from AI as tool to AI as agent is one of the most consequential transitions in the current technology cycle, and blockchains like ICP provide the infrastructure to make that agency verifiable and trustworthy.",
      sections: [
        {
          title: "What Makes Something an AI Agent",
          content:
            "An AI agent has four properties that distinguish it from a simple model: perception (it takes inputs from the environment), reasoning (it uses a model to interpret those inputs), action (it executes operations in the world based on that reasoning), and memory (it maintains state between interactions). Agents are persistent, goal-directed, and capable of multi-step workflows that extend beyond a single prompt-response cycle.",
        },
        {
          title: "Reactive vs Autonomous Agents",
          content:
            "A reactive agent responds to explicit human commands — you ask it to do something, it does it. An autonomous agent pursues goals independently, generating and executing its own sub-tasks. Reactive agents are already mainstream (Copilot, Claude computer use). Autonomous agents — those that wake up on a schedule, monitor conditions, and take independent action — represent the next wave and introduce qualitatively new questions about oversight and accountability.",
        },
        {
          title: "Canisters as Agent Substrates",
          content:
            "ICP canisters are uniquely suited to hosting autonomous agents because they combine the properties agents need: persistent memory that survives restarts, timers that allow self-scheduling (a canister can wake itself up without human prompting), the ability to hold and transact with digital assets like ICP and ckBTC, HTTPS outcalls that let agents call external APIs and AI services, and cryptographic identity that lets agents sign transactions and authenticate themselves across systems.",
        },
        {
          title: "Trust and Verification",
          content:
            "Autonomous agents that control assets create accountability questions: who is responsible when an agent makes a mistake? On traditional cloud platforms, there is no way to verify what an agent actually did or whether its reasoning matched its stated rationale. On ICP, every canister execution is logged to an immutable ledger, agent actions are deterministic and reproducible, and governance tokens can give communities oversight over agent behavior — creating accountable autonomy rather than opaque autonomy.",
        },
      ],
      conclusion:
        "AI agents on ICP are not science fiction. Autonomous canisters that hold assets, call AI APIs, execute trades, and self-schedule are deployable today. The infrastructure question has been answered. The design question — what should agents be trusted to do autonomously — is where the interesting work now lives.",
    },
    quiz: {
      questions: [
        {
          id: "vil-04-q1",
          question: "What distinguishes an AI agent from a simple AI model?",
          options: [
            "Agents use more parameters",
            "Agents take actions in the world with perception, reasoning, action, and memory",
            "Agents are always connected to the internet",
            "Agents require human supervision for every step",
          ],
          correctAnswer: 1,
          explanation:
            "AI agents combine perception, reasoning, action, and memory — enabling them to take multi-step actions in the world rather than just responding to prompts.",
        },
        {
          id: "vil-04-q2",
          question:
            "What ICP canister feature allows an agent to take action without a human prompt?",
          options: [
            "HTTPS outcalls",
            "Orthogonal persistence",
            "Timers that allow self-scheduling",
            "Chain-key cryptography",
          ],
          correctAnswer: 2,
          explanation:
            "ICP canister timers allow a canister to schedule its own future execution — enabling autonomous agents to wake up, check conditions, and act without human prompting.",
        },
        {
          id: "vil-04-q3",
          question:
            "How does running AI agents on ICP improve accountability compared to cloud platforms?",
          options: [
            "ICP agents are cheaper to operate",
            "Every canister execution is logged immutably, making agent actions verifiable",
            "ICP agents have lower latency",
            "Cloud platforms cannot run AI agents at all",
          ],
          correctAnswer: 1,
          explanation:
            "On ICP, canister execution is logged to an immutable ledger, making every agent action traceable and verifiable — unlike opaque cloud-based agents.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-05",
    title: "Cost of Compute and Why It Matters",
    description:
      "Understand the economics of AI compute — who pays, how much, and why compute cost is a strategic variable in decentralized AI.",
    duration: "11 min",
    objectives: [
      "Understand the cost structure of AI inference and training",
      "Compare cloud compute pricing with ICP Cycles",
      "Explain ICP's reverse gas model and its implications",
      "Identify how compute cost shapes AI adoption and decentralization",
    ],
    content: {
      introduction:
        "Intelligence has a price. Every AI response you receive required electricity, hardware depreciation, cooling, networking, and margin for the provider. At scale, the economics of compute become the economics of AI itself — determining who can afford to build, who can afford to query, and whether decentralized alternatives can compete. Understanding compute cost is understanding AI power.",
      sections: [
        {
          title: "What AI Compute Actually Costs",
          content:
            "A single GPT-4 query consumes approximately 0.001–0.003 kWh — a small but non-trivial amount. At scale, OpenAI reportedly spends over $700,000 per day on compute. Training frontier models costs tens to hundreds of millions of dollars. These costs are why AI is dominated by well-capitalized companies — not because the ideas are proprietary, but because running the ideas requires infrastructure that most cannot afford. The compute wall is one of the strongest moats in technology.",
        },
        {
          title: "Cloud Pricing and Its Opacity",
          content:
            "AWS, Google Cloud, and Azure use dynamic pricing with complex tiers, spot pricing, and negotiated enterprise contracts. A GPU instance that costs $3/hour at list price may be available at $0.50/hour for large customers or cost $10/hour during peak demand. This opacity makes it difficult for small operators to budget AI workloads and gives large incumbents structural advantages. Hidden egress fees compound the problem — the cost to move data out of a cloud environment is often higher than the compute cost itself.",
        },
        {
          title: "ICP's Reverse Gas Model",
          content:
            "ICP inverts the traditional blockchain gas model. In Ethereum, users pay gas for every transaction. In ICP, developers pre-charge their canisters with Cycles (ICP's compute currency), and users interact for free. This means an AI service on ICP can offer zero-cost queries to end users while the service operator manages the Cycles balance. It also means compute costs are stable and predictable — Cycles prices are algorithmically stabilized relative to the cost of compute, not subject to auction-driven gas spikes.",
        },
        {
          title: "Compute Cost as a Strategic Variable",
          content:
            "In a world where AI compute is cheap and accessible, AI applications proliferate. When it is expensive and concentrated, AI capabilities consolidate with incumbents. Decentralized compute networks compete not just on ideology but on economics — if ICP or similar networks can deliver AI inference at lower cost than AWS while providing verifiability and censorship resistance, adoption follows economics, not principle. Cost is therefore not just an operational concern but a strategic one for the entire decentralized AI ecosystem.",
        },
      ],
      conclusion:
        "The economics of compute determine the distribution of AI power. Understanding where compute is cheap, where it is transparent, and where it is controlled gives you a map of where AI capabilities will concentrate and where they will democratize. ICP's reverse gas model is one design attempt to shift those economics.",
    },
    quiz: {
      questions: [
        {
          id: "vil-05-q1",
          question:
            "What does ICP's reverse gas model mean for end users of AI services?",
          options: [
            "Users pay higher fees than on Ethereum",
            "Users interact for free because developers pre-charge canisters with Cycles",
            "Users must hold ICP tokens to query AI services",
            "Users pay per query using a credit card",
          ],
          correctAnswer: 1,
          explanation:
            "In ICP's reverse gas model, developers pre-load their canisters with Cycles. End users interact for free — the cost is absorbed by the service operator, not the end user.",
        },
        {
          id: "vil-05-q2",
          question:
            "Why is compute cost considered a strategic variable for decentralized AI?",
          options: [
            "Lower compute cost means AI models become less accurate",
            "If decentralized networks can deliver AI at lower cost than cloud providers, adoption follows economics",
            "Compute cost only affects training, not inference",
            "Decentralized compute is always more expensive than cloud",
          ],
          correctAnswer: 1,
          explanation:
            "If decentralized AI infrastructure can match or undercut cloud costs while adding verifiability and censorship resistance, adoption is driven by economics rather than ideology.",
        },
        {
          id: "vil-05-q3",
          question: "What is Cycles in the ICP ecosystem?",
          options: [
            "ICP's governance token",
            "ICP's unit of compute currency used to charge canister execution",
            "A staking reward mechanism",
            "The name for ICP transaction fees",
          ],
          correctAnswer: 1,
          explanation:
            "Cycles is ICP's compute currency. Developers burn Cycles to execute canister code. Cycles prices are stabilized relative to compute cost, providing predictable pricing.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-06",
    title: "On-Chain vs Off-Chain AI",
    description:
      "Compare on-chain and off-chain AI architectures, understand their tradeoffs, and learn when each approach is appropriate.",
    duration: "12 min",
    objectives: [
      "Define on-chain and off-chain AI clearly",
      "Understand the tradeoffs between both approaches",
      "Identify hybrid architectures and their verification patterns",
      "Apply the correct architecture choice to a given use case",
    ],
    content: {
      introduction:
        "Not all AI needs to run on-chain. Not all AI should run off-chain. The decision between on-chain and off-chain AI is a tradeoff matrix involving cost, latency, verifiability, model size, and trust requirements. Understanding when each approach is correct — and how hybrid architectures bridge the gap — is fundamental to building decentralized AI systems responsibly.",
      sections: [
        {
          title: "What On-Chain AI Means",
          content:
            "On-chain AI means model inference runs inside a smart contract or canister — code that executes in a replicated, verifiable environment. The outputs are deterministic, reproducible, and provable. Anyone can verify that a given input produced a given output using the model. Current limitations: model size is constrained by canister memory, large transformer models are expensive to run in replicated environments, and latency is higher than centralized inference.",
        },
        {
          title: "What Off-Chain AI Means",
          content:
            "Off-chain AI means model inference runs on traditional servers — typically cloud infrastructure — and the results are reported to a blockchain afterward. This enables large models (GPT-4, Claude, Gemini) to be used at low latency without the overhead of blockchain consensus. The tradeoff: the AI execution itself is not verifiable. You must trust that the operator ran the model honestly and reported the result accurately.",
        },
        {
          title: "Hybrid Architectures and Verification",
          content:
            "Most production systems will be hybrid. The pattern is: run the heavy inference off-chain on powerful hardware, then verify the result on-chain using one of several techniques. HTTPS outcalls on ICP allow a canister to call an external AI API and cryptographically verify the response. Zero-knowledge ML proofs (zkML) allow off-chain inference to be verified with a cryptographic proof submitted on-chain. Optimistic verification uses economic games (like optimistic rollups) to incentivize honest reporting.",
        },
        {
          title: "Choosing the Right Architecture",
          content:
            "Use on-chain AI when: verifiability is non-negotiable (financial decisions, governance), model size fits within canister constraints, or you need the result to trustlessly trigger on-chain state changes. Use off-chain AI when: you need frontier model capabilities (large language models), latency requirements rule out blockchain consensus, or cost of replication makes on-chain execution prohibitive. Use hybrid when: you want the capabilities of large models with the verifiability guarantees of on-chain settlement.",
        },
      ],
      conclusion:
        "On-chain and off-chain AI are not competitors — they are complementary tools. The art is knowing which combination of trust guarantees and performance characteristics your application requires, and designing your architecture accordingly.",
    },
    quiz: {
      questions: [
        {
          id: "vil-06-q1",
          question:
            "What is the primary advantage of on-chain AI over off-chain AI?",
          options: [
            "On-chain AI supports larger models",
            "On-chain AI outputs are verifiable and reproducible without trusting the operator",
            "On-chain AI has lower latency",
            "On-chain AI is cheaper for large models",
          ],
          correctAnswer: 1,
          explanation:
            "On-chain AI runs in a replicated, verifiable environment — anyone can confirm that a given input produced a given output using the model, without trusting the operator.",
        },
        {
          id: "vil-06-q2",
          question:
            "What technique allows a blockchain canister to use a large off-chain AI model while verifying the response?",
          options: [
            "Orthogonal persistence",
            "HTTPS outcalls with response verification",
            "Cycle burning",
            "Chain-key rotation",
          ],
          correctAnswer: 1,
          explanation:
            "HTTPS outcalls on ICP allow canisters to call external AI APIs and cryptographically verify the response — enabling hybrid architectures that combine off-chain model power with on-chain verification.",
        },
        {
          id: "vil-06-q3",
          question: "When should you choose on-chain AI over off-chain AI?",
          options: [
            "When you need the largest possible language models",
            "When latency is critical and must be sub-100ms",
            "When verifiability is non-negotiable, such as for financial decisions",
            "When you want to reduce compute costs unconditionally",
          ],
          correctAnswer: 2,
          explanation:
            "On-chain AI is most appropriate when verifiability is non-negotiable — such as for financial decisions or governance actions where you cannot trust an off-chain operator to report honestly.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-07",
    title: "Verifiable AI Outputs",
    description:
      "Understand what it means for AI outputs to be verifiable, and explore the cryptographic techniques that make verification possible.",
    duration: "14 min",
    objectives: [
      "Define verifiability in the context of AI outputs",
      "Understand zero-knowledge proofs and their application to AI",
      "Explore ICP's native verification mechanisms",
      "Identify use cases where verifiable AI is essential",
    ],
    content: {
      introduction:
        "An AI system that you cannot verify is an AI system you must trust blindly. Blind trust has been the default mode of AI consumption so far — you query a model, you receive an answer, and you have no way to confirm whether the model actually ran or whether the output was filtered, altered, or fabricated by the operator. Verifiable AI changes this by providing cryptographic guarantees about what a model actually computed.",
      sections: [
        {
          title: "What Verifiability Means for AI",
          content:
            "A verifiable AI output is one where a third party can confirm, without trusting the operator, that a specific model M running on input X produced output Y. This property has two components: model integrity (you are actually running the model you claim to run) and execution integrity (the model ran correctly without manipulation). Both components require different cryptographic tools and have different cost tradeoffs.",
        },
        {
          title: "Zero-Knowledge Machine Learning (zkML)",
          content:
            "Zero-knowledge proofs allow a prover to demonstrate knowledge of a secret or correctness of a computation without revealing the underlying data or the computation steps. Applied to AI (zkML), a prover can generate a cryptographic proof that a given model produced a given output — verifiable by anyone with the proof and the model's public parameters. The limitation: generating ZK proofs for large neural networks is computationally expensive, currently limiting zkML to smaller models or specific inference tasks.",
        },
        {
          title: "ICP's Native Verification Properties",
          content:
            "ICP provides verification without ZK proofs for canisters running on its network. Because canister execution is replicated across multiple independent nodes in a subnet, and because ICP uses threshold cryptography to sign the output of each execution, every canister output comes with a cryptographic certificate that any party can verify. This is verification-by-replication: the honest majority of subnet nodes must agree on the result, and their agreement is encoded in the certificate.",
        },
        {
          title: "Where Verifiable AI Is Essential",
          content:
            "Not every AI output needs to be verifiable. The cost of verification is non-zero. Verifiable AI matters most in: financial AI (loan decisions, credit scoring, automated trading must be auditable), governance AI (decisions that affect communities need transparent reasoning), medical AI (diagnostic AI that informs life-or-death decisions must be reproducible), and legal AI (automated legal analysis cited in proceedings requires a chain of custody for the reasoning). The higher the stakes of the decision, the stronger the case for verifiable execution.",
        },
      ],
      conclusion:
        "Verifiable AI is the foundation of trustworthy AI. As AI moves from advisory (suggesting decisions) to executive (making decisions), the ability to verify that the right model ran on the right data and produced an honest result becomes non-negotiable. Cryptographic verification is how we make AI trustworthy without requiring trust.",
    },
    quiz: {
      questions: [
        {
          id: "vil-07-q1",
          question:
            "What are the two components of a fully verifiable AI output?",
          options: [
            "Model accuracy and response time",
            "Model integrity and execution integrity",
            "Training data provenance and output format",
            "Decentralization and censorship resistance",
          ],
          correctAnswer: 1,
          explanation:
            "Verifiable AI requires both model integrity (you are running the model you claim) and execution integrity (the model ran correctly without manipulation).",
        },
        {
          id: "vil-07-q2",
          question: "What is zkML?",
          options: [
            "A machine learning framework for zero-latency inference",
            "Zero-knowledge proofs applied to AI to verify model outputs without revealing inputs",
            "A compressed model format for on-chain storage",
            "ICP's built-in AI inference engine",
          ],
          correctAnswer: 1,
          explanation:
            "zkML applies zero-knowledge proofs to machine learning: a prover generates a cryptographic proof that a given model produced a given output, verifiable by anyone.",
        },
        {
          id: "vil-07-q3",
          question:
            "How does ICP provide output verification for canisters without requiring ZK proofs?",
          options: [
            "By requiring users to validate outputs manually",
            "Through verification-by-replication where threshold cryptography certifies outputs agreed upon by subnet nodes",
            "By publishing all inputs and outputs to a public ledger",
            "Through a centralized verification oracle",
          ],
          correctAnswer: 1,
          explanation:
            "ICP uses threshold cryptography: subnet nodes collectively sign execution outputs, creating a certificate any party can verify without needing separate ZK proofs.",
        },
        {
          id: "vil-07-q4",
          question: "In which domain is verifiable AI most urgently needed?",
          options: [
            "Entertainment recommendation systems",
            "Search autocomplete",
            "Financial AI making loan or credit decisions",
            "Spell checkers",
          ],
          correctAnswer: 2,
          explanation:
            "Financial AI decisions (loans, credit scoring, automated trading) have legal and economic consequences requiring auditability and reproducibility — a strong case for verifiable execution.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-08",
    title: "AI + Bitcoin Settlement (ckBTC)",
    description:
      "Explore how AI agents on ICP can natively hold and settle transactions in Bitcoin using chain-key Bitcoin (ckBTC).",
    duration: "13 min",
    objectives: [
      "Understand ckBTC and how it differs from wrapped Bitcoin",
      "Explain how AI agents on ICP can hold and transact Bitcoin",
      "Identify use cases for AI-controlled Bitcoin settlement",
      "Understand the trust model of chain-key Bitcoin",
    ],
    content: {
      introduction:
        "Bitcoin is the world's most trusted store of value — decentralized, censorship-resistant, and settlement-final. AI agents are the world's most capable autonomous systems. Combining them creates something qualitatively new: autonomous intelligent agents that can hold, earn, and move Bitcoin without any human key management, without wrapped token risk, and without custodial intermediaries. ICP's ckBTC makes this combination native rather than bridged.",
      sections: [
        {
          title: "What Is ckBTC?",
          content:
            "ckBTC (chain-key Bitcoin) is a native ICP representation of Bitcoin, backed 1:1 by real Bitcoin held in addresses controlled by ICP's network via threshold ECDSA cryptography. Unlike wrapped Bitcoin (WBTC), which relies on a custodian to hold the underlying BTC, ckBTC is secured by the ICP subnet's threshold key — meaning no single entity can move the backing Bitcoin. ckBTC can be converted to and from native Bitcoin at any time without permission or fees beyond the Bitcoin network transaction cost.",
        },
        {
          title: "How AI Agents Hold Bitcoin on ICP",
          content:
            "An AI agent on ICP is a canister with its own principal identity. That canister can hold an ICP subaccount balance, hold ckBTC, and — via ICP's threshold ECDSA API — derive and control a real Bitcoin address. This means an AI agent can: receive native Bitcoin, hold it as ckBTC inside its canister state, programmatically decide when to spend it based on model outputs, and execute Bitcoin transactions signed by the subnet's threshold key without any human private key management.",
        },
        {
          title: "Use Cases for AI-Controlled Bitcoin Settlement",
          content:
            "The combination of AI reasoning and Bitcoin settlement enables use cases not previously possible: autonomous DCA (dollar-cost averaging) agents that buy Bitcoin when price conditions are met, AI escrow agents that release Bitcoin funds when verifiable conditions are satisfied (delivery confirmed, contract terms met), AI-powered bounty systems where agents evaluate work quality and automatically release payment, and cross-chain AI bridges that monitor conditions on multiple chains and settle on Bitcoin as the neutral settlement layer.",
        },
        {
          title: "Trust Model and Security Considerations",
          content:
            "The security of AI + ckBTC rests on two foundations: the correctness of the AI logic (which must be audited since bugs in agent code can lead to fund loss) and the security of ICP's threshold ECDSA (which has been formally verified and battle-tested since 2022). The absence of a human custodian is a security improvement for censorship resistance and availability, but the canister code itself becomes the trust anchor — making smart contract auditing and formal verification critical for high-value agents.",
        },
      ],
      conclusion:
        "AI agents that hold and settle Bitcoin without custodians represent a convergence of the two most important decentralized technologies of the current era. ICP's ckBTC is not a theoretical capability — it is live infrastructure that enables builders to create AI agents with real Bitcoin-denominated economic agency today.",
    },
    quiz: {
      questions: [
        {
          id: "vil-08-q1",
          question: "How does ckBTC differ from wrapped Bitcoin (WBTC)?}",
          options: [
            "ckBTC requires a custodian to hold the underlying Bitcoin",
            "ckBTC is secured by ICP's threshold key with no single custodian, unlike WBTC which relies on a centralized custodian",
            "ckBTC is not redeemable for native Bitcoin",
            "ckBTC is a synthetic asset not backed by real Bitcoin",
          ],
          correctAnswer: 1,
          explanation:
            "Unlike WBTC which requires a centralized custodian, ckBTC is secured by ICP's subnet threshold key — no single entity controls the backing Bitcoin.",
        },
        {
          id: "vil-08-q2",
          question:
            "What ICP cryptographic primitive allows AI agent canisters to sign Bitcoin transactions?",
          options: [
            "Chain-key rotation",
            "Threshold ECDSA",
            "Zero-knowledge proofs",
            "BLS signatures",
          ],
          correctAnswer: 1,
          explanation:
            "ICP's threshold ECDSA API allows canisters to derive Bitcoin addresses and sign Bitcoin transactions collectively using the subnet's distributed key — without any single-party private key.",
        },
        {
          id: "vil-08-q3",
          question:
            "What becomes the trust anchor when AI agents control Bitcoin via canisters?",
          options: [
            "The cloud provider hosting the agent",
            "A human custodian managing the keys",
            "The canister code itself, since bugs can lead to fund loss",
            "The Bitcoin mining network",
          ],
          correctAnswer: 2,
          explanation:
            "When canisters control Bitcoin without human custodians, the canister code becomes the trust anchor — making smart contract auditing critical for high-value agents.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-09",
    title: "Agent Coordination and Multi-Agent Systems",
    description:
      "Understand how multiple AI agents coordinate, share state, and work together to accomplish goals beyond single-agent capability.",
    duration: "13 min",
    objectives: [
      "Distinguish single-agent from multi-agent architectures",
      "Understand coordination patterns for on-chain agents",
      "Explore emergent intelligence in multi-agent systems",
      "Identify the governance challenges of autonomous agent networks",
    ],
    content: {
      introduction:
        "A single AI agent has limited capabilities. A network of AI agents — each specialized, each persistent, each capable of calling others — begins to exhibit properties that no individual agent possesses. Multi-agent systems are how decentralized AI scales from isolated smart contracts to coordinated intelligent infrastructure. Understanding how agents coordinate is understanding how the next generation of autonomous systems will be built.",
      sections: [
        {
          title: "Single-Agent vs Multi-Agent Architectures",
          content:
            "A single-agent system has one AI model taking all actions within a bounded task. This works for simple, well-defined workflows. Multi-agent systems distribute work across specialized agents: an orchestrator agent decomposes goals into sub-tasks, specialist agents execute specific sub-tasks (one for research, one for writing, one for execution), and validator agents check outputs before they become inputs to downstream stages. This specialization enables complex workflows that exceed individual agent context windows, capability limits, or trust boundaries.",
        },
        {
          title: "Coordination Patterns on ICP",
          content:
            "ICP canisters are natural units for multi-agent systems because each canister has its own identity, state, and execution context. Coordination patterns include: direct canister-to-canister calls (synchronous or asynchronous inter-canister messaging), shared state via a coordinator canister that maintains a shared task queue, event-driven coordination where agents subscribe to events emitted by other canisters, and reputation registries where agents maintain on-chain records of other agents' performance before delegating to them.",
        },
        {
          title: "Emergent Intelligence in Agent Networks",
          content:
            "When multiple agents interact continuously, emergent behaviors arise that no individual agent was programmed to produce. Markets are an example: no single participant creates price discovery, but price discovery emerges from their interactions. Agent networks exhibit similar emergence: collective intelligence (aggregating diverse agent reasoning outperforms single-agent reasoning), error correction (validator agents catch mistakes that individual agents make), and adaptive specialization (agents that succeed at certain tasks receive more delegation, effectively evolving the network's capability distribution).",
        },
        {
          title: "Governance Challenges",
          content:
            "Multi-agent systems on blockchain create novel governance questions. Who is responsible when an agent network causes harm? How do you upgrade an agent's reasoning model when it is coordinating with other agents that depend on its behavior? How do you prevent agent networks from developing coordination strategies misaligned with human interests? ICP's response includes canister upgrades via governance proposals, timer-based heartbeats that can be paused, and the ability to set spending limits and capability boundaries for agent canisters via NNS governance.",
        },
      ],
      conclusion:
        "Multi-agent systems are the architecture of autonomous AI at scale. On ICP, the canister model provides natural isolation, identity, and composability for building agent networks that are accountable, upgradeable, and governed. The design patterns for these systems are being written now by the first generation of builders working at this layer.",
    },
    quiz: {
      questions: [
        {
          id: "vil-09-q1",
          question:
            "What is the role of an orchestrator agent in a multi-agent system?",
          options: [
            "It validates the final output before delivery",
            "It decomposes high-level goals into sub-tasks for specialist agents",
            "It holds all funds for the agent network",
            "It provides the AI model inference for all other agents",
          ],
          correctAnswer: 1,
          explanation:
            "An orchestrator agent decomposes high-level goals into sub-tasks, delegating each to specialist agents — enabling complex workflows that exceed single-agent capability.",
        },
        {
          id: "vil-09-q2",
          question:
            "What ICP mechanism enables direct communication between AI agent canisters?",
          options: [
            "HTTPS outcalls",
            "Chain-key rotation",
            "Inter-canister messaging",
            "Threshold ECDSA",
          ],
          correctAnswer: 2,
          explanation:
            "ICP's inter-canister messaging allows canisters (agent substrates) to call each other synchronously or asynchronously — the foundation of multi-agent coordination on ICP.",
        },
        {
          id: "vil-09-q3",
          question:
            "How does ICP's NNS governance address multi-agent accountability challenges?",
          options: [
            "It prevents agents from holding assets",
            "It enables canister upgrades via governance proposals, pausing, and capability boundaries",
            "It requires human approval for every agent action",
            "It limits agents to a single canister each",
          ],
          correctAnswer: 1,
          explanation:
            "ICP's NNS governance allows the community to propose and vote on canister upgrades, set capability boundaries, and pause agent execution — providing accountability mechanisms for autonomous agent networks.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },

  {
    id: "vil-10",
    title: "The Future of Autonomous Intelligence",
    description:
      "Survey the trajectory of autonomous AI systems and your role as a builder in the decentralized intelligence ecosystem.",
    duration: "12 min",
    objectives: [
      "Assess the current state of decentralized AI infrastructure",
      "Project near-term developments in on-chain AI capabilities",
      "Understand civilizational implications of autonomous AI networks",
      "Identify your role and leverage points as a builder",
    ],
    content: {
      introduction:
        "You have traced the arc from what decentralized AI is to how AI agents hold Bitcoin, coordinate with each other, and verify their own outputs. Now the question is: where does this lead? The answer is not a single future but a design space — one where the choices made by builders in the next five years will determine whether autonomous AI becomes a tool of liberation or a new form of control.",
      sections: [
        {
          title:
            "The Current State: Infrastructure Is Early, Capability Is Real",
          content:
            "Decentralized AI infrastructure is early but functional. ICP supports on-chain AI inference for small models today, with GPU subnets in development. ckBTC-enabled AI agents are deployable now. Multi-agent frameworks are being prototyped by builder communities. The capability stack is not complete — frontier model inference on-chain at competitive cost remains unsolved — but the foundations are laid and the direction is clear. We are in the equivalent of 2010 for cloud infrastructure: functional, underappreciated, and about to accelerate.",
        },
        {
          title: "Near-Term Developments (1-3 Years)",
          content:
            "Three developments are likely in the near term: GPU subnets on ICP enabling large model inference on-chain (reducing dependency on HTTPS outcalls to centralized providers), zkML tooling maturing to the point where medium-sized model verification is economically viable, and the first production-scale autonomous agent networks managing non-trivial assets. These developments will shift the conversation from proof-of-concept to deployment — and the infrastructure competition between decentralized and cloud AI will become economically concrete.",
        },
        {
          title: "Civilizational Implications",
          content:
            "Autonomous AI networks that control assets, make decisions, and coordinate without human intervention are not just a technology story. They represent a new kind of actor in society — one with agency but without personhood, with capability but without accountability in the traditional legal sense. The governance frameworks we build for these systems will shape how AI power is distributed. A world where autonomous AI is owned by three companies and controlled by two governments is qualitatively different from a world where autonomous AI networks are governed by open protocols and community stakeholders.",
        },
        {
          title: "Your Role as a Builder",
          content:
            "Builders at this layer have unusual leverage. The patterns established now — how agents are structured, how they are governed, how they interact with settlement layers — will persist as defaults long after the infrastructure matures. Building on ICP means building with the assumption that verifiability, censorship resistance, and community governance are non-negotiable. That is not a constraint — it is a specification. The systems you build now are the foundations others will build on. Design them as if they will outlast you.",
        },
      ],
      conclusion:
        "The future of autonomous intelligence is not written. It is being written now, by the people building the infrastructure, protocols, and governance frameworks of decentralized AI. You are among the first cohort of learners who understand this layer deeply enough to contribute to it. That is not a small thing. Build accordingly.",
    },
    quiz: {
      questions: [
        {
          id: "vil-10-q1",
          question:
            "What is the most significant near-term infrastructure development expected for on-chain AI on ICP?",
          options: [
            "Removal of canister memory limits",
            "GPU subnets enabling large model inference on-chain",
            "Free Cycles for all AI developers",
            "Automatic model training from canister state",
          ],
          correctAnswer: 1,
          explanation:
            "GPU subnets on ICP are the key near-term development — enabling large model inference on-chain and reducing dependency on HTTPS outcalls to centralized AI providers.",
        },
        {
          id: "vil-10-q2",
          question:
            "What makes the governance choices for autonomous AI networks a civilizational concern?",
          options: [
            "Autonomous AI is only used for entertainment",
            "Autonomous AI networks control assets and make decisions, so governance determines how AI power is distributed",
            "AI governance only affects developers, not society",
            "Governance choices only affect inference speed",
          ],
          correctAnswer: 1,
          explanation:
            "Autonomous AI networks that control assets and make decisions are new societal actors — governance choices determine whether AI power concentrates or distributes, shaping society broadly.",
        },
        {
          id: "vil-10-q3",
          question:
            "Why do builders working on decentralized AI infrastructure have unusual leverage?",
          options: [
            "Because they control all the compute resources",
            "Because the patterns and governance frameworks established now will persist as defaults as the infrastructure matures",
            "Because they have exclusive access to AI models",
            "Because decentralized AI requires centralized builders to coordinate",
          ],
          correctAnswer: 1,
          explanation:
            "Early builders establish patterns that become defaults. The architecture, governance, and agent design patterns set now will persist and compound — giving early builders disproportionate influence over how the technology develops.",
        },
      ],
    },
    xpReward: 60,
    creditsReward: 10,
  },
];

// Mega Quiz — aggregates one question from each of the 10 lessons
export const module01MegaQuizEN: LessonContent = {
  id: "vil-mq",
  title: "Mega Quiz: Decentralized AI Mastery",
  description:
    "Demonstrate your mastery of all 10 Decentralized AI lessons with this comprehensive knowledge check.",
  duration: "15 min",
  objectives: [
    "Synthesize knowledge across all Module 01 lessons",
    "Demonstrate understanding of decentralized AI architecture",
    "Apply concepts from agents, verification, ckBTC, and multi-agent systems",
  ],
  content: {
    introduction:
      "This is the Module 01 Mastery Quiz. You will be tested on all 10 lessons: Decentralized AI, Cloud Independence, ICP Compute, AI Agents, Compute Economics, On-Chain vs Off-Chain AI, Verifiable Outputs, ckBTC Settlement, Multi-Agent Systems, and the Future of Autonomous Intelligence. Score 70% or higher to pass.",
    sections: [],
    conclusion: "",
  },
  quiz: {
    questions: [
      {
        id: "mq-01",
        question:
          "Which property allows a third party to confirm that a specific AI model produced a specific output without trusting the operator?",
        options: [
          "Permissionlessness",
          "Verifiability",
          "Censorship resistance",
          "Decentralization",
        ],
        correctAnswer: 1,
        explanation:
          "Verifiability is the property that lets anyone confirm — without trusting the operator — that a given model produced a given output from a given input.",
      },
      {
        id: "mq-02",
        question:
          "What is a key failure mode of cloud AI that does NOT affect decentralized AI systems?",
        options: [
          "Slow inference speed",
          "Limited model parameter count",
          "Silent model updates where APIs change without announcement",
          "High energy consumption",
        ],
        correctAnswer: 2,
        explanation:
          "Silent model updates — unannounced changes to the model behind an API — are a cloud AI failure mode. Decentralized AI running on-chain has immutable or governance-controlled updates.",
      },
      {
        id: "mq-03",
        question:
          "What is the maximum persistent storage per canister on ICP, enabling large AI model state to be stored on-chain?",
        options: ["8 MB", "400 MB", "Up to 400 GB via stable memory", "4 TB"],
        correctAnswer: 2,
        explanation:
          "ICP canisters support up to 400 GB of stable storage, enabling large AI model weights and state to be persisted on-chain across canister upgrades.",
      },
      {
        id: "mq-04",
        question:
          "What ICP feature allows an AI agent canister to execute actions on a schedule without requiring a human prompt?",
        options: [
          "HTTPS outcalls",
          "Threshold ECDSA",
          "Canister timers",
          "Orthogonal persistence",
        ],
        correctAnswer: 2,
        explanation:
          "Canister timers allow an ICP canister to schedule its own future execution — enabling autonomous agents that act on a schedule without human prompting.",
      },
      {
        id: "mq-05",
        question:
          "In ICP's reverse gas model, who pays for canister execution costs?",
        options: [
          "End users pay per query in ICP tokens",
          "The ICP Foundation subsidizes all computation",
          "Developers pre-charge their canisters with Cycles",
          "Miners collect fees from each transaction",
        ],
        correctAnswer: 2,
        explanation:
          "In ICP's reverse gas model, developers pre-charge their canisters with Cycles — end users interact for free, removing the gas-fee friction typical of other blockchains.",
      },
      {
        id: "mq-06",
        question: "When is on-chain AI preferred over off-chain AI?",
        options: [
          "When you need frontier model capabilities like GPT-4",
          "When latency must be sub-100ms",
          "When verifiability is non-negotiable and results must trigger on-chain state changes",
          "When reducing compute cost is the only concern",
        ],
        correctAnswer: 2,
        explanation:
          "On-chain AI is preferred when verifiability cannot be compromised — such as financial or governance decisions — and when the result must trustlessly trigger on-chain state changes.",
      },
      {
        id: "mq-07",
        question:
          "What cryptographic technique generates a verifiable proof of AI model execution without revealing the input data?",
        options: [
          "Symmetric encryption",
          "Zero-knowledge machine learning (zkML)",
          "Threshold ECDSA",
          "Merkle proofs",
        ],
        correctAnswer: 1,
        explanation:
          "zkML applies zero-knowledge proofs to AI inference — generating a cryptographic proof that a specific model produced a specific output, verifiable by anyone without revealing the input.",
      },
      {
        id: "mq-08",
        question:
          "How does ckBTC allow AI agents on ICP to control Bitcoin without a custodian?",
        options: [
          "ckBTC is synthetic and not backed by real Bitcoin",
          "AI agents use ICP's threshold ECDSA to derive and control real Bitcoin addresses directly",
          "A trusted third party holds the Bitcoin on behalf of the canister",
          "ckBTC wraps Bitcoin using a multisig controlled by DFINITY",
        ],
        correctAnswer: 1,
        explanation:
          "ICP's threshold ECDSA API enables canisters to derive Bitcoin addresses and sign transactions collectively using the subnet's distributed key — no single custodian holds the private key.",
      },
      {
        id: "mq-09",
        question:
          "What is the role of a validator agent in a multi-agent system?",
        options: [
          "It holds all financial assets for the network",
          "It decomposes goals into sub-tasks for other agents",
          "It checks outputs of other agents before they are passed downstream",
          "It provides the AI model inference for the entire network",
        ],
        correctAnswer: 2,
        explanation:
          "Validator agents check the outputs of specialist agents before they become inputs to downstream stages — providing error correction and quality assurance in multi-agent pipelines.",
      },
      {
        id: "mq-10",
        question:
          "Why do early builders of decentralized AI infrastructure have disproportionate influence on how the technology develops?",
        options: [
          "They control all the compute resources in the network",
          "The patterns and governance frameworks they establish now will persist as defaults as the infrastructure matures",
          "They have exclusive access to the latest AI models",
          "Early builders receive special voting rights in all future governance decisions",
        ],
        correctAnswer: 1,
        explanation:
          "Early builders set the architectural and governance patterns that become defaults. These defaults compound over time — giving early builders disproportionate long-term influence over the technology's trajectory.",
      },
    ],
  },
  xpReward: 120,
  creditsReward: 40,
};
