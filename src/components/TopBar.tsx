"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./Logo";
import { ParticipantAvatar } from "./ParticipantAvatar";
import { Share, ArrowLeft, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button } from "./Button";

interface TopBarProps {
  roomName?: string;
  showLiveBadge?: boolean;
  participants?: { initials: string; color: "purple" | "orange" | "blue" | "emerald" }[];
  onShare?: () => void;
  onSettings?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  roomName = "Room",
  showLiveBadge = true,
  participants = [],
  onShare,
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
      className={`flex items-center justify-between h-14 px-4 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 ${className}`}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Logo size="sm" showIcon={true} />
        <span className="text-primary/60 font-medium">/</span>
        <span className="text-slate-100 text-sm font-bold">{roomName}</span>

        {showLiveBadge && (
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 shadow-[0_0_15px_rgba(137,90,246,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#895af6]" />
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">
              Live
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="sm" ariaLabel="Share room" onClick={onShare}>
          <Share className="w-3.5 h-3.5" />
          Share
        </Button>

        {/* User Avatar Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu((v) => !v)}
            className="size-8 rounded-full bg-primary/20 border border-primary/30 overflow-hidden flex items-center justify-center text-[10px] font-bold text-primary cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
          >
            {initials}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#0d0a14] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.displayName}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                {onSettings && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSettings();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Room Settings
                  </button>
                )}
              </div>
              <div className="border-t border-white/5 py-1">
                <button
                  onClick={async () => {
                    setShowUserMenu(false);
                    await logout();
                    router.push("/auth");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
