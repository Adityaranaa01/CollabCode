"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import { RoomCard } from "@/components/RoomCard";
import { Modal } from "@/components/Modal";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import { Search, PlusCircle, ChevronDown, LogOut } from "lucide-react";

interface RoomData {
  name: string;
  language: string;
  onlineCount: number;
  status: "live" | "idle";
  gradient: string;
}

const rooms: RoomData[] = [
  {
    name: "API Refactor",
    language: "TypeScript",
    onlineCount: 3,
    status: "live",
    gradient: "bg-gradient-to-br from-primary/20 to-blue-500/20",
  },
  {
    name: "Frontend Auth",
    language: "React",
    onlineCount: 5,
    status: "live",
    gradient: "bg-gradient-to-br from-cyan-500/20 to-primary/20",
  },
  {
    name: "Database Migration",
    language: "PostgreSQL",
    onlineCount: 1,
    status: "idle",
    gradient: "bg-gradient-to-br from-slate-500/20 to-slate-800/20",
  },
  {
    name: "Docs Sync",
    language: "Markdown",
    onlineCount: 2,
    status: "live",
    gradient: "bg-gradient-to-br from-indigo-500/20 to-primary/20",
  },
  {
    name: "UI Kit Update",
    language: "Figma",
    onlineCount: 4,
    status: "live",
    gradient: "bg-gradient-to-br from-pink-500/20 to-primary/20",
  },
  {
    name: "Legacy Support",
    language: "Java",
    onlineCount: 0,
    status: "idle",
    gradient: "bg-gradient-to-br from-amber-500/10 to-orange-900/20",
  },
];

const filters = ["All Rooms", "Active", "Idle"];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("All Rooms");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click-outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (activeFilter === "Active") return room.status === "live";
    if (activeFilter === "Idle") return room.status === "idle";
    return true;
  });

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <ProtectedRoute>
    <div className="flex h-screen overflow-hidden bg-background-dark">
      {/* Sidebar */}
      <Sidebar activeItem="Rooms" onCreateRoom={() => setIsModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background-dark">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#050308]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Workspace / <span className="text-slate-200">Rooms</span>
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                className="w-full pl-9 pr-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-xs focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-600"
                placeholder="Search rooms..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="size-8 rounded-full bg-slate-800 border border-white/5 overflow-hidden flex items-center justify-center text-[10px] font-bold cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
            >
              {initials}
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#0d0a14] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-semibold text-white truncate">{user?.displayName}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={async () => {
                    setShowUserMenu(false);
                    await logout();
                    router.push("/auth");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1400px] mx-auto p-8">
            {/* Narrative Header Section */}
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, {user?.displayName?.split(" ")[0] || "there"}.
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  You have <span className="text-primary">6 active rooms</span>{" "}
                  and <span className="text-slate-300">12 collaborators</span>{" "}
                  online.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                className="!shadow-none font-bold tracking-wide uppercase text-[11px]"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusCircle className="w-4 h-4" />
                Create Room
              </Button>
            </div>

            {/* Filter Navigation */}
            <div className="flex gap-8 border-b border-white/5 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`pb-4 text-sm font-medium transition-all relative cursor-pointer ${
                    activeFilter === filter
                      ? "text-primary"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {filter}
                  {activeFilter === filter && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Asymmetric Layout - Linear Style */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Featured Room (Larger) */}
              {filteredRooms.length > 0 && (
                <div className="lg:col-span-8">
                  <RoomCard {...filteredRooms[0]} className="h-full !p-8" />
                </div>
              )}

              {/* Secondary Grid */}
              <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                {filteredRooms.slice(1, 3).map((room) => (
                  <RoomCard key={room.name} {...room} />
                ))}
              </div>

              {/* Remaining Rooms in a row */}
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.slice(3).map((room) => (
                  <RoomCard key={room.name} {...room} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Room Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Room"
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              className="text-[11px] font-bold uppercase tracking-wider"
              onClick={() => setIsModalOpen(false)}
              ariaLabel="Cancel creating room"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              className="!shadow-none text-[11px] font-bold uppercase tracking-wider"
              ariaLabel="Create room"
            >
              Create Room
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Room Name
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Refactor"
            className="w-full h-11 bg-white/[0.03] border border-white/5 rounded-lg px-4 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Programming Language
          </label>
          <div className="relative">
            <select className="w-full h-11 bg-white/[0.03] border border-white/5 rounded-lg px-4 text-sm text-white appearance-none focus:ring-1 focus:ring-primary/50 outline-none transition-all cursor-pointer [&>option]:bg-[#0a0a0a] [&>option]:text-white">
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="javascript">JavaScript</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <Toggle
          checked={isPrivate}
          onChange={setIsPrivate}
          label="Private Room"
          description="Only invited members can join"
        />
      </Modal>
    </div>
    </ProtectedRoute>
  );
}
