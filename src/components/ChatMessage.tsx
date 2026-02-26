import React from "react";

interface ChatMessageProps {
  sender: string;
  time: string;
  message: string;
  isOwn?: boolean;
  color?: "primary" | "blue" | "default";
  className?: string;
}

const senderColorMap = {
  primary: "text-primary",
  blue: "text-blue-400",
  default: "text-slate-100",
};

const bubbleColorMap = {
  primary: "bg-primary/10 rounded-tl-none",
  blue: "bg-blue-500/10 rounded-tl-none",
  default: "bg-slate-800 rounded-tr-none",
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  time,
  message,
  isOwn = false,
  color = "primary",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-1 ${isOwn ? "items-end" : ""} ${className}`}
    >
      <div className="flex items-baseline gap-2">
        {isOwn ? (
          <>
            <span className="text-[10px] text-slate-500">{time}</span>
            <span className="text-xs font-bold text-slate-100">{sender}</span>
          </>
        ) : (
          <>
            <span className={`text-xs font-bold ${senderColorMap[color]}`}>
              {sender}
            </span>
            <span className="text-[10px] text-slate-500">{time}</span>
          </>
        )}
      </div>
      <p
        className={`text-xs p-2 rounded-lg text-slate-300 ${
          isOwn ? bubbleColorMap.default : bubbleColorMap[color]
        }`}
      >
        {message}
      </p>
    </div>
  );
};
