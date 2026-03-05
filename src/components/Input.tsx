import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  label,
  icon,
  className = "",
  value,
  onChange,
  required,
  minLength,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 px-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          className={`
            w-full ${icon ? "pl-11" : "pl-5"} pr-5 py-3
            rounded-xl border border-border bg-card
            text-foreground font-bold text-sm
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            outline-none transition-all duration-300
            placeholder:text-foreground/20 shadow-inner
          `}
        />
      </div>
    </div>
  );
};
