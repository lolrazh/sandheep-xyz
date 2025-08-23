import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { getArticleById } from '../data/articles';
import { getArticleContent } from '../utils/markdown';
import ReactMarkdown from 'react-markdown';
import { OptimizedImage } from '../components/OptimizedImage';
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from '../components/LoadingSpinner';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const article = getArticleById(id || "");
  const [content, setContent] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      if (id) {
        try {
          const articleContent = await getArticleContent(id);
          setContent(articleContent);
        } catch (error) {
          console.error('Error loading article content:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadContent();
  }, [id]);

  if (!article) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-3xl mb-4">Article Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/')} 
            className="font-lexend text-sm uppercase tracking-wider px-6 py-2 border border-border/20 hover:border-foreground/60 transition-colors"
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!content) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-3xl mb-4">Error Loading Article</h2>
          <p className="mb-6">There was an error loading the article content.</p>
          <button 
            onClick={() => router.push('/')} 
            className="font-lexend text-sm uppercase tracking-wider px-6 py-2 border border-border/20 hover:border-foreground/60 transition-colors"
          >
            Return Home
          </button>
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
            <span className="font-lexend text-sm uppercase tracking-wider text-foreground/60">
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
          <button 
            onClick={() => router.push('/')} 
            className="font-lexend text-sm uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
          >
            ← Back to Writings
          </button>
        </div>
      </article>
    </Layout>
  );
};

export default ArticleDetail;
