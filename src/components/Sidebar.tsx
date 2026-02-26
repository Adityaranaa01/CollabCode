"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Layers, History, Settings, FileText, Plus } from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarProps {
  activeItem?: string;
  onCreateRoom?: () => void;
  className?: string;
}

const navItems: SidebarItem[] = [
  { icon: <Layers className="w-[22px] h-[22px]" />, label: "Rooms", href: "/dashboard", active: true },
  { icon: <History className="w-[22px] h-[22px]" />, label: "Recent", href: "#" },
  { icon: <Settings className="w-[22px] h-[22px]" />, label: "Settings", href: "#" },
  { icon: <FileText className="w-[22px] h-[22px]" />, label: "Docs", href: "#" },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "Rooms",
  onCreateRoom,
  className = "",
}) => {
  return (
    <aside
      className={`w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-black ${className}`}
    >
      <div className="p-6">
        <Logo size="md" showIcon={true} />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.label === activeItem;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg
                transition-colors
                ${
                  isActive
                    ? "nav-glow text-primary font-medium"
                    : "text-slate-400 hover:bg-accent-dark"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <Button
          variant="primary"
          fullWidth
          onClick={onCreateRoom}
          className="glow-primary"
          ariaLabel="Create new project"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </Button>
      </div>
    </aside>
  );
};
