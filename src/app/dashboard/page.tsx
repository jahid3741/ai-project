"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Package, Sparkles, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getStats } from "@/lib/api";
import { DynamicChart } from "@/components/DynamicChart";
import { DashboardTable } from "@/components/DashboardTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// --- MOCK CHART DATA FOR LINE CHART ---
const monthlySignups = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 750 },
  { name: "May", users: 1100 },
  { name: "Jun", users: 1400 },
];

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getStats,
  });

  const StatSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your platform's real-time performance and metrics.
        </p>
      </div>

      {isError && (
        <div className="mb-8 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl font-medium">
          ⚠️ Failed to load stats. Make sure your Express server is running and
          you are logged in as an Admin!
        </div>
      )}

      {/* ======================================= */}
      {/* ROW 1: STAT CARDS                       */}
      {/* ======================================= */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
              Total Users
            </CardTitle>
            <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-3xl font-black">
                  {data?.totalUsers.toLocaleString()}
                </div>
                <p className="text-xs font-medium text-green-500 mt-1">
                  +12% from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
              Total Items
            </CardTitle>
            <div className="h-8 w-8 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-3xl font-black">
                  {data?.totalItems.toLocaleString()}
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  Active in database
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
              AI Generations
            </CardTitle>
            <div className="h-8 w-8 bg-orange-500/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-3xl font-black">
                  {data?.activeSessions.toLocaleString()}
                </div>
                <p className="text-xs font-medium text-green-500 mt-1">
                  +24 today
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
              Total Revenue
            </CardTitle>
            <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-3xl font-black">
                  ${data?.revenue.toLocaleString()}
                </div>
                <p className="text-xs font-medium text-green-500 mt-1">
                  +18% from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ======================================= */}
      {/* ROW 2: CHARTS                           */}
      {/* ======================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DynamicChart />

        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">New User Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlySignups}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground)/0.2)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    dot={{ r: 4, fill: "hsl(var(--card))", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ======================================= */}
      {/* ROW 3: DATA TABLE (FULL WIDTH AT BOTTOM)*/}
      {/* ======================================= */}
      <div className="w-full">
        <DashboardTable />
      </div>
    </div>
  );
}
