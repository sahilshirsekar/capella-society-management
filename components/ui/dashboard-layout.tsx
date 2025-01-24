import { DashboardSidebar } from "@/components/ui/dashboard-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-light">
      {" "}
      <DashboardSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-light px-6">
          {" "}
          <SidebarTrigger />
          <h1 className="font-semibold text-foreground">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </div>
  )
}

