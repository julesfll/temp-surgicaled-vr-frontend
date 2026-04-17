import type { AccessControlProvider } from "@refinedev/core";
import { AUTH_DISABLED } from "@/config/auth-mode";
import type { UserRole } from "@/types";

type Action = "list" | "show" | "create" | "edit" | "delete" | string;

/**
 * RBAC permission matrix — multi-tenant system.
 *
 * Scoping (which tenant's data is visible) is enforced server-side.
 * This matrix only defines which actions each role may perform at all.
 *
 *   Platform Admin     — full access across all institutions
 *   Institution Admin  — manage their institution and its users
 *   Instructor         — invite/manage their users, view stats
 *   Trainee            — own profile and stats only
 */
export const resourceRoleMatrix: Record<UserRole, Record<string, Action[]>> = {
  institution_admin: {
    dashboard: ["list"],
    institutions: ["show", "edit"],
    results: ["list", "show"],
    sessions: ["list", "show"],
    users: ["list", "show", "create", "edit", "delete"],
  },
  instructor: {
    dashboard: ["list"],
    institutions: ["show"],
    results: ["list", "show"],
    sessions: ["list", "show"],
    users: ["list", "show", "create", "edit"],
  },
  platform_admin: {
    dashboard: ["list"],
    institutions: ["list", "show", "create", "edit", "delete"],
    results: ["list", "show"],
    sessions: ["list", "show"],
    users: ["list", "show", "create", "edit", "delete"],
  },
  trainee: {
    dashboard: ["list"],
    institutions: ["show"],
    results: ["list", "show"],
    sessions: ["list", "show"],
    users: ["show"],
  },
};

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params: _params }) => {
    if (AUTH_DISABLED) {
      return { can: true };
    }

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

    const resourcePerms = resourceRoleMatrix[role]?.[resource ?? ""] ?? [];
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
