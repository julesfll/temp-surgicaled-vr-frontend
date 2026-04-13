import type { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn, cva } from "@/lib/utils";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";

const appMainContentVariants = cva(
  "flex min-h-0 flex-1 flex-col bg-background px-4 py-5 text-foreground md:px-6",
);

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className={cn(appMainContentVariants())}>
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
