import ChainKeyNodeNetworkBackground from "@/components/ChainKeyNodeNetworkBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Lock,
  Network,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

export default function ChainKeyCryptographyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !hash.includes("caffeineAdminToken") && !hash.includes("=")) {
      setTimeout(() => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } catch {
          // invalid selector — ignore
        }
      }, 100);
    }
  }, []);

  const scrollToLearn = () => {
    const element = document.getElementById("learn-more");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Strong Contrast */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <ChainKeyNodeNetworkBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/50">
              <span className="text-cyan-300 font-semibold text-sm">
                The Future of Cryptography
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
              Chain Key Cryptography
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground font-medium leading-relaxed">
              The revolutionary cryptographic framework powering the Internet
              Computer Protocol
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToLearn}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-glow-md text-lg px-8 py-6"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/world1" })}
                className="border-2 border-cyan-500/50 hover:bg-cyan-500/10 text-foreground font-semibold text-lg px-8 py-6"
              >
                Explore Bonus World
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Chain Key Section */}
      <section id="learn-more" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center text-foreground">
              What is Chain Key Cryptography?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                Chain Key Cryptography is a suite of advanced cryptographic
                protocols that enable the Internet Computer to achieve
                unprecedented capabilities in blockchain technology. It's the
                foundation that allows ICP to operate at web speed, scale
                infinitely, and interact seamlessly with other blockchains.
              </p>
              <p className="text-lg leading-relaxed text-foreground">
                Unlike traditional blockchain systems that require every node to
                validate every transaction, Chain Key technology allows any
                device to verify the authenticity of ICP artifacts using a
                single permanent public key. This breakthrough eliminates the
                need for syncing with the entire blockchain history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-foreground">
            Core Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Threshold Signatures",
                description:
                  "Distributed key generation ensures no single point of failure while maintaining cryptographic security.",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: <Network className="h-8 w-8" />,
                title: "Subnet Architecture",
                description:
                  "Independent subnets operate in parallel, each secured by Chain Key cryptography for infinite scalability.",
                gradient: "from-blue-500 to-purple-600",
              },
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Non-Interactive DKG",
                description:
                  "Advanced distributed key generation protocol enables secure key sharing without interactive rounds.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Web Speed Finality",
                description:
                  "Transactions achieve finality in 1-2 seconds, enabling true web-speed blockchain applications.",
                gradient: "from-amber-500 to-orange-600",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Chain Key Signatures",
                description:
                  "Direct integration with Bitcoin, Ethereum, and other chains without bridges or wrapped tokens.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Permanent Public Key",
                description:
                  "Single public key verifies all ICP artifacts, simplifying validation and improving user experience.",
                gradient: "from-rose-500 to-red-600",
              },
            ].map((feature, index) => (
              <Card
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
                key={index}
                className="surface-elevated border-primary/20 hover:border-primary/40 transition-all"
              >
                <CardContent className="pt-6">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Threshold Cryptography Explained */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-foreground">
              How Threshold Signatures Work
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="/assets/generated/chainkey-infographic-threshold-v4.dim_1600x900.png"
                  alt="Threshold Signature Visualization"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
              <div className="space-y-4">
                <p className="text-lg text-foreground leading-relaxed">
                  Threshold cryptography distributes a private key across
                  multiple nodes, requiring only a threshold number of nodes to
                  cooperate to create a valid signature.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  This approach eliminates single points of failure while
                  maintaining the security guarantees of traditional
                  cryptography. Even if some nodes are compromised, the system
                  remains secure as long as the threshold is not breached.
                </p>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <Shield className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <p className="text-foreground font-medium">
                    ICP uses a 2/3 threshold: at least 2/3 of subnet nodes must
                    participate to produce a valid signature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chain Key vs Traditional Bridges */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-foreground">
              Chain Key vs. Traditional Bridges
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <p className="text-lg text-foreground leading-relaxed">
                  Traditional blockchain bridges rely on trusted intermediaries
                  or multi-signature wallets, creating security vulnerabilities
                  and single points of failure.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  Chain Key Signatures enable ICP canisters to directly hold and
                  transact with native Bitcoin, Ethereum, and other assets
                  without bridges, wrapped tokens, or trusted third parties.
                </p>
                <div className="space-y-3">
                  {[
                    "No wrapped tokens or synthetic assets",
                    "No trusted intermediaries or oracles",
                    "Direct on-chain integration",
                    "Cryptographically secure by design",
                  ].map((benefit, index) => (
                    <div // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="/assets/generated/chainkey-infographic-bridges-vs-ck-v3.dim_1600x900.png"
                  alt="Chain Key vs Bridges Comparison"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subnet Signing Architecture */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-foreground">
              Subnet Signing Architecture
            </h2>
            <div className="mb-8">
              <img
                src="/assets/generated/chainkey-infographic-subnet-sign.dim_1600x900.png"
                alt="Subnet Signing Process"
                className="rounded-lg shadow-2xl w-full mx-auto"
              />
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Each subnet on the Internet Computer operates independently with
                its own threshold signature scheme. When a subnet needs to sign
                a message or transaction, the nodes collaborate using the
                threshold protocol to produce a single, verifiable signature.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                This architecture enables horizontal scaling: as more subnets
                are added, the network's capacity grows linearly without
                compromising security or decentralization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-foreground">
              Chain Key Evolution
            </h2>
            <div className="mb-8">
              <img
                src="/assets/generated/chainkey-infographic-timeline.dim_1600x500.png"
                alt="Chain Key Technology Timeline"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <Card className="surface-elevated border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    2021: Genesis Launch
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Internet Computer launches with Chain Key technology as its
                    foundational cryptographic layer, enabling web-speed
                    consensus and infinite scalability.
                  </p>
                </CardContent>
              </Card>
              <Card className="surface-elevated border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    2022: Bitcoin Integration
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Chain Key Signatures enable direct Bitcoin integration,
                    allowing ICP smart contracts to hold and transact native BTC
                    without bridges.
                  </p>
                </CardContent>
              </Card>
              <Card className="surface-elevated border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    2023-2024: Multi-Chain Expansion
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Ethereum integration and additional chain integrations
                    expand ICP's multi-chain capabilities, positioning it as the
                    universal settlement layer.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Card className="surface-elevated border-primary/30 shadow-glow-lg">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6">
                  <Globe className="h-8 w-8 text-cyan-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Unlock hidden worlds
                </h2>
                <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Dive deeper into the cryptographic foundations that power the
                  next generation of decentralized applications and multi-chain
                  integration.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate({ to: "/courses" })}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-glow-md text-lg px-10 py-6"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Ready to go deeper?{" "}
            <button
              type="button"
              onClick={() => navigate({ to: "/courses" })}
              className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
            >
              Explore the Worlds
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
