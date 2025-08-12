
import React from 'react';
import Layout from '../components/Layout';
import YearSection from '../components/YearSection';
import { getArticlesByYear } from '../data/articles';
import { Helmet } from 'react-helmet-async';
import { buildTitle, canonical, defaultDescription, defaultOgImage, buildWebPageSchema } from '@/lib/seo';

const Index = () => {
  const articlesByYear = getArticlesByYear();
  const years = Array.from(articlesByYear.keys()).sort((a, b) => b - a); // Sort years in descending order

  const pageTitle = buildTitle('Writings');
  const pageDescription = 'All writings by Sandheep Rajkumar.';
  const url = canonical('/');
  const schema = buildWebPageSchema({ url, title: pageTitle, description: pageDescription });

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription || defaultDescription} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription || defaultDescription} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:site_name" content="Sandheep Rajkumar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription || defaultDescription} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="mx-auto max-w-2xl py-16">
        <h1 className="text-3xl font-playfair font-medium mb-10">Writings</h1>
        {years.map(year => (
          <YearSection 
            key={year} 
            year={year} 
            articles={articlesByYear.get(year) || []} 
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
