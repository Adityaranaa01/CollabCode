"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./Logo";
import { ParticipantAvatar } from "./ParticipantAvatar";
import {
  Share,
  ArrowLeft,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Download,
} from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

interface TopBarProps {
  roomName?: string;
  showLiveBadge?: boolean;
  participants?: {
    initials: string;
    color: "teal" | "cyan" | "emerald" | "sky";
  }[];
  onShare?: () => void;
  onDownload?: () => void;
  onSettings?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  roomName = "Room",
  showLiveBadge = true,
  participants = [],
  onShare,
  onDownload,
  onSettings,
  className = "",
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <header
      className={`flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 ${className}`}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-1.5 rounded-lg text-foreground/40 hover:text-primary hover:bg-primary/5 transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Logo size="sm" showIcon={true} />
        <span className="text-foreground/20 font-black">/</span>
        <span className="text-foreground text-sm font-black uppercase tracking-tight">{roomName}</span>

        {showLiveBadge && (
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 shadow-lg shadow-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/60" />
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
              Live
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          ariaLabel="Download code"
          onClick={onDownload}
          className="text-foreground/60 hover:text-primary hover:bg-primary/5 border-none font-black uppercase tracking-widest text-[10px]"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </Button>

        <Button
          variant="primary"
          size="sm"
          ariaLabel="Share room"
          onClick={onShare}
          className="font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          <Share className="w-3.5 h-3.5" />
          Share
        </Button>

        <ThemeToggle />

        {/* User Avatar Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu((v) => !v)}
            className="size-8 rounded-full bg-primary/10 border border-primary/30 overflow-hidden flex items-center justify-center text-[10px] font-black text-primary cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all shadow-lg shadow-primary/10"
          >
            {initials}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-3 w-60 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="px-5 py-4 border-b border-border bg-background/20">
                <p className="text-sm font-black text-foreground truncate">
                  {user?.displayName}
                </p>
                <p className="text-xs text-foreground/40 truncate mt-0.5 font-medium">{user?.email}</p>
              </div>
              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 rounded-xl transition-colors group"
                >
                  <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold">Profile Settings</span>
                </Link>
                {onSettings && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSettings();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Settings className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-bold">Room Configuration</span>
                  </button>
                )}
              </div>
              <div className="p-2 border-t border-border bg-background/10">
                <button
                  onClick={async () => {
                    setShowUserMenu(false);
                    await logout();
                    router.push("/auth");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
