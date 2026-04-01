import FeedControls from "@/components/feed/FeedControls";
import FeedItemCard from "@/components/feed/FeedItemCard";
import FeedPaginationControls from "@/components/feed/FeedPaginationControls";
import FeedSkeleton from "@/components/feed/FeedSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MOCK_FEED_ITEMS } from "@/lib/icpFeed/mockData";
import type { FeedItem, FeedSourcePreset } from "@/lib/icpFeed/types";
import { AlertCircle, Rss } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LoadingState = "loading" | "ready" | "error";

const PAGE_SIZE = 10;

export default function RealTimeICPFeedPage() {
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<FeedSourcePreset>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate initial data loading
  useEffect(() => {
    const loadFeed = async () => {
      setLoadingState("loading");
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setFeedItems(MOCK_FEED_ITEMS);
        setLoadingState("ready");
      } catch (error) {
        console.error("Failed to load feed:", error);
        setLoadingState("error");
      }
    };

    loadFeed();
  }, []);

  const handleRetry = () => {
    setLoadingState("loading");
    setTimeout(() => {
      setFeedItems(MOCK_FEED_ITEMS);
      setLoadingState("ready");
    }, 800);
  };

  // Reset to page 1 when filters, search, or sort changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional filter-driven reset
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPreset, searchQuery, sortOrder]);

  const filteredAndSortedItems = useMemo(() => {
    let items = feedItems;

    // Filter by preset source
    if (selectedPreset !== "all") {
      items = items.filter((item) => item.source === selectedPreset);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query),
      );
    }

    // Sort
    items = [...items].sort((a, b) => {
      const timeA = a.publishedAt.getTime();
      const timeB = b.publishedAt.getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    return items;
  }, [feedItems, selectedPreset, searchQuery, sortOrder]);

  // Calculate pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedItems.length / PAGE_SIZE),
  );

  // Clamp current page if it exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  // Get paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredAndSortedItems.slice(startIndex, endIndex);
  }, [filteredAndSortedItems, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const showPagination = filteredAndSortedItems.length > PAGE_SIZE;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 md:py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Rss className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="heading-section gradient-text-primary">
                ICP News &amp; Updates
              </h1>
              <p className="text-muted-foreground mt-1">
                Curated ICP ecosystem news and highlights
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loadingState === "loading" && <FeedSkeleton />}

        {/* Error State */}
        {loadingState === "error" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load feed items. Please try again.</span>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Ready State */}
        {loadingState === "ready" && (
          <>
            {/* Controls */}
            <div className="mb-6">
              <FeedControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedPreset={selectedPreset}
                onPresetChange={setSelectedPreset}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
              />
            </div>

            {/* Feed Items */}
            {filteredAndSortedItems.length > 0 ? (
              <>
                <div className="space-y-4">
                  {paginatedItems.map((item) => (
                    <FeedItemCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {showPagination && (
                  <FeedPaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredAndSortedItems.length}
                    pageSize={PAGE_SIZE}
                    onPrevious={handlePreviousPage}
                    onNext={handleNextPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Rss className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchQuery.trim()
                    ? "Try adjusting your search query or filters."
                    : "No feed items match your current filters."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
