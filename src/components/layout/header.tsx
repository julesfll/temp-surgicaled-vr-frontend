import { useGetIdentity, useLogout } from "@refinedev/core";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn, cva } from "@/lib/utils";
import type { User as UserType } from "@/types";

const appHeaderVariants = cva(
  "flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-4 text-card-foreground shadow-surface",
);

const headerUserLabelVariants = cva("font-medium text-foreground");

const headerUserMetaVariants = cva("text-xs text-muted-foreground");

const headerSignOutItemVariants = cva("text-destructive focus:text-destructive");

export function Header() {
  const { data: identity } = useGetIdentity<UserType>();
  const { mutate: logout } = useLogout();
  const roleLabel: Record<string, string> = {
    institution_admin: "Institution Admin",
    instructor: "Instructor",
    platform_admin: "Platform Admin",
    trainee: "Trainee",
  };

  const initials = identity?.name
    ? identity.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className={cn(appHeaderVariants(), "shadow-none")}>
      <SidebarTrigger className="-ml-1" />
      <div className="ml-2 flex-1">
        <h1 className="text-base font-semibold text-foreground">
          {identity?.role ? `${roleLabel[identity.role] ?? "Trainee"} Dashboard` : "Dashboard"}
        </h1>
      </div>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className={cn(headerUserLabelVariants())}>{identity?.name ?? "User"}</span>
              <span className={cn(headerUserMetaVariants())}>{identity?.email}</span>
              {identity?.role && (
                <span className={cn(headerUserMetaVariants(), "capitalize")}>{identity.role}</span>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className={cn(headerSignOutItemVariants())}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
