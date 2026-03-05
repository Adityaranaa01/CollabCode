"use client";

import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between py-2 ${className}`}>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-semibold text-foreground">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-foreground/40">{description}</span>
          )}
        </div>
      )}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={label}
        />
        <div
          className={`
            w-11 h-6 bg-muted border border-border
            rounded-full peer
            peer-checked:bg-primary
            after:content-[''] after:absolute
            after:top-[2px] after:start-[2px]
            after:bg-foreground after:rounded-full
            after:h-5 after:w-5 after:transition-all
            peer-checked:after:translate-x-full
            shadow-inner
          `}
        />
      </label>
    </div>
  );
};
