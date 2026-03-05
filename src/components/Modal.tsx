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
          w-full max-w-md bg-card
          border border-border rounded-3xl
          shadow-2xl overflow-hidden backdrop-blur-3xl
          transform transition-all duration-300
          animate-in zoom-in-95 fade-in duration-300
          ${className}
        `}
      >
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-foreground tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full bg-foreground/5 text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-8 py-6 space-y-6">{children}</div>
        {footer && (
          <div className="px-8 py-6 bg-foreground/[0.02] flex gap-4 justify-end border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
