'use client'

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Blog from "../../src/components-old/Blog";
import { inject } from '@vercel/analytics'

const queryClient = new QueryClient();

// Inject Vercel Analytics
inject();

export default function BlogClientWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Blog />
      </TooltipProvider>
    </QueryClientProvider>
  )
}