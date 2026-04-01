import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
          key={i}
          className="surface-elevated"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-full mt-2" />
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-9 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
