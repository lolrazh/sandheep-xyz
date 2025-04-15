
import React from 'react';
import Layout from '../components/Layout';
import YearSection from '../components/YearSection';
import { getArticlesByYear } from '../data/articles';

const Index = () => {
  const articlesByYear = getArticlesByYear();
  const years = Array.from(articlesByYear.keys());

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
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
