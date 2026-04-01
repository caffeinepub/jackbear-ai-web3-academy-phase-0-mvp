import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Coffee,
  ExternalLink,
  GraduationCap,
  Play,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { updatePageMetadata } from "../lib/seo";

// Episode 1 with official YouTube URL
const MOCK_EPISODES = [
  {
    id: "1",
    title: "Getting Started with CaffeineAI",
    description:
      "Learn the basics of CaffeineAI and how to set up your first project.",
    youtubeId: "iC61TLegTwU",
    embedUrl: "https://www.youtube.com/embed/iC61TLegTwU?si=aRA5n6UxnpDl0Oj7",
    thumbnailUrl: "https://img.youtube.com/vi/iC61TLegTwU/maxresdefault.jpg",
    duration: BigInt(600_000_000_000), // 10 minutes in nanoseconds
  },
];

// Web3 Fundamentals Playlist
const WEB3_FUNDAMENTALS_PLAYLIST = {
  title: "Web3 Fundamentals for Beginners",
  subtitle: "Start Here",
  description:
    "New to Web3? Start your journey with this comprehensive beginner-friendly playlist covering blockchain basics, wallets, smart contracts, and the Internet Computer Protocol.",
  playlistUrl:
    "https://youtube.com/playlist?list=PL1elCpv508jr1PZ7RFm0rEV5MJXFr480H&si=_MseZ3aM8lLkrUbe",
  playlistId: "PL1elCpv508jr1PZ7RFm0rEV5MJXFr480H",
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PL1elCpv508jr1PZ7RFm0rEV5MJXFr480H&si=_MseZ3aM8lLkrUbe",
};

export default function CoffeeBreakAIPage() {
  const { language } = useLanguage();
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [showPlaylistEmbed, setShowPlaylistEmbed] = useState(false);

  const pageTitle =
    language === "es"
      ? "Serie de Videos de Aprendizaje de IA | JACKBEAR AI | ICPEDIA"
      : "AI Learning Video Series | JACKBEAR AI | ICPEDIA";

  const pageDescription =
    language === "es"
      ? "Aprende herramientas de IA con CaffeineAI y fundamentos de Web3 para principiantes. Tutoriales en video del tamaño de un bocado para dominar la productividad impulsada por IA con JACKBEAR AI | ICPEDIA"
      : "Learn AI tools with CaffeineAI and Web3 Fundamentals for Beginners. Bite-sized video tutorials to master AI-powered productivity and blockchain basics with JACKBEAR AI | ICPEDIA";

  useEffect(() => {
    updatePageMetadata({
      title: pageTitle,
      description: pageDescription,
      language,
    });
  }, [pageTitle, pageDescription, language]);

  const formatDuration = (nanoseconds: bigint) => {
    const seconds = Number(nanoseconds) / 1_000_000_000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen bg-background/100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="relative container max-w-6xl py-12 space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shadow-glow-sm">
              <Coffee className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground hero-headline">
            Coffee Break AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Master AI tools and Web3 fundamentals through bite-sized video
            tutorials. Perfect for your coffee break.
          </p>
        </div>

        {/* Featured: Web3 Fundamentals for Beginners - Start Here */}
        <section className="border-2 border-accent/30 rounded-xl p-8 bg-gradient-to-br from-accent/5 via-primary/5 to-background shadow-glow-md space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
              <GraduationCap className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {WEB3_FUNDAMENTALS_PLAYLIST.title}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground shadow-glow-sm">
                  {WEB3_FUNDAMENTALS_PLAYLIST.subtitle}
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {WEB3_FUNDAMENTALS_PLAYLIST.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => setShowPlaylistEmbed(true)}
                  className="shadow-glow-md hover:shadow-glow-lg transition-all"
                >
                  <Play className="h-5 w-5 mr-2" fill="currentColor" />
                  Start Learning Now
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href={WEB3_FUNDAMENTALS_PLAYLIST.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Youtube className="h-5 w-5" />
                    View on YouTube
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Embedded Playlist Player */}
          {showPlaylistEmbed && (
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-glow-md">
              <iframe
                src={WEB3_FUNDAMENTALS_PLAYLIST.embedUrl}
                title={WEB3_FUNDAMENTALS_PLAYLIST.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </section>

        {/* Learn with CaffeineAI Overview Section */}
        <section className="border border-primary/20 rounded-lg p-6 bg-primary/5 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Coffee className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                Learn with CaffeineAI
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Welcome to Coffee Break AI, your friendly guide to mastering
                accessible AI tools for everyday productivity. Join Michael from
                CaffeineAI as he demonstrates how to leverage AI-powered
                features to supercharge your workflow, organize your thoughts,
                and unlock your creative potential.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you're a student, professional, or lifelong learner,
                these bite-sized video tutorials make AI accessible for all ages
                and skill levels.
              </p>
            </div>
          </div>
        </section>

        {/* More Episodes Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              More Episodes
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://www.youtube.com/@CaffeineAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                Subscribe
              </a>
            </Button>
          </div>

          {/* Episodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_EPISODES.map((episode) => (
              <div
                key={episode.id}
                className="border border-border rounded-lg bg-card/50 overflow-hidden hover:border-primary/30 hover:shadow-glow-sm transition-all group"
              >
                {/* Thumbnail or Embedded Video */}
                <div className="relative aspect-video bg-muted">
                  {playingEpisode === episode.id ? (
                    <iframe
                      src={episode.embedUrl}
                      title={episode.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlayingEpisode(episode.id)}
                      className="relative w-full h-full group/thumb"
                    >
                      <img
                        src={episode.thumbnailUrl}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 group-hover/thumb:bg-primary flex items-center justify-center shadow-glow-md transition-all">
                          <Play
                            className="h-8 w-8 text-primary-foreground ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {/* Episode Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {episode.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Duration: {formatDuration(episode.duration)}
                    </span>
                    <a
                      href={`https://youtu.be/${episode.youtubeId}?si=aRA5n6UxnpDl0Oj7`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors"
                    >
                      <Youtube className="h-3 w-3" />
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="border border-border rounded-xl p-8 bg-gradient-to-br from-primary/5 to-accent/5 space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Ready to Master Web3?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Take your learning to the next level with our comprehensive
              courses. Earn XP, unlock achievements, and join a global community
              of Web3 learners.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="shadow-glow-md hover:shadow-glow-lg transition-all"
              >
                <Link to="/courses">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Explore Courses
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/glossary">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Glossary
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="border border-border rounded-lg p-6 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Youtube className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Subscribe for More
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Don't miss out on new episodes! Subscribe to our YouTube channel
                to get notified when we release new Coffee Break AI tutorials.
                Learn how to use CaffeineAI's powerful features to boost your
                productivity, organize your knowledge, and harness the power of
                AI for your daily tasks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
