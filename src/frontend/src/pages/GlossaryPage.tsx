import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ExternalLink, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { type GlossaryTermData, allGlossaryTerms } from "../lib/glossaryData";
import { updatePageMetadata } from "../lib/seo";

const CATEGORIES = [
  "All",
  "Blockchain",
  "Cryptography",
  "Consensus",
  "Wallets",
  "Tokens",
  "ICP",
  "Smart Contracts",
  "Sovereignty",
  "Identity",
  "Infrastructure",
  "Security",
  "DeFi",
  "Governance",
  "AI",
];

const ALPHABET = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function GlossaryPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTermData | null>(
    null,
  );

  const pageTitle =
    language === "es"
      ? "Glosario Web3 | JACKBEAR AI | ICPEDIA"
      : "Web3 Glossary | JACKBEAR AI | ICPEDIA";

  const pageDescription =
    language === "es"
      ? "Tu guía completa de terminología Web3, ICP, blockchain y AI. Glosario curricular completo — Mundos 1 a 8"
      : "Your comprehensive guide to Web3, ICP, blockchain, and AI terminology. Curriculum-Wide — Worlds 1–8";

  useEffect(() => {
    updatePageMetadata({
      title: pageTitle,
      description: pageDescription,
      language,
    });
  }, [pageTitle, pageDescription, language]);

  const filteredTerms = useMemo(() => {
    return allGlossaryTerms.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || term.category === selectedCategory;
      const matchesLetter =
        selectedLetter === "All" ||
        term.term.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-primary/20 bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t.firstEditionGlossary}
              </span>
            </div>
            <h1 className="heading-hero mb-4">{t.glossaryTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
              {t.glossaryDescription}
            </p>
            <p className="text-sm text-muted-foreground italic">
              Curriculum-Wide — Worlds 1–8
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchTerms}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* A–Z quick filter — single scrollable row on all screen sizes */}
          <div className="mb-4 overflow-x-auto scrollbar-none">
            <div className="flex gap-1 min-w-max pb-1">
              {ALPHABET.map((letter) => (
                <Button
                  key={letter}
                  variant={selectedLetter === letter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLetter(letter)}
                  className="h-8 min-w-[2rem] px-2 text-xs font-mono shrink-0"
                >
                  {letter === "All" ? "All" : letter}
                </Button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>

          {filteredTerms.length === 0 ? (
            <Card className="surface-elevated">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-semibold mb-2">
                  {t.noTermsFound}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.noTermsFoundDescription}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerms.map((term) => (
                <Card
                  key={term.term}
                  className="surface-elevated card-hover-scale cursor-pointer"
                  onClick={() => setSelectedTerm(term)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg font-display gradient-text-primary">
                        {term.term}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {term.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-3">
                      {term.definition}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {term.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {term.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{term.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedTerm} onOpenChange={() => setSelectedTerm(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTerm && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <DialogTitle className="text-2xl font-display gradient-text-primary">
                    {selectedTerm.term}
                  </DialogTitle>
                  <Badge variant="secondary">{selectedTerm.category}</Badge>
                </div>
                <DialogDescription className="text-base">
                  {selectedTerm.definition}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-6 pr-4">
                  {selectedTerm.fullDescription && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        {t.detailedDescription}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedTerm.fullDescription}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2">{t.tags}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {selectedTerm.relatedLessons.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">{t.relatedLessons}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTerm.relatedLessons.map((lesson) => (
                          <Badge key={lesson} variant="secondary">
                            {lesson}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTerm.relatedTopics.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">{t.relatedTopics}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTerm.relatedTopics.map((topic) => (
                          <Badge key={topic} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTerm.externalReferences.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        {t.externalReferences}
                      </h3>
                      <ul className="space-y-2">
                        {selectedTerm.externalReferences.map((ref, idx) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          <li key={idx} className="text-sm">
                            <a
                              href={ref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-accent transition-colors inline-flex items-center gap-1"
                            >
                              {ref}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
