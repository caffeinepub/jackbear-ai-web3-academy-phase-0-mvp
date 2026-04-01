import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { researchPapers } from "@/lib/researchData";
import { updatePageMetadata } from "@/lib/seo";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ChevronRight, Download } from "lucide-react";

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
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open(paper.pdfPath, "_blank", "noopener")}
                data-ocid="research.download_button"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </header>

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

        {/* Footer CTAs */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
            Continue Learning →
          </Button>
        </footer>
      </div>
    </div>
  );
}
