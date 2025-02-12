"use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// export default function DashboardPage() {
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const userStr = localStorage.getItem("user")
//     const isFirstLogin = localStorage.getItem("isFirstLogin")

//     if (userStr) {
//       setUser(JSON.parse(userStr))
//       if (isFirstLogin === "true") {
//         router.push("/member/first-login")
//       }
//     } else {
//       router.push("/member/login")
//     }
//   }, [router])

//   if (!user) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to your Dashboard</h2>
//         <div className="mt-2 text-center text-sm text-gray-600">
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorBarChart } from "@/components/ui/bar-chart";
import { BarChart2, Users, DollarSign, ShoppingCart } from "lucide-react";
import { title } from "process";
import { PieChartNew } from "@/components/ui/pie-chart";
import { QuickLinkButton } from "@/components/ui/quick-link-button";
import { QuickLinks } from "@/components/quick-links";
import { ActivityFeed } from "@/components/activity-feed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default async function DashboardPage() {


  const overviews = [
    {
      id: 1,
      title: "Total Members",
      numbers: "60",
    },
    {
      id: 2,
      title: "Maintainance Collected",
      numbers: "₹55000",
    },
    {
      id: 3,
      title: "Pending Dues",
      numbers: "₹5000",
    },
    {
      id: 4,
      title: "Visitor Count",
      numbers: "35",
    },
    {
      id: 5,
      title: "Active Notices",
      numbers: "3",
    },
  ];

  const activities = [
    { id: 1, user: 'Admin', action: 'Posted a new notice', timestamp: '5 mins ago' },
    { id: 2, user: 'Guard', action: 'Logged a visitor entry', timestamp: '10 mins ago' },
    { id: 3, user: 'Member', action: 'Paid maintenance fee', timestamp: '1 hour ago' },
  ];

  

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviews.map((overview) => (
          <Card key={overview.id} className="pr-20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {overview.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.numbers}</div>
              <p className="text-xs text-muted-foreground">from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <QuickLinks />
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ActivityFeed activities={activities} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <VisitorBarChart />
        <PieChartNew />
      </div>
    </div>
  );
}



