"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowRight } from "lucide-react"

// Real-world dummy data so the table looks incredible instantly!
const recentUsers = [
  { id: "USR-001", name: "Alex Chen", email: "alex.chen@example.com", role: "Admin", status: "Active" },
  { id: "USR-002", name: "Sarah Jenkins", email: "sarah.j@example.com", role: "User", status: "Active" },
  { id: "USR-003", name: "Michael Rodriguez", email: "m.rod@example.com", role: "User", status: "Offline" },
  { id: "USR-004", name: "Emily Watson", email: "ewatson@example.com", role: "User", status: "Active" },
  { id: "USR-005", name: "David Kim", email: "dkim99@example.com", role: "User", status: "Suspended" },
]

export function DashboardTable() {
  return (
    <Card className="shadow-sm border-border/50 rounded-xl mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Recent Users</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
          View all <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/50 overflow-hidden">
          <Table>
            <TableCaption className="pb-4">A list of your most recent signups.</TableCaption>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[100px] font-bold text-foreground">User ID</TableHead>
                <TableHead className="font-bold text-foreground">Name & Email</TableHead>
                <TableHead className="font-bold text-foreground">Role</TableHead>
                <TableHead className="font-bold text-foreground">Status</TableHead>
                <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-muted-foreground">{user.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "secondary"} className="shadow-sm">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full shadow-sm ${
                        user.status === 'Active' ? 'bg-green-500' : 
                        user.status === 'Offline' ? 'bg-gray-400' : 'bg-destructive'
                      }`} />
                      <span className="text-sm font-semibold text-muted-foreground">{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}