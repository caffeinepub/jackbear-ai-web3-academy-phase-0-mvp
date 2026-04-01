import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FEED_PRESET_LABELS } from "@/lib/icpFeed/constants";
import type { FeedSourcePreset } from "@/lib/icpFeed/types";
import { Search } from "lucide-react";

interface FeedControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPreset: FeedSourcePreset;
  onPresetChange: (preset: FeedSourcePreset) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
}

const ALL_PRESETS: FeedSourcePreset[] = [
  "all",
  "internetcomputer-news",
  "dfinity-medium",
  "youtube-rd",
];

export default function FeedControls({
  searchQuery,
  onSearchChange,
  selectedPreset,
  onPresetChange,
  sortOrder,
  onSortChange,
}: FeedControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default">
                {sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={sortOrder === "newest"}
                onCheckedChange={() => onSortChange("newest")}
              >
                Newest First
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortOrder === "oldest"}
                onCheckedChange={() => onSortChange("oldest")}
              >
                Oldest First
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Source Filter Presets */}
      <div className="flex flex-wrap gap-2">
        {ALL_PRESETS.map((preset) => (
          <Button
            key={preset}
            variant={selectedPreset === preset ? "default" : "outline"}
            size="sm"
            onClick={() => onPresetChange(preset)}
            className="transition-all"
          >
            {FEED_PRESET_LABELS[preset]}
          </Button>
        ))}
      </div>
    </div>
  );
}
