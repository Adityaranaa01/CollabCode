"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-card border border-border text-foreground/60 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 animate-in zoom-in-50 duration-300" />
      ) : (
        <Moon className="w-5 h-5 animate-in zoom-in-50 duration-300" />
      )}
    </button>
  );
};
