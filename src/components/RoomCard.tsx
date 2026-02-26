import React from "react";
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { LanguageTag } from "./LanguageTag";

interface RoomCardProps {
  name: string;
  language: string;
  onlineCount: number;
  status: "live" | "idle";
  gradient: string;
  href?: string;
  className?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  name,
  language,
  onlineCount,
  status,
  gradient,
  href = "/room/1",
  className = "",
}) => {
  const isIdle = status === "idle";

  return (
    <Link
      href={href}
      className={`
        group block bg-[#0a0a0a] rounded-xl border border-white/5 p-5
        hover:border-primary/40 hover:bg-[#0d0d0d]
        hover:translate-y-[-2px] transition-all duration-300
        cursor-pointer relative overflow-hidden
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h3
            className={`text-lg font-semibold tracking-tight ${
              isIdle ? "text-slate-400" : "text-slate-100"
            }`}
          >
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <LanguageTag language={language} isActive={!isIdle} />
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
              {onlineCount} {onlineCount === 1 ? 'Collaborator' : 'Collaborators'}
            </span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="size-6 rounded-full border-2 border-[#0a0a0a] bg-slate-800 flex items-center justify-center text-[8px] font-bold">
              {String.fromCharCode(64 + i)}
            </div>
          ))}
          {onlineCount > 3 && (
            <div className="size-6 rounded-full border-2 border-[#0a0a0a] bg-primary/20 text-primary flex items-center justify-center text-[8px] font-bold">
              +{onlineCount - 3}
            </div>
          )}
        </div>
        
        <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest flex items-center gap-1">
          Join Workspace
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </span>
      </div>
    </Link>
  );
};
