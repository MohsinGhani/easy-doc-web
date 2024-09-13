"use client";

import Link from "next/link";
import { LifeBuoyIcon, LogOut, SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/hooks";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "../ui/switch";
import AvailabilitySwitch from "../doctor/AvailabilitySwitch";

export function UserNav() {
  const { user } = useAppSelector((state) => state.auth);
  const { signout } = useAuth();
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.picture} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {user.given_name.charAt(0) + user.family_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56 mt-1.5" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">My account</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">Available</span>
            <AvailabilitySwitch />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/settings" className="flex items-center">
              <SettingsIcon className="w-4 h-4 mr-3 text-muted-foreground" />
              Profile Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/settings" className="flex items-center">
              <LifeBuoyIcon className="w-4 h-4 mr-3 text-muted-foreground" />
              Support
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={signout}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
