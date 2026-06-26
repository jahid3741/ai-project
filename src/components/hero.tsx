"use client";

import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const images = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000", // Abstract AI art
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000", // Futuristic digital waves
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80", // Deep learning visualization
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    // Auto-play the slider every 5 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-[60vh] min-h-[500px] w-full items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Hero Background ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* 
        Gradient Overlays: 
        1. Fades from transparent at top to background color at bottom.
        2. Injects brand colors (primary & secondary) via mix-blend mode. 
      */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-background/60 to-background dark:from-background/30 dark:via-background/80" />
      <div className="absolute inset-0 z-10 opacity-60 mix-blend-multiply bg-gradient-to-tr from-primary/40 to-secondary/40 dark:mix-blend-soft-light" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        {/* Themed Badge */}
        <div className="mb-6 flex animate-in slide-in-from-bottom-4 fade-in items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
          <Sparkles className="mr-2 h-4 w-4" />
          The Future of Digital Creation
        </div>

        {/* Headline */}
        <h1 className="mb-6 max-w-4xl animate-in slide-in-from-bottom-6 fade-in text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Bring Your Ideas to Life with{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
            Generative AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-2xl animate-in slide-in-from-bottom-8 fade-in text-lg text-muted-foreground sm:text-xl drop-shadow-sm">
          Transform your wildest concepts into breathtaking visuals and
          compelling narratives in seconds. Build the future, today.
        </p>

        {/* Bold CTA Button */}
        <div className="flex animate-in slide-in-from-bottom-10 fade-in flex-col gap-4 sm:flex-row">
          <Button size="lg" className="h-14 px-8 text-lg font-bold" asChild>
            <Link href="/ai-tools">Start creating with AI</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
