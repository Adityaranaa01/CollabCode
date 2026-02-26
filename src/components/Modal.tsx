"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[12px] transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className={`
          w-full max-w-md bg-[#0a0a0a]
          border border-white/5 rounded-xl
          shadow-2xl overflow-hidden backdrop-blur-3xl
          transform transition-all duration-300
          ${className}
        `}
      >
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/5">
          <h3 className="text-lg font-bold text-white tracking-tight uppercase tracking-widest">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-6 space-y-6">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-white/[0.02] flex gap-3 justify-end border-t border-white/5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
