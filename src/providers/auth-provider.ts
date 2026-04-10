import type { TokenPayload, UserRole } from "@/types";
import type { AuthProvider } from "@refinedev/core";

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
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            name: "Login Failed",
            message: (error as { message?: string }).message ?? "Invalid email or password",
          },
        };
      }

      const { token } = (await response.json()) as { token: string };
      localStorage.setItem(TOKEN_KEY, token);

      return { success: true, redirectTo: "/" };
    } catch {
      return {
        success: false,
        error: {
          name: "Network Error",
          message: "Unable to reach the server. Please try again.",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = getStoredToken();
    if (!token) {
      return { authenticated: false, redirectTo: "/login", logout: true };
    }

    const payload = decodeToken(token);
    if (!payload || isTokenExpired(payload)) {
      localStorage.removeItem(TOKEN_KEY);
      return { authenticated: false, redirectTo: "/login", logout: true };
    }

    return { authenticated: true };
  },

  onError: async (error: unknown) => {
    const httpError = error as { status?: number; statusCode?: number; message?: string };
    const status = httpError?.status ?? httpError?.statusCode;
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      return {
        logout: true,
        redirectTo: "/login",
        error: new Error(httpError.message ?? "Unauthorized"),
      };
    }
    return { error: error instanceof Error ? error : new Error(String(error)) };
  },

  getIdentity: async () => {
    const token = getStoredToken();
    if (!token) return null;

    const payload = decodeToken(token);
    if (!payload || isTokenExpired(payload)) return null;

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      avatar: undefined,
    };
  },

  getPermissions: async (): Promise<UserRole | null> => {
    const token = getStoredToken();
    if (!token) return null;

    const payload = decodeToken(token);
    if (!payload || isTokenExpired(payload)) return null;

    return payload.role;
  },
};
