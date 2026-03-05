import React from "react";

interface ParticipantAvatarProps {
  initials: string;
  color?: "teal" | "cyan" | "emerald" | "sky" | "purple";
  status?: "online" | "offline" | "away";
  size?: "sm" | "md";
  className?: string;
}

const colorMap = {
  teal: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary",
  },
  cyan: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    text: "text-accent",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  sky: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
  },
};

const statusDotMap = {
  online: "bg-primary",
  offline: "bg-foreground/20",
  away: "bg-yellow-500",
};

const sizeMap = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-8 h-8 text-xs",
};

export const ParticipantAvatar: React.FC<ParticipantAvatarProps> = ({
  initials,
  color = "teal",
  status = "online",
  size = "sm",
  className = "",
}) => {
  const c = colorMap[color as keyof typeof colorMap] || colorMap.teal;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeMap[size as keyof typeof sizeMap]} rounded-full ${c.bg}
          flex items-center justify-center
          font-black border ${c.border} ${c.text}
          shadow-lg
        `}
      >
        {initials}
      </div>
      {status && (
        <span
          className={`
            absolute -bottom-0.5 -right-0.5
            w-2.5 h-2.5 ${statusDotMap[status as keyof typeof statusDotMap]}
            border-2 border-card rounded-full
            shadow-lg
          `}
        />
      )}
    </div>
  );
};
