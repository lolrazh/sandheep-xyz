
import React from 'react';
import Layout from '../components/Layout';
import YearSection from '../components/YearSection';
import { getArticlesByYear } from '../data/articles';
// import { Helmet } from 'react-helmet-async';
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
