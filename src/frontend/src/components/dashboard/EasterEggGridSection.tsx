import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getAllEasterEggs } from "../../additions/EasterEggRegistry";
import type { EasterEggId } from "../../additions/easterEggIds";
import { areEasterEggsEnabled } from "../../additions/featureFlags";
import {
  getAwardHistory,
  hasEggHunterBadge,
} from "../../additions/rewardRules";
import { DashboardSection } from "./DashboardSection";
import { EasterEggCard } from "./EasterEggCard";
import { EasterEggDetailModal } from "./EasterEggDetailModal";
import { EasterEggProgressIndicator } from "./EasterEggProgressIndicator";

interface EggWithStatus {
  id: EasterEggId;
  name: string;
  description: string;
  rewardAmount: number;
  isDiscovered: boolean;
  lastDiscoveredAt?: number;
}

export function EasterEggGridSection() {
  const [eggsWithStatus, setEggsWithStatus] = useState<EggWithStatus[]>([]);
  const [eggHunterBadge, setEggHunterBadge] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // All hooks must be called unconditionally — feature flag check happens inside effect
  useEffect(() => {
    try {
      if (!areEasterEggsEnabled()) {
        setEnabled(false);
        return;
      }
      setEnabled(true);
    } catch {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const loadEggData = () => {
      try {
        const allEggs = getAllEasterEggs();
        const awardHistory = getAwardHistory();

        const withStatus: EggWithStatus[] = allEggs.map((egg) => {
          const historyEntry = awardHistory.find(
            (entry) => entry.eventId === egg.id,
          );
          return {
            id: egg.id,
            name: egg.name,
            description: egg.description,
            rewardAmount: egg.rewardAmount,
            isDiscovered: !!historyEntry,
            lastDiscoveredAt: historyEntry?.timestamp,
          };
        });

        setEggsWithStatus(withStatus);
        setEggHunterBadge(hasEggHunterBadge());
      } catch (error) {
        console.error("[EasterEggGridSection] Error loading egg data:", error);
      }
    };

    loadEggData();

    const handleUpdate = () => {
      loadEggData();
    };

    window.addEventListener("bear-points-awarded", handleUpdate);
    window.addEventListener("easter-egg-discovered", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      window.removeEventListener("bear-points-awarded", handleUpdate);
      window.removeEventListener("easter-egg-discovered", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  try {
    return (
      <TooltipProvider>
        <DashboardSection
          title="Hidden Fragments"
          description="Not everything is on the map."
        >
          <div className="space-y-6">
            {/* Progress Indicator */}
            <EasterEggProgressIndicator />

            {/* Egg Hunter Badge */}
            {eggHunterBadge && (
              <div className="flex items-center gap-4 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="/assets/generated/egg-hunter-badge.dim_128x128.png"
                        alt="Fragment Hunter Badge"
                        className="w-16 h-16 object-contain drop-shadow-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/generated/easter-egg-found.dim_128x128.png";
                        }}
                      />
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Fragment Hunter</p>
                    <p className="text-xs text-muted-foreground">
                      All Hidden Fragments. Within 30 days.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">
                      Fragment Hunter
                    </span>
                    <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30 text-xs">
                      Special Badge
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All Hidden Fragments. Within 30 days. Few ever do.
                  </p>
                </div>
              </div>
            )}

            {/* Hidden Fragments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eggsWithStatus.map((egg) => (
                <EasterEggCard
                  key={egg.id}
                  eggId={egg.id}
                  name={egg.name}
                  description={egg.description}
                  rewardAmount={egg.rewardAmount}
                  isDiscovered={egg.isDiscovered}
                  lastDiscoveredAt={egg.lastDiscoveredAt}
                />
              ))}
            </div>
          </div>
        </DashboardSection>
      </TooltipProvider>
    );
  } catch (error) {
    console.error("[EasterEggGridSection] Render error:", error);
    return null;
  }
}
