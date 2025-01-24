import "@/app/globals.css"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardLayout } from "@/components/ui/dashboard-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dashboard",
  description: "A simple dashboard with sidebar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <SidebarProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
        <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Capella. All rights reserved.</p>
        </div>
      </footer>
      </body>
    </html>
  )
}

