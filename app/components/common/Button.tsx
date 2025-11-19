"use client";

import React from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonColor = "blue" | "red" | "gray";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit";
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
}

const getSizeClasses = (size: ButtonSize): string => {
  const sizeMap = {
    small: "py-2 px-3 text-sm",
    medium: "py-2 px-8 text-base",
    large: "w-full",
  };
  return sizeMap[size];
};

const getColorClasses = (color: ButtonColor): string => {
  const colorMap = {
    blue: "bg-[#5272FF] hover:bg-[#3c5cec] focus:ring-blue-500",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
    gray: "bg-[#8CA3CD] hover:bg-gray-600 focus:ring-gray-[#8CA3CD]",
  };
  return colorMap[color];
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false,
  type = "button",
  size = "medium",
  color = "blue",
  className,
}) => {
  const content = children;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${getColorClasses(
        color
      )} ${getSizeClasses(size)} ${className || ""}`}
    >
      {loading ? "Loading..." : content}
    </button>
  );
};
