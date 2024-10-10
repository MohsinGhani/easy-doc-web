"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { notificationThunks } from "@/lib/features/notification/notificationThunks";
import { useEffect } from "react";
import { Loader } from "./Loader";
import { useRouter } from "next/navigation";

export function Notifications() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { allNotifications, loading, lastEvaluatedKey } = useAppSelector(
    (state) => state.notification
  );
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.userId) dispatch(notificationThunks.fetchAllNotifications());
  }, [dispatch, user?.userId]);

  const handleNotificationClick = (e: Notification) => {
    // Make notification as read
    dispatch(notificationThunks.makeNotificationsRead(e.notificationId));

    if (e.link) router.push(e.link);
  };

  const handleLoadMore = () => {
    dispatch(
      notificationThunks.fetchNotificationsWithPagination({
        startKey: lastEvaluatedKey,
      })
    );
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={"icon"}
                className="relative h-8 w-8 rounded-full"
              >
                <Bell className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        className="w-56 mt-1.5 max-h-96 overflow-y-auto"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal flex items-center justify-between gap-3">
          My notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem className="min-h-52 flex items-center justify-center">
            <Loader />
          </DropdownMenuItem>
        ) : allNotifications.length === 0 ? (
          <DropdownMenuItem className="min-h-52 flex items-center justify-center">
            No notifications
          </DropdownMenuItem>
        ) : (
          <DropdownMenuGroup>
            {allNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.notificationId}
                className="cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                {notification.message}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        )}
        {lastEvaluatedKey && (
          <Button
            onClick={handleLoadMore}
            className="w-full"
            size={"lg"}
            variant={"secondary"}
          >
            Load More
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
