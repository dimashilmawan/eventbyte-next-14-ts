"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-center h-full flex-col">
      <h2 className="text-3xl font-semibold text-gray-700">
        Something went wrong!
      </h2>
      <p className="mt-4">{error.message}</p>
      <Button
        variant="default"
        className="mt-12"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
