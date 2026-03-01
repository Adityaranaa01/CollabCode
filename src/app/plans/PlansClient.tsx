"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/Button";
import { Check, Sparkles, ArrowLeft } from "lucide-react";

interface PlanTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

const plans: PlanTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals exploring collaborative coding.",
    features: [
      "3 active rooms",
      "5 members per room",
      "7 days chat retention",
      "1 active session",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For teams who need more power and flexibility.",
    features: [
      "25 active rooms",
      "20 members per room",
      "90 days chat retention",
      "5 active sessions",
      "Priority support",
      "Custom room themes",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    price: "$29",
    period: "per month",
    description: "For organizations that require enterprise-grade features.",
    features: [
      "Unlimited rooms",
      "100 members per room",
      "Unlimited chat retention",
      "Unlimited sessions",
      "Dedicated support",
      "Custom room themes",
      "Admin dashboard",
      "SSO integration",
    ],
  },
];

export default function PlansClient() {
  const { user } = useAuth();
  const currentPlan = user?.plan?.name?.toLowerCase() || "free";

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-background-dark">
        <Sidebar activeItem="" />

        <main className="flex-1 flex flex-col overflow-hidden bg-background-dark">
          <header className="h-16 flex items-center px-8 bg-[#050308]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Account / <span className="text-slate-200">Plans</span>
              </h2>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto p-8 space-y-10">
              {/* Header */}
              <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Choose your plan
                </h1>
                <p className="text-slate-500 text-sm max-w-lg mx-auto">
                  Scale your collaborative coding workflow with the right plan
                  for your team.
                </p>
              </div>

              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const isCurrentPlan =
                    plan.name.toLowerCase() === currentPlan;
                  const isHighlighted = plan.highlight;

                  return (
                    <div
                      key={plan.name}
                      className={`
                        relative bg-[#0a0a0a] rounded-xl border overflow-hidden
                        flex flex-col transition-all duration-300
                        ${
                          isHighlighted
                            ? "border-primary/40 shadow-[0_0_30px_rgba(137,90,246,0.15)]"
                            : "border-white/5 hover:border-white/10"
                        }
                      `}
                    >
                      {plan.badge && (
                        <div className="absolute top-0 right-0">
                          <div className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
                            <Sparkles className="w-3 h-3" />
                            {plan.badge}
                          </div>
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col">
                        {/* Plan Name */}
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          {plan.name}
                        </h3>

                        {/* Price */}
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-white tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-sm text-slate-500">
                            /{plan.period}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                          {plan.description}
                        </p>

                        {/* Features */}
                        <ul className="mt-6 space-y-3 flex-1">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2.5 text-xs text-slate-300"
                            >
                              <div
                                className={`size-4 rounded-full flex items-center justify-center ${
                                  isHighlighted
                                    ? "bg-primary/20"
                                    : "bg-white/5"
                                }`}
                              >
                                <Check
                                  className={`w-2.5 h-2.5 ${
                                    isHighlighted
                                      ? "text-primary"
                                      : "text-slate-400"
                                  }`}
                                />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="mt-6 pt-6 border-t border-white/5">
                          {isCurrentPlan ? (
                            <div className="w-full py-2.5 px-5 rounded-lg bg-white/5 border border-white/10 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Current Plan
                            </div>
                          ) : (
                            <Button
                              variant={isHighlighted ? "primary" : "outline"}
                              size="md"
                              fullWidth
                              className="text-[11px] font-bold uppercase tracking-wider"
                              ariaLabel={`Select ${plan.name} plan`}
                            >
                              {plan.price === "$0"
                                ? "Downgrade"
                                : "Upgrade"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
