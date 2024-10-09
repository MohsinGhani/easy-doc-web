import { cn } from "@/lib/utils"; // Assuming you have this utility for class merging

const ConversationSkeletonOne = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center lg:gap-4 sm:gap-3 gap-1 lg:py-[33px] lg:px-[47px] sm:px5 sm:py-5 px-4 py-3 bg-white",
        className
      )}
    >
      {/* Avatar Skeleton */}
      <div className="animate-pulse rounded-full bg-gray-300 sm:w-12 w-8 sm:h-12 h-8" />

      {/* Text placeholders */}
      <div className="flex-col justify-center items-start gap-1 inline-flex">
        <div className="animate-pulse bg-gray-300 h-4 sm:h-6 w-32 rounded-md" />
        <div className="animate-pulse bg-gray-200 h-3 w-20 mt-1 rounded-md sm:block hidden" />
      </div>

      {/* Call & Video button skeleton */}
      <div className="ml-auto flex items-center gap-4">
        <div className="animate-pulse rounded-full bg-gray-200 w-10 h-10 md:w-12 md:h-12" />
        <div className="animate-pulse rounded-full bg-gray-200 w-10 h-10 md:w-12 md:h-12" />
      </div>

      {/* Message Skeleton */}
      <div className="py-4 px-4">
        <p className="text-black text-sm font-normal text-center mb-[30px]">
          <div className="animate-pulse bg-gray-300 h-4 w-24 rounded-md mx-auto" />
        </p>
        {/* Messages */}
        <div className="relative flex flex-col gap-4 grow mb-20">
          <div className="animate-pulse bg-gray-100 rounded-lg p-4 h-16 w-full" />
          <div className="animate-pulse bg-gray-100 rounded-lg p-4 h-16 w-full" />
        </div>
      </div>
    </div>
  );
};

const ConversationSkeletonTwo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-2 px-4 py-4 bg-white", className)}>
      {/* Avatar & Name Skeleton */}
      <div className="flex items-center gap-2">
        <div className="animate-pulse rounded-full bg-gray-300 w-10 h-10" />
        <div className="flex flex-col gap-1">
          <div className="animate-pulse bg-gray-300 h-4 w-24 rounded-md" />
          <div className="animate-pulse bg-gray-200 h-3 w-16 mt-1 rounded-md" />
        </div>
      </div>

      {/* Messages */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="animate-pulse bg-gray-100 rounded-lg p-3 w-3/4 h-12" />
        <div className="animate-pulse bg-gray-100 rounded-lg p-3 w-2/4 h-12 ml-auto" />
        <div className="animate-pulse bg-gray-100 rounded-lg p-3 w-1/2 h-12" />
      </div>
    </div>
  );
};

export { ConversationSkeletonOne, ConversationSkeletonTwo };
