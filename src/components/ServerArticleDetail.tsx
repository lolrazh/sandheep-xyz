import React from 'react';
import Link from 'next/link';
import { getArticleById, Article } from '../data/articles';
import { getArticleContent } from '../utils/markdown';
import ReactMarkdown from 'react-markdown';
import { OptimizedImage } from './OptimizedImage';
import { Separator } from "@/components/ui/separator";
import Layout from './Layout';

interface ServerArticleDetailProps {
  id: string;
}

export default async function ServerArticleDetail({ id }: ServerArticleDetailProps) {
  // Fetch article data and content server-side
  const article = getArticleById(id);
  
  if (!article) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-3xl mb-4">Article Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  // This will cause Next.js to show loading.tsx while fetching
  const content = await getArticleContent(id);

  if (!content) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-3xl mb-4">Error Loading Article</h2>
          <p className="mb-6">There was an error loading the article content.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4">
        <div className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="mb-6">
            <span className="text-sm uppercase tracking-wider text-foreground/60">
              SANDHEEP RAJKUMAR | {article.fullDate}
            </span>
          </div>
          <Separator className="bg-foreground/30 h-0.5 mb-12" />
        </div>
        
        <div className="prose prose-lg prose-slate mx-auto [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:whitespace-pre-line">
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => {
                return <OptimizedImage {...props} />;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/10">
          <Link 
            href="/blog" 
            className="text-sm uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
          >
            ← Back to writings
          </Link>
        </div>
      </article>
    </Layout>
  );
}