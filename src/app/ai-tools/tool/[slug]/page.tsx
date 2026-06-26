"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// Helper function to turn slugs like "mock-interview" into "Mock Interview"
const formatTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function UniversalToolRunner() {
  const params = useParams();
  const router = useRouter();

  const toolSlug = params.slug as string;
  const toolTitle = formatTitle(toolSlug);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunTool = async () => {
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const response = await api.post("/ai/generate", {
        prompt,
        toolSlug,
      });

      setResult(response.data.output);
      toast.success("AI response generated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to run the AI tool. Please check your backend connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      toast.success("Copied to clipboard!");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy text.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Tools
      </Button>

      <div className="mb-8 border-b pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
          <Sparkles className="h-4 w-4" />
          AI Powered Engine
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-primary">
          {toolTitle}
        </h1>

        <p className="text-xl text-muted-foreground">
          Enter your details below and let our specialized AI do the heavy
          lifting.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Your Input
          </label>

          <Textarea
            placeholder="Type your information, job description, or requirements here..."
            className="min-h-[150px] resize-y text-lg p-4 shadow-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <Button
          size="lg"
          className="w-full sm:w-auto text-lg h-14 px-10 font-bold shadow-lg hover:-translate-y-0.5 transition-transform"
          onClick={handleRunTool}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse" />
              Generating Magic...
            </span>
          ) : (
            "Run Tool"
          )}
        </Button>

        {result && (
          <div className="mt-12 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-primary">
                AI Result
              </label>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </>
                )}
              </Button>
            </div>

            <Card className="bg-primary/5 border-primary/20 shadow-inner">
              <CardContent className="p-6 sm:p-8">
                <div className="whitespace-pre-wrap text-lg leading-relaxed font-medium">
                  {result}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
