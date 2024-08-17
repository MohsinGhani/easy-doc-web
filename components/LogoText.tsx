import React from "react";

interface LogoTextProps {
  className?: string;
  variant?: "lg" | "sm";
}

const LogoText = ({ className = "", variant = "lg" }: LogoTextProps) => {
  return (
    <h1 className={`text-3xl font-bold ${className}`}>
      {variant === "lg" ? (
        <>
          Easy<span className="text-primary">Doc</span>
        </>
      ) : (
        <>
          E<span className="text-primary">D</span>
        </>
      )}
    </h1>
  );
};

export default LogoText;
