import { useGetIdentity, useMenu } from "@refinedev/core";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AUTH_DISABLED, DEV_ROLE_SWITCHER_ENABLED } from "@/config/auth-mode";
import { cn } from "@/lib/utils";
import { setDevRoleToken } from "@/providers/auth-provider";
import type { User, UserRole } from "@/types";

const sidebarHeaderClassName = "border-b border-sidebar-border px-4 py-3";
const sidebarBrandRowClassName = "flex items-center gap-2";
const sidebarBrandMarkClassName =
  "flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary";
const sidebarBrandTitleClassName = "font-semibold tracking-tight text-sidebar-foreground";
const sidebarBrandSubTitleClassName = "text-[11px] text-tertiary";
const sidebarRoleSwitcherWrapClassName =
  "flex flex-col gap-1.5 border-t border-sidebar-border px-3 pt-3";
const sidebarRoleSwitcherLabelClassName = "text-label text-muted-foreground";
const sidebarNavIconSlotClassName =
  "flex size-4 shrink-0 items-center justify-center text-sidebar-foreground [&_svg]:size-4";

const ROLE_OPTIONS: Array<{ label: string; value: UserRole }> = [
  { label: "Platform Admin", value: "platform_admin" },
  { label: "Institution Admin", value: "institution_admin" },
  { label: "Instructor", value: "instructor" },
  { label: "Trainee", value: "trainee" },
];

export function AppSidebar() {
  const { data: identity } = useGetIdentity<User>();
  const { menuItems } = useMenu();
  const location = useLocation();
  const [activeRole, setActiveRole] = useState<UserRole>("platform_admin");

  useEffect(() => {
    if (identity?.role) {
      setActiveRole(identity.role);
    }
  }, [identity?.role]);

  return (
    <Sidebar>
      <SidebarHeader className={cn(sidebarHeaderClassName)}>
        <div className={cn(sidebarBrandRowClassName)}>
          <span className={cn(sidebarBrandMarkClassName)}>
            <Activity className="size-4" />
          </span>
          <div className="flex flex-col">
            <span className={cn(sidebarBrandTitleClassName)}>SurgicalEdVR</span>
            <span className={cn(sidebarBrandSubTitleClassName)}>Training Console</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive =
                  location.pathname === item.route ||
                  location.pathname.startsWith(`${item.route}/`);

                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.route ?? "/"}>
                        {item.icon && (
                          <span className={cn(sidebarNavIconSlotClassName)}>{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {DEV_ROLE_SWITCHER_ENABLED && AUTH_DISABLED && (
        <SidebarFooter className={cn("p-0")}>
          <div className={cn(sidebarRoleSwitcherWrapClassName)}>
            <Label
              htmlFor="sidebar-dev-role-switcher"
              className={cn(sidebarRoleSwitcherLabelClassName)}
            >
              Dev role switcher
            </Label>
            <Select
              value={activeRole}
              onValueChange={(value) => {
                const nextRole = value as UserRole;
                setActiveRole(nextRole);
                setDevRoleToken(nextRole);
                window.location.reload();
              }}
            >
              <SelectTrigger id="sidebar-dev-role-switcher" className="h-9 w-full bg-card">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
