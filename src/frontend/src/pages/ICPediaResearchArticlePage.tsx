import LazyYouTubeEmbed from "@/components/LazyYouTubeEmbed";
import TipTheDev from "@/components/TipTheDev";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { researchPapers } from "@/lib/researchData";
import { updatePageMetadata } from "@/lib/seo";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ChevronRight, ExternalLink } from "lucide-react";

const YT_CHANNEL = "https://www.youtube.com/@justinjackbear";

export default function ICPediaResearchArticlePage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const navigate = useNavigate();

  const paper = researchPapers.find((p) => p.slug === slug);

  if (!paper) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-muted-foreground text-lg">
          Research paper not found.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/icpedia" })}
          data-ocid="research.back_button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to ICPedia
        </Button>
      </div>
    );
  }

  updatePageMetadata({
    title: `${paper.title} | ICPEDIA Research | JackBear.ai`,
    description: paper.description,
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-10"
          aria-label="breadcrumb"
          data-ocid="research.breadcrumb"
        >
          <button
            type="button"
            className="hover:text-foreground transition-colors"
            onClick={() => navigate({ to: "/icpedia" })}
          >
            ICPedia
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <button
            type="button"
            className="hover:text-foreground transition-colors"
            onClick={() =>
              navigate({ to: "/icpedia", search: { tab: "research" } } as never)
            }
          >
            Research
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {paper.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">
              Research Paper
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            {paper.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-5">{paper.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        {/* Video section with narrative context */}
        {paper.videoId && (
          <div className="mb-10" data-ocid="research.video.section">
            {/* Intro block — above video */}
            <div className="mb-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                AI Doesn&apos;t Trust You
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                AI doesn&apos;t choose based on brand, narrative, or community.
                It chooses based on efficiency.
              </p>
              <ul className="space-y-1.5">
                {[
                  "cheapest compute",
                  "fastest execution",
                  "highest uptime",
                  "lowest trust dependency",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm tracking-wide text-foreground/80"
                  >
                    <span className="text-primary mr-2">&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video embed */}
            <LazyYouTubeEmbed
              videoId={paper.videoId}
              title={`${paper.title} — Video Explainer`}
              className="w-full rounded-xl shadow-lg"
            />

            {/* Architecture section — below video */}
            <div className="mt-10 space-y-6">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                The Emerging Architecture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bitcoin block */}
                <div className="border border-border rounded-lg p-5 space-y-3">
                  <p className="font-mono text-sm font-semibold tracking-wide text-foreground">
                    Bitcoin &rarr; Settlement Layer
                  </p>
                  <ul className="space-y-1.5">
                    {["censorship-resistant", "neutral", "always-on"].map(
                      (item) => (
                        <li
                          key={item}
                          className="font-mono text-xs tracking-wide text-muted-foreground"
                        >
                          <span className="text-foreground/40 mr-2">
                            &mdash;
                          </span>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* ICP block */}
                <div className="border border-border rounded-lg p-5 space-y-3">
                  <p className="font-mono text-sm font-semibold tracking-wide text-foreground">
                    Internet Computer (ICP) &rarr; Compute Layer
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "low-cost execution",
                      "full-stack on-chain apps",
                      "verifiable logic",
                    ].map((item) => (
                      <li
                        key={item}
                        className="font-mono text-xs tracking-wide text-muted-foreground"
                      >
                        <span className="text-foreground/40 mr-2">&mdash;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing statement */}
            <div className="mt-10 space-y-3 border-l-2 border-primary/30 pl-5">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                This Isn&apos;t Hype
              </h2>
              <p className="text-base font-semibold text-foreground/90">
                This is systems design.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                As AI begins to write code, deploy systems, and optimize itself,
                it will converge toward the most efficient infrastructure
                available.
              </p>
            </div>

            {/* Video-section CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                onClick={() => navigate({ to: "/intelligence" })}
                data-ocid="research.video_continue_button"
              >
                Continue Learning
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: "/icpedia/research" })}
                data-ocid="research.video_explore_button"
              >
                Explore More Research
              </Button>
            </div>
          </div>
        )}

        <Separator className="mb-10" />

        {/* Content Sections */}
        <article className="space-y-10" data-ocid="research.article">
          {paper.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {section.body}
              </p>
            </section>
          ))}
        </article>

        <Separator className="my-12" />

        {/* Footer */}
        <footer className="space-y-5">
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/icpedia" })}
              data-ocid="research.back_button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to ICPedia
            </Button>
            <Button
              variant="default"
              onClick={() => navigate({ to: "/intelligence" })}
              data-ocid="research.continue_button"
            >
              Continue Learning &rarr;
            </Button>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full sm:w-auto"
              onClick={() =>
                window.open(YT_CHANNEL, "_blank", "noopener,noreferrer")
              }
              data-ocid="research.subscribe_button"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Subscribe for more research
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              onClick={() => navigate({ to: "/icpedia/research" })}
              data-ocid="research.come_back_link"
            >
              Come back for more research soon &rarr;
            </button>
          </div>

          {/* Tip the Dev */}
          <div className="pt-1">
            <TipTheDev />
          </div>
        </footer>
      </div>
    </div>
  );
}
