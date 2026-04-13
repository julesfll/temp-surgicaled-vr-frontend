import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Outlet, Route, Routes } from "react-router";
import { AppLayout } from "@/components/layout/app-layout";
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";

export function AppRoutes() {
  return (
    <Routes>
      {/* Authenticated routes */}
      <Route
        element={
          <Authenticated key="authenticated" fallback={<CatchAllNavigate to="/login" />}>
            <AppLayout>
              <Outlet />
            </AppLayout>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="users" />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Resource routes — full pages added once API spec is defined */}
        <Route
          path="/users"
          element={<div className="text-muted-foreground">Users list — coming soon</div>}
        />
        <Route
          path="/users/create"
          element={<div className="text-muted-foreground">Create user — coming soon</div>}
        />
        <Route
          path="/users/edit/:id"
          element={<div className="text-muted-foreground">Edit user — coming soon</div>}
        />
        <Route
          path="/users/show/:id"
          element={<div className="text-muted-foreground">User detail — coming soon</div>}
        />

        <Route
          path="/institutions"
          element={<div className="text-muted-foreground">Institutions list — coming soon</div>}
        />
        <Route
          path="/institutions/create"
          element={<div className="text-muted-foreground">Create institution — coming soon</div>}
        />
        <Route
          path="/institutions/edit/:id"
          element={<div className="text-muted-foreground">Edit institution — coming soon</div>}
        />
        <Route
          path="/institutions/show/:id"
          element={<div className="text-muted-foreground">Institution detail — coming soon</div>}
        />

        <Route
          path="/sessions"
          element={<div className="text-muted-foreground">Sessions list — coming soon</div>}
        />
        <Route
          path="/sessions/show/:id"
          element={<div className="text-muted-foreground">Session detail — coming soon</div>}
        />

        <Route
          path="/results"
          element={<div className="text-muted-foreground">Results list — coming soon</div>}
        />
        <Route
          path="/results/show/:id"
          element={<div className="text-muted-foreground">Result detail — coming soon</div>}
        />

        <Route path="*" element={<ErrorComponent />} />
      </Route>

      {/* Public routes */}
      <Route
        element={
          <Authenticated key="public" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
