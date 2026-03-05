"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { authApi, UserProfile, ApiError } from "@/lib/api";

interface AuthState {
  accessToken: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (identifier: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Store the initial refresh promise outside the component to prevent multiple
// simultaneous refreshes during React Strict Mode or fast re-mounts.
let initialRefreshPromise: Promise<{ accessToken: string }> | null = null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async (token: string) => {
    try {
      const profile = await authApi.getMe(token);
      setUser(profile);
    } catch {
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const result = await authApi.refresh();
      setAccessToken(result.accessToken);
      await fetchUser(result.accessToken);
      return result.accessToken;
    } catch {
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, [fetchUser]);

  const login = useCallback(
    async (identifier: string, password: string) => {
      const result = await authApi.login(identifier, password);
      setAccessToken(result.accessToken);
      await fetchUser(result.accessToken);
    },
    [fetchUser],
  );

  const register = useCallback(
    async (email: string, username: string, password: string, displayName: string) => {
      const result = await authApi.register(email, username, password, displayName);
      setAccessToken(result.accessToken);
      await fetchUser(result.accessToken);
    },
    [fetchUser],
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setAccessToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Use the global promise if it exists, otherwise create it
      if (!initialRefreshPromise) {
        initialRefreshPromise = authApi.refresh();
      }

      try {
        const result = await initialRefreshPromise;
        if (!cancelled) {
          setAccessToken(result.accessToken);
          await fetchUser(result.accessToken);
        }
      } catch {
        // no valid refresh cookie
        initialRefreshPromise = null;
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [fetchUser]);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(
      async () => {
        await refreshAccessToken();
      },
      13 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [accessToken, refreshAccessToken]);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      user,
      isLoading,
      isAuthenticated: !!accessToken && !!user,
      login,
      register,
      logout,
      refreshAccessToken,
    }),
    [accessToken, user, isLoading, login, register, logout, refreshAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

export { ApiError };
