"use client";

import EmptyState from "@/components/common/EmptyState";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Error from "next/error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

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
