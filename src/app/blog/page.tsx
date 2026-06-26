import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

// I generated some realistic dummy articles so your page looks full and alive immediately!
const articles = [
  {
    id: 1,
    title: "How to Ace Your System Design Interview in 2026",
    excerpt:
      "Mastering system design is critical for senior engineering roles. Learn the core principles of scalability, microservices, and databases.",
    category: "Career Advice",
    readTime: "8 min read",
    date: "Jun 24, 2026",
    image: "https://picsum.photos/seed/sys/600/400",
  },
  {
    id: 2,
    title: "10 Resume Mistakes That Are Getting You Rejected",
    excerpt:
      "Are you applying to hundreds of jobs and hearing nothing back? Your resume format might be failing the ATS filters.",
    category: "Resume Tips",
    readTime: "5 min read",
    date: "Jun 22, 2026",
    image: "https://picsum.photos/seed/resume/600/400",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Negotiating a FAANG Salary",
    excerpt:
      "Don't leave money on the table. Here is the step-by-step framework to negotiate a total compensation package.",
    category: "Salary & Offer",
    readTime: "12 min read",
    date: "Jun 18, 2026",
    image: "https://picsum.photos/seed/money/600/400",
  },
  {
    id: 4,
    title: "Mastering LeetCode: Quality over Quantity",
    excerpt:
      "You don't need to solve 1000 problems. Focus on these 50 patterns to pass any algorithmic interview.",
    category: "Technical Prep",
    readTime: "6 min read",
    date: "Jun 15, 2026",
    image: "https://picsum.photos/seed/code/600/400",
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      {/* Hero Section for the Blog */}
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
          Latest Articles & Guides
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Actionable advice, deep dives, and expert strategies to help you land
          your dream tech job.
        </p>
      </div>

      {/* Grid of beautifully designed Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Link
            href={`/articles/${article.id}`}
            key={article.id}
            className="block group"
          >
            <Card className="h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 flex flex-col cursor-pointer">
              {/* Massive Cover Image */}
              <div className="h-64 bg-muted relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <CardHeader className="p-6 flex-1">
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {article.readTime}
                  </span>
                </div>
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>

              {/* Fake Read More Button */}
              <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                <Button
                  variant="ghost"
                  className="p-0 font-bold group-hover:text-primary transition-colors hover:bg-transparent"
                >
                  Read Full Article{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
