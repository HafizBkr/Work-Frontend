"use client";

import React, { useRef } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  length?: number;
  className?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  className = "",
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newValue = [...value];
    newValue[idx] = val.slice(-1);
    onChange(newValue);
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  return (
    <div className={`flex justify-center space-x-3 ${className}`}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black transition-all"
          value={value[idx]}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          autoFocus={idx === 0}
          aria-label={`Chiffre ${idx + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
