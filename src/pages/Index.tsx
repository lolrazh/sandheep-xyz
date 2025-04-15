
import React from 'react';
import Layout from '../components/Layout';
import YearSection from '../components/YearSection';
import { getArticlesByYear } from '../data/articles';

const Index = () => {
  const articlesByYear = getArticlesByYear();
  const years = Array.from(articlesByYear.keys()).sort((a, b) => b - a); // Sort years in descending order

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
