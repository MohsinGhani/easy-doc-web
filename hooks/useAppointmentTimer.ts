import { useState, useEffect } from "react";
import { formatTimeDiff } from "@/lib/utils"; // Utility for formatting time differences
import { formatInTimeZone } from "date-fns-tz";
import { useRouter } from "next/navigation";

export const useAppointmentTimer = (
  start_time: string | null,
  end_time: string | null,
  userRole: string | null
) => {
  const router = useRouter();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isAppointmentActive, setIsAppointmentActive] = useState<boolean>(true);

  useEffect(() => {
    // Ensure hook runs consistently
    if (!start_time || !end_time || !userRole) {
      setTimeRemaining("");
      setIsAppointmentActive(false);
      return;
    }

    const currentDate = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
    const startDateTimeString = `${currentDate}T${start_time}:00`;
    const endDateTimeString = `${currentDate}T${end_time}:00`;

    const startTime = new Date(
      formatInTimeZone(
        startDateTimeString,
        timezone,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      )
    );
    const endTime = new Date(
      formatInTimeZone(endDateTimeString, timezone, "yyyy-MM-dd'T'HH:mm:ssXXX")
    );

    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: timezone,
      });

      const now = new Date(currentTime);

      if (now >= startTime && now <= endTime) {
        setIsAppointmentActive(true);
        setTimeRemaining(formatTimeDiff(endTime.getTime() - now.getTime()));
      } else if (now < startTime) {
        setTimeRemaining(formatTimeDiff(startTime.getTime() - now.getTime()));
      } else {
        setIsAppointmentActive(false);
        setTimeRemaining("Appointment has ended.");
        handleMeetingEnd(endTime);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (redirectTimeout) {
        clearTimeout(redirectTimeout); // Clear timeout on unmount or rerun
      }
    };
  }, [start_time, end_time]);

  const handleMeetingEnd = (endTime: Date) => {
    const now = new Date();
    const timePassed = Math.floor((now.getTime() - endTime.getTime()) / 1000);

    if (timePassed >= 600) {
      router.push(
        userRole === "doctor"
          ? "/appointments?activeTab=completed"
          : "/my-appointments"
      );
    } else {
      const remainingTime = 600 - timePassed;
      const timeout = setTimeout(() => {
        router.push(
          userRole === "doctor"
            ? "/appointments?activeTab=completed"
            : "/my-appointments"
        );
      }, remainingTime * 1000);

      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }

      setRedirectTimeout(timeout);
    }
  };

  return { timeRemaining, isAppointmentActive };
};
