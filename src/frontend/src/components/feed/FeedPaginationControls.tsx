import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeedPaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function FeedPaginationControls({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPrevious,
  onNext,
}: FeedPaginationControlsProps) {
  // Calculate the range of items being shown
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-border">
      {/* Range and total display */}
      <div className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="px-3 py-1 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
