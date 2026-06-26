"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { Search, Star } from "lucide-react"

// Import our clean API function
import { getItems } from "@/lib/api"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExplorePage() {
  // 1. All of our filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch] = useDebounce(searchTerm, 300) // Waits 300ms before searching!
  
  const [category, setCategory] = useState("all")
  
  // Slider gives us an array: [minPrice, maxPrice]
  const [priceRange, setPriceRange] = useState([0, 200]) 
  const [debouncedPrice] = useDebounce(priceRange, 300)
  
  const [sortBy, setSortBy] = useState("popular")
  const [page, setPage] = useState(1)

  // 2. Fetch data from Express using TanStack Query
  const { data, isLoading, isError } = useQuery({
    // queryKey acts like a dependency array. If any of these change, it fetches again!
    queryKey: ['items', debouncedSearch, category, debouncedPrice, sortBy, page],
    queryFn: () => getItems({
      search: debouncedSearch,
      category,
      minPrice: debouncedPrice[0],
      maxPrice: debouncedPrice[1],
      sortBy,
      page,
      limit: 12 // 4 cards per row * 3 rows
    }),
  })

  // 3. Reset to page 1 if they change a filter
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, category, debouncedPrice, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Explore AI Tools</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Discover the best templates, tools, and courses to supercharge your workflow.
        </p>
      </div>

      {/* FILTERS BAR (Glassmorphism card) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 bg-card p-6 rounded-2xl border shadow-sm">
        
        {/* Search Bar */}
        <div className="md:col-span-4 relative">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tools, templates..." 
              className="pl-9 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Templates">Templates</SelectItem>
              <SelectItem value="Tools">Tools</SelectItem>
              <SelectItem value="Learning">Learning</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Slider */}
        <div className="md:col-span-3">
           <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price Range</label>
             <span className="text-xs font-bold text-primary">${priceRange[0]} - ${priceRange[1]}</span>
           </div>
           <div className="h-11 flex items-center px-2">
            <Slider 
              value={priceRange} 
              max={200} 
              step={1} 
              onValueChange={setPriceRange} 
              className="w-full"
            />
           </div>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ERROR STATE */}
      {isError && (
        <div className="text-destructive text-center py-20 font-bold bg-destructive/10 rounded-2xl">
          Failed to load items. Is your Express backend running?
        </div>
      )}

      {/* ITEMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
           // 💀 SHOW SKELETONS WHILE LOADING
           Array.from({length: 8}).map((_, i) => (
             <Card key={i} className="overflow-hidden border-none shadow-md">
                <Skeleton className="h-48 w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-11 w-full rounded-lg" />
                </CardFooter>
             </Card>
           ))
        ) : data?.items?.length === 0 ? (
           // 📭 EMPTY STATE
           <div className="col-span-full text-center py-20">
              <p className="text-2xl font-bold text-muted-foreground">No items found</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
           </div>
        ) : (
           // 🎁 ACTUAL ITEMS
           data?.items?.map((item: any) => (
             <Card key={item._id} className="overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50">
                <div className="h-48 bg-muted relative overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    {item.category}
                  </div>
                </div>
                
                <CardHeader className="p-5 flex-1">
                  <CardTitle className="text-lg line-clamp-1 mb-2" title={item.title}>{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed">{item.description}</CardDescription>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-black text-primary">${item.price}</span>
                    <div className="flex items-center text-sm font-bold bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-current mr-1.5" />
                      {item.rating}
                    </div>
                  </div>
                </CardHeader>
                
                <CardFooter className="p-5 pt-0">
                  <Button className="w-full h-11 font-semibold" asChild>
                    <Link href={`/items/${item._id}`}>View Details</Link>
                  </Button>
                </CardFooter>
             </Card>
           ))
        )}
      </div>

      {/* PAGINATION */}
      {data?.totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-16">
          <Button 
            variant="outline" 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1 || isLoading}
            className="w-24"
          >
            Previous
          </Button>
          <span className="text-sm font-semibold bg-muted px-4 py-2 rounded-full">
            Page {page} of {data.totalPages}
          </span>
          <Button 
            variant="outline" 
            onClick={() => setPage(p => p + 1)} 
            disabled={page >= data.totalPages || isLoading}
            className="w-24"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}