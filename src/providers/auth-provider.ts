import type { AuthProvider } from "@refinedev/core";
import type { TokenPayload, UserRole } from "@/types";

const TOKEN_KEY = "surgicaled_token";
const API_URL = import.meta.env.VITE_API_URL ?? "";

/** Decode JWT payload without verification (verification is server-side) */
function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload)) as TokenPayload;
  } catch {
    return null;
  }
}

function isTokenExpired(payload: TokenPayload): boolean {
  return payload.exp * 1000 < Date.now();
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export const authProvider: AuthProvider = {
  check: async () => {
    const token = getStoredToken();
    if (!token) {
      return { authenticated: false, logout: true, redirectTo: "/login" };
    }

    const payload = decodeToken(token);
    if (!payload || isTokenExpired(payload)) {
      localStorage.removeItem(TOKEN_KEY);
      return { authenticated: false, logout: true, redirectTo: "/login" };
    }

    return { authenticated: true };
  },

  getIdentity: async () => {
    const token = getStoredToken();
    if (!token) return null;

    const payload = decodeToken(token);
    if (!payload || isTokenExpired(payload)) return null;

    return {
      avatar: undefined,
      email: payload.email,
      id: payload.sub,
      name: payload.name,
      role: payload.role,
    };
  },

  getPermissions: async (): Promise<UserRole | null> => {
    const token = getStoredToken();
    if (!token) return null;

    const payload = decodeToken(token);
    if (!payload || isTokenExpired(payload)) return null;

    return payload.role;
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        return {
          error: {
            message: (error as { message?: string }).message ?? "Invalid email or password",
            name: "Login Failed",
          },
          success: false,
        };
      }

      const { token } = (await response.json()) as { token: string };
      localStorage.setItem(TOKEN_KEY, token);

      return { redirectTo: "/", success: true };
    } catch {
      return {
        error: {
          message: "Unable to reach the server. Please try again.",
          name: "Network Error",
        },
        success: false,
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return { redirectTo: "/login", success: true };
  },

  onError: async (error: unknown) => {
    const httpError = error as { status?: number; statusCode?: number; message?: string };
    const status = httpError?.status ?? httpError?.statusCode;
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      return {
        error: new Error(httpError.message ?? "Unauthorized"),
        logout: true,
        redirectTo: "/login",
      };
    }
    return { error: error instanceof Error ? error : new Error(String(error)) };
  },
};
