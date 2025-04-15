
import React from 'react';
import ArticleCard, { Article } from './ArticleCard';

interface YearSectionProps {
  year: number;
  articles: Article[];
}

const YearSection: React.FC<YearSectionProps> = ({ year, articles }) => {
  return (
    <section>
      <div className="year-divider">
        <span className="font-lexend font-light text-3xl px-4">{year}</span>
      </div>
      <div className="mt-10">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default YearSection;
