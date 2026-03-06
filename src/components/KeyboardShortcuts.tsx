"use client";

import React from "react";
import { Modal } from "@/components/Modal";

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: "General",
    shortcuts: [
      { keys: ["Ctrl", "S"], description: "Save (downloads file)" },
      { keys: ["Ctrl", "Shift", "P"], description: "Command Palette" },
      { keys: ["Ctrl", "Shift", "?"], description: "Toggle shortcuts" },
      { keys: ["Ctrl", ","], description: "Editor settings" },
    ],
  },
  {
    title: "Editing",
    shortcuts: [
      { keys: ["Ctrl", "X"], description: "Cut line" },
      { keys: ["Ctrl", "C"], description: "Copy line" },
      { keys: ["Ctrl", "Shift", "K"], description: "Delete line" },
      { keys: ["Ctrl", "D"], description: "Select next occurrence" },
      { keys: ["Ctrl", "/"], description: "Toggle line comment" },
      { keys: ["Ctrl", "Shift", "A"], description: "Toggle block comment" },
      { keys: ["Alt", "↑"], description: "Move line up" },
      { keys: ["Alt", "↓"], description: "Move line down" },
      { keys: ["Ctrl", "Shift", "↑"], description: "Copy line up" },
      { keys: ["Ctrl", "Shift", "↓"], description: "Copy line down" },
      { keys: ["Tab"], description: "Indent" },
      { keys: ["Shift", "Tab"], description: "Outdent" },
    ],
  },
  {
    title: "Multi-Cursor",
    shortcuts: [
      { keys: ["Alt", "Click"], description: "Add cursor" },
      { keys: ["Ctrl", "Alt", "↑"], description: "Add cursor above" },
      { keys: ["Ctrl", "Alt", "↓"], description: "Add cursor below" },
      { keys: ["Ctrl", "Shift", "L"], description: "Select all occurrences" },
      { keys: ["Ctrl", "U"], description: "Undo cursor" },
    ],
  },
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["Ctrl", "G"], description: "Go to line" },
      { keys: ["Ctrl", "P"], description: "Quick open" },
      { keys: ["Ctrl", "Home"], description: "Go to start" },
      { keys: ["Ctrl", "End"], description: "Go to end" },
      { keys: ["Ctrl", "["], description: "Fold region" },
      { keys: ["Ctrl", "]"], description: "Unfold region" },
    ],
  },
  {
    title: "Search",
    shortcuts: [
      { keys: ["Ctrl", "F"], description: "Find" },
      { keys: ["Ctrl", "H"], description: "Find and Replace" },
      { keys: ["F3"], description: "Find next" },
      { keys: ["Shift", "F3"], description: "Find previous" },
    ],
  },
];

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts">
      <div className="space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
        {SHORTCUT_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2.5 px-1">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.shortcuts.map((s) => (
                <div
                  key={s.description}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-foreground/[0.03] transition-colors"
                >
                  <span className="text-xs text-foreground/70">
                    {s.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((key) => (
                      <kbd
                        key={key}
                        className="px-1.5 py-0.5 rounded bg-foreground/5 border border-border text-[10px] font-bold text-foreground/50 min-w-[22px] text-center"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
