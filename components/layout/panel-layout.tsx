"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { useSidebarToggle } from "@/lib/features/sidebar/sidebarSlice";
import "@/app/globals.css";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebarToggle();

  if (!sidebar) return null;

  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
