"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Sparkles,
  Loader2,
  Clock,
  History,
  FileText,
} from "lucide-react";

// Import our clean API hook
import { generateContent } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definition for our history state
type HistoryItem = {
  id: string;
  prompt: string;
  type: string;
  output: string;
  timestamp: Date;
};

export default function AIGeneratorPage() {
  // Input/Output State
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("Blog Post");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setOutput("");

    try {
      // 1. Call our clean Axios API function
      const data = await generateContent(prompt, type);
      setOutput(data.output);

      // 2. Save the result to our history state (puts newest at the top)
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        prompt,
        type,
        output: data.output,
        timestamp: new Date(),
      };
      setHistory((prev) => [newItem, ...prev]);
    } catch (error) {
      console.error("Failed to generate content", error);
      setOutput(
        "⚠️ Error: Could not connect to the Express backend. Make sure your server is running!",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load a past item when clicked in the sidebar
  const loadHistoryItem = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setType(item.type);
    setOutput(item.output);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">AI Content Studio</h1>
        <p className="text-muted-foreground mt-2">
          Generate high-converting content and access your recent history.
        </p>
      </div>

      {/* MAIN LAYOUT: Sidebar (1/4) + Generator (3/4) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ============================== */}
        {/* LEFT COLUMN: HISTORY SIDEBAR   */}
        {/* ============================== */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 font-semibold text-lg border-b pb-4">
            <History className="h-5 w-5 text-primary" />
            Recent Generations
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <div className="text-sm text-muted-foreground italic p-4 bg-muted/50 rounded-lg border border-dashed text-center">
                Your generation history will appear here.
              </div>
            ) : (
              history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="w-full text-left p-3 rounded-lg border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-primary px-2 py-0.5 bg-primary/10 rounded">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm font-medium line-clamp-2 mt-2 group-hover:text-foreground">
                    {item.prompt}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ============================== */}
        {/* RIGHT COLUMN: GENERATOR AREA   */}
        {/* ============================== */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* INPUT CARD */}
          <Card className="h-fit shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Content Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blog Post">Blog Post</SelectItem>
                    <SelectItem value="Product Description">
                      Product Description
                    </SelectItem>
                    <SelectItem value="Social Caption">
                      Social Caption
                    </SelectItem>
                    <SelectItem value="Email">Professional Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Topic / Prompt</label>
                <Textarea
                  placeholder="E.g., Write an exciting launch announcement for our new AI writing tool..."
                  className="min-h-[200px] resize-none leading-relaxed"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <Button
                className="w-full h-12 text-md font-bold shadow-md hover:-translate-y-0.5 transition-transform"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating
                    Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" /> Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* OUTPUT CARD */}
          <Card className="h-full flex flex-col min-h-[400px] shadow-sm bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <CardTitle className="text-xl">Result</CardTitle>
              {output && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopy}
                  className={`h-8 transition-all ${copied ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" : ""}`}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-1.5" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1.5" />
                  )}
                  {copied ? "Copied to Clipboard" : "Copy Text"}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-6 overflow-y-auto">
              {output ? (
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {output}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-4">
                  <Sparkles className="h-12 w-12" />
                  <p className="text-sm italic">
                    Your AI-generated content will appear here...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
