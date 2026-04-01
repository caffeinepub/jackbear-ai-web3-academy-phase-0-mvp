import LazyYouTubeEmbed from "@/components/LazyYouTubeEmbed";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { extractVideoId } from "@/lib/youtube";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Coffee,
  Database,
  Globe,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { updatePageMetadata } from "../lib/seo";

export default function AboutCaffeineAIPage() {
  useEffect(() => {
    updatePageMetadata({
      title: "About Caffeine.ai | AI-Powered Full-Stack Builder",
      description:
        "Caffeine.ai is an AI-powered full-stack builder that turns structured prompts into live, blockchain-deployed applications. Describe the app. The AI builds it. Deploy instantly.",
      language: "en",
    });
  }, []);

  const videoUrl = "https://youtu.be/EC-sBqhAFJM";
  const videoId = extractVideoId(videoUrl);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(48,100%,50%)]/10 via-[hsl(48,100%,50%)]/5 to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[hsl(48,100%,50%)]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[hsl(48,100%,50%)]/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(48,100%,50%)]/10 border border-[hsl(48,100%,50%)]/30">
              <Coffee className="h-5 w-5 text-[hsl(48,100%,50%)]" />
              <span className="text-sm font-semibold text-[hsl(48,100%,50%)]">
                AI-Powered Full-Stack Builder
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold">
              <span className="bg-gradient-to-r from-[hsl(48,100%,50%)] via-[hsl(48,100%,60%)] to-[hsl(48,100%,50%)] bg-clip-text text-transparent">
                Caffeine.ai
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-semibold text-foreground max-w-3xl mx-auto">
              Describe the app. The AI builds it. Deploy instantly.
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An AI-powered full-stack builder that turns structured prompts
              into live, blockchain-deployed applications.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="bg-[hsl(48,100%,50%)] hover:bg-[hsl(48,100%,55%)] text-black shadow-[0_0_20px_-4px_hsl(48,100%,50%)] hover:shadow-[0_0_32px_-6px_hsl(48,100%,50%)] transition-all"
              >
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "jackbear-ai")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Try Caffeine.ai
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/courses">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Explore JackBear Courses
                </Link>
              </Button>
            </div>

            {/* Video Embed */}
            {videoId && (
              <div className="pt-8">
                <div className="max-w-3xl mx-auto">
                  <div className="rounded-xl overflow-hidden border-2 border-[hsl(48,100%,50%)]/30 shadow-[0_0_24px_-8px_hsl(48,100%,50%)] hover:shadow-[0_0_32px_-6px_hsl(48,100%,50%)] transition-all">
                    <LazyYouTubeEmbed
                      videoId={videoId}
                      title="Caffeine.ai Introduction"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What It Actually Does */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                What It Actually Does
              </h2>
              <p className="text-lg text-muted-foreground">
                Caffeine takes natural language instructions and turns them
                into:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-[hsl(48,100%,50%)]/20 hover:border-[hsl(48,100%,50%)]/40 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(48,100%,50%)]/10 flex items-center justify-center">
                      <Code className="h-6 w-6 text-[hsl(48,100%,50%)]" />
                    </div>
                    <CardTitle>Functional Web Apps</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete, working applications with UI and backend logic
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[hsl(48,100%,50%)]/20 hover:border-[hsl(48,100%,50%)]/40 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(48,100%,50%)]/10 flex items-center justify-center">
                      <Database className="h-6 w-6 text-[hsl(48,100%,50%)]" />
                    </div>
                    <CardTitle>Database Structures</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Optimized data models and storage solutions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[hsl(48,100%,50%)]/20 hover:border-[hsl(48,100%,50%)]/40 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(48,100%,50%)]/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-[hsl(48,100%,50%)]" />
                    </div>
                    <CardTitle>Authentication Systems</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Secure user management and access control
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[hsl(48,100%,50%)]/20 hover:border-[hsl(48,100%,50%)]/40 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(48,100%,50%)]/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-[hsl(48,100%,50%)]" />
                    </div>
                    <CardTitle>Live Hosted Deployments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Often on ICP canisters, ready for production use
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* You Don't Need To */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                You Don't Need To
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Set up servers",
                "Configure cloud infrastructure",
                "Write boilerplate",
                "Manage DevOps",
              ].map((item, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                >
                  <CheckCircle2 className="h-5 w-5 text-[hsl(48,100%,50%)] flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <p className="text-xl font-semibold text-foreground">
                You describe the logic → it generates and deploys the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It's Powerful */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Why It's Powerful (Especially for You)
              </h2>
              <p className="text-lg text-muted-foreground">
                Given what you're building with JackBear.ai, Caffeine is
                powerful because it:
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-[hsl(48,100%,50%)]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[hsl(48,100%,50%)]" />
                    Ships ICP-native apps fast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Deploys directly to canisters and lets you iterate live
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[hsl(48,100%,50%)]/20">
                <CardHeader>
                  <CardTitle>Works well for:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "DAOs",
                      "Smart Cloud demos",
                      "AI agents",
                      "Secure storage platforms",
                      "Verifiable infrastructure tools",
                    ].map((item, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(48,100%,50%)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-[hsl(48,100%,50%)]/20">
                <CardHeader>
                  <CardTitle>You've already used it to:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Launch DAO demos",
                      "Build storage prototypes",
                      "Create Smart Cloud pilots",
                      "Spin up ICP-native test apps in days",
                    ].map((item, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[hsl(48,100%,50%)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Compares */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                How It Compares
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[hsl(48,100%,50%)]/30">
                    <th className="text-left p-4 font-display text-lg">
                      Traditional Dev
                    </th>
                    <th className="text-left p-4 font-display text-lg text-[hsl(48,100%,50%)]">
                      Caffeine
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-4 text-muted-foreground">
                      Weeks to prototype
                    </td>
                    <td className="p-4 font-semibold">Hours to prototype</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">
                      Dev + frontend + backend
                    </td>
                    <td className="p-4 font-semibold">Prompt-driven build</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">
                      AWS / centralized infra
                    </td>
                    <td className="p-4 font-semibold">ICP-native deployment</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">
                      Manual schema writing
                    </td>
                    <td className="p-4 font-semibold">
                      AI-generated structure
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* In Simple Terms */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                In Simple Terms
              </h2>
            </div>

            <Card className="border-2 border-[hsl(48,100%,50%)]/30 bg-gradient-to-br from-[hsl(48,100%,50%)]/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Caffeine.ai is:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-xl text-center font-semibold">
                  An AI-powered full-stack builder that turns structured prompts
                  into live, blockchain-deployed applications.
                </p>
                <div className="space-y-3 pt-4">
                  <p className="text-lg text-center font-medium">
                    It's not just a chatbot.
                  </p>
                  <p className="text-2xl text-center font-bold text-[hsl(48,100%,50%)]">
                    It's an execution engine for ideas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(48,100%,50%)]/10 via-transparent to-[hsl(48,100%,50%)]/5" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Ready to Build with Caffeine.ai?
            </h2>
            <p className="text-lg text-muted-foreground">
              Turn your ideas into deployed applications in hours, not weeks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[hsl(48,100%,50%)] hover:bg-[hsl(48,100%,55%)] text-black shadow-[0_0_20px_-4px_hsl(48,100%,50%)] hover:shadow-[0_0_32px_-6px_hsl(48,100%,50%)] transition-all"
              >
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "jackbear-ai")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="h-5 w-5 mr-2" />
                  Start Building
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/courses">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Back to JackBear Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
