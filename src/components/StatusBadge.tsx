import React from "react";

interface StatusBadgeProps {
  status: "live" | "idle" | "away";
  className?: string;
}

const statusConfig = {
  live: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    dotBg: "bg-green-500",
    label: "Live",
    animate: true,
  },
  idle: {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    dotBg: "bg-slate-400",
    label: "Idle",
    animate: false,
  },
  away: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    dotBg: "bg-yellow-400",
    label: "Away",
    animate: false,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const config = statusConfig[status];

  return (
    <div
      className={`
        px-1.5 py-0.5 rounded-md ${config.bg} ${config.text}
        text-[9px] font-bold uppercase tracking-widest
        flex items-center gap-1.5 backdrop-blur-md
        border border-white/5
        ${className}
      `}
    >
      <span
        className={`size-1 rounded-full ${config.dotBg} ${config.animate ? "animate-pulse" : ""}`}
      />
      {config.label}
    </div>
  );
};
