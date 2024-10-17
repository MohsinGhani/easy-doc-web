"use client";

import EmptyState from "@/components/common/EmptyState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center grow flex-1">
      <EmptyState
        title="Something went wrong!"
        subtitle="Please try again or go back."
        buttonText="Try again"
        onButtonClick={reset}
      />
    </div>
  );
}
