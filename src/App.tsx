import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import Commonplace from "./pages/Commonplace";
import About from "./pages/About";
import Links from "./pages/Links";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/links" element={<Links />} />
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
