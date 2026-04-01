import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import React, { useEffect } from "react";
import AdditionsRoot from "./additions/AdditionsRoot";
import BetaBanner from "./additions/BetaBanner";
import { BearPointsToastListener } from "./components/CoinRewardAnimation";
import Footer from "./components/Footer";
import GlobalBPSync from "./components/GlobalBPSync";
import Header from "./components/Header";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import { LanguageProvider } from "./hooks/useLanguage";
import { usePageViewTracking } from "./hooks/usePageViewTracking";
import { updatePageMetadata } from "./lib/seo";

import AboutCaffeineAIPage from "./pages/AboutCaffeineAIPage";
import AdminPage from "./pages/AdminPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import BPLedgerPage from "./pages/BPLedgerPage";
import ChainKeyCryptographyPage from "./pages/ChainKeyCryptographyPage";
import CoffeeBreakAIPage from "./pages/CoffeeBreakAIPage";
import CoursesPage from "./pages/CoursesPage";
import CrosswordPage from "./pages/CrosswordPage";
import DashboardPage from "./pages/DashboardPage";
import FaqPage from "./pages/FaqPage";
import FeaturesPage from "./pages/FeaturesPage";
import GamesPage from "./pages/GamesPage";
import GlossaryPage from "./pages/GlossaryPage";
import HangmanPage from "./pages/HangmanPage";
import ICPEDIAPage from "./pages/ICPEDIAPage";
import ImpactPage from "./pages/ImpactPage";
// Pages
import LandingPage from "./pages/LandingPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MonthlyPrizePage from "./pages/MonthlyPrizePage";
import NewsPage from "./pages/NewsPage";
import RealTimeICPFeedPage from "./pages/RealTimeICPFeedPage";
import ReferralPage from "./pages/ReferralPage";
import UpdatesPage from "./pages/UpdatesPage";
import VaultPage from "./pages/VaultPage";
import VerifiableIntelligencePage from "./pages/VerifiableIntelligencePage";
import Web3ExplainedPage from "./pages/Web3ExplainedPage";
import World1Page from "./pages/World1Page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Layout() {
  usePageViewTracking();

  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not consumed in body
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    updatePageMetadata({
      description:
        "The World Computer's #1 Web3 Academy — learn blockchain, ICP, DeFi, and more.",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <BetaBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BearPointsToastListener />
      <GlobalBPSync />
      <AdditionsRoot />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courses",
  component: CoursesPage,
});
const world1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/world-1",
  component: World1Page,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: LeaderboardPage,
});
const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FaqPage,
});
const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/features",
  component: FeaturesPage,
});
const impactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/impact",
  component: ImpactPage,
});
const icpediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/icpedia",
  component: ICPEDIAPage,
});
const glossaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/glossary",
  component: GlossaryPage,
});
const architectureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/architecture",
  component: ArchitecturePage,
});
const coffeeBreakRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/coffee-break",
  component: CoffeeBreakAIPage,
});
const web3ExplainedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/web3-explained",
  component: Web3ExplainedPage,
});
const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feed",
  component: RealTimeICPFeedPage,
});
const chainKeyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chain-key",
  component: ChainKeyCryptographyPage,
});
const chainKeyCryptographyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chain-key-cryptography",
  component: ChainKeyCryptographyPage,
});
const aboutCaffeineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-caffeine",
  component: AboutCaffeineAIPage,
});
const aboutCaffeineAIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-caffeine-ai",
  component: AboutCaffeineAIPage,
});
const vaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vault",
  component: VaultPage,
});
const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/news",
  component: NewsPage,
});
const updatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/updates",
  component: UpdatesPage,
});
const referralRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/referral",
  component: ReferralPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});
const bpLedgerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bp-history",
  component: BPLedgerPage,
});
const monthlyPrizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/monthly-prize",
  component: MonthlyPrizePage,
});
const hangmanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hangman",
  component: HangmanPage,
});
const crosswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crossword",
  component: CrosswordPage,
});
const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
  component: GamesPage,
});
const intelligenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/intelligence",
  component: VerifiableIntelligencePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  world1Route,
  dashboardRoute,
  leaderboardRoute,
  faqRoute,
  featuresRoute,
  impactRoute,
  icpediaRoute,
  glossaryRoute,
  architectureRoute,
  coffeeBreakRoute,
  web3ExplainedRoute,
  feedRoute,
  chainKeyRoute,
  chainKeyCryptographyRoute,
  aboutCaffeineRoute,
  aboutCaffeineAIRoute,
  vaultRoute,
  newsRoute,
  updatesRoute,
  referralRoute,
  adminRoute,
  bpLedgerRoute,
  monthlyPrizeRoute,
  hangmanRoute,
  crosswordRoute,
  gamesRoute,
  intelligenceRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <InternetIdentityProvider>
          <LanguageProvider>
            <RouterProvider router={router} />
          </LanguageProvider>
        </InternetIdentityProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
