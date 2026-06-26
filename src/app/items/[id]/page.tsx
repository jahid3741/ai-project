"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, ShoppingCart, Sparkles } from "lucide-react";

// Import our clean API functions
import { getItem, getRecommendations } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ItemDetailPage() {
  // 1. Grab the dynamic ID directly from the URL (e.g. /items/12345)
  const params = useParams();
  const id = params.id as string;

  // 2. Fetch the specific item from our Express database
  const {
    data: item,
    isLoading: isItemLoading,
    isError: isItemError,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItem(id),
    enabled: !!id, // Only run this if we have an ID
  });

  // 3. Pass the ID to our AI Recommendations endpoint!
  const { data: recommendations, isLoading: isRecLoading } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => getRecommendations([id]),
    enabled: !!id,
  });

  // Error State
  if (isItemError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Item not found
        </h2>
        <Button asChild>
          <Link href="/explore">Go back to Explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href="/explore">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Explore
        </Link>
      </Button>

      {isItemLoading ? (
        // 💀 LOADING SKELETON
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Skeleton className="h-[400px] md:h-[500px] w-full rounded-2xl" />
          <div className="space-y-6 py-8">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-32 w-full mt-8" />
            <Skeleton className="h-14 w-48 mt-8" />
          </div>
        </div>
      ) : (
        item && (
          // 🎁 ACTUAL ITEM LAYOUT
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Left Column: Image */}
            <div className="rounded-2xl overflow-hidden bg-muted border shadow-lg h-[400px] md:h-[500px] relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {item.category}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                {item.title}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <span className="text-4xl font-black text-primary">
                  ${item.price}
                </span>
                <div className="flex items-center text-sm font-bold bg-yellow-500/10 text-yellow-600 px-3 py-1.5 rounded-md">
                  <Star className="h-4 w-4 fill-current mr-1.5" />
                  {item.rating} Rating
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {item.description}
              </p>

              <Button
                size="lg"
                className="h-14 text-lg font-bold shadow-md hover:-translate-y-0.5 transition-transform w-full md:w-1/2"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Purchase Now
              </Button>
            </div>
          </div>
        )
      )}

      {/* ============================================== */}
      {/* AI SMART RECOMMENDATIONS SECTION               */}
      {/* ============================================== */}
      <div className="border-t pt-16 pb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            AI Smart Recommendations
          </h2>
        </div>
        <p className="text-muted-foreground mb-10 text-lg">
          Because you are looking at this, our AI thinks you might also love
          these tools:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isRecLoading ? (
            // 💀 REC SKELETONS
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-sm">
                <Skeleton className="h-40 w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
              </Card>
            ))
          ) : recommendations?.length > 0 ? (
            // 🎁 ACTUAL RECOMMENDATIONS
            recommendations.map((rec: any) => (
              <Card
                key={rec._id}
                className="overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50"
              >
                <div className="h-40 bg-muted relative overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="p-4 flex-1">
                  <CardTitle
                    className="text-md line-clamp-1 mb-1"
                    title={rec.title}
                  >
                    {rec.title}
                  </CardTitle>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-primary">${rec.price}</span>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="secondary"
                    className="w-full font-semibold"
                    asChild
                  >
                    <Link href={`/items/${rec._id}`}>View Product</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            // 📭 EMPTY STATE
            <div className="col-span-full text-muted-foreground italic bg-muted/30 p-10 rounded-2xl text-center border border-dashed">
              No recommendations available at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
