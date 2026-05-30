import Skeleton from "@/components/ui/Skeleton";

export default function LeaderboardSkeleton() {

  return (

    <div
      className="
      bg-[#0d0718]
      border
      border-white/10
      rounded-3xl
      p-5
      "
    >

      <Skeleton className="h-8 w-48 mb-6" />

      <div className="space-y-4">

        {[1,2,3,4,5].map((item) => (

          <Skeleton
            key={item}
            className="h-14 w-full"
          />

        ))}

      </div>

    </div>

  );
}