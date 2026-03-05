import React from "react";

interface LanguageTagProps {
  language: string;
  isActive?: boolean;
  className?: string;
}

export const LanguageTag: React.FC<LanguageTagProps> = ({
  language,
  isActive = true,
  className = "",
}) => {
  return (
    <span
      className={`
        px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide
        transition-all duration-300
        ${
          isActive
            ? "bg-foreground/5 text-foreground/60 border border-border group-hover:border-primary/40 group-hover:text-primary"
            : "bg-transparent text-foreground/20 border border-border"
        }
        ${className}
      `}
    >
      {language}
    </span>
  );
};
