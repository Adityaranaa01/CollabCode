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
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar activeItem="" />

        <main className="flex-1 flex flex-col overflow-hidden bg-background">
          <header className="h-16 flex items-center px-8 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="p-1.5 rounded-lg text-foreground/40 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                Account / <span className="text-foreground">Plans</span>
              </h2>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto p-8 space-y-12">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-black tracking-tight text-foreground">
                  Choose your plan
                </h1>
                <p className="text-foreground/40 text-sm font-medium max-w-lg mx-auto">
                  Scale your collaborative coding workflow with the right plan
                  for your team.
                </p>
              </div>

              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => {
                  const isCurrentPlan =
                    plan.name.toLowerCase() === currentPlan;
                  const isHighlighted = plan.highlight;

                  return (
                    <div
                      key={plan.name}
                      className={`
                        relative bg-card rounded-2xl border overflow-hidden
                        flex flex-col transition-all duration-300 shadow-2xl shadow-black/5
                        ${
                          isHighlighted
                            ? "border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                            : "border-border hover:border-primary/20"
                        }
                      `}
                    >
                      {plan.badge && (
                        <div className="absolute top-0 right-0">
                          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">
                            <Sparkles className="w-3 h-3" />
                            {plan.badge}
                          </div>
                        </div>
                      )}

                      <div className="p-8 flex-1 flex flex-col">
                        {/* Plan Name */}
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                          {plan.name}
                        </h3>

                        {/* Price */}
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-5xl font-black text-foreground tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-sm font-bold text-foreground/30 uppercase tracking-widest">
                            /{plan.period}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-xs font-medium text-foreground/50 leading-relaxed">
                          {plan.description}
                        </p>

                        {/* Features */}
                        <ul className="mt-8 space-y-4 flex-1">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 text-xs font-bold text-foreground/80 uppercase tracking-widest"
                            >
                              <div
                                className={`size-5 rounded-full flex items-center justify-center border ${
                                  isHighlighted
                                    ? "bg-primary/10 border-primary/20 shadow-lg shadow-primary/10"
                                    : "bg-background/30 border-border"
                                }`}
                              >
                                <Check
                                  className={`w-3 h-3 ${
                                    isHighlighted
                                      ? "text-primary"
                                      : "text-foreground/30"
                                  }`}
                                />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="mt-8 pt-8 border-t border-border">
                          {isCurrentPlan ? (
                            <div className="w-full py-3 px-5 rounded-xl bg-primary/5 border border-primary/10 text-center text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                              Current Plan
                            </div>
                          ) : (
                            <Button
                              variant={isHighlighted ? "primary" : "outline"}
                              size="lg"
                              fullWidth
                              className={`text-[11px] font-black uppercase tracking-widest rounded-xl py-4 transition-all shadow-lg ${
                                isHighlighted 
                                  ? "shadow-primary/20 hover:scale-[1.02]" 
                                  : "border-primary/30 text-primary hover:bg-primary/5"
                                }`}
                              ariaLabel={`Select ${plan.name} plan`}
                            >
                              {plan.price === "$0"
                                ? "Downgrade"
                                : "Upgrade Workspace"}
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
