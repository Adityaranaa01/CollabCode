"use client";

import React, { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { ParticipantAvatar } from "@/components/ParticipantAvatar";
import { ChatMessage } from "@/components/ChatMessage";
import {
  FileText,
  Search,
  GitBranch,
  Bug,
  User,
  Send,
  X,
  Code2,
} from "lucide-react";

export default function RoomClient() {
  const [activeTab, setActiveTab] = useState<"terminal" | "console" | "output">("terminal");

  return (
    <div className="bg-background-dark font-display text-slate-100 overflow-hidden h-screen flex flex-col">
      {/* Top Bar */}
      <TopBar roomName="Frontend-Fixes" showLiveBadge />

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Mini Sidebar */}
        <aside className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-6 bg-black/20 backdrop-blur-md z-10">
          <FileText className="w-5 h-5 text-primary cursor-pointer" />
          <Search className="w-5 h-5 text-slate-500 hover:text-slate-300 cursor-pointer" />
          <GitBranch className="w-5 h-5 text-slate-500 hover:text-slate-300 cursor-pointer" />
          <Bug className="w-5 h-5 text-slate-500 hover:text-slate-300 cursor-pointer" />
          <div className="mt-auto flex flex-col gap-4">
            <User className="w-5 h-5 text-slate-500 hover:text-slate-300 cursor-pointer" />
          </div>
        </aside>

        {/* Code Editor Area */}
        <section className="flex-1 flex flex-col bg-black/40 backdrop-blur-sm relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />
          </div>

          {/* File Tabs */}
          <div className="flex h-10 border-b border-white/5 bg-black/60 backdrop-blur-md">
            <div className="flex items-center px-4 gap-2 bg-white/5 border-t-2 border-primary text-slate-100 text-xs font-medium cursor-default shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              App.tsx
              <X className="w-2.5 h-2.5 text-slate-500 ml-2 cursor-pointer hover:text-slate-300" />
            </div>
            <div className="flex items-center px-4 gap-2 text-slate-500 text-xs font-medium cursor-pointer hover:bg-white/5">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              Header.tsx
            </div>
            <div className="flex items-center px-4 gap-2 text-slate-500 text-xs font-medium cursor-pointer hover:bg-white/5">
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              index.css
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-auto custom-scrollbar font-mono text-[13px] leading-6 flex">
            {/* Line Numbers */}
            <div className="w-12 text-right pr-4 py-4 text-slate-700 bg-[#0b0814] select-none">
              {Array.from({ length: 20 }, (_, i) => (
                <React.Fragment key={i}>
                  {i + 1}
                  <br />
                </React.Fragment>
              ))}
            </div>
            {/* Code Text */}
            <div className="flex-1 py-4 px-2 relative">
              <div className="whitespace-pre">
                <span className="text-pink-500">import</span> React, &#123; useState &#125;{" "}
                <span className="text-pink-500">from</span>{" "}
                <span className="text-emerald-400">&apos;react&apos;</span>;
              </div>
              <div className="whitespace-pre">
                <span className="text-pink-500">import</span> &#123; Layout &#125;{" "}
                <span className="text-pink-500">from</span>{" "}
                <span className="text-emerald-400">&apos;./components&apos;</span>;
              </div>
              <div className="whitespace-pre">&nbsp;</div>
              <div className="whitespace-pre">
                <span className="text-primary font-bold">export const</span>{" "}
                <span className="text-blue-400">App</span> = () =&gt; &#123;
              </div>
              <div className="whitespace-pre">
                {"  "}
                <span className="text-primary font-bold">const</span> [count,
                setCount] = <span className="text-blue-400">useState</span>(
                <span className="text-orange-400">0</span>);
              </div>
              <div className="whitespace-pre">&nbsp;</div>
              <div className="whitespace-pre">
                {"  "}
                <span className="text-slate-500">
                  {"// Collaboration cursor simulation"}
                </span>
              </div>
              <div className="whitespace-pre">
                {"  "}
                <span className="text-pink-500">return</span> (
              </div>
              <div className="whitespace-pre">
                {"    "}
                <span className="text-blue-300">&lt;Layout&gt;</span>
              </div>
              <div className="whitespace-pre">
                {"      "}
                <span className="text-blue-300">&lt;div</span>{" "}
                <span className="text-orange-300">className</span>=
                <span className="text-emerald-400">&quot;flex p-4&quot;</span>
                <span className="text-blue-300">&gt;</span>
              </div>
              <div className="whitespace-pre relative">
                {"        "}
                <span className="text-blue-300">&lt;h1&gt;</span>Live Room:
                Frontend-Fixes
                <span className="text-blue-300">&lt;/h1&gt;</span>
                {/* Blinking Cursor with label */}
                <span className="inline-block w-[2px] h-4 bg-primary align-middle ml-[2px] animate-pulse shadow-[0_0_8px_rgba(137,90,246,0.8)]" />
                <span className="bg-primary px-1.5 py-0.5 rounded-sm text-[9px] -mt-5 absolute ml-1 text-white font-bold shadow-lg flex items-center gap-1 font-sans">
                  Alex typing...
                </span>
              </div>
              <div className="whitespace-pre">
                {"        "}
                <span className="text-blue-300">&lt;button</span>{" "}
                <span className="text-orange-300">onClick</span>=&#123;
                <span className="text-blue-400">
                  () =&gt; setCount(count + 1)
                </span>
                &#125;
                <span className="text-blue-300">&gt;</span>
              </div>
              <div className="whitespace-pre">
                {"          "}Count is: &#123;count&#125;
              </div>
              <div className="whitespace-pre">
                {"        "}
                <span className="text-blue-300">&lt;/button&gt;</span>
              </div>
              <div className="whitespace-pre">
                {"      "}
                <span className="text-blue-300">&lt;/div&gt;</span>
              </div>
              <div className="whitespace-pre">
                {"    "}
                <span className="text-blue-300">&lt;/Layout&gt;</span>
              </div>
              <div className="whitespace-pre">{"  "});</div>
              <div className="whitespace-pre">&#125;;</div>
            </div>
          </div>

          {/* Console / Terminal */}
          <div className="h-40 border-t border-primary/20 bg-[#0d0a16] flex flex-col">
            <div className="flex items-center px-4 h-8 gap-6 border-b border-primary/5">
              {(["terminal", "console", "output"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] font-bold uppercase tracking-widest h-full cursor-pointer ${
                    activeTab === tab
                      ? "text-slate-100 border-b-2 border-primary"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <button
                className="ml-auto text-slate-500 hover:text-slate-300 cursor-pointer"
                aria-label="Close terminal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 p-3 font-mono text-[11px] overflow-auto custom-scrollbar">
              <div className="flex gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-slate-300">frontend-fixes</span>
                <span className="text-primary">git:(main)</span>
                <span className="text-slate-100">npm run dev</span>
              </div>
              <div className="text-slate-400 mt-1">
                VITE v4.3.9 ready in 125 ms
              </div>
              <div className="text-slate-400">
                ➜ Local:{" "}
                <span className="text-blue-400">http://localhost:5173/</span>
              </div>
              <div className="text-slate-400">
                ➜ Network: use --host to expose
              </div>
              <div className="text-slate-500 mt-2">
                10:45:22 PM [vite] hmr update /src/App.tsx
              </div>
              <div className="text-emerald-500 mt-1">
                ✓ Compiled successfully.
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="w-80 border-l border-white/5 flex flex-col bg-black/60 backdrop-blur-xl z-10">
          {/* Participants */}
          <div className="p-4 border-b border-primary/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Active Participants
              </h3>
              <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 rounded">
                4 Total
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {/* Participant 1 */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5">
                  <ParticipantAvatar
                    initials="AS"
                    color="purple"
                    status="online"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">
                      Alex S.
                    </span>
                    <span className="text-[9px] text-primary/80">
                      Editing App.tsx
                    </span>
                  </div>
                </div>
              </div>
              {/* Participant 2 */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <ParticipantAvatar
                    initials="JD"
                    color="orange"
                    status="online"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-100">
                      Jordan D. (You)
                    </span>
                    <span className="text-[9px] text-slate-500">
                      Viewing App.tsx
                    </span>
                  </div>
                </div>
              </div>
              {/* Participant 3 */}
              <div className="flex items-center justify-between opacity-60 group">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <ParticipantAvatar
                    initials="ML"
                    color="blue"
                    status="offline"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-300">
                      Maria L.
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium italic">
                      Away
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-primary/5 flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Room Chat
              </h3>
            </div>
            <div className="flex-1 overflow-auto p-4 flex flex-col gap-4 custom-scrollbar">
              <ChatMessage
                sender="Alex S."
                time="10:42 PM"
                message="I'm adding the useState hook now to handle the count state."
                color="primary"
              />
              <ChatMessage
                sender="You"
                time="10:44 PM"
                message="Looks good! Let me check the layout component constraints."
                isOwn
              />
              <ChatMessage
                sender="Maria L."
                time="10:45 PM"
                message="Should we use a reducer instead if it gets more complex?"
                color="blue"
              />
              {/* Typing indicator */}
              <div className="flex items-center gap-2 opacity-50">
                <span className="text-[10px] font-medium text-slate-500 italic">
                  Alex is typing
                </span>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-500 rounded-full dot" />
                  <span className="w-1 h-1 bg-slate-500 rounded-full dot" />
                  <span className="w-1 h-1 bg-slate-500 rounded-full dot" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-background-dark">
              <div className="relative">
                <input
                  className="w-full bg-slate-800/50 border border-primary/20 rounded-lg py-2 pl-3 pr-10 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none text-slate-100 placeholder:text-slate-600"
                  placeholder="Type a message..."
                  type="text"
                />
                <button
                  className="absolute right-2 top-1.5 text-primary hover:text-primary/80 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Status Bar */}
      <footer className="h-6 bg-primary/90 backdrop-blur-md flex items-center px-3 justify-between text-[10px] text-white font-medium select-none shadow-[0_-4px_12px_rgba(137,90,246,0.2)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
            <GitBranch className="w-3 h-3" />
            main*
          </div>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
            0 ↓ 1 ↑
          </div>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
            ⓘ 0 ⚠ 2
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hover:bg-white/10 px-1 cursor-pointer">UTF-8</div>
          <div className="hover:bg-white/10 px-1 cursor-pointer">
            TypeScript JSX
          </div>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
            ✓ Prettier
          </div>
        </div>
      </footer>
    </div>
  );
}
