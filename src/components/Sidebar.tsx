"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Layers, Settings, Plus, User, CreditCard } from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  activeItem?: string;
  onCreateRoom?: () => void;
  className?: string;
}

const navItems: SidebarItem[] = [
  {
    icon: <Layers className="w-5 h-5" />,
    label: "Rooms",
    href: "/dashboard",
  },
  {
    icon: <User className="w-5 h-5" />,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: "Pricing",
    href: "/plans",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/profile",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "Rooms",
  onCreateRoom,
  className = "",
}) => {
  return (
    <aside
      className={`w-64 flex-shrink-0 flex flex-col border-r border-border bg-background z-40 ${className}`}
    >
      <div className="h-16 flex items-center px-6 border-b border-border bg-background/40 backdrop-blur-md">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo size="md" showIcon={true} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col py-8 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-6">
          <p className="px-4 text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] mb-6">
            Main Navigation
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.label === activeItem;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    group flex items-center gap-3.5 px-4 py-3 rounded-xl
                    transition-all duration-300 relative overflow-hidden
                    ${
                      isActive
                        ? "text-primary font-black bg-primary/5 shadow-inner border-l-2 border-primary rounded-l-none"
                        : "text-foreground/40 hover:text-foreground hover:bg-primary/5"
                    }
                  `}
                >
                  <span
                    className={`transition-all duration-300 ${isActive ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]" : "text-foreground/20 group-hover:text-primary group-hover:scale-110"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-bold">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-0 w-1 h-4 bg-primary rounded-l-full shadow-[0_0_10px_rgba(var(--primary),0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-6 mt-auto border-t border-border bg-card/50 backdrop-blur-xl">
        <Button
          variant="primary"
          fullWidth
          onClick={onCreateRoom}
          className="!shadow-lg shadow-primary/20 active:scale-[0.98] transition-all font-black uppercase tracking-widest text-[11px] py-4 rounded-xl border-none hover:brightness-110"
          ariaLabel="Create new project"
        >
          <Plus className="w-4 h-4" />
          New Workspace
        </Button>
      </div>
    </aside>
  );
};
