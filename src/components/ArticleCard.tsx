import React from 'react';
import Link from 'next/link';

export interface Article {
  id: string;
  title: string;
  date: string;
  fullDate: string;
  year: number;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <article className="group">
      <div className="flex justify-between items-baseline mb-1">
        <h2 className="text-lg md:text-xl font-medium mb-2 group-hover:opacity-80 transition-opacity">
          <Link href={`/article/${article.id}`} className="article-link text-theme">
            {article.title}
          </Link>
        </h2>
        <span className="font-lexend text-sm text-foreground/60">
          {formatDate(article.date)}
        </span>
      </div>
    </article>
  );
};

export default ArticleCard;
