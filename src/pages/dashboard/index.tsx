import { useGetIdentity } from "@refinedev/core";
import { InstitutionAdminDashboardPage } from "@/pages/dashboard/institution-admin-dashboard";
import { InstructorDashboardPage } from "@/pages/dashboard/instructor-dashboard";
import { PlatformAdminDashboardPage } from "@/pages/dashboard/platform-admin-dashboard";
import { TraineeDashboardPage } from "@/pages/dashboard/trainee-dashboard";
import type { User } from "@/types";

export function DashboardPage() {
  const { data: identity } = useGetIdentity<User>();

  switch (identity?.role) {
    case "platform_admin":
      return <PlatformAdminDashboardPage />;
    case "institution_admin":
      return <InstitutionAdminDashboardPage />;
    case "instructor":
      return <InstructorDashboardPage />;
    default:
      return <TraineeDashboardPage />;
  }
}
