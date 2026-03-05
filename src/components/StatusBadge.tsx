import React from "react";

interface StatusBadgeProps {
  status: "live" | "idle" | "away";
  className?: string;
}

const statusConfig = {
  live: {
    bg: "bg-primary/10",
    text: "text-primary",
    dotBg: "bg-primary",
    label: "Live",
    animate: true,
  },
  idle: {
    bg: "bg-muted",
    text: "text-foreground/40",
    dotBg: "bg-foreground/40",
    label: "Idle",
    animate: false,
  },
  away: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    dotBg: "bg-yellow-500",
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
        border border-border
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
