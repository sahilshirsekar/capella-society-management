'use client'
import {
  Home,
  BarChart2,
  Users,
  Settings,
  LogOut,
  User,
  ChevronDown,
  LineChart,
  PieChart,
  BarChart,
  MessageSquare,
  Clipboard,
  Vote,
} from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useEffect, useState } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { useSession } from "next-auth/react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "./dashboard"
    // ,subItems: [
    // { icon: LineChart, label: "Overview", href: "/analytics/overview" },
    // { icon: PieChart, label: "Activity log", href: "/analytics/activity" },
    // { icon: BarChart, label: "Performance", href: "/analytics/performance" },
  // ],
 },
  {
    icon: BarChart2,
    label: "Society Control",
    subItems: [
      { icon: LineChart, label: "Society Details", href: "./details" },
      { icon: PieChart, label: "Committee Members", href: "./committee" },
      { icon: BarChart, label: "Members", href: "./members" }
      // { icon: BarChart, label: "Performance", href: "/analytics/performance" },
    ],
  },
  { icon: Users, label: "Customers", href: "/customers" },
  {
    icon: MessageSquare,
    label: "Communication",
    subItems: [
      { icon: Clipboard, label: "Notice Board", href: "/communication/notice-board" },
      { icon: BarChart, label: "Polls", href: "/communication/polls" },
      { icon: Vote, label: "Voting", href: "/communication/voting" },
    ],
  },
]

export function DashboardSidebar() {
  const {data : session} = useSession();

  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (label: string) => {
    useEffect(() => {
      setOpenItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
    }, [])
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-2">
        <div className="bg-primary rounded-xl py-5 flex items-center justify-center">
      <img src="/landing/logo.png" alt="logo" className="w-1/2"/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label} >
              {item.subItems ? (
                <Collapsible open={openItems.includes(item.label)} onOpenChange={() => toggleItem(item.label)}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between hover:bg-gray-300">
                      <div className="flex items-center ">
                        <item.icon className="h-4 w-4 mr-2 " />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(item.label) ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 mt-1">
                    {item.subItems.map((subItem) => (
                      <SidebarMenuButton key={subItem.label} asChild className="w-full justify-start hover:bg-gray-300">
                        <a href={subItem.href}>
                          <subItem.icon className="h-4 w-4 mr-2" />
                          <span>{subItem.label}</span>
                        </a>
                      </SidebarMenuButton>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton asChild>
                  <a href={item.href} className="hover:bg-gray-300">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          {/* <pre>{JSON.stringify(session?.user.username)}</pre> */}
            <div>
              
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

