"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/Button";
import {
  User,
  Mail,
  Calendar,
  Crown,
  Layers,
  Users,
  MessageSquare,
  Monitor,
  ArrowRight,
} from "lucide-react";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProfileClient() {
  const { user } = useAuth();

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  const planStats = [
    {
      icon: Layers,
      label: "Max Rooms",
      value: user?.plan?.maxRooms ?? "—",
    },
    {
      icon: Users,
      label: "Members per Room",
      value: user?.plan?.maxMembersPerRoom ?? "—",
    },
    {
      icon: MessageSquare,
      label: "Chat Retention",
      value: user?.plan?.chatRetentionDays
        ? `${user.plan.chatRetentionDays} days`
        : "—",
    },
    {
      icon: Monitor,
      label: "Active Sessions",
      value: user?.plan?.maxActiveSessions ?? "—",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-background-dark">
        <Sidebar activeItem="" />

        <main className="flex-1 flex flex-col overflow-hidden bg-background-dark">
          <header className="h-16 flex items-center px-8 bg-[#050308]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Account / <span className="text-slate-200">Profile</span>
            </h2>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl mx-auto p-8 space-y-8">
              {/* Profile Header */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8">
                <div className="flex items-center gap-6">
                  <div className="size-20 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-2xl font-bold text-primary">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                      {user?.displayName || "—"}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Mail className="w-3.5 h-3.5" />
                        {user?.email || "—"}
                      </div>
                      {user?.createdAt && (
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          Joined {formatDate(user.createdAt)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Plan */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">
                      Current Plan
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {user?.plan?.name || "Free"}
                    </span>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <div className="grid grid-cols-2 gap-6">
                    {planStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/5"
                      >
                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {stat.label}
                          </p>
                          <p className="text-lg font-bold text-slate-100">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5">
                    <Link href="/plans">
                      <Button
                        variant="primary"
                        size="md"
                        className="!shadow-none font-bold tracking-wide uppercase text-[11px]"
                        ariaLabel="View plans"
                      >
                        Upgrade Plan
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
