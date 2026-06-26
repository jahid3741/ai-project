import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

import "./globals.css";

import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genova — AI-Powered Content & Recommendations Platform",
  description:
    "Create, analyze, and get smart recommendations with Genova, the modern AI platform for content creators and businesses.",
  keywords: ["AI", "content generator", "recommendations", "Next.js", "SaaS"],
  authors: [
    {
      name: "Your Name",
      url: "https://github.com/yourname",
    },
  ],
  openGraph: {
    title: "Genova — AI-Powered Platform",
    description:
      "Create and recommend content intelligently with Genova.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}