"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";

const HelloText = () => {
  const {
    loading,
    user: { display_name },
  } = useAppSelector((state) => state.auth);

  if (loading) {
    // Return a skeleton loader when loading
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-44 mb-2"></div>
      </div>
    );
  }

  return (
    <h1 className="text-3xl font-semibold">
      Hello <span className="text-primary">{display_name}!</span>
    </h1>
  );
};

export default HelloText;
