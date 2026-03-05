import React from "react";

interface ConsoleOutputProps {
  lines: ConsoleLineProps[];
  className?: string;
}

interface ConsoleLineProps {
  content: string;
  type?: "command" | "output" | "success" | "info" | "warning" | "path";
}

const typeColorMap = {
  command: "text-foreground",
  output: "text-foreground/40",
  success: "text-primary",
  info: "text-accent",
  warning: "text-yellow-500",
  path: "text-primary",
};

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  lines,
  className = "",
}) => {
  return (
    <div
      className={`font-mono text-[11px] overflow-auto custom-scrollbar ${className}`}
    >
      {lines.map((line, index) => (
        <div key={index} className={`${typeColorMap[line.type ?? "output"] || typeColorMap.output}`}>
          {line.content}
        </div>
      ))}
    </div>
  );
};

export type { ConsoleLineProps };
