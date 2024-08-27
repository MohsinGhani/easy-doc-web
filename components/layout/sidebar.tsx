"use client";

import { cn } from "@/lib/utils";
import { Menu } from "@/components/layout/menu";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { useSidebarToggle } from "@/lib/features/sidebar/sidebarSlice";

export function Sidebar() {
  const sidebar = useSidebarToggle();

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-[280px]"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
