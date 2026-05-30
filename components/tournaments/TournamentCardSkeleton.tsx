import Skeleton from "@/components/ui/Skeleton";

export default function TournamentCardSkeleton() {

  return (

    <div
      className="
      bg-[#0d0718]
      border
      border-white/10
      rounded-3xl
      overflow-hidden
      "
    >

      <Skeleton
        className="
        h-48
        w-full
        "
      />

      <div className="p-5 space-y-3">

        <Skeleton className="h-6 w-2/3" />

        <Skeleton className="h-4 w-1/2" />

        <Skeleton className="h-12 w-full" />

      </div>

    </div>

  );
}