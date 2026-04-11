import type { DataProvider } from "@refinedev/core";
import { getStoredToken } from "./auth-provider";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function getHeaders(): HeadersInit {
  const token = getStoredToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...getHeaders(), ...options?.headers },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      message: (error as { message?: string }).message ?? response.statusText,
      status: response.status,
    };
  }

  return response.json() as Promise<T>;
}

/**
 * Custom Refine DataProvider targeting the SurgicalEd Lambda REST API.
 *
 * Request/response field mapping (pagination, sorting, filtering) will be
 * updated once the API spec is finalized.
 *
 * Convention assumed (subject to change):
 *   GET    /{resource}           → { data: T[], total: number }
 *   GET    /{resource}/{id}      → { data: T }
 *   POST   /{resource}           → { data: T }
 *   PUT    /{resource}/{id}      → { data: T }
 *   DELETE /{resource}/{id}      → {}
 */
export const dataProvider: DataProvider = {
  create: async ({ resource, variables }) => {
    const result = await request<{ data: unknown }>(`/${resource}`, {
      body: JSON.stringify(variables),
      method: "POST",
    });
    return { data: result.data as never };
  },

  deleteOne: async ({ resource, id }) => {
    await request(`/${resource}/${id}`, { method: "DELETE" });
    return { data: { id } as never };
  },

  getApiUrl: () => API_URL,
  getList: async ({ resource, pagination, sorters, filters }) => {
    const params = new URLSearchParams();

    if (pagination) {
      const page = pagination.currentPage ?? 1;
      const pageSize = pagination.pageSize ?? 10;
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
    }

    if (sorters?.[0]) {
      params.set("sortField", sorters[0].field);
      params.set("sortOrder", sorters[0].order);
    }

    if (filters) {
      for (const filter of filters) {
        if ("field" in filter) {
          params.set(filter.field, String(filter.value));
        }
      }
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const result = await request<{ data: unknown[]; total: number }>(`/${resource}${query}`);

    return { data: result.data as never[], total: result.total };
  },

  getOne: async ({ resource, id }) => {
    const result = await request<{ data: unknown }>(`/${resource}/${id}`);
    return { data: result.data as never };
  },

  update: async ({ resource, id, variables }) => {
    const result = await request<{ data: unknown }>(`/${resource}/${id}`, {
      body: JSON.stringify(variables),
      method: "PUT",
    });
    return { data: result.data as never };
  },
};
