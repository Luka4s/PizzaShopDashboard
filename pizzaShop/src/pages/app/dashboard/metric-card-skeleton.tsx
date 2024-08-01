import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
  return (
    <div>
      <Skeleton className="h-7 w-36 mt-1" />
      <Skeleton className="h-4 w-52 " />
    </div>
  );
}
