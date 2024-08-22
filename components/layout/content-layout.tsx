"use client";

import { Navbar } from "@/components/layout/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <>
      <Navbar title={title} />
      <div className="w-full max-w-[1440px] mx-auto pt-6 pb-24 lg:px-6 px-4 sm:px-8">
        {children}
      </div>
    </>
  );
}
