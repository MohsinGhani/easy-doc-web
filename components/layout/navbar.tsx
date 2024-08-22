"use client";

import { UserNav } from "@/components/layout/user-nav";
import { SheetMenu } from "@/components/layout/sheet-menu";
import { Bell } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="w-10 h-10 flex items-center justify-center bg-stone-100 rounded-3xl cursor-pointer">
            <Bell className="w-5 h-5" />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
