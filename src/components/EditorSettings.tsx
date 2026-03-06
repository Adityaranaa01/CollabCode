"use client";

import React, { useRef, useEffect } from "react";
import {
  Settings,
  Type,
  Map,
  WrapText,
  Hash,
  Indent,
  Minus,
  Plus,
} from "lucide-react";
import type { EditorSettings } from "@/lib/languageUtils";

interface EditorSettingsPopoverProps {
  settings: EditorSettings;
  onUpdate: (settings: EditorSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

function ToggleRow({
  label,
  icon: Icon,
  checked,
  onChange,
}: {
  label: string;
  icon: React.FC<{ className?: string }>;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-2.5">
        <Icon className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground/60 transition-colors" />
        <span className="text-xs font-medium text-foreground/70">{label}</span>
      </div>
      <div
        className={`w-8 h-[18px] rounded-full transition-colors relative ${
          checked ? "bg-primary" : "bg-foreground/10"
        }`}
      >
        <div
          className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm absolute top-[2px] transition-transform ${
            checked ? "translate-x-[17px]" : "translate-x-[2px]"
          }`}
        />
      </div>
    </button>
  );
}

export function EditorSettingsPopover({
  settings,
  onUpdate,
  isOpen,
  onClose,
}: EditorSettingsPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (partial: Partial<EditorSettings>) =>
    onUpdate({ ...settings, ...partial });

  return (
    <div
      ref={ref}
      className="fixed left-14 top-28 w-56 bg-card border border-border rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="px-3 py-2.5 border-b border-border bg-foreground/[0.02]">
        <div className="flex items-center gap-2">
          <Settings className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
            Editor Settings
          </span>
        </div>
      </div>

      <div className="py-1.5 px-1">
        {/* Font Size */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 transition-colors group">
          <div className="flex items-center gap-2.5">
            <Type className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground/60 transition-colors" />
            <span className="text-xs font-medium text-foreground/70">
              Font Size
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                update({ fontSize: Math.max(10, settings.fontSize - 1) })
              }
              className="p-0.5 rounded hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold text-foreground/80 w-5 text-center tabular-nums">
              {settings.fontSize}
            </span>
            <button
              onClick={() =>
                update({ fontSize: Math.min(24, settings.fontSize + 1) })
              }
              className="p-0.5 rounded hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Tab Size */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 transition-colors group">
          <div className="flex items-center gap-2.5">
            <Indent className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground/60 transition-colors" />
            <span className="text-xs font-medium text-foreground/70">
              Tab Size
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                update({ tabSize: settings.tabSize === 2 ? 4 : 2 })
              }
              className="px-2 py-0.5 rounded bg-foreground/5 hover:bg-foreground/10 text-xs font-bold text-foreground/70 tabular-nums cursor-pointer transition-colors"
            >
              {settings.tabSize}
            </button>
          </div>
        </div>

        <div className="h-px bg-border mx-2 my-1" />

        <ToggleRow
          label="Minimap"
          icon={Map}
          checked={settings.minimap}
          onChange={(v) => update({ minimap: v })}
        />
        <ToggleRow
          label="Word Wrap"
          icon={WrapText}
          checked={settings.wordWrap}
          onChange={(v) => update({ wordWrap: v })}
        />
        <ToggleRow
          label="Line Numbers"
          icon={Hash}
          checked={settings.lineNumbers}
          onChange={(v) => update({ lineNumbers: v })}
        />
      </div>
    </div>
  );
}
