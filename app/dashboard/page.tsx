import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorBarChart } from "@/components/ui/bar-chart";
import { BarChart2, Users, DollarSign, ShoppingCart } from "lucide-react";
import { title } from "process";
import {  PieChartNew } from "@/components/ui/pie-chart";

export default function DashboardPage() {
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

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviews.map((overview) => (
          <Card key={overview.id} className="pr-20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {overview.title}
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.numbers}</div>
              <p className="text-xs text-muted-foreground">from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <VisitorBarChart />
        <PieChartNew />
      </div>
    </div>
  );
}
