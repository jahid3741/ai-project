"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

// A master database of your articles so they load dynamically
const articleDatabase: Record<string, any> = {
  "1": {
    title: "How to Ace Your System Design Interview in 2026",
    category: "Career Advice",
    readTime: "8 min read",
    date: "Jun 24, 2026",
    image: "https://picsum.photos/seed/sys/1200/600",
    author: "Alex Chen",
    content: `
      System design interviews have evolved dramatically. Gone are the days when you could just draw a load balancer and a database and call it a day. Today, you need to understand micro-frontends, event-driven architectures, and AI-native scaling.

      ### 1. The Shift to AI-Native Architectures
      Modern systems are increasingly relying on Large Language Models at their core. This means your caching strategies need to account for semantic similarity, not just exact key-value matches.

      ### 2. Event Sourcing is the New Normal
      If you aren't proposing Kafka or an event bus for asynchronous processing, you are already behind. Interviewers want to see how you handle eventual consistency and dead-letter queues.

      ### Conclusion
      Practice drawing your diagrams, but more importantly, practice defending your trade-offs. Every technical decision has a cost—make sure you know what it is.
    `,
  },
  "2": {
    title: "10 Resume Mistakes That Are Getting You Rejected",
    category: "Resume Tips",
    readTime: "5 min read",
    date: "Jun 22, 2026",
    image: "https://picsum.photos/seed/resume/1200/600",
    author: "Sarah Jenkins",
    content: `
      Your resume is a marketing document, not a legal transcript of everything you have ever done. If you are getting auto-rejected, it's likely because of these common formatting errors.

      ### Stop Using Complex Columns
      Applicant Tracking Systems (ATS) read left to right, top to bottom. If you use a beautiful two-column Canva template, the ATS might read your job title and your hobbies as the exact same sentence.

      ### Metrics are Non-Negotiable
      "Improved performance of the database" means nothing. "Reduced query latency by 45% using Redis caching, saving $2,000/mo in AWS costs" gets you the interview.
    `,
  },
  // Default fallback for any other ID
  default: {
    title: "The Future of AI in Software Engineering",
    category: "Technology",
    readTime: "10 min read",
    date: "Today",
    image: "https://picsum.photos/seed/future/1200/600",
    author: "Genova AI Team",
    content: `
      Welcome to the future of coding. With tools like Genova AI, the way we write, review, and ship code is changing forever. 
      
      This is a placeholder article because we couldn't find the exact ID you clicked, but notice how beautiful this page layout looks anyway!
    `,
  },
};

export default function ArticleReadPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  // Find the exact article they clicked, or load the default one
  const article = articleDatabase[id] || articleDatabase["default"];

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Massive Hero Image Banner */}
      <div className="w-full h-[50vh] min-h-[400px] relative animate-in fade-in duration-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay so the text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 pb-12">
            <Button
              variant="ghost"
              className="mb-6 text-foreground/70 hover:text-foreground -ml-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Articles
            </Button>

            <div className="mb-4">
              <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground font-medium">
              <span className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {article.author.charAt(0)}
                </div>
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Area */}
      <div className="max-w-4xl mx-auto px-4 pt-12 animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex gap-4 mb-12 border-b border-border pb-8">
          <Button variant="outline" size="sm" className="shadow-sm">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button variant="outline" size="sm" className="shadow-sm">
            <Bookmark className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>

        {/* This parses our text into beautiful paragraphs and headers */}
        <div className="max-w-none">
          {article.content
            .split("\n")
            .map((paragraph: string, index: number) => {
              if (paragraph.trim().startsWith("###")) {
                return (
                  <h3
                    key={index}
                    className="text-3xl font-bold mt-10 mb-4 text-primary tracking-tight"
                  >
                    {paragraph.replace("###", "").trim()}
                  </h3>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p
                  key={index}
                  className="mb-6 leading-relaxed text-muted-foreground text-lg md:text-xl"
                >
                  {paragraph.trim()}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}
