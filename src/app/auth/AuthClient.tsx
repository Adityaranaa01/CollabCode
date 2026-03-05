"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  AlertCircle,
  ChevronLeft,
  AtSign,
} from "lucide-react";
import { useAuth, ApiError } from "@/contexts/AuthContext";

export default function AuthPageClient() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle mode from query params
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setActiveTab("signup");
    } else if (mode === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (activeTab === "login") {
        await login(email, password);
      } else {
        if (!displayName.trim()) {
          setError("Display name is required");
          setIsSubmitting(false);
          return;
        }
        if (!username.trim()) {
          setError("Username is required");
          setIsSubmitting(false);
          return;
        }
        await register(email, username, password, displayName);
      }
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-dark font-display text-white min-h-screen flex relative overflow-hidden">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 lg:left-auto lg:right-8 z-50 flex items-center gap-2 text-slate-400 hover:text-primary transition-all text-sm group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

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

          {/* Collaboration Preview */}
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
              Should we use JWT?
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
                {activeTab === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {activeTab === "login"
                  ? "Enter your details to access your workspace"
                  : "Start collaborating with your team"}
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
              {/* Tab Toggle */}
              <div className="flex p-1 bg-white/5 m-4 rounded-lg border border-white/5">
                <button
                  onClick={() => {
                    setActiveTab("login");
                    setError("");
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    activeTab === "login"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setActiveTab("signup");
                    setError("");
                  }}
                  className={`flex-1 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === "signup"
                      ? "bg-white/10 text-white shadow-sm rounded-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="px-6 pb-8 pt-2 flex flex-col gap-5"
              >
                {/* Error Banner */}
                {error && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  {activeTab === "signup" && (
                    <Input
                      type="text"
                      label="Display Name"
                      placeholder="Your Name"
                      icon={<User className="w-4 h-4" />}
                      className="!py-2"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  )}
                  {activeTab === "signup" && (
                    <Input
                      type="text"
                      label="Username"
                      placeholder="your_username"
                      icon={<AtSign className="w-4 h-4" />}
                      className="!py-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                      required
                    />
                  )}
                  <Input
                    type={activeTab === "login" ? "text" : "email"}
                    label={activeTab === "login" ? "Email or Username" : "Email Address"}
                    placeholder={activeTab === "login" ? "name@company.com or username" : "name@company.com"}
                    icon={<Mail className="w-4 h-4" />}
                    className="!py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-400">
                        Password
                      </label>
                      {activeTab === "login" && (
                        <a
                          href="#"
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/5 bg-white/5 text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="md"
                  className="!shadow-none font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {activeTab === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center lg:text-left text-[12px] text-slate-500 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="text-slate-300 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-slate-300 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
