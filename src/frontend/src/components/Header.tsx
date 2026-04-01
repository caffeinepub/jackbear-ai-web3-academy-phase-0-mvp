import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  ChevronDown,
  Coffee,
  Gamepad2,
  Grid3X3,
  Menu,
  Moon,
  MoreHorizontal,
  Sparkles,
  Sun,
  Video,
  X,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLanguage } from "../hooks/useLanguage";
import JackBearLogo from "./JackBearLogo";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const { identity, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const location = useLocation();

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // "More" dropdown is active when any of its child routes is active
  const isMoreActive =
    isActive("/web3-explained") ||
    isActive("/about-caffeine-ai") ||
    isActive("/icpedia") ||
    isActive("/glossary") ||
    isActive("/feed");

  // "Games" dropdown is active when on any game route
  const isGamesActive =
    isActive("/hangman") || isActive("/crossword") || isActive("/games");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={closeMobileMenu}
        >
          <div id="header-jackbear-logo" title="JackBear.ai">
            <JackBearLogo size={40} showContainer={false} />
          </div>
          <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            JackBear.ai
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Primary: Courses */}
          <Link
            to="/courses"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/courses") ? "text-primary" : "text-foreground/80"
            }`}
          >
            {t.courses}
          </Link>

          {/* Primary: Dashboard (auth-gated) */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Primary: Games dropdown (unchanged) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  isGamesActive ? "text-primary" : "text-foreground/80"
                }`}
              >
                <Gamepad2 className="h-4 w-4" />
                Games
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link
                  to="/hangman"
                  data-ocid="hangman.link"
                  className="cursor-pointer flex items-start gap-2.5 py-2"
                >
                  <Gamepad2 className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Decode</div>
                    <div className="text-xs text-muted-foreground">
                      Solve &amp; unlock fragments
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/crossword"
                  className="cursor-pointer flex items-start gap-2.5 py-2"
                >
                  <Grid3X3 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Crossword</div>
                    <div className="text-xs text-muted-foreground">
                      Daily glossary puzzle
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  className="cursor-pointer flex items-start gap-2.5 py-2"
                >
                  <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Hidden Fragments</div>
                    <div className="text-xs text-muted-foreground">
                      Progress-driven discovery
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/games"
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  All Games →
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Primary: Intelligence */}
          <Link
            to="/intelligence"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              isActive("/intelligence") ? "text-primary" : "text-foreground/80"
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            Intelligence
          </Link>

          {/* More dropdown: ICPEDIA group + existing items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  isMoreActive ? "text-primary" : "text-foreground/80"
                }`}
              >
                <MoreHorizontal className="h-4 w-4" />
                More
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link
                  to="/icpedia"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  {t.icpedia}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/glossary"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4 opacity-70" />
                  {t.glossary}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/feed"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Real-Time ICP Feed
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/web3-explained"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  Learn by Video
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/about-caffeine-ai"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Coffee className="h-4 w-4" />
                  About Caffeine.ai
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NotificationBell />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              disabled={loginStatus === "logging-in"}
              className="font-medium"
            >
              {t.logout}
            </Button>
          ) : (
            <Link to="/dashboard">
              <Button variant="default" className="font-medium">
                {t.login}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="container py-4 space-y-3">
            <Link
              to="/courses"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              {t.courses}
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            )}

            {/* Intelligence link in mobile */}
            <Link
              to="/intelligence"
              className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              <Brain className="h-4 w-4 text-violet-400" />
              Intelligence
            </Link>

            {/* Games section in mobile */}
            <div className="pt-1 pb-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                <Gamepad2 className="h-3.5 w-3.5" />
                Games
              </p>
              <div className="space-y-1 pl-2">
                <Link
                  to="/hangman"
                  data-ocid="hangman.link"
                  className="flex items-center gap-2 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Gamepad2 className="h-4 w-4 text-violet-500" />
                  Decode
                </Link>
                <Link
                  to="/crossword"
                  className="flex items-center gap-2 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Grid3X3 className="h-4 w-4 text-emerald-500" />
                  Crossword
                </Link>
                <Link
                  to="/games"
                  className="flex items-center gap-2 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  All Games
                </Link>
              </div>
            </div>

            <Link
              to="/icpedia"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              {t.icpedia}
            </Link>

            <Link
              to="/glossary"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              {t.glossary}
            </Link>

            <Link
              to="/feed"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Real-Time ICP Feed
            </Link>

            <Link
              to="/web3-explained"
              className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              <Video className="h-4 w-4" />
              Learn by Video
            </Link>

            <Link
              to="/about-caffeine-ai"
              className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              <Coffee className="h-4 w-4" />
              About Caffeine.ai
            </Link>

            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <NotificationBell />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  disabled={loginStatus === "logging-in"}
                  className="flex-1 font-medium"
                >
                  {t.logout}
                </Button>
              ) : (
                <Link
                  to="/dashboard"
                  className="flex-1"
                  onClick={closeMobileMenu}
                >
                  <Button variant="default" className="w-full font-medium">
                    {t.login}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
