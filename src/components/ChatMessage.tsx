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
  blue: "text-accent",
  default: "text-foreground",
};

const bubbleColorMap = {
  primary: "bg-primary/10 rounded-tl-none",
  blue: "bg-accent/10 rounded-tl-none",
  default: "bg-muted rounded-tr-none",
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
            <span className="text-[10px] text-foreground/40">{time}</span>
            <span className="text-xs font-bold text-foreground">{sender}</span>
          </>
        ) : (
          <>
            <span className={`text-xs font-bold ${senderColorMap[color] || senderColorMap.primary}`}>
              {sender}
            </span>
            <span className="text-[10px] text-foreground/40">{time}</span>
          </>
        )}
      </div>
      <p
        className={`text-xs p-2 rounded-lg text-foreground/80 ${
          isOwn ? bubbleColorMap.default : (bubbleColorMap[color] || bubbleColorMap.primary)
        }`}
      >
        {message}
      </p>
    </div>
  );
};
