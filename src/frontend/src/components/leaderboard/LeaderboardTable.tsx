import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LeaderboardEntry } from "@/types/leaderboard";
import { Award, Medal, Trophy } from "lucide-react";
import { MasteryTierBadge } from "./MasteryTierBadge";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  userEntry: LeaderboardEntry | null;
  showUserRow?: boolean;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-amber-400" />;
    case 2:
      return <Medal className="h-5 w-5 text-slate-400" />;
    case 3:
      return <Award className="h-5 w-5 text-orange-400" />;
    default:
      return (
        <span className="text-muted-foreground font-semibold">#{rank}</span>
      );
  }
}

export function LeaderboardTable({
  entries,
  userEntry,
  showUserRow = true,
}: LeaderboardTableProps) {
  const userInTopList = entries.some(
    (entry) => entry.userId === userEntry?.userId,
  );
  const shouldShowUserRow = showUserRow && userEntry && !userInTopList;

  return (
    <div className="space-y-4">
      {shouldShowUserRow && (
        <div className="overflow-x-auto border border-primary/30 rounded-lg bg-primary/5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Rank</TableHead>
                <TableHead>Learner</TableHead>
                <TableHead>Mastery</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-primary/10">
                <TableCell className="font-medium">
                  <div className="flex items-center justify-center">
                    {getRankIcon(userEntry.rank)}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {userEntry.displayName}
                  <span className="ml-2 text-xs text-muted-foreground">
                    (You)
                  </span>
                </TableCell>
                <TableCell>
                  <MasteryTierBadge tier={userEntry.masteryTier} size="sm" />
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {userEntry.accuracy}%
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatTime(userEntry.completionTime)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Rank</TableHead>
              <TableHead>Learner</TableHead>
              <TableHead>Mastery</TableHead>
              <TableHead className="text-right">Accuracy</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  No leaderboard entries yet. Complete the World Boss to appear
                  here!
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow
                  key={entry.userId}
                  className="hover:bg-primary/5"
                  data-sovereign-leaderboard-top={
                    entry.rank <= 3 ? "true" : undefined
                  }
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {entry.displayName}
                  </TableCell>
                  <TableCell>
                    <MasteryTierBadge tier={entry.masteryTier} size="sm" />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {entry.accuracy}%
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatTime(entry.completionTime)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
