import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ExternalLink,
  GraduationCap,
  Play,
  Sparkles,
  Youtube,
} from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { updatePageMetadata } from "../lib/seo";

// Hero Intro to Web3 Video (series opener)
const HERO_INTRO_VIDEO = {
  title: "First Steps In Web3",
  description:
    "Start your Web3 journey with this comprehensive introduction covering the fundamentals of blockchain, decentralization, and the future of the internet.",
  videoId: "6Q4kqJpsgww",
  videoUrl: "https://youtu.be/6Q4kqJpsgww?si=zOu_T5a_m0AREpmd",
  embedUrl: "https://www.youtube.com/embed/6Q4kqJpsgww",
};

// Web3 Fundamentals Playlist
const WEB3_FUNDAMENTALS_PLAYLIST = {
  title: "Web3 Fundamentals",
  subtitle: "Start Here - Beginner Series",
  description:
    "Perfect for beginners! Learn the essential concepts of Web3, blockchain, and decentralized technology from the ground up.",
  playlistUrl:
    "https://youtube.com/playlist?list=PL1elCpv508jr1PZ7RFm0rEV5MJXFr480H&si=q_7H6bQqMIGgVGVE",
  playlistId: "PL1elCpv508jr1PZ7RFm0rEV5MJXFr480H",
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PL1elCpv508jr1PZ7RFm0rEV5MJXFr480H",
};

// Web3 Explained Playlist (Intermediate to Advanced)
const WEB3_EXPLAINED_PLAYLIST = {
  title: "Web3 Explained",
  subtitle: "Intermediate to Advanced",
  description:
    "Deep dive into advanced Web3 concepts, protocols, and technologies. Build on your foundational knowledge with in-depth explanations.",
  playlistUrl:
    "https://youtube.com/playlist?list=PL1elCpv508jpSYIUoLLo4B7f7UWM2BL9d&si=pktFhHAdmN5dSqBO",
  playlistId: "PL1elCpv508jpSYIUoLLo4B7f7UWM2BL9d",
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PL1elCpv508jpSYIUoLLo4B7f7UWM2BL9d",
};

export default function Web3ExplainedPage() {
  const { language } = useLanguage();

  const pageTitle =
    language === "es"
      ? "Aprende Web3 por Video | JACKBEAR AI | ICPEDIA"
      : "Learn Web3 by Video | JACKBEAR AI | ICPEDIA";

  const pageDescription =
    language === "es"
      ? "Domina Web3 con nuestra serie de videos explicativos. Tutoriales paso a paso sobre blockchain, criptomonedas, contratos inteligentes y el Protocolo de Computadora de Internet con JACKBEAR AI | ICPEDIA"
      : "Master Web3 with our comprehensive video series. Step-by-step tutorials on blockchain, cryptocurrency, smart contracts, and the Internet Computer Protocol with JACKBEAR AI | ICPEDIA";

  useEffect(() => {
    updatePageMetadata({
      title: pageTitle,
      description: pageDescription,
      language,
    });
  }, [pageTitle, pageDescription, language]);

  const scrollToFundamentals = () => {
    const element = document.getElementById("fundamentals-playlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background/100">
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="relative container max-w-6xl py-12 space-y-16">
        {/* Hero Section */}
        <section className="space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-glow-md">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground hero-headline">
              Learn Web3 by Video
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Your complete video guide to understanding Web3, blockchain
              technology, and the Internet Computer. From absolute beginner to
              confident builder.
            </p>
          </div>

          {/* Hero Video */}
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border-2 border-primary/30 shadow-glow-lg">
              <iframe
                src={HERO_INTRO_VIDEO.embedUrl}
                title={HERO_INTRO_VIDEO.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {HERO_INTRO_VIDEO.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={scrollToFundamentals}
                  className="shadow-glow-md hover:shadow-glow-lg transition-all"
                >
                  <Play className="h-5 w-5 mr-2" fill="currentColor" />
                  Start with Fundamentals
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href={HERO_INTRO_VIDEO.videoUrl}
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
        </section>

        {/* Web3 Fundamentals Playlist */}
        <section id="fundamentals-playlist" className="space-y-6 scroll-mt-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  {WEB3_FUNDAMENTALS_PLAYLIST.title}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground shadow-glow-sm">
                  {WEB3_FUNDAMENTALS_PLAYLIST.subtitle}
                </span>
              </div>
              <p className="text-muted-foreground">
                {WEB3_FUNDAMENTALS_PLAYLIST.description}
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a
                href={WEB3_FUNDAMENTALS_PLAYLIST.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                View Playlist
              </a>
            </Button>
          </div>
          <div className="border-2 border-accent/30 rounded-xl p-6 bg-gradient-to-br from-accent/5 via-primary/5 to-background shadow-glow-md space-y-4">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-glow-md">
              <iframe
                src={WEB3_FUNDAMENTALS_PLAYLIST.embedUrl}
                title={WEB3_FUNDAMENTALS_PLAYLIST.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <a
                  href={WEB3_FUNDAMENTALS_PLAYLIST.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  Open Full Playlist on YouTube
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Web3 Explained Playlist */}
        <section id="explained-playlist" className="space-y-6 scroll-mt-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  {WEB3_EXPLAINED_PLAYLIST.title}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-glow-sm">
                  {WEB3_EXPLAINED_PLAYLIST.subtitle}
                </span>
              </div>
              <p className="text-muted-foreground">
                {WEB3_EXPLAINED_PLAYLIST.description}
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a
                href={WEB3_EXPLAINED_PLAYLIST.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                View Playlist
              </a>
            </Button>
          </div>
          <div className="border-2 border-primary/30 rounded-xl p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-background shadow-glow-md space-y-4">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-glow-md">
              <iframe
                src={WEB3_EXPLAINED_PLAYLIST.embedUrl}
                title={WEB3_EXPLAINED_PLAYLIST.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <a
                  href={WEB3_EXPLAINED_PLAYLIST.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  Open Full Playlist on YouTube
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Channel CTA */}
        <section className="text-center py-4">
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://www.youtube.com/@justinjackbear"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube className="h-5 w-5" />
              Visit the JackBear YouTube Channel
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </section>

        {/* Closing CTA */}
        <section className="border border-border rounded-xl p-8 bg-gradient-to-br from-primary/5 to-accent/5 space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Ready to Build on Web3?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Take your learning to the next level with our interactive courses.
              Earn XP, complete challenges, and join a global community of Web3
              builders.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="shadow-glow-md hover:shadow-glow-lg transition-all"
              >
                <Link to="/courses">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Start Interactive Courses
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/glossary">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Web3 Glossary
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
