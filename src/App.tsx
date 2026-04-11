import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Activity, Building2, Headset, Users } from "lucide-react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { AppLayout } from "@/components/layout/app-layout";
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";
import { Toaster } from "@/components/refine-ui/notification/toaster";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { accessControlProvider } from "@/providers/access-control";
import { authProvider } from "@/providers/auth-provider";
import { dataProvider } from "@/providers/data-provider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="surgicaled-theme">
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          authProvider={authProvider}
          accessControlProvider={accessControlProvider}
          notificationProvider={useNotificationProvider}
          resources={[
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
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
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
                element={
                  <div className="text-muted-foreground">Institutions list — coming soon</div>
                }
              />
              <Route
                path="/institutions/create"
                element={
                  <div className="text-muted-foreground">Create institution — coming soon</div>
                }
              />
              <Route
                path="/institutions/edit/:id"
                element={
                  <div className="text-muted-foreground">Edit institution — coming soon</div>
                }
              />
              <Route
                path="/institutions/show/:id"
                element={
                  <div className="text-muted-foreground">Institution detail — coming soon</div>
                }
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
          <Toaster />
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
