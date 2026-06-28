"use client";

import { motion, type Variants } from "framer-motion";
import {
  MessageSquare,
  FileText,
  UserCircle,
  Code2,
  ClipboardCheck,
  CheckSquare,
  PenTool,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const categories = [
  {
    icon: MessageSquare,
    title: "AI Interview",
    desc: "Real-time voice & text mock interviews.",
    href: "/ai-tools/interview",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    desc: "ATS-optimized templates and auto-fill.",
    href: "/ai-tools/resume",
  },
  {
    icon: UserCircle,
    title: "Career Coach",
    desc: "Personalized 24/7 career guidance.",
    href: "/ai-tools/coach",
  },
  {
    icon: Code2,
    title: "Coding Assistant",
    desc: "Live algorithmic problem solving.",
    href: "/ai-tools/coding",
  },
  {
    icon: ClipboardCheck,
    title: "Mock Assessment",
    desc: "Simulated take-home assignments.",
    href: "/ai-tools/assessment",
  },
  {
    icon: CheckSquare,
    title: "ATS Checker",
    desc: "Score and fix your resume instantly.",
    href: "/ai-tools/ats",
  },
  {
    icon: PenTool,
    title: "Cover Letter Generator",
    desc: "Hyper-personalized application letters.",
    href: "/ai-tools/cover-letter",
  },
  {
    icon: Briefcase,
    title: "Portfolio Review",
    desc: "Expert feedback on your projects.",
    href: "/ai-tools/portfolio",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Categories() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to land the offer
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our comprehensive suite of AI-powered tools designed
            specifically for software engineers and tech professionals.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={itemVariants}>
              {/* 1. We wrap the ENTIRE CARD in the Next.js Link! */}
              <Link href={cat.href} className="block h-full">
                <Card className="h-full group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1">
                  {/* Added pointer-events-none so this background doesn't block clicks */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <CardHeader className="relative z-10 pointer-events-none">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{cat.title}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {cat.desc}
                    </CardDescription>
                  </CardHeader>

                  <div className="px-6 pb-6 relative z-10 mt-auto pointer-events-none">
                    {/* 2. Removed asChild, it's just a normal button now that looks pretty */}
                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      Explore Tool
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        →
                      </span>
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
