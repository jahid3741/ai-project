import { Metadata } from "next";
import Link from "next/link";
import {
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Page Metadata exactly as requested
export const metadata: Metadata = {
  title: "About — Genova",
  description:
    "Empowering creators with AI-driven content and smart recommendations since 2024.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl animate-in slide-in-from-bottom-4 duration-700">
            About Genova
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground leading-relaxed animate-in slide-in-from-bottom-6 duration-700 delay-150">
            Empowering creators with AI-driven content and smart recommendations
            since 2024.
          </p>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe everyone deserves to create amazing content, regardless
            of skill level. Genova combines cutting-edge AI with an intuitive
            interface to help writers, marketers, and businesses produce
            high-quality content in minutes, not hours.
          </p>
        </div>
      </section>

      {/* 3. Story Section (2-column layout) */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/600/400?random=1"
                alt="Genova Story"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Genova wasn't built by a massive corporation. It was built by a
                solo developer who wanted to make the power of advanced AI
                accessible to absolutely everyone.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By combining the lightning-fast performance of Next.js, the
                incredible intelligence of Gemini Pro, and ultra-modern premium
                design principles, Genova was born as a single, seamless
                platform where ideas turn into reality instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values Section (Grid of 4 identical height cards) */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Innovation</CardTitle>
                <CardDescription className="text-base mt-2">
                  We stay ahead of the curve with the latest AI models and
                  technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Simplicity</CardTitle>
                <CardDescription className="text-base mt-2">
                  Complex AI, simple interface. No learning curve required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Quality</CardTitle>
                <CardDescription className="text-base mt-2">
                  Every output is optimized for real-world use, not just demos.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Privacy</CardTitle>
                <CardDescription className="text-base mt-2">
                  Your data stays yours. We never train on your personal
                  content.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            Meet the Maker
          </h2>
          <div className="flex justify-center">
            <Card className="max-w-md w-full border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
              <CardContent className="pt-10 pb-8 px-8 flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ui-avatars.com/api/?name=Solo+Dev&background=random&color=fff&size=128&font-size=0.33"
                  alt="Founder Avatar"
                  className="w-24 h-24 rounded-full shadow-lg mb-6 ring-4 ring-background"
                />
                <h3 className="text-2xl font-bold">Your Name Here</h3>
                <p className="text-sm font-bold text-primary mt-1 mb-4 uppercase tracking-wider">
                  Founder & Developer
                </p>
                <p className="text-muted-foreground text-center mb-8 leading-relaxed">
                  Passionate about building intuitive software and democratizing
                  AI technology. Building Genova line by line to help you create
                  effortlessly.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full shadow-sm hover:text-primary"
                  >
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full shadow-sm hover:text-primary"
                  >
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Subtle background texture/overlay */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Ready to Create?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of creators using Genova today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-10 text-lg font-bold text-primary hover:scale-105 transition-transform rounded-full shadow-2xl"
            asChild
          >
            <Link href="/sign-up">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
