"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/lib/hooks";
import { authThunks } from "@/lib/features/auth/authThunks";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserPopup() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const links = [
    {
      label: "Profile",
      location: "/profile",
    },
    {
      label: "Settings",
      location: "/profile/settings",
    },
    {
      label: "Support",
      location: "/profile/support",
    },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full w-8 h-8"
        >
          <Image
            src={
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=36&q=80"
            }
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {links.map((link: any) => {
          const { label, location } = link;
          return (
            <DropdownMenuLabel onClick={() => setOpen(false)} key={label}>
              <Link href={location}>{label}</Link>
            </DropdownMenuLabel>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(authThunks.signout(router));
            setOpen(false);
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
