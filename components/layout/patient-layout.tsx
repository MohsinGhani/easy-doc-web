"use client";

import { cn } from "@/lib/utils";

interface PatientLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function PatientLayout({
  children,
  className = "",
}: PatientLayoutProps) {
  return (
    <>
      <div
        className={cn(
          "w-full max-w-[1440px] mx-auto pt-6 pb-24 lg:px-6 px-4 sm:px-8",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
