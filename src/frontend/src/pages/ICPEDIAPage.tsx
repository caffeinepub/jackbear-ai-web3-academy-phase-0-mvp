import LazyYouTubeEmbed from "@/components/LazyYouTubeEmbed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { researchPapers } from "@/lib/researchData";
import { updatePageMetadata } from "@/lib/seo";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  Search,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";

const mockTopics = [
  {
    topicId: "1",
    title: "Internet Computer Protocol",
    summary: "A blockchain that runs at web speed with unbounded capacity.",
    category: "Core Concepts",
    tags: ["blockchain", "ICP", "web3"],
  },
  {
    topicId: "2",
    title: "Canisters",
    summary:
      "Smart contracts on the Internet Computer that can serve web content.",
    category: "Development",
    tags: ["smart-contracts", "canisters", "development"],
  },
  {
    topicId: "3",
    title: "Network Nervous System",
    summary: "The decentralized governance system of the Internet Computer.",
    category: "Governance",
    tags: ["governance", "NNS", "DAO"],
  },
];

const YT_CHANNEL = "https://www.youtube.com/@justinjackbear";

type Tab = "encyclopedia" | "research";

export default function ICPEDIAPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultTab: Tab = location.pathname.includes("/research")
    ? "research"
    : "encyclopedia";

  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname.includes("/research")) {
      setActiveTab("research");
    }
  }, [location.pathname]);

  updatePageMetadata({
    title: "ICPEDIA — Knowledge Hub | JackBear.ai",
    description:
      "Your comprehensive encyclopedia and research library for Web3 and Internet Computer knowledge.",
  });

  const categories = Array.from(new Set(mockTopics.map((t) => t.category)));

  const filteredTopics = mockTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPaper = researchPapers.find((p) => p.videoId);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ICPEDIA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive encyclopedia and research library for Web3 and
            Internet Computer knowledge
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl border border-border bg-muted/30 p-1 gap-1">
            <button
              type="button"
              data-ocid="icpedia.encyclopedia.tab"
              onClick={() => setActiveTab("encyclopedia")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "encyclopedia"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Encyclopedia
              </span>
            </button>
            <button
              type="button"
              data-ocid="icpedia.research.tab"
              onClick={() => setActiveTab("research")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "research"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Research
              </span>
            </button>
          </div>
        </div>

        {/* ENCYCLOPEDIA TAB */}
        {activeTab === "encyclopedia" && (
          <div>
            <div className="mb-8">
              <Card
                className="surface-elevated card-hover cursor-pointer border-dashed border-primary/30 hover:border-primary/60 transition-colors"
                onClick={() => navigate({ to: "/glossary" })}
              >
                <CardContent className="flex items-center justify-between py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Glossary</p>
                      <p className="text-xs text-muted-foreground">
                        Definitions for every ICP term
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  data-ocid="icpedia.search_input"
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => (
                <Card
                  key={topic.topicId}
                  className="surface-elevated card-hover"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <Badge variant="secondary">{topic.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                    <CardDescription>{topic.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {topic.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <div
                className="text-center py-12"
                data-ocid="icpedia.topics.empty_state"
              >
                <p className="text-muted-foreground">
                  No topics found matching your search.
                </p>
              </div>
            )}
          </div>
        )}

        {/* RESEARCH TAB */}
        {activeTab === "research" && (
          <div>
            {/* Featured Video Card */}
            {featuredPaper?.videoId && (
              <Card
                className="surface-elevated mb-10 overflow-hidden"
                data-ocid="icpedia.research.featured_video.card"
              >
                <CardContent className="p-0">
                  <LazyYouTubeEmbed
                    videoId={featuredPaper.videoId}
                    title="AI Doesn't Trust You"
                    className="w-full rounded-t-xl"
                  />
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-semibold text-sm">
                      AI Doesn't Trust You
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      AI doesn't choose based on narrative — it chooses the most
                      efficient path to execution.
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
                      Bitcoin → Settlement&nbsp;&nbsp;ICP → Compute
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 flex items-center gap-2"
                    onClick={() =>
                      window.open(YT_CHANNEL, "_blank", "noopener,noreferrer")
                    }
                    data-ocid="icpedia.research.subscribe_button"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Subscribe for more research
                  </Button>
                </CardFooter>
              </Card>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-1">Research Papers</h2>
              <p className="text-sm text-muted-foreground">
                Technical deep-dives into Internet Computer protocols and
                systems.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-ocid="icpedia.research.list"
            >
              {researchPapers.map((paper, i) => (
                <Card
                  key={paper.slug}
                  className="surface-elevated card-hover flex flex-col"
                  data-ocid={`icpedia.research.item.${i + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-snug">
                      {paper.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-medium text-primary/80 mb-1">
                      {paper.subtitle}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {paper.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {paper.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      data-ocid={`icpedia.research.read_button.${i + 1}`}
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        navigate({ to: `/icpedia/research/${paper.slug}` })
                      }
                    >
                      Read →
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
