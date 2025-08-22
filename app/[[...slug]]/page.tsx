'use client'

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticleDetail from "../../src/pages/ArticleDetail";
import NotFound from "../../src/pages/NotFound";
import Commonplace from "../../src/pages/Commonplace";
import About from "../../src/pages/About";
import Blog from "../../src/pages/Blog";
import { inject } from '@vercel/analytics'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient();

// Inject Vercel Analytics
inject();

export default function CatchAllPage() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/blog" replace />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/commonplace" element={<Commonplace />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}