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
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-400">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
            w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5
            rounded-lg border border-white/5 bg-white/5
            text-white
            focus:ring-2 focus:ring-primary/40 focus:border-primary/40
            outline-none transition-all
            placeholder:text-slate-600 shadow-sm
          `}
        />
      </div>
    </div>
  );
};
