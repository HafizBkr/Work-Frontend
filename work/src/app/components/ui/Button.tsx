"use client";

import React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 select-none",
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
