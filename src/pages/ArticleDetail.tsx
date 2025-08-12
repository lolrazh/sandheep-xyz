import React, { Suspense, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getArticleById } from '../data/articles';
import { getArticleContent } from '../utils/markdown';
import ReactMarkdown from 'react-markdown';
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { buildTitle, canonical, defaultDescription, defaultOgImage, descriptionFromMarkdown, buildArticleSchema } from '@/lib/seo';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
            onClick={() => navigate('/')} 
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
            onClick={() => navigate('/')} 
            className="font-lexend text-sm uppercase tracking-wider px-6 py-2 border border-border/20 hover:border-foreground/60 transition-colors"
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  const pageTitle = buildTitle(article.title);
  const url = canonical(`/article/${article.id}`);
  const desc = descriptionFromMarkdown(content || '') || defaultDescription;
  const schema = buildArticleSchema({
    url,
    title: pageTitle,
    description: desc,
    datePublished: article.fullDate,
  });

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:site_name" content="Sandheep Rajkumar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <article className="mx-auto max-w-3xl px-4">
        <div className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="mb-6">
            <span className="font-lexend text-sm uppercase tracking-wider text-foreground/60">
              SANDHEEP RAJKUMAR | {article.fullDate}
            </span>
          </div>
          <Separator className="bg-foreground/60 h-0.5 mb-12" />
        </div>
        
        <div className="prose prose-lg prose-slate mx-auto [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:whitespace-pre-line">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/10">
          <button 
            onClick={() => navigate('/')} 
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
