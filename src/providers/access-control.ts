import type { UserRole } from "@/types";
import type { AccessControlProvider } from "@refinedev/core";

type Action = "list" | "show" | "create" | "edit" | "delete" | string;

/**
 * RBAC permission matrix.
 *
 * Role capabilities (subject to product decisions):
 *   admin   - full access to all resources
 *   trainer - can manage users within their institution; read-only on results/sessions
 *   trainee - read-only access to their own sessions and results
 *
 * Expand this matrix as features are defined.
 */
const permissions: Record<UserRole, Record<string, Action[]>> = {
  admin: {
    users: ["list", "show", "create", "edit", "delete"],
    institutions: ["list", "show", "create", "edit", "delete"],
    sessions: ["list", "show"],
    results: ["list", "show"],
  },
  trainer: {
    users: ["list", "show", "create", "edit"],
    institutions: ["list", "show"],
    sessions: ["list", "show"],
    results: ["list", "show"],
  },
  trainee: {
    users: [],
    institutions: ["show"],
    sessions: ["list", "show"],
    results: ["list", "show"],
  },
};

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params: _params }) => {
    // Retrieve role from stored token (same as getPermissions in auth provider)
    const token = localStorage.getItem("surgicaled_token");
    if (!token) return { can: false, reason: "Not authenticated" };

    let role: UserRole | null = null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1] ?? "")) as {
        role?: UserRole;
      };
      role = payload.role ?? null;
    } catch {
      return { can: false, reason: "Invalid token" };
    }

    if (!role) return { can: false, reason: "No role assigned" };

    const resourcePerms = permissions[role]?.[resource ?? ""] ?? [];
    const allowed = resourcePerms.includes(action);

    return {
      can: allowed,
      reason: allowed ? undefined : `Role "${role}" cannot "${action}" on "${resource}"`,
    };
  },

  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: true,
    },
  },
};
