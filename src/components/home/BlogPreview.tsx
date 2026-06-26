"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const posts = [
  {
    title: "Cracking the System Design Interview in 2024",
    excerpt:
      "A comprehensive guide to modern system design concepts, from microservices to distributed databases, tailored for senior roles.",
    category: "Interview Prep",
    readTime: "8 min read",
    date: "Oct 12, 2024",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    href: "https://www.freecodecamp.org/news/systems-design-for-interviews/", // Real guide by FreeCodeCamp
  },
  {
    title: "How to Optimize Your Resume for ATS Algorithms",
    excerpt:
      "Learn the exact keywords and formatting rules that Applicant Tracking Systems look for when parsing software engineering resumes.",
    category: "Career Advice",
    readTime: "5 min read",
    date: "Oct 08, 2024",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    href: "https://zety.com/blog/ats-resume", // Real guide by Zety
  },
  {
    title: "The Ultimate Guide to Behavioral Interviews",
    excerpt:
      "Master the STAR method and learn how to confidently answer the most common leadership and behavioral questions at FAANG.",
    category: "Soft Skills",
    readTime: "6 min read",
    date: "Oct 01, 2024",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    href: "https://www.themuse.com/advice/star-interview-method", // Real guide by The Muse
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Latest from our blog
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Expert insights, interview tips, and career strategies.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
          >
            View all articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="overflow-hidden h-full group border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.href}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            View all articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
