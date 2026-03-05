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
    "bg-primary text-primary-foreground font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold border border-border uppercase tracking-widest",
  ghost:
    "bg-transparent hover:bg-primary/5 text-foreground/60 hover:text-primary font-black uppercase tracking-widest",
  outline:
    "bg-transparent border border-primary/30 text-primary font-black hover:bg-primary/10 uppercase tracking-widest",
  gradient:
    "bg-gradient-to-r from-primary to-accent text-primary-foreground font-black hover:opacity-90 shadow-lg shadow-primary/30 active:scale-95 uppercase tracking-widest",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3.5 py-2 text-[10px] rounded-xl",
  md: "px-6 py-3 text-[11px] rounded-xl",
  lg: "px-10 py-4 text-xs rounded-2xl",
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
        inline-flex items-center justify-center gap-2.5
        transition-all duration-300 cursor-pointer
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
