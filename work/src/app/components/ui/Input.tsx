"use client";

import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      containerClassName = "",
      rightIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={containerClassName}>
        {label && (
          <div className="block text-sm font-medium text-gray-700 mb-1 select-none">
            {label}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`appearance-none relative block w-full px-3 py-3 ${rightIcon ? "pr-10" : ""} border ${
              error ? "border-red-500" : "border-gray-300"
            } placeholder-gray-500 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent ${className}`}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${props.id || props.name}-error` : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <p
            className="mt-1 text-sm text-red-600"
            id={`${props.id || props.name}-error`}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
