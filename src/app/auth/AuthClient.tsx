"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function AuthPageClient() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="bg-background-dark font-display text-white min-h-screen flex relative overflow-hidden">
      {/* Left Side - Brand/Experience Panel */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden border-r border-white/5 bg-gradient-to-b from-[#050308] via-[#0d0a14] to-[#050308]">
        {/* Animated Glow Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />

        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <Logo size="lg" showIcon={true} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
            Build together.
            <br />
            <span className="text-primary">Without limits.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-12">
            A real-time collaborative workspace for high-performance engineering
            teams.
          </p>

          {/* Collaboration Preview (Option C) */}
          <div className="relative bg-[#0d0a14]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl animate-float">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="ml-2 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                auth.ts
              </span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="flex gap-4">
                <span className="text-slate-600">1</span>
                <span>
                  <span className="text-purple-400">export const</span>{" "}
                  <span className="text-blue-400">useAuth</span> = () =&gt;
                  &#123;
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">2</span>
                <span className="pl-4 text-slate-300">
                  const [user, setUser] = useState(null);
                </span>
              </div>
              <div className="flex gap-4 relative">
                <span className="text-slate-600">3</span>
                <span className="pl-4 text-slate-300">
                  useEffect(() =&gt; &#123;
                </span>
                {/* Cursor Indicator */}
                <div className="absolute left-[160px] top-0 flex flex-col items-start gap-1">
                  <div className="w-0.5 h-5 bg-primary animate-blink" />
                  <div className="bg-primary text-[10px] px-1.5 py-0.5 rounded text-white font-bold whitespace-nowrap">
                    Aditya is typing...
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Chat Bubble */}
            <div className="absolute -right-4 -bottom-4 bg-primary px-4 py-2 rounded-2xl rounded-bl-none text-xs font-medium shadow-xl">
              Should we use JWT? 🚀
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background-dark">
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          <div className="lg:hidden flex flex-col items-center gap-3">
            <Logo size="lg" showIcon={true} />
            <p className="text-slate-400 text-sm">Build together, better.</p>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Enter your details to access your workspace
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
              {/* Tab Toggle - Segmented Control Style */}
              <div className="flex p-1 bg-white/5 m-4 rounded-lg border border-white/5">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    activeTab === "login"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`flex-1 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === "signup"
                      ? "bg-white/10 text-white shadow-sm rounded-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="px-6 pb-8 pt-2 flex flex-col gap-5">
                {/* Form Fields */}
                <div className="space-y-4">
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="name@company.com"
                    icon={<Mail className="w-4 h-4" />}
                    className="!py-2"
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-400">
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/5 bg-white/5 text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <Link href="/dashboard">
                  <Button
                    variant="primary"
                    fullWidth
                    size="md"
                    className="!shadow-none font-medium"
                  >
                    {activeTab === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/5" />
                  <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-white/5" />
                </div>

                {/* GitHub Login */}
                <button className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer">
                  <svg
                    className="size-4 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center lg:text-left text-[12px] text-slate-500 leading-relaxed">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-slate-300 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-slate-300 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
