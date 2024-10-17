"use client";

import EmptyState from "@/components/common/EmptyState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <EmptyState
          title="Something went wrong!"
          subtitle="Please try again or go back."
          buttonText="Try again"
          onButtonClick={reset}
        />
      </body>
    </html>
  );
}
