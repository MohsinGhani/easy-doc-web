import React from "react";

const LogoText = ({ className = "" }: { className?: string }) => {
  return (
    <h1 className={`text-3xl font-bold ${className}`}>
      Easy<span className="text-primary">Doc</span>
    </h1>
  );
};

export default LogoText;
