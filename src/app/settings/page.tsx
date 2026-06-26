"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Settings</h1>

      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Manage how Genova looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode on or off across the platform.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what updates you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive weekly roundups of new AI tools.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing</p>
                <p className="text-sm text-muted-foreground">
                  Receive special offers and promotions.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto px-8">Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
