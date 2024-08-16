"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { navLinks, navLinksForAuth } from "@/constants";
import LogoText from "../LogoText";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface LinkItem {
  label: string;
  location: string;
}

export default function Hamburber() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { signout } = useAuth();

  const handleSheetToggle = () => {
    setOpen(!open);
  };

  const handleSignout = () => {
    setOpen(!open);
    signout();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="@3xl:hidden"
          onClick={handleSheetToggle}
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <Link href="/" className="flex items-center gap-2 py-4">
          <LogoText />
        </Link>
        <nav className="grid gap-4">
          {isLoggedIn ? (
            <>
              {navLinksForAuth.map(
                ({ label, location }: LinkItem, index: number) => (
                  <Link
                    className="flex items-center gap-2 py-2 text-lg font-medium"
                    href={location}
                    key={index}
                  >
                    {label}
                  </Link>
                )
              )}

              <div className="grid gap-4">
                <Link
                  href={`/profile`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "rounded-full text-primary border-primary font-bold"
                  )}
                  onClick={handleSheetToggle}
                >
                  Profile
                </Link>

                <Button
                  className={cn(
                    buttonVariants({ size: "xl" }),
                    "rounded-full font-bold"
                  )}
                  onClick={handleSignout}
                >
                  Logo out
                </Button>
              </div>
            </>
          ) : (
            <>
              {navLinks.map(({ label, location }: LinkItem, index: number) => (
                <Link
                  className="flex items-center gap-2 py-2 text-lg font-medium"
                  href={location}
                  key={index}
                  onClick={handleSheetToggle}
                >
                  {label}
                </Link>
              ))}

              <div className="grid gap-4">
                <Link
                  href={`/auth/sign-up`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "rounded-full text-primary border-primary font-bold"
                  )}
                  onClick={handleSheetToggle}
                >
                  Register
                </Link>

                <Link
                  href={`/auth/sign-in`}
                  className={cn(
                    buttonVariants({ size: "xl" }),
                    "rounded-full font-bold"
                  )}
                  onClick={handleSheetToggle}
                >
                  Log In
                </Link>
              </div>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
