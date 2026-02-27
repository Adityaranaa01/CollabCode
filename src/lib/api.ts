const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body: ApiResponse<T> = await res.json();

  if (!res.ok || !body.success) {
    throw new ApiError(
      body.message || `Request failed with status ${res.status}`,
      res.status
    );
  }

  return body.data as T;
}

export interface AuthTokens {
  accessToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  plan: {
    name: string;
    maxRooms: number;
    maxMembersPerRoom: number;
    chatRetentionDays: number;
    maxActiveSessions: number;
  };
  createdAt: string;
}

export const authApi = {
  register: (email: string, password: string, displayName: string) =>
    request<AuthTokens>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, displayName }),
    }),

  login: (email: string, password: string) =>
    request<AuthTokens>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  refresh: () =>
    request<AuthTokens>("/api/v1/auth/refresh", {
      method: "POST",
    }),

  logout: () =>
    request<void>("/api/v1/auth/logout", {
      method: "POST",
    }).catch(() => {}),

  logoutAll: (accessToken: string) =>
    request<void>("/api/v1/auth/logout-all", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  getMe: (accessToken: string) =>
    request<UserProfile>("/api/v1/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
};

export { ApiError };
