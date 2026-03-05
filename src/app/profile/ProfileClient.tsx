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
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar activeItem="" />

        <main className="flex-1 flex flex-col overflow-hidden bg-background">
          <header className="h-16 flex items-center px-8 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
              Account / <span className="text-foreground">Profile</span>
            </h2>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl mx-auto p-8 space-y-8">
              {/* Profile Header */}
              <div className="bg-card border border-border rounded-2xl p-10 shadow-2xl shadow-black/5">
                <div className="flex items-center gap-8">
                  <div className="size-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-3xl font-black text-primary shadow-lg shadow-primary/10">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                      {user?.displayName || "—"}
                    </h1>
                    {user?.username && (
                      <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">
                        @{user.username}
                      </p>
                    )}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground/40 uppercase tracking-widest">
                        <Mail className="w-3.5 h-3.5" />
                        {user?.email || "—"}
                      </div>
                      {user?.createdAt && (
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground/30 uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5" />
                          Joined {formatDate(user.createdAt)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Plan */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
                <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-foreground/5">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-primary" />
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                      Current Subscription
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 shadow-lg shadow-primary/10">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                      {user?.plan?.name || "Free Tier"}
                    </span>
                  </div>
                </div>

                <div className="px-8 py-8">
                  <div className="grid grid-cols-2 gap-6">
                    {planStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center gap-4 p-5 bg-foreground/5 rounded-xl border border-border hover:border-primary/20 transition-all group"
                      >
                        <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary/10 transition-colors">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-1">
                            {stat.label}
                          </p>
                          <p className="text-xl font-black text-foreground">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-border">
                    <Link href="/plans">
                      <Button
                        variant="primary"
                        size="lg"
                        className="shadow-lg shadow-primary/20 font-black tracking-widest uppercase text-[11px] rounded-xl px-10"
                        ariaLabel="View plans"
                      >
                        Upgrade Workspace
                        <ArrowRight className="w-4 h-4 ml-2" />
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
