"use client";

import { useState, useEffect } from "react";

export const useDelayedButton = (delay: number) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnabled(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isEnabled;
};
