"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  getFilteredMenuList,
  getMenuList,
} from "@/components/layout/menu-list";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchInput from "../SearchInput";
import { useEffect, useState } from "react";
import LogoText from "../LogoText";
import ProfileCompletionCard from "./ProfileCompletion";
import { Separator } from "../ui/separator";

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

  // Separate the upper and lower menu items
  const upperMenuItems = menuList.filter(
    (item) => item.href !== "/faqs-and-support" && item.href !== "/settings"
  );
  const lowerMenuItems = menuList.filter(
    (item) => item.href === "/faqs-and-support" || item.href === "/settings"
  );

  return (
    <>
      <Link
        href="/dashboard"
        className="transition-transform ease-in-out duration-300 mb-1 text-center"
      >
        <LogoText
          variant={!isOpen ? "sm" : "lg"}
          className={cn(
            "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300"
          )}
        />
      </Link>

      <div
        className={cn("w-[90%] mx-auto space-y-6", {
          hidden: !isOpen,
        })}
      >
        <SearchInput searchKey="search" value={value} setValue={setValue} />

        <ProfileCompletionCard />
      </div>

      <nav className="w-full h-full flex flex-col overflow-y-auto">
        {/* Upper menu items */}
        <ul
          className={cn("flex-grow flex flex-col space-y-1 px-2", {
            "items-center": !isOpen,
          })}
        >
          {upperMenuItems.map(({ href, label, icon: Icon, active }, index) => (
            <li key={index} className="w-full">
              <div className="w-full" key={index}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger
                      asChild
                      className={cn(
                        "w-full h-10 mb-1",
                        buttonVariants({
                          variant: active ? "secondary" : "ghost",
                        })
                      )}
                    >
                      <Link href={href}>
                        <div
                          className={cn(
                            "flex items-center h-full w-full justify-start",
                            {
                              "justify-center": !isOpen,
                              "text-primary": active,
                            }
                          )}
                        >
                          <span className={cn(isOpen === false ? "" : "mr-3")}>
                            <Icon size={18} />
                          </span>
                          <p
                            className={cn(
                              "max-w-[200px] truncate",
                              isOpen === false
                                ? "-translate-x-96 opacity-0 hidden"
                                : "translate-x-0 opacity-100"
                            )}
                          >
                            {label}
                          </p>
                        </div>
                      </Link>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">{label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          ))}
        </ul>

        {/* Lower menu items (FAQ & Settings) */}
        <div className="flex flex-col justify-end">
          <ul className="space-y-1 px-2">
            {lowerMenuItems.map(
              ({ href, label, icon: Icon, active }, index) => (
                <li key={index} className="w-full">
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger
                          asChild
                          className={cn(
                            "w-full h-10 mb-1",
                            buttonVariants({
                              variant: active ? "secondary" : "ghost",
                            })
                          )}
                        >
                          <Link href={href}>
                            <div
                              className={cn(
                                "flex items-center h-full w-full justify-start",
                                {
                                  "justify-center": !isOpen,
                                  "text-primary": active,
                                }
                              )}
                            >
                              <span
                                className={cn(isOpen === false ? "" : "mr-3")}
                              >
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[200px] truncate",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </div>
                          </Link>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </li>
              )
            )}

            {/* Manually added Signout Button */}
            <li className="w-full flex items-end pr-5">
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild className="w-full">
                    <div className="flex flex-col">
                      <Separator className="w-full my-6" />
                      <div className="flex items-start gap-6">
                        <div className="items-start hidden sm:flex">
                          <Avatar
                            className={cn(
                              "w-8 h-8 mr-2",
                              isOpen === false
                                ? "opacity-0 hidden"
                                : "opacity-100"
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
                              isOpen === false
                                ? "opacity-0 hidden"
                                : "opacity-100"
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
                            <span
                              className={cn(isOpen === false ? "" : "mr-4")}
                            >
                              <LogOut size={18} />
                            </span>
                          </Button>
                        </div>

                        <Button
                          onClick={signout}
                          variant="ghost"
                          className="w-full items-center justify-between flex sm:hidden"
                        >
                          Signout <LogOut size={18} />
                        </Button>
                      </div>
                    </div>
                  </TooltipTrigger>
                  {isOpen === false && (
                    <TooltipContent side="right">Sign out</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
