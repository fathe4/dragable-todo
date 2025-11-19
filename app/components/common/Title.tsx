"use client";

import React from "react";

interface TitleProps {
  title?: React.ReactNode;
  className?: string;
  underlineClassName?: string;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const sizeMap = {
  h1: "text-6xl",
  h2: "text-4xl",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
};

const Title: React.FC<TitleProps> = ({
  title,
  className = "",
  underlineClassName = "bg-blue-600",
  size = "h2", // default size
}) => {
  return (
    <h2
      className={`${sizeMap[size]} font-bold text-gray-900 relative inline-block ${className}`}
    >
      {title}
      <span
        className={`absolute bottom-0 left-0 w-1/2 h-0.5 ${underlineClassName}`}
      ></span>
    </h2>
  );
};

export default Title;
