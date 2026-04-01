import { Link } from "@tanstack/react-router";
import { Coffee, Heart } from "lucide-react";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import JackBearLogo from "./JackBearLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "jackbear-ai";

  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit"
            >
              <div id="footer-jackbear-logo">
                <JackBearLogo size={40} showContainer={false} />
              </div>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                JackBear.ai
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master Web3 and the Internet Computer through gamified learning
              and AI-driven knowledge.
            </p>
          </div>

          {/* Learn Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Learn</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/courses"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/web3-explained"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Learn by Video
                </Link>
              </li>
              <li>
                <Link
                  to="/glossary"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  to="/icpedia"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ICPEDIA
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/about-caffeine-ai"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Caffeine.ai
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Real-Time ICP Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/impact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Impact & Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/monthly-prize"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Monthly Prize
                </Link>
              </li>
              <li>
                <a
                  href="https://paypal.me/justinjackbear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Support JackBear.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://x.com/JackBearAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@justinjackbear"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/cloudstrikethunderbeing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/jackbear-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/jackbear.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} JackBear.ai. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-accent fill-accent animate-pulse" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-caffeine hover:text-caffeine/80 transition-colors inline-flex items-center gap-1.5"
            >
              <Coffee className="h-4 w-4" />
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
