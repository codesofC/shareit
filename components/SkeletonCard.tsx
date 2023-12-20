"use client";

import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="relative flex flex-col gap-2 px-2 py-2 items-start animate-pulse">
      <Skeleton className="w-full min-h-[400px] rounded-lg aspect-video" />
      <Skeleton className="w-full h-5" />
    </div>
  );
};

export default SkeletonCard;
