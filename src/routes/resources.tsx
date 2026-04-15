import type { ResourceProps } from "@refinedev/core";
import { Activity, Building2, Headset, LayoutDashboard, Users } from "lucide-react";

export const appResources: ResourceProps[] = [
  {
    list: "/overview",
    meta: {
      icon: <LayoutDashboard size={16} />,
      label: "Overview",
    },
    name: "dashboard",
  },
  {
    create: "/users/create",
    edit: "/users/edit/:id",
    list: "/users",
    meta: {
      icon: <Users size={16} />,
      label: "Users",
    },
    name: "users",
    show: "/users/show/:id",
  },
  {
    create: "/institutions/create",
    edit: "/institutions/edit/:id",
    list: "/institutions",
    meta: {
      icon: <Building2 size={16} />,
      label: "Institutions",
    },
    name: "institutions",
    show: "/institutions/show/:id",
  },
  {
    list: "/sessions",
    meta: {
      icon: <Headset size={16} />,
      label: "Sessions",
    },
    name: "sessions",
    show: "/sessions/show/:id",
  },
  {
    list: "/results",
    meta: {
      icon: <Activity size={16} />,
      label: "Results",
    },
    name: "results",
    show: "/results/show/:id",
  },
];
