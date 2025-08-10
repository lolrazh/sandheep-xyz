
import React from 'react';
import ArticleCard, { Article } from './ArticleCard';
import { Separator } from './ui/separator';

interface YearSectionProps {
  year: number;
  articles: Article[];
}

const YearSection: React.FC<YearSectionProps> = ({ year, articles }) => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-[5rem_1fr] gap-4">
        <div className="text-foreground/60 text-xl font-lexend font-light">
          {year}
        </div>
        <div>
          {articles.map((article, index) => (
            <React.Fragment key={article.id}>
              <ArticleCard article={article} />
              {index < articles.length - 1 && <Separator className="my-6 bg-border/20" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YearSection;
