import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updatePageMetadata } from "@/lib/seo";
import { BookOpen, Search, Tag } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
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

export default function ICPEDIAPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Update page metadata
  updatePageMetadata({
    title: "ICPEDIA | JackBear.ai",
    description:
      "Explore comprehensive Web3 and Internet Computer topics in ICPEDIA",
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

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ICPEDIA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive encyclopedia for Web3 and Internet Computer
            knowledge
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
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
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.topicId} className="surface-elevated card-hover">
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
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No topics found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
