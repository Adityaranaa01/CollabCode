"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { roomApi, Room, DashboardData } from "@/lib/api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import { RoomCard } from "@/components/RoomCard";
import { Modal } from "@/components/Modal";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import { Search, PlusCircle, ChevronDown, LogOut, Loader2 } from "lucide-react";

const GRADIENTS = [
  "bg-gradient-to-br from-primary/20 to-blue-500/20",
  "bg-gradient-to-br from-cyan-500/20 to-primary/20",
  "bg-gradient-to-br from-indigo-500/20 to-primary/20",
  "bg-gradient-to-br from-pink-500/20 to-primary/20",
  "bg-gradient-to-br from-amber-500/10 to-orange-900/20",
  "bg-gradient-to-br from-slate-500/20 to-slate-800/20",
];

type FilterTab = "All Rooms" | "Owned" | "Joined" | "Public";
const filters: FilterTab[] = ["All Rooms", "Owned", "Joined", "Public"];

function roomGradient(index: number) {
  return GRADIENTS[index % GRADIENTS.length];
}

export default function DashboardPage() {
  const { accessToken, user, logout } = useAuth();
  const router = useRouter();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<FilterTab>("All Rooms");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomLanguage, setRoomLanguage] = useState("typescript");
  const [isPrivate, setIsPrivate] = useState(false);
  const [creating, setCreating] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const fetchDashboard = useCallback(async () => {
    if (!accessToken) return;

    try {
      setError(null);
      const data = await roomApi.getDashboard(accessToken);
      setDashboard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleCreateRoom() {
    if (!accessToken || !roomName.trim()) return;

    setCreating(true);
    try {
      await roomApi.createRoom(accessToken, {
        name: roomName.trim(),
        language: roomLanguage,
        isPublic: !isPrivate,
      });
      setIsModalOpen(false);
      setRoomName("");
      setRoomLanguage("typescript");
      setIsPrivate(false);
      await fetchDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room");
    } finally {
      setCreating(false);
    }
  }

  const allRooms: Room[] = dashboard
    ? [...dashboard.ownedRooms, ...dashboard.joinedRooms]
    : [];

  function getFilteredRooms(): Room[] {
    let rooms: Room[] = [];

    switch (activeFilter) {
      case "Owned":
        rooms = dashboard?.ownedRooms ?? [];
        break;
      case "Joined":
        rooms = dashboard?.joinedRooms ?? [];
        break;
      case "Public":
        rooms = dashboard?.publicRooms.rooms ?? [];
        break;
      default:
        rooms = allRooms;
        break;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rooms = rooms.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.language.toLowerCase().includes(q)
      );
    }

    return rooms;
  }

  const filteredRooms = getFilteredRooms();
  const totalRooms = allRooms.length;
  const totalMembers = allRooms.reduce(
    (sum, r) => sum + r._count.memberships,
    0
  );

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
      <Sidebar activeItem="Rooms" onCreateRoom={() => setIsModalOpen(true)} />

      <main className="flex-1 flex flex-col overflow-hidden bg-background-dark">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1400px] mx-auto p-8">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, {user?.displayName?.split(" ")[0] || "there"}.
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  You have{" "}
                  <span className="text-primary">{totalRooms} {totalRooms === 1 ? "room" : "rooms"}</span>{" "}
                  and{" "}
                  <span className="text-slate-300">{totalMembers} {totalMembers === 1 ? "collaborator" : "collaborators"}</span>{" "}
                  total.
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

            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={fetchDashboard}
                  className="mt-4 text-xs text-primary hover:underline cursor-pointer"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && filteredRooms.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 text-sm">
                  {searchQuery
                    ? "No rooms match your search."
                    : "No rooms yet. Create your first room to get started."}
                </p>
              </div>
            )}

            {!loading && !error && filteredRooms.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {filteredRooms.length > 0 && (
                  <div className="lg:col-span-8">
                    <RoomCard
                      name={filteredRooms[0].name}
                      language={filteredRooms[0].language}
                      onlineCount={filteredRooms[0]._count.memberships}
                      status={filteredRooms[0]._count.memberships > 1 ? "live" : "idle"}
                      gradient={roomGradient(0)}
                      href={`/room/${filteredRooms[0].id}`}
                      className="h-full !p-8"
                    />
                  </div>
                )}

                <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                  {filteredRooms.slice(1, 3).map((room, i) => (
                    <RoomCard
                      key={room.id}
                      name={room.name}
                      language={room.language}
                      onlineCount={room._count.memberships}
                      status={room._count.memberships > 1 ? "live" : "idle"}
                      gradient={roomGradient(i + 1)}
                      href={`/room/${room.id}`}
                    />
                  ))}
                </div>

                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.slice(3).map((room, i) => (
                    <RoomCard
                      key={room.id}
                      name={room.name}
                      language={room.language}
                      onlineCount={room._count.memberships}
                      status={room._count.memberships > 1 ? "live" : "idle"}
                      gradient={roomGradient(i + 3)}
                      href={`/room/${room.id}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

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
              onClick={handleCreateRoom}
              disabled={creating || !roomName.trim()}
            >
              {creating ? "Creating..." : "Create Room"}
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
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full h-11 bg-white/[0.03] border border-white/5 rounded-lg px-4 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Programming Language
          </label>
          <div className="relative">
            <select
              value={roomLanguage}
              onChange={(e) => setRoomLanguage(e.target.value)}
              className="w-full h-11 bg-white/[0.03] border border-white/5 rounded-lg px-4 text-sm text-white appearance-none focus:ring-1 focus:ring-primary/50 outline-none transition-all cursor-pointer [&>option]:bg-[#0a0a0a] [&>option]:text-white"
            >
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
