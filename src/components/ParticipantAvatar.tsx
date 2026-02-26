import React from "react";

interface ParticipantAvatarProps {
  initials: string;
  color?: "purple" | "orange" | "blue" | "emerald";
  status?: "online" | "offline" | "away";
  size?: "sm" | "md";
  className?: string;
}

const colorMap = {
  purple: {
    bg: "bg-primary/30",
    border: "border-primary/40",
    text: "text-purple-200",
  },
  orange: {
    bg: "bg-orange-500/20",
    border: "border-orange-500/40",
    text: "text-orange-400",
  },
  blue: {
    bg: "bg-blue-500/20",
    border: "border-blue-500/40",
    text: "text-blue-400",
  },
  emerald: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
  },
};

const statusDotMap = {
  online: "bg-emerald-500",
  offline: "bg-slate-600",
  away: "bg-yellow-500",
};

const sizeMap = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-8 h-8 text-xs",
};

export const ParticipantAvatar: React.FC<ParticipantAvatarProps> = ({
  initials,
  color = "purple",
  status = "online",
  size = "sm",
  className = "",
}) => {
  const c = colorMap[color];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeMap[size]} rounded-full ${c.bg}
          flex items-center justify-center
          font-bold border ${c.border} ${c.text}
        `}
      >
        {initials}
      </div>
      {status && (
        <span
          className={`
            absolute -bottom-0.5 -right-0.5
            w-2.5 h-2.5 ${statusDotMap[status]}
            border-2 border-[#0d0a16] rounded-full
          `}
        />
      )}
    </div>
  );
};
