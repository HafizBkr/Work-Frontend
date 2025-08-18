import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
}

export default function Drawer({
  open,
  onClose,
  children,
  width = 480, // default width in px
}: DrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full z-50 bg-white shadow-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          rounded-l-2xl flex flex-col
        `}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          minWidth: 320,
          maxWidth: "100vw",
        }}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  );
}
