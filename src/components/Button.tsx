import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_20px_rgba(137,90,246,0.4)] hover:shadow-[0_0_25px_rgba(137,90,246,0.5)] active:scale-[0.98]",
  secondary:
    "bg-white/5 hover:bg-white/10 text-slate-300 font-medium border border-white/5 hover:border-primary/50",
  ghost:
    "bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium",
  outline:
    "bg-transparent border border-primary/20 text-slate-200 font-bold hover:bg-primary/10",
  gradient:
    "bg-gradient-to-r from-primary to-[#a885f8] text-white font-bold hover:opacity-90 shadow-[0_0_20px_rgba(137,90,246,0.4)] active:scale-95",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-8 py-3 text-base rounded-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
  disabled = false,
  ariaLabel,
  type = "button",
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
