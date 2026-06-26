"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Code,
  FileText,
  CheckCircle,
  Lock,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// We replaced generic links with unique SLUGS for every single tool!
const categoryData: Record<string, any> = {
  interview: {
    title: "AI Interview Mastery",
    description:
      "Ace your next technical or behavioral interview with our AI simulators.",
    tools: [
      {
        name: "Behavioral Mock Interview",
        desc: "Practice answering STAR method questions with live AI feedback.",
        icon: MessageSquare,
        status: "Available",
        slug: "mock-interview",
      },
      {
        name: "System Design Assistant",
        desc: "Get instant architecture feedback on your system designs.",
        icon: Code,
        status: "Available",
        slug: "system-design",
      },
      {
        name: "Salary Negotiator Bot",
        desc: "Simulate a tough negotiation with an AI recruiter.",
        icon: Sparkles,
        status: "Pro",
        slug: "salary-negotiator",
      },
    ],
  },
  resume: {
    title: "Resume Optimization Suite",
    description:
      "Build a resume that bypasses ATS filters and catches the recruiter's eye.",
    tools: [
      {
        name: "Bullet Point Enhancer",
        desc: "Turn weak bullet points into high-impact, metric-driven statements.",
        icon: FileText,
        status: "Available",
        slug: "bullet-enhancer",
      },
      {
        name: "ATS Keyword Matcher",
        desc: "Compare your resume against a specific job description.",
        icon: CheckCircle,
        status: "Available",
        slug: "ats-matcher",
      },
      {
        name: "Executive Summary Writer",
        desc: "Generate a compelling professional summary in seconds.",
        icon: Sparkles,
        status: "Available",
        slug: "summary-writer",
      },
    ],
  },
  "cover-letter": {
    title: "Cover Letter Studio",
    description:
      "Generate hyper-personalized cover letters that actually get read.",
    tools: [
      {
        name: "Magic Cover Letter",
        desc: "Generate a full letter based on your resume and a job link.",
        icon: FileText,
        status: "Available",
        slug: "magic-cover-letter",
      },
      {
        name: "Cold Email Generator",
        desc: "Write perfectly crafted messages for LinkedIn networking.",
        icon: MessageSquare,
        status: "Available",
        slug: "cold-email",
      },
    ],
  },
};

export default function DynamicCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const data = categoryData[categorySlug] || {
    title: `${categorySlug.charAt(0).toUpperCase() + categorySlug.replace("-", " ").slice(1)} Hub`,
    description: `Explore our advanced AI suite dedicated to ${categorySlug.replace("-", " ")}.`,
    tools: [
      {
        name: "Core AI Assistant",
        desc: "The primary AI engine for this category.",
        icon: Sparkles,
        status: "Available",
        slug: "core-assistant",
      },
      {
        name: "Advanced Analytics",
        desc: "Deep dive into your performance metrics.",
        icon: CheckCircle,
        status: "Coming Soon",
        slug: "analytics",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>
      </Button>

      <div className="mb-12 border-b pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
          {data.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {data.description} Select a specialized tool below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.tools.map((tool: any, index: number) => (
          <Card
            key={index}
            className={`flex flex-col hover:border-primary/50 transition-all duration-300 ${tool.status !== "Available" ? "opacity-70 grayscale" : "hover:shadow-md hover:-translate-y-1"}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <tool.icon className="h-6 w-6" />
                </div>
                {tool.status === "Pro" && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-500/10 text-amber-600"
                  >
                    <Lock className="h-3 w-3 mr-1" /> PRO
                  </Badge>
                )}
                {tool.status === "Coming Soon" && (
                  <Badge variant="outline">Coming Soon</Badge>
                )}
              </div>
              <CardTitle className="text-xl">{tool.name}</CardTitle>
              <CardDescription className="text-sm mt-2">
                {tool.desc}
              </CardDescription>
            </CardHeader>

            <div className="mt-auto p-6 pt-0">
              {tool.status === "Available" ? (
                // THE MAGIC HAPPENS HERE: We now route them to /ai-tools/tool/[unique-slug]
                <Button className="w-full font-bold" asChild>
                  <Link href={`/ai-tools/tool/${tool.slug}`}>Launch Tool</Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full cursor-not-allowed"
                  disabled
                >
                  Upgrade to Access
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
