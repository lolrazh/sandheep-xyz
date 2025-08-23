'use client'

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArticleDetail from "../../../src/components-old/ArticleDetail";
import { inject } from '@vercel/analytics'

const queryClient = new QueryClient();

// Inject Vercel Analytics
inject();

export default function ArticleClientWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ArticleDetail />
      </TooltipProvider>
    </QueryClientProvider>
  )
}