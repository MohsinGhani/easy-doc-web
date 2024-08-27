"use client";

import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

interface ContentLayoutProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function ContentLayout({
  title,
  children,
  className = "",
}: ContentLayoutProps) {
  return (
    <>
      <Navbar title={title} />
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
