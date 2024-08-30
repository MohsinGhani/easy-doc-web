"use client";

import { cn } from "@/lib/utils";
import { Menu } from "@/components/layout/menu";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { useSidebarToggle } from "@/lib/features/sidebar/sidebarSlice";
import React from "react";

export function Sidebar() {
  const sidebar = useSidebarToggle();

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    const listener = () => {
      if (mediaQuery.matches) {
        sidebar?.isOpen && sidebar?.setIsOpen?.();
      }
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [sidebar]);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-30 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-[280px]"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full py-4 flex flex-col gap-6">
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
