import React, { useRef, useState } from "react";

interface Option {
  value: string | number;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Sélectionner...",
  label,
  className = "",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu si clic en dehors
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && (
        <div className="block text-xs font-semibold text-black uppercase mb-1 select-none">
          {label}
        </div>
      )}
      <button
        type="button"
        className={`
          w-full flex items-center px-4 py-2 rounded-lg
          bg-gray-100 text-gray-900 border border-transparent
          transition
          ${open ? "ring-2 ring-purple-400" : ""}
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-purple-400"}
        `}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.icon && <span className="mr-2">{selected.icon}</span>}
        <span className={selected ? "" : "text-black"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className="ml-auto w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`
                w-full flex items-center px-4 py-2 text-left
                hover:bg-purple-50 transition
                ${value === opt.value ? "bg-purple-100 font-semibold" : ""}
              `}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.icon && <span className="mr-2">{opt.icon}</span>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
