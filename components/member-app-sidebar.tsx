// 'use client'
import type * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./ui/team-switcher";
import { NavMain } from "./ui/nav-main";
import { NavProjects } from "./ui/nav-projects";
import { NavUser } from "./ui/member-nav-user";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "ramrajya",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Society Control",
      url: "",
      icon: "/landing/analytics.png",
      isActive: true,
      items: [
        {
          title: "Society List",
          url: "/admin/details",
        },
        {
          title: "Society Registration",
          url: "/admin/registration",
        },
        {
          title: "Society Resident",
          url: "/admin/residents",
        },
      ],
    },
    {
      title: "Notices / Polls",
      url: "/admin/communication",
      icon: "/landing/analytics.png",
      // items: [
      //   {
      //     title: "Notices",
      //     url: "/admin/",
      //   },
      //   {
      //     title: "Explorer",
      //     url: "#",
      //   },
      //   {
      //     title: "Quantum",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: "/landing/analytics.png",
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: "/landing/analytics.png",
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      // icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      // icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      // icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Link href={"#"}>
          <img src="/landing/logo.png" alt="logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
