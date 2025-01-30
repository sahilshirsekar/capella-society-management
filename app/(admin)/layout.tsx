// import "@/app/globals.css"
// import { Inter } from "next/font/google"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { DashboardLayout } from "@/components/dashboard-layout"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import Footer from "@/components/footer"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Dashboard",
//   description: "A simple dashboard with sidebar",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {

//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-background text-foreground`}>
//         <SidebarProvider>
//           <DashboardLayout>{children}</DashboardLayout>
//         </SidebarProvider>
//       </body>
//     </html>
//   )
// }




import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

