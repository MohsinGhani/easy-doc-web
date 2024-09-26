import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button"; // Adjust the import path as needed
import { useAuth } from "@/hooks/useAuth"; // Adjust the import path as needed
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

interface DelayedResendButtonProps {
  email: string;
  delay?: number;
  runOnRender?: boolean;
  className?: string;
}

const DelayedResendButton: React.FC<DelayedResendButtonProps> = ({
  email,
  delay = 60,
  runOnRender = false,
  className,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { loading } = useAppSelector((state) => state.auth);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { resendConfirmationCode } = useAuth();

  // Function to start the timer
  const startTimer = () => {
    setIsEnabled(false); // Disable the button
    timerRef.current = setTimeout(() => {
      setIsEnabled(true); // Enable the button after the delay
    }, delay * 1000);
  };

  // Effect to handle the component mount behavior
  useEffect(() => {
    if (runOnRender) {
      if (email) {
        resendConfirmationCode({ email });
      }
    }
    startTimer();

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [email, delay, runOnRender]);

  // Handler for the button click
  const handleClick = () => {
    if (email) {
      resendConfirmationCode({ email });
    }

    // Reset the timer if it's already running
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    startTimer(); // Restart the timer
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!isEnabled || loading}
      variant="link"
      className={
        (cn("font-semibold text-primary hover:text-primary/80"), className)
      }
      type="button"
    >
      {loading ? "Resending..." : "Resend OTP"}
    </Button>
  );
};

export default DelayedResendButton;
