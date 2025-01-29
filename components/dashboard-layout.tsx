import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { title } from "process";
import ButtonWithModal from "./ui/button-with-modal";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserAccountHeader from "./ui/user-account-header";

export async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex h-screen overflow-hidden bg-light">
      {" "}
      <DashboardSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-light px-6">
          {" "}
          <SidebarTrigger />
          <h1 className="font-semibold text-foreground">
            Capella - Society Management
          </h1>
          <div className="ml-auto flex flex-row space-x-7">
            <div>{session?.user.username || session?.user.name}</div>
            <div><img src={session?.user.image ?? "/.png"} alt="img" className="w-7 rounded-full "/></div>
            <div>
            <UserAccountHeader/>
            </div>
            {/* <p className="font-extralight text-sm ">{session?.user.email}</p> */}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </div>
  );
}
