"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="py-24 bg-background container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 px-6 py-20 text-center sm:px-12 sm:py-24 border border-primary/20 shadow-xl shadow-primary/5"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Level up your career inbox
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join 50,000+ developers receiving weekly interview tips, resume
            strategies, and exclusive hiring insights.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="h-12 flex-1 bg-background border-primary/20 shadow-sm"
            />
            <Button size="lg" className="h-12 px-8 font-semibold">
              Subscribe
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <p>
              We care about your data. Read our{" "}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-secondary/20 blur-3xl" />
      </motion.div>
    </section>
  );
}
