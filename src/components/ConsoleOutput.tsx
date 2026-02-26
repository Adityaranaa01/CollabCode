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
  command: "text-slate-100",
  output: "text-slate-400",
  success: "text-emerald-500",
  info: "text-blue-400",
  warning: "text-yellow-400",
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
        <div key={index} className={`${typeColorMap[line.type ?? "output"]}`}>
          {line.content}
        </div>
      ))}
    </div>
  );
};

export type { ConsoleLineProps };
