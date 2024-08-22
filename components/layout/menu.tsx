"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/layout/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Ellipsis, LogOut } from "lucide-react";
import {
  getFilteredMenuList,
  getMenuList,
} from "@/components/layout/menu-list";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchInput from "../SearchInput";
import { useEffect, useState } from "react";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const [menuList, setMenuList] = useState(getMenuList(pathname));
  const [value, setValue] = useState("");
  const { signout } = useAuth();
  const { avatar, email, family_name, given_name } = useAppSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    const filteredMenu = getFilteredMenuList(pathname, value);
    setMenuList(filteredMenu);
  }, [value, pathname]);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <div
        className={cn("mb-6 mt-6 w-[90%] mx-auto", {
          hidden: !isOpen,
        })}
      >
        <SearchInput searchKey="search" value={value} setValue={setValue} />
      </div>

      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className="flex items-start">
                    <Avatar
                      className={cn(
                        "w-8 h-8 mr-2",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      <AvatarImage src={avatar} alt="Avatar" />
                      <AvatarFallback className="bg-transparent">
                        JD
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={cn(
                        "whitespace-nowrap flex flex-col items-start gap-0 text-xs",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      <h6>{given_name + " " + family_name}</h6>
                      <span>{email}</span>
                    </div>

                    <Button
                      onClick={signout}
                      variant="ghost"
                      className="w-full justify-center flex-1"
                    >
                      <span className={cn(isOpen === false ? "" : "mr-4")}>
                        <LogOut size={18} />
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
