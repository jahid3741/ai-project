"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AIContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("blog");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // ---------------------------------------------------------
  // THIS IS THE MAGIC FUNCTION THAT CONNECTS TO EXPRESS
  // ---------------------------------------------------------
  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setOutput("");

    try {
      // 👉 HERE IS THE CONNECTION!
      // It talks directly to your Express server running on port 4000
      const res = await fetch(
        "https://backend-l0ha.onrender.com/api/ai/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, type }),
        },
      );

      const data = await res.json();

      // If Express throws an error (like if we forgot the prompt), catch it
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success! Put the Express output on the screen
      setOutput(data.output);
    } catch (error) {
      console.error("Failed to connect to backend", error);
      setOutput(
        "⚠️ Error: Could not connect to the backend. Make sure your Express server is running on port 4000 in your other terminal window!",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          AI Content Generator
        </h1>
        <p className="text-muted-foreground">
          Draft high-quality content in seconds using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Input Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dropdown for Content Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="email">Professional Email</SelectItem>
                  <SelectItem value="social">Social Media Caption</SelectItem>
                  <SelectItem value="resume">Resume Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Textarea for the Prompt */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic / Prompt</label>
              <Textarea
                placeholder="E.g., Write a post about the benefits of TypeScript in modern web development..."
                className="min-h-[150px] resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* The Big Generate Button */}
            <Button
              className="w-full h-12 text-lg"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" /> Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Right Side: Output Section */}
        <Card className="h-fit flex flex-col min-h-[350px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
            <CardTitle className="text-xl">Generated Output</CardTitle>

            {/* Copy Button (Only shows if there is output) */}
            {output && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
              </Button>
            )}
          </CardHeader>

          <CardContent className="flex-1 p-6 overflow-y-auto">
            {output ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {output}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
                Your generated content from the Express backend will appear
                here...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
