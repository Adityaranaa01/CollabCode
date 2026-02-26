import React from "react";
import { Logo } from "./Logo";
import { ParticipantAvatar } from "./ParticipantAvatar";
import { Share, Settings } from "lucide-react";
import { Button } from "./Button";

interface TopBarProps {
  roomName?: string;
  showLiveBadge?: boolean;
  participants?: { initials: string; color: "purple" | "orange" | "blue" | "emerald" }[];
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  roomName = "Frontend-Fixes",
  showLiveBadge = true,
  participants = [
    { initials: "JD", color: "purple" },
    { initials: "AS", color: "emerald" },
    { initials: "+2", color: "orange" },
  ],
  className = "",
}) => {
  return (
    <header
      className={`flex items-center justify-between h-14 px-4 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 ${className}`}
    >
      <div className="flex items-center gap-4">
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
        <div className="flex -space-x-2 mr-2">
          {participants.map((p, i) => (
            <ParticipantAvatar
              key={i}
              initials={p.initials}
              color={p.color}
              size="md"
              status="online"
              className="border-2 border-background-dark"
            />
          ))}
        </div>
        <Button variant="primary" size="sm" ariaLabel="Share room">
          <Share className="w-3.5 h-3.5" />
          Share
        </Button>
        <button
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Room settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
